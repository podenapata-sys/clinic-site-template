/* ============================================================================
   clinic-compat — bridges the old `OMEGA` contact object to `window.CLINIC`.
   ============================================================================

   The site this template grew out of read its contact details from a const
   declared at the top of assets/app.js:

       const OMEGA = { phone: "...", whatsapp: "...", ... };

   That const is what kept a clinic's phone number in TWO places once the config
   file existed, and a booking button pointing at the previous clinic's WhatsApp
   is the single most expensive bug this template can ship — the site looks
   perfect and every enquiry goes to a stranger.

   So app.js no longer declares it. Delete these lines from assets/app.js:

       const OMEGA = {
         ... every line of the object literal ...
       };

   and load this file immediately AFTER clinic.config.js and BEFORE app.js:

       <script src="assets/clinic.config.js"></script>
       <script src="assets/clinic-compat.js"></script>
       <script src="assets/app.js"></script>

   Everything downstream keeps working unchanged: the ~40 references to OMEGA.*
   scattered through app.js resolve to this object, which is built from config.

   Keeping the old NAME on purpose. Renaming it to CLINIC.* across app.js is a
   40-site edit with no behavioural gain, and each one is a chance to typo a
   property that fails silently at runtime (undefined in a wa.me URL produces a
   link that opens WhatsApp to nobody, with no error anywhere).
   ========================================================================== */

(function () {
  const c = window.CLINIC;

  if (!c) {
    /* Loud on purpose. A missing config means every contact link on the page is
       about to be undefined, and that must not be discovered by a patient. */
    console.error(
      "[clinic-compat] window.CLINIC is missing. Load assets/clinic.config.js " +
      "BEFORE this file, or every phone, WhatsApp and map link will be broken."
    );
    window.OMEGA = {};
    return;
  }

  const contact = c.contact || {};
  const maps    = c.maps || {};

  window.OMEGA = {
    phone:     contact.phone     || "",
    phoneIntl: contact.phoneIntl || "",
    whatsapp:  contact.whatsapp  || "",
    email:     contact.email     || "",
    facebook:  contact.facebook  || "",
    instagram: contact.instagram || "",
    maps:      maps.view   || "",
    mapDir:    maps.direct || "",
    mapEmbed:  maps.embed  || "",
    /* Newer fields, available to anything written against the template. */
    name:      c.name || "",
    address:   c.address?.display || { en: "", bn: "" },
    hours:     c.hours || [],
  };

  /* A placeholder number is not a crash, so nothing would otherwise surface it
     — but it is the same failed outcome as a missing one: nobody can book. */
  if (/X/i.test(window.OMEGA.whatsapp) || !window.OMEGA.whatsapp) {
    console.warn(
      "[clinic-compat] contact.whatsapp is unset or still a placeholder — " +
      "every Book / WhatsApp button on this page is dead. Fix it in " +
      "assets/clinic.config.js, then run: npm run apply"
    );
  }
})();
