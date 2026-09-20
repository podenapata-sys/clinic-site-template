/* Generates static per-service SEO pages into /services and a sitemap.xml.
   Product-detail layout: image gallery + price + feature boxes + CTAs.
   Run: node tools/gen-services.js   */

/* ⚠ DO NOT RUN THIS WITHOUT --force.
   Twelve of the fourteen pages in /services have been edited by hand since this
   generator last produced them — corrected copy, a removed price row, embedded
   videos. Regenerating overwrites every one of those edits, and it also rewrites
   sitemap.xml from its own list, which drops careers, privacy-policy, terms,
   medical-disclaimer, book.html, aligners.html and all five blog posts.
   Check `git diff` before you commit anything this produces. */
if (!process.argv.includes("--force")) {
  console.error([
    "",
    "  Refusing to run: this would overwrite hand-edited pages.",
    "",
    "  12 of 14 files in /services/ no longer match what this generator makes,",
    "  and sitemap.xml would lose 11 URLs.",
    "",
    "  If you really mean it:  node tools/gen-services.js --force",
    "  Then check:             git diff --stat",
    ""
  ].join("\n"));
  process.exit(1);
}

const fs = require("fs");
const path = require("path");

const SITE = "https://example.github.io/clinic-site-template";
const VER = "20260627i";
const esc = s => String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const bl = (en,bn) => `data-en="${esc(en)}" data-bn="${esc(bn)}"`;
const IC = {
  checkc:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  award:'<circle cx="12" cy="9" r="6"/><path d="M9 14l-1.5 7L12 18l4.5 3L15 14"/>',
  shield:'<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
  pin:'<path d="M12 22s8-5.5 8-12a8 8 0 1 0-16 0c0 6.5 8 12 8 12z"/><circle cx="12" cy="10" r="3"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9z"/>',
  chat:'<path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z"/>',
  clockw:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
function ico(n,sz){return `<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${sz?` style="width:${sz}px;height:${sz}px"`:""}>${IC[n]||IC.checkc}</svg>`;}
// Familiar everyday name people actually say [common_en, common_bn], keyed by slug
const CN = {
  "root-canal":["Tooth-root treatment","দাঁতের শিকড়ের চিকিৎসা"],
  "dental-implants":["Permanent new tooth","নতুন দাঁত বসানো"],
  "braces-aligners":["Teeth straightening","দাঁত সোজা করা (তার/ব্রেস)"],
  "teeth-whitening":["Teeth whitening","দাঁত সাদা করা"],
  "crowns-bridges":["Tooth cap & bridge","দাঁতের ক্যাপ ও নকল দাঁত"],
  "dentures":["Removable teeth set","বাঁধানো দাঁত"],
  "scaling-polishing":["Teeth cleaning","দাঁত পরিষ্কার"],
  "tooth-fillings":["Cavity filling","দাঁত বাঁধাই"],
  "veneers":["Front-tooth cover","দাঁতের আবরণ"],
  "extractions":["Tooth removal","দাঁত ফেলা"],
  "kids-dentistry":["Children's dental care","শিশুদের দাঁতের যত্ন"],
  "cosmetic-dentistry":["Smile makeover","দাঁতের সৌন্দর্য চিকিৎসা"],
};
const FACT_KEYS = ["checkc","clock","award","shield"]; // procedure, visits, success/material, hygiene
const THUMB_POOL = ["teeth-whitening","scaling-polishing","tooth-fillings","crowns-bridges","dental-implants","braces-aligners","dentures","root-canal-rct"];

const SERVICES = [
  { slug:"root-canal", icon:"🌱", img:"root-canal-rct", gallery:["root-canal-rct","root-canal-steps","root-canal-grid","root-canal-xray","root-canal-case-1"],
    en:{ name:"Root Canal Treatment (RCT)", tag:"Save your natural tooth, pain-free", price:"৳ 5,000",
      meta:"Painless root canal treatment (RCT) in Dhaka at Example Dental. Single & multi-visit RCT from ৳5,000. Book with Dr. Ayesha Rahman.",
      desc:"Save your natural tooth with our painless, fully sterile treatment. Get fast relief from pain and return to your daily routine quickly.",
      facts:[["Procedure","Fully Painless"],["Visits","1–2 sessions only"],["Success Rate","Long-lasting result"],["Hygiene","100% sterile tools"]],
      overview:"A root canal removes infected pulp from inside a damaged tooth, relieves pain and lets you keep your natural tooth instead of extracting it. At Example Dental we use gentle, modern techniques — including single-visit RCT — so most patients feel little to no discomfort.",
      process:["Digital X-ray & diagnosis","Gentle numbing of the area","Cleaning & sealing the canal","Filling or crown to protect the tooth"] },
    bn:{ name:"রুট ক্যানেল চিকিৎসা (RCT)", tag:"ব্যথাহীনভাবে আপনার আসল দাঁত বাঁচান", price:"৳ ৫,০০০",
      desc:"আমাদের ব্যথাহীন, সম্পূর্ণ জীবাণুমুক্ত চিকিৎসায় আপনার আসল দাঁত বাঁচান। দ্রুত ব্যথা থেকে মুক্তি পান এবং দ্রুত স্বাভাবিক জীবনে ফিরুন।",
      facts:[["পদ্ধতি","সম্পূর্ণ ব্যথাহীন"],["ভিজিট","মাত্র ১–২ সেশন"],["সাফল্যের হার","দীর্ঘস্থায়ী ফল"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"রুট ক্যানেল ক্ষতিগ্রস্ত দাঁতের ভেতরের সংক্রমিত পাল্প সরিয়ে ব্যথা কমায় এবং দাঁত তুলে ফেলার বদলে আসল দাঁত রক্ষা করে। উদাহরণ ডেন্টালে আমরা কোমল, আধুনিক পদ্ধতি ব্যবহার করি — সিঙ্গেল-ভিজিট সহ — তাই বেশিরভাগ রোগী প্রায় কোনো ব্যথা অনুভব করেন না।",
      process:["ডিজিটাল এক্স-রে ও রোগ নির্ণয়","কোমলভাবে অবশ করা","ক্যানেল পরিষ্কার ও সিল করা","দাঁত রক্ষায় ফিলিং বা ক্রাউন"] } },

  { slug:"dental-implants", icon:"🔩", img:"dental-implants", gallery:["dental-implants","implant-double","implant-single"],
    en:{ name:"Dental Implants", tag:"Permanent, natural-looking new teeth", price:"৳ 1,20,000",
      meta:"Dental implants in Dhaka at Example Dental — permanent replacement for missing teeth from ৳1,20,000. Book with Dr. Ayesha Rahman.",
      desc:"A permanent, natural-looking replacement for missing teeth that looks, feels and functions just like your own — built to last for decades.",
      facts:[["Procedure","Minor surgery"],["Visits","Multi-stage"],["Success Rate","95%+ long-term"],["Hygiene","100% sterile tools"]],
      overview:"A dental implant is a titanium root placed in the jaw to support a natural-looking replacement tooth. Implants are the gold-standard solution for missing teeth — they protect your jawbone and don't damage neighbouring teeth.",
      process:["Consultation & 3D assessment","Implant placement","Healing & integration","Final crown fitted on top"] },
    bn:{ name:"ডেন্টাল ইমপ্লান্ট", tag:"স্থায়ী, প্রাকৃতিক দেখতে নতুন দাঁত", price:"৳ ১,২০,০০০",
      desc:"হারানো দাঁতের স্থায়ী, প্রাকৃতিক দেখতে প্রতিস্থাপন যা দেখতে, অনুভবে ও কাজে একদম আসল দাঁতের মতো — কয়েক দশক টেকে।",
      facts:[["পদ্ধতি","ছোট সার্জারি"],["ভিজিট","একাধিক ধাপ"],["সাফল্যের হার","৯৫%+ দীর্ঘমেয়াদি"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ডেন্টাল ইমপ্লান্ট হলো চোয়ালে স্থাপিত টাইটানিয়াম রুট যা প্রাকৃতিক দেখতে নকল দাঁত ধরে রাখে। হারানো দাঁতের জন্য ইমপ্লান্ট সেরা সমাধান — এটি চোয়ালের হাড় রক্ষা করে ও পাশের দাঁতের ক্ষতি করে না।",
      process:["পরামর্শ ও থ্রিডি মূল্যায়ন","ইমপ্লান্ট স্থাপন","নিরাময় ও সংযুক্তি","উপরে চূড়ান্ত ক্রাউন বসানো"] } },

  { slug:"braces-aligners", icon:"📏", img:"braces-aligners", gallery:["braces-aligners","aligner","aligner-tray"],
    en:{ name:"Braces & Clear Aligners", tag:"Straighten your smile with confidence", price:"৳ 25,000",
      meta:"Orthodontic braces & invisible clear aligners in Dhaka at Example Dental. Braces from ৳25,000. Book with Dr. Ayesha Rahman.",
      desc:"Gently move misaligned teeth into a straight, healthy position with traditional braces or near-invisible clear aligners.",
      facts:[["Procedure","Non-surgical"],["Visits","Monthly check-ups"],["Duration","12–24 months"],["Hygiene","100% sterile tools"]],
      overview:"Braces and clear aligners gradually move misaligned teeth into a straight, healthy position. We offer traditional orthodontic braces as well as near-invisible clear aligners for a discreet option.",
      process:["Orthodontic assessment","Custom treatment plan","Fit braces or aligners","Regular adjustments to final result"] },
    bn:{ name:"ব্রেসেস ও ক্লিয়ার অ্যালাইনার", tag:"আত্মবিশ্বাসে দাঁত সোজা করুন", price:"৳ ২৫,০০০",
      desc:"সাধারণ ব্রেসেস বা প্রায় অদৃশ্য ক্লিয়ার অ্যালাইনার দিয়ে আঁকাবাঁকা দাঁত কোমলভাবে সোজা ও সুস্থ অবস্থানে আনুন।",
      facts:[["পদ্ধতি","সার্জারিবিহীন"],["ভিজিট","মাসিক চেকআপ"],["সময়কাল","১২–২৪ মাস"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ব্রেসেস ও ক্লিয়ার অ্যালাইনার ধীরে ধীরে আঁকাবাঁকা দাঁত সোজা ও সুস্থ অবস্থানে নিয়ে আসে। আমরা সাধারণ অর্থোডন্টিক ব্রেসেসের পাশাপাশি প্রায় অদৃশ্য ক্লিয়ার অ্যালাইনারও দিই।",
      process:["অর্থোডন্টিক মূল্যায়ন","কাস্টম চিকিৎসা পরিকল্পনা","ব্রেসেস বা অ্যালাইনার লাগানো","নিয়মিত সমন্বয়ে চূড়ান্ত ফল"] } },

  { slug:"teeth-whitening", icon:"✨", img:"teeth-whitening", gallery:["teeth-whitening","whitening-compare","whitening-stained","whitening-case-1","whitening-case-2"],
    en:{ name:"Teeth Whitening", tag:"A brighter smile in one visit", price:"৳ 12,000",
      meta:"Professional teeth whitening in Dhaka at Example Dental for ৳12,000. Safe, fast and effective. Book with Dr. Ayesha Rahman.",
      desc:"Safely lighten years of stains and brighten your smile several shades in a single, comfortable visit.",
      facts:[["Procedure","Fully Painless"],["Visits","1 session"],["Result","Several shades brighter"],["Hygiene","100% sterile tools"]],
      overview:"Professional teeth whitening safely lightens stains from tea, coffee, smoking and age — far more effective and safer than over-the-counter kits, with results you can see the same day.",
      process:["Cleaning & shade check","Gum protection applied","Whitening gel + light","Instant brighter result"] },
    bn:{ name:"দাঁত সাদা করা", tag:"এক ভিজিটেই উজ্জ্বল হাসি", price:"৳ ১২,০০০",
      desc:"বছরের জমা দাগ নিরাপদে দূর করে এক ভিজিটেই আপনার হাসি কয়েক শেড উজ্জ্বল করুন।",
      facts:[["পদ্ধতি","সম্পূর্ণ ব্যথাহীন"],["ভিজিট","১ সেশন"],["ফলাফল","কয়েক শেড উজ্জ্বল"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"পেশাদার হোয়াইটেনিং চা, কফি, ধূমপান ও বয়সজনিত দাগ নিরাপদে দূর করে — দোকানের কিটের চেয়ে অনেক বেশি কার্যকর ও নিরাপদ, একই দিনে দৃশ্যমান ফল।",
      process:["পরিষ্কার ও শেড পরীক্ষা","মাড়ি সুরক্ষা","হোয়াইটেনিং জেল + লাইট","তাৎক্ষণিক উজ্জ্বল ফল"] } },

  { slug:"crowns-bridges", icon:"👑", img:"crowns-diagram", gallery:["crowns-diagram","crowns-bridges","crowns-implant-bridge","crown-case-1","crown-case-2"],
    en:{ name:"Crowns & Bridges", tag:"Rebuild strength and beauty", price:"৳ 5,000",
      meta:"Dental crowns & bridges in Dhaka at Example Dental — Zirconia, PFM & composite crowns from ৳5,000. Book with Dr. Ayesha Rahman.",
      desc:"Restore the strength, shape and beauty of damaged or missing teeth with durable, natural-looking crowns and bridges.",
      facts:[["Procedure","Fully Painless"],["Visits","2 sessions"],["Material","Zirconia / PFM"],["Hygiene","100% sterile tools"]],
      overview:"Crowns cap a damaged or root-treated tooth to restore its strength and shape, while bridges replace one or more missing teeth. We offer durable Zirconia, PFM and composite options matched to your natural teeth.",
      process:["Tooth preparation","Precise digital impression","Custom crown/bridge made","Fitting & final polish"] },
    bn:{ name:"ক্রাউন ও ব্রিজ", tag:"শক্তি ও সৌন্দর্য ফিরিয়ে আনুন", price:"৳ ৫,০০০",
      desc:"টেকসই, প্রাকৃতিক দেখতে ক্রাউন ও ব্রিজ দিয়ে ক্ষতিগ্রস্ত বা হারানো দাঁতের শক্তি, আকৃতি ও সৌন্দর্য ফিরিয়ে আনুন।",
      facts:[["পদ্ধতি","সম্পূর্ণ ব্যথাহীন"],["ভিজিট","২ সেশন"],["উপাদান","জিরকোনিয়া / পিএফএম"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ক্রাউন ক্ষতিগ্রস্ত বা রুট-ক্যানেল করা দাঁত ঢেকে শক্তি ও আকৃতি ফেরায়, আর ব্রিজ এক বা একাধিক হারানো দাঁত প্রতিস্থাপন করে। আমরা টেকসই জিরকোনিয়া, পিএফএম ও কম্পোজিট অপশন দিই।",
      process:["দাঁত প্রস্তুত করা","নিখুঁত ডিজিটাল ছাপ","কাস্টম ক্রাউন/ব্রিজ তৈরি","ফিটিং ও চূড়ান্ত পলিশ"] } },

  { slug:"dentures", icon:"🦿", img:"dentures", gallery:["dentures","dentures-partial","dentures-flexible","denture-case-1","denture-case-2"],
    en:{ name:"Dentures", tag:"Comfortable, natural-looking replacements", price:"৳ 4,000",
      meta:"Partial, flexible & complete dentures in Dhaka at Example Dental from ৳4,000. Book with Dr. Ayesha Rahman.",
      desc:"Chew, speak and smile with confidence again with custom partial, flexible and complete dentures.",
      facts:[["Procedure","Non-surgical"],["Visits","2–3 sessions"],["Fit","Custom-made"],["Hygiene","100% sterile tools"]],
      overview:"Dentures replace missing teeth so you can chew, speak and smile with confidence again. We craft partial, flexible and complete dentures with a comfortable, natural-looking fit.",
      process:["Oral assessment","Impressions & measurements","Custom denture crafted","Fitting & comfort adjustment"] },
    bn:{ name:"ডেনচার", tag:"আরামদায়ক, প্রাকৃতিক দেখতে প্রতিস্থাপন", price:"৳ ৪,০০০",
      desc:"কাস্টম পার্শিয়াল, ফ্লেক্সিবল ও কমপ্লিট ডেনচার দিয়ে আবার আত্মবিশ্বাসে চিবান, কথা বলুন ও হাসুন।",
      facts:[["পদ্ধতি","সার্জারিবিহীন"],["ভিজিট","২–৩ সেশন"],["ফিট","কাস্টম তৈরি"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ডেনচার হারানো দাঁত প্রতিস্থাপন করে যাতে আপনি আবার আত্মবিশ্বাসে চিবাতে, কথা বলতে ও হাসতে পারেন। আমরা আরামদায়ক, প্রাকৃতিক ফিটের ডেনচার তৈরি করি।",
      process:["মুখ পরীক্ষা","ছাপ ও পরিমাপ","কাস্টম ডেনচার তৈরি","ফিটিং ও আরাম সমন্বয়"] } },

  { slug:"scaling-polishing", icon:"🦷", img:"scaling-polishing", gallery:["scaling-polishing","scaling-ba","scaling-stained","scaling-clean","scaling-case-1"],
    en:{ name:"Scaling & Polishing", tag:"Healthy gums, fresh clean smile", price:"৳ 1,500",
      meta:"Professional teeth scaling & polishing in Dhaka at Example Dental from ৳1,000. Book a cleaning with Dr. Ayesha Rahman.",
      desc:"Remove plaque and tartar and polish your teeth for healthy gums, fresh breath and a brighter smile.",
      facts:[["Procedure","Fully Painless"],["Visits","1 session"],["Recommended","Every 6 months"],["Hygiene","100% sterile tools"]],
      overview:"Scaling removes plaque and hardened tartar that brushing can't, while polishing smooths and brightens your teeth. Regular cleaning prevents gum disease, bad breath and tooth loss.",
      process:["Gum & teeth check","Ultrasonic scaling","Polishing","Care & prevention tips"] },
    bn:{ name:"স্কেলিং ও পলিশিং", tag:"সুস্থ মাড়ি, পরিষ্কার সতেজ হাসি", price:"৳ ১,৫০০",
      desc:"প্লাক ও টার্টার দূর করে দাঁত পলিশ করুন — সুস্থ মাড়ি, সতেজ নিঃশ্বাস ও উজ্জ্বল হাসির জন্য।",
      facts:[["পদ্ধতি","সম্পূর্ণ ব্যথাহীন"],["ভিজিট","১ সেশন"],["প্রস্তাবিত","প্রতি ৬ মাসে"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"স্কেলিং প্লাক ও শক্ত টার্টার দূর করে যা ব্রাশে যায় না, আর পলিশিং দাঁত মসৃণ ও উজ্জ্বল করে। নিয়মিত পরিষ্কার মাড়ির রোগ, দুর্গন্ধ ও দাঁত পড়া রোধ করে।",
      process:["মাড়ি ও দাঁত পরীক্ষা","আল্ট্রাসনিক স্কেলিং","পলিশিং","যত্ন ও প্রতিরোধের পরামর্শ"] } },

  { slug:"tooth-fillings", icon:"🪥", img:"tooth-fillings", gallery:["tooth-fillings","filling-composite","filling-gi","filling-temporary","filling-case-1","filling-case-2","filling-case-3"],
    en:{ name:"Tooth Fillings", tag:"Restore decayed teeth, painlessly", price:"৳ 1,000",
      meta:"Tooth-coloured composite & GI fillings in Dhaka at Example Dental from ৳1,000. Book with Dr. Ayesha Rahman.",
      desc:"Repair decayed teeth with natural, tooth-coloured fillings that stop pain and prevent further damage.",
      facts:[["Procedure","Fully Painless"],["Visits","1 session"],["Finish","Tooth-coloured"],["Hygiene","100% sterile tools"]],
      overview:"A filling repairs a tooth damaged by decay, stopping pain and preventing further damage. We use tooth-coloured composite and GI fillings that blend in naturally and are placed gently and painlessly.",
      process:["Examine the cavity","Gentle cleaning","Tooth-coloured filling","Shaping & polish"] },
    bn:{ name:"দাঁতের ফিলিং", tag:"ব্যথাহীনভাবে ক্ষয়প্রাপ্ত দাঁত ঠিক করুন", price:"৳ ১,০০০",
      desc:"প্রাকৃতিক, দাঁতের রঙের ফিলিং দিয়ে ক্ষয়প্রাপ্ত দাঁত মেরামত করুন — ব্যথা বন্ধ করে ও আরও ক্ষতি রোধ করে।",
      facts:[["পদ্ধতি","সম্পূর্ণ ব্যথাহীন"],["ভিজিট","১ সেশন"],["ফিনিশ","দাঁতের রঙের"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"ফিলিং ক্ষয়ে ক্ষতিগ্রস্ত দাঁত মেরামত করে, ব্যথা বন্ধ করে ও আরও ক্ষতি রোধ করে। আমরা দাঁতের রঙের কম্পোজিট ও জিআই ফিলিং ব্যবহার করি যা প্রাকৃতিকভাবে মিশে যায়।",
      process:["ক্যাভিটি পরীক্ষা","কোমল পরিষ্কার","দাঁতের রঙের ফিলিং","আকৃতি ও পলিশ"] } },

  { slug:"veneers", icon:"💎", img:"veneers", gallery:["veneers","veneers-before","veneers-after","veneer-case-1","veneer-case-2"],
    en:{ name:"Composite Veneer", tag:"Reshape and perfect your smile", price:"৳ 3,500 / tooth",
      meta:"Composite veneers in Dhaka at Example Dental from ৳3,500 — close gaps, fix chips and perfect your front teeth. Book with Dr. Ayesha Rahman.",
      desc:"Reshape, close gaps and perfect the look of your front teeth with natural, tooth-coloured composite veneers.",
      facts:[["Procedure","Fully Painless"],["Visits","1 Session"],["Warranty","Up to 5 years"],["Hygiene","100% sterile tools"]],
      overview:"Composite veneers are thin, tooth-coloured layers bonded to the front of your teeth to fix gaps, chips, stains and shape — giving you a natural, even smile in just one or two visits, without removing much of your natural tooth.",
      process:["Smile assessment","Shade & shape planning","Bonding the veneer","Sculpting & polish"] },
    bn:{ name:"কম্পোজিট ভিনেয়ার", tag:"হাসি নতুন আকৃতি ও নিখুঁত করুন", price:"৳ ৩,৫০০ / দাঁত",
      desc:"প্রাকৃতিক, দাঁতের রঙের কম্পোজিট ভিনেয়ার দিয়ে সামনের দাঁতের ফাঁক বন্ধ করুন, আকৃতি ও সৌন্দর্য নিখুঁত করুন।",
      facts:[["পদ্ধতি","সম্পূর্ণ ব্যথাহীন"],["ভিজিট","১ সেশন"],["ওয়ারেন্টি","৫ বছর পর্যন্ত"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"কম্পোজিট ভিনেয়ার হলো দাঁতের রঙের পাতলা স্তর যা সামনের দাঁতে বসিয়ে ফাঁক, ভাঙা, দাগ ও আকৃতি ঠিক করা হয় — মাত্র এক-দুই ভিজিটেই প্রাকৃতিক, সমান হাসি দেয়, আসল দাঁত বেশি না কেটে।",
      process:["স্মাইল মূল্যায়ন","শেড ও আকৃতি পরিকল্পনা","ভিনেয়ার বন্ডিং","স্কাল্পটিং ও পলিশ"] } },

  { slug:"extractions", icon:"🩺", img:"extractions-surgery", gallery:["extractions-surgery","extraction-front","frenectomy","frenectomy-steps","extraction-case-1","extraction-case-2"],
    en:{ name:"Tooth Extraction & Surgery", tag:"Painless removal, including wisdom teeth", price:"৳ 1,000",
      meta:"Painless tooth extraction & minor oral surgery in Dhaka at Example Dental from ৳1,000, including wisdom teeth. Book with Dr. Ayesha Rahman.",
      desc:"Safe, painless removal of badly damaged or wisdom teeth, with gentle care before, during and after.",
      facts:[["Procedure","Fully Painless"],["Visits","1 session"],["Recovery","Quick & guided"],["Hygiene","100% sterile tools"]],
      overview:"When a tooth is too damaged to save, or a wisdom tooth is causing pain and crowding, a gentle extraction relieves the problem and protects your other teeth. We perform simple and surgical extractions with modern, painless techniques and clear aftercare.",
      process:["X-ray & assessment","Gentle numbing","Painless removal","Aftercare guidance"] },
    bn:{ name:"দাঁত তোলা ও সার্জারি", tag:"আক্কেল দাঁতসহ ব্যথাহীন অপসারণ", price:"৳ ১,০০০",
      desc:"মারাত্মক ক্ষতিগ্রস্ত বা আক্কেল দাঁতের নিরাপদ, ব্যথাহীন অপসারণ — আগে, চলাকালীন ও পরে কোমল যত্নসহ।",
      facts:[["পদ্ধতি","সম্পূর্ণ ব্যথাহীন"],["ভিজিট","১ সেশন"],["আরোগ্য","দ্রুত ও নির্দেশিত"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"যখন কোনো দাঁত বাঁচানোর অযোগ্য হয়, বা আক্কেল দাঁত ব্যথা ও ভিড় তৈরি করে, তখন কোমল এক্সট্রাকশন সমস্যা দূর করে ও অন্য দাঁত রক্ষা করে। আমরা আধুনিক, ব্যথাহীন কৌশলে সাধারণ ও সার্জিক্যাল এক্সট্রাকশন করি ও স্পষ্ট আফটারকেয়ার দিই।",
      process:["এক্স-রে ও মূল্যায়ন","কোমলভাবে অবশ করা","ব্যথাহীন অপসারণ","আফটারকেয়ার পরামর্শ"] } },

  { slug:"kids-dentistry", icon:"🧒", img:"kids-dentistry", gallery:["kids-dentistry","kids-checkup","kids-extraction","kids-case-1"],
    en:{ name:"Kids Dentistry", tag:"Gentle, friendly care for children", price:"৳ 1,000",
      meta:"Gentle children's dentistry in Dhaka at Example Dental from ৳1,000 — check-ups, cleaning, fillings and milk-tooth care. Book with Dr. Ayesha Rahman.",
      desc:"Gentle, friendly dental care for children — from check-ups and cleaning to fillings and milk-tooth treatment.",
      facts:[["Approach","Child-friendly"],["Visits","Quick & easy"],["Comfort","Fear-free"],["Hygiene","100% sterile tools"]],
      overview:"We make dental visits calm and positive for kids, building healthy habits early. From routine check-ups and cleaning to gentle fillings and milk-tooth care, our friendly approach keeps children comfortable and confident.",
      process:["Friendly welcome","Gentle check-up","Painless treatment","Prevention tips for parents"] },
    bn:{ name:"শিশু দন্তচিকিৎসা", tag:"শিশুদের জন্য কোমল, বন্ধুত্বপূর্ণ যত্ন", price:"৳ ১,০০০",
      desc:"শিশুদের জন্য কোমল, বন্ধুত্বপূর্ণ দন্তসেবা — চেকআপ ও পরিষ্কার থেকে ফিলিং ও দুধ দাঁতের চিকিৎসা পর্যন্ত।",
      facts:[["পদ্ধতি","শিশুবান্ধব"],["ভিজিট","দ্রুত ও সহজ"],["স্বস্তি","ভয়হীন"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"আমরা শিশুদের জন্য ডেন্টাল ভিজিট শান্ত ও ইতিবাচক করি, ছোটবেলাতেই সুস্থ অভ্যাস গড়ে তুলি। চেকআপ ও পরিষ্কার থেকে কোমল ফিলিং ও দুধ দাঁতের যত্ন — আমাদের বন্ধুত্বপূর্ণ পদ্ধতি শিশুদের আরামদায়ক ও আত্মবিশ্বাসী রাখে।",
      process:["বন্ধুত্বপূর্ণ অভ্যর্থনা","কোমল চেকআপ","ব্যথাহীন চিকিৎসা","অভিভাবকদের প্রতিরোধ পরামর্শ"] } },

  { slug:"cosmetic-dentistry", icon:"💖", img:"cosmetic-dentistry", gallery:["cosmetic-dentistry","cosmetic-veneers","cosmetic-ba"],
    en:{ name:"Cosmetic Dentistry", tag:"Design your perfect smile", price:"৳ 3,500",
      meta:"Cosmetic dentistry & smile makeovers in Dhaka at Example Dental from ৳3,500 — whitening, veneers, bonding & reshaping. Book with Dr. Ayesha Rahman.",
      desc:"Transform your smile with a tailored combination of whitening, veneers, bonding and reshaping.",
      facts:[["Procedure","Fully Painless"],["Visits","Tailored plan"],["Result","Natural-looking"],["Hygiene","100% sterile tools"]],
      overview:"A smile makeover combines treatments — whitening, composite veneers, bonding and reshaping — into one personalised plan to give you a brighter, more even and confident smile that still looks completely natural.",
      process:["Smile consultation","Custom makeover plan","Step-by-step treatment","Final reveal & care"] },
    bn:{ name:"কসমেটিক ডেন্টিস্ট্রি", tag:"আপনার নিখুঁত হাসি ডিজাইন করুন", price:"৳ ৩,৫০০",
      desc:"হোয়াইটেনিং, ভিনেয়ার, বন্ডিং ও রিশেপিং-এর উপযোগী সমন্বয়ে আপনার হাসি বদলে ফেলুন।",
      facts:[["পদ্ধতি","সম্পূর্ণ ব্যথাহীন"],["ভিজিট","উপযোগী পরিকল্পনা"],["ফলাফল","প্রাকৃতিক দেখতে"],["পরিচ্ছন্নতা","১০০% জীবাণুমুক্ত যন্ত্র"]],
      overview:"স্মাইল মেকওভার একাধিক চিকিৎসা — হোয়াইটেনিং, কম্পোজিট ভিনেয়ার, বন্ডিং ও রিশেপিং — একটি ব্যক্তিগত পরিকল্পনায় মিলিয়ে আপনাকে উজ্জ্বল, সমান ও আত্মবিশ্বাসী হাসি দেয় যা সম্পূর্ণ প্রাকৃতিক দেখায়।",
      process:["স্মাইল পরামর্শ","কাস্টম মেকওভার পরিকল্পনা","ধাপে ধাপে চিকিৎসা","চূড়ান্ত ফল ও যত্ন"] } },
];

/* per-service cost comparison rows: [desc_en, desc_bn, avgInDhaka, examplePrice] */
const COSTS = {
  "root-canal":[
    ["Front Tooth RCT (Single Canal)","সামনের দাঁত RCT (সিঙ্গেল ক্যানেল)","৳7,000–8,000","৳5,000"],
    ["Back Tooth RCT (Multi-Canal)","পেছনের দাঁত RCT (মাল্টি-ক্যানেল)","৳8,000–9,000","৳5,000"],
    ["Single Visit RCT with Filling","সিঙ্গেল ভিজিট RCT + ফিলিং","৳14,000–16,000","৳12,000"],
    ["Re-RCT (Failed Case)","রি-RCT (ব্যর্থ কেস)","৳8,000–10,000","৳6,500"],
    ["Wisdom Tooth RCT","আক্কেল দাঁত RCT","৳10,000–11,000","৳8,000"]],
  "scaling-polishing":[
    ["Teeth Scaling","দাঁত স্কেলিং","৳2,000–2,500","৳1,500"],
    ["Teeth Polishing","দাঁত পলিশিং","৳1,500–2,000","৳1,000"],
    ["Gum Treatment","মাড়ির চিকিৎসা","৳10,000–12,000","৳8,500"]],
  "tooth-fillings":[
    ["Composite Filling (General)","কম্পোজিট ফিলিং (জেনারেল)","৳1,500–2,000","৳1,000"],
    ["Composite Filling (Advance)","কম্পোজিট ফিলিং (অ্যাডভান্স)","৳3,500–4,500","৳2,500–3,000"],
    ["GI Filling","জিআই ফিলিং","৳2,000–2,500","৳1,500–2,000"],
    ["Temporary Filling","অস্থায়ী ফিলিং","৳800–1,000","৳500"]],
  "crowns-bridges":[
    ["Zirconia Crown","জিরকোনিয়া ক্রাউন","৳16,000–20,000","৳12,000–15,000"],
    ["PFM Crown (Advance)","পিএফএম ক্রাউন (অ্যাডভান্স)","৳10,000–12,000","৳8,000"],
    ["PFM Crown (General)","পিএফএম ক্রাউন (জেনারেল)","৳6,500–8,000","৳5,000"],
    ["Composite Crown","কম্পোজিট ক্রাউন","৳8,000–9,000","৳6,500"],
    ["Fiber Bridge (Premium)","ফাইবার ব্রিজ (প্রিমিয়াম)","৳26,000–30,000","৳22,000–24,000"]],
  "teeth-whitening":[
    ["Professional Teeth Whitening","পেশাদার দাঁত সাদা করা","৳15,000–18,000","৳12,000"]],
  "veneers":[
    ["Composite Veneer (General)","কম্পোজিট ভিনেয়ার (জেনারেল)","৳4,500–5,500","৳3,500–4,000"],
    ["Composite Veneer (Advance)","কম্পোজিট ভিনেয়ার (অ্যাডভান্স)","৳8,000–10,000","৳5,500–7,500"]],
  "dentures":[
    ["Partial Denture (per tooth)","পার্শিয়াল ডেনচার (প্রতি দাঁত)","৳5,000–6,500","৳4,000–5,000"],
    ["Flexible Denture","ফ্লেক্সিবল ডেনচার","৳10,000–12,000","৳8,000"],
    ["Complete Denture","কমপ্লিট ডেনচার","৳25,000–30,000","৳22,000"]],
  "braces-aligners":[
    ["Orthodontic Braces","অর্থোডন্টিক ব্রেসেস","৳30,000–40,000","৳25,000 + ৳6,000/mo"],
    ["Clear Aligners","ক্লিয়ার অ্যালাইনার","৳2,00,000–3,00,000","৳1,50,000–2,50,000"]],
  "dental-implants":[
    ["Dental Implant (per tooth)","ডেন্টাল ইমপ্লান্ট (প্রতি দাঁত)","৳1,50,000–2,00,000","৳1,20,000–1,50,000"]],
  "extractions":[
    ["Permanent Tooth Extraction","স্থায়ী দাঁত তোলা","৳3,000–6,000","৳2,000–5,000"],
    ["Surgical Extraction (Wisdom)","সার্জিক্যাল এক্সট্রাকশন (আক্কেল)","৳12,000–15,000","৳8,000–12,000"],
    ["Milk Tooth Extraction","দুধ দাঁত তোলা","৳1,200–1,500","৳1,000"],
    ["Frenectomy","ফ্রেনেক্টমি","৳4,000–5,000","৳3,000"]],
  "kids-dentistry":[
    ["Kids Check-up & Cleaning","শিশুর চেকআপ ও পরিষ্কার","৳1,500–2,000","৳1,000"],
    ["Milk Tooth Filling","দুধ দাঁতের ফিলিং","৳1,200–1,500","৳1,000"],
    ["Milk Tooth Extraction","দুধ দাঁত তোলা","৳1,200–1,500","৳1,000"]],
  "cosmetic-dentistry":[
    ["Teeth Whitening","দাঁত সাদা করা","৳15,000–18,000","৳12,000"],
    ["Composite Veneer","কম্পোজিট ভিনেয়ার","৳4,500–10,000","৳3,500–7,500"],
    ["Tooth Shaping","টুথ শেপিং","৳800–1,000","৳500"]],
};

/* shared tab content */
const DOC = {
  en:["Dr. Ayesha Rahman","Chief Dental Surgeon, Example Dental",
    ["BDS (DU) · BMDC Reg. 11071","PGT in Oral & Maxillofacial Surgery — Dhaka Dental College","PGT in Paediatrics — Dhaka Dental College","Specially trained in Painless & Cosmetic Treatment"]],
  bn:["ডা. আয়েশা রহমান","চিফ ডেন্টাল সার্জন, উদাহরণ ডেন্টাল",
    ["বিডিএস (ঢাবি) · বিএমডিসি রেজি. ১১০৭১","পিজিটি ইন ওরাল ও ম্যাক্সিলোফেসিয়াল সার্জারি — ঢাকা ডেন্টাল কলেজ","পিজিটি ইন পেডিয়াট্রিক্স — ঢাকা ডেন্টাল কলেজ","ব্যথাহীন ও কসমেটিক চিকিৎসায় বিশেষ প্রশিক্ষিত"]],
};
const REVIEWS = [
  ["Truly painless! I was terrified of dentists but Dr. Example made me completely comfortable.","সত্যিই ব্যথাহীন! ডেন্টিস্টকে ভয় পেতাম, কিন্তু ডা. আয়েশা রহমান আমাকে পুরোপুরি স্বস্তি দিয়েছেন।","Nusrat J."],
  ["Clean clinic, friendly staff and fair, honest pricing. Highly recommended.","পরিষ্কার ক্লিনিক, বন্ধুত্বপূর্ণ স্টাফ ও ন্যায্য, সৎ মূল্য। অত্যন্ত প্রস্তাবিত।","Tanvir A."],
  ["The whole team is gentle and professional. Best dental experience in Dhaka.","পুরো টিম কোমল ও পেশাদার। ঢাকায় সেরা ডেন্টাল অভিজ্ঞতা।","Shirin S."],
];
const FAQG = [
  ["Is the treatment painful?","No — Dr. Example is specially trained in painless dentistry, so most patients feel little to no discomfort.","চিকিৎসা কি ব্যথাদায়ক?","না — ডা. আয়েশা রহমান ব্যথাহীন দন্তচিকিৎসায় বিশেষ প্রশিক্ষিত, তাই বেশিরভাগ রোগী প্রায় কোনো ব্যথা অনুভব করেন না।"],
  ["How much does it cost?","See the price shown above; the exact cost is confirmed after a quick check-up. We keep the most competitive prices in Dhaka.","খরচ কত?","উপরে দেখানো মূল্য দেখুন; সঠিক খরচ একটি দ্রুত চেকআপের পর নিশ্চিত হয়। আমরা ঢাকায় সবচেয়ে প্রতিযোগিতামূলক মূল্য রাখি।"],
  ["Do you offer same-day appointments?","Yes — call or WhatsApp us and we will see you as soon as possible, including urgent cases.","আপনারা কি একই দিনে অ্যাপয়েন্টমেন্ট দেন?","হ্যাঁ — কল বা হোয়াটসঅ্যাপ করুন, জরুরি ক্ষেত্রসহ যত দ্রুত সম্ভব আপনাকে দেখব।"],
  ["Can I consult from abroad?","Yes — we offer online video consultations for non-resident Bangladeshis and overseas patients.","আমি কি বিদেশ থেকে পরামর্শ নিতে পারি?","হ্যাঁ — প্রবাসী বাংলাদেশি ও বিদেশি রোগীদের জন্য আমরা অনলাইন ভিডিও পরামর্শ দিই।"],
];

function buildTabs(s){
  const steps = s.en.process.map((_,i)=>`<li ${bl(s.en.process[i],s.bn.process[i])}></li>`).join("");
  const facts = s.en.facts.map((f,i)=>`<li><strong ${bl(f[0]+": ",s.bn.facts[i][0]+": ")}></strong><span ${bl(f[1],s.bn.facts[i][1])}></span></li>`).join("");
  const creds = DOC.en[2].map((c,i)=>`<li><span class="ck">✓</span><span ${bl(c,DOC.bn[2][i])}></span></li>`).join("");
  const reviews = REVIEWS.map(r=>`<article class="test-card"><div class="stars">★★★★★</div><p ${bl('"'+r[0]+'"','"'+r[1]+'"')}></p><div class="test-meta"><span class="avatar">${r[2].charAt(0)}</span><div><strong>${r[2]}</strong></div></div></article>`).join("");
  const faqs = FAQG.map(f=>`<div class="faq-item"><button class="faq-q" aria-expanded="false" ${bl(f[0],f[2])}></button><div class="faq-a"><p ${bl(f[1],f[3])}></p></div></div>`).join("");
  const cost = COSTS[s.slug]||[];
  const costRows = cost.map(c=>`<tr><td ${bl(c[0],c[1])}></td><td>${c[2]}</td><td class="cmp-clinic">${c[3]}</td></tr>`).join("");
  const costTable = cost.length ? `
    <h3 ${bl(s.en.name+" Cost in Bangladesh","বাংলাদেশে "+s.bn.name+" খরচ")}></h3>
    <p ${bl("The cost depends on the tooth's condition, location and the technology used. At Example Dental we ensure premium quality while keeping the most competitive prices.","খরচ নির্ভর করে দাঁতের অবস্থা, অবস্থান ও ব্যবহৃত প্রযুক্তির উপর। উদাহরণ ডেন্টালে আমরা প্রিমিয়াম মান নিশ্চিত করে সবচেয়ে প্রতিযোগিতামূলক মূল্য রাখি।")}></p>
    <div class="cmp-wrap"><table class="cmp-table">
      <thead><tr><th ${bl("Service Description","সেবার বিবরণ")}></th><th ${bl("Average Cost in BD","বিডিতে গড় খরচ")}></th><th ${bl("Example Dental Price","উদাহরণ ডেন্টাল মূল্য")}></th></tr></thead>
      <tbody>${costRows}</tbody>
    </table></div>
    <p class="cmp-note" ${bl("* Final price is confirmed after a quick check-up.","* সঠিক মূল্য একটি দ্রুত চেকআপের পর নিশ্চিত হয়।")}></p>` : "";
  return `
<section class="section"><div class="container" style="max-width:920px">
  <div class="tabs" id="tabs">
    <button class="tab-btn active" data-tab="details" ${bl("Details","বিস্তারিত")}></button>
    <button class="tab-btn" data-tab="doctors" ${bl("Doctors","ডাক্তার")}></button>
    <button class="tab-btn" data-tab="branches" ${bl("Branch","শাখা")}></button>
    <button class="tab-btn" data-tab="review" ${bl("Review","রিভিউ")}></button>
    <button class="tab-btn" data-tab="faq" ${bl("FAQ","প্রশ্নোত্তর")}></button>
  </div>

  <div class="tab-panel active" data-tab="details">
    <p ${bl(s.en.desc,s.bn.desc)}></p>
    ${costTable}
    <h3 ${bl("What is "+s.en.name+"?","“"+s.bn.name+"” কী?")}></h3>
    <p ${bl(s.en.overview,s.bn.overview)}></p>
    <h3 ${bl("Your treatment steps","আপনার চিকিৎসার ধাপ")}></h3>
    <ol class="tab-steps">${steps}</ol>
    <h3 ${bl("Why choose Example Dental","কেন উদাহরণ ডেন্টাল বেছে নেবেন")}></h3>
    <ul class="tab-list">${facts}</ul>
  </div>

  <div class="tab-panel" data-tab="doctors">
    <div class="doc-grid">
      <div class="doc-photo"><svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="180" height="200" rx="20" fill="#dff3ee"/><circle cx="90" cy="74" r="34" fill="#fff"/><circle cx="90" cy="70" r="20" fill="#57C3AD"/><path d="M40 180c0-30 22-50 50-50s50 20 50 50Z" fill="#fff"/><path d="M62 132c8 12 48 12 56 0l-6 30H68Z" fill="#2B6CB0"/></svg></div>
      <div class="doc-card"><h3 ${bl(DOC.en[0],DOC.bn[0])}></h3>
        <div class="doc-role" ${bl(DOC.en[1],DOC.bn[1])}></div>
        <ul class="doc-creds">${creds}</ul>
        <a class="btn btn-primary" href="../book.html" ${bl("Book with Dr. Example","ডা. আয়েশা রহমানর অ্যাপয়েন্টমেন্ট")}></a>
      </div>
    </div>
  </div>

  <div class="tab-panel" data-tab="branches">
    <div class="ci-row"><div class="ci-ic">${ico("pin")}</div><div><strong ${bl("Address","ঠিকানা")}></strong><span ${bl("1252/3, East Monipur, Metro Pillar-267 (W), West Kazipara, Begum Rokeya Soroni, Dhaka","১২৫২/৩, পূর্ব মনিপুর, মেট্রো পিলার-২৬৭(ওয়াই), পশ্চিম কাজীপাড়া, বেগম রোকেয়া সরণি, ঢাকা")}></span></div></div>
    <div class="ci-row"><div class="ci-ic">${ico("clockw")}</div><div><strong ${bl("Hours","সময়")}></strong><span ${bl("Saturday – Thursday: 10:00 AM – 9:30 PM · Friday: 11:00 AM – 9:30 PM","শনিবার – বৃহস্পতিবার: সকাল ১০টা – রাত ৯:৩০ · শুক্রবার: দুপুর ১১টা – রাত ৯:৩০")}></span></div></div>
    <div class="ci-row"><div class="ci-ic">${ico("phone")}</div><div><strong ${bl("Phone","ফোন")}></strong><span>01XXXXXXXXX · WhatsApp 01XXXXXXXXX</span></div></div>
    <a class="btn btn-primary" style="margin-top:14px" href="https://www.google.com/maps/dir/?api=1&destination=23.8018173%2C90.370624" target="_blank" rel="noopener" ${bl("Get Directions","দিকনির্দেশ নিন")}></a>
  </div>

  <div class="tab-panel" data-tab="review">
    <div class="test-grid">${reviews}</div>
  </div>

  <div class="tab-panel" data-tab="faq">
    <div class="faq-list">${faqs}</div>
  </div>
</div></section>`;
}

function page(s){
  const url = `${SITE}/services/${s.slug}.html`;
  const thumbs = (s.gallery || [s.img, ...THUMB_POOL.filter(x=>x!==s.img)]).slice(0,8);
  const thumbHtml = thumbs.map((tg,i)=>`<button class="pthumb${i===0?' active':''}" type="button" data-src="../assets/services/cards/${tg}.jpg?v=1" data-fallback="../assets/services/${tg}.svg?v=3"><img src="../assets/services/thumbs/${tg}.jpg?v=1" onerror="this.onerror=null;this.src='../assets/services/${tg}.svg?v=3'" alt=""></button>`).join("");
  const facts = s.en.facts.map((f,i)=>`
        <div class="fact"><span class="fact-ic">${ico(FACT_KEYS[i])}</span>
          <div><strong ${bl(f[0],s.bn.facts[i][0])}></strong><span ${bl(f[1],s.bn.facts[i][1])}></span></div></div>`).join("");
  const steps = s.en.process.map((_,i)=>`<article class="step-card"><span class="step-num">${i+1}</span><h3 ${bl(s.en.process[i],s.bn.process[i])}></h3></article>`).join("");
  const jsonld=`{"@context":"https://schema.org","@type":"MedicalProcedure","name":"${esc(s.en.name)}","procedureType":"Dentistry","description":"${esc(s.en.meta)}","url":"${url}","provider":{"@type":"Dentist","name":"Example Dental","telephone":"+880XXXXXXXXXX","address":{"@type":"PostalAddress","streetAddress":"1252/3, East Monipur, West Kazipara, Begum Rokeya Soroni","addressLocality":"Dhaka","addressCountry":"BD"},"geo":{"@type":"GeoCoordinates","latitude":23.8018173,"longitude":90.370624}}}`;
  return `<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(s.en.name)} in Dhaka | Example Dental</title>
<meta name="description" content="${esc(s.en.meta)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(s.en.name)} | Example Dental">
<meta property="og:description" content="${esc(s.en.meta)}">
<meta property="og:image" content="${SITE}/assets/logo.svg">
<meta name="theme-color" content="#57C3AD">
<link rel="icon" type="image/png" href="../assets/mark.svg?v=2">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<link rel="stylesheet" href="../assets/styles.css?v=${VER}">
<script type="application/ld+json">${jsonld}</script>
</head>
<body>
<div id="scrollbar"></div>
<header class="header"><nav class="nav container">
  <a class="brand" href="../index.html"><span class="logo-anim"><img src="../assets/mark.svg?v=2" alt="Example Dental"></span><span>CONTACT<small>DENTAL</small></span></a>
  <div class="navlist" id="navlist">
    <a href="../index.html#why" ${bl("About Us","আমাদের সম্পর্কে")}></a>
    <a href="../treatments.html" ${bl("Our Services","আমাদের সেবা")}></a>
    <a href="../index.html#contact" ${bl("Contact","যোগাযোগ")}></a>
    <a href="../index.html#pricing" ${bl("Price List","মূল্য তালিকা")}></a>
    <a href="../blog/index.html" ${bl("Blog","ব্লগ")}></a>
    <a href="../careers.html" ${bl("Careers","ক্যারিয়ার")}></a>
    <div class="nav-actions">
      <a class="btn btn-primary" href="../book.html" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
    </div>
  </div>
  <button class="lang-toggle nav-lang" id="langToggle"><span id="langText">বাংলা</span></button>
  <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>

<section class="section"><div class="container">
  <div class="prod-card">
    <div class="prod-grid">
      <div class="prod-gallery">
        <div class="prod-main"><img id="pmain" src="../assets/services/cards/${thumbs[0]}.jpg?v=1" data-fallback="../assets/services/${thumbs[0]}.svg?v=3" onerror="this.onerror=null;this.src=this.getAttribute('data-fallback')" alt="${esc(s.en.name)}"></div>
        <div class="prod-thumbs">${thumbHtml}</div>
      </div>
      <div class="prod-info">
        <span class="eyebrow"><span ${bl("Our Services","আমাদের সেবা")}></span></span>
        <h1 ${bl(s.en.name,s.bn.name)}></h1>
        ${CN[s.slug]?`<span class="svc-common prod-common" ${bl(CN[s.slug][0],CN[s.slug][1])}></span>`:""}
        <div class="prod-price" ${bl(s.en.price,s.bn.price)}></div>
        <p class="prod-desc" ${bl(s.en.desc,s.bn.desc)}></p>
        <hr class="prod-div">
        <div class="prod-facts">${facts}</div>
        <div class="prod-cta">
          <a class="btn btn-red" href="../book.html" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
          <a class="btn btn-wa" href="https://wa.me/880XXXXXXXXXX?text=${encodeURIComponent("I want to book: "+s.en.name)}" target="_blank" rel="noopener" ${bl("WhatsApp","হোয়াটসঅ্যাপ")}></a>
        </div>
      </div>
    </div>
  </div>
</div></section>

${buildTabs(s)}

<section class="emerg-band"><div class="container emerg-grid">
  <div><h2 ${bl("Ready to book your "+s.en.name+"?","আপনার "+s.bn.name+" বুক করতে প্রস্তুত?")}></h2>
    <p ${bl("Same-day appointments available. Call us or message on WhatsApp and our team will help you right away.","একই দিনের অ্যাপয়েন্টমেন্ট আছে। কল করুন বা হোয়াটসঅ্যাপে মেসেজ দিন, আমাদের টিম সাথে সাথে সাহায্য করবে।")}></p></div>
  <div class="emerg-cta">
    <a class="btn btn-call" href="tel:+880XXXXXXXXXX">${ico("phone",18)} <span ${bl("Call Now","কল করুন")}></span></a>
    <a class="btn btn-wa" href="https://wa.me/880XXXXXXXXXX" target="_blank" rel="noopener">${ico("chat",18)} <span ${bl("WhatsApp","হোয়াটসঅ্যাপ")}></span></a>
  </div>
</div></section>

<footer class="footer"><div class="container" style="text-align:center">
  <div class="foot-logo" style="justify-content:center"><span class="logo-anim"><img src="../assets/mark.svg?v=2" alt="Example Dental" style="height:50px"></span><span style="font-family:var(--f-head);font-weight:800;color:#fff;font-size:1.25rem">CONTACT<small style="display:block;font-size:.62rem;letter-spacing:.34em;color:var(--orange)">DENTAL</small></span></div>
  <p style="color:#a9c2cd;margin:14px 0">1252/3, East Monipur, West Kazipara, Begum Rokeya Soroni, Dhaka · 01XXXXXXXXX</p>
  <a class="btn btn-primary" href="../treatments.html" ${bl("← All treatments","← সব চিকিৎসা")}></a>
  <div class="foot-bottom">© <span id="yr"></span> CONTACT DENTAL</div>
</div></footer>
<a class="fab" href="https://wa.me/880XXXXXXXXXX" target="_blank" rel="noopener" aria-label="WhatsApp">${ico("chat",28)}</a>
<script>
document.getElementById('yr').textContent='2025';
function setLang(l){document.documentElement.setAttribute('data-lang',l);document.body.classList.toggle('bn',l==='bn');try{localStorage.setItem('clinic_lang',l)}catch(e){}
document.querySelectorAll('[data-en]').forEach(function(el){el.textContent=(l==='bn'?el.getAttribute('data-bn'):el.getAttribute('data-en'));});
var t=document.getElementById('langText');if(t)t.textContent=(l==='bn'?'EN':'বাংলা');}
var L='bn';try{L=localStorage.getItem('clinic_lang')||'bn'}catch(e){}
setLang(L);
document.getElementById('langToggle').onclick=function(){setLang(document.documentElement.getAttribute('data-lang')==='en'?'bn':'en');};
var b=document.getElementById('burger'),n=document.getElementById('navlist');if(b)b.onclick=function(){n.classList.toggle('open');};
var sb=document.getElementById('scrollbar');addEventListener('scroll',function(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;sb.style.width=(m>0?h.scrollTop/m*100:0)+'%';},{passive:true});
var main=document.getElementById('pmain');document.querySelectorAll('.pthumb').forEach(function(t){t.onclick=function(){var fb=t.getAttribute('data-fallback');main.onerror=function(){this.onerror=null;this.src=fb;};main.src=t.getAttribute('data-src');document.querySelectorAll('.pthumb').forEach(function(x){x.classList.remove('active')});t.classList.add('active');};});
document.querySelectorAll('.tab-btn').forEach(function(b){b.onclick=function(){var id=b.getAttribute('data-tab');
  document.querySelectorAll('.tab-btn').forEach(function(x){x.classList.toggle('active',x===b);});
  document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.toggle('active',p.getAttribute('data-tab')===id);});};});
document.querySelectorAll('.faq-q').forEach(function(q){q.onclick=function(){var o=q.getAttribute('aria-expanded')==='true';q.setAttribute('aria-expanded',String(!o));q.parentElement.classList.toggle('open',!o);};});
</script>
</body>
</html>`;
}

const outDir = path.join(__dirname,"..","services");
fs.mkdirSync(outDir,{recursive:true});
SERVICES.forEach(s=>fs.writeFileSync(path.join(outDir,`${s.slug}.html`), page(s)));

const urls = [`${SITE}/`, `${SITE}/treatments.html`, `${SITE}/blog/index.html`, ...SERVICES.map(s=>`${SITE}/services/${s.slug}.html`)];
fs.writeFileSync(path.join(__dirname,"..","sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`  <url><loc>${u}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>
`);
console.log("Generated",SERVICES.length,"product-style service pages");
