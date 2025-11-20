import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ThemeRegistry from './ThemeRegistry';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MagicMeds - Your AI Healthcare Assistant",
  description: "Get instant answers to your health-related questions with our AI-powered healthcare assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased m-0 p-0">
        <ThemeRegistry>
          <NavBar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
