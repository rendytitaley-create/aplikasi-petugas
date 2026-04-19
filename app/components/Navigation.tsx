"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShieldCheck, ClipboardList, UploadCloud } from 'lucide-react';

const Navigation = () => {
  const pathname = usePathname();

  const menus = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Jadwal', href: '/jadwal', icon: ShieldCheck },
    { name: 'E-List', href: '/elist', icon: ClipboardList },
    { name: 'Admin', href: '/admin', icon: UploadCloud },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-lg border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-t-[32px]">
      {menus.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1">
            <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-[10px] font-bold ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;