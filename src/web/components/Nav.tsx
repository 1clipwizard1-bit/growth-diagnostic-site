export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)', borderColor: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: '#f97316' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 6V10L8 14L2 10V6L8 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M8 5L11 7V9L8 11L5 9V7L8 5Z" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-sm tracking-tight" style={{ color: '#f5f5f5' }}>GrowthDiagnostic</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm transition-colors" style={{ color: '#a3a3a3' }}
            onMouseOver={e => (e.currentTarget.style.color = '#f5f5f5')}
            onMouseOut={e => (e.currentTarget.style.color = '#a3a3a3')}>How It Works</a>
          <a href="#report" className="text-sm transition-colors" style={{ color: '#a3a3a3' }}
            onMouseOver={e => (e.currentTarget.style.color = '#f5f5f5')}
            onMouseOut={e => (e.currentTarget.style.color = '#a3a3a3')}>What's Included</a>
          <a href="#faq" className="text-sm transition-colors" style={{ color: '#a3a3a3' }}
            onMouseOver={e => (e.currentTarget.style.color = '#f5f5f5')}
            onMouseOut={e => (e.currentTarget.style.color = '#a3a3a3')}>FAQ</a>
        </div>
        <a href="/diagnostic"
          className="text-sm font-semibold px-4 py-2 rounded-lg transition-all"
          style={{ background: '#f97316', color: '#fff' }}
          onMouseOver={e => (e.currentTarget.style.background = '#ea6c0a')}
          onMouseOut={e => (e.currentTarget.style.background = '#f97316')}>
          Run Diagnostic — $9.99
        </a>
      </div>
    </nav>
  );
}
