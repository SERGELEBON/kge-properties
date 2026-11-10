export interface MenuItem {
  label: string;
  href?: string;
  badge?: string;
  children?: MenuItem[];
}

/** KGE Properties — brand data (from the official KGE PROPERTIES signboard) */
export const COMPANY = {
  shortName: "KGE Properties",
  fullName: "KGE Properties Ltd",
  tagline: "Houses • Offices • Land • Architectural Drawings",
  kicker: "KGE Properties — Accra, Ghana",
};

export const IMG = (path: string) => `/images/${path}`;

export const CONTACT = {
  phone: "+233 24 466 1538",
  phone2: "+233 20 821 4895",
  phoneHref: "tel:+233244661538",
  phone2Href: "tel:+233208214895",
  whatsapp: "https://wa.me/233244661538",
  email: "info@kgeproperties.com",
  address: "KGE Properties Office, Accra, Ghana",
  hours: [
    ["Mon - Fri", "8am - 5pm"],
    ["Saturdays", "10am - 2pm"],
    ["Holidays", "Appointments Only"],
  ] as [string, string][],
};

export const NAV: MenuItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "ABOUT KGE",
    children: [
      { label: "OVERVIEW", href: "/corporate-overview" },
      { label: "WHY CHOOSE US", href: "/hallmarks" },
      { label: "BRAND STORY", href: "/brand-story" },
      { label: "HOW WE ARE ORGANISED", href: "/how-we-are-organised" },
      { label: "OUR TEAM", href: "/our-team" },
    ],
  },
  {
    label: "OUR SERVICES",
    children: [
      { label: "HOUSES (TO LET & FOR SALE)", href: "/houses" },
      { label: "OFFICES (TO LET & FOR SALE)", href: "/offices" },
      { label: "LAND (FOR SALE)", href: "/land" },
      { label: "ARCHITECTURAL DRAWINGS", href: "/architectural-drawings" },
    ],
  },
  {
    label: "PROPERTIES",
    children: [
      { label: "HOUSES FOR SALE", href: "/houses-for-sale" },
      { label: "HOUSES TO LET", href: "/houses-to-let" },
      { label: "OFFICES TO LET & FOR SALE", href: "/offices-for-let" },
      { label: "LAND FOR SALE", href: "/land-for-sale" },
    ],
  },
  { label: "NEWS & INSIGHTS", href: "/news-insights" },
  { label: "CONTACT", href: "/contact" },
];

export const FOOTER_LINKS_1 = [
  { label: "Houses For Sale", href: "/houses-for-sale" },
  { label: "Houses To Let", href: "/houses-to-let" },
  { label: "Offices To Let & For Sale", href: "/offices-for-let" },
  { label: "Land For Sale", href: "/land-for-sale" },
  { label: "Architectural Drawings", href: "/architectural-drawings" },
  { label: "News & Insights", href: "/news-insights" },
];

export const FOOTER_LINKS_2 = [
  { label: "About KGE", href: "/corporate-overview" },
  { label: "Why Choose Us", href: "/hallmarks" },
  { label: "Our Team", href: "/our-team" },
  { label: "How To Rent Or Buy", href: "/how-to-rent-or-buy" },
  { label: "Get In Touch", href: "/contact" },
];
