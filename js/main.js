/**
 * NexiaProLanka — Main Interactive Script
 * Handles scroll-reveal animations, mobile navigation, PayHere-ready legal modals,
 * URL hash routing (#privacy, #terms, #refund), email copy, and contact form validation.
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Scroll-Reveal Observer
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     2. Mobile Navigation Drawer
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function setMobileMenuState(isOpen) {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.classList.toggle('hidden', !isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    if (menuIconOpen && menuIconClose) {
      menuIconOpen.classList.toggle('hidden', isOpen);
      menuIconClose.classList.toggle('hidden', !isOpen);
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isCurrentlyOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      setMobileMenuState(!isCurrentlyOpen);
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => setMobileMenuState(false));
  });

  /* --------------------------------------------------------------------------
     3. PayHere-Ready Legal & Compliance Modals (#privacy, #terms, #refund)
     -------------------------------------------------------------------------- */
  const LEGAL_POLICIES = {
    privacy: {
      title: 'Privacy Policy',
      html: `
        <p class="text-slate-200 font-medium">
          NexiaProLanka ("we", "our", or "us") is committed to protecting the privacy and personal data of users across all our SaaS applications, community platforms, and web utilities.
        </p>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">1. Information We Collect</h3>
          <p>
            We collect only the minimum information necessary to deliver and secure our services. This may include your name, email address, business/store details (for SaaS accounts), and technical diagnostics (browser type, IP address, and session logs) required to prevent abuse and maintain uptime.
          </p>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">2. Payment &amp; Transaction Security</h3>
          <p>
            All online payments and subscriptions are processed through PCI-DSS compliant third-party payment gateways such as <strong>PayHere</strong>. NexiaProLanka does not store, process, or have direct access to your full credit/debit card numbers or banking credentials on our servers.
          </p>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">3. How We Use Your Data</h3>
          <ul class="list-disc pl-5 space-y-1.5">
            <li>To provision, authenticate, and maintain your SaaS or community account.</li>
            <li>To send essential service notifications, invoices, and support responses.</li>
            <li>To improve platform reliability, security, and user experience.</li>
          </ul>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">4. Data Sharing &amp; Retention</h3>
          <p>
            We never sell, rent, or trade your personal information to third parties. Data is retained only as long as your account remains active or as required by applicable Sri Lankan law. You may request account deletion or data export at any time by emailing <a href="mailto:supportnexiapro@gmail.com" class="text-cyanx-400 underline">supportnexiapro@gmail.com</a>.
          </p>
        </div>
      `
    },
    terms: {
      title: 'Terms of Service',
      html: `
        <p class="text-slate-200 font-medium">
          By accessing or using any website, SaaS platform, or utility operated by NexiaProLanka, you agree to be bound by these Terms of Service.
        </p>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">1. License &amp; Authorized Use</h3>
          <p>
            NexiaProLanka grants you a limited, non-exclusive, non-transferable license to access and use our software platforms (including Nexia Repair Hub, Nexia Order &amp; Courier Pro, and Nexia Smart Utilities Suite) for legitimate personal or commercial operations in accordance with your selected plan.
          </p>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">2. User Responsibilities</h3>
          <ul class="list-disc pl-5 space-y-1.5">
            <li>You are responsible for safeguarding your account credentials and API keys.</li>
            <li>You agree not to reverse-engineer, scrape, overload, or attempt unauthorized access to any NexiaProLanka infrastructure.</li>
            <li>You must ensure all customer or order data you process complies with applicable local laws and consent requirements.</li>
          </ul>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">3. Intellectual Property</h3>
          <p>
            All source code, UI designs, trademarks, logos, and documentation remain the exclusive intellectual property of NexiaProLanka. User-submitted business data remains the sole property of the respective user.
          </p>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">4. Service Availability &amp; Governing Law</h3>
          <p>
            While we engineer for 99.9% serverless uptime, scheduled maintenance or upstream cloud outages may occasionally occur. These Terms are governed by the laws of the Democratic Socialist Republic of Sri Lanka.
          </p>
        </div>
      `
    },
    refund: {
      title: 'Refund & Cancellation Policy',
      html: `
        <p class="text-slate-200 font-medium">
          NexiaProLanka strives for complete transparency across all digital subscriptions, SaaS plans, and custom software engagements.
        </p>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">1. Subscription Cancellations</h3>
          <p>
            You may cancel a recurring SaaS subscription at any time prior to your next billing renewal date. Upon cancellation, your plan remains active until the end of the current paid billing cycle, and no further automatic charges will be made.
          </p>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">2. Refund Eligibility</h3>
          <ul class="list-disc pl-5 space-y-1.5">
            <li><strong>Duplicate or Erroneous Charges:</strong> 100% refunded upon verification.</li>
            <li><strong>First-Time SaaS Subscriptions:</strong> Full refund requests are honored within <strong>7 calendar days</strong> of initial purchase if the platform experiences unresolved critical technical failures attributable to our service.</li>
            <li><strong>Non-Refundable Items:</strong> Custom development milestones already delivered, domain/third-party API fees, and partial-month unused periods after the 7-day window are non-refundable.</li>
          </ul>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">3. Refund Processing Timeline</h3>
          <p>
            Approved refunds are initiated within <strong>3–5 business days</strong> back to the original payment method via our payment processor (e.g., PayHere). Bank settlement times may take an additional 5–10 business days depending on your card issuer.
          </p>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-white mb-2">4. How to Request a Cancellation or Refund</h3>
          <p>
            Email <a href="mailto:supportnexiapro@gmail.com" class="text-cyanx-400 underline">supportnexiapro@gmail.com</a> with your registered account email, transaction reference ID, and reason for the request.
          </p>
        </div>
      `
    }
  };

  const legalModal = document.getElementById('legal-modal');
  const legalModalTitle = document.getElementById('legal-modal-title');
  const legalModalBody = document.getElementById('legal-modal-body');
  const legalModalClose = document.getElementById('legal-modal-close');
  const legalModalDone = document.getElementById('legal-modal-done');
  const legalModalBackdrop = document.getElementById('legal-modal-backdrop');
  const legalTabs = document.querySelectorAll('[data-legal-tab]');
  const legalTriggers = document.querySelectorAll('[data-legal-modal]');

  function openLegalModal(policyKey, updateHash = true) {
    const policy = LEGAL_POLICIES[policyKey];
    if (!policy || !legalModal) return;

    legalModalTitle.textContent = policy.title;
    legalModalBody.innerHTML = policy.html;
    legalModalBody.scrollTop = 0;

    legalTabs.forEach((tab) => {
      const isMatch = tab.getAttribute('data-legal-tab') === policyKey;
      tab.classList.toggle('is-active', isMatch);
    });

    legalModal.classList.remove('hidden');
    legalModal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    if (updateHash && window.location.hash !== `#${policyKey}`) {
      history.replaceState(null, '', `#${policyKey}`);
    }
  }

  function closeLegalModal() {
    if (!legalModal) return;
    legalModal.classList.add('hidden');
    legalModal.classList.remove('flex');
    document.body.style.overflow = '';

    const currentHash = window.location.hash.replace('#', '');
    if (LEGAL_POLICIES[currentHash]) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  legalTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-legal-modal');
      openLegalModal(key, true);
    });
  });

  legalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-legal-tab');
      openLegalModal(key, true);
    });
  });

  if (legalModalClose) legalModalClose.addEventListener('click', closeLegalModal);
  if (legalModalDone) legalModalDone.addEventListener('click', closeLegalModal);
  if (legalModalBackdrop) legalModalBackdrop.addEventListener('click', closeLegalModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal && !legalModal.classList.contains('hidden')) {
      closeLegalModal();
    }
  });

  function checkLegalHash() {
    const hashKey = window.location.hash.replace('#', '').toLowerCase();
    if (LEGAL_POLICIES[hashKey]) {
      openLegalModal(hashKey, false);
    }
  }

  window.addEventListener('hashchange', checkLegalHash);
  checkLegalHash();

  /* --------------------------------------------------------------------------
     4. One-Click Copy Email
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailLabel = document.getElementById('copy-email-label');

  if (copyEmailBtn && copyEmailLabel) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'supportnexiapro@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyEmailLabel.textContent = 'Copied!';
      } catch {
        // Fallback for older browsers without Clipboard API permissions
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        copyEmailLabel.textContent = 'Copied!';
      }

      setTimeout(() => {
        copyEmailLabel.textContent = 'Copy Email';
      }, 2200);
    });
  }

  /* --------------------------------------------------------------------------
     5. Contact Form Client-Side Validation & Instant Confirmation
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  function showFeedback(message, isError) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.classList.remove(
      'hidden',
      'bg-rose-500/10',
      'border',
      'border-rose-500/30',
      'text-rose-300',
      'bg-emerald-500/10',
      'border-emerald-500/30',
      'text-emerald-300'
    );

    if (isError) {
      formFeedback.classList.add('bg-rose-500/10', 'border', 'border-rose-500/30', 'text-rose-300');
    } else {
      formFeedback.classList.add('bg-emerald-500/10', 'border', 'border-emerald-500/30', 'text-emerald-300');
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || name.length < 2) {
        showFeedback('Please enter your full name (at least 2 characters).', true);
        return;
      }

      if (!emailPattern.test(email)) {
        showFeedback('Please enter a valid email address.', true);
        return;
      }

      if (!message || message.length < 10) {
        showFeedback('Please provide a brief message (at least 10 characters).', true);
        return;
      }

      // Build mailto fallback link with prefilled inquiry details
      const mailtoFallback = document.getElementById('mailto-fallback');
      const mailtoBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailtoHref = `mailto:supportnexiapro@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

      if (mailtoFallback) {
        mailtoFallback.setAttribute('href', mailtoHref);
      }

      showFeedback(
        'Thank you! Your inquiry has been prepared. Opening your email client or you can email supportnexiapro@gmail.com directly.',
        false
      );

      // Trigger mailto client gracefully while preserving instant on-page confirmation
      window.location.href = mailtoHref;
      contactForm.reset();
    });
  }
})();
