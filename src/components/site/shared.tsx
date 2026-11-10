import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { CONTACT } from "@/data/site";

/** Dark top banner used on inner pages (title + breadcrumb-like bar) */
export function PageBanner({ title }: { title: string }) {
  return (
    <section className="relative bg-[#1A1A1A] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="rgl-container relative py-14 lg:py-20">
        <h1 className="text-white text-[34px] lg:text-[46px] font-normal leading-[1.214]">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-[13px] text-white/80 mt-3 font-medium tracking-wide">
          <a href="/" className="hover:text-[#D9453D] transition-colors">
            Homepage
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>{title}</span>
        </div>
      </div>
      <div className="h-[5px] w-full bg-[#D9453D]" />
    </section>
  );
}

/** Small label above headings, like the elementor dividers ("highlights", "news") */
export function SectionLabel({ children, light }: { children: string; light?: boolean }) {
  return (
    <div className="rgl-divider-label mb-5">
      <span className={`text-[13px] font-semibold tracking-[3px] uppercase ${light ? "text-white/70" : "text-[#999999]"}`}>
        {children}
      </span>
      <span className="line flex-1" />
    </div>
  );
}

/** "get in touch" CTA section used on several inner pages */
export function GetInTouch() {
  return (
    <section className="relative overflow-hidden bg-[#141414]">
      <div className="rgl-container py-14 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[#D9453D] font-semibold tracking-[3px] text-[13px] uppercase mb-3">
              get in touch
            </p>
            <h2 className="text-white text-[26px] lg:text-[34px] mb-6 leading-[1.4]">
              <a href={CONTACT.phoneHref} className="hover:text-[#D9453D] transition-colors">
                024 466 1538
              </a>{" "}
              /{" "}
              <a href={CONTACT.phone2Href} className="hover:text-[#D9453D] transition-colors">
                020 821 4895
              </a>
            </h2>
            <div>
              <p className="text-white/70 text-[13px] font-semibold tracking-[2px] uppercase mb-4">
                OFFICE HOURS
              </p>
              <ul className="space-y-3">
                {CONTACT.hours.map(([day, hours]) => (
                  <li key={day} className="flex items-center gap-4">
                    <span className="w-16 h-10 flex items-center justify-center bg-[#D9453D] text-white">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <span className="text-white text-[15px]">
                      {day} - <strong className="font-semibold">{hours}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="/our-services"
              className="group border border-white/15 hover:border-[#D9453D] p-6 transition-colors"
            >
              <h3 className="text-white text-[18px] mb-2 group-hover:text-[#D9453D] transition-colors">
                Our Services
              </h3>
              <p className="text-white/60 text-[13px] mb-4">
                Houses, offices, land &amp; drawings
              </p>
              <span className="text-[#D9453D] text-[13px] font-semibold tracking-wide inline-flex items-center gap-2">
                EXPLORE
                <ChevronRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="/contact"
              className="group border border-white/15 hover:border-[#D9453D] p-6 transition-colors"
            >
              <h3 className="text-white text-[18px] mb-2 group-hover:text-[#D9453D] transition-colors">
                Request A Call Back
              </h3>
              <p className="text-white/60 text-[13px] mb-4">Our team is ready to assist you</p>
              <span className="text-[#D9453D] text-[13px] font-semibold tracking-wide inline-flex items-center gap-2">
                BOOK APPOINTMENT
                <ChevronRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="/contact"
              className="group border border-white/15 hover:border-[#D9453D] p-6 transition-colors"
            >
              <h3 className="text-white text-[18px] mb-2 group-hover:text-[#D9453D] transition-colors">
                Directions
              </h3>
              <p className="text-white/60 text-[13px] mb-4">{CONTACT.address}</p>
              <span className="text-[#D9453D] text-[13px] font-semibold tracking-wide inline-flex items-center gap-2">
                GET DIRECTIONS
                <ChevronRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="/news-insights"
              className="group border border-white/15 hover:border-[#D9453D] p-6 transition-colors"
            >
              <h3 className="text-white text-[18px] mb-2 group-hover:text-[#D9453D] transition-colors">
                Updates
              </h3>
              <p className="text-white/60 text-[13px] mb-4">New listings every week</p>
              <span className="text-[#D9453D] text-[13px] font-semibold tracking-wide inline-flex items-center gap-2">
                VIEW NEWS
                <ChevronRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Property data type + card */
export interface Property {
  href: string;
  title: string;
  price: string;
  excerpt?: string;
  beds?: string;
  baths?: string;
  size?: string;
  img?: string;
  images?: string[];
  tags?: string[];
}

export function PropertyCard({ property }: { property: Property }) {
  const { title, price, beds, baths, size, img, href, tags = [] } = property;
  return (
    <article className="group bg-white border border-[#ebebeb] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
        {img ? (
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
        <span className="absolute top-4 left-4 bg-[#D9453D] text-white text-[15px] font-semibold px-4 py-2">
          {price}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-[17px] leading-snug mb-2">
          <a href={href} className="hover:text-[#D9453D] transition-colors">
            {title}
          </a>
        </h3>
        <ul className="flex items-center gap-4 text-[13px] text-[#666666] border-b border-[#ebebeb] pb-4 mb-4">
          {beds ? (
            <li className="inline-flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B0BEC5" strokeWidth="2">
                <path d="M3 7v10M3 12h18M21 17v-4a2 2 0 0 0-2-2H3M3 7a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v5" />
              </svg>
              <b className="font-semibold text-black">{beds}</b> beds
            </li>
          ) : null}
          {baths ? (
            <li className="inline-flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B0BEC5" strokeWidth="2">
                <path d="M4 12h16M4 12v4a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4M7 12V5a2 2 0 0 1 4 0" />
              </svg>
              <b className="font-semibold text-black">{baths}</b> baths
            </li>
          ) : null}
          {size ? (
            <li className="inline-flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B0BEC5" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" />
                <path d="M8 8h8v8H8z" />
              </svg>
              <b className="font-semibold text-black">{size}</b> m²
            </li>
          ) : null}
        </ul>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[11px] bg-[#f4f4f4] text-[#666666] px-2.5 py-1 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/** Orange "VIEW" arrow link like the theme */
export function ArrowLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const inner = (
    <>
      <span>{children}</span>
      <ChevronRight className="h-4 w-4" />
    </>
  );
  const cls = "rgl-btn";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

/** Full-width image banner with title used at the top of sub pages */
export function ImageBanner({
  image,
  title,
  subtitle,
  height = "lg:h-[420px]",
  children,
}: {
  image: string;
  title: string;
  subtitle?: string;
  height?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`relative ${height} overflow-hidden`}>
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="rgl-container relative h-full flex flex-col justify-center">
        {subtitle ? (
          <p className="text-white/80 tracking-[4px] text-[14px] font-medium uppercase mb-3">
            {subtitle}
          </p>
        ) : null}
        <h1 className="text-white text-[32px] lg:text-[48px] max-w-4xl leading-[1.2]">{title}</h1>
        {children}
      </div>
    </section>
  );
}
