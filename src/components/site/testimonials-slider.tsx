"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "KGE Properties made buying our first home completely stress-free. They handled everything — the search, the paperwork and the final handover. Today we live in a house we truly love, and we recommend them to everyone.",
    name: "Mr. Kwabena Osei",
    role: "Homeowner, East Legon, Accra",
  },
  {
    quote:
      "I live abroad and needed a trustworthy agent to rent out my house. KGE found a reliable tenant within three weeks and still manages the property for me. Their communication is excellent — I always know what is happening.",
    name: "Mrs. Abena Sarpong",
    role: "Landlord, Diaspora Investor (UK)",
  },
  {
    quote:
      "We needed an office suite for our growing team, plus drawings for our own building project. KGE sorted both — the office lease was signed in days and their architectural drawings were approved without a single correction.",
    name: "Mr. Daniel Ampofo",
    role: "Managing Director, Tech Firm, Airport City",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [current]);

  const t = TESTIMONIALS[current];

  return (
    <div className="relative">
      <div className="mx-auto max-w-3xl text-center" key={current}>
        <div className="flex justify-center mb-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D9453D] text-white">
            <Quote className="h-6 w-6 fill-current" />
          </span>
        </div>
        <blockquote className="rgl-fade-in text-[18px] md:text-[22px] leading-[1.8] text-[#333333] italic">
          “{t.quote}”
        </blockquote>
        <div className="mt-8">
          <p className="text-black font-semibold text-[16px]">{t.name}</p>
          <p className="text-[#999999] text-[13px] mt-1 tracking-wide">{t.role}</p>
        </div>
      </div>
      <div className="rgl-dots mt-8 flex items-center justify-center gap-2.5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === current ? "rgl-active" : ""}
            onClick={() => setCurrent(i)}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
