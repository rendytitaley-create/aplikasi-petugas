import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PIRU App - Log Kerja",
  description: "Aplikasi Manajemen Petugas CS & Satpam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 pb-24`}>
        {children}
        <Navigation />
      </body>
    </html>
  );
}