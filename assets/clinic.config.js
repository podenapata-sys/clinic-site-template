/* ============================================================================
   CLINIC CONFIG — the only file you must edit to launch a new clinic.
   ============================================================================

   Everything client-specific lives here. Nothing below this file's `CLINIC`
   object should be duplicated in HTML, in app.js, or in the service pages —
   `npm run apply` reads this file and writes the values into every page,
   the sitemap, robots.txt and the JSON-LD block.

   WHY THIS FILE EXISTS
   The site this template came from hardcoded its own address into 100+ absolute
   URLs — every canonical tag, every og:image, all 25 sitemap entries. Changing
   the domain meant a find-and-replace across the whole repo and a silent SEO
   reset if you missed one. Here you change `site.baseUrl` once.

   Loaded by a plain <script> BEFORE assets/app.js, so app.js can read it
   synchronously while it renders. Do not convert it to JSON fetched at runtime.
   ========================================================================== */

window.CLINIC = (function () {

  /* ---- Where the site is served from -------------------------------------
     NO TRAILING SLASH. Used to build every canonical URL, og:image, JSON-LD
     url and sitemap entry. Set this before the first deploy.

     GitHub Pages project site : https://USERNAME.github.io/REPO-NAME
     GitHub Pages custom domain: https://clinicname.com
     Netlify / Vercel          : https://clinicname.netlify.app
     -------------------------------------------------------------------- */
  const baseUrl = "https://example.github.io/clinic-site-template";

  /* ---- Map position -------------------------------------------------------
     Get these from Google Maps: right-click the clinic → the first item in the
     menu is "latitude, longitude" → click to copy. Every map link on the site
     is derived from this pair, so there is one place to be wrong instead of
     three. `placeUrl` is optional — set it only if the clinic has a claimed
     Google Business Profile you want "Get directions" to point at by name.  */
  const geo = { lat: 23.8103, lng: 90.4125 };
  const placeUrl = "";

  return {

    /* ===== Identity ===================================================== */
    name:      "Example Dental",          // shown everywhere, incl. <title>
    /* The clinic's name as it is written in Bangla. A bilingual site carries it
       in every data-bn attribute, and a transliteration done by whoever happens
       to be editing drifts within a page. Set it once here. */
    nameBn:    "উদাহরণ ডেন্টাল",
    legalName: "Example Dental Care",     // JSON-LD + legal pages only
    type:      "Dentist",                 // JSON-LD @type. Use "MedicalClinic"
                                          // for a general/medical practice.
    specialty: "Dentistry",

    tagline: {
      en: "Painless, modern and affordable dental care",
      bn: "ব্যথাহীন, আধুনিক ও সাশ্রয়ী দন্তচিকিৎসা",
    },

    /* One sentence. Becomes <meta name="description"> and og:description.
       Keep under ~155 characters or Google truncates it in results. */
    description: {
      en: "Example Dental offers painless, modern and affordable dental care — "
        + "check-ups, fillings, root canal, crowns, braces and whitening.",
      bn: "আমাদের ক্লিনিকে পাবেন ব্যথাহীন, আধুনিক ও সাশ্রয়ী দন্তচিকিৎসা — চেকআপ, ফিলিং, রুট ক্যানেল, ক্রাউন ও ব্রেসেস।",
    },

    keywords: "dentist, dental clinic, painless dentist, teeth whitening, "
            + "dental implants, braces, root canal",

    /* ===== Deployment =================================================== */
    site: {
      baseUrl,
      /* Bumped by `npm run apply` to bust the CDN/browser cache on CSS and JS.
         Never edit by hand. */
      assetVersion: "1",
      /* Which language a first-time visitor sees. The toggle remembers their
         choice in localStorage afterwards. */
      defaultLang: "bn",
      /* The <head> is static — the toggle only rewrites the body — so this is
         the language Google actually indexes. Usually worth keeping "en" even
         on a Bangla-first site: English carries the local-search terms. */
      metaLang: "en",
      languages: ["bn", "en"],
      /* IANA zone — used by the dashboard and the Apps Script reminders so a
         booking taken at 9pm local does not get stamped as tomorrow. */
      timezone: "Asia/Dhaka",
    },

    /* ===== Contact ======================================================
       `whatsapp` is the number in full international form with NO plus and no
       spaces — it goes straight into a wa.me/ link, which rejects anything
       else. Getting this wrong breaks every booking on the site, so it is the
       first thing `npm run check` validates.                              */
    contact: {
      phone:     "01XXXXXXXXX",           // as a local visitor would dial it
      phoneIntl: "+880XXXXXXXXXX",        // tel: links
      whatsapp:  "880XXXXXXXXXX",         // wa.me/ — digits only, no +
      email:     "hello@example.com",
      facebook:  "",
      instagram: "",
    },

    address: {
      street:   "Street address line",
      locality: "Dhaka",
      region:   "",
      postcode: "",
      country:  "BD",                     // ISO 3166-1 alpha-2
      /* Shown on the contact card. Keep the Bangla line if you serve a Bangla
         audience — a transliterated address is harder to read than none. */
      display: {
        en: "Street address line, Dhaka",
        bn: "ঠিকানা, ঢাকা",
      },
    },

    geo,
    placeUrl,

    /* Derived so a moved clinic is one coordinate change, not three URLs. */
    maps: {
      view:   placeUrl || `https://www.google.com/maps?q=${geo.lat},${geo.lng}&z=16`,
      direct: `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`,
      embed:  `https://www.google.com/maps?q=${geo.lat},${geo.lng}&z=16&output=embed`,
    },

    /* ===== Opening hours ================================================
       24-hour "HH:MM". `days` uses schema.org names and is emitted verbatim
       into the JSON-LD openingHoursSpecification, which is what puts the
       "Open now / Closes 9:30pm" line in Google's local results.          */
    hours: [
      { days: ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"],
        opens: "10:00", closes: "21:30" },
      { days: ["Friday"], opens: "16:00", closes: "21:30" },
    ],

    /* ===== The practitioner ============================================= */
    doctor: {
      name:        "Dr. Ayesha Rahman",
      nameBn:      "ডা. আয়েশা রহমান",
      title:       "Chief Dental Surgeon",
      credentials: "BDS, PGT",
      specialty:   "Dentistry",
      photo:       "assets/doctor.svg",
      bio: {
        en: "A short paragraph on training, years of practice and approach.",
        bn: "প্রশিক্ষণ ও অভিজ্ঞতা সম্পর্কে সংক্ষিপ্ত বিবরণ।",
      },
    },

    /* ===== Brand ========================================================
       `primary` also becomes <meta name="theme-color">, which tints the
       browser chrome on Android. Change these two and the whole site follows:
       styles.css reads them as CSS custom properties.                     */
    brand: {
      primary:     "#57C3AD",
      primaryDark: "#2E9E86",
      ink:         "#173A63",
      accent:      "#F5A623",
      logo:        "assets/logo.svg",
      mark:        "assets/mark-square.svg",   // favicon + social avatar
      ogImage:     "assets/logo.svg",          // 1200x630 ideally
    },

    /* ===== The estimator's unit =========================================
       The fee estimator multiplies a price by a quantity. `units` says what one
       unit IS for this business, so the arithmetic never needs to know: teeth
       for a dentist, decimals of land for a surveyor, rooms, hours.

       label     sits on the price badge  ("Per Tooth", "প্রতি শতক")
       qtyLabel  sits above the input     ("No. of teeth", "জমির পরিমাণ")
       step      granularity — 1 for countable things, 0.01 where fractions are
                 normal. Land is routinely 2.5 katha, and a whole-number field
                 quietly quotes for 2.
       convert   optional: units a visitor may enter, each expressed in the base
                 unit. Drives the estimator AND the converter page, so the two
                 can never disagree.                                          */
    units: {
      label:    { en: "Per Tooth",    bn: "প্রতি দাঁত" },
      qtyLabel: { en: "No. of teeth", bn: "দাঁতের সংখ্যা" },
      min: 1, step: 1, default: 1,
      convert: null,
    },

    /* ===== Google Business Profile ======================================
       The Place ID drives the "leave us a review" link and its QR code. Find
       it at developers.google.com/maps/documentation/places/web-service/place-id
       (search the business, copy the ID) — it looks like "ChIJ...".

       Leave it EMPTY and the review link and QR are not rendered at all. That
       is deliberate: a Place ID is an opaque string that survives every name-
       and number-based search, so a leftover one points a new client's review
       QR at someone else's listing with nothing on screen to reveal it.      */
    google: {
      placeId: "",
    },

    /* ===== Images =======================================================
       The template ships resolution-independent SVG placeholders, so `ext` is
       "svg" and the cards/ and thumbs/ size variants are bypassed entirely —
       84 files instead of 252.

       When the clinic supplies real photographs: drop them into
       assets/services/ as .jpg, run `python3 tools/gen-image-sizes.py` to build
       the two size folders, then set ext to "jpg". Card and thumb images are a
       640px and 132px copy respectively, which is most of this site's weight on
       a phone — worth doing before launch, not after.                        */
    media: {
      ext: "svg",
    },

    /* ===== Money ========================================================
       `locale` drives digit grouping. "en-IN" gives the South Asian 1,20,000
       style; use "en-US" for 120,000. `usdRate` only feeds the cost
       estimator's secondary line — set `showUsd:false` to hide it.        */
    currency: {
      code:    "BDT",
      symbol:  "৳",
      locale:  "en-IN",
      showUsd: true,
      usdRate: 123,
    },

    /* ===== Homepage figures =============================================
       The four animated counters and the Google rating badge. These are claims
       a clinic makes in public, so they must be the CLINIC'S OWN numbers —
       carrying another practice's over is false advertising, and patients do
       check the Google listing the badge points at.

       `patients` is also editable from the dashboard (it writes to the `site`
       Firestore collection, which is world-readable by design); the value here
       is what shows before that loads, and on a site with no Firebase.        */
    stats: {
      patients:     0,      // lifetime patients seen
      years:        0,      // years the practice has been open
      services:     0,      // how many treatments offered
      satisfaction: 0,      // percent
    },

    /* From the clinic's own Google Business Profile. Set rating to 0 to hide
       the badge rather than show a rating the listing does not support. */
    rating: {
      score:  0,            // e.g. 5.0
      count:  0,            // number of reviews
    },

    /* ===== Feature switches =============================================
       Turn a section off and it is not rendered and not in the nav. Sell the
       template in tiers by flipping these.                                */
    features: {
      pricingTable:    true,
      costEstimator:   true,
      beforeAfter:     true,   // needs real consented photos — off by default
                               // on a new build until the clinic supplies them
      testimonials:    true,
      blog:            true,
      careers:         false,
      gallery:         true,
      whatsappButton:  true,
      callbackForm:    true,
      adminDashboard:  true,
    },
  };
})();
