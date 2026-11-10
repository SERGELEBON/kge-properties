"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { NAV } from "@/data/site";
import { useRouter } from "@/lib/router";

function hasChildren(item: (typeof NAV)[number]) {
  return Boolean(item.children && item.children.length);
}

function MenuLink({
  label,
  href,
  badge,
  onClick,
}: {
  label: string;
  href?: string;
  badge?: string;
  onClick?: () => void;
}) {
  const isExternal = href?.startsWith("http");
  const cls = "block px-5 py-3 text-[13px] font-medium tracking-wide text-[#000000] hover:text-[#f36e3e] hover:bg-[#f8f8f8] transition-colors";
  if (!href) {
    return <span className={cls}>{label}</span>;
  }
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {label}
        {badge ? (
          <span className="ml-2 inline-block bg-[#f36e3e] text-white text-[10px] font-semibold px-1.5 py-0.5 leading-none align-middle">
            {badge}
          </span>
        ) : null}
      </a>
    );
  }
  return (
    <a href={href} className={cls} onClick={onClick}>
      {label}
      {badge ? (
        <span className="ml-2 inline-block bg-[#f36e3e] text-white text-[10px] font-semibold px-1.5 py-0.5 leading-none align-middle">
          {badge}
        </span>
      ) : null}
    </a>
  );
}

export default function SiteHeader() {
  const { path: pathname } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenMobile(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="rgl-container flex items-center justify-between py-3 lg:px-8">
          {/* Logo */}
          <a href="/" aria-label="KGE Properties - Home" className="relative shrink-0 py-1">
            <img
              src="/images/kge/logo.svg"
              alt="KGE Properties"
              width={176}
              height={44}
              className="h-9 w-auto lg:h-11"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
            {NAV.map((item) => (
              <div key={item.label} className="relative group">
                {item.href ? (
                  <a
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-4 text-[13px] font-semibold tracking-wide transition-colors hover:text-[#f36e3e] ${
                      pathname === item.href ? "text-[#f36e3e]" : "text-black"
                    }`}
                  >
                    {item.label}
                    {hasChildren(item) && (
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    )}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-4 text-[13px] font-semibold tracking-wide text-black transition-colors hover:text-[#f36e3e]"
                    aria-haspopup={hasChildren(item)}
                  >
                    {item.label}
                    {hasChildren(item) && (
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    )}
                  </button>
                )}

                {hasChildren(item) && (
                  <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-0 top-full z-50 min-w-[260px] bg-white border-t-2 border-[#f36e3e] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                    <ul className="py-2">
                      {item.children!.map((sub) => (
                        <li key={sub.label} className="relative group/sub">
                          {sub.href ? (
                            <MenuLink label={sub.label} href={sub.href} badge={sub.badge} />
                          ) : (
                            <span className="flex items-center justify-between px-5 py-3 text-[13px] font-semibold tracking-wide text-black">
                              {sub.label}
                              <ChevronRight className="h-3.5 w-3.5 text-[#f36e3e]" />
                            </span>
                          )}
                          {sub.children && sub.children.length > 0 && (
                            <div className="invisible opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 transition-all duration-200 absolute left-full top-0 z-50 min-w-[280px] bg-white border-t-2 border-[#f36e3e] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                              <ul className="py-2">
                                {sub.children.map((s2) => (
                                  <li key={s2.label}>
                                    <MenuLink label={s2.label} href={s2.href} badge={s2.badge} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a href="/houses-for-sale" className="rgl-btn hidden sm:inline-flex">
              FIND A PROPERTY
            </a>
            <button
              type="button"
              className="xl:hidden inline-flex items-center justify-center h-11 w-11 text-black"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* maroon bottom line like the original shape-bottom */}
        <div className="h-[5px] w-full bg-[#880000]" />
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full inset-x-0 xl:hidden bg-white z-40 max-h-[calc(100vh-96px)] overflow-y-auto border-t border-[#ebebeb] shadow-lg">
          <nav className="rgl-container py-4 pb-24" aria-label="Mobile navigation">
            <ul>
              {NAV.map((item) => (
                <li key={item.label} className="border-b border-[#ebebeb]">
                  <div className="flex items-center justify-between">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex-1 px-2 py-4 text-[15px] font-semibold tracking-wide text-black"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="flex-1 px-2 py-4 text-[15px] font-semibold tracking-wide text-black">
                        {item.label}
                      </span>
                    )}
                    {hasChildren(item) && (
                      <button
                        type="button"
                        className="p-3 text-black"
                        onClick={() => setOpenMobile(openMobile === item.label ? null : item.label)}
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={openMobile === item.label}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            openMobile === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {openMobile === item.label && hasChildren(item) && (
                    <ul className="pb-2">
                      {item.children!.map((sub) => (
                        <li key={sub.label} className="border-t border-[#f4f4f4] first:border-t-0">
                          <div className="flex items-center justify-between">
                            {sub.href ? (
                              <a
                                href={sub.href}
                                className="flex-1 px-6 py-3 text-[14px] font-medium text-[#444444]"
                                onClick={closeMobileMenu}
                              >
                                {sub.label}
                                {sub.badge ? (
                                  <span className="ml-2 inline-block bg-[#f36e3e] text-white text-[10px] font-semibold px-1.5 py-0.5 leading-none align-middle">
                                    {sub.badge}
                                  </span>
                                ) : null}
                              </a>
                            ) : (
                              <span className="flex-1 px-6 py-3 text-[14px] font-semibold text-black">
                                {sub.label}
                              </span>
                            )}
                            {sub.children && sub.children.length > 0 && (
                              <button
                                type="button"
                                className="p-2 text-black"
                                onClick={() =>
                                  setOpenMobile(
                                    openMobile === `${item.label}/${sub.label}` ? item.label : `${item.label}/${sub.label}`
                                  )
                                }
                                aria-label={`Toggle ${sub.label} submenu`}
                              >
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${
                                    openMobile === `${item.label}/${sub.label}` ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                            )}
                          </div>
                          {openMobile === `${item.label}/${sub.label}` && sub.children && (
                            <ul className="pb-2">
                              {sub.children.map((s2) => (
                                <li key={s2.label}>
                                  <a
                                    href={s2.href || "#"}
                                    className="block px-10 py-3 text-[13px] font-medium text-[#666666] hover:text-[#f36e3e]"
                                    onClick={closeMobileMenu}
                                  >
                                    {s2.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
