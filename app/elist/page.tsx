"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase"; 
import { collection, getDocs, query, where } from "firebase/firestore";
import { ClipboardList, Camera, CheckCircle2 } from "lucide-react";

interface Tugas {
  id: string;
  role?: string;
  jam?: string;
  tugas?: string;
  hari?: string;
}

export default function EListPage() {
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState(true);
  const [hariIni, setHariIni] = useState("");

  useEffect(() => {
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const hariSekarang = namaHari[new Date().getDay()];
    setHariIni(hariSekarang);

    const ambilData = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "jadwal_template"), where("hari", "==", hariSekarang));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Tugas[];
        setTugas(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    ambilData();
  }, []);

  return (
    <main className="p-6 max-w-md mx-auto mb-20">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-gray-900">E-List Kerja</h1>
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">{hariIni}</p>
        </div>
        <ClipboardList className="text-gray-200 w-10 h-10" />
      </header>

      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-3xl" />)}
          </div>
        ) : tugas.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center border border-gray-100 shadow-inner">
            <p className="text-gray-400 font-medium">Belum ada data tugas untuk hari {hariIni}.</p>
          </div>
        ) : (
          tugas.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${item.role === 'CS' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                  {item.role}
                </span>
                <span className="text-xs font-bold text-gray-400">{item.jam}</span>
              </div>
              <p className="font-bold text-gray-800 text-lg mb-4">{item.tugas}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-50 text-gray-600 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 border border-gray-100 active:bg-emerald-50 active:text-emerald-600 active:border-emerald-200 transition-all">
                  <CheckCircle2 className="w-4 h-4" /> Selesai
                </button>
                <button className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-100">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}