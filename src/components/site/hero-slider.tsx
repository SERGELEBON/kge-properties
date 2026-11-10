"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface Slide {
  image: string;
  kicker: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  align?: "left" | "center";
}

const SLIDES: Slide[] = [
  {
    image: "/images/kge/hero-house.jpg",
    kicker: "KGE Properties",
    title: "Houses To Let & For Sale",
    text: "From cosy starter homes to expansive family residences — find a house that fits your life and your budget in Accra.",
    cta: "Browse Houses",
    href: "/houses-for-sale",
    align: "left",
  },
  {
    image: "/images/kge/hero-office.jpg",
    kicker: "KGE Properties",
    title: "Offices To Let & For Sale",
    text: "Grade A offices and suites in prime business districts, ready for your team to move in and start working.",
    cta: "View Offices",
    href: "/offices-for-let",
    align: "left",
  },
  {
    image: "/images/kge/hero-land.jpg",
    kicker: "KGE Properties",
    title: "Land For Sale",
    text: "Litigation-free serviced and commercial plots in fast developing areas — secure your investment today.",
    cta: "See Plots",
    href: "/land-for-sale",
    align: "left",
  },
  {
    image: "/images/kge/arch-blueprint.jpg",
    kicker: "KGE Properties",
    title: "Architectural Drawings",
    text: "Professional building plans and working drawings that take your project from idea to approval.",
    cta: "Learn More",
    href: "/architectural-drawings",
    align: "left",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((idx: number) => {
    setCurrent(idx);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      setAnimKey((k) => k + 1);
    }, 9000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    // reset interval on manual navigation
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      setAnimKey((k) => k + 1);
    }, 9000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="relative h-[540px] md:h-[620px] lg:h-[700px] overflow-hidden bg-black" aria-label="Hero slider">
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          aria-hidden={i !== current}
        >
          <div className="absolute inset-0">
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === current ? "rgl-kenburns" : ""}`}
              key={`${i}-${animKey === 0 && i === 0 ? "first" : i === current ? animKey : "static"}`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
        </div>
      ))}

      {/* Slide content */}
      <div className="rgl-container relative z-20 h-full flex items-center" key={animKey}>
        <div className="max-w-2xl">
          <p className="rgl-slide-title text-white/90 tracking-[5px] uppercase text-[13px] font-medium mb-4">
            {slide.kicker}
          </p>
          <h2 className="rgl-slide-title text-white text-[42px] md:text-[56px] lg:text-[64px] font-normal leading-[1.1] mb-5">
            {slide.title}
          </h2>
          <p className="rgl-slide-sub text-white/85 text-[17px] md:text-[19px] leading-[1.7] mb-8 max-w-xl">
            {slide.text}
          </p>
          <div className="rgl-slide-btn">
            <a href={slide.href} className="rgl-btn">
              {slide.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="rgl-dots absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === current ? "rgl-active" : ""}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
