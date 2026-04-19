"use client";
import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase"; 
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Home() {
  const [tugas, setTugas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hariIni, setHariIni] = useState("");

  useEffect(() => {
    // 1. Mengatur Nama Hari dalam Bahasa Indonesia
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const hariSekarang = namaHari[new Date().getDay()];
    setHariIni(hariSekarang);

    const ambilData = async () => {
      try {
        setLoading(true);
        // 2. Mengambil data dari Firebase berdasarkan hari ini
        const q = query(
          collection(db, "jadwal_template"), 
          where("hari", "==", hariSekarang)
        );
        
        const querySnapshot = await getDocs(q);
        const dataSelesai = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setTugas(dataSelesai);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (db) {
      ambilData();
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-10">
      {/* Header Aplikasi */}
      <header className="max-w-md mx-auto mb-8 mt-4">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Log Kerja Petugas
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <p className="text-sm font-medium text-gray-500">
            Jadwal Hari {hariIni}
          </p>
        </div>
      </header>

      <div className="max-w-md mx-auto space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-sm text-gray-500">Menghubungkan ke database...</p>
          </div>
        ) : tugas.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center shadow-sm border border-gray-200">
            <div className="text-4xl mb-4">🗓️</div>
            <p className="text-gray-500 font-medium">Tidak ada jadwal untuk hari {hariIni}.</p>
            <p className="text-xs text-gray-400 mt-2 italic">
              Tips: Cek penulisan hari di Firebase (Contoh: "Minggu")
            </p>
          </div>
        ) : (
          tugas.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all active:scale-[0.98]">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg ${
                  item.role === 'CS' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                }`}>
                  {item.role}
                </span>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                  {item.jam}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 leading-snug mb-5">
                {item.tugas}
              </h3>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition-all" 
                  />
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600">Selesai</span>
                </label>
                
                <button className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-sm shadow-blue-100">
                  <span>📸</span>
                  Upload
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}