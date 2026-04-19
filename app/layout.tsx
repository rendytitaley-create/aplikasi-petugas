import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PIRU App - Professional",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {/* Sidebar hanya muncul di Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Area Konten Utama */}
          <main className="flex-1 bg-gray-50 p-4 md:p-8 min-w-0 pb-24 md:pb-8">
            {children}
          </main>
        </div>

        {/* Navigation hanya muncul di Mobile */}
        <div className="md:hidden">
          <Navigation />
        </div>
      </body>
    </html>
  );
}
