import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { FloatingCallButton } from "@/components/FloatingCallButton";
import { Header } from "@/components/Header";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MATCO Frigo & Elektro | Servis i prodaja klima uređaja",
  description:
    "Prvi nacrt sajta za servis, ugradnju i prodaju klima uređaja. Sadržaj će biti prilagođen prema finalnim materijalima klijenta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <FloatingCallButton />
        </div>
      </body>
    </html>
  );
}
