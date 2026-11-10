import type { Property } from "@/components/site/shared";

// KGE Properties — property listings (Houses, Offices, Land)

const U = (f: string) => `/images/kge/${f}`;

// ===== Houses for sale =====
export const HOUSES_FOR_SALE: Property[] = [
  {
    href: "/property/4-bedroom-storey-house-for-sale-accra",
    title: "4 Bedroom Storey House (Detached) + Bedsitter",
    price: "$285,000",
    excerpt:
      "Impressive 4-bedroom storey house in a secure gated community. Spacious en-suite bedrooms, modern fitted kitchen, tarred access roads...",
    beds: "5",
    baths: "5",
    size: "240",
    img: U("house-exterior-1.jpg"),
    images: [
      U("house-exterior-1.jpg"),
      U("interior-living.jpg"),
      U("interior-kitchen.jpg"),
      U("interior-bedroom.jpg"),
      U("interior-bathroom.jpg"),
    ],
    tags: ["For Sale", "Gated Community"],
  },
  {
    href: "/property/3-bedroom-detached-house-for-sale-accra",
    title: "3 Bedroom Detached House",
    price: "$195,000",
    excerpt:
      "Well designed 3-bedroom detached home with carport, manicured lawn and generous living spaces. Title documents ready...",
    beds: "3",
    baths: "3",
    size: "210",
    img: U("house-exterior-2.jpg"),
    images: [
      U("house-exterior-2.jpg"),
      U("interior-living.jpg"),
      U("interior-bedroom.jpg"),
      U("interior-kitchen.jpg"),
    ],
    tags: ["For Sale"],
  },
  {
    href: "/property/3-bedroom-semi-detached-house-for-sale",
    title: "3 Bedroom Semi-Detached House",
    price: "$150,000",
    excerpt:
      "Stylish 3-bedroom semi-detached house in a serene estate. Each bedroom boasts fitted wardrobes and a modern bathroom...",
    beds: "3",
    baths: "3",
    size: "160",
    img: U("house-exterior-3.jpg"),
    images: [
      U("house-exterior-3.jpg"),
      U("interior-living.jpg"),
      U("interior-bedroom.jpg"),
      U("interior-bathroom.jpg"),
    ],
    tags: ["For Sale"],
  },
  {
    href: "/property/2-bedroom-detached-house-for-sale",
    title: "2 Bedroom Detached House (Expandable)",
    price: "$120,000",
    excerpt:
      "This 2-bedroom detached home offers expansion possibilities for up to 3 bedrooms, with a planned extension layout available...",
    beds: "2",
    baths: "2",
    size: "130",
    img: U("interior-living.jpg"),
    images: [
      U("interior-living.jpg"),
      U("house-exterior-2.jpg"),
      U("interior-kitchen.jpg"),
      U("interior-bedroom.jpg"),
    ],
    tags: ["For Sale", "Expandable"],
  },
  {
    href: "/property/2-bedroom-semi-detached-house-for-sale",
    title: "2 Bedroom Semi-Detached House",
    price: "$98,000",
    excerpt:
      "Experience elegance in this stylish 2-bedroom semi-detached starter home. Light filled rooms with a modern open plan layout...",
    beds: "2",
    baths: "2",
    size: "110",
    img: U("interior-bedroom.jpg"),
    images: [
      U("interior-bedroom.jpg"),
      U("house-exterior-3.jpg"),
      U("interior-living.jpg"),
      U("interior-kitchen.jpg"),
    ],
    tags: ["For Sale"],
  },
];

// ===== Houses to let =====
export const HOUSES_TO_LET: Property[] = [
  {
    href: "/property/4-bedroom-townhouse-to-let-cantonments",
    title: "4 Bedroom Townhouse To Let (Furnished)",
    price: "$2,000 / month",
    excerpt:
      "Fully furnished 4-bedroom townhouse in a prime residential area. 24/7 security, standby generator, air conditioning throughout...",
    beds: "4",
    baths: "4",
    size: "220",
    img: U("townhouse-let.jpg"),
    images: [
      U("townhouse-let.jpg"),
      U("interior-living.jpg"),
      U("interior-bedroom.jpg"),
      U("interior-kitchen.jpg"),
    ],
    tags: ["To Let", "Furnished"],
  },
  {
    href: "/property/3-bedroom-house-to-let-east-legon",
    title: "3 Bedroom House To Let",
    price: "$1,200 / month",
    excerpt:
      "Spacious 3-bedroom house in a quiet compound with walled gate, ample parking and well kept garden. Available immediately...",
    beds: "3",
    baths: "3",
    size: "180",
    img: U("house-exterior-3.jpg"),
    images: [
      U("house-exterior-3.jpg"),
      U("interior-living.jpg"),
      U("interior-bathroom.jpg"),
      U("interior-bedroom.jpg"),
    ],
    tags: ["To Let"],
  },
  {
    href: "/property/2-bedroom-apartment-to-let-airport-city",
    title: "2 Bedroom Apartment To Let",
    price: "$950 / month",
    excerpt:
      "Modern 2-bedroom apartment with balcony and city views, fitted kitchen, shared gym and secure parking in a managed building...",
    beds: "2",
    baths: "2",
    size: "95",
    img: U("apartment-let.jpg"),
    images: [
      U("apartment-let.jpg"),
      U("interior-kitchen.jpg"),
      U("interior-bedroom.jpg"),
      U("interior-bathroom.jpg"),
    ],
    tags: ["To Let", "Apartment"],
  },
];

// ===== Offices =====
export const OFFICES: Property[] = [
  {
    href: "/property/office-suite-to-let-airport-city",
    title: "Office Suite To Let (120 m²)",
    price: "$1,500 / month",
    excerpt:
      "Grade A office suite with glass partitions, meeting room, reception area and dedicated parking. Serviced with standby power...",
    beds: "",
    baths: "2",
    size: "120",
    img: U("office-suite.jpg"),
    images: [
      U("office-suite.jpg"),
      U("office-interior.jpg"),
      U("office-exterior.jpg"),
    ],
    tags: ["To Let", "Office"],
  },
  {
    href: "/property/office-space-for-sale-ring-road",
    title: "Office Space For Sale (150 m²)",
    price: "$180,000",
    excerpt:
      "Strategically located office space on a major ring road. Open floor plan ready for fit-out, ideal for corporate headquarters...",
    beds: "",
    baths: "2",
    size: "150",
    img: U("office-exterior.jpg"),
    images: [
      U("office-exterior.jpg"),
      U("office-interior.jpg"),
      U("office-suite.jpg"),
    ],
    tags: ["For Sale", "Office"],
  },
];

// ===== Land =====
export const LAND_PLOTS: Property[] = [
  {
    href: "/property/serviced-residential-plot-for-sale-accra",
    title: "Serviced Residential Plot (70 x 100 ft)",
    price: "$45,000",
    excerpt:
      "Serviced residential plot in a developing gated estate. Tarred roads, drainage, electricity and water on site. Litigation free...",
    beds: "",
    baths: "",
    size: "650",
    img: U("land-plots.jpg"),
    images: [U("land-plots.jpg"), U("land-aerial.jpg")],
    tags: ["For Sale", "Serviced"],
  },
  {
    href: "/property/commercial-plot-for-sale-spintex",
    title: "Commercial Plot Along Main Road",
    price: "$120,000",
    excerpt:
      "Prime commercial plot with direct road frontage, ideal for offices, retail or a mixed-use development. Documents ready...",
    beds: "",
    baths: "",
    size: "890",
    img: U("land-commercial.jpg"),
    images: [U("land-commercial.jpg"), U("land-aerial.jpg")],
    tags: ["For Sale", "Commercial"],
  },
];

// ===== Home featured (mixed highlights) =====
export const HOME_FEATURED: Property[] = [
  HOUSES_FOR_SALE[0],
  HOUSES_TO_LET[0],
  LAND_PLOTS[0],
  OFFICES[0],
];

export const ALL_PROPERTIES = [
  ...HOUSES_FOR_SALE,
  ...HOUSES_TO_LET,
  ...OFFICES,
  ...LAND_PLOTS,
];
