"use client";
import React, { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Save, PlusCircle, Clock, Calendar, User, Loader2 } from "lucide-react";

export default function AdminPage() {
  const [role, setRole] = useState("CS");
  const [hari, setHari] = useState("Senin");
  const [waktuMulai, setWaktuMulai] = useState("07:00");
  const [durasi, setDurasi] = useState("60");
  const [tugas, setTugas] = useState("");
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");

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
    if (!tugas) return alert("Isi detail pekerjaan!");
    setLoading(true);
    try {
      await addDoc(collection(db, "jadwal_template"), {
        role, hari, jam: hitungRentangJam(), tugas,
      });
      setPesan("Data Berhasil Disimpan!");
      setTugas("");
      setTimeout(() => setPesan(""), 3000);
    } catch (error) {
      alert("Gagal menyimpan ke database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ borderBottom: '3px solid #000', marginBottom: '30px', paddingBottom: '10px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#000', margin: 0 }}>ADMIN PANEL</h1>
        <p style={{ color: '#444', fontWeight: '600' }}>PIRU App - Manajemen Data Induk</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <form onSubmit={simpanData} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', border: '2px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: '800', marginBottom: '25px', color: '#000' }}>
            <PlusCircle color="#2563eb" /> INPUT JADWAL BARU
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            
            {/* Field: Petugas */}
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', color: '#000', fontSize: '13px' }}>PETUGAS</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #000', borderRadius: '8px', fontWeight: '700', fontSize: '15px', backgroundColor: '#f9f9f9' }}>
                <option value="CS">Cleaning Service (CS)</option>
                <option value="SATPAM">Satpam / Security</option>
              </select>
            </div>

            {/* Field: Hari */}
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', color: '#000', fontSize: '13px' }}>HARI KERJA</label>
              <select value={hari} onChange={(e) => setHari(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #000', borderRadius: '8px', fontWeight: '700', fontSize: '15px', backgroundColor: '#f9f9f9' }}>
                {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            {/* Field: Jam Mulai */}
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', color: '#000', fontSize: '13px' }}>JAM MULAI</label>
              <select value={waktuMulai} onChange={(e) => setWaktuMulai(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #000', borderRadius: '8px', fontWeight: '700', fontSize: '15px', backgroundColor: '#f9f9f9' }}>
                {daftarJam.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>

            {/* Field: Durasi */}
            <div>
              <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', color: '#000', fontSize: '13px' }}>DURASI</label>
              <select value={durasi} onChange={(e) => setDurasi(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #000', borderRadius: '8px', fontWeight: '700', fontSize: '15px', backgroundColor: '#f9f9f9' }}>
                <option value="30">30 Menit</option>
                <option value="45">45 Menit</option>
                <option value="60">1 Jam</option>
                <option value="120">2 Jam</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e0f2fe', borderRadius: '10px', border: '2px solid #7dd3fc', textAlign: 'center' }}>
            <span style={{ fontWeight: '800', color: '#0369a1' }}>Hasil Rentang: {hitungRentangJam()}</span>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', fontWeight: '800', marginBottom: '8px', color: '#000', fontSize: '13px' }}>DETAIL PEKERJAAN</label>
            <textarea value={tugas} onChange={(e) => setTugas(e.target.value)} placeholder="Contoh: Pembersihan koridor Lt. 1" style={{ width: '100%', padding: '12px', border: '2px solid #000', borderRadius: '8px', fontWeight: '700', minHeight: '80px', fontSize: '15px' }} />
          </div>

          <button disabled={loading} style={{ width: '100%', marginTop: '25px', backgroundColor: '#000', color: '#fff', padding: '15px', borderRadius: '10px', fontWeight: '900', cursor: 'pointer', border: 'none', fontSize: '16px' }}>
            {loading ? "SEDANG MENYIMPAN..." : "SIMPAN KE DATABASE"}
          </button>

          {pesan && <div style={{ marginTop: '15px', textAlign: 'center', color: '#059669', fontWeight: '800' }}>{pesan}</div>}
        </form>
      </div>
    </div>
  );
}
