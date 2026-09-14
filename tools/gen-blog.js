/* Generates the blog: /blog/index.html + /blog/<slug>.html, and rebuilds
   sitemap.xml (home + service pages + blog). Run: node tools/gen-blog.js */
const fs = require("fs");
const path = require("path");

const SITE = "https://example.github.io/clinic-site-template";
const VER = "20260627i";
const esc = s => String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const bl = (en,bn) => `data-en="${esc(en)}" data-bn="${esc(bn)}"`;

const ARTICLES = [
  { slug:"five-habits-healthier-teeth", icon:"🪥", date:"2026-06-10",
    en:{ title:"5 Daily Habits for Healthier Teeth", read:"4 min read",
      meta:"Five simple daily habits — brushing, flossing, diet and check-ups — that keep your teeth and gums healthy for life, from Example Dental, Dhaka.",
      intro:"Healthy teeth aren't about expensive treatments — they're built on small daily habits. Here are five simple things you can start today to protect your smile for life.",
      sections:[
        {h:"1. Brush properly, twice a day",p:"Brush for two full minutes, morning and night, with a soft brush and fluoride toothpaste. Angle the brush gently at the gum line and don't scrub hard — gentle, thorough brushing protects both teeth and gums."},
        {h:"2. Floss once a day",p:"A toothbrush can't reach between teeth, where decay and gum disease often start. Flossing once daily removes the plaque your brush misses and keeps your gums firm and healthy."},
        {h:"3. Cut down on sugary drinks & snacks",p:"Sugar feeds the bacteria that cause cavities. Limit sweets, soft drinks and frequent snacking, and rinse with water after sugary food to reduce acid attacks on your teeth."},
        {h:"4. Drink water and don't smoke",p:"Water washes away food and keeps your mouth hydrated, while tobacco stains teeth and is a leading cause of gum disease and oral cancer. Quitting is one of the best things you can do for your mouth."},
        {h:"5. Visit your dentist every 6 months",p:"Regular check-ups and scaling catch small problems before they become painful and expensive. A professional cleaning twice a year keeps your smile bright and your gums healthy."}],
      outro:"Build these habits in and most dental problems can be prevented. Due for a check-up? Book a visit with Dr. Ayesha Rahman at Example Dental." },
    bn:{ title:"সুস্থ দাঁতের জন্য ৫টি দৈনিক অভ্যাস", read:"৪ মিনিট পড়া",
      meta:"ব্রাশ, ফ্লস, খাদ্যাভ্যাস ও চেকআপ — পাঁচটি সহজ দৈনিক অভ্যাস যা সারাজীবন আপনার দাঁত ও মাড়ি সুস্থ রাখে। উদাহরণ ডেন্টাল, ঢাকা।",
      intro:"সুস্থ দাঁত দামি চিকিৎসার ব্যাপার নয় — এটি গড়ে ওঠে ছোট ছোট দৈনিক অভ্যাসে। সারাজীবন আপনার হাসি রক্ষা করতে আজই শুরু করার মতো পাঁচটি সহজ বিষয়।",
      sections:[
        {h:"১. দিনে দুবার সঠিকভাবে ব্রাশ করুন",p:"সকাল ও রাতে নরম ব্রাশ ও ফ্লোরাইড টুথপেস্ট দিয়ে পুরো দুই মিনিট ব্রাশ করুন। মাড়ির কাছে ব্রাশ হালকা কোণে ধরুন এবং জোরে ঘষবেন না — কোমল, পূর্ণ ব্রাশিং দাঁত ও মাড়ি দুটোই রক্ষা করে।"},
        {h:"২. দিনে একবার ফ্লস করুন",p:"টুথব্রাশ দাঁতের ফাঁকে পৌঁছায় না, যেখানে প্রায়ই ক্ষয় ও মাড়ির রোগ শুরু হয়। দিনে একবার ফ্লস ব্রাশে না-যাওয়া প্লাক দূর করে মাড়ি শক্ত ও সুস্থ রাখে।"},
        {h:"৩. চিনিযুক্ত পানীয় ও স্ন্যাকস কমান",p:"চিনি সেই ব্যাকটেরিয়াকে খাওয়ায় যা ক্যাভিটি তৈরি করে। মিষ্টি, সফট ড্রিংক ও ঘন ঘন স্ন্যাকিং কমান, এবং মিষ্টি খাবারের পর পানি দিয়ে কুলকুচি করুন।"},
        {h:"৪. পানি পান করুন, ধূমপান নয়",p:"পানি খাবার ধুয়ে দেয় ও মুখ আর্দ্র রাখে, আর তামাক দাঁতে দাগ ফেলে এবং মাড়ির রোগ ও ওরাল ক্যান্সারের প্রধান কারণ। ধূমপান ছাড়া আপনার মুখের জন্য সেরা সিদ্ধান্তগুলোর একটি।"},
        {h:"৫. প্রতি ৬ মাসে ডেন্টিস্টের কাছে যান",p:"নিয়মিত চেকআপ ও স্কেলিং ছোট সমস্যা ব্যথাদায়ক ও ব্যয়বহুল হওয়ার আগেই ধরে ফেলে। বছরে দুবার পেশাদার পরিষ্কার আপনার হাসি উজ্জ্বল ও মাড়ি সুস্থ রাখে।"}],
      outro:"এই অভ্যাসগুলো গড়ে তুললে বেশিরভাগ দাঁতের সমস্যা প্রতিরোধ করা যায়। চেকআপের সময় হয়েছে? উদাহরণ ডেন্টালে ডা. আয়েশা রহমানের কাছে অ্যাপয়েন্টমেন্ট নিন।" } },

  { slug:"when-you-need-root-canal", icon:"🌱", date:"2026-06-08",
    en:{ title:"When Do You Really Need a Root Canal?", read:"4 min read",
      meta:"Learn the warning signs that you may need a root canal and how modern, painless RCT at Example Dental saves your natural tooth.",
      intro:"\"Root canal\" sounds scary, but it's a routine treatment that relieves pain and saves a tooth that would otherwise be lost. Here's how to know when you might need one.",
      sections:[
        {h:"What a root canal actually does",p:"When decay or injury reaches the soft pulp inside a tooth, it becomes infected and painful. A root canal removes that infected pulp, disinfects the inside of the tooth and seals it — letting you keep your natural tooth instead of extracting it."},
        {h:"Warning signs to watch for",p:"See a dentist soon if you have: persistent or throbbing toothache, lingering sensitivity to hot or cold, pain when biting, a swollen or tender gum, or a darkening tooth. These can mean the pulp is infected."},
        {h:"Is it painful?",p:"With modern anaesthesia and techniques, a root canal feels much like a normal filling. At Example Dental we focus on painless treatment — many cases are completed comfortably, sometimes in a single visit."},
        {h:"What happens if you wait",p:"An untreated infection can spread, cause an abscess, and may lead to losing the tooth entirely. Treating it early is simpler, cheaper and saves your natural tooth."}],
      outro:"Have tooth pain or sensitivity? Don't wait — book a check-up with Dr. Ayesha Rahman and find out if a quick, painless root canal can save your tooth." },
    bn:{ title:"কখন সত্যিই রুট ক্যানেল দরকার?", read:"৪ মিনিট পড়া",
      meta:"রুট ক্যানেল দরকার হতে পারে এমন সতর্ক সংকেত এবং কীভাবে উদাহরণ ডেন্টালের আধুনিক, ব্যথাহীন RCT আপনার আসল দাঁত বাঁচায় তা জানুন।",
      intro:"\"রুট ক্যানেল\" শুনতে ভীতিকর, কিন্তু এটি একটি সাধারণ চিকিৎসা যা ব্যথা কমায় এবং যে দাঁত হারিয়ে যেত তা বাঁচায়। কখন এটি দরকার হতে পারে তা জেনে নিন।",
      sections:[
        {h:"রুট ক্যানেল আসলে কী করে",p:"ক্ষয় বা আঘাত দাঁতের ভেতরের নরম পাল্পে পৌঁছালে তা সংক্রমিত ও ব্যথাদায়ক হয়। রুট ক্যানেল সেই সংক্রমিত পাল্প সরিয়ে, দাঁতের ভেতর জীবাণুমুক্ত করে সিল করে — দাঁত তুলে ফেলার বদলে আসল দাঁত রক্ষা করে।"},
        {h:"যেসব সতর্ক সংকেত খেয়াল করবেন",p:"দ্রুত ডেন্টিস্ট দেখান যদি থাকে: একটানা বা দপদপ করা দাঁতব্যথা, গরম-ঠান্ডায় দীর্ঘ সংবেদনশীলতা, কামড়ে ব্যথা, ফোলা বা নরম মাড়ি, অথবা দাঁত কালচে হয়ে যাওয়া। এগুলো পাল্প সংক্রমণের লক্ষণ হতে পারে।"},
        {h:"এটি কি ব্যথাদায়ক?",p:"আধুনিক অ্যানেস্থেসিয়া ও কৌশলে রুট ক্যানেল অনেকটা সাধারণ ফিলিংয়ের মতো অনুভব হয়। উদাহরণ ডেন্টালে আমরা ব্যথাহীন চিকিৎসায় গুরুত্ব দিই — অনেক ক্ষেত্রে এক ভিজিটেই আরামে সম্পন্ন হয়।"},
        {h:"দেরি করলে কী হয়",p:"চিকিৎসা না করালে সংক্রমণ ছড়িয়ে অ্যাবসেস তৈরি করতে পারে এবং দাঁত পুরোপুরি হারিয়ে যেতে পারে। আগেভাগে চিকিৎসা সহজ, সাশ্রয়ী ও আসল দাঁত বাঁচায়।"}],
      outro:"দাঁতে ব্যথা বা সংবেদনশীলতা? দেরি করবেন না — ডা. আয়েশা রহমানের কাছে চেকআপ বুক করুন এবং জানুন দ্রুত, ব্যথাহীন রুট ক্যানেল আপনার দাঁত বাঁচাতে পারে কিনা।" } },

  { slug:"teeth-whitening-what-to-expect", icon:"✨", date:"2026-06-05",
    en:{ title:"Teeth Whitening: What to Expect", read:"3 min read",
      meta:"How professional teeth whitening works, how long results last, and how to keep your smile bright — from Example Dental, Dhaka.",
      intro:"Professional whitening is one of the quickest ways to refresh your smile. Here's what actually happens and how to make the results last.",
      sections:[
        {h:"How it works",p:"A safe whitening gel is applied to your teeth, often activated with a special light, to break down years of stains from tea, coffee, smoking and age. In about an hour your teeth can lighten by several shades."},
        {h:"Is it safe?",p:"Yes — done by a dentist, whitening is safe for your enamel. We protect your gums first and control the strength of the gel, which is far safer and more effective than over-the-counter kits."},
        {h:"How long do results last?",p:"Results typically last from several months up to a couple of years, depending on your habits. Avoiding staining foods, not smoking and good brushing all help your bright smile last longer."},
        {h:"Keeping your smile bright",p:"Cut back on coffee, tea and red wine, rinse with water after staining drinks, brush twice a day, and get regular cleanings. A touch-up every so often keeps things looking fresh."}],
      outro:"Want a brighter smile for an event or just for yourself? Book a whitening session with Dr. Ayesha Rahman at Example Dental." },
    bn:{ title:"দাঁত সাদা করা: কী আশা করবেন", read:"৩ মিনিট পড়া",
      meta:"পেশাদার দাঁত সাদা করা কীভাবে কাজ করে, ফল কতদিন থাকে এবং হাসি উজ্জ্বল রাখার উপায় — উদাহরণ ডেন্টাল, ঢাকা।",
      intro:"পেশাদার হোয়াইটেনিং হাসি ঝলমলে করার দ্রুততম উপায়গুলোর একটি। আসলে কী ঘটে এবং ফল কীভাবে দীর্ঘস্থায়ী করবেন জেনে নিন।",
      sections:[
        {h:"কীভাবে কাজ করে",p:"দাঁতে একটি নিরাপদ হোয়াইটেনিং জেল লাগানো হয়, প্রায়ই বিশেষ লাইট দিয়ে সক্রিয় করা হয়, যা চা, কফি, ধূমপান ও বয়সের বছরের দাগ ভেঙে দেয়। প্রায় এক ঘণ্টায় দাঁত কয়েক শেড উজ্জ্বল হতে পারে।"},
        {h:"এটি কি নিরাপদ?",p:"হ্যাঁ — ডেন্টিস্টের মাধ্যমে করা হলে এটি এনামেলের জন্য নিরাপদ। আমরা আগে মাড়ি সুরক্ষা করি ও জেলের মাত্রা নিয়ন্ত্রণ করি, যা দোকানের কিটের চেয়ে অনেক নিরাপদ ও কার্যকর।"},
        {h:"ফল কতদিন থাকে?",p:"অভ্যাসভেদে ফল সাধারণত কয়েক মাস থেকে কয়েক বছর পর্যন্ত থাকে। দাগ-সৃষ্টিকারী খাবার এড়ানো, ধূমপান না করা ও ভালো ব্রাশিং উজ্জ্বল হাসি দীর্ঘস্থায়ী করে।"},
        {h:"হাসি উজ্জ্বল রাখা",p:"কফি, চা ও রেড ওয়াইন কমান, দাগযুক্ত পানীয়ের পর পানি দিয়ে কুলকুচি করুন, দিনে দুবার ব্রাশ করুন ও নিয়মিত পরিষ্কার করান। মাঝে মাঝে টাচ-আপ সব তাজা রাখে।"}],
      outro:"কোনো অনুষ্ঠানের জন্য বা নিজের জন্য উজ্জ্বল হাসি চান? উদাহরণ ডেন্টালে ডা. আয়েশা রহমানের কাছে হোয়াইটেনিং সেশন বুক করুন।" } },

  { slug:"caring-for-braces", icon:"📏", date:"2026-06-02",
    en:{ title:"How to Care for Your Braces & Aligners", read:"3 min read",
      meta:"Practical tips to keep your braces or clear aligners clean, comfortable and on track for a perfect smile — from Example Dental, Dhaka.",
      intro:"Braces and aligners work best when you look after them. A little daily care keeps treatment on schedule and your teeth healthy along the way.",
      sections:[
        {h:"Keep them clean",p:"Food traps easily around braces, so brush after every meal and floss carefully with a floss threader. For clear aligners, rinse and gently brush them daily, and always brush before putting them back in."},
        {h:"Watch what you eat",p:"Avoid hard, sticky and very sugary foods that can damage brackets or wires — like hard nuts, sticky candy and ice. Cut crunchy foods into small pieces to protect your braces."},
        {h:"Wear aligners as instructed",p:"Clear aligners only work if worn 20–22 hours a day. Keep to your schedule and store them in their case when eating, so they don't get lost or damaged."},
        {h:"Don't skip your appointments",p:"Regular adjustments keep your treatment moving. If a wire or bracket comes loose, call us — small issues are quick to fix and prevent delays."}],
      outro:"Thinking about braces or aligners, or already in treatment? Dr. Ayesha Rahman can help — book a visit at Example Dental." },
    bn:{ title:"ব্রেসেস ও অ্যালাইনারের যত্ন কীভাবে নেবেন", read:"৩ মিনিট পড়া",
      meta:"নিখুঁত হাসির জন্য আপনার ব্রেসেস বা ক্লিয়ার অ্যালাইনার পরিষ্কার, আরামদায়ক ও সঠিক পথে রাখার ব্যবহারিক টিপস — উদাহরণ ডেন্টাল, ঢাকা।",
      intro:"যত্ন নিলে ব্রেসেস ও অ্যালাইনার সবচেয়ে ভালো কাজ করে। সামান্য দৈনিক যত্ন চিকিৎসাকে সময়মতো রাখে ও দাঁত সুস্থ রাখে।",
      sections:[
        {h:"পরিষ্কার রাখুন",p:"ব্রেসেসের চারপাশে সহজেই খাবার আটকে যায়, তাই প্রতিবার খাওয়ার পর ব্রাশ করুন এবং ফ্লস থ্রেডার দিয়ে সাবধানে ফ্লস করুন। ক্লিয়ার অ্যালাইনার প্রতিদিন ধুয়ে আলতো ব্রাশ করুন, এবং ফিরিয়ে দেওয়ার আগে সবসময় ব্রাশ করুন।"},
        {h:"কী খাচ্ছেন খেয়াল রাখুন",p:"শক্ত, আঠালো ও খুব মিষ্টি খাবার এড়িয়ে চলুন যা ব্র্যাকেট বা তার নষ্ট করতে পারে — যেমন শক্ত বাদাম, আঠালো ক্যান্ডি ও বরফ। মুচমুচে খাবার ছোট টুকরো করে খান।"},
        {h:"নির্দেশমতো অ্যালাইনার পরুন",p:"ক্লিয়ার অ্যালাইনার দিনে ২০–২২ ঘণ্টা পরলে তবেই কাজ করে। সময়সূচি মেনে চলুন এবং খাওয়ার সময় কেসে রাখুন যাতে হারিয়ে বা নষ্ট না হয়।"},
        {h:"অ্যাপয়েন্টমেন্ট বাদ দেবেন না",p:"নিয়মিত সমন্বয় চিকিৎসাকে এগিয়ে রাখে। তার বা ব্র্যাকেট ঢিলা হলে আমাদের কল করুন — ছোট সমস্যা দ্রুত ঠিক হয় ও দেরি রোধ করে।"}],
      outro:"ব্রেসেস বা অ্যালাইনার নিয়ে ভাবছেন, নাকি ইতিমধ্যে চিকিৎসায় আছেন? ডা. আয়েশা রহমান সাহায্য করতে পারেন — উদাহরণ ডেন্টালে ভিজিট বুক করুন।" } },

  { slug:"childrens-dental-care", icon:"🧒", date:"2026-05-28",
    en:{ title:"A Parent's Guide to Children's Dental Care", read:"4 min read",
      meta:"When to start dental visits, how to prevent cavities and make the dentist fun for kids — a parent's guide from Example Dental, Dhaka.",
      intro:"Good dental habits start early. Helping your child care for their teeth now sets them up for a healthy, confident smile for life.",
      sections:[
        {h:"Start early",p:"Begin cleaning your baby's gums even before teeth appear, and start brushing with a tiny smear of toothpaste once the first tooth comes in. A child's first dental visit is recommended around their first birthday."},
        {h:"Prevent cavities",p:"Limit sugary snacks and drinks, avoid letting your child sleep with a bottle of milk or juice, and supervise brushing twice a day until they can do it well themselves (usually around age 7)."},
        {h:"Make it positive",p:"Talk about the dentist in a friendly, calm way and avoid words like \"pain\" or \"needle.\" Gentle, child-friendly visits help your child feel safe and build a lifelong comfort with dental care."},
        {h:"Don't ignore milk teeth",p:"Baby teeth matter — they hold space for adult teeth and help with eating and speech. Treat decay early, even in milk teeth, to avoid pain and problems later."}],
      outro:"Looking for gentle, child-friendly dental care in Dhaka? Book your little one's check-up with Dr. Ayesha Rahman at Example Dental." },
    bn:{ title:"শিশুর দন্তযত্ন: অভিভাবকদের গাইড", read:"৪ মিনিট পড়া",
      meta:"কখন ডেন্টাল ভিজিট শুরু করবেন, ক্যাভিটি প্রতিরোধ ও শিশুর জন্য ডেন্টিস্টকে আনন্দময় করার উপায় — উদাহরণ ডেন্টাল, ঢাকা।",
      intro:"ভালো দন্ত-অভ্যাস শুরু হয় ছোটবেলায়। এখন আপনার শিশুকে দাঁতের যত্নে সাহায্য করলে সারাজীবনের সুস্থ, আত্মবিশ্বাসী হাসি নিশ্চিত হয়।",
      sections:[
        {h:"আগেভাগে শুরু করুন",p:"দাঁত ওঠার আগেই শিশুর মাড়ি পরিষ্কার করা শুরু করুন, এবং প্রথম দাঁত উঠলে সামান্য টুথপেস্ট দিয়ে ব্রাশ শুরু করুন। শিশুর প্রথম ডেন্টাল ভিজিট প্রথম জন্মদিনের কাছাকাছি করার পরামর্শ দেওয়া হয়।"},
        {h:"ক্যাভিটি প্রতিরোধ করুন",p:"মিষ্টি স্ন্যাকস ও পানীয় সীমিত করুন, দুধ বা জুসের বোতল মুখে নিয়ে শিশুকে ঘুমাতে দেবেন না, এবং নিজে ভালোভাবে ব্রাশ করতে শেখার আগ পর্যন্ত (সাধারণত ৭ বছর) দিনে দুবার ব্রাশিং তত্ত্বাবধান করুন।"},
        {h:"ইতিবাচক করে তুলুন",p:"ডেন্টিস্ট নিয়ে বন্ধুত্বপূর্ণ, শান্তভাবে কথা বলুন এবং \"ব্যথা\" বা \"সুঁই\"-এর মতো শব্দ এড়িয়ে চলুন। কোমল, শিশুবান্ধব ভিজিট শিশুকে নিরাপদ বোধ করায়।"},
        {h:"দুধ দাঁত উপেক্ষা করবেন না",p:"দুধ দাঁত গুরুত্বপূর্ণ — এগুলো স্থায়ী দাঁতের জন্য জায়গা রাখে এবং খাওয়া ও কথায় সাহায্য করে। পরে ব্যথা ও সমস্যা এড়াতে দুধ দাঁতেও ক্ষয় আগেভাগে চিকিৎসা করান।"}],
      outro:"ঢাকায় কোমল, শিশুবান্ধব দন্তসেবা খুঁজছেন? উদাহরণ ডেন্টালে ডা. আয়েশা রহমানের কাছে আপনার সোনামণির চেকআপ বুক করুন।" } },
];

function head(title, meta, canonical, jsonld){
  return `<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(meta)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(meta)}">
<meta property="og:image" content="${SITE}/assets/logo.svg">
<meta name="theme-color" content="#57C3AD">
<link rel="icon" type="image/png" href="../assets/mark.svg?v=2">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<link rel="stylesheet" href="../assets/styles.css?v=${VER}">
${jsonld?`<script type="application/ld+json">${jsonld}</script>`:""}
</head>
<body>`;
}

const header = `
<header class="header"><nav class="nav container">
  <a class="brand" href="../index.html"><span class="logo-anim"><img src="../assets/mark.svg?v=2" alt="Example Dental"></span><span>CONTACT<small>DENTAL</small></span></a>
  <div class="navlist" id="navlist">
    <a href="../index.html#why" ${bl("About Us","আমাদের সম্পর্কে")}></a>
    <a href="../treatments.html" ${bl("Our Services","আমাদের সেবা")}></a>
    <a href="../index.html#contact" ${bl("Contact","যোগাযোগ")}></a>
    <a href="../index.html#pricing" ${bl("Price List","মূল্য তালিকা")}></a>
    <a href="index.html" ${bl("Blog","ব্লগ")}></a>
    <a href="../careers.html" ${bl("Careers","ক্যারিয়ার")}></a>
    <div class="nav-actions">
      <a class="btn btn-primary" href="../book.html" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
    </div>
  </div>
  <button class="lang-toggle nav-lang" id="langToggle"><span id="langText">বাংলা</span></button>
  <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>`;

const footer = `
<footer class="footer"><div class="container" style="text-align:center">
  <div class="foot-logo" style="justify-content:center"><span class="logo-anim"><img src="../assets/mark.svg?v=2" alt="Example Dental" style="height:50px"></span><span style="font-family:var(--f-head);font-weight:800;color:#fff;font-size:1.25rem">CONTACT<small style="display:block;font-size:.62rem;letter-spacing:.34em;color:var(--orange)">DENTAL</small></span></div>
  <p style="color:#a9c2cd;margin:14px 0">1252/3, East Monipur, West Kazipara, Begum Rokeya Soroni, Dhaka · 01XXXXXXXXX</p>
  <a class="btn btn-primary" href="../index.html" ${bl("← Back to home","← হোমে ফিরুন")}></a>
  <div class="foot-bottom">© <span id="yr"></span> CONTACT DENTAL</div>
</div></footer>
<a class="fab" href="https://wa.me/880XXXXXXXXXX" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
<script>
document.getElementById('yr').textContent='2025';
function setLang(l){document.documentElement.setAttribute('data-lang',l);document.body.classList.toggle('bn',l==='bn');try{localStorage.setItem('clinic_lang',l)}catch(e){}
document.querySelectorAll('[data-en]').forEach(function(el){el.textContent=(l==='bn'?el.getAttribute('data-bn'):el.getAttribute('data-en'));});
var t=document.getElementById('langText');if(t)t.textContent=(l==='bn'?'EN':'বাংলা');}
var L='bn';try{L=localStorage.getItem('clinic_lang')||'bn'}catch(e){}
setLang(L);
document.getElementById('langToggle').onclick=function(){setLang(document.documentElement.getAttribute('data-lang')==='en'?'bn':'en');};
var b=document.getElementById('burger'),n=document.getElementById('navlist');if(b)b.onclick=function(){n.classList.toggle('open');};
</script>
</body></html>`;

function articlePage(a){
  const url=`${SITE}/blog/${a.slug}.html`;
  const jsonld=`{"@context":"https://schema.org","@type":"Article","headline":"${esc(a.en.title)}","datePublished":"${a.date}","image":"${SITE}/assets/logo.svg","author":{"@type":"Person","name":"Dr. Ayesha Rahman"},"publisher":{"@type":"Organization","name":"Example Dental"},"mainEntityOfPage":"${url}","description":"${esc(a.en.meta)}"}`;
  const body=a.en.sections.map((s,i)=>`<h2 ${bl(s.h,a.bn.sections[i].h)} style="margin:28px 0 10px;font-size:1.4rem"></h2><p ${bl(s.p,a.bn.sections[i].p)} style="color:var(--muted)"></p>`).join("");
  return head(`${a.en.title} | Example Dental Blog`, a.en.meta, url, jsonld)+header+`
<section class="hero"><span class="blob b1"></span><span class="blob b2"></span>
  <div class="container" style="position:relative;z-index:1;padding:60px 0 44px;max-width:780px;text-align:center">
    <span class="eyebrow">${a.icon} <span ${bl("Dental Tips","ডেন্টাল টিপস")}></span></span>
    <h1 ${bl(a.en.title,a.bn.title)}></h1>
    <p ${bl(a.en.read+" · Example Dental",a.bn.read+" · উদাহরণ ডেন্টাল")} style="color:var(--muted);margin-top:10px"></p>
  </div>
</section>
<article class="section" style="padding-top:40px"><div class="container" style="max-width:780px">
  <p ${bl(a.en.intro,a.bn.intro)} style="font-size:1.15rem;color:var(--ink);font-weight:500"></p>
  ${body}
  <div class="calc-out" style="margin-top:36px">
    <span ${bl(a.en.outro,a.bn.outro)} style="display:block;margin-bottom:16px"></span>
    <a class="btn" href="../book.html" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
  </div>
  <p style="margin-top:26px"><a class="svc-link" href="index.html" ${bl("← All articles","← সব আর্টিকেল")}></a></p>
</div></article>`+footer;
}

function indexPage(){
  const url=`${SITE}/blog/index.html`;
  const cards=ARTICLES.map(a=>`
    <article class="tip-card">
      <a class="tip-img" href="${a.slug}.html">${a.icon}</a>
      <div class="tip-body">
        <h3 ${bl(a.en.title,a.bn.title)}></h3>
        <p ${bl(a.en.intro,a.bn.intro)}></p>
        <a class="svc-link" href="${a.slug}.html" ${bl("Read more →","আরও পড়ুন →")}></a>
      </div>
    </article>`).join("");
  return head("Dental Tips & Guides | Example Dental Blog","Dental health tips, treatment guides and advice from Dr. Ayesha Rahman at Example Dental, Dhaka.",url,"")+header+`
<section class="hero"><span class="blob b1"></span><span class="blob b2"></span>
  <div class="container" style="position:relative;z-index:1;padding:60px 0 40px;text-align:center;max-width:760px">
    <span class="eyebrow" ${bl("Dental Tips","ডেন্টাল টিপস")}></span>
    <h1 ${bl("Healthy-smile tips & guides","সুস্থ হাসির টিপস ও গাইড")}></h1>
    <p ${bl("Practical dental advice and treatment guides from our team.","আমাদের টিমের ব্যবহারিক দন্ত-পরামর্শ ও চিকিৎসা গাইড।")} style="color:var(--muted);margin-top:12px"></p>
  </div>
</section>
<section class="section" style="padding-top:30px"><div class="container">
  <div class="tips-grid">${cards}</div>
</div></section>`+footer;
}

const blogDir=path.join(__dirname,"..","blog");
fs.mkdirSync(blogDir,{recursive:true});
ARTICLES.forEach(a=>fs.writeFileSync(path.join(blogDir,`${a.slug}.html`),articlePage(a)));
fs.writeFileSync(path.join(blogDir,"index.html"),indexPage());

// rebuild sitemap: home + service pages + blog
const svcDir=path.join(__dirname,"..","services");
const svc=fs.existsSync(svcDir)?fs.readdirSync(svcDir).filter(f=>f.endsWith(".html")):[];
const urls=[`${SITE}/`, `${SITE}/treatments.html`, `${SITE}/careers.html`, `${SITE}/book.html`, `${SITE}/blog/index.html`,
  ...svc.map(f=>`${SITE}/services/${f}`),
  ...ARTICLES.map(a=>`${SITE}/blog/${a.slug}.html`)];
fs.writeFileSync(path.join(__dirname,"..","sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`  <url><loc>${u}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>
`);
console.log("Generated",ARTICLES.length,"articles + blog index + sitemap (",urls.length,"urls )");
