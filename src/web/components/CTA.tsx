export function CTA() {
  return (
    <section id="cta" className="py-24 border-t" style={{ borderColor: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl border overflow-hidden relative" style={{ borderColor: '#2a2a2a', background: '#111' }}>
          {/* Glow effect */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />

          <div className="relative px-8 py-16 md:px-16 text-center">
            <div className="section-label mb-6 text-center">Get Started</div>
            <h2 className="font-black tracking-tight mb-4 mx-auto max-w-3xl" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f5f5' }}>
              Find out what's really stopping your business from scaling.
            </h2>
            <p className="text-lg mb-10 mx-auto max-w-xl" style={{ color: '#a3a3a3' }}>
              Complete 12 questions. Receive a structured PDF report. Know exactly which bottleneck to fix — and what it's costing you not to.
            </p>

            {/* Price block */}
            <div className="inline-flex flex-col items-center gap-2 mb-10">
              <div className="text-5xl font-black" style={{ color: '#f97316' }}>$9.99</div>
              <div className="text-sm" style={{ color: '#666' }}>One-time payment · No subscription · PDF delivered instantly</div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <a href="/diagnostic"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-lg transition-all"
                style={{ background: '#f97316', color: '#fff' }}
                onMouseOver={e => { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.3)'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                Run My Diagnostic Now
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <div className="flex flex-wrap justify-center gap-6 text-xs" style={{ color: '#555' }}>
                <span>✓ Instant PDF delivery</span>
                <span>✓ 12 questions · 7 minutes</span>
                <span>✓ No subscription required</span>
                <span>✓ Industry-calibrated benchmarks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
