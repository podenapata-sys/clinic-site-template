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
      name:        "Dr. Example Name",
      title:       "Chief Dental Surgeon",
      credentials: "BDS, PGT",
      specialty:   "Dentistry",
      photo:       "assets/doctor.jpg",
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
      logo:        "assets/logo.png",
      mark:        "assets/mark-square.png",   // favicon + social avatar
      ogImage:     "assets/logo.png",          // 1200x630 ideally
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
