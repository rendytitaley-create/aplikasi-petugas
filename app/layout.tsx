import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PIRU App - Professional Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      {/* Kita pasang bg-gray-50 dan text-gray-900 di sini secara langsung */}
      <body className={`${inter.className} bg-gray-50 text-gray-900 m-0 p-0`}>
        <div className="flex min-h-screen">
          {/* Sidebar Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Konten Utama */}
          <main className="flex-1 p-4 md:p-8 min-w-0 pb-24 md:pb-8">
            {children}
          </main>
        </div>

        {/* Navigasi Mobile */}
        <div className="md:hidden">
          <Navigation />
        </div>
      </body>
    </html>
  );
}
