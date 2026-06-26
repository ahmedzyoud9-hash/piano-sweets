import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Tajawal } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Piano Sweets | بيانو",
  description:
    "شوكولا فاخرة مؤلَّفة كالموسيقى — بيانو، شوكولاتيه فرنسية فاخرة من الكويت.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cormorant.variable} ${jost.variable} ${tajawal.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
