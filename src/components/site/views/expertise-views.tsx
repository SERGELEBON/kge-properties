"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Box,
  Building2,
  Car,
  CheckCircle2,
  ClipboardList,
  Clock,
  Droplets,
  FileCheck,
  Home,
  KeyRound,
  LandPlot,
  LayoutGrid,
  Map,
  MapPin,
  PenTool,
  Route,
  Ruler,
  ShieldCheck,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";
import {
  PageBanner,
  SectionLabel,
  GetInTouch,
  PropertyCard,
  ArrowLink,
  ImageBanner,
  type Property,
} from "@/components/site/shared";
import { HOUSES_FOR_SALE, HOUSES_TO_LET, OFFICES, LAND_PLOTS } from "@/data/properties";
import { CONTACT } from "@/data/site";

/* ------------------------------------------------------------------ */
/* Local building blocks (shared styling across KGE service views)     */
/* ------------------------------------------------------------------ */

function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-[15px] leading-relaxed text-[#666666] ${className}`}>{children}</p>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-[30px] leading-[1.2] text-[#141414] lg:text-[38px] ${className}`}>
      {children}
    </h2>
  );
}

type CheckItem = { icon: LucideIcon; lead?: string; text: string };

function IconCheckGrid({ items }: { items: CheckItem[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.text} className="flex items-start gap-3 border-b border-[#ebebeb] pb-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-[#D9453D]/10 text-[#D9453D]">
              <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
            </span>
            <span className="text-[15px] leading-relaxed text-[#666666]">
              {item.lead ? (
                <>
                  <strong className="font-semibold text-[#141414]">{item.lead}: </strong>
                  {item.text}
                </>
              ) : (
                item.text
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function InfoCard({
  icon: Icon,
  kicker,
  children,
}: {
  icon: LucideIcon;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#ebebeb] bg-white p-6 lg:p-8">
      <span className="flex h-11 w-11 items-center justify-center bg-[#f4f4f4] text-[#D9453D]">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-[13px] font-semibold uppercase tracking-[2px] text-[#1A1A1A]">
        {kicker}
      </h3>
      <div className="mt-3">
        <P>{children}</P>
      </div>
    </div>
  );
}

function DeliverableGrid({
  items,
}: {
  items: { icon: LucideIcon; title: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ icon: Icon, title }) => (
        <div
          key={title}
          className="group flex items-center gap-4 border border-[#ebebeb] bg-white p-4 transition-colors hover:border-[#D9453D]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#141414] text-white transition-colors group-hover:bg-[#D9453D]">
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-[14px] lg:text-[15px] font-semibold leading-snug text-[#141414]">
            {title}
          </span>
        </div>
      ))}
    </div>
  );
}

function ListingPreview({
  label,
  title,
  items,
  links,
  cols,
  bg = "bg-white",
}: {
  label: string;
  title: string;
  items: Property[];
  links: { href: string; label: string }[];
  cols: string;
  bg?: string;
}) {
  return (
    <section className={`${bg} py-16 lg:py-20`}>
      <div className="rgl-container">
        <div className="max-w-3xl">
          <SectionLabel>{label}</SectionLabel>
          <H2>{title}</H2>
        </div>
        <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${cols}`}>
          {items.map((property) => (
            <PropertyCard key={property.href} property={property} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => (
            <ArrowLink key={link.href} href={link.href}>
              {link.label}
            </ArrowLink>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Our Services                                                     */
/* ------------------------------------------------------------------ */

const SERVICE_ROWS: {
  Icon: LucideIcon;
  title: string;
  image: string;
  alt: string;
  href: string;
  linkLabel: string;
  paragraphs: string[];
}[] = [
  {
    Icon: Home,
    title: "Houses To Let & For Sale",
    image: "/images/kge/house-exterior-1.jpg",
    alt: "Detached house for sale in Accra — KGE Properties",
    href: "/houses",
    linkLabel: "Explore Houses",
    paragraphs: [
      "From compact starter homes to spacious family houses in gated communities, we let and sell quality residences across Accra — every one inspected by our team before it reaches you.",
      "Ready title documents, flexible payment terms and professional property management take the stress out of buying or renting your next home.",
    ],
  },
  {
    Icon: Building2,
    title: "Offices To Let & For Sale",
    image: "/images/kge/office-exterior.jpg",
    alt: "Office building to let in Accra — KGE Properties",
    href: "/offices",
    linkLabel: "Explore Offices",
    paragraphs: [
      "Serviced office suites and commercial floors for startups, growing companies and established corporates — in Accra’s most connected business districts.",
      "Flexible lease terms, standby power and dedicated parking come as standard in the offices we list.",
    ],
  },
  {
    Icon: LandPlot,
    title: "Land For Sale",
    image: "/images/kge/land-plots.jpg",
    alt: "Serviced residential plots for sale in Accra — KGE Properties",
    href: "/land",
    linkLabel: "Explore Land",
    paragraphs: [
      "Litigation-free residential and commercial plots in serviced estates, with tarred roads, electricity and water already on site.",
      "Our team supports you through surveying and documentation until the land is safely in your name.",
    ],
  },
  {
    Icon: PenTool,
    title: "Architectural Drawings",
    image: "/images/kge/arch-blueprint.jpg",
    alt: "Architectural drawings and blueprints — KGE Properties",
    href: "/architectural-drawings",
    linkLabel: "Explore Drawings",
    paragraphs: [
      "Site plans, floor plans, elevations, working drawings and 3D renders — prepared by qualified professionals and ready for permit submission.",
      "Already have land or a house in mind? We turn your ideas into drawings your builder and the assembly can work with.",
    ],
  },
];

export function OurServicesView() {
  return (
    <>
      <PageBanner title="Our Services" />

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <div className="max-w-3xl">
            <SectionLabel>our services</SectionLabel>
            <H2>Four services. One trusted partner.</H2>
            <P className="mt-6">
              KGE Properties Ltd is a real estate agency based in Accra, offering houses, offices
              and land — to let and for sale — alongside professional architectural drawings.
              Whichever service you need, our team walks with you from first enquiry to final
              handover.
            </P>
            <P className="mt-4">
              Browse our core services below, then get in touch to arrange a viewing, a site visit
              or a quotation.
            </P>
          </div>
        </div>
      </section>

      {/* Alternating service rows */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          {SERVICE_ROWS.map(({ Icon, title, image, alt, href, linkLabel, paragraphs }, i) => (
            <div
              key={title}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${i > 0 ? "mt-14" : ""}`}
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden bg-white ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="flex h-12 w-12 items-center justify-center bg-[#D9453D] text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-[22px] leading-snug text-[#141414] lg:text-[28px]">
                  {title}
                </h3>
                {paragraphs.map((paragraph) => (
                  <P key={paragraph.slice(0, 30)} className="mt-3">
                    {paragraph}
                  </P>
                ))}
                <div className="mt-6">
                  <ArrowLink href={href}>{linkLabel}</ArrowLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Houses — To Let & For Sale                                       */
/* ------------------------------------------------------------------ */

const HOUSE_BUY_RENT: { title: string; paragraphs: string[] }[] = [
  {
    title: "Buying a House",
    paragraphs: [
      "When you buy through KGE Properties, your purchase is protected from day one. We list houses with ready title documents, verify every property before marketing it, and guide you through negotiation, payment schedules and final handover.",
      "Flexible payment terms — including agreed instalment plans — and mortgage guidance make it easier to move from dreaming about a home to holding the keys.",
    ],
  },
  {
    title: "Renting a House",
    paragraphs: [
      "Renting through KGE gives you vetted houses, townhouses and apartments with clear terms and no hidden charges. We arrange viewings, explain the tenancy before you sign, and remain your point of contact throughout.",
      "With our property management team behind every tenancy, maintenance issues are handled quickly and professionally — so your home stays a pleasure to live in.",
    ],
  },
];

const HOUSE_HIGHLIGHTS: CheckItem[] = [
  {
    icon: FileCheck,
    lead: "Title documents ready",
    text: "Every house we sell comes with verified, registered title documents — your purchase is safe from day one.",
  },
  {
    icon: ShieldCheck,
    lead: "Gated communities",
    text: "Many of our listings sit inside secure estates with 24/7 security, access control and well-kept shared spaces.",
  },
  {
    icon: Wallet,
    lead: "Flexible payment terms",
    text: "Agreed instalment plans and mortgage guidance tailored to your budget, for both sales and rentals.",
  },
  {
    icon: Wrench,
    lead: "Property management",
    text: "Professional estate management keeps roads, facilities and common areas in top condition long after you move in.",
  },
  {
    icon: KeyRound,
    lead: "Move-in ready options",
    text: "Choose from furnished and semi-furnished homes available for immediate occupancy.",
  },
];

export function HousesView() {
  return (
    <>
      <PageBanner title="Houses — To Let & For Sale" />

      <ImageBanner
        image="/images/kge/hero-house.jpg"
        title="The right house, whether you buy or rent."
        subtitle="KGE PROPERTIES SERVICE"
      />

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionLabel>houses</SectionLabel>
              <H2>Your next house starts here.</H2>
              <P className="mt-6">
                KGE Properties lets and sells houses across Accra — from expandable starter homes
                to spacious family residences in gated communities. Every listing is inspected by
                our team and presented with honest, complete information.
              </P>
              <P className="mt-4">
                Tell us your budget and preferred location, and we will shortlist homes worth your
                time — then handle viewings, negotiations and paperwork on your behalf.
              </P>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
              <Image
                src="/images/kge/interior-living.jpg"
                alt="Modern living room interior of a KGE Properties house"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Buying vs renting */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          <div className="max-w-3xl">
            <SectionLabel>buying &amp; renting</SectionLabel>
            <H2>Buying and renting, explained</H2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {HOUSE_BUY_RENT.map((card) => (
              <article
                key={card.title}
                className="border border-[#ebebeb] bg-white p-6 lg:p-8"
              >
                <h3 className="text-[22px] leading-snug text-[#141414] lg:text-[24px]">
                  {card.title}
                </h3>
                <span className="my-5 block h-[3px] w-12 bg-[#D9453D]" />
                <div className="space-y-4">
                  {card.paragraphs.map((paragraph) => (
                    <P key={paragraph.slice(0, 30)}>{paragraph}</P>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <div className="max-w-3xl">
            <SectionLabel>highlights</SectionLabel>
            <H2>Why rent or buy through KGE</H2>
          </div>
          <div className="mt-10">
            <IconCheckGrid items={HOUSE_HIGHLIGHTS} />
          </div>
        </div>
      </section>

      {/* Mini listing preview */}
      <ListingPreview
        bg="bg-[#f4f4f4]"
        label="featured listings"
        title="A taste of what’s available"
        items={[...HOUSES_FOR_SALE.slice(0, 2), ...HOUSES_TO_LET.slice(0, 2)]}
        cols="lg:grid-cols-4"
        links={[
          { href: "/houses-for-sale", label: "View All Houses For Sale" },
          { href: "/houses-to-let", label: "View Houses To Let" },
        ]}
      />

      <GetInTouch />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Offices — To Let & For Sale                                      */
/* ------------------------------------------------------------------ */

const OFFICE_FEATURES: { icon: LucideIcon; kicker: string; text: string }[] = [
  {
    icon: Zap,
    kicker: "Serviced Suites",
    text: "Glass partitions, meeting rooms, reception areas, air conditioning and internet-ready cabling — offices that are ready to work from day one.",
  },
  {
    icon: Clock,
    kicker: "Flexible Terms",
    text: "Leases from twelve months upward, with room to expand as your team grows. Purchases are negotiated with clear, structured payment schedules.",
  },
  {
    icon: Car,
    kicker: "Parking & Power",
    text: "Dedicated parking bays and standby generators keep your business running — no downtime, no circling for a space.",
  },
];

export function OfficesView() {
  return (
    <>
      <PageBanner title="Offices — To Let & For Sale" />

      <ImageBanner
        image="/images/kge/hero-office.jpg"
        title="Workspace for every stage of business."
        subtitle="KGE PROPERTIES SERVICE"
      />

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionLabel>offices</SectionLabel>
              <H2>Offices for startups to corporates</H2>
              <P className="mt-6">
                Whether you need a compact suite for a new venture or a full floor for an
                established corporate team, KGE Properties lets and sells office space across
                Accra’s key business districts.
              </P>
              <P className="mt-4">
                Every space is inspected before listing, and we negotiate terms that work for your
                business — then remain available long after you sign.
              </P>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
              <Image
                src="/images/kge/office-interior.jpg"
                alt="Modern serviced office interior in Accra — KGE Properties"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          <div className="max-w-3xl">
            <SectionLabel>what’s included</SectionLabel>
            <H2>Serviced suites. Flexible terms.</H2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {OFFICE_FEATURES.map(({ icon, kicker, text }) => (
              <InfoCard key={kicker} icon={icon} kicker={kicker}>
                {text}
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Mini listing preview */}
      <ListingPreview
        bg="bg-white"
        label="featured listings"
        title="Currently available offices"
        items={OFFICES.slice(0, 2)}
        cols="lg:grid-cols-2"
        links={[{ href: "/offices-for-let", label: "View All Offices" }]}
      />

      <GetInTouch />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Land For Sale                                                    */
/* ------------------------------------------------------------------ */

const LAND_PROMISE: CheckItem[] = [
  {
    icon: ShieldCheck,
    lead: "Litigation-free",
    text: "Every plot is verified and documented before it is listed, so your purchase starts on solid legal ground.",
  },
  {
    icon: Route,
    lead: "Serviced roads",
    text: "Estates laid out with tarred roads and drainage, ready for construction from the day you buy.",
  },
  {
    icon: Zap,
    lead: "Electricity on site",
    text: "Power distribution available within the estates — no waiting for connections to catch up with you.",
  },
  {
    icon: Droplets,
    lead: "Water connections",
    text: "Water available to each plot in our serviced developments.",
  },
  {
    icon: Ruler,
    lead: "Survey & documentation",
    text: "Our team supports surveying and paperwork until title is safely in your name.",
  },
  {
    icon: MapPin,
    lead: "Commercial plots",
    text: "Plots with main-road frontage available for offices, retail and mixed-use developments.",
  },
];

export function LandView() {
  return (
    <>
      <PageBanner title="Land For Sale" />

      <ImageBanner
        image="/images/kge/hero-land.jpg"
        title="Land you can build on, with peace of mind."
        subtitle="KGE PROPERTIES SERVICE"
      />

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
              <Image
                src="/images/kge/land-aerial.jpg"
                alt="Aerial view of serviced land plots for sale in Accra — KGE Properties"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionLabel>land</SectionLabel>
              <H2>Litigation-free land, ready to build</H2>
              <P className="mt-6">
                Every plot KGE Properties sells is litigation-free and verified before it is
                listed. We deal directly with documented landowners, so the story behind your land
                is clear from the very first visit.
              </P>
              <P className="mt-4">
                Choose from serviced residential plots in developing estates, or commercial plots
                with main-road frontage for your next project.
              </P>
            </div>
          </div>
        </div>
      </section>

      {/* Land promise */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          <div className="max-w-3xl">
            <SectionLabel>the kge land promise</SectionLabel>
            <H2>Serviced plots, secure documentation</H2>
          </div>
          <div className="mt-10">
            <IconCheckGrid items={LAND_PROMISE} />
          </div>
        </div>
      </section>

      {/* Mini listing preview */}
      <ListingPreview
        bg="bg-white"
        label="featured listings"
        title="Plots currently available"
        items={LAND_PLOTS.slice(0, 2)}
        cols="lg:grid-cols-2"
        links={[{ href: "/land-for-sale", label: "View All Land" }]}
      />

      <GetInTouch />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Architectural Drawings                                           */
/* ------------------------------------------------------------------ */

const DRAWING_DELIVERABLES: { icon: LucideIcon; title: string }[] = [
  { icon: Map, title: "Site Plans" },
  { icon: LayoutGrid, title: "Floor Plans" },
  { icon: Building2, title: "Elevations" },
  { icon: Ruler, title: "Working Drawings" },
  { icon: Box, title: "3D Renders" },
  { icon: ClipboardList, title: "Permit Submission Support" },
];

const DESIGN_STEPS: { number: string; title: string; text: string }[] = [
  {
    number: "01",
    title: "Consultation",
    text: "We meet, listen to your needs, measure the site and agree on the brief, budget and timeline.",
  },
  {
    number: "02",
    title: "Concept Design",
    text: "Sketch proposals and layout options shaped around your site, your budget and how you live or work.",
  },
  {
    number: "03",
    title: "Detailed Drawings",
    text: "Full working drawings — floor plans, elevations, sections and schedules — ready for costing and construction.",
  },
  {
    number: "04",
    title: "Approval & Support",
    text: "We support permit submission to the relevant assembly and stay available to your builder throughout the project.",
  },
];

const DRAWING_SET: string[] = [
  "Dimensioned floor plans for every level",
  "Site layout with setbacks and boundary details",
  "All elevations and building sections",
  "Roof, door and window schedules",
  "3D renders to visualise the finished project",
  "Permit-ready documents for assembly submission",
];

export function ArchitecturalDrawingsView() {
  return (
    <>
      <PageBanner title="Architectural Drawings" />

      <ImageBanner
        image="/images/kge/arch-blueprint.jpg"
        title="From first sketch to approved drawings."
        subtitle="KGE PROPERTIES SERVICE"
      />

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <div className="max-w-3xl">
            <SectionLabel>architectural services</SectionLabel>
            <H2>Professional architectural drawings</H2>
            <P className="mt-6">
              Building on your own land? KGE Properties prepares the architectural drawings you
              need to move from idea to construction — drawn by qualified professionals to Ghana’s
              building standards.
            </P>
            <P className="mt-4">
              We work with homeowners, developers and businesses, producing clear, buildable
              documents your contractor and your planning assembly can rely on.
            </P>
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          <div className="max-w-3xl">
            <SectionLabel>what we deliver</SectionLabel>
            <H2>Everything your project needs on paper</H2>
          </div>
          <div className="mt-10">
            <DeliverableGrid items={DRAWING_DELIVERABLES} />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <div className="max-w-3xl">
            <SectionLabel>the process</SectionLabel>
            <H2>How the process works</H2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {DESIGN_STEPS.map((step) => (
              <div key={step.number} className="border border-[#ebebeb] bg-white p-6 lg:p-8">
                <span className="text-[34px] font-semibold leading-none text-[#D9453D]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-[19px] leading-snug text-[#141414]">{step.title}</h3>
                <P className="mt-3">{step.text}</P>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drawing set checklist */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <Image
                src="/images/kge/arch-cad.jpg"
                alt="CAD architectural drawings prepared by KGE Properties"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionLabel>every set includes</SectionLabel>
              <H2>What’s in your drawing set</H2>
              <ul className="mt-8 space-y-3">
                {DRAWING_SET.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#D9453D]"
                      strokeWidth={1.7}
                    />
                    <span className="text-[15px] leading-relaxed text-[#666666]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>pricing</SectionLabel>
            <H2>Simple, project-based quotations</H2>
            <P className="mt-6">
              Fees depend on the size and scope of your project. Contact us for a quote —{" "}
              <a
                href={CONTACT.phoneHref}
                className="font-semibold text-[#D9453D] transition-colors hover:text-[#C13B34]"
              >
                024 466 1538
              </a>{" "}
              /{" "}
              <a
                href={CONTACT.phone2Href}
                className="font-semibold text-[#D9453D] transition-colors hover:text-[#C13B34]"
              >
                020 821 4895
              </a>
              .
            </P>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ArrowLink href="/contact">Request A Quote</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
