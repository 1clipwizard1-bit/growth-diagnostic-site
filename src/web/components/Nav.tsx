import { Link } from "wouter";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'var(--orange)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 6V10L8 14L2 10V6L8 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M8 5L11 7V9L8 11L5 9V7L8 5Z" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--text)' }}>GrowthDiagnostic</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="/#how-it-works" className="text-sm transition-colors" style={{ color: 'var(--muted)' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseOut={e => (e.currentTarget.style.color = 'var(--muted)')}>How It Works</a>
          <a href="/#report" className="text-sm transition-colors" style={{ color: 'var(--muted)' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseOut={e => (e.currentTarget.style.color = 'var(--muted)')}>What's Included</a>
          <a href="/#faq" className="text-sm transition-colors" style={{ color: 'var(--muted)' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseOut={e => (e.currentTarget.style.color = 'var(--muted)')}>FAQ</a>
        </div>
        <Link href="/diagnostic"
          className="text-sm font-bold px-5 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0"
          style={{ background: 'var(--orange)', color: '#0a0a0a' }}
          onMouseOver={e => (e.currentTarget.style.background = 'var(--orange-dark)')}
          onMouseOut={e => (e.currentTarget.style.background = 'var(--orange)')}>
          Run Diagnostic <span className="price-badge">$4.99</span>
        </Link>
      </div>
    </nav>
  );
}
