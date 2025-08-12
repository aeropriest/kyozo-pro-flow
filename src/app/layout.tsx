import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClientThemeWrapper } from "@/components";
import "../styles/main.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// We're not using the mono font in our app

export const metadata: Metadata = {
  title: "Interactive Sliding Cards",
  description: "A demonstration of scroll-driven animation with interactive sliding cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <ClientThemeWrapper />
        {children}
      </body>
    </html>
  );
}
