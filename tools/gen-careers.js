/* Generates /careers.html — a bilingual careers / job-openings page.
   Run: node tools/gen-careers.js */
const fs = require("fs");
const path = require("path");
const SITE = "https://example.github.io/clinic-site-template";
const VER = "20260628b";
const WA = "880XXXXXXXXXX"; // WhatsApp number for applications
const esc = s => String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const bl = (en,bn) => `data-en="${esc(en)}" data-bn="${esc(bn)}"`;
const wa = msg => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

// ---- EDIT HERE: add / remove / rename job openings ----
// [title_en, title_bn, type_en, type_bn, loc_en, loc_bn, desc_en, desc_bn]
const JOBS = [
  ["Associate Dentist (BDS)","অ্যাসোসিয়েট ডেন্টিস্ট (বিডিএস)","Full-time","ফুল-টাইম","West Kazipara, Dhaka","পশ্চিম কাজীপাড়া, ঢাকা",
    "BDS-qualified, BMDC-registered dentist to handle general & restorative treatments. Freshers with good clinical skills are welcome.",
    "সাধারণ ও রিস্টোরেটিভ চিকিৎসার জন্য বিডিএস ও বিএমডিসি রেজিস্টার্ড ডেন্টিস্ট। ভালো ক্লিনিক্যাল দক্ষতাসম্পন্ন নতুনরাও আবেদন করতে পারেন।"],
  ["Dental Assistant","ডেন্টাল অ্যাসিস্ট্যান্ট","Full-time","ফুল-টাইম","West Kazipara, Dhaka","পশ্চিম কাজীপাড়া, ঢাকা",
    "Assist the dentist chairside, prepare instruments and maintain sterilisation. Training provided for the right candidate.",
    "চেয়ারসাইডে ডেন্টিস্টকে সহায়তা, যন্ত্রপাতি প্রস্তুত ও জীবাণুমুক্তকরণ। উপযুক্ত প্রার্থীকে প্রশিক্ষণ দেওয়া হবে।"],
  ["Front Desk Receptionist","ফ্রন্ট ডেস্ক রিসেপশনিস্ট","Full-time","ফুল-টাইম","West Kazipara, Dhaka","পশ্চিম কাজীপাড়া, ঢাকা",
    "Greet patients, manage appointments and calls, and keep the front desk running smoothly. Friendly, organised and computer-literate.",
    "রোগীদের অভ্যর্থনা, অ্যাপয়েন্টমেন্ট ও কল ব্যবস্থাপনা এবং ফ্রন্ট ডেস্ক সামলানো। বন্ধুসুলভ, গোছানো ও কম্পিউটার জানা।"],
  ["Dental Hygienist","ডেন্টাল হাইজিনিস্ট","Part-time","পার্ট-টাইম","West Kazipara, Dhaka","পশ্চিম কাজীপাড়া, ঢাকা",
    "Perform scaling, polishing and oral-hygiene education for patients. Experience in a dental clinic preferred.",
    "রোগীদের জন্য স্কেলিং, পলিশিং ও মুখের স্বাস্থ্যবিধি শিক্ষা। ডেন্টাল ক্লিনিকে অভিজ্ঞতা অগ্রাধিকারযোগ্য।"],
];

const PERKS = [
  ['<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
    "Modern, safe clinic","আধুনিক, নিরাপদ ক্লিনিক","Work with up-to-date equipment and 100% sterile, hygienic protocols.","আধুনিক যন্ত্রপাতি ও ১০০% জীবাণুমুক্ত, স্বাস্থ্যসম্মত পরিবেশে কাজ।"],
  ['<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/><path d="M21 21v-2a4 4 0 0 0-3-3.9"/>',
    "Supportive team","সহযোগী টিম","Join a friendly, patient-first team that helps each other grow.","রোগী-কেন্দ্রিক, বন্ধুসুলভ টিম যেখানে সবাই একে অপরকে এগিয়ে নেয়।"],
  ['<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/>',
    "Growth & training","প্রশিক্ষণ ও উন্নতি","Learn new procedures and build your career with ongoing training.","নিয়মিত প্রশিক্ষণে নতুন পদ্ধতি শিখুন ও ক্যারিয়ার গড়ুন।"],
  ['<path d="M12 22s8-5.5 8-12a8 8 0 1 0-16 0c0 6.5 8 12 8 12z"/><circle cx="12" cy="10" r="3"/>',
    "Central location","কেন্দ্রীয় অবস্থান","Conveniently located in West Kazipara, Begum Rokeya Sarani, Dhaka.","পশ্চিম কাজীপাড়া, বেগম রোকেয়া সরণি, ঢাকায় সুবিধাজনক অবস্থান।"],
];

const perks = PERKS.map(([icon,te,tb,de,db])=>`
      <article class="perk-card">
        <div class="perk-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon}</svg></div>
        <h3 ${bl(te,tb)}></h3>
        <p ${bl(de,db)}></p>
      </article>`).join("");

const jobs = JOBS.map(([te,tb,tye,tyb,le,lb,de,db])=>{
  const href = wa(`Hello Example Dental, I'd like to apply for the ${te} position. Here are my details:`);
  return `
      <article class="svc-card">
        <div class="svc-body" style="padding:26px 24px">
          <span class="job-type" ${bl(tye,tyb)}></span>
          <h3 style="margin-bottom:4px" ${bl(te,tb)}></h3>
          <div class="job-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-5.5 8-12a8 8 0 1 0-16 0c0 6.5 8 12 8 12z"/><circle cx="12" cy="10" r="3"/></svg><span ${bl(le,lb)}></span></div>
          <p style="flex:1" ${bl(de,db)}></p>
          <a class="btn btn-primary job-apply" href="${href}" target="_blank" rel="noopener"><svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:18px;height:18px"><path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z"/></svg> <span ${bl("Apply on WhatsApp","হোয়াটসঅ্যাপে আবেদন")}></span></a>
        </div>
      </article>`;
}).join("");

const generalHref = wa("Hello Example Dental, I'd like to apply for a job. Here are my details:");

const html = `<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Careers — Join Our Team | Example Dental, Dhaka</title>
<meta name="description" content="Careers at Example Dental, Dhaka. Explore dental job openings — dentists, dental assistants, receptionists and hygienists. Apply on WhatsApp.">
<link rel="canonical" href="${SITE}/careers.html">
<meta property="og:title" content="Careers — Join Our Team | Example Dental">
<meta property="og:image" content="${SITE}/assets/logo.svg">
<meta name="theme-color" content="#57C3AD">
<link rel="icon" type="image/png" href="assets/mark.svg?v=2">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<link rel="stylesheet" href="assets/styles.css?v=${VER}">
</head>
<body>
<div id="scrollbar"></div>
<header class="header"><nav class="nav container">
  <a class="brand" href="index.html"><span class="logo-anim"><img src="assets/mark.svg?v=2" alt="Example Dental"></span><span>CONTACT<small>DENTAL</small></span></a>
  <div class="navlist" id="navlist">
    <a href="index.html#why" ${bl("About Us","আমাদের সম্পর্কে")}></a>
    <a href="treatments.html" ${bl("Our Services","আমাদের সেবা")}></a>
    <a href="index.html#contact" ${bl("Contact","যোগাযোগ")}></a>
    <a href="index.html#pricing" ${bl("Price List","মূল্য তালিকা")}></a>
    <a href="blog/index.html" ${bl("Blog","ব্লগ")}></a>
    <a href="careers.html" ${bl("Careers","ক্যারিয়ার")}></a>
    <div class="nav-actions">
      <a class="btn btn-primary" href="book.html" ${bl("Book Appointment","অ্যাপয়েন্টমেন্ট নিন")}></a>
    </div>
  </div>
  <button class="lang-toggle nav-lang" id="langToggle"><span id="langText">বাংলা</span></button>
  <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav></header>

<section class="hero"><span class="blob b1"></span><span class="blob b2"></span>
  <div class="container" style="position:relative;z-index:1;padding:56px 0 40px;text-align:center;max-width:780px">
    <span class="eyebrow" ${bl("Careers","ক্যারিয়ার")}></span>
    <h1 ${bl("Join the Example Dental Team","উদাহরণ ডেন্টাল টিমে যোগ দিন")}></h1>
    <p ${bl("Build your career with a modern, caring dental clinic in Dhaka. We're always looking for dedicated people who put patients first.","ঢাকার একটি আধুনিক, যত্নশীল ডেন্টাল ক্লিনিকে আপনার ক্যারিয়ার গড়ুন। আমরা সবসময় রোগী-কেন্দ্রিক নিবেদিত মানুষ খুঁজছি।")} style="color:var(--muted);margin-top:12px"></p>
  </div>
</section>

<section class="section soft"><div class="container">
  <div class="sec-head">
    <span class="eyebrow" ${bl("Why Example","কেন আয়েশা")}></span>
    <h2 ${bl("Why work with us","কেন আমাদের সাথে কাজ করবেন")}></h2>
  </div>
  <div class="perk-grid">${perks}</div>
</div></section>

<section class="section"><div class="container">
  <div class="sec-head">
    <span class="eyebrow" ${bl("Open Positions","খালি পদ")}></span>
    <h2 ${bl("Current job openings","বর্তমান নিয়োগ")}></h2>
    <p ${bl("Tap Apply to send us a message on WhatsApp with the role — attach your CV in the chat.","আবেদন করতে পদের নামসহ হোয়াটসঅ্যাপে মেসেজ দিন — চ্যাটে আপনার সিভি সংযুক্ত করুন।")} style="color:var(--muted)"></p>
  </div>
  <div class="svc-grid">${jobs}</div>
</div></section>

<section class="section soft2"><div class="container" style="text-align:center;max-width:680px">
  <h2 ${bl("Don't see your role?","আপনার পদ খুঁজে পাচ্ছেন না?")}></h2>
  <p ${bl("We're always happy to hear from talented people. Send us your details and CV on WhatsApp and we'll be in touch.","আমরা সবসময় প্রতিভাবানদের কাছ থেকে শুনতে আগ্রহী। হোয়াটসঅ্যাপে আপনার তথ্য ও সিভি পাঠান, আমরা যোগাযোগ করব।")} style="color:var(--muted);margin:12px 0 22px"></p>
  <a class="btn btn-wa" href="${generalHref}" target="_blank" rel="noopener"><svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-6A8.4 8.4 0 1 1 21 11.5z"/></svg> <span ${bl("Send your CV on WhatsApp","হোয়াটসঅ্যাপে সিভি পাঠান")}></span></a>
</div></section>

<footer class="footer"><div class="container" style="text-align:center">
  <div class="foot-logo" style="justify-content:center"><span class="logo-anim"><img src="assets/mark.svg?v=2" alt="Example Dental" style="height:50px"></span><span style="font-family:var(--f-head);font-weight:800;color:#fff;font-size:1.25rem">CONTACT<small style="display:block;font-size:.62rem;letter-spacing:.34em;color:var(--orange)">DENTAL</small></span></div>
  <p style="color:#a9c2cd;margin:14px 0">1252/3, East Monipur, West Kazipara, Begum Rokeya Soroni, Dhaka · 01XXXXXXXXX</p>
  <a class="btn btn-primary" href="index.html" ${bl("← Back to home","← হোমে ফিরুন")}></a>
  <div class="foot-bottom">© <span id="yr"></span> CONTACT DENTAL</div>
</div></footer>
<a class="fab" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
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
</script>
</body></html>`;

fs.writeFileSync(path.join(__dirname,"..","careers.html"), html);
console.log("Generated careers.html with",JOBS.length,"job openings");
