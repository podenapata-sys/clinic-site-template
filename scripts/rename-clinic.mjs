#!/usr/bin/env node
/* ============================================================================
   rename-clinic — swap the previous clinic's name out of markup and content.
   ============================================================================

   Run ONCE, right after forking the template for a new client:

     npm run rename -- --from "Bright Smile"
     npm run rename -- --from "Bright Smile" --dry-run     # look first

   The new name is read from assets/clinic.config.js, so there is one source of
   truth and no chance of the two disagreeing.

   WHY THIS IS SEPARATE FROM `apply`
   `apply` runs on every deploy and must never touch body copy — a clinic that
   rewrote its own homepage would have the edit reverted on the next deploy.
   This runs exactly once, at fork time, and does touch body copy. Keeping them
   apart is what makes `apply` safe to run in a pre-deploy hook.

   WHAT IT DELIBERATELY WILL NOT DO
   Email addresses are left alone. Turning "info@brightsmile.com" into
   "smilecare@gmail.com" invents an inbox that does not exist and that nobody
   monitors — bookings would vanish into it. Emails come from config.contact
   via `apply`; this reports any it finds so you can confirm they were handled.
   ========================================================================== */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/* The practitioner block. `doctor` is the name this key had while the template
   was clinic-only; a delivered client site still carries it, so both are read
   and neither has to be migrated in a hurry. */
const PRAC = (c) => (c && (c.practitioner || c.doctor)) || null;

const ARGV = process.argv.slice(2);
const DRY  = ARGV.includes("--dry-run");

const arg = name => {
  const i = ARGV.indexOf(name);
  return i > -1 ? ARGV[i + 1] : null;
};
const fromArg      = arg("--from");
/* The previous clinic's email, given explicitly. It cannot be inferred: a page
   may legitimately carry more than one address (careers@, a lab, a referring
   surgeon), and rewriting the wrong one points a real enquiry at the wrong
   inbox. `npm run apply` reports every address it finds so you know what to
   pass here. */
const fromEmailArg = arg("--from-email");
/* The previous practitioner, given explicitly for the same reason as the email.
   A clinic site names its dentist in the hero, the JSON-LD `employee` node, the
   about section and every blog byline — around a hundred places — and leaving
   one behind credits a real person who does not work there. */
const fromDoctorArg = arg("--from-doctor");
/* Bangla forms. A bilingual site carries the clinic and practitioner names in
   both scripts, and the Latin variants below cannot match Bengali text at all —
   without these the whole data-bn side of the site keeps the previous clinic's
   name, which is exactly the half a Bangladeshi patient reads.

   Bengali inflects by suffix (হক -> হকের, "Haque's"), and those suffixes attach
   to whatever noun precedes them. So replacing the base name leaves the suffix
   in place and still reads correctly. */
const fromBnArg       = arg("--from-bn");
const fromDoctorBnArg = arg("--from-doctor-bn");

if (!fromArg) {
  console.error(`
  Usage:  npm run rename -- --from "Previous Clinic Name"
                            [--from-bn        "পূর্বের নাম"]
                            [--from-email     old@clinic.com]
                            [--from-doctor    "Dr. Previous Name"]
                            [--from-doctor-bn "ডা. পূর্বের নাম"]

  The name to replace must be given explicitly. Guessing it from the files
  would eventually guess wrong and rewrite a word that was never a clinic
  name -- in body copy, where nobody would notice until a patient did.
`);
  process.exit(1);
}

/* Text we own. Binary assets and the lockfile are never rewritten. */
const EXTS      = new Set([".html", ".js", ".mjs", ".css", ".gs", ".md", ".json", ".xml", ".txt"]);
/* "scripts" is skipped for the same reason apply-config skips it: these files
   are tooling, not clinic content. Scanning them also made this script trip
   over its own HOLD constant. */
const SKIP_DIRS = new Set(["node_modules", ".git", ".github", "scripts"]);
const SKIP_FILE = new Set(["clinic.config.js", "package-lock.json"]);

/* Stands in for an email while the name swap runs. Printable and improbable;
   asserted absent below rather than assumed, because a collision would restore
   the wrong address into a booking form. */
const HOLD = "xEMAILHOLDx";

function loadConfig() {
  const p = join(ROOT, "assets", "clinic.config.js");
  if (!existsSync(p)) { console.error("  assets/clinic.config.js is missing."); process.exit(1); }
  const w = {}; new Function("window", readFileSync(p, "utf8"))(w);
  return w.CLINIC;
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (e.startsWith(".") || SKIP_DIRS.has(e) || SKIP_FILE.has(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.has(e.slice(e.lastIndexOf(".")))) out.push(p);
  }
  return out;
}

const c    = loadConfig();
const to   = c.name;
const from = fromArg;

/* Renaming a real clinic INTO the placeholder is the one legitimate case for
   the opposite of what this guard protects: neutralising a delivered client
   site back into the shared template. It has to be asked for by name, because
   the accident it otherwise prevents — a client site shipping as "Example
   Dental" — is the more likely one by far. */
const toPlaceholder = ARGV.includes("--to-placeholder");

if (!to) {
  console.error(`\n  assets/clinic.config.js has no clinic name.\n`);
  process.exit(1);
}
if (/^Example /.test(to) && !toPlaceholder) {
  console.error(`\n  Set a real clinic name in assets/clinic.config.js first (found "${to}").`);
  console.error(`  Building the neutral template on purpose? Add --to-placeholder.\n`);
  process.exit(1);
}

/* The forms a clinic name actually appears in. Ordered longest-first so
   "Bright Smile" is consumed before a bare "Bright" can match inside it. */
const words     = from.trim().split(/\s+/);
const compact   = from.replace(/\s+/g, "").toLowerCase();       // brightsmiledental
const toWords   = to.trim().split(/\s+/);
const toCompact = to.replace(/\s+/g, "").toLowerCase();

/* WhatsApp prefill links carry the clinic name inside a ?text= query string,
   where it is percent-encoded ("Hello%20Example%20Dental"). A literal search
   cannot see it, so those links kept greeting the previous clinic by name on
   every fork — on the Apply and Gallery buttons, which are exactly the ones a
   candidate or patient presses. */
const enc = v => encodeURIComponent(v);

/* [old, new, singleWord] — singleWord variants are the ones that can collide
   with a code identifier, and are held to the stricter rule below. */
const variants = [
  [from,                  to,                       false],     // Bright Smile
  [from.toUpperCase(),    to.toUpperCase(),         false],     // OMEGA DENTAL
  [from.toLowerCase(),    to.toLowerCase(),         false],     // bright smile
  [compact,               toCompact,                true],      // brightsmiledental
  [compact.toUpperCase(), toCompact.toUpperCase(),  true],
  [enc(from),             enc(to),                  false],     // Bright%20Smile
];
/* A single distinctive first word ("OMEGA<small>DENTAL</small>" in the nav
   brand) only when it is not a word that means something else on a clinic
   site. Two letters or fewer, or a common noun, is left alone. */
const GENERIC = new Set(["the","city","care","dental","clinic","medical","health","smile","family"]);
if (words.length > 1 && words[0].length > 2 && !GENERIC.has(words[0].toLowerCase())) {
  variants.push([words[0].toUpperCase(), (toWords[0] || to).toUpperCase(), true]);
  variants.push([words[0],               (toWords[0] || to),               true]);
  /* Lowercase last, so the compact form ("brightsmile") is already consumed and
     this only catches internal identifiers — the `cmp-brightsmile` CSS class, the
     `brightsmile_lang` localStorage key. Both sides stay in step because .css is in
     EXTS: renaming the class in the markup without the stylesheet would
     silently drop the styling on a live price-comparison table. */
  variants.push([words[0].toLowerCase(), (toWords[0] || to).toLowerCase(), true]);
}

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

const files = walk(ROOT);
let totalHits = 0, touched = 0;
const emails  = new Map();
const perFile = [];

for (const f of files) {
  const original = readFileSync(f, "utf8");
  const rel = relative(ROOT, f).split(sep).join("/");

  if (original.includes(HOLD)) {
    console.error(`\n  ${rel} already contains the placeholder "${HOLD}".`);
    console.error(`  Rename it there first — proceeding could restore an email into the wrong slot.\n`);
    process.exit(1);
  }

  let text = original, hits = 0;

  /* Bangla first: these are unambiguous full-name strings in a script none of
     the Latin variants can touch, so order relative to them does not matter —
     but doing them before the protection step keeps all name work together. */
  for (const [a, b] of [[fromBnArg, c.nameBn], [fromDoctorBnArg, PRAC(c)?.nameBn],
                        [fromBnArg && encodeURIComponent(fromBnArg), c.nameBn && encodeURIComponent(c.nameBn)],
                        [fromDoctorBnArg && encodeURIComponent(fromDoctorBnArg),
                         PRAC(c)?.nameBn && encodeURIComponent(PRAC(c).nameBn)]]) {
    if (!a || !b) continue;
    /* Full string first, then each distinctive component — the same shape the
       Latin pass needs, and for the same reason: copy addresses the clinic and
       the dentist by a shortened name as often as by the full one
       (a given name without the surname, the first word without "ডেন্টাল"), and
       matching only the full string leaves those crediting a real person. */
    /* Honorifics differ between the old and new name — "ডা." is stripped but
       "মোঃ" is not — so the two component lists can come out different lengths.
       Zipping them by index then maps a surname onto a given name and produces
       a doubled name like "মোঃ উদাহরণ উদাহরণ". Map by ROLE instead: full
       string, then given name to given name, then surname to surname. */
    const bnStrip = n => n.replace(/^(ডা\.?|ডাঃ|মোঃ|মোহাম্মদ|প্রফ\.?)\s*/u, "").trim().split(/\s+/);
    const oldP = bnStrip(a), newP = bnStrip(b);
    /* Carry the honorific with the given name. Replacing the name alone leaves
       the OLD title attached — "ডা. আয়েশা" becoming "ডা. কামাল" calls a land
       surveyor "Doctor", which is a false credential, not a cosmetic slip. */
    const hon = n => (n.match(/^(ডা\.?|ডাঃ|মোঃ|মোহাম্মদ|প্রফ\.?)/u) || [""])[0];
    const oldH = hon(a), newH = hon(b);
    const pairs = [
      [a, b],
      (oldH && oldP[0]) ? [`${oldH} ${oldP[0]}`, newH ? `${newH} ${newP[0]}` : newP[0]] : [null, null],
      [oldP[0], newP[0]],
      [oldP.at(-1), newP.at(-1)],
    ];
    const bnClinicWords = new Set(fromBnArg ? bnStrip(fromBnArg) : []);
    const isDoctorPass = a === fromDoctorBnArg ||
                         (fromDoctorBnArg && a === encodeURIComponent(fromDoctorBnArg));
    const done = new Set();
    for (let i = 0; i < pairs.length; i++) {
      const [oldB, newB] = pairs[i];
      if (!oldB || !newB || oldB === newB || done.has(oldB)) continue;
      if ([...oldB].length < 2) continue;
      /* a word the clinic name also owns is not the practitioner's to rename */
      if (isDoctorPass && i > 0 && bnClinicWords.has(oldB)) continue;
      done.add(oldB);
      const parts = text.split(oldB);
      if (parts.length > 1) { hits += parts.length - 1; text = parts.join(newB); }
    }
  }

  /* Named people first: their name may contain a word that a later variant
     would otherwise catch mid-replacement. */
  if (fromDoctorArg && PRAC(c)?.name) {
    for (const [a, b] of [[fromDoctorArg, PRAC(c).name],
                          [enc(fromDoctorArg), enc(PRAC(c).name)]]) {
      const parts = text.split(a);
      if (parts.length > 1) { hits += parts.length - 1; text = parts.join(b); }
    }
    /* Bare surname, as bylines and alt text often use it alone. */
    const strip = n => n.replace(/^(Dr\.?|Prof\.?)\s+/i, "").split(/\s+/);
    const oldParts = strip(fromDoctorArg), newParts = strip(PRAC(c).name);
    /* Surname AND first name: clinic copy addresses the dentist both ways
       ("ask Dr. Ayesha", "Dr. Ayesha Rahman, BDS"), and catching only the full
       string leaves the familiar form crediting a real person by name. */
    /* A word the clinic name also uses is NOT safe to treat as the doctor's:
       replacing it rewrites the clinic name with the practitioner's, which
       reads as a real clinic that does not exist ("Nusrat Dental"). The clinic
       pass below owns those words. */
    const clinicWords = new Set(words.map(w => w.toLowerCase()));
    for (const [oldN, newN] of [[oldParts.at(-1), newParts.at(-1)],
                                [oldParts[0],     newParts[0]]]) {
      if (!oldN || !newN || oldN.length <= 3 || oldN === newN) continue;
      if (clinicWords.has(oldN.toLowerCase())) continue;
      const bare = text.split(oldN);
      if (bare.length > 1) { hits += bare.length - 1; text = bare.join(newN); }
    }
  }

  /* The one address we were told to replace goes first, before the protection
     below hides every address from the name swap. */
  if (fromEmailArg && c.contact?.email) {
    const parts = text.split(fromEmailArg);
    if (parts.length > 1) { hits += parts.length - 1; text = parts.join(c.contact.email); }
  }

  /* Protect every remaining email address, then restore them afterwards, so a
     compact name inside a local-part can never be rewritten. */
  const held = [];
  text = text.replace(EMAIL_RE, m => {
    held.push(m);
    if (m !== c.contact?.email && new RegExp(compact, "i").test(m)) {
      if (!emails.has(m)) emails.set(m, new Set());
      emails.get(m).add(rel);
    }
    return `${HOLD}${held.length - 1}${HOLD}`;
  });

  for (const [a, b, singleWord] of variants) {
    if (a === b || !a) continue;

    if (!singleWord) {
      /* The full clinic name. Unambiguous prose — replace it wherever it is. */
      const parts = text.split(a);
      if (parts.length > 1) { hits += parts.length - 1; text = parts.join(b); }
      continue;
    }

    /* A single word out of the clinic's name ("Bright") is also, very often, a
       code identifier: window.BRIGHT, BRIGHT_CONTENT, brightSaveBooking,
       brightsmile_lang, .cmp-brightsmile. Renaming those does not break the site — the
       swap is consistent across files — but it bakes the client's name into
       the code, so the NEXT fork mangles it again into something else.
       So: never inside a longer identifier, and never after a dot. */
    const re = new RegExp(
      `(?<![A-Za-z0-9_.$-])${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z0-9_-])`, "g");
    const before = text;
    text = text.replace(re, b);
    if (text !== before) hits += before.split(a).length - text.split(a).length + 1;
  }

  text = text.replace(new RegExp(`${HOLD}(\\d+)${HOLD}`, "g"), (_, i) => held[Number(i)]);

  if (text !== original) {
    touched++; totalHits += hits;
    perFile.push([rel, hits]);
    if (!DRY) writeFileSync(f, text);
  }
}

console.log(`\n  ${DRY ? "DRY RUN — nothing written" : "Renamed"}: "${from}" -> "${to}"`);
console.log(`  ${totalHits} replacement(s) across ${touched} of ${files.length} file(s).\n`);

perFile.sort((a, b) => b[1] - a[1]).slice(0, 15)
  .forEach(([f, n]) => console.log(`    ${String(n).padStart(4)}  ${f}`));
if (perFile.length > 15) console.log(`    ...  and ${perFile.length - 15} more file(s)`);

if (emails.size) {
  console.log(`\n  Left these email addresses untouched — point them at the new clinic by hand:`);
  for (const [addr, where] of emails) {
    console.log(`    ${addr}`);
    [...where].slice(0, 3).forEach(w => console.log(`        ${w}`));
  }
  console.log(`\n    Rewrite one of them here:  npm run rename -- --from "${from}" --from-email <address>`);
  console.log(`    Also check tools/booking-alert.gs -> TO_EMAIL, which is not web content.`);
}

console.log(`\n  Next:  npm run apply    (writes the config into every page)\n`);
