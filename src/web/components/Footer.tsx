import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: '#1a1a1a', background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: '#f97316' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L10.5 4V8L6 11L1.5 8V4L6 1Z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <span className="font-bold text-sm" style={{ color: '#f5f5f5' }}>GrowthDiagnostic</span>
        </Link>
        <div className="text-xs" style={{ color: '#444' }}>
          © 2026 GrowthDiagnostic. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-xs transition-colors" style={{ color: '#555' }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = '#a3a3a3'}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = '#555'}>
            Privacy
          </Link>
          <Link href="/terms" className="text-xs transition-colors" style={{ color: '#555' }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = '#a3a3a3'}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = '#555'}>
            Terms
          </Link>
          <Link href="/contact" className="text-xs transition-colors" style={{ color: '#555' }}
            onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = '#a3a3a3'}
            onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = '#555'}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
