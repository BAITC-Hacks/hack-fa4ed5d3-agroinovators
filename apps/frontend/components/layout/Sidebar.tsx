'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/map', label: 'Map', icon: '🗺️' },
  { href: '/analytics', label: 'Analytics', icon: '📈' },
  { href: '/alerts', label: 'Alerts', icon: '🔔' },
  { href: '/reports', label: 'Citizen Reports', icon: '📝' },
  { href: '/reports', label: 'Reports', icon: '📄' },
  { href: '/regions', label: 'Region Stats', icon: '🌍' },
  { href: '/profile', label: 'Profile', icon: '👤' },
  { href: '/login', label: 'Login', icon: '🔐' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-background-sidebar border-r border-border flex flex-col p-4">
      {/* System Status */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent-dark/10 border border-accent/30">
        <div className="text-sm font-semibold text-text-primary mb-2">System Status</div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-secondary">Last Update</span>
          <span className="text-accent font-mono font-semibold">
            {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 flex-1">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={idx}
              href={item.href}
              className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-xs text-text-muted">localhost:3000{pathname}</p>
      </div>
    </aside>
  );
}