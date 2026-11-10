"use client";

import { Phone } from "lucide-react";
import {
  PageBanner,
  SectionLabel,
  GetInTouch,
  PropertyCard,
  type Property,
} from "@/components/site/shared";
import { HOUSES_FOR_SALE, HOUSES_TO_LET, OFFICES, LAND_PLOTS } from "@/data/properties";
import { CONTACT } from "@/data/site";

/* ------------------------------------------------------------------ */
/* Local building blocks (shared styling across KGE listing views)     */
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

/** "Can't find what you're looking for?" strip under the grid */
function CallNote() {
  return (
    <div className="mt-10 flex items-start gap-4 border border-[#ebebeb] bg-[#f4f4f4] p-6 lg:p-7">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#1A1A1A] text-white">
        <Phone className="h-5 w-5" strokeWidth={1.7} />
      </span>
      <p className="text-[15px] leading-relaxed text-[#666666]">
        Can’t find what you’re looking for? Call{" "}
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
        </a>{" "}
        — new listings arrive every week.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Generic listing page (banner + intro + count + grid + note + CTA)   */
/* ------------------------------------------------------------------ */

type ListingViewProps = {
  banner: string;
  label: string;
  title: string;
  intro: string;
  countLabel: string;
  items: Property[];
};

function ListingView({
  banner,
  label,
  title,
  intro,
  countLabel,
  items,
}: ListingViewProps) {
  return (
    <>
      <PageBanner title={banner} />

      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          {/* Intro */}
          <div className="max-w-3xl">
            <SectionLabel>{label}</SectionLabel>
            <H2>{title}</H2>
            <P className="mt-6">{intro}</P>
          </div>

          {/* Result count */}
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-[#ebebeb] py-4">
            <span className="text-[26px] font-semibold leading-none text-[#D9453D]">
              {items.length}
            </span>
            <span className="text-[15px] text-[#666666]">{countLabel}</span>
          </div>

          {/* Listings grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((property) => (
              <PropertyCard key={property.href} property={property} />
            ))}
          </div>

          <CallNote />
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Houses For Sale                                                  */
/* ------------------------------------------------------------------ */

export function HousesForSaleView() {
  return (
    <ListingView
      banner="Houses For Sale"
      label="houses for sale"
      title="Houses For Sale in Accra"
      intro="Browse the houses KGE Properties currently has for sale across Accra — from expandable starter homes to spacious family residences in gated communities. Every listing comes with verified title documents and our guidance from viewing to handover."
      countLabel="houses available"
      items={HOUSES_FOR_SALE}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 2. Houses To Let                                                    */
/* ------------------------------------------------------------------ */

export function HousesToLetView() {
  return (
    <ListingView
      banner="Houses To Let"
      label="houses to let"
      title="Houses To Let in Accra"
      intro="Quality houses, townhouses and apartments to let in prime Accra locations. Clear tenancy terms, prompt maintenance and professional property management come standard with every KGE rental."
      countLabel="houses available"
      items={HOUSES_TO_LET}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 3. Offices To Let & For Sale                                        */
/* ------------------------------------------------------------------ */

export function OfficesForLetView() {
  return (
    <ListingView
      banner="Offices To Let & For Sale"
      label="offices to let & for sale"
      title="Offices To Let & For Sale in Accra"
      intro="Serviced office suites and commercial spaces in Accra’s business districts — flexible leases for growing teams, and office space for sale for businesses ready to own their headquarters."
      countLabel="offices available"
      items={OFFICES}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 4. Land For Sale                                                    */
/* ------------------------------------------------------------------ */

export function LandForSaleView() {
  return (
    <ListingView
      banner="Land For Sale"
      label="land for sale"
      title="Land For Sale in Accra"
      intro="Litigation-free residential and commercial plots in serviced estates. Tarred roads, electricity and water on site, with survey and documentation support from our team until the land is yours."
      countLabel="plots available"
      items={LAND_PLOTS}
    />
  );
}
