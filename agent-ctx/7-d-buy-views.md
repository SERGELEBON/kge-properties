# Task 7-d — Buy Views Rebrand (3 components)

## Deliverable
`/home/z/my-project/src/components/site/views/buy-views.tsx` (rewritten, `"use client"`, TS strict, next/image)

## Exports (exact names)
1. **`BuyAHouseView`** — route `/buy-a-house`
   - PageBanner "Find A Property".
   - Hero intro: 2-col grid (h2 "Let us find the right house, office or land for you." + para + CTA "get started" → `/houses-for-sale`; right Photo `keys-handover.jpg` aspect-[4/3]).
   - "What are you looking for?" — bg-[#f4f4f4], 4 image quick-link cards (EAST_NEWS card pattern: article > Photo aspect-[4/3] > p-5 h3 hover-link): Houses For Sale → `/houses-for-sale` (house-exterior-1.jpg); Houses To Let → `/houses-to-let` (townhouse-let.jpg); Offices To Let & For Sale → `/offices-for-let` (office-exterior.jpg); Land For Sale → `/land-for-sale` (land-plots.jpg). Grid `sm:grid-cols-2 lg:grid-cols-4`.
   - "Featured Picks From Our Listings" — bg-white, PropertyCard row of HOUSES_FOR_SALE[0], HOUSES_TO_LET[0], LAND_PLOTS[0], OFFICES[0] in `md:grid-cols-2 lg:grid-cols-4` + centered CTA "VIEW ALL PROPERTIES".
   - GetInTouch.

2. **`HowToBuyView`** — route `/how-to-rent-or-buy`
   - PageBanner "How To Rent Or Buy"; max-w-4xl intro.
   - 4-step numbered timeline (original STAGES design kept: vertical `bg-[#ebebeb]` line at `lg:left-[27px]`, 56px number squares `border-2 border-[#D9453D]`, article cards `p-6 lg:p-10`, "Step N" accent label, 2-col text+Photo `aspect-video`):
     1. Tell Us What You Need (bullets: 024 466 1538 / 020 821 4895 / WhatsApp +233 24 466 1538; img office-exterior.jpg)
     2. View Shortlisted Properties (physical + video tours; img interior-living.jpg)
     3. Documentation & Negotiation (title search, agreements; img office-interior.jpg; `after` paragraph)
     4. Payment & Handover (receipts, keys, optional management; img keys-handover.jpg; `after` paragraph)
   - `PaymentBand` (original InstallmentBand design, bg `#880000` → **`#1A1A1A`**, img apartment-let.jpg).
   - "Documents You'll Need" — 2 cards (bg-[#f4f4f4] border cards): Buying (ID, proof of funds, TIN, lawyer) / Renting (ID, passport photos, guarantor, 6–12 months advance rent) + contact line with `CONTACT.phoneHref/phone2Href/whatsapp` links.
   - FAQ — 4 `<details>` accordion items (plain HTML, no deps): deposit, agency fees, instalments, buying remotely from abroad. ChevronDown `group-open:rotate-180`.
   - GetInTouch.

3. **`WhyTrustedView`** — route `/why-choose-kge`
   - PageBanner "Why Choose KGE"; full-width image band `h-[280px] lg:h-[440px]` (house-exterior-2.jpg).
   - Intro + CTA "SEE HOW WE WORK" → `/how-to-rent-or-buy`.
   - "The KGE Difference" — 6 icon cards (ADOM_BENEFITS pattern, icon squares `bg-[#D9453D]`): Litigation-Free Guarantee (ShieldCheck), Transparent Pricing (Banknote), Local Expertise In Accra (MapPin), Full Service From Search To Handover (KeyRound), In-House Architectural Drawings (PenTool), After-Sales & Property Management (Wrench). Grid `sm:grid-cols-2 lg:grid-cols-3`.
   - Stats strip (border-l-4 accent blocks, adapted from the "17,000" stat pattern): 200+ Properties Matched / 4 Core Services / 100% Document Verification / 7 Days Avg. First Shortlist. SectionLabel "track record".
   - Testimonial quote section (SectionLabel "what our clients say"; lead quote `text-[19px] lg:text-[22px] leading-[1.7] text-black` + attribution, second quote below divider): diaspora homeowner K. Owusu, office tenant M. Adei (Airport City).
   - GetInTouch.

## Design fidelity
- Layout, section rhythm (white → #f4f4f4 → white…), `py-16 lg:py-20`, `rgl-container`, `H2`/`P` constants, local `CTA`/`Photo` helpers, PropertyCard rows and timeline markup all mirror the original file exactly.
- Colors swapped: `#f36e3e` → `#D9453D`, `#880000` → `#1A1A1A` (PaymentBand). `#ebebeb`/`#f4f4f4`/`#666666` unchanged. No old-orange anywhere.
- Content: English only, no old-brand terms (verified via grep — only remaining case-insensitive "rgl" hits are the project's `rgl-btn`/`rgl-container` CSS utility class names used by the design system, not content).
- All images from the allowed `/images/kge/` list only.
- Imports all used: `PageBanner, SectionLabel, GetInTouch, PropertyCard` (shared), `CONTACT` (data/site), `HOUSES_FOR_SALE, HOUSES_TO_LET, OFFICES, LAND_PLOTS` (data/properties), `Image`, lucide icons (`Banknote, CheckCircle2, ChevronDown, ChevronRight, KeyRound, MapPin, PenTool, ShieldCheck, Wrench`), types `ReactNode`, `LucideIcon`.

## Verification
- `bunx tsc --noEmit`: **zero errors in buy-views.tsx** (remaining project errors are pre-existing in other files: site-app.tsx imports for views owned by other tasks, scripts/, examples/).
- `bun run lint`: passes clean.
- No dev server / build run, per instructions.
