import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50`}>
        <div className="flex min-h-screen">
          {/* Sidebar Desktop - Lebar Tetap */}
          <div className="hidden md:block w-64 flex-shrink-0 border-r border-slate-200 bg-slate-900 text-white min-h-screen sticky top-0">
            <Sidebar />
          </div>

          {/* Area Konten - Luas & Rapi */}
          <main className="flex-1 p-6 md:p-12 overflow-x-hidden min-w-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
