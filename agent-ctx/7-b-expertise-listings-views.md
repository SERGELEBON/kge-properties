# Task 7-b — Expertise + Listings views rewritten for KGE Properties

## Deliverables
1. `/home/z/my-project/src/components/site/views/expertise-views.tsx` — REWRITTEN (replaced old RGL content entirely), `"use client"`, TypeScript strict, next/image fill+sizes everywhere.
2. `/home/z/my-project/src/components/site/views/listings-views.tsx` — NEW FILE, same conventions.

Design unchanged: same section rhythm (`bg-white` / `bg-[#f4f4f4]` alternating, `py-16 lg:py-20`), `rgl-container` wrappers, SectionLabel + H2 pattern (`text-[30px] lg:text-[38px] leading-[1.2]`), body `text-[15px] leading-relaxed text-[#666666]`, borders `#ebebeb`, accent divider `h-[3px] w-12` blocks. Recolored per brand book: `#f36e3e` → `#D9453D` (hover `#C13B34`), `#880000` → `#1A1A1A`, `#0f1a18` → `#141414`. No indigo/blue.

## File 1 exports (5)
- `OurServicesView` (/our-services) — PageBanner "Our Services"; intro; 4 alternating image/text rows (aspect-[4/3] images, `i % 2 === 1 → lg:order-2` pattern from original Infrastructure rows): Houses To Let & For Sale (house-exterior-1.jpg → /houses), Offices To Let & For Sale (office-exterior.jpg → /offices), Land For Sale (land-plots.jpg → /land), Architectural Drawings (arch-blueprint.jpg → /architectural-drawings); each row has `bg-[#D9453D]` icon square + 2 paragraphs + ArrowLink; GetInTouch.
- `HousesView` (/houses) — PageBanner "Houses — To Let & For Sale" + ImageBanner (hero-house.jpg, subtitle "KGE PROPERTIES SERVICE"); intro 2-col with interior-living.jpg; buying vs renting as 2 border cards (original SEGMENT_CARDS pattern); 5 icon-bullet highlights (FileCheck title documents ready, ShieldCheck gated communities, Wallet flexible payment terms, Wrench property management, KeyRound move-in ready) in 2-col icon checklist; ListingPreview with HOUSES_FOR_SALE[0..1] + HOUSES_TO_LET[0..1] (`lg:grid-cols-4`) + ArrowLinks → /houses-for-sale, /houses-to-let; GetInTouch.
- `OfficesView` (/offices) — PageBanner "Offices — To Let & For Sale" + ImageBanner (hero-office.jpg, "KGE PROPERTIES SERVICE"); intro 2-col with office-interior.jpg; 3 InfoCards (Serviced Suites/Zap, Flexible Terms/Clock, Parking & Power/Car) on `md:grid-cols-3`; ListingPreview OFFICES[0..1] (`lg:grid-cols-2`) + ArrowLink → /offices-for-let; GetInTouch.
- `LandView` (/land) — PageBanner "Land For Sale" + ImageBanner (hero-land.jpg, "KGE PROPERTIES SERVICE"); intro 2-col with land-aerial.jpg (text left); 6-bullet KGE land promise checklist (litigation-free, serviced roads, electricity, water, survey & documentation, commercial plots); ListingPreview LAND_PLOTS[0..1] + ArrowLink → /land-for-sale; GetInTouch.
- `ArchitecturalDrawingsView` (/architectural-drawings) — PageBanner "Architectural Drawings" + ImageBanner (arch-blueprint.jpg, "KGE PROPERTIES SERVICE"); intro; 6 deliverable icon cards (Site Plans/Map, Floor Plans/LayoutGrid, Elevations/Building2, Working Drawings/Ruler, 3D Renders/Box, Permit Submission Support/ClipboardList); 4 numbered process steps (01 Consultation → 02 Concept Design → 03 Detailed Drawings → 04 Approval & Support, `md:grid-cols-2 lg:grid-cols-4`, numbers in `#D9453D`); 2-col arch-cad.jpg + CheckCircle2 checklist (6 items); pricing note "Contact us for a quote — 024 466 1538 / 020 821 4895" with `tel:` links (CONTACT.phoneHref/phone2Href) + ArrowLink → /contact; GetInTouch.

## File 2 exports (4)
- `HousesForSaleView` (/houses-for-sale) — PageBanner "Houses For Sale"; intro; count strip "5 houses available" (number in `#D9453D`, border-y strip); grid `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` of PropertyCard for all 5 HOUSES_FOR_SALE; note strip "Can’t find what you’re looking for? Call 024 466 1538 / 020 821 4895 — new listings arrive every week." (Phone icon in `#1A1A1A` square, tel: links); GetInTouch.
- `HousesToLetView` (/houses-to-let) — PageBanner "Houses To Let"; same pattern, all 3 HOUSES_TO_LET, "3 houses available".
- `OfficesForLetView` (/offices-for-let) — PageBanner "Offices To Let & For Sale"; same pattern, OFFICES (2), "2 offices available".
- `LandForSaleView` (/land-for-sale) — PageBanner "Land For Sale"; same pattern, LAND_PLOTS (2), "2 plots available" (PropertyCard renders size in m², as agreed).

Both files share local building blocks (P, H2, ListingPreview/ListingView, CallNote etc. defined per-file, no cross-file imports).

## Verified
- `bunx tsc --noEmit`: zero errors in both files (remaining project errors are in other agents' files: about-views, news-views, site-app PostLandView, scripts, examples — untouched by me).
- `bunx eslint` on both files: clean, no unused imports.
- Grep-verified: no "Regimanuel"/"RGL"/"Satellite City"/"The Pearls"/"Adom Gate"/"East Airport"/"Pharma" strings and no old colors `#f36e3e` / `#880000` / `#0f1a18` in either file. Only layout class prefix `rgl-container` kept (design system).
- All internal links within allowed routes; all images from `/images/kge/` allowlist; `PropertyCard`, `PageBanner`, `SectionLabel`, `GetInTouch`, `ArrowLink`, `ImageBanner`, `type Property` imported from `@/components/site/shared`; data from `@/data/properties` and `@/data/site`.
- Did NOT run dev server or build, per instructions.
