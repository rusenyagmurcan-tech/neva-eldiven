import type { Metadata } from "next";
import "./globals.css";

// SEO ve Global Tanıtım Ayarları
export const metadata: Metadata = {
  title: {
    default: "Neva Safety | Industrial Hand Protection Solutions",
    template: "%s | Neva Safety"
  },
  description: "Premium safety gloves manufacturer in Turkiye. High-performance EN388 certified industrial protection for global markets.",
  keywords: ["safety gloves", "industrial protection", "Turkish manufacturer", "export gloves", "EN388 gloves"],
  authors: [{ name: "Neva Safety" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico", // Varsa logonun küçük hali
  },
  openGraph: {
    title: "Neva Safety Technologies",
    description: "Superior Protection from Turkiye to the World.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}