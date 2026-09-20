#!/usr/bin/env node
/* ============================================================================
   check-rules — does the client's booking write satisfy firestore.rules?
   ============================================================================

     node tools/check-rules.mjs

   WHY THIS EXISTS
   A Firestore rule rejection is invisible from the website. `clinicSaveBooking`
   in assets/booking-cloud.js wraps addDoc in `catch (e) {}` on purpose — the
   enquiry has already gone out over WhatsApp by then and an error dialog would
   only alarm the visitor — so a write the rules refuse produces no message on
   screen, nothing in the console, and no row in the dashboard. The clinic just
   stops receiving website bookings and has no way to discover why.

   Two mistakes cause it, and both look completely fine in review:

     1. The client writes a field `hasOnly([...])` does not list.
     2. The rule TYPE-CHECKS a field the client does not always write.
        `hasOnly` permits a subset, but `d.x is string` requires x to exist —
        so adding an optional field to the rule makes every write that omits it
        fail, including the homepage callback form.

   This compares the two lists directly. It is static: it proves the shapes
   agree, not that the published rules match this file. Publishing is manual
   (Firebase Console -> Firestore -> Rules), so ALSO submit a real booking and
   a homepage callback after any change here.
   ========================================================================== */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const rules = readFileSync(join(ROOT, "firestore.rules"), "utf8");
const cloud = readFileSync(join(ROOT, "assets/booking-cloud.js"), "utf8");

const m = rules.match(/hasOnly\(\[([\s\S]*?)\]\)/);
if (!m) { console.error("\n  Could not find hasOnly([...]) in firestore.rules\n"); process.exit(1); }
const allowed = new Set([...m[1].matchAll(/'([A-Za-z]+)'/g)].map(x => x[1]));

/* Fields the rule asserts a type or value for. These must be PRESENT. */
const checked = new Set();
for (const re of [/d\.([A-Za-z]+)\s+is\s+/g, /d\['([A-Za-z]+)'\]\s+is\s+/g,
                  /d\.([A-Za-z]+)\s*==/g,    /d\.([A-Za-z]+)\s+in\s+/g]) {
  for (const x of rules.matchAll(re)) checked.add(x[1]);
}
checked.delete("keys");

const start = cloud.indexOf('addDoc(collection(db, "bookings")');
if (start < 0) { console.error("\n  Could not find the addDoc call in booking-cloud.js\n"); process.exit(1); }
let body = cloud.slice(start, cloud.indexOf("});", start));
body = body.replace(/\/\*[\s\S]*?\*\//g, "");                 // comments carry key-like words
const written = new Set([...body.matchAll(/(?:^|[{,]\s*)\s*([A-Za-z]+)\s*:/gm)].map(x => x[1]));
written.delete("collection");

const extra   = [...written].filter(k => !allowed.has(k)).sort();
const missing = [...checked].filter(k => !written.has(k)).sort();

console.log(`\n  rule allows   (${allowed.size}): ${[...allowed].sort().join(", ")}`);
console.log(`  client writes (${written.size}): ${[...written].sort().join(", ")}\n`);
if (extra.length)   console.log(`  x  written but NOT in hasOnly — every write is rejected: ${extra.join(", ")}`);
if (missing.length) console.log(`  x  type-checked but not always written — writes omitting them are rejected: ${missing.join(", ")}`);

if (!extra.length && !missing.length) {
  console.log("  OK — the client write satisfies the rule.");
  console.log("  Static check only: publish the rules, then submit a real booking AND a");
  console.log("  homepage callback before trusting it.\n");
  process.exit(0);
}
console.log("\n  These writes fail SILENTLY. Fix before deploying.\n");
process.exit(1);
