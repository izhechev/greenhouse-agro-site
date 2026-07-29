import type { Metadata } from "next";
import { Unbounded, Golos_Text } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCta from "@/components/StickyMobileCta";
import MetaPixel from "@/components/MetaPixel";
import { site } from "@/lib/site-config";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} – Ремонт на покриви в цяла България`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "ремонт на покриви",
    "покривен ремонт",
    "пренареждане на керемиди",
    "хидроизолация на покрив",
    "тенекеджийски услуги",
    "изграждане на нов покрив",
    "ремонт на покрив цена",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: site.brand,
    title: `${site.brand} – Ремонт на покриви в цяла България`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} – Ремонт на покриви в цяла България`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: site.legalName,
  alternateName: site.brand,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: `+${site.phones[0].href}`,
  areaServed: "BG",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BG",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html
      lang="bg"
      className={`${unbounded.variable} ${golos.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal text-cream pb-14 sm:pb-0">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {pixelId && (
          <Suspense fallback={null}>
            <MetaPixel pixelId={pixelId} />
          </Suspense>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
