import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--orange)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L10.5 4V8L6 11L1.5 8V4L6 1Z" fill="#0a0a0a"/>
            </svg>
          </div>
          <span className="font-bold text-sm" style={{ color: 'var(--text)' }}>GrowthDiagnostic</span>
        </Link>
        <div className="text-xs" style={{ color: 'var(--muted)' }}>
          © 2026 GrowthDiagnostic. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-xs transition-colors" style={{ color: 'var(--muted)' }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = 'var(--text)'}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = 'var(--muted)'}>
            Privacy
          </Link>
          <Link href="/terms" className="text-xs transition-colors" style={{ color: 'var(--muted)' }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = 'var(--text)'}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = 'var(--muted)'}>
            Terms
          </Link>
          <Link href="/contact" className="text-xs transition-colors" style={{ color: 'var(--muted)' }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = 'var(--text)'}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = 'var(--muted)'}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
