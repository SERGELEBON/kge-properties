# Task 2-b — Expertise Views (5 components)

## Deliverable
`/home/z/my-project/src/components/site/views/expertise-views.tsx` (878 lines, `"use client"`)

## Exports
- `OurExpertiseView` — PageBanner "Our Expertise"; intro (h2 "Our Expertise in The Housing Market" + intro para, image right); 2 market-segment cards (Low-to-Middle / Middle-to-Upper, full paras incl. 2nd para of M2U); Target Audience section with 60% stat chip; Commercial Construction Expertise with 2 feature cards (Notable Clients / Projects, Landmark + HardHat icons); closing paragraph; CTAs "Updates" → `/news-insights`, "Start Application" → `/contact`; GetInTouch.
- `SatelliteCityView` — ImageBanner hero (`/images/2024/01/MGL0202_HDR_edit-1.webp`, title "A new and vibrant Urban Oasis.", subtitle "Regimanuel Satellite City"); 3 cards The Place / The Plan / Unleashing Value (title+body = full scraped div texts, MapPin/PenTool/TrendingUp); "A new and vibrant Urban Oasis." + Planned 17,000 homes para + image; "East Legon Hills. Amrahia. Katamanso. Adenta" + para + bordered 2×2 direction list (South/West/East/North) + caption "Accra’s New Real Estate Buzz"; maroon band "The harmony of family life and city living" + ArrowLink "Find OUT MORE" → `/how-to-buy-a-house-at-regimanuel-gray-accra`; "You’ll love living here." + all 9 paragraphs (Read-more line styled maroon) + ArrowLink "Explore Our Neighbourhood" → `/regimanuel-satellite-city-east-legon-hills-accra`; GetInTouch.
- `OtherHousingView` — PageBanner "Other Housing Developments"; h2 "Building for a lifetime" + intro + ArrowLink "get started" → `/houses-for-sale-in-accra-the-pearls`; 6 project cards (image top aspect-video, meta rows MapPin/Calendar/Banknote/Building2):
  1. Regimanuel Satellite City — East Legon Hills, 2034 (Year Completion), $3,000,000,000
  2. Kwabenya Estate apartments — 272 apartments (Scale row), Kwabenya, 2025, $33,000,000
  3. Affordable gated community (East Legon Hills) — 500 houses, 2025, $62,000,000
  4. Klagon — 500 houses, Klagon Accra, 2025, $600,000,000
  5. Grafton, Freetown Sierra Leone — Recipient Regimanuel Gray SL Ltd, 2009, $100,000,000
  6. Goderich, Freetown — Recipient Regimanuel Gray SL Ltd, 2011, $14,500,000
  ; GetInTouch.
- `InfrastructureView` — PageBanner "Infrastructure & Site Services"; h2 "Infrastructure Development Expertise" + intro; 5 cards: Dunkonah Site Services (Weija, 2002, $3,000,000); UESD Bunso Site Clearance (Bunso, 2020, GHc4,400,000); Mamahuma Channel Klagon (Gov of Ghana, Ongoing, $18,000,000); 10.5km Amanfrom-Katamanso-Zeenu road (GHA Urban Roads, Ongoing, GHc81,356,581.80); Opponso-Esaase-Kyei feeder roads (GHA Feeder Roads, On-hold, GHc14,056,843.32). Same card style; GetInTouch.
- `CommercialView` — PageBanner "Commercial Development"; h2 "A wealth of experience in Commercial Development" + intro + ArrowLink "get started" → `/contact`; 11 cards in `md:grid-cols-2 lg:grid-cols-3` (Sierrablock duplicate de-duped), icon banners (GraduationCap/Building2/Landmark/Factory/Store/Hospital), meta rows Recipient/Location/Year Completed/Project Cost — Soul Clinic 1998 $450,000; RG Head Office 2000 $1,500,000; East Airport Community Center 2005 $1,800,000; Calvary Methodist School 2001 $400,000; Desjoyaux 2006 $750,000; Sierrablock 2006 $1,200,000; Promasidor 2007 $1,500,000; NASSIT Makeni 2013 $5,580,000; Beacon College 2014 $925,000; UNFPA Freetown 2017 $153,675.44; Rokupa hospital 2019 $1,397,000; GetInTouch.

## Verified image paths (all grep-checked against image-inventory.txt)
- `/images/2024/01/MGL0202_HDR_edit-1.webp` (satellite hero + Satellite City card)
- `/images/elementor/thumbs/2d-qbf1jltlpamkex2s2f991kiyfcdldsdro66dj5g97s.jpg` (satellite oasis section, scraped img)
- `/images/2023/08/Airport-Estate.jpg` (satellite location section + Goderich card)
- `/images/2023/08/IMG_0015-1-1024x683.jpg` (our-expertise intro)
- `/images/2023/08/The-Rubies-formerly-1.jpg` (Kwabenya apartments)
- `/images/2025/06/The-front-view-of-the-3-bed-bedroom-storey-house-at-Regimanuel-Satellite-City.jpg` (affordable gated)
- `/images/2023/08/IMG_0031-1-1024x683.jpg` (Klagon)
- `/images/2023/08/IMG_9466-1024x683.jpg` (Grafton)
- `/images/2023/08/Capture.png` (Dunkonah), `IMG_0046-2-1024x683.jpg` (UESD), `IMG_0044-1-1024x683.jpg` (Mamahuma), `IMG_0033-1-1024x683.jpg` (road), `IMG_0039-1-1024x683.jpg` (feeder roads)

## Fidelity notes
- Script-verified every scraped text item from content.json against the file (whitespace-normalized). All present; scrape label prefixes ("Description –", "Location –", etc.) rendered as field labels + values in meta rows.
- Apostrophes matched byte-exact: satellite-city Plan/Unleashing texts use straight `'` ("we're", "Accra's", "Area.We're"); other texts use curly `’`. Kept scrape typos verbatim ("maiority", "easy acces", "Siera Leone", trailing "–" in Dunkonah desc).
- satellite-city[0] is an exact duplicate of [6] except one period — rendered once via [6] wording.
- tsc --noEmit: zero errors for this file. No existing files modified; no other files created.
