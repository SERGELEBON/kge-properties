import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from "@/components/site/header";
import SiteFooter from "@/components/site/footer";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KGE Properties | Houses, Offices & Land in Accra, Ghana",
    template: "%s | KGE Properties",
  },
  description:
    "KGE Properties — houses and offices to let and for sale, land for sale and professional architectural drawings in Accra, Ghana. Call 024 466 1538 / 020 821 4895.",
  keywords: [
    "KGE Properties",
    "houses for sale Accra",
    "houses to let Accra",
    "offices to let Ghana",
    "land for sale Ghana",
    "architectural drawings Accra",
    "real estate Ghana",
  ],
  icons: {
    icon: "/images/kge/favicon.svg",
    apple: "/images/kge/favicon.svg",
  },
  openGraph: {
    title: "KGE Properties | Houses, Offices & Land in Accra, Ghana",
    description:
      "Houses and offices to let and for sale, land for sale and architectural drawings in Accra, Ghana. Call 024 466 1538 / 020 821 4895.",
    siteName: "KGE Properties",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} antialiased min-h-screen flex flex-col`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
