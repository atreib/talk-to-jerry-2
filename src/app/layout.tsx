import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://jerry.andretreib.com"),
  title: "Talk to Jerry - Your AI Friend",
  description:
    "Meet Jerry, a friendly AI-powered 3D character that loves to chat and make kids laugh.",
  keywords: [
    "AI chat",
    "3D character",
    "voice recognition",
    "kids",
    "interactive",
    "educational",
    "fun",
    "Next.js",
    "Three.js",
    "OpenAI",
  ],
  authors: [{ name: "André Treib", url: "https://andretreib.com" }],
  creator: "André Treib",
  openGraph: {
    title: "Talk to Jerry - Your AI Friend",
    description:
      "Meet Jerry, a friendly AI-powered 3D character that loves to chat and make kids laugh.",
    url: "https://jerry.andretreib.com",
    siteName: "Talk to Jerry",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Talk to Jerry - Interactive AI Chat Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk to Jerry - Your AI Friend",
    description:
      "Meet Jerry, a friendly AI-powered 3D character that loves to chat and make kids laugh.",
    images: ["/og-image.jpg"],
    creator: "@treibthedev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
