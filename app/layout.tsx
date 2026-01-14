import type { Metadata } from "next";
import { Space_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bragdoc.io"),
  title: "brag doc",
  description: "Please keep a brag document at work.",
  openGraph: {
    title: "brag doc",
    description: "You did great work this year. You just forgot most of it.",
    url: "https://bragdoc.io",
    siteName: "brag doc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "brag doc",
    description: "You did great work this year. You just forgot most of it.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${instrumentSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
