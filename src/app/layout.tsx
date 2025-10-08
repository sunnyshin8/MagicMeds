import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MagicMeds - AI-Powered Healthcare Platform",
  description: "Multilingual healthcare platform providing AI-powered consultations, offline support, and culturally sensitive care for rural and urban communities in India.",
  keywords: ["healthcare", "telemedicine", "AI diagnosis", "multilingual", "India", "rural healthcare", "offline healthcare"],
  authors: [{ name: "MagicMeds Team" }],
  creator: "MagicMeds",
  publisher: "MagicMeds",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://magicmeds.com",
    title: "MagicMeds - AI-Powered Healthcare Platform",
    description: "Multilingual healthcare platform providing AI-powered consultations, offline support, and culturally sensitive care.",
    siteName: "MagicMeds",
  },
  twitter: {
    card: "summary_large_image",
    title: "MagicMeds - AI-Powered Healthcare Platform",
    description: "Multilingual healthcare platform providing AI-powered consultations, offline support, and culturally sensitive care.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1d4ed8' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MagicMeds" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        {children}
      </body>
    </html>
  );
}
