"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShieldCheck, ClipboardList, Settings } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Jadwal & Aplose', href: '/jadwal', icon: ShieldCheck },
    { name: 'E-List Pekerjaan', href: '/elist', icon: ClipboardList },
    { name: 'Admin Panel', href: '/admin', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-screen sticky top-0 text-white flex flex-col border-r border-slate-800 z-50">
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-2xl font-black tracking-tighter text-blue-400">PIRU APP</h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {menus.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 bg-slate-950/50">
        <p className="text-[10px] font-black text-slate-500 uppercase">System Status</p>
        <p className="text-xs font-bold text-emerald-400">Online & Encrypted</p>
      </div>
    </aside>
  );
}
