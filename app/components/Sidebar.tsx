"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShieldCheck, ClipboardList, Settings, Users } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Jadwal Satpam', href: '/jadwal', icon: ShieldCheck },
    { name: 'E-List Pekerjaan', href: '/elist', icon: ClipboardList },
    { name: 'Pengaturan User', href: '/settings', icon: Users },
  ];

  return (
    <div className="flex flex-col flex-grow bg-slate-900 overflow-y-auto">
      {/* Brand Logo */}
      <div className="flex items-center h-20 flex-shrink-0 px-6 bg-slate-950">
        <span className="text-2xl font-black tracking-tighter text-blue-400 uppercase italic">
          PIRU System
        </span>
      </div>

      {/* Navigasi */}
      <div className="mt-8 flex-1 flex flex-col px-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Sidebar */}
      <div className="p-6 bg-slate-950/40 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Settings className="w-4 h-4 text-blue-400" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate text-slate-200">Admin Control</p>
            <p className="text-[10px] text-slate-500 font-medium">Verified System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
