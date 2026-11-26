/**
 * NexiaProLanka — Main Interactive Script
 * Handles bilingual EN/SI localization (localStorage persistence), scroll-reveal
 * animations, mobile navigation, PayHere-ready legal modals, URL hash routing
 * (#privacy, #terms, #refund), email copy, Web3Forms submission, quote
 * pre-selection, and FAQ accordion behavior.
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Bilingual Localization (English / Sinhala)
     -------------------------------------------------------------------------- */
  const STORAGE_KEY = 'nexia_lang';
  let currentLang = 'en';
  let activeModalPolicyKey = null;

  const SI_TRANSLATIONS = {
    'nav.products': 'නිෂ්පාදන',
    'nav.solutions': 'විසඳුම්',
    'nav.about': 'අප ගැන',
    'nav.legal': 'නීතිමය',
    'nav.faq': 'ප්‍රශ්න',
    'nav.contact': 'සම්බන්ධ වන්න',
    'nav.cta': 'විමසීම් කරන්න',
    'nav.language': 'භාෂාව',

    'hero.badge': 'ශ්‍රී ලාංකේය ඩිජිටල් නිෂ්පාදන සහ SaaS මධ්‍යස්ථානය',
    'hero.title':
      'නවීන ඩිජිටල් වේදිකා සහ <span class="bg-gradient-to-r from-cyanx-400 via-cyanx-500 to-amberx-400 bg-clip-text text-transparent">ස්මාර්ට් වෙබ් පද්ධති නිර්මාණය.</span>',
    'hero.subtitle':
      'NexiaProLanka ශ්‍රී ලංකාව සහ ලෝකය වෙනුවෙන් වේගවත් SaaS මෘදුකාංග, ප්‍රජා වේදිකා සහ ව්‍යාපාරික වෙබ් පද්ධති සැලසුම් කර නිර්මාණය කරයි.',
    'hero.ctaPrimary': 'අපගේ පද්ධති බලන්න',
    'hero.ctaSecondary': 'අප සමඟ එක්වන්න',

    'stats.1.title': 'සජීවී වේදිකා 4+',
    'stats.1.sub': 'ක්‍රියාත්මක නිෂ්පාදන පෙළ',
    'stats.2.title': '99.9% ස්ථාවර ක්‍රියාකාරිත්වය',
    'stats.2.sub': 'විශ්වාසදායී Cloud සේවාව',
    'stats.3.title': 'Cloud-First තාක්ෂණය',
    'stats.3.sub': 'ආරක්ෂාව සහ වේගවත් බව',

    'products.eyebrow': 'ප්‍රධාන නිෂ්පාදන පද්ධතිය',
    'products.title': 'අරමුණුගත මෘදුකාංග නිෂ්පාදන',
    'products.subtitle':
      'දීපව්‍යාප්ත ප්‍රජා ජාලවල සිට ව්‍යාපාරික SaaS සහ වෙළඳ මෙවලම් දක්වා සෑම NexiaProLanka නිෂ්පාදනයක්ම ප්‍රායෝගික විශ්වාසනීයත්වයෙන් යුතුව ගොඩනගා ඇත.',

    'p1.badge': 'සජීවී • ලාභ නොලබන ප්‍රජා සේවය',
    'p1.desc':
      'බැතිමතුන්, විහාරස්ථාන සහ සාම්ප්‍රදායික ශිල්පීන් එකම ගෞරවනීය හා පහසු ඩිජිටල් ජාලයකින් සම්බන්ධ කරන ශ්‍රී ලංකාවේ පළමු පින්පොත සහ ධර්ම ප්‍රජා වේදිකාව.',
    'p1.f1': 'තහවුරු කළ විහාරස්ථාන, ධර්ම හා සංස්කෘතික නාමාවලිය',
    'p1.f2': 'ඩිජිටල් පින්පොත සහ ප්‍රජා වැඩසටහන් බෙදාගැනීම',
    'p1.f3': 'දේශීය සාම්ප්‍රදායික කලා ශිල්පීන් සඳහා සෘජු ප්‍රදර්ශන අවකාශය',
    'p1.tag': 'ප්‍රජා සහ උරුම ජාලය',

    'p2.badge': 'SAAS වේදිකාව',
    'p2.desc':
      'POS බිල්පත් නිකුත් කිරීම, QR උපාංග පරීක්ෂාව, අමතර කොටස් තොග පාලනය සහ කාර්මික මෙවලම් ඇතුළත් ජංගම දුරකථන අලුත්වැඩියා ආයතන සඳහා වූ සම්පූර්ණ Cloud පද්ධතිය.',
    'p2.f1': 'වේගවත් POS බිල්පත් සහ Thermal රිසිට්පත් මුද්‍රණය',
    'p2.f2': 'QR Job-Sheet ඇතුළත් කිරීම සහ පාරිභෝගික තත්ත්ව පරීක්ෂාව',
    'p2.f3': 'අමතර කොටස් තොග පාලනය සහ අලුත්වැඩියා වාර්තා',
    'p2.tag': 'POS • QR පරීක්ෂාව • තොග පාලනය',

    'p3.badge': 'E-COMMERCE මෙවලම',
    'p3.desc':
      'ශ්‍රී ලාංකේය ඔන්ලයින් වෙළඳුන්ට සහ Social Commerce කණ්ඩායම්වලට අතින් සිදුවන වැරදි අවම කර ගැනීමට නිර්මාණය කළ ස්වයංක්‍රීය WhatsApp ඇණවුම් කියවනය සහ Courier Slip ජනකය.',
    'p3.f1': 'එක් ක්ලික් කිරීමකින් WhatsApp සහ Messenger ඇණවුම් කියවීම',
    'p3.f2': 'මුද්‍රණයට සූදානම් ක්ෂණික Courier Waybill සහ Dispatch ලේබල්',
    'p3.f3': 'COD ඇණවුම් නිරීක්ෂණය සහ දෛනික බෙදාහැරීම් සාරාංශ',
    'p3.tag': 'WhatsApp Parser • Dispatch Slips',

    'p4.badge': 'වෙබ් මෙවලම්',
    'p4.desc':
      'වාහන VIN/මයිලේජ් මෙවලම්, ශ්‍රී ලාංකේය ඉඩම් ඒකක පරිවර්තක (පර්චස්, රූඩ්, අක්කර) සහ Unicode අක්ෂර මෙවලම් ඇතුළත් අධිවේගී බ්‍රව්සර් මෙවලම් පද්ධතිය.',
    'p4.f1': 'ශ්‍රී ලංකා ඉඩම් ඒකක පරිවර්තකය (පර්චස්, රූඩ්, අක්කර, වර්ග අඩි)',
    'p4.f2': 'වාහන VIN සහ සේවා මයිලේජ් ගණනය කිරීමේ මෙවලම්',
    'p4.f3': 'ප්‍රමාදයකින් තොර සිංහල සහ Unicode අක්ෂර සැකසුම් එන්ජින්',
    'p4.tag': 'ක්ෂණික බ්‍රව්සර් ක්‍රියාකාරිත්වය',

    'btn.visitPlatform': 'වේදිකාවට පිවිසෙන්න',
    'btn.requestDemo': 'Demo ඉල්ලන්න',
    'btn.requestQuote': 'මිල ගණන් විමසන්න',

    'solutions.eyebrow': 'විසඳුම් සහ සේවා',
    'solutions.title': 'ඔබේ ව්‍යාපාරයටම ගැලපෙන මෘදුකාංග',
    'solutions.subtitle':
      'ඔබ සාප්පුවක්, අලුත්වැඩියා මධ්‍යස්ථානයක් හෝ නව ව්‍යාපාරයක් පවත්වාගෙන ගියත්, දෛනික කටයුතු පහසු කරන වේගවත් හා ආරක්ෂිත ඩිජිටල් පද්ධති අපි නිර්මාණය කරමු.',

    's1.title': 'ව්‍යාපාරික සහ E-Commerce වෙබ් අඩවි',
    's1.desc':
      'SEO ප්‍රශස්තකරණය සහ PayHere ගෙවීම් පහසුකම් සහිත වේගවත්, ජංගම දුරකථන හිතකාමී ආයතනික වෙබ් අඩවි, වෙන්කිරීමේ පද්ධති සහ ඔන්ලයින් වෙළඳසැල්.',
    's2.title': 'සාප්පු POS, තොග සහ වෙබ් පද්ධති',
    's2.desc':
      'බිල්පත් නිකුත් කිරීමේ පද්ධති, තොග සහ අලුත්වැඩියා සාප්පු කළමනාකරණ මෘදුකාංග (Repair Hub වැනි) සහ ස්වයංක්‍රීය ඇණවුම්/Courier පද්ධති.',
    's3.title': 'ස්මාර්ට් වෙබ් මෙවලම් සහ Cloud ඒකාබද්ධ කිරීම්',
    's3.desc':
      'දෛනික ව්‍යාපාර කටයුතු ස්වයංක්‍රීය කිරීම සඳහා විශේෂිත ගණක යන්ත්‍ර, Telegram/WhatsApp බොට්වරු, API සම්බන්ධතා සහ micro-SaaS මෙවලම්.',

    'about.eyebrow': 'NexiaProLanka පිළිබඳව',
    'about.title': 'ශ්‍රී ලංකාවෙන් විශ්වාසදායී, විනිවිදභාවයෙන් යුතු මෘදුකාංග නිර්මාණය.',
    'about.p1':
      'NexiaProLanka යනු දේශීය ව්‍යාපාර, කාර්මිකයන්, ඔන්ලයින් වෙළඳුන් සහ ප්‍රජාවන් සඳහා ජාත්‍යන්තර Cloud ප්‍රමිතීන්ට අනුකූල ප්‍රායෝගික මෘදුකාංග නිපදවන ස්වාධීන ඩිජිටල් නිෂ්පාදන මධ්‍යස්ථානයකි.',
    'about.p2':
      'අපගේ සෑම වේදිකාවක්ම පැහැදිලි මිල ගණන්, දත්ත රහස්‍යතාවය සහ සරල පරිශීලක අත්දැකීම්වලට මුල් තැන දෙයි.',

    'founder.role': 'නිර්මාතෘ සහ ප්‍රධාන සංවර්ධක',
    'founder.bio':
      'ශ්‍රී ලංකාවේ කඳුකරයේ සිට NexiaProLanka හි නිෂ්පාදන සැලසුම්කරණය, Full-Stack Cloud සංවර්ධනය සහ විශ්වාසනීය මෘදුකාංග උපාය මාර්ග මෙහෙයවයි.',
    'founder.location': 'දියතලාව, ශ්‍රී ලංකාව',
    'founder.verified': 'තහවුරු කළ ආයතනය',

    'legal.eyebrow': 'පාලනය සහ අනුකූලතාව',
    'legal.title': 'විනිවිදභාවයෙන් යුතු නීතිමය ප්‍රතිපත්ති',
    'legal.subtitle':
      'සියලුම NexiaProLanka වේදිකා හරහා දත්ත ආරක්ෂාව, SaaS බලපත්‍ර සහ දායකත්ව අවලංගු කිරීම් පාලනය කරන පැහැදිලි වෙළඳ ප්‍රතිපත්ති.',
    'legal.badge': 'PayHere වෙළඳ ප්‍රමිතීන්ට අනුකූලයි',
    'legal.c1.label': 'ප්‍රතිපත්තිය 01',
    'legal.c2.label': 'ප්‍රතිපත්තිය 02',
    'legal.c3.label': 'ප්‍රතිපත්තිය 03',
    'legal.privacy.title': 'රහස්‍යතා ප්‍රතිපත්තිය',
    'legal.privacy.desc':
      'NexiaProLanka අපගේ යෙදුම් හරහා පුද්ගලික සහ ගෙවීම් දත්ත රැස් කරන, සංකේතනය කරන සහ ආරක්ෂා කරන ආකාරය.',
    'legal.terms.title': 'සේවා කොන්දේසි',
    'legal.terms.desc':
      'SaaS භාවිත මාර්ගෝපදේශ, මෘදුකාංග බලපත්‍ර කොන්දේසි, පරිශීලක වගකීම් සහ සේවා මට්ටමේ ප්‍රමිතීන්.',
    'legal.refund.title': 'මුදල් ආපසු ගෙවීමේ සහ අවලංගු කිරීමේ ප්‍රතිපත්තිය',
    'legal.refund.short': 'මුදල් ආපසු ගෙවීමේ ප්‍රතිපත්තිය',
    'legal.refund.desc':
      'ඩිජිටල් සැලසුම් සඳහා පැහැදිලි සුදුසුකම් නීති, දායකත්ව අවලංගු කිරීමේ පියවර සහ මුදල් ආපසු ගෙවීමේ කාලසීමාවන්.',

    'faq.eyebrow': 'නිතර අසන ප්‍රශ්න',
    'faq.title': 'පාරිභෝගිකයින් අසන පොදු ප්‍රශ්න',
    'faq.subtitle':
      'ව්‍යාපාරික වෙබ් අඩවි, POS පද්ධති, PayHere ගෙවීම් සහ ව්‍යාපෘති කාලසීමාවන් පිළිබඳ පැහැදිලි පිළිතුරු.',
    'faq.q1': 'මගේ සාප්පුවට හෝ ව්‍යාපාරයට ගැලපෙන වෙබ් අඩවියක් හෝ POS පද්ධතියක් NexiaProLanka හරහා සාදාගත හැකිද?',
    'faq.a1':
      'ඔව්. අපි ඔබේ ව්‍යාපාරයේ ක්‍රියාකාරිත්වයටම ගැලපෙන ව්‍යාපාරික වෙබ් අඩවි, E-Commerce වෙළඳසැල් සහ POS/තොග කළමනාකරණ පද්ධති (අලුත්වැඩියා මධ්‍යස්ථාන Job-Sheet පද්ධති, බිල්පත් සහ ඇණවුම් කළමනාකරණය වැනි) විශේෂයෙන් නිර්මාණය කර දෙන්නෙමු.',
    'faq.q2': 'ඔබ PayHere වැනි ශ්‍රී ලාංකේය ගෙවීම් ද්වාර (Payment Gateways) ඒකාබද්ධ කරනවාද?',
    'faq.a2':
      'අනිවාර්යයෙන්ම. ඔබේ ව්‍යාපාරයට LKR සහ ජාත්‍යන්තර කාඩ්පත්/ජංගම ගෙවීම් පහසුවෙන් ලබා ගැනීමට හැකි වන පරිදි PayHere ගෙවීම් පද්ධති, Webhook තහවුරු කිරීම් සහ නීතිමය ප්‍රතිපත්ති අපි සම්පූර්ණයෙන්ම සකසා දෙන්නෙමු.',
    'faq.q3': 'වෙබ් අඩවියක් හෝ වෙබ් පද්ධතියක් නිම කිරීමට කොපමණ කාලයක් ගතවේද?',
    'faq.a3':
      'සාමාන්‍ය ආයතනික වෙබ් අඩවියක් වැඩ කරන දින 5–10ක් ඇතුළත දියත් කළ හැකිය. E-Commerce වෙළඳසැල්, POS පද්ධති හෝ විශේෂිත SaaS යෙදුම් සඳහා අවශ්‍යතා අනුව සති 2–5ක් පමණ ගත වේ.',
    'faq.q4': 'ඔබ Hosting, Domain සැකසීම සහ අඛණ්ඩ තාක්ෂණික සහාය ලබා දෙනවාද?',
    'faq.a4':
      'ඔව්. Vercel/Cloudflare Cloud Hosting, Domain DNS සහ SSL සැකසීම, Google Search Console ලියාපදිංචිය සහ පද්ධතිය දියත් කිරීමෙන් පසුවත් අඛණ්ඩ තාක්ෂණික නඩත්තු සහාය අපි ලබා දෙන්නෙමු.',
    'faq.q5': 'Demo එකක් හෝ ව්‍යාපෘති මිල ගණන් (Quotation) ඉල්ලා සිටින්නේ කෙසේද?',
    'faq.a5':
      'ඉහත ඇති <strong>මිල ගණන් විමසන්න</strong> හෝ <strong>Demo ඉල්ලන්න</strong> බොත්තම් ක්ලික් කරන්න, නැතහොත් පහත පෝරමය හරහා ඔබේ අවශ්‍යතාවය අපට එවන්න. <a href="mailto:supportnexiapro@gmail.com" class="text-cyanx-400 underline">supportnexiapro@gmail.com</a> වෙත සෘජුවම ඊමේල් කිරීමෙන්ද ඉක්මන් ප්‍රතිචාර ලබාගත හැක.',

    'contact.eyebrow': 'සම්බන්ධ වන්න',
    'contact.title': 'සාකච්ඡාවක් ආරම්භ කරන්න',
    'contact.subtitle':
      'SaaS හවුල්කාරිත්වයක්, නව මෘදුකාංග අවශ්‍යතාවයක් හෝ නිෂ්පාදන සහාය පිළිබඳ විමසීමක් තිබේද? අපගේ කණ්ඩායම අමතන්න.',
    'contact.emailLabel': 'සෘජු විද්‍යුත් තැපෑල',
    'contact.locationLabel': 'මධ්‍යස්ථානය පිහිටි ස්ථානය',
    'contact.locationValue': 'දියතලාව, ඌව පළාත, ශ්‍රී ලංකාව',
    'contact.locationSub': 'ගෝලීයව ක්‍රියාත්මකයි • GMT+5:30 (IST / SLST)',

    'form.nameLabel': 'සම්පූර්ණ නම',
    'form.namePlaceholder': 'උදා: කසුන් පෙරේරා',
    'form.emailLabel': 'විද්‍යුත් තැපැල් ලිපිනය',
    'form.emailPlaceholder': 'you@company.com',
    'form.subjectLabel': 'විෂය',
    'form.opt.web': 'ව්‍යාපාරික / E-Commerce වෙබ් අඩවියක්',
    'form.opt.pos': 'සාප්පු POS සහ කළමනාකරණ පද්ධතියක්',
    'form.opt.tools': 'ස්මාර්ට් වෙබ් මෙවලම් සහ ස්වයංක්‍රීයකරණය',
    'form.opt.repair': 'Nexia Repair Hub Demo ඉල්ලීම',
    'form.opt.courier': 'Nexia Order & Courier Pro Demo ඉල්ලීම',
    'form.opt.partner': 'හවුල්කාරිත්ව / Custom SaaS විමසීම',
    'form.opt.billing': 'බිල්පත්, මුදල් ආපසු ගෙවීම් සහ නීතිමය සහාය',
    'form.opt.general': 'පොදු විමසීමක්',
    'form.messageLabel': 'පණිවිඩය',
    'form.messagePlaceholder': 'ඔබේ ව්‍යාපෘතිය, කාලසීමාව හෝ සහාය අවශ්‍යතාවය පිළිබඳව සඳහන් කරන්න...',
    'form.submit': 'පණිවිඩය යවන්න',
    'form.mailtoFallback': 'ඔබේ Email මෘදුකාංගයෙන් යැවීමට කැමතිද? ↗',

    'footer.tagline': 'ශ්‍රී ලාංකේය ඩිජිටල් නිෂ්පාදන සහ SaaS මධ්‍යස්ථානය • දියතලාව, ඌව පළාත',
    'footer.copy': '© 2026 NexiaProLanka. සියලුම හිමිකම් ඇවිරිණි.',

    'modal.eyebrow': 'NexiaProLanka නීතිමය සහ අනුකූලතා ප්‍රතිපත්ති',
    'modal.effective': 'බලාත්මක දිනය: 2026 ජනවාරි 1 • විමසීම්: supportnexiapro@gmail.com',
    'modal.close': 'වසන්න',

    'offer.claim': 'විශේෂ දීමනාව • දැන්ම ලබාගන්න'
  };

  const UI_MESSAGES = {
    en: {
      copyEmail: 'Copy Email',
      copied: 'Copied!',
      sending: 'Sending Inquiry...',
      errName: 'Please enter your full name (at least 2 characters).',
      errEmail: 'Please enter a valid email address.',
      errMessage: 'Please provide a brief message (at least 10 characters).',
      mailtoRedirect: 'Opening your email client to send your inquiry directly to supportnexiapro@gmail.com.',
      submitSuccess: 'Thank you! Your inquiry has been sent to our team. We will respond to your email shortly.',
      submitError:
        'Unable to submit automatically right now. Please click "Open mail app ↗" below or email supportnexiapro@gmail.com directly — your message details are prefilled.'
    },
    si: {
      copyEmail: 'පිටපත් කරන්න',
      copied: 'පිටපත් විය!',
      sending: 'යවමින් පවතී...',
      errName: 'කරුණාකර ඔබේ සම්පූර්ණ නම ඇතුළත් කරන්න (අවම අකුරු 2ක්).',
      errEmail: 'කරුණාකර වලංගු විද්‍යුත් තැපැල් ලිපිනයක් ඇතුළත් කරන්න.',
      errMessage: 'කරුණාකර කෙටි පණිවිඩයක් ඇතුළත් කරන්න (අවම අකුරු 10ක්).',
      mailtoRedirect: 'supportnexiapro@gmail.com වෙත සෘජුවම පණිවිඩය යැවීමට ඔබේ Email මෘදුකාංගය විවෘත වේ.',
      submitSuccess: 'ස්තූතියි! ඔබේ විමසීම අපගේ කණ්ඩායම වෙත සාර්ථකව යවන ලදී. අපි ඉක්මනින් ප්‍රතිචාර දක්වන්නෙමු.',
      submitError:
        'ස්වයංක්‍රීයව යැවීමට නොහැකි විය. කරුණාකර පහත Email සබැඳිය ක්ලික් කරන්න හෝ supportnexiapro@gmail.com වෙත සෘජුවම ඊමේල් කරන්න.'
    }
  };

  /* --------------------------------------------------------------------------
     2. Bilingual PayHere-Ready Legal & Compliance Policies
     -------------------------------------------------------------------------- */
  const LEGAL_POLICIES = {
    en: {
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
    },
    si: {
      privacy: {
        title: 'රහස්‍යතා ප්‍රතිපත්තිය',
        html: `
          <p class="text-slate-200 font-medium">
            NexiaProLanka අපගේ සියලුම SaaS යෙදුම්, ප්‍රජා වේදිකා සහ වෙබ් මෙවලම් භාවිතා කරන පරිශීලකයින්ගේ පෞද්ගලිකත්වය සහ දත්ත ආරක්ෂා කිරීමට බැඳී සිටී.
          </p>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">1. අප රැස් කරන තොරතුරු</h3>
            <p>
              අපගේ සේවා සැපයීමට සහ ආරක්ෂා කිරීමට අවශ්‍ය අවම තොරතුරු පමණක් අපි රැස් කරමු. ඔබේ නම, ඊමේල් ලිපිනය, ව්‍යාපාරික විස්තර සහ පද්ධති ආරක්ෂාව සඳහා අවශ්‍ය තාක්ෂණික දත්ත මෙයට ඇතුළත් විය හැක.
            </p>
          </div>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">2. ගෙවීම් සහ ගනුදෙනු ආරක්ෂාව</h3>
            <p>
              සියලුම ඔන්ලයින් ගෙවීම් <strong>PayHere</strong> වැනි PCI-DSS ප්‍රමිතීන්ට අනුකූල ආරක්ෂිත ගෙවීම් ද්වාර හරහා සිදු කෙරේ. ඔබේ කාඩ්පත් අංක හෝ බැංකු තොරතුරු NexiaProLanka සර්වර්වල ගබඩා නොකෙරේ.
            </p>
          </div>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">3. දත්ත භාවිතය</h3>
            <ul class="list-disc pl-5 space-y-1.5">
              <li>ඔබේ SaaS හෝ ප්‍රජා ගිණුම සක්‍රීය කිරීමට සහ පවත්වාගෙන යාමට.</li>
              <li>අත්‍යවශ්‍ය සේවා දැනුම්දීම්, බිල්පත් සහ සහාය ප්‍රතිචාර යැවීමට.</li>
              <li>වේදිකාවේ ආරක්ෂාව සහ කාර්යක්ෂමතාව වැඩි දියුණු කිරීමට.</li>
            </ul>
          </div>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">4. දත්ත බෙදාගැනීම සහ ඉවත් කිරීම</h3>
            <p>
              අපි කිසිවිටෙකත් ඔබේ පුද්ගලික දත්ත තෙවන පාර්ශවයකට විකුණන්නේ හෝ බෙදා හරින්නේ නැත. ඔබේ ගිණුම හෝ දත්ත ඉවත් කිරීමට <a href="mailto:supportnexiapro@gmail.com" class="text-cyanx-400 underline">supportnexiapro@gmail.com</a> වෙත ඊමේල් කරන්න.
            </p>
          </div>
        `
      },
      terms: {
        title: 'සේවා කොන්දේසි',
        html: `
          <p class="text-slate-200 font-medium">
            NexiaProLanka විසින් පවත්වාගෙන යන ඕනෑම වෙබ් අඩවියක්, SaaS වේදිකාවක් හෝ මෙවලමක් භාවිතා කිරීමෙන් ඔබ මෙම සේවා කොන්දේසිවලට එකඟ වේ.
          </p>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">1. බලපත්‍රය සහ බලයලත් භාවිතය</h3>
            <p>
              Nexia Repair Hub, Nexia Order &amp; Courier Pro සහ Nexia Smart Utilities Suite ඇතුළු අපගේ මෘදුකාංග ඔබේ තෝරාගත් සැලසුමට අනුව නීත්‍යානුකූල පුද්ගලික හෝ ව්‍යාපාරික කටයුතු සඳහා භාවිතා කිරීමට අවසර හිමි වේ.
            </p>
          </div>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">2. පරිශීලක වගකීම්</h3>
            <ul class="list-disc pl-5 space-y-1.5">
              <li>ඔබේ ගිණුම් මුරපද සහ API යතුරු ආරක්ෂා කිරීම ඔබේ වගකීමකි.</li>
              <li>අපගේ පද්ධතිවලට අනවසරයෙන් පිවිසීමට හෝ කේතයන් අවභාවිත කිරීමට උත්සාහ නොකළ යුතුය.</li>
              <li>ඔබ සකසන සියලුම පාරිභෝගික දත්ත දේශීය නීතිවලට අනුකූල විය යුතුය.</li>
            </ul>
          </div>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">3. බුද්ධිමය දේපළ</h3>
            <p>
              සියලුම මූලාශ්‍ර කේත, UI නිර්මාණ සහ වෙළඳ ලකුණු NexiaProLanka සතු වේ. පරිශීලකයින් ඇතුළත් කරන ව්‍යාපාරික දත්ත අදාළ පරිශීලකයා සතු වේ.
            </p>
          </div>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">4. බලපැවැත්වෙන නීතිය</h3>
            <p>
              මෙම කොන්දේසි ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජයේ නීතිවලට යටත් වේ.
            </p>
          </div>
        `
      },
      refund: {
        title: 'මුදල් ආපසු ගෙවීමේ සහ අවලංගු කිරීමේ ප්‍රතිපත්තිය',
        html: `
          <p class="text-slate-200 font-medium">
            සියලුම ඩිජිටල් දායකත්වයන්, SaaS සැලසුම් සහ විශේෂිත මෘදුකාංග සේවා සඳහා NexiaProLanka සම්පූර්ණ විනිවිදභාවයෙන් කටයුතු කරයි.
          </p>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">1. දායකත්ව අවලංගු කිරීම</h3>
            <p>
              ඊළඟ බිල්පත් දිනයට පෙර ඕනෑම වේලාවක ඔබේ SaaS දායකත්වය අවලංගු කළ හැකිය. ගෙවා ඇති වත්මන් කාලසීමාව අවසන් වන තෙක් සේවාව ක්‍රියාත්මකව පවතින අතර ඉන්පසු ස්වයංක්‍රීය අයකිරීම් සිදු නොවේ.
            </p>
          </div>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">2. මුදල් ආපසු ගෙවීමේ සුදුසුකම්</h3>
            <ul class="list-disc pl-5 space-y-1.5">
              <li><strong>ද්විත්ව හෝ වැරදි අයකිරීම්:</strong> තහවුරු කිරීමෙන් පසු 100%ක් ආපසු ගෙවනු ලැබේ.</li>
              <li><strong>පළමු වරට ලබාගත් SaaS දායකත්වයන්:</strong> අපගේ සේවාවේ නොවිසඳුණු තාක්ෂණික දෝෂයක් හේතුවෙන් මිලදී ගැනීමෙන් දින <strong>7ක් ඇතුළත</strong> සම්පූර්ණ මුදල් ආපසු ඉල්ලීම් සලකා බලනු ලැබේ.</li>
              <li><strong>ආපසු නොගෙවන අයිතම:</strong> දැනටමත් නිම කර භාර දුන් විශේෂිත ව්‍යාපෘති අදියර සහ Domain/තෙවන පාර්ශවීය API ගාස්තු ආපසු ගෙවනු නොලැබේ.</li>
            </ul>
          </div>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">3. මුදල් ආපසු ගෙවීමේ කාලසීමාව</h3>
            <p>
              අනුමත මුදල් ආපසු ගෙවීම් වැඩ කරන දින <strong>3–5ක් ඇතුළත</strong> PayHere වැනි ගෙවීම් ද්වාරය හරහා මුල් ගෙවීම් ක්‍රමයටම යොමු කෙරේ.
            </p>
          </div>
          <div>
            <h3 class="font-display font-bold text-base text-white mb-2">4. ඉල්ලීමක් ඉදිරිපත් කරන ආකාරය</h3>
            <p>
              ඔබේ ලියාපදිංචි ඊමේල් ලිපිනය සහ ගනුදෙනු අංකය සමඟ <a href="mailto:supportnexiapro@gmail.com" class="text-cyanx-400 underline">supportnexiapro@gmail.com</a> වෙත ඊමේල් කරන්න.
            </p>
          </div>
        `
      }
    }
  };

  /* Cache original English DOM strings on first load so EN remains exact */
  const i18nTextNodes = document.querySelectorAll('[data-i18n]');
  const i18nHtmlNodes = document.querySelectorAll('[data-i18n-html]');
  const i18nPlaceholderNodes = document.querySelectorAll('[data-i18n-placeholder]');
  const langButtons = document.querySelectorAll('[data-lang-btn]');
  const copyEmailLabelEl = document.getElementById('copy-email-label');

  i18nTextNodes.forEach((el) => {
    el.dataset.i18nEn = el.textContent;
  });
  i18nHtmlNodes.forEach((el) => {
    el.dataset.i18nEnHtml = el.innerHTML;
  });
  i18nPlaceholderNodes.forEach((el) => {
    el.dataset.i18nEnPlaceholder = el.getAttribute('placeholder') || '';
  });

  function updateLangButtonStyles(lang) {
    langButtons.forEach((btn) => {
      const isActive = btn.getAttribute('data-lang-btn') === lang;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('bg-cyanx-400', isActive);
      btn.classList.toggle('text-obsidian-950', isActive);
      btn.classList.toggle('text-slate-300', !isActive);
      btn.classList.toggle('hover:text-white', !isActive);
    });
  }

  function applyLanguage(lang, persist = true) {
    const normalizedLang = lang === 'si' ? 'si' : 'en';
    currentLang = normalizedLang;
    document.documentElement.lang = normalizedLang;

    if (normalizedLang === 'si') {
      document.body.style.fontFamily = '"Noto Sans Sinhala", "Inter", system-ui, sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }

    i18nTextNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (normalizedLang === 'si' && SI_TRANSLATIONS[key]) {
        el.textContent = SI_TRANSLATIONS[key];
      } else if (el.dataset.i18nEn !== undefined) {
        el.textContent = el.dataset.i18nEn;
      }
    });

    i18nHtmlNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (normalizedLang === 'si' && SI_TRANSLATIONS[key]) {
        el.innerHTML = SI_TRANSLATIONS[key];
      } else if (el.dataset.i18nEnHtml !== undefined) {
        el.innerHTML = el.dataset.i18nEnHtml;
      }
    });

    i18nPlaceholderNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (normalizedLang === 'si' && SI_TRANSLATIONS[key]) {
        el.setAttribute('placeholder', SI_TRANSLATIONS[key]);
      } else if (el.dataset.i18nEnPlaceholder !== undefined) {
        el.setAttribute('placeholder', el.dataset.i18nEnPlaceholder);
      }
    });

    if (copyEmailLabelEl) {
      copyEmailLabelEl.textContent = UI_MESSAGES[normalizedLang].copyEmail;
    }

    updateLangButtonStyles(normalizedLang);

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, normalizedLang);
      } catch {
        // Ignore storage errors in restricted browsing contexts
      }
    }

    if (activeModalPolicyKey) {
      openLegalModal(activeModalPolicyKey, false);
    }
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang-btn');
      applyLanguage(targetLang, true);
    });
  });

  /* --------------------------------------------------------------------------
     3. Scroll-Reveal Observer
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
     4. Mobile Navigation Drawer
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
     5. Legal & Compliance Modals (#privacy, #terms, #refund)
     -------------------------------------------------------------------------- */
  const legalModal = document.getElementById('legal-modal');
  const legalModalTitle = document.getElementById('legal-modal-title');
  const legalModalBody = document.getElementById('legal-modal-body');
  const legalModalClose = document.getElementById('legal-modal-close');
  const legalModalDone = document.getElementById('legal-modal-done');
  const legalModalBackdrop = document.getElementById('legal-modal-backdrop');
  const legalTabs = document.querySelectorAll('[data-legal-tab]');
  const legalTriggers = document.querySelectorAll('[data-legal-modal]');

  function openLegalModal(policyKey, updateHash = true) {
    const langPolicies = LEGAL_POLICIES[currentLang] || LEGAL_POLICIES.en;
    const policy = langPolicies[policyKey];
    if (!policy || !legalModal) return;

    activeModalPolicyKey = policyKey;
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
    activeModalPolicyKey = null;
    legalModal.classList.add('hidden');
    legalModal.classList.remove('flex');
    document.body.style.overflow = '';

    const currentHash = window.location.hash.replace('#', '');
    if (LEGAL_POLICIES.en[currentHash]) {
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
    if (LEGAL_POLICIES.en[hashKey]) {
      openLegalModal(hashKey, false);
    }
  }

  window.addEventListener('hashchange', checkLegalHash);

  /* --------------------------------------------------------------------------
     6. One-Click Copy Email
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (copyEmailBtn && copyEmailLabelEl) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'supportnexiapro@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      copyEmailLabelEl.textContent = UI_MESSAGES[currentLang].copied;
      setTimeout(() => {
        copyEmailLabelEl.textContent = UI_MESSAGES[currentLang].copyEmail;
      }, 2200);
    });
  }

  /* --------------------------------------------------------------------------
     7. Contact Form Client-Side Validation & Web3Forms Submission
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitBtnDefaultHtml = submitBtn ? submitBtn.innerHTML : '';

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

  function setSubmittingState(isSubmitting) {
    if (!submitBtn) return;
    submitBtn.disabled = isSubmitting;
    if (isSubmitting) {
      submitBtn.textContent = UI_MESSAGES[currentLang].sending;
    } else {
      submitBtn.innerHTML = submitBtnDefaultHtml;
      const submitSpan = submitBtn.querySelector('[data-i18n="form.submit"]');
      if (submitSpan && currentLang === 'si') {
        submitSpan.textContent = SI_TRANSLATIONS['form.submit'];
      }
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const msgs = UI_MESSAGES[currentLang];
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || name.length < 2) {
        showFeedback(msgs.errName, true);
        return;
      }

      if (!emailPattern.test(email)) {
        showFeedback(msgs.errEmail, true);
        return;
      }

      if (!message || message.length < 10) {
        showFeedback(msgs.errMessage, true);
        return;
      }

      const mailtoFallback = document.getElementById('mailto-fallback');
      const mailtoBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailtoHref = `mailto:supportnexiapro@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

      if (mailtoFallback) {
        mailtoFallback.setAttribute('href', mailtoHref);
      }

      const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
      const accessKey = accessKeyInput ? accessKeyInput.value.trim() : '';

      if (!accessKey) {
        showFeedback(msgs.mailtoRedirect, false);
        window.location.href = mailtoHref;
        contactForm.reset();
        return;
      }

      setSubmittingState(true);

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showFeedback(msgs.submitSuccess, false);
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch {
        showFeedback(msgs.submitError, true);
      } finally {
        setSubmittingState(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. Service Quote & Product Demo Subject Pre-Selection
     -------------------------------------------------------------------------- */
  const quoteTriggers = document.querySelectorAll('[data-quote-subject]');
  const contactSubjectSelect = document.getElementById('contact-subject');
  const contactNameInput = document.getElementById('contact-name');

  quoteTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetSubject = trigger.getAttribute('data-quote-subject');
      if (contactSubjectSelect && targetSubject) {
        const hasOption = Array.from(contactSubjectSelect.options).some(
          (opt) => opt.value === targetSubject
        );
        if (hasOption) {
          contactSubjectSelect.value = targetSubject;
        }
      }
      if (contactNameInput) {
        setTimeout(() => contactNameInput.focus({ preventScroll: true }), 450);
      }
    });
  });

  /* --------------------------------------------------------------------------
     9. Interactive FAQ Accordion
     -------------------------------------------------------------------------- */
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      const icon = trigger.querySelector('.faq-icon');

      faqTriggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherPanelId = otherTrigger.getAttribute('aria-controls');
          const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
          const otherIcon = otherTrigger.querySelector('.faq-icon');
          if (otherPanel) otherPanel.classList.add('hidden');
          if (otherIcon) otherIcon.classList.remove('rotate-180');
        }
      });

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (panel) panel.classList.toggle('hidden', isExpanded);
      if (icon) icon.classList.toggle('rotate-180', !isExpanded);
    });
  });

  /* --------------------------------------------------------------------------
     10. Restore Saved Language & Initialize Hash Modals
     -------------------------------------------------------------------------- */
  let savedLang = 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'si' || stored === 'en') {
      savedLang = stored;
    }
  } catch {
    savedLang = 'en';
  }

  if (savedLang !== 'en') {
    applyLanguage(savedLang, false);
  } else {
    updateLangButtonStyles('en');
  }

  checkLegalHash();

  /* --------------------------------------------------------------------------
     11. Floating Promotional Offer Widget
     -------------------------------------------------------------------------- */
  const offerWidget = document.getElementById('offer-widget');
  const offerDismissBtn = document.getElementById('offer-dismiss-btn');
  const OFFER_DISMISSED_KEY = 'nexia_offer_dismissed';

  if (offerWidget) {
    let isDismissed = false;
    try {
      isDismissed = sessionStorage.getItem(OFFER_DISMISSED_KEY) === 'true';
    } catch {
      isDismissed = false;
    }

    if (isDismissed) {
      offerWidget.classList.add('hidden');
    }

    if (offerDismissBtn) {
      offerDismissBtn.addEventListener('click', () => {
        offerWidget.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        setTimeout(() => {
          offerWidget.classList.add('hidden');
        }, 250);
        try {
          sessionStorage.setItem(OFFER_DISMISSED_KEY, 'true');
        } catch {
          // Ignore storage errors in restricted browsing contexts
        }
      });
    }
  }
})();
