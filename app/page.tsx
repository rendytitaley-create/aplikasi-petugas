"use client";
import React from "react";
import { Shield, Paintbrush, Calendar, Users, Activity } from "lucide-react";

export default function Dashboard() {
  const tgl = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Overview Dashboard</h1>
          <p className="text-slate-500 font-bold">Sistem Manajemen PIRU</p>
        </div>
        <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
          <Calendar className="text-blue-600 w-5 h-5" />
          <span className="font-black text-slate-700">{tgl}</span>
        </div>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-600 p-8 rounded-[32px] text-white shadow-lg">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Status</p>
          <h2 className="text-3xl font-black mt-1">Sangat Baik</h2>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold bg-white/20 p-2 rounded-lg inline-flex">
            <Activity size={14} /> Sistem Online
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress CS</p>
          <h2 className="text-4xl font-black text-slate-900 mt-2">85%</h2>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[85%]"></div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Petugas Aktif</p>
          <div className="flex justify-center -space-x-2">
            {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">P{i}</div>)}
          </div>
          <p className="text-sm font-bold text-emerald-600 mt-4">100% On-Duty</p>
        </div>
      </div>

      {/* Grid Akses Cepat */}
      <h3 className="text-xl font-black text-slate-900 mb-6">Akses Layanan</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer flex items-center gap-6">
          <div className="bg-orange-100 p-4 rounded-2xl text-orange-600"><Shield size={32} /></div>
          <div>
            <h4 className="font-black text-slate-800">Jadwal & Aplose</h4>
            <p className="text-sm text-slate-500 font-medium">Laporan ganti jaga satpam</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm hover:border-blue-500 transition-all cursor-pointer flex items-center gap-6">
          <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600"><Paintbrush size={32} /></div>
          <div>
            <h4 className="font-black text-slate-800">E-List Pekerjaan</h4>
            <p className="text-sm text-slate-500 font-medium">Checklist harian petugas CS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
