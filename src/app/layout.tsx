import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "RK Properties | Luxury MVDA Approved Real Estate in Vrindavan",
  description:
    "Secure high-yielding MVDA Approved Plots in Vrindavan's high-appreciation corridors. Trusted by 1,200+ NRI & HNIs. Premium townships, residential plots, and strategic investment properties with 100% litigation-free title guarantee.",
  keywords: [
    "RK Properties Vrindavan",
    "MVDA Approved Plots Vrindavan",
    "Luxury Township Vrindavan",
    "NRI Investment Vrindavan",
    "Investment Plots Mathura",
    "Chhatikara Real Estate",
    "Vrindavan Property Investment",
    "Yamuna Expressway Plots",
    "Chandrodaya Temple Nearby Plots",
    "Vrindavan Residential Plots",
    "Govardhan Property Vrindavan",
    "RERA Approved Vrindavan",
  ],
  authors: [{ name: "RK Properties Vrindavan" }],
  creator: "RK Properties Ltd.",
  publisher: "RK Properties Ltd.",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "RK Properties | Luxury MVDA Approved Real Estate in Vrindavan",
    description:
      "Secure high-yielding MVDA Approved Plots in Vrindavan. 18-24% annual appreciation. Trusted by 1,200+ NRIs. Zero litigation guarantee.",
    type: "website",
    locale: "en_IN",
    url: "https://www.rkproperties.in",
    siteName: "RK Properties Vrindavan",
  },
  twitter: {
    card: "summary_large_image",
    title: "RK Properties | MVDA Approved Real Estate in Vrindavan",
    description:
      "Premium plots with 18-24% annual returns. Trusted by 1,200+ investors. Zero litigation guarantee.",
  },
  alternates: {
    canonical: "https://www.rkproperties.in",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Structured Data: RealEstateAgent */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "RK Properties Vrindavan",
              "description": "Premium MVDA Approved Real Estate in Vrindavan — Trusted by 1,200+ NRI & HNI Investors",
              "url": "https://www.rkproperties.in",
              "telephone": "+919115277000",
              "email": "listings@rkproperties.in",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Chhatikara Road, near Prem Mandir",
                "addressLocality": "Vrindavan",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "281121",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 27.5706,
                "longitude": 77.6789
              },
              "areaServed": [
                {
                  "@type": "Place",
                  "name": "Vrindavan, Mathura District"
                },
                {
                  "@type": "Place",
                  "name": "Chhatikara Corridor, Vrindavan"
                }
              ],
              "priceRange": "₹18,202 - ₹45,000 per sq. yard",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 4.9,
                "reviewCount": 6,
                "bestRating": 5
              },
              "sameAs": [
                "https://www.instagram.com/rkproperties",
                "https://www.youtube.com/@rkproperties",
                "https://www.facebook.com/rkpropertiesvrindavan",
                "https://www.linkedin.com/company/rkproperties"
              ]
            })
          }}
        />

        {/* Structured Data: FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What does 'MVDA Approved' mean, and why is it mandatory in Vrindavan?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MVDA stands for Mathura Vrindavan Development Authority. MVDA approval guarantees that land complies with government zoning laws, masterplan roads, green reserves, and utility guidelines. Buying non-approved land risks demolition and lack of registry safety."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the historic and expected appreciation rates for land in Vrindavan?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Vrindavan has seen 18% to 24% annual appreciation over the last 5 years, driven by 20M+ annual pilgrims, the 70-story Chandrodaya Temple, and UP government infrastructure investment."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}