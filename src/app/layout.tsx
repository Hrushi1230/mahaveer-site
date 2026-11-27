import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { SITE, LOGO } from "@/lib/site";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const title =
  "Mahaveer Driving Training School Bhadrak | Learn Car Driving in Bhadrak, Odisha";
const description =
  "Mahaveer Driving Training School in Bhadrak, Odisha — beginner driving lessons, practical road training, traffic rules & road safety, parking practice and driving licence guidance. Call 7008827825.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  keywords: [
    "driving school in Bhadrak",
    "driving training school Bhadrak",
    "learn car driving in Bhadrak",
    "car driving classes Bhadrak",
    "driving instructor Bhadrak",
    "driving lessons in Bhadrak Odisha",
    "driving licence guidance Bhadrak",
    "Mahaveer Driving Training",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE.name,
    title,
    description,
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  name: SITE.name,
  description,
  url: SITE.url,
  logo: `${SITE.url}${LOGO.src}`,
  image: `${SITE.url}/opengraph-image.jpg`,
  slogan: SITE.tagline,
  telephone: SITE.phones.map((x) => `+91${x.raw}`),
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: SITE.locality },
  sameAs: [SITE.instagram, SITE.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-racing focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
