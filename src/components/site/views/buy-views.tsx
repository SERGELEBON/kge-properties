"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  KeyRound,
  MapPin,
  PenTool,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import {
  PageBanner,
  SectionLabel,
  GetInTouch,
  PropertyCard,
} from "@/components/site/shared";
import { CONTACT } from "@/data/site";
import { HOUSES_FOR_SALE, HOUSES_TO_LET, OFFICES, LAND_PLOTS } from "@/data/properties";

/* ============================================================================
   Shared building blocks (local to this file)
   ========================================================================== */

const P = "text-[15px] leading-[1.9] text-[#666666]";
const H2 = "text-[30px] lg:text-[38px] leading-[1.25]";

function CTA({
  href,
  children,
  dark,
  className = "",
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <a href={href} className={`rgl-btn ${dark ? "rgl-btn-dark" : ""} ${className}`}>
      <span>{children}</span>
      <ChevronRight className="h-4 w-4" />
    </a>
  );
}

function Photo({
  src,
  alt,
  ratio,
  sizes,
  contain,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  ratio: string;
  sizes?: string;
  contain?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${ratio} overflow-hidden bg-white ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 1024px) 100vw, 50vw"}
        className={contain ? "object-contain" : "object-cover"}
      />
    </div>
  );
}

/* ============================================================================
   1. BuyAHouseView  —  /buy-a-house
   ========================================================================== */

const QUICK_LINKS: { label: string; href: string; img: string; alt: string }[] = [
  {
    label: "Houses For Sale",
    href: "/houses-for-sale",
    img: "/images/kge/house-exterior-1.jpg",
    alt: "Detached house for sale in Accra listed by KGE Properties",
  },
  {
    label: "Houses To Let",
    href: "/houses-to-let",
    img: "/images/kge/townhouse-let.jpg",
    alt: "Townhouse to let in Accra listed by KGE Properties",
  },
  {
    label: "Offices To Let & For Sale",
    href: "/offices-for-let",
    img: "/images/kge/office-exterior.jpg",
    alt: "Office building in Accra listed by KGE Properties",
  },
  {
    label: "Land For Sale",
    href: "/land-for-sale",
    img: "/images/kge/land-plots.jpg",
    alt: "Serviced residential plots for sale in Accra listed by KGE Properties",
  },
];

const FEATURED_PICKS = [
  HOUSES_FOR_SALE[0],
  HOUSES_TO_LET[0],
  LAND_PLOTS[0],
  OFFICES[0],
];

export function BuyAHouseView() {
  return (
    <>
      <PageBanner title="Find A Property" />

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className={H2}>Let us find the right house, office or land for you.</h2>
            <p className={`mt-6 ${P}`}>
              Whether you are buying your first home, relocating your office or investing in
              land, KGE Properties matches you with genuine, well-documented properties across
              Accra. We handle the search, the viewings, the paperwork and the handover — so
              you can decide with confidence.
            </p>
            <div className="mt-8">
              <CTA href="/houses-for-sale">get started</CTA>
            </div>
          </div>
          <Photo
            src="/images/kge/keys-handover.jpg"
            alt="KGE Properties agent handing over the keys to a client’s new home"
            ratio="aspect-[4/3]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* What are you looking for? — 4 quick-link cards */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          <h2 className={H2}>What are you looking for?</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((c) => (
              <article key={c.href} className="group border border-[#ebebeb] bg-white">
                <Photo
                  src={c.img}
                  alt={c.alt}
                  ratio="aspect-[4/3]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="p-5">
                  <h3 className="text-[17px] leading-snug">
                    <a href={c.href} className="transition-colors group-hover:text-[#D9453D]">
                      {c.label}
                    </a>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured picks */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <h2 className={`${H2} max-w-4xl`}>Featured Picks From Our Listings</h2>
          <p className={`mt-6 max-w-4xl ${P}`}>
            A snapshot of what is available right now — the full, up-to-date list lives on our
            listing pages.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PICKS.map((p) => (
              <PropertyCard key={p.href} property={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTA href="/houses-for-sale">VIEW ALL PROPERTIES</CTA>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ============================================================================
   2. HowToBuyView  —  /how-to-rent-or-buy
   ========================================================================== */

interface Stage {
  no: string;
  title: string;
  intro: string[];
  bullets?: string[];
  after?: string;
  cta: string;
  ctaHref: string;
  image: string;
  alt: string;
}

const STAGES: Stage[] = [
  {
    no: "1",
    title: "Tell Us What You Need",
    intro: [
      "Your journey starts with a conversation. Call our office, message us on WhatsApp or walk into our Accra office and describe the property you are looking for — a family home, a furnished apartment, an office suite or a plot of land.",
      "We will confirm your budget, your preferred areas and your move-in timeline, then prepare a shortlist that genuinely matches.",
    ],
    bullets: [
      "Call 024 466 1538 or 020 821 4895",
      "WhatsApp us at +233 24 466 1538",
      "Share your budget, preferred areas and timeline",
    ],
    cta: "REQUEST A CALLBACK",
    ctaHref: "/contact",
    image: "/images/kge/office-exterior.jpg",
    alt: "KGE Properties office in Accra, Ghana",
  },
  {
    no: "2",
    title: "View Shortlisted Properties",
    intro: [
      "We arrange inspections for every property on your shortlist — physical viewings at your convenience if you are in Ghana, or live video tours and full photo sets if you are viewing from abroad.",
      "Take your time. We share honest observations about each property, the neighbourhood, access roads and utilities, so you can compare your options fairly.",
    ],
    bullets: [
      "Physical viewings scheduled around you",
      "Live video tours for diaspora clients",
      "Honest guidance on every location",
    ],
    cta: "BROWSE CURRENT LISTINGS",
    ctaHref: "/houses-for-sale",
    image: "/images/kge/interior-living.jpg",
    alt: "Spacious living room of a property listed by KGE Properties in Accra",
  },
  {
    no: "3",
    title: "Documentation & Negotiation",
    intro: [
      "Once you have chosen a property, we negotiate the best possible terms on your behalf and begin the paperwork.",
      "For purchases, we carry out a full title search at the Lands Commission to confirm the property is genuinely litigation-free before any agreement is signed. For rentals, we prepare a clear tenancy agreement that protects both tenant and landlord.",
    ],
    bullets: [
      "Title search & document verification (purchases)",
      "Sale & purchase agreement or tenancy agreement",
      "Negotiation of price, rent and payment terms",
    ],
    after:
      "If a problem appears in the search, we tell you straight away and move on to the next option — we never push a risky deal across the line.",
    cta: "TALK TO OUR TEAM",
    ctaHref: "/contact",
    image: "/images/kge/office-interior.jpg",
    alt: "KGE Properties team reviewing property documents with a client in Accra",
  },
  {
    no: "4",
    title: "Payment & Handover",
    intro: [
      "We make every payment traceable. You receive official receipts for each instalment, and the final documents are transferred only when payments are complete.",
      "On handover day you inspect the property, receive your keys and your full documentation — and if you need ongoing support, our property management team can take it from there.",
    ],
    bullets: [
      "Official receipts for every payment",
      "Keys and complete document handover",
      "Optional property management & after-sales care",
    ],
    after:
      "Renting instead of buying? The same care applies — signed tenancy agreement, receipts and an inventory check before you move in.",
    cta: "GET IN TOUCH",
    ctaHref: "/contact",
    image: "/images/kge/keys-handover.jpg",
    alt: "Handing over the keys after a successful property transaction with KGE Properties",
  },
];

function PaymentBand() {
  return (
    <section className="bg-[#1A1A1A] py-16 lg:py-20">
      <div className="rgl-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Photo
          src="/images/kge/apartment-let.jpg"
          alt="Furnished apartment to let in Accra, handled by KGE Properties"
          ratio="aspect-video"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div>
          <h2 className="text-white text-[28px] lg:text-[36px] leading-[1.25]">
            Payment Plans That Respect Your Budget.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.9] text-white/80">
            Many of the landlords and sellers we represent accept structured payments. We
            negotiate the deposit and instalment terms on your behalf and make sure every
            commitment is written into the agreement before you pay anything. Tell us your
            budget and we will find properties — and terms — that fit.
          </p>
          <div className="mt-8">
            <CTA href="/contact">FIND OUT MORE</CTA>
          </div>
        </div>
      </div>
    </section>
  );
}

const DOC_CHECKLISTS: { title: string; note: string; items: string[] }[] = [
  {
    title: "If You’re Buying",
    note: "Bring these along and we can move quickly once you have chosen a property:",
    items: [
      "A valid photo ID — passport, voter ID or Ghana Card",
      "Proof of funds or income — bank statement or employer’s letter",
      "Your Tax Identification Number (TIN) for the land registry",
      "Your lawyer’s contact, if you have one — we can also guide you",
    ],
  },
  {
    title: "If You’re Renting",
    note: "Most landlords in Accra will ask for the following before signing a tenancy agreement:",
    items: [
      "A valid photo ID — passport, voter ID or Ghana Card",
      "One or two passport photographs",
      "A guarantor for most residential tenancies",
      "Advance rent — typically 6 to 12 months, agreed up front",
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much deposit do I need?",
    a: "For rentals, landlords in Accra typically ask for 6 to 12 months’ rent in advance — we confirm the exact terms in writing before you commit. For purchases, deposits usually start around 20–30% of the asking price, with instalment terms negotiated on your behalf before any agreement is signed.",
  },
  {
    q: "What are your agency fees?",
    a: "KGE Properties charges a one-time agency commission, and we show it to you in writing before viewings begin. There are no hidden charges — what you see on the listing plus the agreed fee is what you pay.",
  },
  {
    q: "Can I pay in instalments?",
    a: "Often, yes. Many landlords and sellers we represent accept structured payments. We negotiate the schedule for you and make sure every term — amounts, dates and receipts — is captured in the agreement before you pay anything.",
  },
  {
    q: "I live abroad — can I rent or buy remotely?",
    a: "Yes. We work with diaspora clients every month: live video tours instead of physical viewings, full document verification carried out on your behalf, and handover handled by our team or a representative you appoint. You only sign when you are satisfied.",
  },
];

export function HowToBuyView() {
  return (
    <>
      <PageBanner title="How To Rent Or Buy" />

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container max-w-4xl">
          <h2 className={H2}>How to rent or buy a property with KGE Properties in Accra.</h2>
          <p className={`mt-6 ${P}`}>
            Renting or buying property in Ghana should feel exciting, not risky. At KGE
            Properties Ltd we follow a clear four-step process — from your first phone call to
            the day you receive your keys and documents — and we keep you informed at every
            stage, whether you are in Ghana or abroad.
          </p>
        </div>
      </section>

      {/* 4-step timeline */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          <div className="relative">
            <span
              className="absolute bottom-4 top-4 hidden w-px bg-[#ebebeb] lg:left-[27px] lg:block"
              aria-hidden="true"
            />
            <ol className="space-y-12 lg:space-y-16">
              {STAGES.map((s) => (
                <li key={s.no} className="grid gap-6 lg:grid-cols-[56px_1fr] lg:gap-10">
                  <span
                    className="relative z-10 hidden h-14 w-14 items-center justify-center border-2 border-[#D9453D] bg-white text-[18px] font-semibold text-[#D9453D] lg:flex"
                    aria-hidden="true"
                  >
                    {s.no}
                  </span>
                  <article className="border border-[#ebebeb] bg-white p-6 lg:p-10">
                    <p className="text-[13px] font-semibold uppercase tracking-[3px] text-[#D9453D]">
                      Step {s.no}
                    </p>
                    <h3 className="mt-2 text-[24px] lg:text-[28px] leading-[1.3]">{s.title}</h3>
                    <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
                      <div>
                        <div className="space-y-4">
                          {s.intro.map((t) => (
                            <p key={t.slice(0, 24)} className={P}>
                              {t}
                            </p>
                          ))}
                        </div>
                        {s.bullets && s.bullets.length > 0 ? (
                          <ul className="mt-5 space-y-2.5">
                            {s.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-2.5">
                                <CheckCircle2
                                  className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#D9453D]"
                                  aria-hidden="true"
                                />
                                <span className="text-[14px] leading-relaxed text-[#666666]">{b}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {s.after ? <p className={`mt-5 ${P}`}>{s.after}</p> : null}
                        <div className="mt-7">
                          <CTA href={s.ctaHref}>{s.cta}</CTA>
                        </div>
                      </div>
                      <Photo
                        src={s.image}
                        alt={s.alt}
                        ratio="aspect-video"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="border border-[#ebebeb]"
                      />
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Payment plans band */}
      <PaymentBand />

      {/* Documents you'll need */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <h2 className={H2}>Documents You’ll Need</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {DOC_CHECKLISTS.map((c) => (
              <div key={c.title} className="border border-[#ebebeb] bg-[#f4f4f4] p-6 lg:p-8">
                <h3 className="text-[20px] lg:text-[22px] leading-snug">{c.title}</h3>
                <p className={`mt-3 ${P}`}>{c.note}</p>
                <ul className="mt-5 space-y-2.5">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#D9453D]"
                        aria-hidden="true"
                      />
                      <span className="text-[14px] leading-relaxed text-[#666666]">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={`mt-8 ${P}`}>
            Not sure which applies to you? Call{" "}
            <a
              href={CONTACT.phoneHref}
              className="font-semibold text-black transition-colors hover:text-[#D9453D]"
            >
              024 466 1538
            </a>{" "}
            /{" "}
            <a
              href={CONTACT.phone2Href}
              className="font-semibold text-black transition-colors hover:text-[#D9453D]"
            >
              020 821 4895
            </a>
            , or WhatsApp{" "}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-black transition-colors hover:text-[#D9453D]"
            >
              +233 24 466 1538
            </a>{" "}
            and we will walk you through it.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          <h2 className={`${H2} text-center`}>Frequently Asked Questions</h2>
          <div className="mx-auto mt-10 max-w-4xl space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="group border border-[#ebebeb] bg-white">
                <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 p-5 text-[16px] lg:text-[17px] font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-[#D9453D] transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-5 pb-5">
                  <p className={P}>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTA href="/contact">ASK US A QUESTION</CTA>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ============================================================================
   3. WhyTrustedView  —  /why-choose-kge
   ========================================================================== */

const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ShieldCheck,
    title: "Litigation-Free Guarantee",
    body: "No property reaches your shortlist until our team has verified the title at the Lands Commission. If the documents are not clean, we walk away — so you never inherit someone else’s dispute.",
  },
  {
    icon: Banknote,
    title: "Transparent Pricing",
    body: "Asking prices, agency fees and payment terms are confirmed in writing before viewings begin. You always know exactly what you are paying for — no surprises at the negotiating table.",
  },
  {
    icon: MapPin,
    title: "Local Expertise In Accra",
    body: "From East Legon to Spintex, Cantonments to Amasaman, we know the streets, the landlords and the going rates. That local knowledge protects both your budget and your time.",
  },
  {
    icon: KeyRound,
    title: "Full Service From Search To Handover",
    body: "One team handles your search, viewings, negotiation, documentation and handover. You deal with people who know your file — not a different agent every week.",
  },
  {
    icon: PenTool,
    title: "In-House Architectural Drawings",
    body: "Building instead of buying? Our drafting team prepares building plans and working drawings, and guides you through the approvals so construction starts on solid ground.",
  },
  {
    icon: Wrench,
    title: "After-Sales & Property Management",
    body: "We stay long after the keys are handed over — placing tenants, collecting rent and maintaining properties for owners who live in Ghana or abroad.",
  },
];

const STATS: { value: string; label: string }[] = [
  { value: "200+", label: "Properties matched for buyers, tenants and landlords" },
  { value: "4", label: "Core services — houses, offices, land & drawings" },
  { value: "100%", label: "Document verification on every purchase we handle" },
  { value: "7", label: "Days — average time to prepare your first shortlist" },
];

const TESTIMONIALS: { quote: string; name: string }[] = [
  {
    quote:
      "“I was in London and bought a house in Accra without flying down once. KGE sent me video tours, verified every document and handled the handover. When I finally stood in the house, it was exactly what they promised.”",
    name: "K. Owusu — Homeowner & Diaspora Client",
  },
  {
    quote:
      "“They negotiated our office lease, prepared the tenancy agreement and had us moved in inside two weeks. Straightforward people to deal with.”",
    name: "M. Adei — Office Tenant, Airport City",
  },
];

export function WhyTrustedView() {
  return (
    <>
      <PageBanner title="Why Choose KGE" />

      {/* Campaign image band */}
      <div className="relative h-[280px] overflow-hidden lg:h-[440px]">
        <Image
          src="/images/kge/house-exterior-2.jpg"
          alt="Detached house for sale in Accra listed by KGE Properties"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Intro */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container max-w-4xl">
          <h2 className={H2}>Six reasons buyers, tenants and landlords choose KGE Properties.</h2>
          <p className={`mt-6 ${P}`}>
            Anyone can list a property. What matters is what happens around the listing —
            honest advice, verified documents, fair prices and a team that stays with you after
            handover. That is what KGE Properties Ltd has built its name on in Accra.
          </p>
          <div className="mt-8">
            <CTA href="/how-to-rent-or-buy">SEE HOW WE WORK</CTA>
          </div>
        </div>
      </section>

      {/* The KGE difference — reasons grid */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container">
          <h2 className={H2}>The KGE Difference</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r) => (
              <div
                key={r.title}
                className="border border-[#ebebeb] bg-white p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <span className="flex h-12 w-12 items-center justify-center bg-[#D9453D] text-white">
                  <r.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[18px] leading-snug">{r.title}</h3>
                <p className={`mt-3 ${P}`}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white py-16 lg:py-20">
        <div className="rgl-container">
          <SectionLabel>track record</SectionLabel>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-4 border-[#D9453D] bg-[#f4f4f4] p-6">
                <p className="text-[40px] font-semibold leading-none text-[#D9453D]">{s.value}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-[#666666]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial quote section */}
      <section className="bg-[#f4f4f4] py-16 lg:py-20">
        <div className="rgl-container max-w-4xl">
          <SectionLabel>what our clients say</SectionLabel>
          <figure>
            <blockquote>
              <p className="text-[19px] lg:text-[22px] leading-[1.7] text-black">
                {TESTIMONIALS[0].quote}
              </p>
            </blockquote>
            <figcaption className="mt-5 text-[13px] font-semibold uppercase tracking-[2px] text-[#666666]">
              {TESTIMONIALS[0].name}
            </figcaption>
          </figure>
          <div className="mt-10 border-t border-[#ebebeb] pt-10">
            <p className={P}>{TESTIMONIALS[1].quote}</p>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[2px] text-[#666666]">
              {TESTIMONIALS[1].name}
            </p>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
