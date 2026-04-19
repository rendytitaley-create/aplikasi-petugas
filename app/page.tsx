"use client";
import React, { useState, useEffect } from "react";
import { Shield, Paintbrush, Calendar, Users, Activity } from "lucide-react";

export default function Dashboard() {
  const [hariIni, setHariIni] = useState("");

  useEffect(() => {
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    setHariIni(namaHari[new Date().getDay()]);
  }, []);

  return (
    <div className="w-full">
      {/* Header Dashboard yang Luas */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Overview Dashboard</h1>
          <p className="text-slate-500 font-bold mt-1">Selamat Datang di Sistem PIRU Management</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="font-black text-slate-700">{hariIni}, {new Date().toLocaleDateString('id-ID')}</span>
        </div>
      </header>

      {/* Baris Statistik / Ringkasan Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-600 p-8 rounded-[32px] text-white shadow-xl shadow-blue-200 flex flex-col justify-between min-h-[200px]">
          <div>
            <p className="text-xs font-black uppercase tracking-widest opacity-80">Status Operasional</p>
            <h2 className="text-4xl font-black mt-2">Sangat Baik</h2>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-bold">Semua sistem berjalan normal</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Penyelesaian CS</p>
          <div>
            <span className="text-5xl font-black text-slate-900">85%</span>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[85%]"></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Kehadiran Satpam</p>
          <div>
            <span className="text-5xl font-black text-slate-900">100%</span>
            <p className="text-sm font-bold text-emerald-600 mt-2">Lengkap & Aktif</p>
          </div>
        </div>
      </div>

      {/* Bagian Menu Cepat dengan Grid yang lebih Profesional */}
      <h3 className="text-xl font-black text-slate-900 mb-6">Akses Cepat Layanan</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Satpam */}
        <div className="group bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-800">Jadwal & Aplose</h4>
                <p className="text-sm text-slate-500 font-medium">Laporan ganti jaga & serah terima</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card CS */}
        <div className="group bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Paintbrush className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-800">E-List Pekerjaan</h4>
                <p className="text-sm text-slate-500 font-medium">Checklist tugas harian petugas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Settings */}
        <div className="group bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-pointer lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-4 rounded-2xl text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-colors">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-800">Manajemen Petugas</h4>
              <p className="text-sm text-slate-500 font-medium">Pengaturan nama, pengawas, dan pembagian role system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
