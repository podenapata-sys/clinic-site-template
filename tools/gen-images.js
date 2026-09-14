/* Generates a branded SVG illustration per treatment into /assets/services.
   Run: node tools/gen-images.js */
const fs = require("fs");
const path = require("path");

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

// [name, gradA, gradB, iconKey, motif key]
const ITEMS = [
  ["Scaling & Polishing","#5bd0b8","#2b9e8a","sparkles","sparkle"],
  ["Tooth Fillings","#6fb1ee","#2b6cb0","droplet","fill"],
  ["Root Canal (RCT)","#57c3ad","#2b8fb0","shield","root"],
  ["Crowns & Bridges","#f6b45a","#ef7b1e","crown","crown"],
  ["Teeth Whitening","#7fd7c6","#3aa0d6","sparkles","sparkle"],
  ["Veneers","#9aa7f5","#5566e0","gem","sparkle"],
  ["Dentures","#67c1e8","#2b6cb0","smile","arch"],
  ["Braces & Aligners","#5bd0b8","#2b6cb0","braces","braces"],
  ["Dental Implants","#7bb8f0","#3a5fb0","implant","implant"],
  ["Extractions & Surgery","#f59a8c","#e0594a","plus","plus"],
  ["Kids Dentistry","#ffd17a","#f6a93b","smile","smile"],
  ["Cosmetic Dentistry","#f59ec9","#d65a9c","heart","sparkle"],
];

// badge glyphs (Lucide-style, 24x24, stroke)
const GLYPH = {
  sparkles:'<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z"/>',
  droplet:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  shield:'<path d="M12 3l7 3v5c0 4.4-3 7-7 8.5C8 17 5 14.4 5 10V6z"/><path d="M9 11l2 2 4-4"/>',
  crown:'<path d="M3 8l4 4 5-7 5 7 4-4v9H3z"/>',
  gem:'<path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4l-3 5 6 11 6-11-3-5"/>',
  smile:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4 4 0 0 0 7 0"/><path d="M9 9h.01M15 9h.01"/>',
  braces:'<path d="M5 12h14"/><rect x="7.5" y="9" width="3.5" height="6" rx="1"/><rect x="13" y="9" width="3.5" height="6" rx="1"/>',
  implant:'<path d="M10 3h4l-1 6h-2z"/><path d="M9 9h6l-3 11z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  heart:'<path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 22l8.8-8.3a5 5 0 0 0 0-7.1z"/>',
};

const tooth = (cx,cy,sc,fill)=>`<path transform="translate(${cx-40*sc} ${cy-46*sc}) scale(${sc})" fill="${fill}" d="M40 2C22 2 9 16 9 35c0 14 5 38 13 49 4 5 9 4 10-3 1-9 1-19 8-19s7 10 8 19c1 7 6 8 10 3 8-11 13-35 13-49C71 16 58 2 40 2Z"/>`;

function motif(key){
  switch(key){
    case "sparkle": return `<g fill="#fff" opacity=".95"><path d="M300 70l5 13 13 5-13 5-5 13-5-13-13-5 13-5z"/><path d="M330 120l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/></g>`;
    case "crown": return `<path d="M278 86l10 16 14-20 14 20 10-16v34h-48z" fill="#fff" opacity=".95"/>`;
    case "braces": return `<g stroke="#fff" stroke-width="5" opacity=".9"><line x1="270" y1="110" x2="330" y2="110"/><rect x="282" y="100" width="14" height="20" rx="3" fill="#fff"/><rect x="306" y="100" width="14" height="20" rx="3" fill="#fff"/></g>`;
    case "implant": return `<g fill="#fff" opacity=".95"><rect x="296" y="74" width="12" height="40" rx="3"/><path d="M290 116h24l-6 26h-12z"/></g>`;
    case "plus": return `<g fill="#fff" opacity=".95"><rect x="296" y="80" width="12" height="44" rx="6"/><rect x="280" y="96" width="44" height="12" rx="6"/></g>`;
    case "root": return `<g fill="#fff" opacity=".9"><circle cx="302" cy="92" r="18"/><path d="M302 108c-4 10-10 14-10 22m20-22c4 10 10 14 10 22" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
    case "smile": return `<g opacity=".95"><circle cx="302" cy="96" r="22" fill="#fff"/><circle cx="295" cy="92" r="3" fill="#2b6cb0"/><circle cx="309" cy="92" r="3" fill="#2b6cb0"/><path d="M292 100c5 7 15 7 20 0" stroke="#2b6cb0" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
    case "arch": return `<path d="M276 86c8 26 44 26 52 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>`;
    case "fill": default: return `<circle cx="302" cy="96" r="14" fill="#fff" opacity=".95"/>`;
  }
}

function svg([name,a,b,icon,key]){
  const nm = name.replace(/&/g,"&amp;");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" role="img" aria-label="${nm}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <filter id="s" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0a2540" flood-opacity="0.18"/></filter>
  </defs>
  <style>
    .tooth{animation:floatY 4.2s ease-in-out infinite}
    .b1{transform-box:fill-box;transform-origin:center;animation:drift 9s ease-in-out infinite}
    .b2{transform-box:fill-box;transform-origin:center;animation:drift 11s ease-in-out infinite .6s}
    .b3{animation:floatY 7s ease-in-out infinite .3s}
    .motif{transform-box:fill-box;transform-origin:center;animation:twinkle 3.2s ease-in-out infinite}
    .badge{transform-box:fill-box;transform-origin:center;animation:pop 3.6s ease-in-out infinite}
    @keyframes floatY{50%{transform:translateY(-6px)}}
    @keyframes drift{50%{transform:translate(5px,-5px) scale(1.05)}}
    @keyframes twinkle{0%,100%{opacity:.6;transform:scale(.92)}50%{opacity:1;transform:scale(1.1)}}
    @keyframes pop{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
    @media (prefers-reduced-motion:reduce){.tooth,.b1,.b2,.b3,.motif,.badge{animation:none}}
  </style>
  <rect width="400" height="260" fill="url(#g)"/>
  <circle class="b1" cx="60" cy="40" r="70" fill="#fff" opacity=".10"/>
  <circle class="b2" cx="350" cy="220" r="90" fill="#fff" opacity=".08"/>
  <circle class="b3" cx="150" cy="135" r="78" fill="#fff" opacity=".22"/>
  <g class="tooth"><g filter="url(#s)">${tooth(150,135,1.15,"#ffffff")}</g>${tooth(150,135,1.0,"url(#g)")}</g>
  <g class="motif">${motif(key)}</g>
  <g class="badge"><circle cx="332" cy="60" r="26" fill="#fff" opacity=".95"/><g transform="translate(320,48)" fill="none" stroke="#2b6cb0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${GLYPH[icon]||GLYPH.sparkles}</g></g>
</svg>`;
}

const dir = path.join(__dirname,"..","assets","services");
fs.mkdirSync(dir,{recursive:true});
ITEMS.forEach(it=>fs.writeFileSync(path.join(dir, slug(it[0])+".svg"), svg(it)));
console.log("Generated",ITEMS.length,"treatment illustrations into assets/services/");
