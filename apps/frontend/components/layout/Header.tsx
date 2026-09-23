'use client';

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-background/50 backdrop-blur-sm">
      <div>
        <div className="text-sm text-text-secondary">Petropavl, Kazakhstan</div>
        <div className="flex items-center gap-2 text-xs mt-0.5">
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
          <span className="text-status-success font-medium">ONLINE</span>
        </div>
      </div>
      <button className="w-10 h-10 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent hover:bg-accent/30 transition">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </header>
  );
}