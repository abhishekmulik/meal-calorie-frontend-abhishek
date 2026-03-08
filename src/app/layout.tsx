import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import HeaderNavbar from "@/components/header-navbar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Calorie Tracker",
    template: "%s | Calorie Tracker",
  },
  description: "Track calories and meals easily",
  keywords: ["calorie tracker", "nutrition", "fitness"],
  authors: [{ name: "Abhishek Mulik" }],
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
        <Providers>
        <HeaderNavbar/>
        {children}
        <Toaster richColors position="top-center" closeButton/>
        </Providers>
      </body>
    </html>
  );
}
