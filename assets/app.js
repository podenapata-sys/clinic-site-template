/* ============================================================
   CONTACT DENTAL — data, i18n and interactions (no build step)
   ============================================================ */

/* ---------- Contact constants ----------
   Supplied by assets/clinic-compat.js, which builds window.CONTACT from
   assets/clinic.config.js. It must be loaded before this file.

   Declaring the object here as well is what previously kept a clinic's phone
   number in two places at once; a booking button pointing at the wrong WhatsApp
   number looks perfectly fine on screen and sends every enquiry to a stranger. */
const CONTACT = window.CONTACT || {};

/* ---------- Price list (single source of truth) ----------
   min/max in BDT used by the cost calculator.
   perTooth => quantity selector shown.                       */
// Ordered to mirror the homepage service-menu serial.
const CATS = (window.CLINIC_CONTENT || {}).cats || {};

const PRICES = (window.CLINIC_CONTENT || {}).prices || [];

/* ---------- Services (homepage grid) ---------- */
/* Content lives in assets/content.js so the admin editor can publish it.
   Loaded before this file; the fallbacks keep app.js harmless if it is absent. */
const SERVICES = (window.CLINIC_CONTENT || {}).services || [];

/* ---------- i18n strings ---------- */
const I18N = {
  en: {
    nav_home:"Home", nav_about:"About", nav_services:"Services", nav_pricing:"Pricing",
    nav_calc:"Estimate", nav_ba:"Before & After", nav_contact:"Contact",
    book:"Book Appointment", call:"Call Now",
    topbar:"Painless & Cosmetic Dental Care · Sat–Thu 10:00 AM–9:30 PM · Fri 11:00 AM–9:30 PM",
    hero_eyebrow:"Trusted Dental Clinic in Dhaka",
    hero_title:"Discover your smile <span>healthy</span> & bright",
    hero_text:"Modern, painless and affordable dental care at Example Dental. From routine check-up to implant and smile makeover — your comfort comes first.",
    hero_b1:"Painless Treatment", hero_b2:"Modern Technology", hero_b3:"Affordable Pricing", hero_b4:"Expert Surgeon",
    g_reviews:"Google Reviews",
    tb_addr:"West Kazipara, Dhaka", tb_hours:"Sat–Thu: 10:00 AM – 9:00 PM",
    rev_us:"Review Us", hp_label:"Happy Patients",
    fb1_t:"Modern Technology", fb1_s:"Latest equipment for accurate treatment",
    fb2_t:"Experienced Doctors", fb2_s:"Skilled & friendly dental specialists",
    fb3_t:"Safe & Hygienic", fb3_s:"Highest standards of sterilization",
    fb4_t:"Patient Comfort", fb4_s:"Painless & comfortable dental care",
    hero_badge_t:"Trusted by {n}+ patients", hero_badge_s:"Gentle, expert care", hero_badge2_s:"Sterilization & Safety",
    stat1:"Happy Patients", stat2:"Years Experience", stat3:"Services Available", stat4:"Satisfaction",
    services_eyebrow:"Our Services",
    services_title:"All dental care in one place",
    services_text:"Every treatment you need — modern, 100% sterile and reasonably priced.",
    why_eyebrow:"Why Example Dental",
    why_title:"Gentle care you can trust",
    why_text:"We combine advanced equipment with a genuinely painless approach, so every visit feels easy.",
    why1:"Painless, anxiety-free treatment", why2:"Strict sterilization & safety", why3:"Transparent, affordable pricing",
    why4:"Experienced, friendly dental surgeon", why5:"Modern equipment & techniques", why6:"Same-day & emergency care",
    calc_eyebrow:"Cost Estimator",
    calc_title:"Estimate your treatment cost",
    calc_text:"Pick a treatment to see an instant price estimate. Final cost is confirmed after your check-up.",
    calc_service:"Select treatment", calc_qty:"No. of Teeth / Units", calc_result:"Estimated Cost",
    calc_category:"Treatment Category", calc_serviceopt:"Service Option",
    calc_head1:"Treatment", calc_head2:"Price Calculator",
    calc_note:"Approximate estimate — Taka is exact; USD is converted (≈৳123/$1). Book a check-up for a precise quote.",
    calc_book:"Book this treatment",
    pricing_eyebrow:"Transparent Pricing",
    pricing_title:"Treatment price list",
    pricing_text:"Clear, upfront pricing for every treatment. Prices in Bangladeshi Taka (৳).",
    pricing_th1:"Treatment", pricing_th2:"Price (BDT)", per_tooth:"Per Tooth",
    ba_eyebrow:"Real Results",
    ba_title:"Before & after smiles",
    ba_text:"Drag the slider to see the transformation our patients enjoy.",
    ba_before:"Before", ba_after:"After",
    ba_note:"Illustrative examples. Results differ from patient to patient.",
    ba_f_all:"All", ba_f_whitening:"Whitening", ba_f_braces:"Braces", ba_f_veneers:"Veneers", ba_f_implants:"Implants",
    doc_eyebrow:"Meet the Doctor",
    doc_name:"Dr. Ayesha Rahman",
    doc_role:"Chief Dental Surgeon, Example Dental",
    doc_text:"Dr. Ayesha Rahman leads Example Dental with a focus on painless and cosmetic dentistry, helping patients of all ages achieve healthy, confident smiles.",
    doc_c1:"BDS (DU), BMDC Reg. No. 11071",
    doc_c2:"PGT in Oral & Maxillofacial Surgery — Dhaka Dental College",
    doc_c3:"PGT in Paediatrics — Dhaka Dental College",
    doc_c4:"Specially trained in Painless & Cosmetic Treatment",
    doc_book:"Book with Dr. Example",
    test_eyebrow:"Patient Stories",
    test_title:"Loved by our patients",
    contact_eyebrow:"Visit Us",
    contact_title:"Find Example Dental",
    contact_addr_l:"Address", contact_phone_l:"Phone", contact_wa_l:"WhatsApp", contact_email_l:"Email", contact_hours_l:"Hours",
    contact_phone_main_l:"Main", contact_phone_appt_l:"Appointments",
    contact_addr:"1252/3, East Monipur, Metro Pillar-267 (W), West Kazipara, Begum Rokeya Soroni, Dhaka",
    contact_hours:"Saturday – Thursday: 10:00 AM – 9:30 PM · Friday: 11:00 AM – 9:30 PM",
    contact_dir:"Get Directions",
    book_eyebrow:"Appointments",
    book_title:"Book your appointment",
    book_text:"Pick a treatment, date and time below — we'll confirm instantly on WhatsApp.",
    book_side_eyebrow:"Prefer to talk?",
    book_side_title:"Message or call us directly",
    book_side_text:"Send us a quick WhatsApp message, call the clinic, or get directions — whatever is easiest for you.",
    f_name:"Full name", f_phone:"Phone number", f_service:"Treatment needed",
    f_date:"Preferred date", f_time:"Preferred time", f_date_ph:"Type or pick a date", f_time_ph:"Type or pick a time", f_today:"Today", f_tomorrow:"Tomorrow", f_address:"Address (optional)", f_address_ph:"House / road / area",
    f_emerg:"This is an emergency / I need same-day care",
    f_consent:'I agree that my details will be sent to Example Dental via WhatsApp, as described in the <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a>.',
    cb_consent:'I agree to be contacted about my request, as described in the <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a>.',
    consent_alert:"Please tick the consent box so we can contact you.",
    book_wa_note:'🔒 Your details are sent to us via WhatsApp. See our <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a>.',
    f_select:"Select a treatment", f_submit:"Send via WhatsApp", f_wa:"Quick WhatsApp",
    f_success:"Your request is saved. Send it on WhatsApp so we can confirm quickly.",
    f_send_wa:"Send on WhatsApp",
    foot_about:"Modern, painless and affordable dental care in Dhaka. Healthy smiles for the whole family.",
    foot_links:"Quick Links", foot_services:"Services", foot_contact:"Contact",
    foot_rights:"All rights reserved.",
    nav_tech:"Technology", nav_faq:"FAQ",
    nav_contact_link:"Contact",
    cb_title:"Request a Free Callback", cb_ph:"Enter Your Number", cb_wa:"WhatsApp",
    cb_name_ph:"Your Name",
    cb_success:"Thanks! We have your number and will call you back.",
    nav_about_us:"About Us", nav_ourservices:"Our Services", nav_branch:"Branch",
    nav_doctors:"Doctors", nav_pricelist:"Price List", nav_blog:"Blog", nav_gallery:"Gallery", nav_careers:"Career",
    srch_ph:"Search treatments, prices, FAQs…", srch_hint:"↑↓ navigate · Enter open · Esc close",
    srch_services:"Services", srch_pricing:"Pricing", srch_faq:"FAQ", srch_blog:"Blog", srch_tech:"Technology",
    srch_empty:"No results found. Try a different keyword.",
    svc_learn:"Learn more", book_now:"Book Now", view_all:"View All Treatments",
    dd_gapfill:"Teeth Gap Filling", dd_toothfill:"Tooth Filling", dd_implant:"Dental Implant",
    dd_ortho:"Orthodontic Treatment", dd_scaling:"Teeth Scaling & Polishing",
    dd_wisdom:"Wisdom Teeth Removal", dd_rct:"Root Canal Treatment (RCT)", dd_more:"More Services",
    steps_eyebrow:"How It Works", steps_title:"Your visit in 4 easy steps",
    steps_text:"From your first message to aftercare, we keep everything simple and stress-free.",
    step1_t:"Book", step1_d:"Request an appointment online, by phone or WhatsApp — same-day slots available.",
    step2_t:"Consult", step2_d:"Meet our doctors for a thorough check-up and a clear, honest treatment plan.",
    step3_t:"Treatment", step3_d:"Relax through gentle, painless treatment using modern equipment.",
    step4_t:"Aftercare", step4_d:"Go home with simple care tips and easy follow-up support.",
    tech_eyebrow:"Technology & Safety",
    tech_title:"Modern tools, 10x safer care",
    tech_text:"We invest in advanced equipment and strict hygiene, so every treatment is precise, comfortable and safe.",
    emerg_eyebrow:"Always Here For You",
    emerg_title:"Dental emergency? We're ready",
    emerg_text:"Same-day appointments for urgent pain, and online video consultations for patients living abroad (NRB).",
    emerg_b1:"Same-day emergency care", emerg_b2:"Online video consultation", emerg_b3:"Friendly support on WhatsApp",
    emerg_call:"Call for emergency", emerg_video:"Book a video consult",
    faq_eyebrow:"Questions", faq_title:"Frequently asked questions",
    tips_eyebrow:"Dental Tips", tips_title:"Healthy-smile tips & guides",
    tips_read:"Read more",
    wa_online:"● Online now", wa_greeting:"Hi! 👋 How can we help you today? We typically reply within minutes.",
    wa_chip_book:"📅 Book Appointment", wa_chip_price:"💰 Treatment Price?", wa_chip_q:"❓ Ask a Question",
    wa_start:"Start Chat on WhatsApp →",
    google_reviews_label:"Based on our Google reviews",
    qr_scan_label:"Scan to review us on Google",
    see_reviews:"See All Reviews →",
    share_experience:"Share Your Experience",
    hero_wa:"WhatsApp Us",
    lang_label:"বাংলা",
  },
  bn: {
    nav_home:"হোম", nav_about:"পরিচিতি", nav_services:"সেবা", nav_pricing:"মূল্য",
    nav_calc:"খরচ হিসাব", nav_ba:"আগে ও পরে", nav_contact:"যোগাযোগ",
    book:"অ্যাপয়েন্টমেন্ট নিন", call:"কল করুন",
    topbar:"ব্যথাহীন ও কসমেটিক ডেন্টাল কেয়ার · শনি–বৃহঃ সকাল ১০টা–রাত ৯:৩০ · শুক্র দুপুর ১১টা–রাত ৯:৩০",
    hero_eyebrow:"ঢাকার বিশ্বস্ত ডেন্টাল ক্লিনিক",
    hero_title:"আপনার হাসি রাখুন <span>সুস্থ</span> ও উজ্জ্বল",
    hero_text:"উদাহরণ ডেন্টালে আধুনিক, ব্যথাহীন ও সাশ্রয়ী খরচে দাঁতের চিকিৎসা। সাধারণ চেকআপ থেকে নতুন দাঁত বসানো আর হাসি সুন্দর করা — সবার আগে আপনার আরাম।",
    hero_b1:"ব্যথাহীন চিকিৎসা", hero_b2:"আধুনিক যন্ত্রপাতি", hero_b3:"সাশ্রয়ী খরচ", hero_b4:"অভিজ্ঞ ডাক্তার",
    g_reviews:"গুগল রিভিউ",
    tb_addr:"পশ্চিম কাজীপাড়া, ঢাকা", tb_hours:"শনি–বৃহ: সকাল ১০টা – রাত ৯টা",
    rev_us:"রিভিউ দিন", hp_label:"সন্তুষ্ট রোগী",
    fb1_t:"আধুনিক যন্ত্রপাতি", fb1_s:"সঠিক চিকিৎসার জন্য আধুনিক যন্ত্রপাতি",
    fb2_t:"অভিজ্ঞ ডাক্তার", fb2_s:"অভিজ্ঞ ও বন্ধুত্বপূর্ণ দাঁতের ডাক্তার",
    fb3_t:"নিরাপদ ও পরিষ্কার", fb3_s:"সবকিছু ভালোভাবে জীবাণুমুক্ত",
    fb4_t:"রোগীর আরাম", fb4_s:"ব্যথাহীন ও আরামদায়ক দাঁতের সেবা",
    hero_badge_t:"{n}+ রোগীর আস্থা", hero_badge_s:"কোমল, দক্ষ সেবা", hero_badge2_s:"জীবাণুমুক্ত ও নিরাপদ",
    stat1:"সন্তুষ্ট রোগী", stat2:"বছরের অভিজ্ঞতা", stat3:"সেবা আছে", stat4:"সন্তুষ্টি",
    services_eyebrow:"আমাদের সেবা",
    services_title:"এক জায়গাতেই দাঁতের সব সেবা",
    services_text:"আপনার দরকারি সব সেবা — আধুনিক যন্ত্র, ১০০% সম্পূর্ণ জীবাণুমুক্ত আর সাশ্রয়ী দামে।",
    why_eyebrow:"কেন উদাহরণ ডেন্টাল",
    why_title:"আস্থা রাখার মতো কোমল সেবা",
    why_text:"আধুনিক যন্ত্রপাতি আর সত্যিকারের ব্যথাহীন চিকিৎসা — প্রতিবার আসা হয় সহজ।",
    why1:"ব্যথা ও ভয় ছাড়া চিকিৎসা", why2:"ভালোভাবে জীবাণুমুক্ত ও নিরাপদ", why3:"পরিষ্কার ও সাশ্রয়ী দাম",
    why4:"অভিজ্ঞ ও বন্ধুত্বপূর্ণ দাঁতের ডাক্তার", why5:"আধুনিক যন্ত্রপাতি ও পদ্ধতি", why6:"একই দিনে ও জরুরি সেবা",
    calc_eyebrow:"খরচের হিসাব",
    calc_title:"আপনার চিকিৎসার খরচ হিসাব করুন",
    calc_text:"একটি চিকিৎসা বেছে নিন, সঙ্গে সঙ্গে খরচের ধারণা পাবেন। আসল খরচ চেকআপের পর জানা যাবে।",
    calc_service:"চিকিৎসা নির্বাচন করুন", calc_qty:"দাঁত / ইউনিট সংখ্যা", calc_result:"আনুমানিক খরচ",
    calc_category:"চিকিৎসার ধরন", calc_serviceopt:"সেবা নির্বাচন",
    calc_head1:"চিকিৎসা", calc_head2:"খরচের হিসাব",
    calc_note:"আনুমানিক হিসাব — টাকার দাম মূল, ডলার রূপান্তরিত (≈৳১২৩/$১)। সঠিক দাম জানতে চেকআপ বুক করুন।",
    calc_book:"এই চিকিৎসা বুক করুন",
    pricing_eyebrow:"স্বচ্ছ মূল্য",
    pricing_title:"চিকিৎসার মূল্য তালিকা",
    pricing_text:"প্রতিটি চিকিৎসার দাম আগে থেকেই পরিষ্কার। দাম বাংলাদেশি টাকায় (৳)।",
    pricing_th1:"চিকিৎসা", pricing_th2:"মূল্য (টাকা)", per_tooth:"প্রতি দাঁত",
    ba_eyebrow:"সত্যিকারের ফলাফল",
    ba_title:"আগে ও পরের হাসি",
    ba_text:"পরিবর্তন দেখতে স্লাইডারটি টেনে দেখুন।",
    ba_before:"আগে", ba_after:"পরে",
    ba_note:"প্রতীকী আয়েশা। ফলাফল রোগীভেদে ভিন্ন হয়।",
    ba_f_all:"সব", ba_f_whitening:"হোয়াইটেনিং", ba_f_braces:"ব্রেসেস", ba_f_veneers:"ভিনেয়ার", ba_f_implants:"ইমপ্লান্ট",
    doc_eyebrow:"আমাদের চিকিৎসক",
    doc_name:"ডা. আয়েশা রহমান",
    doc_role:"চিফ ডেন্টাল সার্জন, উদাহরণ ডেন্টাল",
    doc_text:"ডা. আয়েশা রহমান ব্যথাহীন ও সৌন্দর্যের দাঁতের চিকিৎসায় বিশেষ যত্ন নিয়ে উদাহরণ ডেন্টাল চালান। সব বয়সের রোগীকে সুস্থ ও আত্মবিশ্বাসী হাসি দিতে তিনি সাহায্য করেন।",
    doc_c1:"বিডিএস (ঢাবি), বিএমডিসি রেজি. নং ১১০৭১",
    doc_c2:"পিজিটি ইন ওরাল ও ম্যাক্সিলোফেসিয়াল সার্জারি — ঢাকা ডেন্টাল কলেজ",
    doc_c3:"পিজিটি ইন পেডিয়াট্রিক্স — ঢাকা ডেন্টাল কলেজ",
    doc_c4:"ব্যথাহীন ও সৌন্দর্যের চিকিৎসায় বিশেষভাবে দক্ষ",
    doc_book:"ডা. আয়েশা রহমানর অ্যাপয়েন্টমেন্ট",
    test_eyebrow:"রোগীদের কথা",
    test_title:"রোগীদের ভালোবাসায়",
    contact_eyebrow:"আমাদের কাছে আসুন",
    contact_title:"উদাহরণ ডেন্টাল খুঁজুন",
    contact_addr_l:"ঠিকানা", contact_phone_l:"ফোন", contact_wa_l:"হোয়াটসঅ্যাপ", contact_email_l:"ইমেইল", contact_hours_l:"সময়",
    contact_phone_main_l:"মূল", contact_phone_appt_l:"অ্যাপয়েন্টমেন্ট",
    contact_addr:"১২৫২/৩, পূর্ব মনিপুর, মেট্রো পিলার-২৬৭ (ওয়াই), পশ্চিম কাজীপাড়া, বেগম রোকেয়া সরণি, ঢাকা",
    contact_hours:"শনিবার – বৃহস্পতিবার: সকাল ১০টা – রাত ৯:৩০ · শুক্রবার: দুপুর ১১টা – রাত ৯:৩০",
    contact_dir:"দিকনির্দেশ নিন",
    book_eyebrow:"অ্যাপয়েন্টমেন্ট",
    book_title:"আপনার অ্যাপয়েন্টমেন্ট বুক করুন",
    book_text:"নিচে চিকিৎসা, তারিখ ও সময় বেছে নিন — আমরা সঙ্গে সঙ্গে হোয়াটসঅ্যাপে নিশ্চিত করব।",
    book_side_eyebrow:"সরাসরি কথা বলবেন?",
    book_side_title:"মেসেজ বা কল করুন",
    book_side_text:"দ্রুত হোয়াটসঅ্যাপ মেসেজ দিন, ক্লিনিকে কল করুন, অথবা দিকনির্দেশ নিন — যেটি আপনার জন্য সহজ।",
    f_name:"পুরো নাম", f_phone:"ফোন নম্বর", f_service:"প্রয়োজনীয় চিকিৎসা",
    f_date:"পছন্দের তারিখ", f_time:"পছন্দের সময়", f_date_ph:"তারিখ লিখুন বা বেছে নিন", f_time_ph:"সময় লিখুন বা বেছে নিন", f_today:"আজ", f_tomorrow:"আগামীকাল", f_address:"ঠিকানা (ঐচ্ছিক)", f_address_ph:"বাসা / রোড / এলাকা",
    f_emerg:"এটি জরুরি / আমার একই দিনে সেবা দরকার",
    f_consent:'আমি সম্মত যে আমার তথ্য <a href="privacy-policy.html" target="_blank" rel="noopener">প্রাইভেসি পলিসি</a> অনুযায়ী হোয়াটসঅ্যাপে উদাহরণ ডেন্টালে পাঠানো হবে।',
    cb_consent:'আমি <a href="privacy-policy.html" target="_blank" rel="noopener">প্রাইভেসি পলিসি</a> অনুযায়ী আমার অনুরোধ নিয়ে যোগাযোগে সম্মত।',
    consent_alert:"যোগাযোগ করতে অনুগ্রহ করে সম্মতির ঘরটি টিক দিন।",
    book_wa_note:'🔒 আপনার তথ্য হোয়াটসঅ্যাপে আমাদের কাছে পাঠানো হয়। দেখুন আমাদের <a href="privacy-policy.html" target="_blank" rel="noopener">প্রাইভেসি পলিসি</a>।',
    f_select:"একটি চিকিৎসা নির্বাচন করুন", f_submit:"হোয়াটসঅ্যাপে পাঠান", f_wa:"দ্রুত হোয়াটসঅ্যাপ",
    f_success:"আপনার অনুরোধ সংরক্ষিত হয়েছে। দ্রুত নিশ্চিত করতে হোয়াটসঅ্যাপে পাঠান।",
    f_send_wa:"হোয়াটসঅ্যাপে পাঠান",
    foot_about:"ঢাকায় আধুনিক, ব্যথাহীন ও সাশ্রয়ী খরচে দাঁতের চিকিৎসা। পুরো পরিবারের সুস্থ হাসি।",
    foot_links:"দ্রুত লিংক", foot_services:"সেবা", foot_contact:"যোগাযোগ",
    foot_rights:"সর্বস্বত্ব সংরক্ষিত।",
    nav_tech:"প্রযুক্তি", nav_faq:"প্রশ্নোত্তর",
    nav_contact_link:"যোগাযোগ",
    cb_title:"ফ্রি কলব্যাক অনুরোধ করুন", cb_ph:"আপনার নম্বর লিখুন", cb_wa:"হোয়াটসঅ্যাপ",
    cb_name_ph:"আপনার নাম",
    cb_success:"ধন্যবাদ! আপনার নম্বর পেয়েছি, আমরা কল করব।",
    nav_about_us:"আমাদের সম্পর্কে", nav_ourservices:"আমাদের সেবা", nav_branch:"শাখা",
    nav_doctors:"ডাক্তার", nav_pricelist:"মূল্য তালিকা", nav_blog:"ব্লগ", nav_gallery:"গ্যালারি", nav_careers:"ক্যারিয়ার",
    srch_ph:"চিকিৎসা, মূল্য, প্রশ্নোত্তর খুঁজুন…", srch_hint:"↑↓ নেভিগেট · Enter খুলুন · Esc বন্ধ করুন",
    srch_services:"সেবা", srch_pricing:"মূল্য তালিকা", srch_faq:"প্রশ্নোত্তর", srch_blog:"ব্লগ", srch_tech:"প্রযুক্তি",
    srch_empty:"কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ চেষ্টা করুন।",
    svc_learn:"বিস্তারিত", book_now:"বুক করুন", view_all:"সব চিকিৎসা দেখুন",
    dd_gapfill:"দাঁতের ফাঁক ফিলিং", dd_toothfill:"দাঁতের ফিলিং", dd_implant:"ডেন্টাল ইমপ্লান্ট",
    dd_ortho:"অর্থোডন্টিক চিকিৎসা", dd_scaling:"স্কেলিং ও পলিশিং",
    dd_wisdom:"আক্কেল দাঁত তোলা", dd_rct:"রুট ক্যানেল চিকিৎসা (RCT)", dd_more:"আরও সেবা",
    steps_eyebrow:"যেভাবে কাজ করে", steps_title:"৪টি সহজ ধাপে আপনার ভিজিট",
    steps_text:"প্রথম মেসেজ থেকে চিকিৎসার পরের যত্ন পর্যন্ত — সবকিছু আমরা সহজ ও চিন্তামুক্ত রাখি।",
    step1_t:"বুক করুন", step1_d:"অনলাইন, ফোন বা হোয়াটসঅ্যাপে অ্যাপয়েন্টমেন্ট নিন — একই দিনের স্লট আছে।",
    step2_t:"পরামর্শ", step2_d:"আমাদের ডাক্তারের সঙ্গে পুরো চেকআপ আর পরিষ্কার, সৎ চিকিৎসার পরিকল্পনা।",
    step3_t:"চিকিৎসা", step3_d:"আধুনিক যন্ত্রপাতিতে কোমল, ব্যথাহীন চিকিৎসায় নিশ্চিন্ত থাকুন।",
    step4_t:"পরের যত্ন", step4_d:"সহজ যত্নের পরামর্শ আর ফলোআপ সহায়তা নিয়ে বাড়ি ফিরুন।",
    tech_eyebrow:"প্রযুক্তি ও নিরাপত্তা",
    tech_title:"আধুনিক যন্ত্র, ১০ গুণ নিরাপদ সেবা",
    tech_text:"আমরা আধুনিক যন্ত্রপাতি আর ভালো পরিষ্কার-পরিচ্ছন্নতায় জোর দিই, যাতে প্রতিটি চিকিৎসা সঠিক, আরামদায়ক ও নিরাপদ হয়।",
    emerg_eyebrow:"সবসময় আপনার পাশে",
    emerg_title:"দাঁতের জরুরি সমস্যা? আমরা প্রস্তুত",
    emerg_text:"জরুরি ব্যথায় একই দিনের অ্যাপয়েন্টমেন্ট এবং প্রবাসী (এনআরবি) রোগীদের জন্য অনলাইন ভিডিও পরামর্শ।",
    emerg_b1:"একই দিনে জরুরি সেবা", emerg_b2:"অনলাইন ভিডিও পরামর্শ", emerg_b3:"হোয়াটসঅ্যাপে সহায়তা",
    emerg_call:"জরুরি কল করুন", emerg_video:"ভিডিও পরামর্শ বুক করুন",
    faq_eyebrow:"প্রশ্ন", faq_title:"সবার সাধারণ প্রশ্ন",
    tips_eyebrow:"ডেন্টাল টিপস", tips_title:"সুস্থ হাসির টিপস ও গাইড",
    tips_read:"আরও পড়ুন",
    wa_online:"● এখন অনলাইন", wa_greeting:"হ্যালো! 👋 আপনাকে কীভাবে সাহায্য করতে পারি? আমরা কয়েক মিনিটের মধ্যে উত্তর দিই।",
    wa_chip_book:"📅 অ্যাপয়েন্টমেন্ট নিন", wa_chip_price:"💰 চিকিৎসার খরচ?", wa_chip_q:"❓ প্রশ্ন করুন",
    wa_start:"WhatsApp-এ চ্যাট শুরু করুন →",
    google_reviews_label:"আমাদের গুগল রিভিউয়ের ভিত্তিতে",
    qr_scan_label:"গুগলে রিভিউ দিতে স্ক্যান করুন",
    see_reviews:"সব রিভিউ দেখুন →",
    share_experience:"আপনার অভিজ্ঞতা শেয়ার করুন",
    hero_wa:"WhatsApp করুন",
    lang_label:"EN",
  }
};

/* ---------- Testimonials ---------- */
/* The clinic's own Google reviews page — Maps -> their listing -> Reviews ->
   copy the URL. Left empty, the "See all reviews" link is hidden. */
const GMAPS_REVIEW_URL = "";
const TESTIMONIALS = [
  /* PLACEHOLDER COPY. Replace with the clinic's own reviews before launch.
     Use their real Google reviews, with the reviewer's display name as it
     already appears publicly on Google — do not invent testimonials, and do not
     carry another clinic's across: they are that clinic's patients, and a
     fabricated review is illegal advertising in most jurisdictions. */
  { en:"Replace this with a real review from the clinic's Google listing.", name:"Reviewer name", role:"Google Review" },
  { en:"Four to eight short reviews reads best. The slider loops whatever is here.", name:"Reviewer name", role:"Google Review" },
  { en:"Keep each one to roughly two sentences so the card does not scroll.", name:"Reviewer name", role:"Google Review" },
  { en:"A named review carries more weight than an anonymous one.", name:"Reviewer name", role:"Google Review" },
];

/* ---------- Process steps ---------- */
const STEPS = [
  { ic:"calendar", t:"step1_t", d:"step1_d" },
  { ic:"stethoscope", t:"step2_t", d:"step2_d" },
  { ic:"smile", t:"step3_t", d:"step3_d" },
  { ic:"heart", t:"step4_t", d:"step4_d" },
];

/* ---------- Technology & safety ---------- */
const TECH = [
  { ic:"shield", en:"4-Step Sterilization", bn:"৪ ধাপে জীবাণুমুক্ত করা", de:"Every instrument is cleaned and sterilized through a strict 4-step protocol.", db:"প্রতিটি যন্ত্র ৪টি ধাপে ভালোভাবে পরিষ্কার ও জীবাণুমুক্ত করা হয়।" },
  { ic:"scan", en:"Digital X-Ray", bn:"ডিজিটাল এক্স-রে", de:"Low-radiation digital imaging for fast, accurate diagnosis.", db:"কম রেডিয়েশনের ডিজিটাল এক্স-রে, যাতে দ্রুত ও সঠিকভাবে সমস্যা বোঝা যায়।" },
  { ic:"camera", en:"Intraoral Camera", bn:"ইন্ট্রাঅরাল ক্যামেরা", de:"See exactly what we see — clear images of your teeth on screen.", db:"আমরা যা দেখি তাই দেখুন — পর্দায় আপনার দাঁতের স্পষ্ট ছবি।" },
  { ic:"zap", en:"Painless Techniques", bn:"ব্যথাহীন পদ্ধতি", de:"Gentle anaesthesia and modern methods keep treatment comfortable.", db:"দাঁত অবশ করার ওষুধ ও আধুনিক পদ্ধতিতে চিকিৎসা আরামদায়ক থাকে।" },
  { ic:"package", en:"Sterile Disposables", bn:"জীবাণুমুক্ত ডিসপোজেবল", de:"Single-use, sealed disposables for every patient.", db:"প্রতি রোগীর জন্য নতুন, একবার ব্যবহারের যন্ত্রপাতি।" },
  { ic:"cpu", en:"Modern Equipment", bn:"আধুনিক যন্ত্রপাতি", de:"Up-to-date dental units and tools for better results.", db:"ভালো ফলের জন্য আধুনিক ডেন্টাল চেয়ার ও যন্ত্রপাতি।" },
];

/* ---------- FAQs ---------- */
const FAQS = [
  { qe:"Is the treatment really painless?", ae:"Yes. Our doctors are specially trained in painless dentistry. We use gentle anaesthesia and modern techniques so most patients feel little to no discomfort.",
    qb:"চিকিৎসা কি সত্যিই ব্যথাহীন?", ab:"হ্যাঁ। আমাদের ডাক্তাররা ব্যথা ছাড়া দাঁতের চিকিৎসায় বিশেষভাবে অভিজ্ঞ। আমরা দাঁত অবশ করার ওষুধ ও আধুনিক পদ্ধতি ব্যবহার করি, তাই বেশির ভাগ রোগী প্রায় কোনো কষ্টই পান না।" },
  { qe:"How much will my treatment cost?", ae:"Use our online cost estimator for an instant range, or see the full price list. The exact cost is confirmed after a quick check-up.",
    qb:"আমার চিকিৎসায় কত খরচ হবে?", ab:"সঙ্গে সঙ্গে ধারণা পেতে আমাদের অনলাইন খরচের হিসাব ব্যবহার করুন, অথবা পুরো মূল্য তালিকা দেখুন। আসল খরচ একটি দ্রুত চেকআপের পর জানা যায়।" },
  { qe:"Do you offer same-day or emergency appointments?", ae:"Yes, we keep slots for urgent pain and dental emergencies. Call or WhatsApp us and we'll see you as soon as possible.",
    qb:"আপনারা কি একই দিনে বা জরুরি অ্যাপয়েন্টমেন্ট দেন?", ab:"হ্যাঁ, হঠাৎ ব্যথা বা জরুরি সমস্যার জন্য আমরা সময় রাখি। কল বা হোয়াটসঅ্যাপ করুন, যত দ্রুত সম্ভব আপনাকে দেখব।" },
  { qe:"Can I consult from abroad?", ae:"Yes. We offer online video consultations for non-resident Bangladeshis and overseas patients who need advice before travelling or treatment.",
    qb:"আমি কি বিদেশ থেকে পরামর্শ নিতে পারি?", ab:"হ্যাঁ। দেশে আসা বা চিকিৎসার আগে পরামর্শ দরকার এমন প্রবাসী বাংলাদেশি ও বিদেশি রোগীদের জন্য আমরা অনলাইন ভিডিও পরামর্শ দিই।" },
  { qe:"Do you treat children?", ae:"Absolutely. We provide gentle paediatric care including check-ups, milk-tooth treatment and fillings for kids of all ages.",
    qb:"আপনারা কি শিশুদের চিকিৎসা করেন?", ab:"অবশ্যই। আমরা সব বয়সের শিশুদের জন্য চেকআপ, দুধ দাঁতের চিকিৎসা ও ফিলিংসহ কোমল সেবা দিই।" },
  { qe:"Where is Example Dental located?", ae:"We are at 1252/3, East Monipur, near Metro Pillar 267(W), West Kazipara, Begum Rokeya Sarani, Dhaka. Tap 'Get Directions' on the map for the route.",
    qb:"উদাহরণ ডেন্টাল কোথায়?", ab:"আমরা ১২৫২/৩, পূর্ব মনিপুর, মেট্রো পিলার ২৬৭(ওয়াই)-এর কাছে, পশ্চিম কাজীপাড়া, বেগম রোকেয়া সরণি, ঢাকায় আছি। রাস্তা দেখতে ম্যাপে 'দিকনির্দেশ নিন' চাপুন।" },
];

/* ---------- Dental tips / blog ---------- */
const POSTS = [
  { ic:"🪥", slug:"five-habits-healthier-teeth", te:"5 daily habits for healthier teeth", ee:"Simple brushing, flossing and diet habits that protect your smile for life.",
    tb:"সুস্থ দাঁতের জন্য ৫টি দৈনিক অভ্যাস", eb:"সহজ ব্রাশ, ফ্লস ও খাদ্যাভ্যাস যা সারাজীবন আপনার হাসি রক্ষা করে।" },
  { ic:"🌱", slug:"when-you-need-root-canal", te:"When do you really need a root canal?", ee:"The warning signs of an infected tooth and how a root canal saves it painlessly.",
    tb:"কখন সত্যিই রুট ক্যানেল দরকার?", eb:"পোকা ধরা দাঁতের সতর্ক সংকেত এবং কীভাবে রুট ক্যানেল ব্যথাহীনভাবে তা বাঁচায়।" },
  { ic:"✨", slug:"teeth-whitening-what-to-expect", te:"Teeth whitening: what to expect", ee:"How professional whitening works, how long it lasts and how to keep results bright.",
    tb:"দাঁত সাদা করা: কী আশা করবেন", eb:"পেশাদার হোয়াইটেনিং কীভাবে কাজ করে, কতদিন থাকে এবং ফল উজ্জ্বল রাখার উপায়।" },
];

/* ---------- Before/After cases ----------
   A case only belongs here once BOTH its photos exist in assets/ba/. Listing one
   without them cost six 404s on every page load and showed the visitor a flat
   colour block where a result photo should be — initBA()'s placeholder keeps the
   page from looking broken, but it is a fallback, not a feature.

   To add a case back: drop <type>-before.jpg and <type>-after.jpg into assets/ba/,
   uncomment its line, and the filter buttons below reappear on their own. */
const BA_CASES = [
  { type:"whitening", before:"#cdbfa3", after:"#f5f3ec", bImg:"assets/ba/whitening-before.svg?v=1", aImg:"assets/ba/whitening-after.svg?v=1" },
  { type:"braces",    before:"#d8c7ad", after:"#f4f2ec", bImg:"assets/ba/braces-before.svg?v=1",   aImg:"assets/ba/braces-after.svg?v=1" },
  { type:"implants",  before:"#c9b79b", after:"#f1efe8", bImg:"assets/ba/implants-before.svg?v=1", aImg:"assets/ba/implants-after.svg?v=1" },
  { type:"veneers",   before:"#cdb196", after:"#f3f1ea", bImg:"assets/ba/veneers-before.svg?v=1",  aImg:"assets/ba/veneers-after.svg?v=1" },
];

/* ---------- WhatsApp chat pre-filled messages ---------- */
const WA_MSGS = {
  book:"Hi, I'd like to book an appointment at Example Dental.",
  price:"Hi, I'd like to know the treatment prices at Example Dental.",
  question:"Hi, I have a question about dental treatment at Example Dental."
};
const WA_MSGS_BN = {
  book:"হ্যালো, আমি উদাহরণ ডেন্টালে অ্যাপয়েন্টমেন্ট নিতে চাই।",
  price:"হ্যালো, আমি উদাহরণ ডেন্টালের চিকিৎসার খরচ জানতে চাই।",
  question:"হ্যালো, উদাহরণ ডেন্টালে চিকিৎসা সম্পর্কে আমার একটি প্রশ্ন আছে।"
};

/* ============================================================
   Rendering + interactions
   ============================================================ */
let LANG = localStorage.getItem("clinic_lang") || "bn";  // Bangladeshi audience → Bangla first

function t(key){ return (I18N[LANG] && I18N[LANG][key]) ?? (I18N.en[key] ?? key); }
function fmt(n){ return n.toLocaleString("en-IN"); } // 1,20,000 style grouping

function applyI18n(){
  document.documentElement.lang = LANG;
  document.documentElement.setAttribute("data-lang", LANG);
  document.body.classList.toggle("bn", LANG === "bn");
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    const v = withCounts(t(k));
    if (el.hasAttribute("data-i18n-html")) el.innerHTML = v;
    else el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  // dynamic blocks
  renderServices(); renderPricing(); renderCalcOptions(); renderTestimonials(); renderBookOptions(); renderBookSlots();
  renderSteps(); renderTech(); renderFaqs(); renderCalcBA(); renderMarquee();
  const tgl = document.getElementById("langText");
  if (tgl) tgl.textContent = t("lang_label");
  applyGoogleReviews(); // re-overlay live Google data (if loaded) in the current language
  applyPatientCount();
}

/* The patient figure appears in THREE places on the homepage — the hero pill, the
   "Trusted by …" badge, and the Happy Patients counter. They must never disagree, so all
   three read the same number: whatever the clinic last saved, falling back to the
   data-target written into index.html. */
let STAT_PATIENTS = null;
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
function patientCount(){
  if (STAT_PATIENTS !== null) return STAT_PATIENTS;
  const el = document.querySelector('.stat-num[data-stat="patients"]');
  return el ? (+el.dataset.target || 0) : 0;
}
function patientCountText(){
  const s = fmt(patientCount());
  // the Bangla badge has always shown Bengali numerals; keep it that way
  return LANG === "bn" ? s.replace(/[0-9]/g, d => BN_DIGITS.charAt(+d)) : s;
}
function withCounts(str){
  return (typeof str === "string" && str.indexOf("{n}") > -1)
    ? str.split("{n}").join(patientCountText()) : str;
}
/* re-render only the bits that carry the number, so a new figure does not force a
   full applyI18n() (which re-renders every list on the page). */
function applyPatientCount(){
  const pill = document.querySelector(".hp-count");
  if (pill) pill.textContent = fmt(patientCount()) + "+";   // pill is Latin in both languages
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const raw = t(el.getAttribute("data-i18n"));
    if (typeof raw === "string" && raw.indexOf("{n}") > -1){
      const v = withCounts(raw);
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = v; else el.textContent = v;
    }
  });
}

function setLang(l){ LANG = l; localStorage.setItem("clinic_lang", l); applyI18n(); }

/* ----- Inline SVG icons (Lucide-style, currentColor) ----- */
const ICONS = {
  calendar:'<path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>',
  stethoscope:'<path d="M4 3v6a5 5 0 0 0 10 0V3"/><path d="M9 18a4 4 0 0 0 8 0v-3"/><circle cx="20" cy="12" r="2"/>',
  smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
  heart:'<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21l8.8-8.8a5 5 0 0 0 0-7.1z"/>',
  shield:'<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
  scan:'<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
  camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  zap:'<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>',
  package:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  pin:'<path d="M12 22s8-5.5 8-12a8 8 0 1 0-16 0c0 6.5 8 12 8 12z"/><circle cx="12" cy="10" r="3"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9z"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/>',
  chat:'<path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
};
function svgIcon(name){return `<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.check}</svg>`;}

/* ----- Service image paths -----
   One place decides the extension and the size-variant folder, because the four
   call sites below used to spell ".jpg?v=2" out by hand and a template that
   ships SVG placeholders had to be edited in all four.

   SIZE VARIANTS: cards/ is a 640px copy and thumbs/ a 132px copy of the same
   photo — worth a lot for real clinical JPEGs, worth nothing for an SVG, which
   is resolution-independent. So with SVG both resolve to the single base file
   and the clinic ships 84 files instead of 252. When real photos arrive, set
   media.ext to "jpg" and run tools/gen-image-sizes.py to build the two folders.

   The <img onerror> chains in the callers still fall back to the base image, so
   a missing size variant degrades instead of leaving a broken frame. */
const IMG_EXT = (window.CLINIC && window.CLINIC.media && window.CLINIC.media.ext) || "svg";
const IMG_V   = (window.CLINIC && window.CLINIC.site && window.CLINIC.site.assetVersion) || "1";
function svcImg(name, size) {
  const dir = (size && IMG_EXT !== "svg") ? size + "/" : "";
  return `assets/services/${dir}${name}.${IMG_EXT}?v=${IMG_V}`;
}

/* ----- Services grid ----- */
const SVC_SLUG = {
  "Scaling & Polishing":"scaling-polishing",
  "Tooth Fillings":"tooth-fillings",
  "Root Canal (RCT)":"root-canal",
  "Crowns & Bridges":"crowns-bridges",
  "Teeth Whitening":"teeth-whitening",
  "Dentures":"dentures",
  "Braces & Aligners":"braces-aligners",
  "Dental Implants":"dental-implants",
  "Veneers":"veneers",
  "Extractions & Surgery":"extractions",
  "Kids Dentistry":"kids-dentistry",
  "Cosmetic Dentistry":"cosmetic-dentistry",
};
const SVC_TONE = ["#dff3ee","#cfe0f7","#ffe7cf","#e3f7f1","#e7ecfb","#fde7d6"];
function renderServices(){
  const wrap = document.getElementById("servicesGrid");
  if(!wrap) return;
  wrap.innerHTML = SERVICES.map((s)=>{
    const href = s.slug ? `services/${s.slug}.html` : "book.html";
    const name = LANG==="bn"?s.bn:s.en;
    const common = LANG==="bn"?s.cn:s.cne;
    const sub = (s.sub||[]).map(o=>`<a class="svc-sub-chip" href="services/${o.slug}.html">${LANG==="bn"?o.bn:o.en}</a>`).join("");
    const dur = s.dur ? `<span class="svc-dur"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${LANG==="bn"?s.durbn:s.dur}</span>` : "";
    /* Cards show a 640px copy (art box is ~330px) and the thumb strip a 132px copy
       (it renders at 44x34) — a fraction of the full-size files, which are still
       used for the lightbox and when a thumb is clicked. Each falls back to the
       full-size image, then to the SVG, so nothing breaks if a copy is missing. */
    const card   = (n) => svcImg(n, "cards");
    const fbFull = (n) => `this.onerror=null;this.src='${svcImg(n)}'`;
    const media = s.vid
      ? `<img class="svc-static" src="${card(s.img)}" onerror="${fbFull(s.img)}" alt="${name}" loading="lazy" decoding="async"><video class="svc-anim" autoplay muted loop playsinline preload="none"><source src="assets/services/${s.vid}.mp4?v=${IMG_V}" type="video/mp4"></video>`
      : s.img2
        ? `<img class="svc-static" src="${card(s.img)}" onerror="${fbFull(s.img)}" alt="${name}" loading="lazy" decoding="async"><img class="svc-anim svc-anim-img" src="${card(s.img2)}" onerror="${fbFull(s.img2)}" alt="${name}" loading="lazy" decoding="async">`
        : `<img src="${card(s.img)}" onerror="${fbFull(s.img)}" alt="${name}" loading="lazy" decoding="async">`;
    /* the strip is absolutely positioned inside the 210px .svc-img, so it only has room
       for 5 thumbs (5*34 + 4*4 + 8 = 194px). Anything past that would be clipped by the
       card's overflow:hidden and become invisible — the full set lives on the service
       page and in the gallery. */
    const galSrcs=[s.img,...(s.img2?[s.img2]:[]),...(s.gal||[])].slice(0,5);
    const galHtml=galSrcs.length>1?`<div class="svc-gal">${galSrcs.map((t,i)=>`<button class="sgal-thumb${i===0?' active':''}" type="button" data-src="${svcImg(t)}"><img src="${svcImg(t, "thumbs")}" alt="" loading="lazy" decoding="async" onerror="if(this.dataset.fb){this.parentNode.style.display='none'}else{this.dataset.fb=1;this.src='${svcImg(t)}'}"></button>`).join('')}</div>`:'';
    return `
    <article class="svc-card${s.vid||s.img2?' svc-has-vid':''}">
      <a class="svc-img" href="${href}" aria-label="${name}">${media}</a>${galHtml}
      <div class="svc-body">
        <div class="svc-top"><span class="svc-price">${s.pr}${s.per?` <span class="svc-per">${t("per_tooth")}</span>`:""}</span>${dur}</div>
        <h3><a href="${href}">${name}</a></h3>
        ${common?`<span class="svc-common">${common}</span>`:""}
        <p>${LANG==="bn"?s.db:s.de}</p>
        ${sub?`<div class="svc-sub">${sub}</div>`:""}
        <a class="btn btn-primary svc-book" href="book.html?service=${encodeURIComponent(s.en)}">${t("book_now")}</a>
      </div>
    </article>`;}).join("");
  wrap.querySelectorAll(".svc-has-vid").forEach(function(card){
    var img=card.querySelector(".svc-static");
    var vid=card.querySelector(".svc-anim");
    if(!img||!vid) return;
    if(vid.tagName==="VIDEO"){
      // continuous animation — plays non-stop, never pauses
      var play=function(){var p=vid.play();if(p&&p.catch)p.catch(function(){});};
      vid.addEventListener("playing",function(){img.style.opacity="0";vid.style.opacity="1";});
      new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)play();});},{threshold:0.01}).observe(card);
      play();
      return;
    }
    // image-swap cards — continuously cross-fade between the two photos while
    // in view (hover/touch forces the second photo). Respects reduced-motion.
    var second=false, hovering=false, timer=null;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function paint(){ var s=hovering||second; img.style.opacity=s?"0":"1"; vid.style.opacity=s?"1":"0"; }
    function start(){ if(reduceMotion||timer) return; timer=setInterval(function(){ second=!second; paint(); }, 2800); }
    function stop(){ if(timer){ clearInterval(timer); timer=null; } second=false; paint(); }
    card.addEventListener("mouseenter",function(){hovering=true;paint();});
    card.addEventListener("mouseleave",function(){hovering=false;paint();});
    card.addEventListener("touchstart",function(){card.classList.add("touch-active");hovering=true;paint();},{passive:true});
    card.addEventListener("touchend",function(){card.classList.remove("touch-active");hovering=false;paint();},{passive:true});
    var svcIO=new IntersectionObserver(function(entries){entries.forEach(function(e){ e.isIntersecting?start():stop(); });},{threshold:0.3});
    svcIO.observe(card);
    paint();
  });
  wrap.querySelectorAll(".svc-gal").forEach(function(gal){
    var card=gal.closest(".svc-card");
    var staticImg=card.querySelector(".svc-static")||card.querySelector(".svc-img img");
    gal.querySelectorAll(".sgal-thumb").forEach(function(btn){
      btn.addEventListener("click",function(e){
        e.preventDefault();e.stopPropagation();
        gal.querySelectorAll(".sgal-thumb").forEach(function(b){b.classList.remove("active");});
        btn.classList.add("active");
        if(staticImg){
          var animEl=card.querySelector(".svc-anim");
          if(animEl){animEl.style.opacity="0";if(animEl.tagName==="VIDEO")animEl.pause();}
          staticImg.style.opacity="1";
          staticImg.src=btn.dataset.src;
        }
      });
    });
  });
}

/* ----- Pricing table (grouped by category) ----- */
function renderPricing(){
  const wrap = document.getElementById("pricingBody");
  if(!wrap) return;
  let html = "";
  Object.keys(CATS).forEach(cat=>{
    const items = PRICES.filter(p=>p.c===cat);
    if(!items.length) return;
    html += `<tr class="price-cat"><td colspan="2">${LANG==="bn"?CATS[cat].bn:CATS[cat].en}</td></tr>`;
    items.forEach(p=>{
      const price = p.min===p.max ? `৳ ${fmt(p.min)}` : `৳ ${fmt(p.min)} – ${fmt(p.max)}`;
      const pname = LANG==="bn" && p.nb ? p.nb : p.n;
      const noteTxt = LANG==="bn" && p.noteb ? p.noteb : p.note;
      const noteTag = noteTxt ? ` <span class="tag tag-soft">${noteTxt}</span>` : "";
      const perLabel = p.per ? `<span class="pprice-per">${t("per_tooth")}</span>` : "";
      const nameCell = p.slug
        ? `<a class="pname-link" href="services/${p.slug}.html"><span class="pname">${pname}</span>${noteTag}<span class="plink-arr">→</span></a>`
        : `<span class="pname">${pname}</span>${noteTag}`;
      html += `<tr${p.slug?' class="price-row-link"':''}>
        <td>${nameCell}</td>
        <td class="pprice">${price}${perLabel}</td></tr>`;
    });
  });
  wrap.innerHTML = html;
}

/* ----- Cost calculator ----- */
function renderCalcOptions(){            // categories + services + qty
  const cat = document.getElementById("calcCategory");
  const qty = document.getElementById("calcQty");
  if(cat){
    const cur = cat.value;
    cat.innerHTML = Object.keys(CATS).map(c=>`<option value="${c}">${LANG==="bn"?CATS[c].bn:CATS[c].en}</option>`).join("");
    if(cur) cat.value = cur;
  }
  if(qty && !qty.options.length){
    qty.innerHTML = Array.from({length:20},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join("");
  }
  renderCalcServices();
}
function renderCalcServices(){
  const catSel = document.getElementById("calcCategory");
  const sel = document.getElementById("calcService");
  if(!sel) return;
  const cat = catSel ? catSel.value : null;
  const cur = sel.value;
  const opts = PRICES.map((p,i)=>({p,i})).filter(o=>!cat || o.p.c===cat);
  sel.innerHTML = opts.map(o=>`<option value="${o.i}">${o.p.n}</option>`).join("");
  if(cur && opts.some(o=>String(o.i)===cur)) sel.value = cur;
  updateCalc();
}
let _calcAnim;
const USD_RATE = 123;                    // 1 USD ≈ 123 BDT (update here if it changes)
function fmtBdt(bdt){ return "৳ " + fmt(bdt); }
function fmtUsd(bdt){ return "$" + Math.round(bdt/USD_RATE).toLocaleString("en-US"); }
function fitCalcLine(el, avail){          // shrink font so the number fits one line without growing the box
  if(!el || !avail) return;
  el.style.fontSize = "";                 // reset to the CSS size, then measure
  const base = parseFloat(getComputedStyle(el).fontSize) || 16;
  const w = el.scrollWidth;
  if(w > avail) el.style.fontSize = (base * avail / w) + "px";
}
function updateCalc(){
  const sel = document.getElementById("calcService");
  const qtyWrap = document.getElementById("calcQtyWrap");
  const qtyEl = document.getElementById("calcQty");
  const out = document.getElementById("calcResult");
  if(!sel||!out) return;
  const p = PRICES[+sel.value] || PRICES[0];
  const per = !!p.per;
  if(qtyWrap) qtyWrap.style.visibility = per ? "visible" : "hidden";  // keep space so card height stays fixed
  const qty = per ? Math.max(1, parseInt((qtyEl&&qtyEl.value)||"1",10)) : 1;
  const min = p.min*qty, max = p.max*qty;
  // build the result structure once; update text in-place each frame so we can size the font to fit
  out.innerHTML = `<span class="calc-amt"></span><span class="calc-usd"></span>${p.note?`<span class="calc-sub">${p.note}</span>`:""}`;
  const amtEl = out.querySelector(".calc-amt");
  const usdEl = out.querySelector(".calc-usd");
  const bdtOf = (a,b)=> a===b ? fmtBdt(b) : `${fmtBdt(a)} – ${fmtBdt(b)}`;
  const usdOf = (a,b)=> "≈ " + (a===b ? fmtUsd(b) : `${fmtUsd(a)} – ${fmtUsd(b)}`);
  // size the font to the FINAL (widest) values so nothing wraps or expands during the count-up
  const avail = out.clientWidth;
  amtEl.textContent = bdtOf(min,max);
  usdEl.textContent = usdOf(min,max);
  fitCalcLine(amtEl, avail);
  fitCalcLine(usdEl, avail);
  cancelAnimationFrame(_calcAnim);
  const dur = 650, t0 = performance.now();
  const step = (now)=>{
    const k = Math.min(1,(now-t0)/dur), e = 1-Math.pow(1-k,3);
    const cMin = Math.round(min*e), cMax = Math.round(max*e);
    amtEl.textContent = bdtOf(cMin,cMax);
    usdEl.textContent = usdOf(cMin,cMax);
    if(k<1) _calcAnim = requestAnimationFrame(step);
  };
  out.classList.remove("pop"); void out.offsetWidth; out.classList.add("pop");
  _calcAnim = requestAnimationFrame(step);
  const btn = document.getElementById("calcBook");
  if(btn) btn.dataset.service = p.n;
}
function renderCalcBA(){
  const el = document.getElementById("calcBa");
  if(!el) return;
  const c = BA_CASES[0];
  el.innerHTML = `<div class="ba">
      <img class="ba-after" loading="lazy" decoding="async" src="${c.aImg}" data-fbcolor="${c.after}" data-fblabel="ba_after" alt="after">
      <img class="ba-before" loading="lazy" decoding="async" src="${c.bImg}" data-fbcolor="${c.before}" data-fblabel="ba_before" alt="before">
      <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="before after slider">
      <span class="ba-tag ba-tag-l">${t('ba_before')}</span>
      <span class="ba-tag ba-tag-r">${t('ba_after')}</span>
      <span class="ba-handle"></span>
    </div>`;
  el.querySelectorAll(".ba").forEach(initBA);
}

/* ----- Testimonials ----- */
function renderTestimonials(){
  const wrap = document.getElementById("testGrid");
  if(!wrap) return;
  wrap.innerHTML = TESTIMONIALS.map(x=>`
    <a class="test-card" href="${GMAPS_REVIEW_URL}" target="_blank" rel="noopener noreferrer" aria-label="Read review on Google Maps">
      <div class="stars">★★★★★</div>
      <p>"${LANG==="bn"&&x.bn?x.bn:x.en}"</p>
      <div class="test-meta"><span class="avatar">${x.name.charAt(0)}</span>
        <div><strong>${x.name}</strong><small>${x.role}</small></div></div>
    </a>`).join("");
}

/* ---------- Live Google reviews (Featurable free JSON API) ----------
   Paste your Featurable widget ID below to go live. Featurable reads the
   clinic's Google Business Profile and refreshes ~daily. While the ID is
   empty (or if the fetch fails) the static reviews above stay as a fallback,
   so the section never looks broken. */
const FEATURABLE_WIDGET_ID = "";
let GOOGLE_REVIEWS = null; // { rating, count, reviews:[{name,text,rating,url}] }

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

async function loadGoogleReviews(){
  if(!FEATURABLE_WIDGET_ID) return; // no ID yet → keep static fallback
  try{
    const ctrl = new AbortController();
    const timer = setTimeout(()=>ctrl.abort(), 8000);
    const res = await fetch("https://featurable.com/api/v1/widgets/"+FEATURABLE_WIDGET_ID, {signal:ctrl.signal});
    clearTimeout(timer);
    if(!res.ok) return;
    const data = await res.json();
    // Featurable's JSON shape can vary; accept the common field names defensively.
    const arr = data.reviews || data.data || [];
    const WORD2NUM = {ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5};
    const toStars = v => {
      if(typeof v==="string" && WORD2NUM[v.toUpperCase()]) return WORD2NUM[v.toUpperCase()];
      const n = Number(v); return (n>=1 && n<=5) ? n : 5;
    };
    const reviews = arr.map(r=>({
      name:   r.reviewerName || r.author || r.name || (r.reviewer && (r.reviewer.displayName || r.reviewer.name)) || "Google user",
      text:   r.reviewText || r.text || r.comment || r.content || "",
      rating: toStars(r.starRating || r.rating || r.stars || 5),
      url:    r.reviewUrl || r.url || (r.reviewer && r.reviewer.profileUrl) || GMAPS_REVIEW_URL
    })).filter(r => r.text.trim());
    let rating = Number(data.averageRating || data.rating || (data.summary && data.summary.averageRating));
    let count  = Number(data.totalReviewCount || data.totalReviews || data.reviewCount || (data.summary && data.summary.totalReviewCount));
    if(!(rating>0) && reviews.length) rating = reviews.reduce((s,r)=>s+r.rating,0) / reviews.length;
    if(!(count>0)  && reviews.length) count = reviews.length;
    if(!reviews.length && !(rating>0)) return;
    GOOGLE_REVIEWS = {
      rating: rating>0 ? rating : null,
      count:  count>0  ? count  : null,
      reviews: reviews
    };
    applyGoogleReviews();
  }catch(e){ /* offline / blocked / bad JSON → silent, static fallback stays */ }
}

/* Overlay live data onto the existing badges + testimonial grid. Called at the
   end of applyI18n() too, so a language toggle re-applies it in the right language. */
function applyGoogleReviews(){
  if(!GOOGLE_REVIEWS) return;
  const g = GOOGLE_REVIEWS;

  if(g.rating != null){
    const rt = g.rating.toFixed(1);
    document.querySelectorAll(".g-score").forEach(el => el.textContent = rt);
    document.querySelectorAll(".rs-score").forEach(el => {
      const stars = el.querySelector(".rs-stars");
      el.textContent = rt + " ";
      if(stars) el.appendChild(stars);
    });
  }

  if(g.count != null){
    document.querySelectorAll(".rs-label").forEach(el =>
      el.textContent = LANG==="bn"
        ? (g.count + "+ গুগল রিভিউয়ের ভিত্তিতে")
        : ("Based on " + g.count + "+ Google reviews"));
    document.querySelectorAll(".g-label").forEach(el =>
      el.textContent = LANG==="bn"
        ? (g.count + "+ গুগল রিভিউ")
        : (g.count + "+ Google Reviews"));
  }

  const wrap = document.getElementById("testGrid");
  if(wrap && g.reviews.length){
    const roleTxt = LANG==="bn" ? "গুগল রিভিউ" : "Google Review";
    const list = g.reviews.slice()
      .sort((a,b)=> (b.rating - a.rating) || (b.text.length - a.text.length))
      .slice(0, 9);
    wrap.innerHTML = list.map(x=>{
      const stars = "★".repeat(Math.max(1, Math.min(5, Math.round(x.rating))));
      return `
    <a class="test-card" href="${escapeHtml(x.url)}" target="_blank" rel="noopener noreferrer" aria-label="Read review on Google Maps">
      <div class="stars">${stars}</div>
      <p>"${escapeHtml(x.text)}"</p>
      <div class="test-meta"><span class="avatar">${escapeHtml(x.name.charAt(0))}</span>
        <div><strong>${escapeHtml(x.name)}</strong><small>${roleTxt}</small></div></div>
    </a>`;
    }).join("");
  }
}

/* ----- Process steps ----- */
function renderSteps(){
  const wrap = document.getElementById("stepsGrid");
  if(!wrap) return;
  wrap.innerHTML = STEPS.map((s,i)=>`
    <article class="step-card">
      <span class="step-num">${i+1}</span>
      <div class="step-ic">${svgIcon(s.ic)}</div>
      <h3>${t(s.t)}</h3>
      <p>${t(s.d)}</p>
    </article>`).join("");
}

/* ----- Technology & safety ----- */
function renderTech(){
  const wrap = document.getElementById("techGrid");
  if(!wrap) return;
  wrap.innerHTML = TECH.map(x=>`
    <article class="tech-card">
      <div class="tech-ic">${svgIcon(x.ic)}</div>
      <div><h3>${LANG==="bn"?x.bn:x.en}</h3><p>${LANG==="bn"?x.db:x.de}</p></div>
    </article>`).join("");
}

/* ----- FAQ accordion ----- */
function renderFaqs(){
  const wrap = document.getElementById("faqList");
  if(!wrap) return;
  wrap.innerHTML = FAQS.map((f,i)=>`
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false"><span class="faq-qt">${LANG==="bn"?f.qb:f.qe}</span><span class="faq-ic">+</span></button>
      <div class="faq-a"><p>${LANG==="bn"?f.ab:f.ae}</p></div>
    </div>`).join("");
  wrap.querySelectorAll(".faq-q").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const open = btn.getAttribute("aria-expanded")==="true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.parentElement.classList.toggle("open", !open);
    });
  });
}

/* ----- Dental tips ----- */
function renderTips(){
  const wrap = document.getElementById("tipsGrid");
  if(!wrap) return;
  wrap.innerHTML = POSTS.map(p=>`
    <article class="tip-card">
      <a class="tip-img" href="blog/${p.slug}.html">${p.ic}</a>
      <div class="tip-body">
        <h3>${LANG==="bn"?p.tb:p.te}</h3>
        <p>${LANG==="bn"?p.eb:p.ee}</p>
        <a class="svc-link" href="blog/${p.slug}.html">${t("tips_read")} →</a>
      </div>
    </article>`).join("");
}

/* ----- Before/After ----- */
function baSvg(color, label){
  return `data:image/svg+xml;utf8,`+encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='420'>
      <rect width='600' height='420' fill='${color}'/>
      <rect x='150' y='120' width='300' height='150' rx='20' fill='#fff' opacity='0.85'/>
      <g fill='${color}'>
        ${[0,1,2,3,4,5].map(i=>`<rect x='${175+i*42}' y='150' width='34' height='90' rx='10'/>`).join("")}
      </g>
      <text x='300' y='370' font-family='sans-serif' font-size='26' fill='#fff' text-anchor='middle' opacity='0.9'>${label}</text>
    </svg>`);
}
/* A filter button with no case behind it renders an empty grid, which reads as a
   broken page. Drive the buttons off BA_CASES instead of the markup, so they follow
   whatever is actually listed above — and drop the whole row when there is only one
   case, since filtering one item is not a choice. */
function syncBAFilters(){
  const row = document.querySelector(".ba-filters");
  if(!row) return;
  const types = new Set(BA_CASES.map(c=>c.type));
  row.querySelectorAll(".ba-filter").forEach(b=>{
    const f = b.dataset.filter;
    b.hidden = !(f === "all" || types.has(f));
  });
  row.hidden = types.size < 2;
}

function renderBA(filter="all"){
  const wrap = document.getElementById("baGrid");
  if(!wrap) return;
  syncBAFilters();
  const list = BA_CASES.filter(c=>filter==="all"||c.type===filter);
  wrap.innerHTML = list.map((c,i)=>`
    <div class="ba" data-i="${i}">
      <img class="ba-after" loading="lazy" decoding="async" src="${c.aImg}" data-fbcolor="${c.after}" data-fblabel="ba_after" alt="after">
      <img class="ba-before" loading="lazy" decoding="async" src="${c.bImg}" data-fbcolor="${c.before}" data-fblabel="ba_before" alt="before">
      <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="before after slider">
      <span class="ba-tag ba-tag-l">${t('ba_before')}</span>
      <span class="ba-tag ba-tag-r">${t('ba_after')}</span>
      <span class="ba-handle"></span>
    </div>`).join("");
  wrap.querySelectorAll(".ba").forEach(initBA);
}
function initBA(el){
  // fall back to colour placeholder if a before/after photo is missing
  el.querySelectorAll("img[data-fbcolor]").forEach(img=>{
    img.onerror = function(){ this.onerror=null; this.src = baSvg(this.dataset.fbcolor, t(this.dataset.fblabel)); };
  });
  const range = el.querySelector(".ba-range");
  const before = el.querySelector(".ba-before");
  const handle = el.querySelector(".ba-handle");
  const set = v=>{ before.style.clipPath="inset(0 "+(100-v)+"% 0 0)"; handle.style.left=v+"%"; };
  range.addEventListener("input", e=>set(e.target.value));
  set(50);
  // one-time auto-sweep when first scrolled into view (signals it's draggable)
  if(!window.matchMedia || !matchMedia("(prefers-reduced-motion: reduce)").matches){
    const demo = ()=>{
      el.classList.add("ba-anim");
      const steps = [82,22,50]; let i=0;
      const next = ()=>{ if(i>=steps.length){ el.classList.remove("ba-anim"); return; }
        const v=steps[i++]; range.value=v; set(v); setTimeout(next, 760); };
      setTimeout(next, 400);
    };
    if("IntersectionObserver" in window){
      const io = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ io.disconnect(); demo(); } }); }, {threshold:.4});
      io.observe(el);
    } else demo();
  }
}

/* ----- Booking ----- */
function renderBookOptions(){
  const sel = document.getElementById("f_service");
  if(!sel) return;
  const cur = sel.value;
  sel.innerHTML = `<option value="">${t("f_select")}</option>` +
    PRICES.map(p=>`<option value="${p.n}">${p.n}</option>`).join("");
  if(cur) sel.value = cur;
}
function renderBookSlots(){
  // upcoming dates — "type or select" datalist
  const dl = document.getElementById("dateList");
  if(dl){
    const loc = LANG==="bn" ? "bn-BD" : "en-GB";
    let opts = "";
    for(let i=0;i<14;i++){
      const d = new Date(); d.setDate(d.getDate()+i);
      const label = `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;
      const prefix = i===0 ? t("f_today")+" — " : i===1 ? t("f_tomorrow")+" — " : "";
      opts += `<option value="${prefix}${label}"></option>`;
    }
    dl.innerHTML = opts;
  }
  // clinic time slots (10:00 AM – 9:30 PM, 30-min)
  const tl = document.getElementById("timeList");
  if(tl){
    let opts = "";
    for(let m=600;m<=1290;m+=30){              // minutes from midnight
      let h=Math.floor(m/60), mi=m%60, ap=h<12?"AM":"PM", h12=h%12||12;
      opts += `<option value="${h12}:${String(mi).padStart(2,"0")} ${ap}"></option>`;
    }
    tl.innerHTML = opts;
  }
}
function submitBooking(e){
  e.preventDefault();
  const f = e.target;
  if (f.f_consent && !f.f_consent.checked){ alert(t("consent_alert")); return; }
  const data = {
    name: f.f_name.value.trim(),
    phone: f.f_phone.value.trim(),
    service: f.f_service.value,
    date: f.f_date.value ? fmtPickedDate(f.f_date.value) : "",
    /* the raw YYYY-MM-DD as well: the dashboard needs a sortable date to file the
       booking as an upcoming appointment, and cannot parse the display form. */
    dateISO: f.f_date.value || "",
    time: f.f_time.value ? fmtPickedTime(f.f_time.value) : "",
    /* The old field asked "where are you coming from?" and its answer was parked in a
       note. It is the address now, and it travels as one all the way to the clinic's
       bookings sheet and the Address column of their records. */
    address: f.f_address ? f.f_address.value.trim() : "",
    emerg: f.f_emerg.checked,
  };
  let lines = [
    "🦷 *Example Dental — Appointment Request*",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.service ? `Treatment: ${data.service}` : "",
    data.date ? `Preferred date: ${data.date}` : "",
    data.time ? `Preferred time: ${data.time}` : "",
    data.emerg ? "⚠️ EMERGENCY / same-day requested" : "",
    data.address ? `Address: ${data.address}` : "",
  ].filter(Boolean);
  const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  const note = document.getElementById("bookSuccess");
  if(note){
    /* Always offer a tappable WhatsApp link as well as opening it automatically:
       phone browsers frequently block the popup, and until now that left the
       patient with nothing to press and the clinic with no message. */
    note.innerHTML = `<div>${escapeHtml(t("f_success"))}</div>`
      + `<a class="btn btn-wa" href="${url}" target="_blank" rel="noopener"`
      + ` style="display:inline-flex;align-items:center;gap:8px;margin-top:10px;width:auto;text-decoration:none">`
      + `${escapeHtml(t("f_send_wa"))}</a>`;
    note.style.display="block";
  }
  try{ if(window.clinicSaveBooking) window.clinicSaveBooking(data); }catch(e){}
  sendBookingAlert(data);
  window.open(url, "_blank");
}

/* Email the clinic about a new booking, via the owner's own Google Apps Script
   (see tools/booking-alert.gs). Off entirely when CLINIC_ALERT_URL is empty.

   Uses sendBeacon rather than fetch: window.open() runs immediately after this,
   so the page may go to the background or navigate, which cancels a normal
   request. A beacon is queued by the browser and delivered regardless. Apps
   Script sends no CORS headers, so this is a fire-and-forget text/plain post -
   there is no reply to read, and a failure must never disturb the booking. */
function sendBookingAlert(data){
  try{
    const url = (window.CLINIC_ALERT_URL || "").trim();
    if(!url) return;
    const payload = JSON.stringify({
      token: window.CLINIC_ALERT_TOKEN || "",
      name: data.name, phone: data.phone, service: data.service,
      date: data.date, time: data.time, address: data.address, emerg: !!data.emerg
    });
    if(navigator.sendBeacon){
      navigator.sendBeacon(url, new Blob([payload], {type:"text/plain;charset=UTF-8"}));
    }else{
      fetch(url, {method:"POST", mode:"no-cors", keepalive:true,
                  headers:{"Content-Type":"text/plain;charset=UTF-8"}, body:payload});
    }
  }catch(e){ /* an alert failing must not break the booking */ }
}

/* ----- Marquee ----- */
function renderMarquee(){
  const el = document.getElementById("marqueeTrack");
  if(!el) return;
  const items = SERVICES.map(s=>`<span>${LANG==="bn"?s.bn:s.en}</span>`).join("");
  el.innerHTML = items + items; // duplicate for seamless loop
}

/* ----- Counters ----- */
function animateCounters(){
  document.querySelectorAll(".stat-num").forEach(el=>{
    el.dataset.done = "1"; el.dataset.running = "1";
    const suffix = el.dataset.suffix||"";
    let n = 0;
    /* target is re-read every frame rather than captured once. The clinic's figures
       arrive from Firestore a second or so after load — usually while this count-up is
       still running — and a captured target would keep counting to the old number,
       overwriting them and settling on the stale value. */
    const tick = ()=>{
      const target = +el.dataset.target || 0;
      const step = Math.max(1, Math.ceil(target/60));
      n = Math.min(target, n+step);
      el.textContent = fmt(n)+suffix;
      if(n<target) requestAnimationFrame(tick);
      else delete el.dataset.running;
    };
    tick();
  });
}

/* The clinic edits these four figures in the dashboard; assets/booking-cloud.js calls
   this whenever the stored values change. The count-up is fired once by an
   IntersectionObserver, so values can arrive either side of it:
     - not animated yet -> move the target, and the count-up lands on the new number;
     - already animated -> set the text, since nothing will run again.
   Anything missing or not a number is ignored, so one bad field cannot blank a box. */
function clinicSetStats(vals){
  if(!vals) return;
  document.querySelectorAll(".stat-num[data-stat]").forEach(el=>{
    const v = vals[el.dataset.stat];
    if(v === undefined || v === null || v === "") return;
    const n = Number(v);
    if(!isFinite(n) || n < 0) return;
    el.dataset.target = String(n);
    if(el.dataset.stat === "patients") STAT_PATIENTS = n;
    /* mid-animation the tick above will pick the new target up on its next frame;
       touching the text here would just fight with it. */
    if(el.dataset.done && !el.dataset.running) el.textContent = fmt(n) + (el.dataset.suffix||"");
  });
  applyPatientCount();
}
window.clinicSetStats = clinicSetStats;

/* ----- Calendar + clock pickers on the booking date/time fields ----- */
function fmtPickedDate(v){            // v = "2026-06-28" -> "28-06-2026"
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v||"").trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : v;
}
function fmtPickedTime(v){            // v = "14:30" → "2:30 PM"
  const p=v.split(":"); let h=+p[0]; const m=p[1]||"00";
  const ap=h<12?"AM":"PM"; h=h%12; if(h===0)h=12;
  return `${h}:${m} ${ap}`;
}
function initBookPickers(){
  // native date/time inputs — block past dates on the calendar
  const d=document.getElementById("f_date");
  if(d && d.type==="date"){
    try{ const t=new Date();
      d.min = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;
    }catch(e){}
    dressDateField(d);
  }
}

/* The browser draws <input type="date"> itself and takes the order from ITS OWN
   locale — a phone set to US English shows mm/dd/yyyy, and no CSS or lang attribute
   can reorder it. A patient reading mm/dd/yyyy and entering 05/09/2026 for 5
   September books 9 May, and nobody finds out until they fail to arrive.

   So: show our own DD-MM-YYYY text and lay the real input over it at zero opacity.
   Taps land on the native field, so the OS calendar still opens with no showPicker()
   to depend on, and f_date.value stays ISO for submitBooking(), dateISO and min.

   Built here rather than in book.html's markup on purpose. This is a patient-facing
   form: if this script never runs, the visitor is left with the plain native input
   that works today, instead of an empty span where the date field should be. */
function dressDateField(input){
  try{
    if(!input || input.parentElement?.classList.contains("datebox")) return;
    const box = document.createElement("span");
    box.className = "datebox";
    const txt = document.createElement("span");
    txt.className = "datebox-txt dt-ph";
    txt.textContent = "DD-MM-YYYY";
    input.parentNode.insertBefore(box, input);
    box.appendChild(txt);
    box.appendChild(input);

    const paint = ()=>{
      const v = input.value || "";
      txt.textContent = v ? fmtPickedDate(v) : "DD-MM-YYYY";
      txt.className = v ? "datebox-txt" : "datebox-txt dt-ph";
    };
    input.addEventListener("change", paint);
    input.addEventListener("input", paint);
    paint();                       // setting .value in code fires no event
  }catch(e){ /* leave the native field alone rather than break the form */ }
}

/* ----- Wire up ----- */
document.addEventListener("DOMContentLoaded", ()=>{
  applyI18n();
  loadGoogleReviews(); // fetch real Google reviews (Featurable) → overlays when it resolves
  initBookPickers();
  // prefill booking-page treatment from ?service=
  try{ const q=new URLSearchParams(location.search).get("service"); const sel=document.getElementById("f_service");
    if(q&&sel&&[...sel.options].some(o=>o.value===q)) sel.value=q; }catch(e){}
  renderBA("all");

  document.getElementById("langToggle")?.addEventListener("click", ()=> setLang(LANG==="en"?"bn":"en"));
  // service catalog "Book Now" → prefill booking
  document.getElementById("servicesGrid")?.addEventListener("click", (e)=>{
    const a = e.target.closest(".svc-book");
    if(!a) return;
    const sel = document.getElementById("f_service");
    if(sel && a.dataset.service) sel.value = a.dataset.service;
  });

  document.getElementById("calcCategory")?.addEventListener("change", renderCalcServices);
  document.getElementById("calcService")?.addEventListener("change", updateCalc);
  document.getElementById("calcQty")?.addEventListener("change", updateCalc);
  document.getElementById("calcBook")?.addEventListener("click", function(){
    const svc = this.dataset.service ? "?service="+encodeURIComponent(this.dataset.service) : "";
    window.location.href = "book.html"+svc;
  });
  document.getElementById("bookForm")?.addEventListener("submit", submitBooking);
  document.getElementById("callbackForm")?.addEventListener("submit", (e)=>{
    e.preventDefault();
    const num  = document.getElementById("cbNumber").value.trim();
    const name = (document.getElementById("cbName")||{}).value?.trim() || "";
    /* Same shape as a booking so it lands in the dashboard's Website Bookings
       panel with no dashboard changes. `service` is what that panel shows as the
       second line, so it doubles as the label that marks this as a callback. */
    const data = {
      name, phone: num, service: "📞 Call back request",
      date: "", dateISO: "", time: "", msg: "", emerg: false, kind: "callback"
    };
    const msg = [
      "📞 *Example Dental — Callback request*",
      name ? `Name: ${name}` : "",
      `Please call me back at: ${num}`
    ].filter(Boolean).join("\n");
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

    const note = document.getElementById("cbSuccess");
    if(note){
      // the popup below is blocked often enough on phones that a tappable link matters
      note.innerHTML = `<div>${escapeHtml(t("cb_success"))}</div>`
        + `<a class="btn btn-wa" href="${url}" target="_blank" rel="noopener"`
        + ` style="display:inline-flex;align-items:center;gap:8px;margin-top:10px;width:auto;text-decoration:none">`
        + `${escapeHtml(t("f_send_wa"))}</a>`;
      note.style.display = "block";
    }
    try{ if(window.clinicSaveBooking) window.clinicSaveBooking(data); }catch(err){}
    sendBookingAlert(data);
    window.open(url, "_blank");
  });

  document.querySelectorAll(".ba-filter").forEach(b=>{
    b.addEventListener("click", ()=>{
      document.querySelectorAll(".ba-filter").forEach(x=>x.classList.remove("active"));
      b.classList.add("active"); renderBA(b.dataset.filter);
    });
  });

  // mobile nav
  const burger = document.getElementById("burger");
  const navlist = document.getElementById("navlist");
  burger?.addEventListener("click", ()=> navlist.classList.toggle("open"));
  navlist?.querySelectorAll("a:not(.dd-toggle)").forEach(a=>a.addEventListener("click", ()=>navlist.classList.remove("open")));
  navlist?.querySelectorAll(".dd-menu a").forEach(a=>a.addEventListener("click", ()=>navlist.classList.remove("open")));
  // services dropdown toggle (click on mobile, hover on desktop)
  const hasDD = document.querySelector(".has-dd");
  const ddToggle = document.querySelector(".dd-toggle");
  ddToggle?.addEventListener("click", e => {
    if(window.innerWidth <= 760){ e.preventDefault(); hasDD.classList.toggle("open"); }
  });
  document.addEventListener("click", e => { if(hasDD && !hasDD.contains(e.target)) hasDD.classList.remove("open"); });

  // counters when visible
  const stats = document.getElementById("stats");
  if(stats){
    const ob = new IntersectionObserver((ent)=>{ if(ent[0].isIntersecting){ animateCounters(); ob.disconnect(); }},{threshold:.4});
    ob.observe(stats);
  }

  // scroll progress bar + back-to-top
  const bar = document.getElementById("scrollbar");
  const toTop = document.getElementById("toTop");
  const onScroll = ()=>{
    const h = document.documentElement;
    const sc = h.scrollTop || document.body.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    if(bar) bar.style.width = (max>0 ? (sc/max*100) : 0) + "%";
    if(toTop) toTop.classList.toggle("show", sc > 600);
  };
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
  toTop?.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));

  // scroll reveal — above-fold elements animate immediately; below-fold on scroll
  const revealEls = document.querySelectorAll(".sec-head, .svc-card, .step-card, .tech-card, .test-card, .tip-card, .ci-row, .why-art, .doc-photo, .hero-photo, .calc-card, .calc-ba");
  revealEls.forEach(el=>el.classList.add("reveal"));
  const rob = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); rob.unobserve(e.target); }});
  },{threshold:.12});
  let stagger = 0;
  revealEls.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight){
      setTimeout(()=>el.classList.add("in"), stagger);
      stagger += 80;
    } else {
      rob.observe(el);
    }
  });

  // WhatsApp Live Chat Widget
  (function initWaChat(){
    const bubble = document.getElementById("waBubble");
    const popup  = document.getElementById("waPopup");
    const closeBtn = document.getElementById("waClose");
    const start  = document.getElementById("waStart");
    if(!bubble||!popup) return;
    function openPopup(){ popup.classList.add("open"); popup.setAttribute("aria-hidden","false"); bubble.classList.add("active"); }
    function closePopup(){ popup.classList.remove("open"); popup.setAttribute("aria-hidden","true"); bubble.classList.remove("active"); }
    bubble.addEventListener("click", ()=> popup.classList.contains("open") ? closePopup() : openPopup());
    closeBtn?.addEventListener("click", closePopup);
    popup.querySelectorAll(".wcp-chip").forEach(chip=>{
      chip.addEventListener("click", ()=>{
        const key = chip.dataset.msg;
        const msgs = LANG==="bn" ? WA_MSGS_BN : WA_MSGS;
        if(start) start.href = "https://wa.me/880XXXXXXXXXX?text=" + encodeURIComponent(msgs[key]||"");
        start?.click();
      });
    });
  })();

  // ── Site-wide search ─────────────────────────────────────────────────────
  (function initSearch(){
    var srchOverlay = document.getElementById("srch-overlay");
    var srchInput   = document.getElementById("srch-input");
    var srchResults = document.getElementById("srch-results");
    var srchBtn     = document.getElementById("srch-btn");
    var srchClose   = document.getElementById("srch-close");
    if(!srchOverlay) return;

    var ROOT = (document.querySelector('meta[name="page-root"]')||{}).content || "";
    var searchIdx = null;
    var debTimer  = null;
    var activeIdx = -1;

    function buildIndex(){
      var idx = [];
      SERVICES.forEach(function(s){
        idx.push({type:"service",icon:s.icon,label:LANG==="bn"?s.bn:s.en,sub:LANG==="bn"?(s.cn||s.cne||""):(s.cne||s.cn||""),price:s.pr,url:ROOT+"services/"+s.slug+".html",kw:[s.en,s.bn,s.cne||"",s.cn||"",s.de,s.db].join(" ")});
      });
      PRICES.forEach(function(p){
        var pr = "৳"+p.min+(p.max&&p.max!==p.min?"–"+p.max:"");
        idx.push({type:"price",label:LANG==="bn"?p.nb:p.n,price:pr,url:ROOT+"index.html#pricing",kw:[p.n,p.nb,p.note||"",p.noteb||""].join(" ")});
      });
      FAQS.forEach(function(f){
        idx.push({type:"faq",label:LANG==="bn"?f.qb:f.qe,sub:(LANG==="bn"?f.ab:f.ae).substring(0,90)+"…",url:ROOT+"index.html#faq",kw:[f.qe,f.ae,f.qb,f.ab].join(" ")});
      });
      POSTS.forEach(function(p){
        idx.push({type:"blog",label:LANG==="bn"?p.tb:p.te,sub:LANG==="bn"?p.eb:p.ee,url:ROOT+"blog/"+p.slug+".html",kw:[p.te,p.ee,p.tb,p.eb].join(" ")});
      });
      TECH.forEach(function(tc){
        idx.push({type:"tech",label:LANG==="bn"?tc.bn:tc.en,sub:LANG==="bn"?tc.db:tc.de,url:ROOT+"index.html#tech",kw:[tc.en,tc.bn,tc.de,tc.db].join(" ")});
      });
      return idx;
    }

    function runSearch(q){
      if(!q.trim()) return [];
      var ql = q.toLowerCase();
      return searchIdx.filter(function(r){
        return r.label.toLowerCase().includes(ql) || r.kw.toLowerCase().includes(ql);
      }).sort(function(a,b){
        return (a.label.toLowerCase().includes(ql)?0:1)-(b.label.toLowerCase().includes(ql)?0:1);
      }).slice(0,18);
    }

    var TYPE_ICONS = {service:"🦷",price:"💰",faq:"❓",blog:"📄",tech:"⚙️"};
    var TYPE_KEY   = {service:"srch_services",price:"srch_pricing",faq:"srch_faq",blog:"srch_blog",tech:"srch_tech"};

    function renderResults(results){
      activeIdx = -1;
      if(!results.length){
        srchResults.innerHTML = '<div class="srch-empty">'+t("srch_empty")+'</div>';
        return;
      }
      var grouped = {};
      results.forEach(function(r){ (grouped[r.type]=grouped[r.type]||[]).push(r); });
      var html = "";
      Object.keys(grouped).forEach(function(type){
        html += '<div class="srch-group-label">'+t(TYPE_KEY[type]||type)+'</div>';
        grouped[type].forEach(function(r,i){
          var dataIdx = results.indexOf(r);
          html += '<a class="srch-item" href="'+r.url+'" data-idx="'+dataIdx+'">'
               +'<span class="srch-item-icon">'+(r.icon||TYPE_ICONS[r.type]||"•")+'</span>'
               +'<span class="srch-item-body">'
               +'<span class="srch-item-label">'+r.label+'</span>'
               +(r.sub?'<span class="srch-item-sub">'+r.sub+'</span>':'')
               +'</span>'
               +(r.price?'<span class="srch-item-price">'+r.price+'</span>':'')
               +'</a>';
        });
      });
      srchResults.innerHTML = html;
    }

    function openSearch(){
      if(!searchIdx) searchIdx = buildIndex();
      srchOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
      srchInput.value = "";
      srchResults.innerHTML = "";
      srchInput.focus();
      srchInput.placeholder = t("srch_ph");
      document.getElementById("srch-hint-txt") && (document.getElementById("srch-hint-txt").textContent = t("srch_hint"));
    }
    function closeSearch(){
      srchOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    srchBtn && srchBtn.addEventListener("click", openSearch);
    srchClose && srchClose.addEventListener("click", closeSearch);
    srchOverlay.addEventListener("click", function(e){ if(e.target===srchOverlay) closeSearch(); });

    srchInput && srchInput.addEventListener("input", function(){
      clearTimeout(debTimer);
      debTimer = setTimeout(function(){
        if(!searchIdx) searchIdx = buildIndex();
        renderResults(runSearch(srchInput.value));
      }, 180);
    });

    // keyboard navigation
    document.addEventListener("keydown", function(e){
      if((e.ctrlKey||e.metaKey) && e.key==="k"){ e.preventDefault(); openSearch(); return; }
      if(!srchOverlay.classList.contains("open")) return;
      var items = srchResults.querySelectorAll(".srch-item");
      if(e.key==="Escape"){ closeSearch(); return; }
      if(e.key==="ArrowDown"){ e.preventDefault(); activeIdx=Math.min(activeIdx+1,items.length-1); }
      else if(e.key==="ArrowUp"){ e.preventDefault(); activeIdx=Math.max(activeIdx-1,-1); }
      else if(e.key==="Enter" && activeIdx>=0){ e.preventDefault(); items[activeIdx]?.click(); return; }
      else return;
      items.forEach(function(it,i){ it.classList.toggle("srch-active",i===activeIdx); });
      items[activeIdx]?.scrollIntoView({block:"nearest"});
    });
  })();

  // Google Review QR Code
  setTimeout(()=>{
    const qrEl = document.getElementById("reviewQRCode");
    if(qrEl && window.QRCode){
      new QRCode(qrEl, {
        text:"https://search.google.com/local/writereview?placeid=ChIJkU6fOETBVTcRtwuNI9vunfY",
        width:128, height:128,
        colorDark:"#13294e", colorLight:"#ffffff"
      });
    }
  }, 600);
});

/* Private admin gateway moved to assets/admin-gate.js so it works on every
   page (26 of 28 public pages do not load this file). */
