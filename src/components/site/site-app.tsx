"use client";

import { useEffect } from "react";
import { RouterProvider, useRouter } from "@/lib/router";
import HomeView from "@/components/site/views/home-view";
import {
  CorporateOverviewView,
  HallmarksView,
  BrandStoryView,
  HowWeAreOrganisedView,
  OurTeamView,
} from "@/components/site/views/about-views";
import {
  OurServicesView,
  HousesView,
  OfficesView,
  LandView,
  ArchitecturalDrawingsView,
} from "@/components/site/views/expertise-views";
import {
  HousesForSaleView,
  HousesToLetView,
  OfficesForLetView,
  LandForSaleView,
} from "@/components/site/views/listings-views";
import {
  BuyAHouseView,
  HowToBuyView,
  WhyTrustedView,
} from "@/components/site/views/buy-views";
import {
  NewsInsightsView,
  PostDreamHomeView,
  PostDiasporaView,
  PostLandView,
  ContactView,
  PrivacyPolicyView,
  PropertyDetailView,
} from "@/components/site/views/news-views";
import { ALL_PROPERTIES } from "@/data/properties";
import { COMPANY } from "@/data/site";

const TITLES: Record<string, string> = {
  "/": "KGE Properties | Houses, Offices & Land in Accra, Ghana",
  "/corporate-overview": "Overview | KGE Properties",
  "/hallmarks": "Why Choose Us | KGE Properties",
  "/brand-story": "Brand Story | KGE Properties",
  "/how-we-are-organised": "How We Are Organised | KGE Properties",
  "/our-team": "Our Team | KGE Properties",
  "/our-services": "Our Services | KGE Properties",
  "/houses": "Houses To Let & For Sale | KGE Properties",
  "/offices": "Offices To Let & For Sale | KGE Properties",
  "/land": "Land For Sale | KGE Properties",
  "/architectural-drawings": "Architectural Drawings | KGE Properties",
  "/houses-for-sale": "Houses For Sale | KGE Properties",
  "/houses-to-let": "Houses To Let | KGE Properties",
  "/offices-for-let": "Offices To Let & For Sale | KGE Properties",
  "/land-for-sale": "Land For Sale | KGE Properties",
  "/buy-a-house": "Find A Property | KGE Properties",
  "/how-to-rent-or-buy": "How To Rent Or Buy | KGE Properties",
  "/why-choose-kge": "Why Choose KGE | KGE Properties",
  "/news-insights": "News & Insights | KGE Properties",
  "/how-to-own-your-dream-home-without-paying-everything-upfront":
    "How To Own Your Dream Home Without Paying Everything Upfront | KGE Properties",
  "/why-diaspora-buyers-choose-kge-properties":
    "Why Diaspora Buyers Choose KGE Properties | KGE Properties",
  "/affordable-serviced-land-plots-in-accra":
    "Affordable Serviced Land Plots In Accra | KGE Properties",
  "/contact": "Contact | KGE Properties",
  "/privacy-policy": "Privacy Policy | KGE Properties",
};

function NotFoundView() {
  return (
    <section className="bg-white">
      <div className="rgl-container py-24 text-center">
        <p className="text-[13px] font-semibold tracking-[3px] uppercase text-[#D9453D] mb-4">
          404 — Page Not Found
        </p>
        <h1 className="text-[34px] lg:text-[46px] mb-5">We couldn’t find that page</h1>
        <p className="text-[17px] mb-8 max-w-xl mx-auto">
          The page you are looking for may have been moved or no longer exists. Explore our
          properties or get in touch with our team.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/" className="rgl-btn">
            BACK TO HOMEPAGE
          </a>
          <a href="/houses-for-sale" className="rgl-btn rgl-btn-dark">
            SEARCH PROPERTIES
          </a>
        </div>
      </div>
    </section>
  );
}

function AppRoutes() {
  const { path } = useRouter();

  const isPropertyPath = path.startsWith("/property/");
  const property = isPropertyPath
    ? ALL_PROPERTIES.find((p) => p.href.replace(/\/+$/, "") === path)
    : undefined;

  useEffect(() => {
    if (isPropertyPath) {
      document.title = property
        ? `${property.title} | ${COMPANY.shortName}`
        : `Property Not Found | ${COMPANY.shortName}`;
    } else {
      document.title = TITLES[path] ?? `KGE Properties | Houses, Offices & Land in Accra, Ghana`;
    }
  }, [path, isPropertyPath, property]);

  // Property detail views: /property/<slug>
  if (isPropertyPath) {
    return <PropertyDetailView property={property} />;
  }

  switch (path) {
    // ===== HOME =====
    case "/":
      return <HomeView />;

    // ===== ABOUT KGE =====
    case "/corporate-overview":
      return <CorporateOverviewView />;
    case "/hallmarks":
      return <HallmarksView />;
    case "/brand-story":
      return <BrandStoryView />;
    case "/how-we-are-organised":
      return <HowWeAreOrganisedView />;
    case "/our-team":
      return <OurTeamView />;

    // ===== OUR SERVICES =====
    case "/our-services":
      return <OurServicesView />;
    case "/houses":
      return <HousesView />;
    case "/offices":
      return <OfficesView />;
    case "/land":
      return <LandView />;
    case "/architectural-drawings":
      return <ArchitecturalDrawingsView />;

    // ===== PROPERTY LISTINGS =====
    case "/houses-for-sale":
      return <HousesForSaleView />;
    case "/houses-to-let":
      return <HousesToLetView />;
    case "/offices-for-let":
      return <OfficesForLetView />;
    case "/land-for-sale":
      return <LandForSaleView />;

    // ===== GUIDES =====
    case "/buy-a-house":
      return <BuyAHouseView />;
    case "/how-to-rent-or-buy":
      return <HowToBuyView />;
    case "/why-choose-kge":
      return <WhyTrustedView />;

    // ===== NEWS / ARTICLES =====
    case "/news-insights":
      return <NewsInsightsView />;
    case "/how-to-own-your-dream-home-without-paying-everything-upfront":
      return <PostDreamHomeView />;
    case "/why-diaspora-buyers-choose-kge-properties":
      return <PostDiasporaView />;
    case "/affordable-serviced-land-plots-in-accra":
      return <PostLandView />;

    // ===== MISC =====
    case "/contact":
      return <ContactView />;
    case "/privacy-policy":
      return <PrivacyPolicyView />;

    default:
      return <NotFoundView />;
  }
}

export default function SiteApp() {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
}
