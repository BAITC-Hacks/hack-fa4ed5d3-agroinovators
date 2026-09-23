'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './Container';

const navLinks = [
  { href: '/challenges', label: 'Задачи' },
  { href: '/create', label: 'Создать' },
  { href: '/business', label: 'Для бизнеса' },
  { href: '/teams', label: 'Команды' },
  { href: '/map', label: 'Карта' }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-neon-purple/20">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-neon flex items-center justify-center shadow-neon-purple group-hover:shadow-neon-pink transition-all">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold gradient-text">TaskAtlas AI</div>
              <div className="text-xs text-text-muted">Платформа задач</div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50 shadow-neon-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-neon-purple/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/create"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-neon text-white font-semibold text-sm shadow-neon-purple hover:shadow-neon-pink transition-all hover:scale-105"
            >
              <span>+ Разместить задачу</span>
            </Link>
            <button className="md:hidden text-text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}