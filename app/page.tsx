"use client";
import React, { useState, useEffect } from "react";
import { Shield, Paintbrush, Calendar } from "lucide-react"; // 'Broom' diganti jadi 'Paintbrush'

export default function Dashboard() {
  const [hariIni, setHariIni] = useState("");

  useEffect(() => {
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    setHariIni(namaHari[new Date().getDay()]);
  }, []);

  return (
    <main className="p-6 max-w-md mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">PIRU Dashboard</h1>
        <div className="flex items-center gap-2 text-gray-500 font-medium">
          <Calendar className="w-4 h-4" />
          <span>{hariIni}, {new Date().toLocaleDateString('id-ID')}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {/* Ringkasan Status */}
        <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-200">
          <p className="opacity-80 text-sm font-bold uppercase tracking-wider">Status Kerja</p>
          <h2 className="text-3xl font-black mt-1">Sangat Baik</h2>
          <div className="mt-4 flex gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <p className="text-[10px] font-bold">CS Selesai</p>
              <p className="text-xl font-black">85%</p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <p className="text-[10px] font-bold">Satpam</p>
              <p className="text-xl font-black">100%</p>
            </div>
          </div>
        </div>

        <h3 className="font-black text-gray-800 mt-4">Menu Cepat</h3>
        
        {/* Menu Satpam */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Jadwal & Aplose</h4>
            <p className="text-xs text-gray-500">Update ganti jaga satpam</p>
          </div>
        </div>

        {/* Menu CS */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
            <Paintbrush className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">E-List Pekerjaan</h4>
            <p className="text-xs text-gray-500">Checklist tugas harian CS</p>
          </div>
        </div>
      </div>
    </main>
  );
}