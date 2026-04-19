"use client";
import React, { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Save, PlusCircle, Loader2 } from "lucide-react";

export default function AdminPage() {
  const [role, setRole] = useState("CS");
  const [hari, setHari] = useState("Senin");
  const [jam, setJam] = useState("07:00 - 08:00");
  const [tugas, setTugas] = useState("");
  const [loading, setLoading] = useState(false);

  const simpan = async () => {
    if (!tugas) return alert("Isi tugas!");
    setLoading(true);
    try {
      await addDoc(collection(db, "jadwal_template"), { role, hari, jam, tugas });
      setTugas("");
      alert("✅ Tersimpan!");
    } catch (e) { alert("Error!"); }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Admin Panel</h1>
        <p className="text-slate-500 font-bold">Input Master Data Jadwal</p>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-3">Petugas</label>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500">
              <option value="CS">Cleaning Service</option>
              <option value="SATPAM">Security / Satpam</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-3">Hari Kerja</label>
            <select value={hari} onChange={(e)=>setHari(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500">
              {["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"].map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase mb-3">Detail Tugas</label>
            <textarea value={tugas} onChange={(e)=>setTugas(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 h-32 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ketik rincian pekerjaan..." />
          </div>
        </div>

        <button onClick={simpan} disabled={loading} className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center gap-3 transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <Save />}
          <span>SIMPAN DATA MASTER</span>
        </button>
      </div>
    </div>
  );
}
