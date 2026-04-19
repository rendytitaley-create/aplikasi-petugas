import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "PIRU App - Professional Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#f4f7f6" }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          
          {/* SIDEBAR - Dipaksa muncul di desktop */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* KONTEN UTAMA */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            <main style={{ flex: 1, padding: "30px", boxSizing: "border-box" }}>
              {children}
            </main>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="md:hidden">
          <Navigation />
        </div>
      </body>
    </html>
  );
}
