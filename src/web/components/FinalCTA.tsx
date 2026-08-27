export function FinalCTA() {
  return (
    <section className="py-24 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className="max-w-xl">
            <div className="section-label mb-4" style={{ color: 'var(--muted)' }}>Final Word</div>
            <h2 className="mb-6">
              You know something's leaking.<br />
              <span style={{ color: 'var(--muted)' }}>Now find out exactly what it is.</span>
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
              The bottleneck exists whether you diagnose it or not. The difference is that right now, you're paying for it without knowing the fix. For free, you get the specific diagnosis, the financial impact, and the exact next step.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <div className="card-premium p-8" style={{ minWidth: '320px' }}>
              <div className="text-center mb-6">
                <div className="text-4xl font-black mb-1 num" style={{ color: 'var(--orange)' }}>FREE</div>
                <div className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Complete Diagnostic Report</div>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  'Funnel analysis',
                  'Unit economics breakdown',
                  'Benchmark comparison',
                  'Seasonality risk check',
                  'Cost of inaction calculation',
                  'Bottleneck diagnosis',
                  '90-day action plan',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--orange)' }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2.5" stroke="#0a0a0a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ color: 'var(--muted)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="/diagnostic" className="btn-primary w-full text-center block">
                See Where Your Money Is Leaking
                <span className="price-badge">FREE</span>
              </a>
              <div className="text-center mt-3 text-xs" style={{ color: 'var(--muted)' }}>100% Free · Instant delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
