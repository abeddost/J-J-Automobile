export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

export const SITE_URL = "https://www.jj-fair-automobile.de";

export const BUSINESS = {
  name: "J&J Fair Automobile",
  legalName: "J&J Fair Automobile GbR",
  owners: ["Javad Ayoubi", "Jusuf Dyanat"],
  address: {
    street: "Wiesbadener Str. 93",
    zip: "55252",
    city: "Mainz-Kastel",
    country: "Deutschland",
  },
  email: "jj-fair-automobile@outlook.de",
  phones: [
    { display: "0176 63259854", href: "tel:+4917663259854" },
    { display: "0176 30376401", href: "tel:+4917630376401" },
  ],
} as const;

const FULL_ADDRESS = `${BUSINESS.address.street}, ${BUSINESS.address.zip} ${BUSINESS.address.city}`;

export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(FULL_ADDRESS);

// No API key needed for the basic `output=embed` iframe form.
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=" + encodeURIComponent(FULL_ADDRESS) + "&output=embed";

// TODO: replace with the real mobile.de dealer page URL once provided.
export const MOBILE_DE_URL = "#";

export const SOCIAL = {
  instagram: "https://www.instagram.com/jj_fair_automobile/",
  tiktok: "https://www.tiktok.com/@jjfairautomobile",
  // TODO: only a page name ("J&J Fair-Automobile") was provided, not a URL/slug —
  // replace with the real Facebook page URL to avoid linking to the wrong page.
  facebook: "#",
} as const;
