import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PIRU App - Professional Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f8f9fa]`}>
        <div className="flex min-h-screen">
          {/* Sidebar: Hanya muncul di Desktop (md ke atas) */}
          <Sidebar />

          {/* Area Konten Utama */}
          <div className="flex-1 flex flex-col min-w-0">
            <main className="flex-1 pb-24 md:pb-8 md:p-8">
              {children}
            </main>
          </div>
        </div>

        {/* Bottom Nav: Hanya muncul di Mobile (hidden di desktop) */}
        <div className="md:hidden">
          <Navigation />
        </div>
      </body>
    </html>
  );
}