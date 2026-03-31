import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { CartProvider } from "@/components/providers/CartProvider";

export const metadata: Metadata = {
	title: "Ayurra Herbal - Natural Skincare Solutions",
	description:
		"Discover the power of nature with Ayurra Herbal. Our premium herbal skincare products are crafted with care and backed by science to provide effective, natural solutions for your everyday care.",
	keywords: [
		"Ayurra Herbal",
		"natural skincare",
		"herbal products",
		"premium skincare",
		"natural beauty",
		"herbal remedies",
		"skincare solutions",
	],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <noscript>
            <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
          </noscript>
          {children}
          <Script src="/reveal.js" strategy="afterInteractive" />
        </CartProvider>
      </body>
    </html>
  );
}
