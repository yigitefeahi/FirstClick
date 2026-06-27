import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FirstClick — Ürününü kullanıcı gözünden test et",
  description:
    "AI destekli kullanıcı simülasyonu platformu. Ürün fikrinizi gerçek kullanıcıya çıkmadan farklı persona profilleriyle test edin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
