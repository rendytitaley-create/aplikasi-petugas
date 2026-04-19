"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShieldCheck, ClipboardList, UploadCloud, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const menus = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Jadwal & Aplose', href: '/jadwal', icon: ShieldCheck },
    { name: 'E-List Pekerjaan', href: '/elist', icon: ClipboardList },
    { name: 'Admin Panel', href: '/admin', icon: UploadCloud },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 h-screen">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-black text-gray-900 tracking-tighter">PIRU APP</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menus.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 p-4 rounded-2xl">
          <p className="text-xs font-bold text-gray-400 uppercase">User Role</p>
          <p className="text-sm font-black text-gray-800">Super Admin</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;