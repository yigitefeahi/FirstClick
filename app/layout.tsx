import type { Metadata } from "next";
import { Space_Grotesk, Source_Sans_3 } from "next/font/google";
import { AuthProvider } from "@/lib/supabase/auth-context";
import { PreferencesProvider } from "@/lib/i18n/preferences-context";
import { THEME_STORAGE_KEY, LOCALE_STORAGE_KEY } from "@/lib/i18n/dictionaries";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FirstClick — Ürününüzü kullanıcı gözünden test edin",
  description:
    "ChatGPT fikir söyler. FirstClick, ürününüzü hatırlayan kullanıcılarla tekrar tekrar test eder.",
};

const themeBootScript = `
(function(){
  try {
    var t = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (t === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = t;
    var l = localStorage.getItem('${LOCALE_STORAGE_KEY}');
    if (l === 'en' || l === 'tr') document.documentElement.lang = l;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <PreferencesProvider>
          <AuthProvider>{children}</AuthProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
