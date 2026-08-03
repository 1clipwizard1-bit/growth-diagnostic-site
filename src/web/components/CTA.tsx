export function CTA() {
  return (
    <section id="cta" className="py-24 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="card-premium relative">
          {/* Glow effect */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />

          <div className="relative px-8 py-16 md:px-16 text-center">
            <div className="section-label mb-6 text-center" style={{ color: 'var(--muted)' }}>Get Started</div>
            <h2 className="mb-4">
              Stop guessing. Find the cause.
            </h2>
            <p className="text-lg mb-10 mx-auto max-w-xl" style={{ color: 'var(--muted)' }}>
              Complete 18 questions. Receive a structured PDF report. Know exactly which bottleneck to fix — and what it's costing you not to.
            </p>

            {/* Price block */}
            <div className="inline-flex flex-col items-center gap-2 mb-10">
              <div className="text-5xl font-black num" style={{ color: 'var(--orange)' }}>$4.99</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>One-time payment · No subscription · PDF delivered instantly</div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <a href="/diagnostic" className="btn-primary">
                See Where Your Money Is Leaking
                <span className="price-badge">$4.99</span>
                <svg className="ml-1" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Trust row */}
              <div className="flex flex-wrap justify-center gap-6 mt-4 text-[13px] items-center" style={{ color: 'var(--muted)' }}>
                <div className="flex items-center gap-1.5">
                  <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>✓</span> Instant PDF delivery
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>✓</span> 18 questions · 7 minutes
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>✓</span> No subscription required
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>✓</span> Industry-calibrated benchmarks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
