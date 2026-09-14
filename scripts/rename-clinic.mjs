#!/usr/bin/env node
/* ============================================================================
   rename-clinic — swap the previous clinic's name out of markup and content.
   ============================================================================

   Run ONCE, right after forking the template for a new client:

     npm run rename -- --from "Omega Dental"
     npm run rename -- --from "Omega Dental" --dry-run     # look first

   The new name is read from assets/clinic.config.js, so there is one source of
   truth and no chance of the two disagreeing.

   WHY THIS IS SEPARATE FROM `apply`
   `apply` runs on every deploy and must never touch body copy — a clinic that
   rewrote its own homepage would have the edit reverted on the next deploy.
   This runs exactly once, at fork time, and does touch body copy. Keeping them
   apart is what makes `apply` safe to run in a pre-deploy hook.

   WHAT IT DELIBERATELY WILL NOT DO
   Email addresses are left alone. Turning "omegadental@gmail.com" into
   "smilecare@gmail.com" invents an inbox that does not exist and that nobody
   monitors — bookings would vanish into it. Emails come from config.contact
   via `apply`; this reports any it finds so you can confirm they were handled.
   ========================================================================== */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
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

if (!fromArg) {
  console.error(`
  Usage:  npm run rename -- --from "Previous Clinic Name" [--from-email old@clinic.com]

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

if (!to || /^Example /.test(to)) {
  console.error(`\n  Set a real clinic name in assets/clinic.config.js first (found "${to}").\n`);
  process.exit(1);
}

/* The forms a clinic name actually appears in. Ordered longest-first so
   "Omega Dental" is consumed before a bare "Omega" can match inside it. */
const words     = from.trim().split(/\s+/);
const compact   = from.replace(/\s+/g, "").toLowerCase();       // omegadental
const toWords   = to.trim().split(/\s+/);
const toCompact = to.replace(/\s+/g, "").toLowerCase();

const variants = [
  [from,                  to],                                  // Omega Dental
  [from.toUpperCase(),    to.toUpperCase()],                    // OMEGA DENTAL
  [from.toLowerCase(),    to.toLowerCase()],                    // omega dental
  [compact,               toCompact],                           // omegadental
  [compact.toUpperCase(), toCompact.toUpperCase()],
];
/* A single distinctive first word ("OMEGA<small>DENTAL</small>" in the nav
   brand) only when it is not a word that means something else on a clinic
   site. Two letters or fewer, or a common noun, is left alone. */
const GENERIC = new Set(["the","city","care","dental","clinic","medical","health","smile","family"]);
if (words.length > 1 && words[0].length > 2 && !GENERIC.has(words[0].toLowerCase())) {
  variants.push([words[0].toUpperCase(), (toWords[0] || to).toUpperCase()]);
  variants.push([words[0],               (toWords[0] || to)]);
  /* Lowercase last, so the compact form ("omegadental") is already consumed and
     this only catches internal identifiers — the `cmp-omega` CSS class, the
     `omega_lang` localStorage key. Both sides stay in step because .css is in
     EXTS: renaming the class in the markup without the stylesheet would
     silently drop the styling on a live price-comparison table. */
  variants.push([words[0].toLowerCase(), (toWords[0] || to).toLowerCase()]);
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

  for (const [a, b] of variants) {
    if (a === b || !a) continue;
    const parts = text.split(a);
    if (parts.length > 1) { hits += parts.length - 1; text = parts.join(b); }
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
