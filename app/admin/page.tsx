"use client";
import React, { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Plus, Save, FileSpreadsheet, Loader2, Clock } from "lucide-react";

export default function AdminPage() {
  const [role, setRole] = useState("CS");
  const [hari, setHari] = useState("Senin");
  const [waktuMulai, setWaktuMulai] = useState("07:00");
  const [durasi, setDurasi] = useState("60");
  const [tugas, setTugas] = useState("");
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");

  // Daftar jam untuk dropdown waktu mulai (06:00 - 22:00)
  const daftarJam = Array.from({ length: 33 }, (_, i) => {
    const h = Math.floor(i / 2) + 6;
    const m = i % 2 === 0 ? "00" : "30";
    return `${h.toString().padStart(2, '0')}:${m}`;
  });

  const hitungRentangJam = () => {
    const [h, m] = waktuMulai.split(":").map(Number);
    const totalMenit = h * 60 + m + parseInt(durasi);
    const hSelesai = Math.floor(totalMenit / 60);
    const mSelesai = totalMenit % 60;
    return `${waktuMulai} - ${hSelesai.toString().padStart(2, '0')}:${mSelesai.toString().padStart(2, '0')}`;
  };

  const simpanData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tugas) {
      alert("Harap isi deskripsi tugas!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "jadwal_template"), {
        role,
        hari,
        jam: hitungRentangJam(),
        tugas,
      });
      setPesan("✅ Berhasil Disimpan!");
      setTugas("");
      setTimeout(() => setPesan(""), 3000);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-gray-900">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-black">Admin Panel</h1>
        <p className="text-gray-700 font-bold">Manajemen Master Data Pekerjaan</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={simpanData} className="bg-white p-8 rounded-3xl shadow-md border border-gray-300">
            <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-2 border-b pb-4">
              <Plus className="text-blue-700" strokeWidth={3} /> Tambah Jadwal Baru
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Petugas */}
              <div>
                <label className="block text-sm font-black text-gray-800 uppercase mb-2 tracking-wide">Petugas</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-gray-400 rounded-xl font-bold text-black focus:border-blue-600 outline-none"
                >
                  <option value="CS">Cleaning Service (CS)</option>
                  <option value="SATPAM">Satpam / Security</option>
                </select>
              </div>

              {/* Hari */}
              <div>
                <label className="block text-sm font-black text-gray-800 uppercase mb-2 tracking-wide">Hari Kerja</label>
                <select 
                  value={hari} 
                  onChange={(e) => setHari(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-gray-400 rounded-xl font-bold text-black focus:border-blue-600 outline-none"
                >
                  {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              {/* Waktu Mulai */}
              <div>
                <label className="block text-sm font-black text-gray-800 uppercase mb-2 tracking-wide">Jam Mulai</label>
                <select 
                  value={waktuMulai} 
                  onChange={(e) => setWaktuMulai(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-gray-400 rounded-xl font-bold text-black focus:border-blue-600 outline-none"
                >
                  {daftarJam.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>

              {/* Durasi */}
              <div>
                <label className="block text-sm font-black text-gray-800 uppercase mb-2 tracking-wide">Durasi Kerja</label>
                <select 
                  value={durasi} 
                  onChange={(e) => setDurasi(e.target.value)}
                  className="w-full p-3 bg-white border-2 border-gray-400 rounded-xl font-bold text-black focus:border-blue-600 outline-none"
                >
                  <option value="30">30 Menit</option>
                  <option value="45">45 Menit</option>
                  <option value="60">1 Jam (60 Menit)</option>
                  <option value="120">2 Jam</option>
                </select>
              </div>

              {/* Preview Rentang */}
              <div className="md:col-span-2 bg-blue-50 p-4 rounded-xl border-2 border-blue-200 flex items-center justify-between">
                <span className="text-sm font-bold text-blue-800">Hasil Rentang Jam:</span>
                <span className="text-lg font-black text-blue-900">{hitungRentangJam()}</span>
              </div>

              {/* Deskripsi */}
              <div className="md:col-span-2">
                <label className="block text-sm font-black text-gray-800 uppercase mb-2 tracking-wide">Detail Pekerjaan</label>
                <textarea 
                  value={tugas}
                  onChange={(e) => setTugas(e.target.value)}
                  rows={3}
                  placeholder="Contoh: Pembersihan koridor utama..."
                  className="w-full p-3 bg-white border-2 border-gray-400 rounded-xl font-bold text-black focus:border-blue-600 outline-none placeholder:text-gray-400"
                ></textarea>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full mt-8 bg-black hover:bg-gray-800 text-white font-black py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:bg-gray-400"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
              {loading ? "MEMPROSES..." : "SIMPAN JADWAL"}
            </button>

            {pesan && <p className="mt-4 text-center text-emerald-700 font-black text-lg">{pesan}</p>}
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-3xl text-white shadow-xl border-b-4 border-blue-600">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-blue-400" />
              <h3 className="font-bold text-lg">Informasi Sistem</h3>
            </div>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              Warna teks kini telah dipertegas (hitam pekat) dan input memiliki border yang lebih kontras agar mudah dibaca di berbagai perangkat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
