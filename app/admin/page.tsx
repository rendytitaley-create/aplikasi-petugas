"use client";
import React, { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Plus, Save, FileSpreadsheet, Loader2 } from "lucide-react";

export default function AdminPage() {
  // State untuk form
  const [role, setRole] = useState("CS");
  const [hari, setHari] = useState("Senin");
  const [jam, setJam] = useState("");
  const [tugas, setTugas] = useState("");
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");

  const simpanData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jam || !tugas) {
      alert("Harap isi jam dan deskripsi tugas!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "jadwal_template"), {
        role,
        hari,
        jam,
        tugas,
      });
      setPesan("✅ Data berhasil disimpan!");
      setJam("");
      setTugas("");
      setTimeout(() => setPesan(""), 3000);
    } catch (error) {
      console.error("Error simpan data:", error);
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Admin Panel</h1>
        <p className="text-gray-500 font-medium">Manajemen Master Data Pekerjaan</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Form Input Manual */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={simpanData} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Plus className="text-blue-600" /> Tambah Detail Pekerjaan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pilih Role */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Pilih Petugas</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="CS">Cleaning Service (CS)</option>
                  <option value="SATPAM">Satpam / Security</option>
                </select>
              </div>

              {/* Pilih Hari */}
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Pilih Hari</label>
                <select 
                  value={hari} 
                  onChange={(e) => setHari(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              {/* Input Jam */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Rentang Jam (Contoh: 08:00 - 09:00)</label>
                <input 
                  type="text" 
                  value={jam}
                  onChange={(e) => setJam(e.target.value)}
                  placeholder="Masukkan jam kerja..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Input Tugas */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Deskripsi Pekerjaan</label>
                <textarea 
                  value={tugas}
                  onChange={(e) => setTugas(e.target.value)}
                  rows={3}
                  placeholder="Tuliskan detail pekerjaan di sini..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all disabled:bg-gray-400"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
              {loading ? "Menyimpan..." : "Simpan Jadwal"}
            </button>

            {pesan && <p className="mt-4 text-center text-emerald-600 font-bold animate-bounce">{pesan}</p>}
          </form>
        </div>

        {/* Kolom Kanan: Info & Import */}
        <div className="space-y-6">
          <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-xl shadow-emerald-100">
            <div className="flex items-center gap-2 mb-4">
              <FileSpreadsheet className="w-6 h-6" />
              <h3 className="font-bold">Opsi Cepat</h3>
            </div>
            <p className="text-xs opacity-90 leading-relaxed mb-6">
              Gunakan fitur Import Excel jika Anda memiliki ratusan data jadwal untuk dimasukkan sekaligus.
            </p>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 py-3 rounded-xl border border-emerald-400 font-bold text-sm transition-all">
              Upload Excel (.xlsx)
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Tips Admin</h3>
            <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4 leading-relaxed">
              <li>Pastikan format jam seragam (misal: 07:00).</li>
              <li>Data yang disimpan akan langsung muncul di menu E-List petugas sesuai harinya.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
