"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import {
  ArrowLink,
  GetInTouch,
  PageBanner,
  SectionLabel,
} from "@/components/site/shared";
import {
  Award,
  Briefcase,
  Check,
  Compass,
  Eye,
  FileCheck,
  Globe,
  Handshake,
  Heart,
  KeyRound,
  PhoneCall,
  Quote,
  Ruler,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { COMPANY, CONTACT } from "@/data/site";

/* ================================================================== */
/* Local building blocks for the About views                           */
/* ================================================================== */

type IconType = ComponentType<{
  className?: string;
  strokeWidth?: number | string;
}>;

type Cta = { label: string; href: string };

function SectionHeading({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <h2
      className={`text-[30px] lg:text-[38px] leading-[1.25] font-normal text-black ${className}`}
    >
      {children}
    </h2>
  );
}

function BodyText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p className={`text-[17px] leading-[1.9] text-[#666666] ${className}`}>
      {children}
    </p>
  );
}

function Figure({
  src,
  alt,
  aspect = "aspect-[4/3]",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#f4f4f4] ${aspect} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

function CtaRow({ links }: { links: Cta[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {links.map((cta) => (
        <ArrowLink key={cta.href} href={cta.href}>
          {cta.label}
        </ArrowLink>
      ))}
    </div>
  );
}

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-3 text-[15px] lg:text-[16px] leading-[1.7] text-[#666666]">
      <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center bg-[#D9453D] text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

/* ================================================================== */
/* 1. CorporateOverviewView                                            */
/* ================================================================== */

const OVERVIEW_OFFICE_IMG = "/images/kge/office-interior.jpg";

const OVERVIEW_INFO_BLOCKS: {
  icon: IconType;
  title: string;
  text: string;
}[] = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To connect families, professionals and businesses with houses, offices and land they can trust — and to support every client with honest advice, verified documents and professional architectural drawings.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be the first name Ghanaians — at home and abroad — look for on a signboard whenever they need property in Accra.",
  },
];

const OVERVIEW_VALUES: { icon: IconType; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "We say what we do and do what we say. Every listing is verified before it reaches you.",
  },
  {
    icon: Briefcase,
    title: "Professionalism",
    text: "Qualified agents, architects and surveyors handle every enquiry with care and competence.",
  },
  {
    icon: Heart,
    title: "Client First",
    text: "Your budget, your timeline and your comfort drive every recommendation we make.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "From the first site visit to the final handover, we aim to get every detail right.",
  },
];

const OVERVIEW_SERVICES: {
  title: string;
  text: string;
  href: string;
  img: string;
}[] = [
  {
    title: "Houses — To Let & For Sale",
    text: "Detached homes, townhouses and apartments for rent or purchase in Accra’s most convenient neighbourhoods.",
    href: "/houses",
    img: "/images/kge/house-exterior-1.jpg",
  },
  {
    title: "Offices — To Let & For Sale",
    text: "Office suites and commercial floors for growing businesses, with flexible terms and prime addresses.",
    href: "/offices",
    img: "/images/kge/office-exterior.jpg",
  },
  {
    title: "Land — For Sale",
    text: "Litigation-free residential and commercial plots, fully searched and documented before allocation.",
    href: "/land",
    img: "/images/kge/land-plots.jpg",
  },
  {
    title: "Architectural Drawings",
    text: "Site plans, floor plans and permit-ready working drawings prepared by our in-house drawings department.",
    href: "/architectural-drawings",
    img: "/images/kge/arch-blueprint.jpg",
  },
];

export function CorporateOverviewView() {
  return (
    <>
      <PageBanner title="Corporate Overview" />

      {/* Who we are */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>Corporate Overview</SectionLabel>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionHeading>
                A trusted real estate agency in the heart of Accra.
              </SectionHeading>
              <div className="mt-8 flex items-baseline gap-3 border-l-4 border-[#D9453D] pl-5">
                <span className="text-[17px] font-semibold uppercase tracking-[2px] text-[#666666]">
                  Based in
                </span>
                <span className="text-[40px] lg:text-[52px] font-semibold leading-none text-[#1A1A1A]">
                  Accra, Ghana.
                </span>
              </div>
              <div className="mt-8 space-y-5">
                <BodyText>
                  {`${COMPANY.fullName} is a real estate agency helping families, professionals and businesses find property they can rely on — houses and offices to let and for sale, litigation-free land, and professional architectural drawings.`}
                </BodyText>
                <BodyText>
                  {"Whether you are renting, buying or building, our officers handle the search, the viewings, the negotiations and the paperwork — so the process stays clear from the first call to the final handover."}
                </BodyText>
                <BodyText>
                  Every service on our signboard is delivered by a named
                  specialist you can reach directly, backed by documents you
                  can verify and prices you can plan around.
                </BodyText>
              </div>
            </div>
            <div>
              <Figure
                src={OVERVIEW_OFFICE_IMG}
                alt="The KGE Properties office interior in Accra"
                aspect="aspect-[4/3]"
                priority
              />
              <p className="mt-4 text-center text-[13px] font-semibold uppercase tracking-[3px] text-[#999999]">
                KGE Properties Office — Accra
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {OVERVIEW_INFO_BLOCKS.map((block) => (
              <article
                key={block.title}
                className="flex gap-5 border border-[#ebebeb] bg-white p-6 lg:p-8"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#D9453D] text-white">
                  <block.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[20px] lg:text-[22px] text-black mb-3">
                    {block.title}
                  </h3>
                  <BodyText className="text-[15px] lg:text-[16px]">
                    {block.text}
                  </BodyText>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading>Our Core Values</SectionHeading>
            <BodyText className="mt-6">
              Four values shape every enquiry, every viewing and every
              handover at KGE Properties.
            </BodyText>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OVERVIEW_VALUES.map((value) => (
              <article
                key={value.title}
                className="group border border-[#ebebeb] bg-white p-6 text-center transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-[#f4f4f4] text-[#D9453D] transition-colors group-hover:bg-[#D9453D] group-hover:text-white">
                  <value.icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h3 className="text-[19px] text-black">{value.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.8] text-[#666666]">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>What We Do</SectionLabel>
          <SectionHeading className="max-w-3xl">
            Everything on our signboard, delivered under one roof.
          </SectionHeading>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OVERVIEW_SERVICES.map((service) => (
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

      {/* Client support */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Figure
              src="/images/kge/keys-handover.jpg"
              alt="KGE Properties handing over keys to a client in Accra"
              aspect="aspect-[4/3]"
            />
            <div>
              <SectionHeading>
                Support that does not end at the front door
              </SectionHeading>
              <BodyText className="mt-6">
                Most agencies stop at the sale. We stay for the questions that
                come after — utilities, renovations, lease renewals and the
                next purchase. Our client care desk keeps your file open long
                after the keys have changed hands.
              </BodyText>
              <BodyText className="mt-5">
                That is why most of our business comes from referrals: clients
                who were treated fairly come back, and they bring their
                families, colleagues and friends with them.
              </BodyText>
            </div>
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="lg:order-2">
              <Figure
                src="/images/kge/team.jpg"
                alt="The KGE Properties team in Accra"
                aspect="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="lg:order-1">
              <SectionHeading>The people behind the signboard</SectionHeading>
              <BodyText className="mt-6">
                KGE Properties is run by a compact team of agents, architects
                and support staff who know Accra street by street. Get to know
                the officers who will handle your enquiry.
              </BodyText>
              <div className="mt-8">
                <ArrowLink href="/our-team">MEET OUR TEAM</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA buttons */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <CtaRow
            links={[
              { label: "Read our Brand Story", href: "/brand-story" },
              { label: "Why Choose KGE", href: "/hallmarks" },
            ]}
          />
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ================================================================== */
/* 2. HallmarksView                                                    */
/* ================================================================== */

const HALLMARKS_PILLARS: { icon: IconType; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Litigation-Free Properties",
    text: "Land and property disputes are the biggest risk in Ghanaian real estate. We conduct proper searches and verify every document before a property is listed — and before you pay.",
  },
  {
    icon: FileCheck,
    title: "Transparent Pricing",
    text: "The price we quote is the price you pay. No hidden charges, no surprise fees at the table — every cost is explained in writing from day one.",
  },
  {
    icon: Handshake,
    title: "End-To-End Support",
    text: "From the first viewing to the final signature and handover of keys, a dedicated KGE officer walks the whole journey with you.",
  },
  {
    icon: Ruler,
    title: "Professional Architectural Drawings",
    text: "Beyond buying and renting, our drawings department prepares site plans, floor plans and permit-ready working drawings for clients who want to build.",
  },
  {
    icon: PhoneCall,
    title: "Fast Response",
    text: "Call 024 466 1538 or 020 821 4895 and a real person picks up. Enquiries are answered the same working day — because in property, timing matters.",
  },
  {
    icon: Globe,
    title: "Diaspora-Friendly Service",
    text: "Live abroad? We handle viewings, video tours, document checks and payments on your behalf, and keep you updated at every step.",
  },
];

export function HallmarksView() {
  return (
    <>
      <PageBanner title="Why Choose Us" />

      {/* Intro */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>Why Choose Us</SectionLabel>
          <div className="max-w-4xl">
            <SectionHeading>Six reasons clients choose KGE Properties</SectionHeading>
            <BodyText className="mt-6">
              Anyone can put a property on a signboard. What matters is what
              happens behind it — the searches, the paperwork, the honest
              conversations and the follow-through. That is where KGE
              Properties is built differently.
            </BodyText>
            <p className="mt-6 text-[15px] text-[#666666]">
              Prefer to talk it through? Call{" "}
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
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <div>
            {HALLMARKS_PILLARS.map((pillar, index) => (
              <article
                key={pillar.title}
                className="flex flex-col gap-5 border-b border-[#ebebeb] py-9 first:pt-0 last:border-b-0 last:pb-0 md:flex-row md:gap-10"
              >
                <span
                  aria-hidden="true"
                  className="text-[44px] lg:text-[56px] font-bold leading-none text-[#D9453D]/25 md:w-24 shrink-0"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="md:flex-1">
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-[3px] text-[#D9453D]">
                    Reason {index + 1}
                  </p>
                  <h3 className="text-[20px] lg:text-[24px] leading-snug text-black mb-3">
                    <span className="mr-3 inline-flex h-9 w-9 translate-y-[5px] items-center justify-center bg-[#1A1A1A] text-white align-middle">
                      <pillar.icon className="h-4.5 w-4.5" />
                    </span>
                    {pillar.title}
                  </h3>
                  <BodyText>{pillar.text}</BodyText>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA buttons */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <CtaRow
            links={[
              { label: "Explore Our Services", href: "/our-services" },
              { label: "See Featured Properties", href: "/houses-for-sale" },
            ]}
          />
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ================================================================== */
/* 3. BrandStoryView                                                   */
/* ================================================================== */

type StoryImage = { src: string; alt: string; sizes?: string };

function StoryBlock({
  title,
  paragraphs,
  images,
  flip = false,
}: {
  title: string;
  paragraphs: string[];
  images: StoryImage[];
  flip?: boolean;
}) {
  const imageSizes =
    images.length > 1
      ? "(max-width: 1024px) 50vw, 25vw"
      : "(max-width: 1024px) 100vw, 50vw";
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className={flip ? "lg:order-2" : ""}>
        {images.length === 1 ? (
          <Figure
            src={images[0].src}
            alt={images[0].alt}
            aspect="aspect-[4/3]"
            sizes={images[0].sizes ?? imageSizes}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <Figure
                key={image.src}
                src={image.src}
                alt={image.alt}
                aspect="aspect-square"
                sizes={imageSizes}
              />
            ))}
          </div>
        )}
      </div>
      <div className={flip ? "lg:order-1" : ""}>
        <h3 className="text-[24px] lg:text-[30px] leading-[1.3] text-black mb-6">
          {title}
        </h3>
        <div className="space-y-5">
          {paragraphs.map((paragraph) => (
            <BodyText key={paragraph.slice(0, 40)}>{paragraph}</BodyText>
          ))}
        </div>
      </div>
    </div>
  );
}

const STORY_MILESTONES: string[] = [
  "KGE Properties founded in Accra by a team of property professionals",
  "Expanded into office rentals for growing businesses",
  "Launched land sales with survey and documentation services",
  "Added an architectural drawings department for custom building plans",
];

export function BrandStoryView() {
  return (
    <>
      <PageBanner title="Brand Story" />

      {/* Intro */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>Brand Story</SectionLabel>
          <SectionHeading className="max-w-4xl">
            From one signboard in Accra to a name clients trust.
          </SectionHeading>
        </div>
      </section>

      {/* Where we started */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <StoryBlock
            title="It began with property professionals who had seen it all"
            images={[
              {
                src: "/images/kge/hero-office.jpg",
                alt: "A modern office building listed by KGE Properties in Accra",
              },
            ]}
            paragraphs={[
              "KGE Properties was founded in Accra by a team of property professionals who were tired of watching buyers and tenants lose money to double sales, unverified documents and empty promises. They had seen too many families pay hard-earned savings for land that belonged to someone else.",
              "So they built an agency around a simple promise: every listing verified, every document checked, every price explained in writing. That promise shaped the name on our signboard — and it still shapes every file we open today.",
            ]}
          />
        </div>
      </section>

      {/* The signboard across the city */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <StoryBlock
            title="The KGE name on signboards across the city"
            flip
            images={[
              {
                src: "/images/kge/keys-handover.jpg",
                alt: "Keys handed over to a happy KGE Properties client in Accra",
              },
            ]}
            paragraphs={[
              "As more families collected their keys without drama, word travelled. The red KGE Properties signboard became a familiar sight on houses, offices and plots across Accra — and it came to mean one thing: what you see is what you get.",
              "Landlords trusted us to find tenants who pay on time. Tenants trusted us to describe rooms honestly. Buyers trusted us to search every document before money moved. That two-way trust is the asset we have guarded most carefully.",
            ]}
          />
        </div>
      </section>

      {/* From homes to full service */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <StoryBlock
            title="From finding homes to shaping them"
            images={[
              {
                src: "/images/kge/team.jpg",
                alt: "The KGE Properties team of agents and architects in Accra",
              },
            ]}
            paragraphs={[
              "What started as helping families find homes grew into a full-service agency. Clients asked for office space — we added commercial rentals. Clients asked for land — we launched plot sales backed by proper surveys and documentation.",
              "Then came the question we heard most often: “I have the plot — now who will draw the house?” Our answer was to add an architectural drawings department, so the same team that helps you find property can also prepare the plans that turn it into a home.",
            ]}
          />
        </div>
      </section>

      {/* Full-width image band */}
      <section className="relative h-[300px] lg:h-[460px] overflow-hidden">
        <Image
          src="/images/kge/house-exterior-2.jpg"
          alt="A completed family house in Accra listed by KGE Properties"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Timeline */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <div className="max-w-4xl">
            <SectionLabel>Our Journey</SectionLabel>
            <SectionHeading>Our journey so far</SectionHeading>
            <div className="relative mt-12">
              <div
                aria-hidden="true"
                className="absolute left-4 lg:left-5 top-2 bottom-2 w-px bg-[#dddddd]"
              />
              <ol className="space-y-8">
                {STORY_MILESTONES.map((milestone, index) => (
                  <li key={milestone} className="relative pl-14 lg:pl-20">
                    <span className="absolute left-0 top-0 flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#D9453D] text-[11px] font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1.5 text-[16px] lg:text-[17px] leading-[1.7] text-[#666666]">
                      {milestone}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA buttons */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <CtaRow
            links={[
              { label: "Explore our Hallmarks", href: "/hallmarks" },
              { label: "Meet our Team", href: "/our-team" },
            ]}
          />
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ================================================================== */
/* 4. HowWeAreOrganisedView                                            */
/* ================================================================== */

const ORGANISED_TOP_BAND_IMG = "/images/kge/office-exterior.jpg";

const ORGANISED_QUOTE =
  "Whatever you need from us — a house, an office, a plot or a drawing — one named officer is responsible for getting it done right.";

const ORGANISED_DEPARTMENTS: { icon: IconType; title: string; text: string }[] =
  [
    {
      icon: Briefcase,
      title: "Sales Department",
      text: "Handles houses and land for sale — listings, negotiations, offer letters and the document trail from search to title transfer.",
    },
    {
      icon: KeyRound,
      title: "Rentals Department",
      text: "Matches tenants with houses and offices to let, and manages viewings, lease negotiations, renewals and check-ins.",
    },
    {
      icon: Compass,
      title: "Architectural & Drawings Department",
      text: "Prepares architectural drawings, working drawings and building permit submissions for clients ready to build.",
    },
    {
      icon: Users,
      title: "Client Care & Support",
      text: "Your first call for anything at all — questions, complaints, follow-ups and after-handover support.",
    },
  ];

const ORGANISED_PROMISES: string[] = [
  "One point of contact for viewings, negotiations and paperwork",
  "Document verification before any payment is made",
  "Drawings and permits handled in-house when you build",
  "After-sale and after-lease support from the same team",
];

export function HowWeAreOrganisedView() {
  return (
    <>
      <PageBanner title="How We Are Organised" />

      {/* Top image band */}
      <section className="relative h-[280px] lg:h-[440px] overflow-hidden">
        <Image
          src={ORGANISED_TOP_BAND_IMG}
          alt="A commercial office building handled by KGE Properties in Accra"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Intro */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>How We Are Organised</SectionLabel>
          <div className="max-w-4xl">
            <SectionHeading>One agency. Four focused departments.</SectionHeading>
            <div className="mt-6 space-y-5">
              <BodyText>
                {`Property has many moving parts — searches, viewings, negotiations, drawings and paperwork. At ${COMPANY.fullName} we organise those parts into four departments, each led by specialists who do that one thing every day.`}
              </BodyText>
              <BodyText>
                When you make an enquiry, it is matched to the right department
                immediately — and a client care officer stays on your file so
                nothing falls between the chairs.
              </BodyText>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <figure className="mx-auto max-w-4xl text-center">
            <span className="mx-auto mb-8 flex h-14 w-14 items-center justify-center bg-[#1A1A1A] text-white">
              <Quote className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <blockquote>
              <p className="text-[22px] lg:text-[28px] leading-[1.6] text-black">
                {ORGANISED_QUOTE}
              </p>
            </blockquote>
            <figcaption className="rgl-divider-label mt-8 justify-center">
              <span className="text-[13px] font-semibold tracking-[3px] uppercase text-[#999999]">
                The KGE Way of Working
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>Our Departments</SectionLabel>
          <SectionHeading className="max-w-3xl">
            The teams behind every KGE transaction
          </SectionHeading>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ORGANISED_DEPARTMENTS.map((dept) => (
              <article
                key={dept.title}
                className="group border border-[#ebebeb] bg-white p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <span className="mb-5 flex h-14 w-14 items-center justify-center bg-[#f4f4f4] text-[#D9453D] transition-colors group-hover:bg-[#D9453D] group-hover:text-white">
                  <dept.icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h3 className="text-[19px] leading-snug text-black mb-3">
                  {dept.title}
                </h3>
                <p className="text-[14px] leading-[1.8] text-[#666666]">
                  {dept.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Working together */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Figure
              src="/images/kge/team.jpg"
              alt="KGE Properties officers from different departments working together"
              aspect="aspect-[4/3]"
            />
            <div>
              <SectionHeading>Working as one team around you</SectionHeading>
              <BodyText className="mt-6">
                The departments meet weekly around live client files, so a
                buyer who needs a drawing and a tenant who needs a renewal are
                never passed around like strangers.
              </BodyText>
              <ul className="mt-8 space-y-4">
                {ORGANISED_PROMISES.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA buttons */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <CtaRow
            links={[
              { label: "Meet our Team", href: "/our-team" },
              { label: "Explore our Services", href: "/our-services" },
            ]}
          />
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ================================================================== */
/* 5. OurTeamView                                                      */
/* ================================================================== */

const TEAM_MEMBERS: { name: string; initials: string; role: string }[] = [
  { name: "Kwame Mensah", initials: "KM", role: "Managing Director" },
  { name: "Akosua Boateng", initials: "AB", role: "Head of Sales" },
  { name: "Nana Ama Serwaa", initials: "NS", role: "Head of Rentals" },
  { name: "Kojo Aidoo", initials: "KA", role: "Lead Architect" },
  { name: "Yaw Owusu", initials: "YO", role: "Land & Surveys Officer" },
  { name: "Adwoa Asante", initials: "AA", role: "Client Relations Manager" },
];

export function OurTeamView() {
  return (
    <>
      <PageBanner title="Our Team" />

      {/* Intro */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>Our Team</SectionLabel>
          <div className="max-w-4xl">
            <SectionHeading>The people behind KGE Properties</SectionHeading>
            <BodyText className="mt-6">
              KGE Properties is run by a compact team of agents, architects
              and support staff who know Accra street by street. Small enough
              that you always speak to someone who knows your file — and
              experienced enough to handle everything on our signboard.
            </BodyText>
          </div>
        </div>
      </section>

      {/* Full-width image band */}
      <section className="relative h-[300px] lg:h-[460px] overflow-hidden">
        <Image
          src="/images/kge/team.jpg"
          alt="The KGE Properties team at the office in Accra"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Officers */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <SectionHeading>Meet the officers</SectionHeading>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.name}
                className="group border border-[#ebebeb] bg-white transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
              >
                <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#f4f4f4]">
                  <span
                    aria-hidden="true"
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-[#D9453D] text-[30px] font-semibold text-[#F5EFDC] transition-transform duration-700 group-hover:scale-105"
                  >
                    {member.initials}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#D9453D]" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-[19px] text-black">{member.name}</h3>
                  <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[2px] text-[#D9453D]">
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA buttons */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <CtaRow
            links={[
              { label: "How We Are Organised", href: "/how-we-are-organised" },
              { label: "Get In Touch", href: "/contact" },
            ]}
          />
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
