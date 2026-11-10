"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  ChevronRight,
  Loader2,
  ArrowUp,
} from "lucide-react";
import { FOOTER_LINKS_1, FOOTER_LINKS_2, CONTACT } from "@/data/site";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-all hover:bg-[#D9453D] hover:border-[#D9453D]"
    >
      {children}
    </a>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      id="rgl-backtop"
      className={visible ? "showbacktop" : ""}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // silent
    }
    setSubscribing(false);
  };

  return (
    <>
      {/* ===== KGE Properties banner (pre-footer CTA) ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/kge/hero-house.jpg"
            alt="KGE Properties houses for sale in Accra"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="rgl-container relative py-16 lg:py-20 text-center lg:flex lg:items-center lg:justify-between lg:text-left">
          <div className="lg:max-w-2xl">
            <p className="text-[#D9453D] font-semibold tracking-[3px] text-[13px] uppercase mb-3">
              KGE Properties
            </p>
            <h2 className="text-white text-[28px] md:text-[38px] leading-[1.25] font-normal">
              Houses, offices &amp; land{" "}
              <span className="text-[#D9453D]">to let and for sale in Accra</span>
            </h2>
          </div>
          <div className="mt-6 lg:mt-0">
            <a href="/houses-for-sale" className="rgl-btn">
              VIEW AVAILABLE PROPERTIES
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== Main footer ===== */}
      <footer className="bg-[#1b1b1b] text-[#a5a5a5] mt-auto">
        <div className="rgl-container py-14 lg:py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* About */}
            <div className="lg:col-span-4">
              <h2 className="text-white text-[22px] mb-4">KGE Properties Ltd</h2>
              <p className="text-[14px] leading-[1.9]">
                Your trusted real estate partner in Accra, Ghana. KGE Properties offers houses and
                offices to let and for sale, land for sale, plus professional architectural
                drawings — all under one roof.
              </p>
              <p className="text-[14px] leading-[1.9] mt-3">
                Call us today on{" "}
                <a href={CONTACT.phoneHref} className="text-white hover:text-[#D9453D]">
                  024 466 1538
                </a>{" "}
                /{" "}
                <a href={CONTACT.phone2Href} className="text-white hover:text-[#D9453D]">
                  020 821 4895
                </a>{" "}
                and let us help you find your next property.
              </p>
              <div className="flex gap-3 mt-6">
                <SocialIcon href="https://www.facebook.com/" label="Facebook">
                  <Facebook className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="https://www.youtube.com/" label="Youtube">
                  <Youtube className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="https://twitter.com/" label="Twitter">
                  <Twitter className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/" label="Instagram">
                  <Instagram className="h-4 w-4" />
                </SocialIcon>
              </div>
            </div>

            {/* Useful links */}
            <div className="lg:col-span-3">
              <h2 className="text-white text-[22px] mb-5">Useful Links</h2>
              <ul className="space-y-2.5">
                {FOOTER_LINKS_1.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] inline-flex items-center gap-2 hover:text-[#D9453D] transition-colors"
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-[#D9453D]" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <ul className="space-y-2.5 lg:mt-16">
                {FOOTER_LINKS_2.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14px] inline-flex items-center gap-2 hover:text-[#D9453D] transition-colors"
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-[#D9453D]" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe */}
            <div className="lg:col-span-3">
              <h2 className="text-white text-[22px] mb-5">Subscribe</h2>
              <p className="text-[14px] mb-4">
                Subscribe to our newsletter to receive updates on our latest offers and news.
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  required
                  className="flex-1 min-w-0 bg-white text-black text-[14px] px-4 py-3 outline-none"
                  aria-label="Your Email Address"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="rgl-btn !py-3 !px-5 shrink-0"
                  aria-label="subscribe"
                >
                  {subscribing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </form>
              {subscribed && (
                <p className="text-[13px] text-[#D9453D] mt-3">
                  Thank you for subscribing to our newsletter!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-white/10">
          <div className="rgl-container py-5 text-center text-[13px]">
            Copyright © 2025 |{" "}
            <strong className="text-white font-semibold">
              <a href="/" className="text-white hover:text-[#D9453D] transition-colors">
                KGE Properties Ltd
              </a>
            </strong>{" "}
            | All Rights Reserved |
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
