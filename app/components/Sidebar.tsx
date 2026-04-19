"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShieldCheck, ClipboardList, UploadCloud } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Jadwal & Aplose', href: '/jadwal', icon: ShieldCheck },
    { name: 'E-List Pekerjaan', href: '/elist', icon: ClipboardList },
    { name: 'Admin Panel', href: '/admin', icon: UploadCloud },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#1a202c', // Hitam Biru Profesional
      color: 'white',
      height: '100vh',
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #2d3748'
    }}>
      <div style={{ padding: '25px', fontSize: '24px', fontWeight: '900', borderBottom: '1px solid #2d3748', color: '#63b3ed' }}>
        PIRU APP
      </div>

      <nav style={{ flex: 1, padding: '20px 0' }}>
        {menus.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px 25px',
              textDecoration: 'none',
              color: isActive ? '#fff' : '#a0aec0',
              backgroundColor: isActive ? '#2d3748' : 'transparent',
              fontSize: '15px',
              fontWeight: 'bold',
              transition: '0.3s'
            }}>
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
