import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "RK Properties | Luxury MVDA Approved Real Estate in Vrindavan",
  description: "Premium MVDA approved plots, residential developments, and strategic investment properties in the sacred land of Vrindavan. Trusted by 1,200+ NRI & HNIs.",
  keywords: ["RK Properties", "Vrindavan Real Estate", "MVDA Approved Plots", "Luxury Township Vrindavan", "Investment Plots Mathura", "NRI Investment Vrindavan"],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "RK Properties | Luxury MVDA Approved Real Estate in Vrindavan",
    description: "Secure high-yielding MVDA Approved Plots in Vrindavan's high-appreciation corridors.",
    type: "website",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "RK Properties Vrindavan",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Chhatikara Road, near Prem Mandir",
                "addressLocality": "Vrindavan",
                "addressRegion": "UP",
                "postalCode": "281121",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "27.5706",
                "longitude": "77.6789"
              }
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