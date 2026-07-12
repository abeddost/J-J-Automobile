export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "de";

// TODO: switch to the real domain once purchased — using the Vercel URL for SEO in the meantime.
export const SITE_URL = "https://j-j-automobile.vercel.app";

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
  email: "jjautomobile2026@gmail.com",
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
  instagram: "https://www.instagram.com/jj_automobile_mainzkastel/",
  tiktok: "https://www.tiktok.com/@jjautomobilemainzkastel",
  facebook: "https://www.facebook.com/people/JJ-Automobile-Mainz-Kastel/61591027891717/",
} as const;
