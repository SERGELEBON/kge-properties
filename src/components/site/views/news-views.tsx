"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
} from "lucide-react";
import {
  PageBanner,
  SectionLabel,
  GetInTouch,
  PropertyCard,
  ArrowLink,
  type Property,
} from "@/components/site/shared";
import ContactFormSection from "@/components/site/contact-form";
import { CONTACT } from "@/data/site";
import { ALL_PROPERTIES } from "@/data/properties";

/* ============================== shared bits ============================== */

const P = "text-[16px] leading-[1.9] text-[#666666] mb-5";
const H2 = "text-[26px] lg:text-[30px] leading-snug mt-12 mb-5";
const H3 = "text-[20px] lg:text-[22px] leading-snug mt-10 mb-4";

const SITE_URL = "https://kgeproperties.com";

const IMG_INTERIOR_LIVING = "/images/kge/interior-living.jpg";
const IMG_INTERIOR_KITCHEN = "/images/kge/interior-kitchen.jpg";
const IMG_HOUSE_EXTERIOR_1 = "/images/kge/house-exterior-1.jpg";
const IMG_TOWNHOUSE_LET = "/images/kge/townhouse-let.jpg";
const IMG_KEYS_HANDOVER = "/images/kge/keys-handover.jpg";
const IMG_LAND_PLOTS = "/images/kge/land-plots.jpg";
const IMG_LAND_AERIAL = "/images/kge/land-aerial.jpg";
const IMG_LAND_COMMERCIAL = "/images/kge/land-commercial.jpg";

function PostMeta({ date, cats }: { date: string; cats: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className="inline-flex items-center gap-2 text-[13px] text-[#999999]">
        <Calendar className="h-4 w-4 text-[#D9453D]" />
        {date}
      </span>
      {cats.map((c) => (
        <a
          key={c}
          href="/news-insights"
          className="text-[11px] font-semibold uppercase tracking-wide text-[#D9453D] hover:text-[#1A1A1A] transition-colors"
        >
          {c}
        </a>
      ))}
    </div>
  );
}

function CtaCard({
  title,
  text,
  linkLabel,
  href,
}: {
  title: string;
  text: string;
  linkLabel: string;
  href: string;
}) {
  return (
    <div className="bg-[#141414] p-8 lg:p-10 mt-12 mb-4">
      <h2 className="text-white text-[24px] lg:text-[28px] mb-3">{title}</h2>
      <p className="text-white/70 text-[15px] leading-[1.9] mb-7">{text}</p>
      <a href={href} className="rgl-btn">
        {linkLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function ArticleImage({
  src,
  alt,
  className = "my-10",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[16/9] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
      />
    </div>
  );
}

/* ============================== News & Insights ============================== */

interface NewsArticle {
  title: string;
  href: string;
  cats: string[];
  date: string;
  img: string;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    title: "How To Own Your Dream Home Without Paying Everything Upfront",
    href: "/how-to-own-your-dream-home-without-paying-everything-upfront",
    cats: ["Buying Guide"],
    date: "May 6, 2026",
    img: IMG_INTERIOR_LIVING,
  },
  {
    title: "Why Diaspora Buyers Choose KGE Properties",
    href: "/why-diaspora-buyers-choose-kge-properties",
    cats: ["Diaspora"],
    date: "April 19, 2026",
    img: IMG_KEYS_HANDOVER,
  },
  {
    title: "Affordable Serviced Land Plots In Accra",
    href: "/affordable-serviced-land-plots-in-accra",
    cats: ["Land"],
    date: "November 16, 2025",
    img: IMG_LAND_AERIAL,
  },
];

function NewsCard({ a }: { a: NewsArticle }) {
  return (
    <article className="group bg-white border border-[#ebebeb] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-shadow flex flex-col">
      <a
        href={a.href}
        aria-label={a.title}
        className="relative block aspect-[4/3] overflow-hidden bg-[#f4f4f4]"
      >
        <Image
          src={a.img}
          alt={a.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </a>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
          {a.cats.map((c) => (
            <a
              key={c}
              href="/news-insights"
              className="text-[11px] font-semibold uppercase tracking-wide text-[#D9453D] hover:text-[#1A1A1A] transition-colors"
            >
              {c}
            </a>
          ))}
        </div>
        <h3 className="text-[17px] leading-snug mb-3 flex-1">
          <a href={a.href} className="hover:text-[#D9453D] transition-colors">
            {a.title}
          </a>
        </h3>
        <p className="text-[13px] text-[#999999] inline-flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-[#D9453D]" />
          {a.date}
        </p>
      </div>
    </article>
  );
}

export function NewsInsightsView() {
  const featured = NEWS_ARTICLES[0];
  const rest = NEWS_ARTICLES.slice(1);
  return (
    <>
      <PageBanner title="News & Insights" />

      {/* Featured article strip */}
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>featured</SectionLabel>
          <article className="group grid border border-[#ebebeb] bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-shadow lg:grid-cols-2">
            <a
              href={featured.href}
              aria-label={featured.title}
              className="relative block aspect-[4/3] overflow-hidden bg-[#f4f4f4] lg:aspect-auto lg:min-h-[420px]"
            >
              <Image
                src={featured.img}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </a>
            <div className="p-6 lg:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                {featured.cats.map((c) => (
                  <a
                    key={c}
                    href="/news-insights"
                    className="text-[11px] font-semibold uppercase tracking-wide text-[#D9453D] hover:text-[#1A1A1A] transition-colors"
                  >
                    {c}
                  </a>
                ))}
              </div>
              <h2 className="text-[26px] lg:text-[32px] leading-snug mb-4">
                <a
                  href={featured.href}
                  className="hover:text-[#D9453D] transition-colors"
                >
                  {featured.title}
                </a>
              </h2>
              <p className="text-[13px] text-[#999999] inline-flex items-center gap-2 mb-7">
                <Calendar className="h-4 w-4 text-[#D9453D]" />
                {featured.date}
              </p>
              <div>
                <ArrowLink href={featured.href}>READ ARTICLE</ArrowLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Articles grid */}
      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <SectionLabel>news &amp; articles</SectionLabel>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <NewsCard key={a.title} a={a} />
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ============================== Post: Dream Home ============================== */

const DREAM_HOME_STAGES = [
  {
    section: "Stage One",
    text: "Choose the home or plot you want and verify everything — registered survey, site plan and title search come before any money moves.",
  },
  {
    section: "Stage Two",
    text: "Reserve the property with an agreed deposit and sign a written agreement that protects both sides.",
  },
  {
    section: "Stage Three",
    text: "Pay the balance in agreed stages — monthly, quarterly, or tied to construction milestones for off-plan homes.",
  },
  {
    section: "Stage Four",
    text: "Complete your documentation and collect your keys — with receipts and registered documents in hand.",
  },
];

const DREAM_HOME_MORTGAGE = [
  "Ghanaian banks and diaspora-focused lenders offer mortgages in both cedis and US dollars, typically over 5 to 20 years.",
  "Expect to provide proof of income (payslips or audited accounts), valid identification, bank statements and a down payment — often 20% to 30% of the property value.",
  "Get pre-qualified before you fall in love with a house. Knowing your real budget sharpens every decision that follows.",
  "Where a listing supports mortgage purchase, our team aligns the payment schedule with your lender’s drawdown process.",
];

const DREAM_HOME_INSTALLMENT = [
  "Where the property owner allows it, the purchase price can be spread over an agreed period in monthly or quarterly installments.",
  "Terms differ from property to property — some owners accept a larger deposit with a short 6 to 12 month plan, others stretch further.",
  "Every installment agreement we facilitate is put in writing: a clear payment schedule, what happens if a payment is missed, and when title transfers.",
  "Ask us which current listings support installment payments — availability changes as properties are sold.",
];

const DREAM_HOME_RENT_TO_OWN = [
  "In a rent-to-own arrangement, part of the rent you pay each month is credited towards the eventual purchase of the home.",
  "It suits steady earners who cannot raise a large deposit at once — you live in the home while your equity grows.",
  "Rent-to-own stock is limited and moves quickly, so register your interest with our team early.",
  "We put the credit terms in writing before you move in, so every month of rent counts towards ownership.",
];

const DREAM_HOME_OFFPLAN = [
  "Buying off-plan — before the house is completed — lets you pay in construction milestones rather than one lump sum.",
  "A typical schedule follows the build: a deposit to start, a payment at lintel or roof level, and the balance at handover.",
  "Off-plan buyers often secure better per-square-metre prices and, in some cases, the chance to choose finishes along the way.",
  "Insist on milestone-linked payments tied to verified progress — never pay large sums against promises alone.",
];

const DREAM_HOME_BUDGET_TIPS = [
  "Budget 5–10% of the purchase price on top for legal fees, stamp duty, registration and utility connections.",
  "Keep an emergency fund covering at least three months of payments — income shocks and currency swings happen.",
  "If you are buying from abroad, factor transfer charges and exchange-rate movements into every planned payment.",
  "Visit the property — or request a live video tour — at every major stage before releasing the next payment.",
];

const DREAM_HOME_TITLE_CHECK = [
  "Registered survey plan — confirms the exact boundaries and location of the plot with the Lands Commission.",
  "Title search — verifies the true owner and reveals any litigation, double sales or encumbrances on the land.",
  "Site plan and beaconing — physically identifies the plot you are paying for, so there are no surprises on the ground.",
  "Proper documents — indentures, assignments and receipts, all signed and registered.",
];

export function PostDreamHomeView() {
  return (
    <>
      <PageBanner title="How To Own Your Dream Home Without Paying Everything Upfront" />
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <article className="max-w-3xl mx-auto">
            <PostMeta date="May 6, 2026" cats={["Buying Guide"]} />

            <ArticleImage
              src={IMG_INTERIOR_LIVING}
              alt="A bright modern living room in a house listed by KGE Properties"
              className="mt-8 mb-10"
            />

            <p className="text-[18px] leading-[1.9] text-[#141414] mb-6">
              The biggest myth in Ghanaian real estate is that you must pay for
              a home all at once. In practice, thousands of Ghanaians — at home
              and abroad — buy their houses, offices and plots in sensible
              stages, using mortgages, installment agreements, rent-to-own
              pathways and off-plan payments. The key is knowing which route
              fits your income, and protecting yourself at every step.
            </p>
            <p className={P}>
              At KGE Properties, we help buyers in Accra structure purchases
              they can actually afford — houses and offices to let or for sale,
              serviced land, and the architectural drawings to build on it.
              Here is how owning your dream home without paying everything
              upfront really works.
            </p>

            <div className="flex items-center gap-4 bg-[#f4f4f4] border-l-4 border-[#D9453D] p-5 my-8">
              <Calendar className="h-8 w-8 text-[#D9453D] shrink-0" />
              <div>
                <p className="text-[12px] font-semibold tracking-[2px] uppercase text-[#999999]">
                  The golden rule
                </p>
                <p className="text-[17px] text-black font-medium">
                  Verify the survey and title first — then deposit, then pay
                  the rest in pieces you can afford.
                </p>
              </div>
            </div>

            <h2 className={H2}>Your path to ownership, stage by stage</h2>
            <div className="space-y-4 mb-10">
              {DREAM_HOME_STAGES.map((a) => (
                <div
                  key={a.section}
                  className="flex items-start gap-4 border border-[#ebebeb] p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#1A1A1A] text-white text-[14px] font-semibold">
                    {a.section.replace("Stage ", "")}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold tracking-[2px] uppercase text-[#D9453D] mb-1">
                      {a.section}
                    </p>
                    <p className="text-[16px] leading-[1.8] text-[#666666]">
                      {a.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className={H2}>Option 1: Mortgage financing</h2>
            <p className={P}>
              A mortgage lets you move into your home now and pay the bank over
              the years, instead of saving for a decade first. Ghana’s mortgage
              market has grown steadily, and several lenders now serve
              Ghanaians abroad as well as residents at home.
            </p>
            <ul className="space-y-3 mb-8">
              {DREAM_HOME_MORTGAGE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <ArticleImage
              src={IMG_HOUSE_EXTERIOR_1}
              alt="A detached storey house for sale in Accra marketed by KGE Properties"
            />

            <h2 className={H2}>Option 2: Installment agreements where available</h2>
            <p className={P}>
              Installment buying is the classic Ghanaian route to ownership.
              Rather than a bank standing in the middle, you and the property
              owner agree a deposit and a schedule — and the home becomes yours
              as you pay.
            </p>
            <ul className="space-y-3 mb-8">
              {DREAM_HOME_INSTALLMENT.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className={H2}>Option 3: Rent-to-own pathways</h2>
            <p className={P}>
              Rent-to-own is still emerging in Ghana’s market, but the
              arrangements that do exist can be a lifeline for buyers who earn
              steadily yet cannot raise a lump sum. You rent the home — and a
              share of each payment builds towards buying it.
            </p>
            <ul className="space-y-3 mb-8">
              {DREAM_HOME_RENT_TO_OWN.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className={H2}>Option 4: Off-plan payments</h2>
            <p className={P}>
              Some of the homes we list can be bought off-plan — directly from
              the developer before completion. You are effectively buying
              tomorrow’s house at today’s price, paying as the building rises.
            </p>
            <ul className="space-y-3 mb-8">
              {DREAM_HOME_OFFPLAN.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <ArticleImage
              src={IMG_INTERIOR_KITCHEN}
              alt="A modern fitted kitchen in a KGE Properties listing"
            />

            <h2 className={H2}>Budgeting tips that keep the dream on track</h2>
            <p className={P}>
              Whichever payment route you choose, the buyers who succeed are
              the ones who budget honestly from day one. A house that drains
              every cedi you earn is not a dream home — it is a trap. Build
              these habits into your plan:
            </p>
            <ul className="space-y-3 mb-8">
              {DREAM_HOME_BUDGET_TIPS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className={H2}>Why a registered survey and title check matter</h2>
            <p className={P}>
              The cheapest house in Accra becomes expensive the day the land
              beneath it turns out to be in dispute. Before any money changes
              hands — deposit, installment or otherwise — confirm that the
              property stands on properly documented land. This is the one step
              you should never skip, whatever the payment plan:
            </p>
            <ul className="space-y-3 mb-8">
              {DREAM_HOME_TITLE_CHECK.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className={P}>
              Every property KGE Properties markets is verified before it is
              listed, and we guide our buyers through the checks above — so the
              staged payments you commit to are protecting a home that will
              truly be yours at the end.
            </p>

            <ArticleImage
              src={IMG_KEYS_HANDOVER}
              alt="Keys handed over to a happy homeowner in Accra"
            />

            <h2 className={H2}>Ready to take the first step?</h2>
            <p className={P}>
              You do not need everything upfront — you need the right plan. Our
              sales team will walk you through current listings, the payment
              options available for each, and the documents that keep you safe
              from the first deposit to the final key.
            </p>

            <div className="border border-[#ebebeb] bg-[#f4f4f4] p-8 lg:p-10 mt-12 text-center">
              <h2 className="text-[24px] lg:text-[28px] mb-3">
                Talk to our sales team
              </h2>
              <p className="text-[15px] leading-[1.9] text-[#666666] mb-7 max-w-xl mx-auto">
                Tell us your budget and timeline and we will show you the
                houses, offices and plots that fit — together with the payment
                options available for each.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-7">
                <a
                  href={CONTACT.phoneHref}
                  className="text-[17px] font-semibold text-[#D9453D] hover:text-[#1A1A1A] transition-colors"
                >
                  024 466 1538
                </a>
                <span className="text-[#999999]">/</span>
                <a
                  href={CONTACT.phone2Href}
                  className="text-[17px] font-semibold text-[#D9453D] hover:text-[#1A1A1A] transition-colors"
                >
                  020 821 4895
                </a>
              </div>
              <a href="/contact" className="rgl-btn">
                CONTACT US
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </section>
      <GetInTouch />
    </>
  );
}

/* ============================== Post: Diaspora guide ============================== */

type DiasporaBlock =
  | { k: "h2"; t: string }
  | { k: "h3"; t: string }
  | { k: "lead"; t: string }
  | { k: "p"; t: string }
  | { k: "ul"; items: string[] }
  | { k: "img"; src: string; alt: string }
  | { k: "stats"; items: { big: string; small: string }[] }
  | { k: "hr" };

const DIASPORA_BLOCKS: DiasporaBlock[] = [
  { k: "h2", t: "Buying or renting in Ghana from abroad — without the sleepless nights" },
  { k: "p", t: "Every year, Ghanaians in the USA, the UK, Canada and across Europe send money home with one ambition: a house, an office or a plot of land that will be there, exactly as promised, when they return. The dream is real. So, unfortunately, are the horror stories — land sold twice, “agents” who vanish mid-transaction, and houses built with substituted materials." },
  { k: "p", t: "KGE Properties exists to remove that fear. We are a real estate agency in Accra handling houses (to let and for sale), offices (to let and for sale), land for sale and architectural drawings — and a large share of our clients complete their entire purchase or rental from abroad, without setting foot in Ghana until the keys are ready." },
  { k: "stats", items: [{ big: "100%", small: "Litigation-free verification before any property is marketed" }, { big: "2 lines", small: "Direct phone lines answered by our team — 024 466 1538 and 020 821 4895" }, { big: "WhatsApp", small: "Video tours and progress updates, wherever you are in the world" }] },
  { k: "h2", t: "See the property with your own eyes — video tours" },
  { k: "p", t: "Never wire money for a property you have only seen in glossy photographs. Photos can hide a flooded access road, a cracked wall or an unfinished roof. That is why every remote viewing with KGE Properties happens on camera, live:" },
  { k: "ul", items: ["Live video walkthroughs — we walk the house, office or plot with you on a video call and answer your questions on the spot.", "Recorded tours on WhatsApp — rewatch them with your spouse, your parents or your engineer before you decide.", "Neighbourhood drive-throughs — see the access roads, the nearby schools and shops, and the general surroundings, not just the building.", "Second opinions welcome — we will happily re-shoot any corner, ceiling or boundary you want to examine again."] },
  { k: "img", src: IMG_KEYS_HANDOVER, alt: "Keys handed over to a buyer represented remotely by KGE Properties" },
  { k: "h2", t: "Trusted local representation" },
  { k: "p", t: "The single biggest risk of buying from abroad is not distance — it is doing business through people whose incentives are not aligned with yours. A relative means well but has no training; a “caretaker” may be paid by whoever offers the biggest commission. As a licensed agency, KGE Properties is paid to protect the transaction, not to push one side of it." },
  { k: "p", t: "Our team inspects the property, verifies the documents, negotiates on your instructions, and reports to you at every stage. You make the decisions; we do the legwork on the ground in Accra." },
  { k: "h3", t: "Litigation-free verification before you pay a pesewa" },
  { k: "p", t: "Land litigation is the silent killer of diaspora investments. Before any property — house, office or plot — is marketed by KGE Properties, our team works through a verification checklist:" },
  { k: "ul", items: ["Registered survey plan checked against the official records.", "Title search to confirm the true owner and expose any pending litigation, double sales or encumbrances.", "Site plan and beacon verification on the ground, so the plot you see on paper is the plot you get.", "Written agreements and official receipts for every single payment you make."] },
  { k: "h2", t: "Power of attorney — act in Ghana while living abroad" },
  { k: "p", t: "If you cannot fly home for every signature, a power of attorney lets a person you trust lawfully act on your behalf — signing documents, processing registration, even collecting keys. It is the standard instrument used by diaspora buyers, and when it is done properly it is safe:" },
  { k: "ul", items: ["Choose your attorney carefully — a relative, a lawyer, or our team where appropriate.", "A Ghanaian lawyer drafts the instrument and you sign it before a notary in your country of residence (or at a Ghanaian embassy or consulate).", "The document is registered in Ghana before it is ever used.", "You stay in control — major payments and decisions still require your direct approval, in writing."] },
  { k: "img", src: IMG_TOWNHOUSE_LET, alt: "A townhouse available to let through KGE Properties in Accra" },
  { k: "h2", t: "Remittance-safe payments" },
  { k: "p", t: "How you pay matters as much as what you buy. The diaspora buyers who lose money are almost never the ones who chose a bad house — they are the ones who paid the wrong way. KGE Properties structures every payment to keep a clean, traceable paper trail:" },
  { k: "ul", items: ["Pay only into verified company or lawyer-held accounts — never cash to a “friend of a friend”.", "Collect a receipt for every payment, no matter how small.", "Keep transfers in your own name wherever possible, so the paper trail is yours.", "We schedule payments to match your transfer rhythm — monthly, quarterly, or tied to agreed milestones."] },
  { k: "h2", t: "Property management after purchase" },
  { k: "p", t: "Buying is step one. Keeping the property in good condition — and earning — is the ongoing job, and it is exactly the job you cannot do from Toronto or London. Our management service keeps your investment working while you are away:" },
  { k: "ul", items: ["Tenant sourcing and rent collection for the houses and offices you let.", "Routine inspections with photo and video reports sent to you.", "Coordination of repairs, utilities and service charges.", "Regular statements, so you always know exactly where your property stands."] },
  { k: "h2", t: "Renting remotely before you buy" },
  { k: "p", t: "Many diaspora clients start by renting — a furnished apartment for their first months home, a townhouse for the family while they search, an office for the business they are setting up. Renting through a verified agency gives you a soft landing in Ghana and a feel for the neighbourhoods before you commit to buying. The same verification, video tours and clean paperwork apply whether you are paying rent or a purchase price." },
  { k: "h2", t: "Ready when you are" },
  { k: "p", t: "Tell us your budget, your timeline and where in the world you are — and we will take it from there. Buying or renting in Ghana from abroad should feel like the milestone it is, not a gamble you lie awake over." },
  { k: "hr" },
];

export function PostDiasporaView() {
  return (
    <>
      <PageBanner title="Why Diaspora Buyers Choose KGE Properties" />
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <article className="max-w-3xl mx-auto">
            <PostMeta date="April 19, 2026" cats={["Diaspora"]} />
            <ArticleImage
              src={IMG_KEYS_HANDOVER}
              alt="Keys handed over to a diaspora buyer working with KGE Properties"
              className="mt-8 mb-10"
            />
            <DiasporaBlocks blocks={DIASPORA_BLOCKS} />

            <div className="border border-[#ebebeb] bg-[#f4f4f4] p-8 lg:p-10 mt-12 text-center">
              <h2 className="text-[24px] lg:text-[28px] mb-3">
                Call or message us today
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                <a
                  href={CONTACT.phoneHref}
                  className="text-[17px] font-semibold text-[#D9453D] hover:text-[#1A1A1A] transition-colors"
                >
                  024 466 1538
                </a>
                <span className="text-[#999999]">/</span>
                <a
                  href={CONTACT.phone2Href}
                  className="text-[17px] font-semibold text-[#D9453D] hover:text-[#1A1A1A] transition-colors"
                >
                  020 821 4895
                </a>
              </div>
              <p className="text-[15px] leading-[1.9] text-[#666666] mb-7 max-w-xl mx-auto">
                Or reach us instantly on WhatsApp — send us your questions, your
                budget and your timeline, and we will respond with properties
                that match.
              </p>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rgl-btn"
              >
                <MessageCircle className="h-4 w-4" />
                CHAT ON WHATSAPP
              </a>
            </div>
          </article>
        </div>
      </section>
      <GetInTouch />
    </>
  );
}

function DiasporaBlocks({ blocks }: { blocks: DiasporaBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.k) {
          case "h2":
            return (
              <h2 key={i} className={H2}>
                {b.t}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className={H3}>
                {b.t}
              </h3>
            );
          case "lead":
            return (
              <p
                key={i}
                className="text-[18px] leading-[1.8] font-medium text-[#141414] mt-8 mb-4"
              >
                {b.t}
              </p>
            );
          case "p":
            return (
              <p key={i} className={P}>
                {b.t}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3 mb-6">
                {b.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                    <span className="text-[16px] leading-[1.8] text-[#666666]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "img":
            return <ArticleImage key={i} src={b.src} alt={b.alt} />;
          case "stats":
            return (
              <div key={i} className="grid gap-4 sm:grid-cols-3 my-10">
                {b.items.map((s) => (
                  <div
                    key={s.big}
                    className="border border-[#ebebeb] bg-[#f4f4f4] p-5 text-center"
                  >
                    <p className="text-[28px] lg:text-[32px] text-[#D9453D] leading-tight mb-1">
                      {s.big}
                    </p>
                    <p className="text-[13px] leading-[1.6] text-[#666666]">
                      {s.small}
                    </p>
                  </div>
                ))}
              </div>
            );
          case "hr":
            return <hr key={i} className="my-10 border-[#ebebeb]" />;
          default:
            return null;
        }
      })}
    </>
  );
}

/* ============================== Post: Serviced land ============================== */

const LAND_ADVANTAGES = [
  "Appreciation — as Accra expands, well-located plots rise in value, often outpacing finished homes in stagnant areas.",
  "No depreciation — unlike a building, land does not leak, crack or need a new roof. It waits, and it grows.",
  "Flexibility — build now, build in five years, or hold the plot as a legacy for your children.",
  "Entry level — a serviced plot lets you enter the property market at a fraction of the cost of a finished house.",
  "Demand — Ghana’s housing shortfall keeps steady pressure on land for both homes and businesses.",
];

const LAND_SERVICES = [
  {
    label: "Roads & Access",
    text: "Graded, motorable roads within the layout, with proper access connecting every plot to the main road.",
  },
  {
    label: "Underground Drainage",
    text: "Drainage channels that move stormwater away from the plots and protect them from flooding.",
  },
  {
    label: "Electricity",
    text: "Power distribution available within the layout, ready for connection when you build.",
  },
  {
    label: "Water Supply",
    text: "Access to potable water connections for each plot, so your future home is never thirsty.",
  },
];

const LAND_BUYERS = [
  {
    name: "First-time builders",
    desc: "Start small, build at your own pace, and expand the design as your income grows.",
  },
  {
    name: "Diaspora families",
    desc: "Secure your piece of home now and build when you return — with our team keeping watch in between.",
  },
  {
    name: "Growing families",
    desc: "Buy the plot next to where you want to live, for the home you will build tomorrow.",
  },
  {
    name: "Businesses & investors",
    desc: "Commercial plots along developing corridors, ready for shops, offices and warehouses.",
  },
];

const LAND_VERIFICATION = [
  "Registered survey plan — the plot’s exact boundaries are documented with the Lands Commission.",
  "Title search — we confirm the true allodial or leasehold owner and rule out litigation, double sales and encumbrances.",
  "Site plan — a proper layout showing your plot number, road access and the position of every plot around it.",
  "Written consent — where family or stool land is involved, the right heads are party to the sale and the documents.",
  "Indenture and registration — your ownership documents are prepared, signed and processed for registration.",
];

const LAND_STEPS = [
  {
    label: "Step 1 — Enquire & shortlist",
    text: "Tell us your budget and purpose (residential or commercial). We shortlist plots that fit and share the site plans.",
  },
  {
    label: "Step 2 — Site visit or video tour",
    text: "Walk the plots in person or join a live video tour from abroad. We show you boundaries, beacons and access roads.",
  },
  {
    label: "Step 3 — Documentation & searches",
    text: "We run the title search and verification checks, then prepare the agreement and indenture for your review.",
  },
  {
    label: "Step 4 — Payment & agreement",
    text: "Pay into verified accounts against a written agreement, and collect official receipts for every instalment.",
  },
  {
    label: "Step 5 — Beacon confirmation & handover",
    text: "Beacons are confirmed on the ground against the site plan, and your documents are processed for registration.",
  },
];

export function PostLandView() {
  return (
    <>
      <PageBanner title="Affordable Serviced Land Plots In Accra" />
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <article className="max-w-3xl mx-auto">
            <PostMeta date="November 16, 2025" cats={["Land"]} />

            <ArticleImage
              src={IMG_LAND_AERIAL}
              alt="Aerial view of serviced land plots for sale in Accra from KGE Properties"
              className="mt-8 mb-10"
            />

            <p className="text-[18px] leading-[1.9] text-[#141414] mb-6">
              Land remains one of the most reliable stores of value in Accra.
              With a serviced plot, you are not just buying soil — you are
              buying roads you can drive on, drainage that carries the rains
              away, electricity you can connect to, water you can pipe, and the
              peace of mind that the paperwork is clean.
            </p>
            <p className={P}>
              KGE Properties offers affordable serviced residential and
              commercial land for sale in developing parts of Accra — plots to
              suit first-time builders, families planning ahead, and businesses
              looking for their next address.
            </p>

            <h2 className={H2}>Why land is a solid investment in Accra</h2>
            <p className={P}>
              Accra is growing outwards every year, and every new school,
              interchange and shopping centre pushes land values further along
              the map. For buyers who cannot yet afford a finished house, land
              is the door into the market:
            </p>
            <ul className="space-y-3 mb-8">
              {LAND_ADVANTAGES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <ArticleImage
              src={IMG_LAND_PLOTS}
              alt="Serviced residential land plots for sale in Accra"
            />

            <h2 className={H2}>What “serviced” actually means</h2>
            <p className={P}>
              Anyone can call land “serviced”. At KGE Properties, the word
              means something specific — infrastructure you can see and test
              before you pay:
            </p>
            <ul className="space-y-5 mb-8">
              {LAND_SERVICES.map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    <strong className="font-semibold text-[#141414]">
                      {f.label}:{" "}
                    </strong>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className={H2}>Who our plots are for</h2>
            <p className={P}>
              Different buyers come to land for different reasons — and our
              plots are priced and positioned to welcome all of them:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 my-8">
              {LAND_BUYERS.map((z) => (
                <a
                  key={z.name}
                  href="/land-for-sale"
                  className="group border border-[#ebebeb] p-5 hover:border-[#D9453D] transition-colors"
                >
                  <h3 className="text-[17px] mb-1 group-hover:text-[#D9453D] transition-colors">
                    {z.name}
                  </h3>
                  <p className="text-[13px] text-[#666666] mb-3">{z.desc}</p>
                  <span className="text-[12px] font-semibold tracking-wide uppercase text-[#D9453D] inline-flex items-center gap-1.5">
                    EXPLORE PLOTS
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </div>

            <h2 className={H2}>How KGE keeps land litigation-free</h2>
            <p className={P}>
              The most expensive land in Ghana is the plot that ends up in
              court. Land litigation has swallowed the savings of too many
              buyers — which is why verification comes before marketing on
              every plot we handle:
            </p>
            <ul className="space-y-3 mb-8">
              {LAND_VERIFICATION.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className={H3}>Beaconing &amp; the site plan</h3>
            <p className={P}>
              On the ground, your plot is only real when it is beaconed.
              Beacons are the physical pillars that mark the exact corners of
              your plot, and they must match the coordinates on the site plan —
              not “roughly”, but exactly. Before any handover, we confirm the
              beacons against the registered survey with you present, or with
              you on a live video call if you are buying from abroad.
            </p>
            <p className={P}>
              This one step — matching paper to ground — is what separates a
              plot you can build on with confidence from a plot that becomes a
              decade-long dispute. We insist on it for every buyer, every time.
            </p>

            <ArticleImage
              src={IMG_LAND_COMMERCIAL}
              alt="Commercial serviced land for sale along a developing corridor in Accra"
            />

            <h2 className={H2}>Your buying journey, step by step</h2>
            <ul className="space-y-5 mb-8">
              {LAND_STEPS.map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    <strong className="font-semibold text-[#141414]">
                      {f.label}:{" "}
                    </strong>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className={H2}>The earlier, the better</h2>
            <p className={P}>
              Land rewards patience — but it punishes hesitation. Every year,
              the corridors that were “too far” become the neighbourhoods
              everyone wishes they had bought into, and the affordable plots of
              today set the prices of tomorrow.
            </p>
            <p className={P}>
              Whether you want a plot to build on next year or an investment to
              hold for the next decade, our team will show you what is
              available today, verify everything before you pay, and walk with
              you from first enquiry to registered documents.
            </p>

            <CtaCard
              title="Enquire About Serviced Plots"
              text="Ready to secure an affordable serviced plot in Accra? Contact KGE Properties today — our team will guide you from site visit to registered documents."
              linkLabel="ENQUIRE ABOUT SERVICED PLOTS"
              href="/contact"
            />
          </article>
        </div>
      </section>
      <GetInTouch />
    </>
  );
}

/* ============================== Contact ============================== */

export function ContactView() {
  return (
    <>
      <PageBanner title="Contact Us" />

      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-[30px] lg:text-[38px]">GET IN TOUCH</h2>
            <p className="text-[16px] leading-[1.9] mt-4">
              We’re here to assist you with any inquiries you may have. Feel
              free to get in touch with us using the following contact
              information:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-[#ebebeb] p-6 hover:border-[#D9453D] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all">
              <span className="flex h-12 w-12 items-center justify-center bg-[#D9453D] text-white mb-5">
                <Phone className="h-5 w-5" />
              </span>
              <h3 className="text-[18px] mb-2">Phone &amp; WhatsApp</h3>
              <p className="text-[15px] leading-[1.8] text-[#666666] mb-4">
                <a
                  href={CONTACT.phoneHref}
                  className="hover:text-[#D9453D] transition-colors"
                >
                  024 466 1538
                </a>
                {" / "}
                <a
                  href={CONTACT.phone2Href}
                  className="hover:text-[#D9453D] transition-colors"
                >
                  020 821 4895
                </a>
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href={CONTACT.phoneHref}
                  className="text-[13px] font-semibold uppercase tracking-wide text-[#D9453D] hover:text-[#1A1A1A] transition-colors"
                >
                  Call us
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-semibold uppercase tracking-wide text-[#D9453D] hover:text-[#1A1A1A] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="border border-[#ebebeb] p-6 hover:border-[#D9453D] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all">
              <span className="flex h-12 w-12 items-center justify-center bg-[#D9453D] text-white mb-5">
                <Mail className="h-5 w-5" />
              </span>
              <h3 className="text-[18px] mb-2">Email us</h3>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[15px] leading-[1.8] text-[#666666] hover:text-[#D9453D] transition-colors break-all"
              >
                {CONTACT.email}
              </a>
            </div>

            <div className="border border-[#ebebeb] p-6 hover:border-[#D9453D] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all">
              <span className="flex h-12 w-12 items-center justify-center bg-[#D9453D] text-white mb-5">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="text-[18px] mb-2">Location</h3>
              <p className="text-[15px] leading-[1.8] text-[#666666]">
                {CONTACT.address}
              </p>
            </div>

            <div className="border border-[#ebebeb] p-6 hover:border-[#D9453D] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all">
              <span className="flex h-12 w-12 items-center justify-center bg-[#D9453D] text-white mb-5">
                <Clock className="h-5 w-5" />
              </span>
              <h3 className="text-[18px] mb-2">Office Hours</h3>
              <ul className="text-[15px] leading-[1.8] text-[#666666] space-y-1">
                {CONTACT.hours.map(([day, hours]) => (
                  <li key={day}>
                    {day}: <span className="font-medium text-[#141414]">{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4]">
        <div className="rgl-container py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[30px] lg:text-[38px] text-center mb-8">
              Have any questions?
            </h2>
            <ContactFormSection />
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}

/* ============================== Privacy Policy ============================== */

export function PrivacyPolicyView() {
  return (
    <>
      <PageBanner title="Privacy Policy" />
      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <article className="max-w-3xl mx-auto">
            <h2 className={H2}>Protecting Your Privacy</h2>
            <p className={P}>
              At KGE Properties Ltd (“KGE Properties”, “we”, “us”), we take the
              privacy of our clients and visitors seriously. This Privacy
              Policy outlines how we collect, use, and disclose information
              from visitors to our website, kgeproperties.com (the
              “Website”).
            </p>

            <h2 className={H2}>Information We Collect</h2>
            <p className={P}>
              We may collect the following types of information when you visit
              our Website:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                <span className="text-[16px] leading-[1.8] text-[#666666]">
                  <strong className="font-semibold text-[#141414]">
                    Personal Information:{" "}
                  </strong>
                  We collect the details you voluntarily provide through our
                  contact form or when you subscribe to property alerts — such
                  as your name, email address, phone number, and the houses,
                  offices or plots you are interested in.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                <span className="text-[16px] leading-[1.8] text-[#666666]">
                  <strong className="font-semibold text-[#141414]">
                    Non-Personal Information:{" "}
                  </strong>
                  We may automatically collect non-personal information about
                  your visit to the Website, such as your browser type,
                  operating system, IP address, and the pages you visit. This
                  information is used for internal purposes only, such as
                  analyzing website traffic and improving user experience.
                </span>
              </li>
            </ul>

            <h2 className={H2}>Cookies</h2>
            <p className={P}>
              We use cookies on our Website. Cookies are small data files that
              are stored on your device when you visit a website. They help us
              to remember information about your visit, such as your preferred
              language and other settings, which can improve your browsing
              experience and make the next visit easier and more efficient.
            </p>
            <p className={P}>
              You can choose to disable cookies through your browser settings.
              However, please note that disabling cookies may limit your
              ability to use certain features of the Website.
            </p>

            <h2 className={H2}>Use of Information</h2>
            <p className={P}>
              We may use the information we collect for the following purposes:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "To respond to your enquiries, viewing requests and questions about our listings",
                "To send you property alerts and updates on new houses, offices and plots (with your consent)",
                "To analyze website traffic and improve user experience",
                "To personalize your experience on the Website",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D9453D] shrink-0 mt-1" />
                  <span className="text-[16px] leading-[1.8] text-[#666666]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className={H2}>We Do Not Sell Your Data</h2>
            <p className={P}>
              We do not sell, rent or trade your personal information with
              anyone. Your details are used by our own team to serve you — and
              for nothing else.
            </p>

            <h2 className={H2}>Sharing of Information</h2>
            <p className={P}>
              We will not share your personal information with third parties
              without your consent, except as necessary to fulfill your
              requests or comply with legal requirements.
            </p>
            <p className={P}>
              We may share non-personal information with third-party service
              providers who help us operate the Website and analyze website
              traffic.
            </p>

            <h2 className={H2}>Data Security</h2>
            <p className={P}>
              We take reasonable steps to protect the information we collect
              from unauthorized access, disclosure, alteration, or destruction.
              However, no website can be guaranteed to be 100% secure.
            </p>

            <h2 className={H2}>Your Rights</h2>
            <p className={P}>
              You have the right to access, update, or delete your personal
              information from our records at any time. You can also opt out of
              receiving property alerts and other communications from us.
            </p>

            <h2 className={H2}>Children’s Privacy</h2>
            <p className={P}>
              Our Website is not directed to children under the age of 13. We
              do not knowingly collect personal information from children under
              13.
            </p>

            <h2 className={H2}>Changes to this Policy</h2>
            <p className={P}>
              We may update this Privacy Policy from time to time. We will post
              any changes to this Policy on the Website. We encourage you to
              review this Privacy Policy periodically for any updates.
            </p>

            <h2 className={H2}>Contact Us</h2>
            <p className={P}>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[#D9453D] font-medium hover:text-[#1A1A1A] transition-colors"
              >
                {CONTACT.email}
              </a>
              .
            </p>

            <div className="flex flex-wrap items-center gap-3 border-t border-[#ebebeb] pt-8 mt-10">
              <span className="inline-flex items-center gap-2 bg-[#f4f4f4] text-[#666666] text-[13px] px-4 py-2">
                <Calendar className="h-4 w-4 text-[#D9453D]" />
                Effective Date: January 01, 2025
              </span>
            </div>
            <p className="text-[15px] leading-[1.9] text-[#666666] mt-6">
              By using our Website, you agree to the terms of this Privacy
              Policy and Cookie Policy.
            </p>
          </article>
        </div>
      </section>
      <GetInTouch />
    </>
  );
}

/* ============================== Property detail ============================== */

const SITE_FALLBACK_LINE =
  "Contact our sales team on 024 466 1538 or 020 821 4895 for the full specification, current availability and payment options for this property.";

const PROPERTY_EXTRA_PARAGRAPHS = [
  "Every house, office and plot marketed by KGE Properties is inspected by our team before it is listed, and we are happy to walk you through every detail — from the floor layout and finishes to the access roads and the documentation behind the sale.",
  "Payment options vary by property. Where the owner allows it, our team can discuss installment agreements, staged payments and mortgage guidance — and we will arrange a viewing at a time that suits you, in person or by live video tour.",
];

const STATUS_TAGS = new Set(["For Sale", "To Let", "For Rent", "Sold", "Rented"]);

const TAG_FEATURES: Record<string, string[]> = {
  "Gated Community": ["Gated community", "24/7 security"],
  "Fitted Kitchen": ["Fitted kitchen"],
  "Standby Generator": ["Standby generator"],
  Security: ["24/7 security"],
  Parking: ["Dedicated parking"],
  "Title Documents": ["Title documents ready"],
  Serviced: ["Serviced — roads, drainage, electricity & water", "Title documents ready"],
  Furnished: ["Furnished"],
  Expandable: ["Expandable design"],
  Apartment: ["Apartment unit"],
  Office: ["Office space"],
  Commercial: ["Commercial use"],
};

function featuresFor(property: Property): string[] {
  const tags = property.tags ?? [];
  const out: string[] = [];
  for (const t of tags) {
    if (STATUS_TAGS.has(t)) continue;
    for (const f of TAG_FEATURES[t] ?? [t]) {
      if (!out.includes(f)) out.push(f);
    }
  }
  return out;
}

function listingFor(href: string): { href: string; label: string } {
  if (href.includes("office")) {
    return { href: "/offices-for-let", label: "Offices To Let & For Sale" };
  }
  if (href.includes("land")) {
    return { href: "/land-for-sale", label: "Land For Sale" };
  }
  return { href: "/houses-for-sale", label: "Houses For Sale" };
}

const normHref = (href: string) => href.replace(/\/+$/, "");

function PropertyDetailInner({ property }: { property: Property }) {
  const gallery = (property.images ?? []).filter(
    (src) => typeof src === "string" && src.length > 0
  );
  const slides = gallery.length > 0 ? gallery : property.img ? [property.img] : [];
  const [index, setIndex] = useState(0);
  const current = slides.length > 0 ? index % slides.length : 0;

  const listing = listingFor(property.href);
  const excerptBase = (property.excerpt ?? "")
    .replace(/…\s*$/, "")
    .replace(/\.{3}\s*$/, "")
    .trim();
  const paragraphs = excerptBase
    ? [excerptBase, ...PROPERTY_EXTRA_PARAGRAPHS]
    : [SITE_FALLBACK_LINE, ...PROPERTY_EXTRA_PARAGRAPHS];
  const features = featuresFor(property);
  const tags = property.tags ?? [];
  const shareUrl = `${SITE_URL}${property.href}`;

  const related = ALL_PROPERTIES.filter(
    (p) => normHref(p.href) !== normHref(property.href)
  ).slice(0, 3);

  const prev = () =>
    setIndex((i) => (slides.length ? (i - 1 + slides.length) % slides.length : 0));
  const next = () =>
    setIndex((i) => (slides.length ? (i + 1) % slides.length : 0));

  return (
    <>
      {/* Breadcrumb bar */}
      <div className="bg-[#f4f4f4] border-b border-[#ebebeb]">
        <div className="rgl-container py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-2 text-[13px] text-[#999999]"
          >
            <a href="/" className="hover:text-[#D9453D] transition-colors">
              Homepage
            </a>
            <ChevronRight className="h-3.5 w-3.5" />
            <a
              href={listing.href}
              className="hover:text-[#D9453D] transition-colors"
            >
              {listing.label}
            </a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#666666]">{property.title}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white">
        <div className="rgl-container py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Gallery */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
                {slides.length > 0 ? (
                  <Image
                    src={slides[current]}
                    alt={`${property.title} — image ${current + 1} of ${slides.length}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                ) : null}
                {slides.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-white/90 text-[#141414] hover:bg-[#D9453D] hover:text-white transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-white/90 text-[#141414] hover:bg-[#D9453D] hover:text-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <span className="absolute bottom-4 right-4 bg-black/60 text-white text-[12px] px-3 py-1">
                      {current + 1} / {slides.length}
                    </span>
                  </>
                ) : null}
              </div>

              {slides.length > 1 ? (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {slides.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Show image ${i + 1}`}
                      className={`relative w-24 h-[70px] shrink-0 overflow-hidden border-2 transition-colors ${
                        i === current ? "border-[#D9453D]" : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${property.title} thumbnail ${i + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : null}

              {/* Title, price & meta */}
              <div className="mt-12">
                <h1 className="text-[26px] lg:text-[30px] leading-snug mb-5">
                  {property.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-[#D9453D] text-white text-[15px] font-semibold px-4 py-2">
                    {property.price}
                  </span>
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-[12px] bg-[#f4f4f4] text-[#666666] px-3 py-1.5 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[#ebebeb] py-4 mb-8 text-[14px] text-[#666666]">
                  {property.beds ? (
                    <li className="inline-flex items-center gap-2">
                      <BedDouble className="h-4 w-4 text-[#D9453D]" />
                      <span>
                        <b className="font-semibold text-[#141414]">
                          {property.beds}
                        </b>{" "}
                        bedrooms
                      </span>
                    </li>
                  ) : null}
                  {property.baths ? (
                    <li className="inline-flex items-center gap-2">
                      <Bath className="h-4 w-4 text-[#D9453D]" />
                      <span>
                        <b className="font-semibold text-[#141414]">
                          {property.baths}
                        </b>{" "}
                        bathrooms
                      </span>
                    </li>
                  ) : null}
                  {property.size ? (
                    <li className="inline-flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-[#D9453D]" />
                      <span>
                        <b className="font-semibold text-[#141414]">
                          {property.size}
                        </b>{" "}
                        m² floor area
                      </span>
                    </li>
                  ) : null}
                </ul>

                {/* Description */}
                <SectionLabel>description</SectionLabel>
                {paragraphs.map((para, i) => (
                  <p key={i} className={P}>
                    {para}
                  </p>
                ))}

                {features.length > 0 ? (
                  <>
                    <h3 className="text-[17px] mb-4">Amenities &amp; Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {features.map((t) => (
                        <span
                          key={t}
                          className="text-[12px] bg-[#f4f4f4] text-[#666666] px-3 py-1.5 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                ) : null}

                {/* Share / back */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#ebebeb] mt-10 pt-6">
                  <a
                    href={listing.href}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-[#141414] hover:text-[#D9453D] transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to {listing.label}
                  </a>
                  <span className="text-[13px] text-[#999999]">Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] text-[#666666] hover:text-[#D9453D] transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${property.title} — ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] text-[#666666] hover:text-[#D9453D] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar card */}
            <aside className="lg:col-span-1">
              <div className="border border-[#ebebeb] p-6 lg:sticky lg:top-24">
                <p className="text-[28px] lg:text-[32px] text-[#D9453D] leading-tight mb-5">
                  {property.price}
                </p>
                <ul className="border-y border-[#ebebeb] py-4 mb-6 space-y-3 text-[14px] text-[#666666]">
                  {property.beds ? (
                    <li className="flex items-center gap-3">
                      <BedDouble className="h-4 w-4 text-[#D9453D]" />
                      <span>
                        <b className="font-semibold text-[#141414]">
                          {property.beds}
                        </b>{" "}
                        bedrooms
                      </span>
                    </li>
                  ) : null}
                  {property.baths ? (
                    <li className="flex items-center gap-3">
                      <Bath className="h-4 w-4 text-[#D9453D]" />
                      <span>
                        <b className="font-semibold text-[#141414]">
                          {property.baths}
                        </b>{" "}
                        bathrooms
                      </span>
                    </li>
                  ) : null}
                  {property.size ? (
                    <li className="flex items-center gap-3">
                      <Ruler className="h-4 w-4 text-[#D9453D]" />
                      <span>
                        <b className="font-semibold text-[#141414]">
                          {property.size}
                        </b>{" "}
                        m² floor area
                      </span>
                    </li>
                  ) : null}
                </ul>
                <a
                  href={CONTACT.phoneHref}
                  className="rgl-btn w-full justify-center mb-3"
                >
                  <Phone className="h-4 w-4" />
                  CALL 024 466 1538
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rgl-btn rgl-btn-dark w-full justify-center mb-3"
                >
                  <MessageCircle className="h-4 w-4" />
                  WHATSAPP US
                </a>
                <a
                  href="/contact"
                  className="block text-center text-[13px] font-semibold uppercase tracking-wide text-[#141414] hover:text-[#D9453D] transition-colors"
                >
                  REQUEST A VIEWING
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related properties */}
      {related.length > 0 ? (
        <section className="bg-[#f4f4f4]">
          <div className="rgl-container py-16 lg:py-20">
            <SectionLabel>related properties</SectionLabel>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.href} property={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <GetInTouch />
    </>
  );
}

export function PropertyDetailView({ property }: { property?: Property }) {
  if (!property) {
    return (
      <>
        <PageBanner title="Property" />
        <section className="bg-white">
          <div className="rgl-container py-20 lg:py-28 text-center">
            <h2 className="text-[26px] lg:text-[30px] mb-4">
              Property not found
            </h2>
            <p className="text-[16px] leading-[1.9] text-[#666666] mb-8 max-w-xl mx-auto">
              The property you are looking for is not available. Browse our
              currently available houses, offices and plots instead.
            </p>
            <a href="/houses-for-sale" className="rgl-btn">
              VIEW AVAILABLE HOMES
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
        <GetInTouch />
      </>
    );
  }
  return <PropertyDetailInner property={property} />;
}
