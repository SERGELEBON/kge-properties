"use client";

import Image from "next/image";
import {
  ArrowRight,
  Building2,
  DraftingCompass,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import HeroSlider from "@/components/site/hero-slider";
import TestimonialsSlider from "@/components/site/testimonials-slider";
import {
  ArrowLink,
  ImageBanner,
  PropertyCard,
  SectionLabel,
} from "@/components/site/shared";
import { COMPANY, CONTACT } from "@/data/site";
import { HOME_FEATURED } from "@/data/properties";

/* ================================================================== */
/* Data                                                                */
/* ================================================================== */

const STATS = [
  { value: "200+", label: "Happy Clients" },
  { value: "4", label: "Core Services" },
  { value: "100%", label: "Litigation-Free Plots" },
];

const SERVICES = [
  {
    title: "Houses (To Let & For Sale)",
    text: "From cosy starter homes to spacious family residences — verified houses and apartments to rent or buy across Accra.",
    href: "/houses",
    img: "/images/kge/house-exterior-1.jpg",
  },
  {
    title: "Offices (To Let & For Sale)",
    text: "Office suites and commercial spaces in prime business districts, ready for your team to move in and get to work.",
    href: "/offices",
    img: "/images/kge/office-exterior.jpg",
  },
  {
    title: "Land (For Sale)",
    text: "Litigation-free serviced residential and commercial plots, with documentation handled from search to allocation.",
    href: "/land",
    img: "/images/kge/land-plots.jpg",
  },
  {
    title: "Architectural Drawings",
    text: "Professional building plans and working drawings prepared by qualified architects — from first sketch to permit-ready.",
    href: "/architectural-drawings",
    img: "/images/kge/arch-blueprint.jpg",
  },
];

const WHY_KGE = [
  {
    icon: ShieldCheck,
    title: "Verified & Litigation-Free Documents",
    text: "Every property we list is properly searched and verified before you pay a cedi — no double sales, no surprises.",
  },
  {
    icon: DraftingCompass,
    title: "Professional Architectural Drawings",
    text: "Our in-house team prepares building plans, working drawings and permit submissions you can build on with confidence.",
  },
  {
    icon: Building2,
    title: "Homes & Offices Across Accra",
    text: "Family houses, apartments and Grade A office suites in Accra’s most convenient neighbourhoods — to let and for sale.",
  },
  {
    icon: Handshake,
    title: "Honest Guidance From Search To Handover",
    text: "Transparent advice, clear pricing and one dedicated point of contact until the keys are in your hand.",
  },
];

const NEWS_POSTS = [
  {
    title: "How To Own Your Dream Home Without Paying Everything Upfront",
    href: "/how-to-own-your-dream-home-without-paying-everything-upfront",
    cats: ["Buying Guide", "Insights"],
    date: "May 6, 2026",
    author: "KGE Editorial",
    img: "/images/kge/interior-living.jpg",
  },
  {
    title: "Why Diaspora Buyers Choose KGE Properties",
    href: "/why-diaspora-buyers-choose-kge-properties",
    cats: ["Blog", "Diaspora"],
    date: "April 19, 2026",
    author: "KGE Editorial",
    img: "/images/kge/keys-handover.jpg",
  },
  {
    title: "Affordable Serviced Land Plots in Accra",
    href: "/affordable-serviced-land-plots-in-accra",
    cats: ["Land", "Real Estate"],
    date: "November 16, 2025",
    author: "KGE Editorial",
    img: "/images/kge/land-aerial.jpg",
  },
];

/* ================================================================== */
/* View                                                                */
/* ================================================================== */

export default function HomeView() {
  return (
    <>
      {/* ===== HERO SLIDER ===== */}
      <HeroSlider />

      {/* ===== WELCOME TO KGE PROPERTIES ===== */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionLabel>Welcome to KGE Properties</SectionLabel>
              <h2 className="text-[30px] lg:text-[38px] leading-[1.25] font-normal text-black">
                The name on the signboard you can trust in Accra.
              </h2>
              <div className="mt-6 space-y-5">
                <p className="text-[17px] leading-[1.9] text-[#666666]">
                  {COMPANY.fullName} is a real estate agency based in Accra,
                  Ghana, helping families, professionals and businesses find
                  houses and offices to let and for sale, litigation-free land,
                  and professional architectural drawings — all under one roof.
                </p>
                <p className="text-[17px] leading-[1.9] text-[#666666]">
                  We keep property simple: verified listings, honest advice and
                  clear pricing. Whether you are renting your first apartment,
                  buying a family home, securing a plot or planning to build,
                  a named KGE officer walks the journey with you from the
                  first call to the final handover.
                </p>
              </div>
              <p className="mt-8 text-[15px] text-[#666666]">
                Call us today on{" "}
                <a
                  href={CONTACT.phoneHref}
                  className="font-semibold text-black transition-colors hover:text-[#D9453D]"
                >
                  024 466 1538
                </a>{" "}
                or{" "}
                <a
                  href={CONTACT.phone2Href}
                  className="font-semibold text-black transition-colors hover:text-[#D9453D]"
                >
                  020 821 4895
                </a>{" "}
                — or visit the KGE Properties Office in Accra.
              </p>
              <div className="mt-8">
                <ArrowLink href="/corporate-overview">MORE ABOUT US</ArrowLink>
              </div>
            </div>
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
                <Image
                  src="/images/kge/keys-handover.jpg"
                  alt="KGE Properties officer handing over house keys to a happy client in Accra"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#f4f4f4] px-2 py-5 text-center"
                  >
                    <p className="text-[24px] lg:text-[28px] font-semibold leading-none text-[#D9453D]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[11px] lg:text-[12px] font-semibold uppercase tracking-[2px] text-[#666666]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR SERVICES ===== */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-[32px] lg:text-[40px]">
              Houses, Offices, Land &amp; Drawings
            </h2>
            <div className="rgl-divider-label mt-6">
              <span className="line flex-1" />
              <span className="text-[13px] font-semibold tracking-[3px] uppercase text-[#999999]">
                our services
              </span>
              <span className="line flex-1" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <article
                key={service.href}
                className="group bg-white border border-[#ebebeb] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[18px] leading-snug mb-2">
                    <a
                      href={service.href}
                      className="hover:text-[#D9453D] transition-colors"
                    >
                      {service.title}
                    </a>
                  </h3>
                  <p className="text-[14px] leading-[1.8] text-[#666666] mb-4">
                    {service.text}
                  </p>
                  <ArrowLink href={service.href}>VIEW</ArrowLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>Featured Properties</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <h2 className="text-[30px] lg:text-[38px] max-w-3xl">
              <a
                href="/houses-for-sale"
                className="hover:text-[#D9453D] transition-colors"
              >
                Houses, Offices &amp; Plots Featured By KGE This Month
              </a>
            </h2>
            <a href="/houses-for-sale" className="rgl-btn shrink-0">
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_FEATURED.map((p) => (
              <PropertyCard key={p.href} property={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <ArrowLink href="/houses-for-sale">VIEW ALL PROPERTIES</ArrowLink>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE KGE (DARK STRIP) ===== */}
      <section className="bg-[#1A1A1A]">
        <div className="rgl-container py-16 lg:py-20">
          <div className="rgl-divider-label mb-5">
            <span className="text-[13px] font-semibold tracking-[3px] uppercase text-white/70">
              why choose kge
            </span>
            <span className="line flex-1" />
          </div>
          <h2 className="text-white text-[30px] lg:text-[38px] mb-12 max-w-3xl">
            The KGE standard of service
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_KGE.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <span className="mb-5 flex h-12 w-12 items-center justify-center bg-[#D9453D] text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-white text-[18px] leading-snug mb-3">
                  {title}
                </h3>
                <p className="text-white/60 text-[14px] leading-[1.8]">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="/hallmarks" className="rgl-btn">
              WHY CHOOSE KGE
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>What Our Clients Say</SectionLabel>
          <h2 className="text-[30px] lg:text-[38px] mb-12 max-w-3xl">
            Trusted by families, tenants &amp; investors across Accra
          </h2>
          <TestimonialsSlider />
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-3 mb-10">
            <div>
              <div className="rgl-divider-label mb-5">
                <span className="line flex-1" />
                <span className="text-[13px] font-semibold tracking-[3px] uppercase text-[#999999]">
                  NEWS &amp; ARTICLES
                </span>
                <span className="line flex-1" />
              </div>
              <h2 className="text-[30px] lg:text-[36px]">
                Guides For Buyers, Tenants &amp; Investors
              </h2>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <h2 className="text-[22px] mb-4">Tips &amp; Resources</h2>
              <ul className="flex flex-wrap lg:justify-end gap-4 text-[14px]">
                {["Buying Guides", "Renting", "Land", "Diaspora", "Insights"].map(
                  (c) => (
                    <li key={c}>
                      <a
                        href="/news-insights"
                        className="text-[#D9453D] font-medium hover:text-[#1A1A1A] transition-colors"
                      >
                        {c}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {NEWS_POSTS.map((post) => (
              <article key={post.href} className="group bg-white border border-[#ebebeb]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.cats.map((c) => (
                      <a
                        key={c}
                        href="/news-insights"
                        className="text-[11px] uppercase tracking-wide text-[#D9453D] font-semibold"
                      >
                        {c}
                      </a>
                    ))}
                  </div>
                  <h3 className="text-[17px] leading-snug mb-3">
                    <a href={post.href} className="hover:text-[#D9453D] transition-colors">
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-[13px] text-[#999999]">
                    {post.date} · By {post.author}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <a href="/news-insights" className="rgl-btn">
              VIEW ALL
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <ImageBanner
        image="/images/kge/hero-house.jpg"
        title="Ready to find your next property?"
        subtitle={COMPANY.tagline}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/houses-for-sale" className="rgl-btn">
            BROWSE PROPERTIES
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/contact" className="rgl-btn rgl-btn-outline">
            TALK TO US TODAY
          </a>
        </div>
      </ImageBanner>
    </>
  );
}
