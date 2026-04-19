import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PIRU App - Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen overflow-hidden">
          {/* Bagian Kiri: Sidebar Permanen untuk Desktop */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 shadow-xl">
            <Sidebar />
          </div>

          {/* Bagian Kanan: Konten Utama */}
          <div className="md:pl-64 flex flex-col flex-1 w-full">
            <main className="flex-1 relative overflow-y-auto focus:outline-none p-6 md:p-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
