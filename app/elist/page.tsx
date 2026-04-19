"use client";
import React, { useState } from "react";
import { Shield, Camera, Clock, User } from "lucide-react";

export default function JadwalSatpam() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="p-6 max-w-2xl mx-auto mb-20">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Jadwal & Aplose</h1>
        <p className="text-gray-500 font-medium">Manajemen Ganti Jaga Satpam</p>
      </header>

      {/* Kartu Status Jaga Saat Ini */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-orange-100 p-4 rounded-2xl">
            <Shield className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Shift Pagi</h2>
            <p className="text-sm text-gray-500 font-medium">08:00 - 20:00 WIB</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <User className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase">Petugas</span>
            </div>
            <p className="text-sm font-bold text-gray-700">Bpk. Ahmad Sujarwo</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <Clock className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase">Lokasi</span>
            </div>
            <p className="text-sm font-bold text-gray-700">Pos Gerbang Utama</p>
          </div>
        </div>
      </div>

      {/* Bagian Aplose (Ganti Jaga) */}
      <h3 className="font-black text-gray-800 mb-4 px-2">Lapor Ganti Jaga (Aplose)</h3>
      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-100">
        <p className="text-sm opacity-90 mb-4">Pastikan Anda mengambil foto bersama petugas shift sebelumnya sebagai bukti aplose.</p>
        
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-400 rounded-2xl cursor-pointer hover:bg-blue-700 transition-all bg-blue-500/30">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Camera className="w-10 h-10 mb-2" />
            <p className="text-sm font-bold">Ambil Foto Aplose</p>
            <p className="text-[10px] opacity-60">Format: JPG, PNG (Maks 5MB)</p>
          </div>
          <input type="file" className="hidden" accept="image/*" capture="environment" />
        </label>

        <button className="w-full mt-4 bg-white text-blue-600 font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-all">
          KIRIM LAPORAN APLOSE
        </button>
      </div>
    </main>
  );
}