export function FinalCTA() {
  return (
    <section className="py-24 border-t" style={{ borderColor: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className="max-w-xl">
            <div className="section-label mb-4">Final Word</div>
            <h2 className="font-black tracking-tight mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#f5f5f5' }}>
              You already know something's off.<br />
              <span style={{ color: '#a3a3a3' }}>Now find out exactly what it is.</span>
            </h2>
            <p style={{ color: '#a3a3a3', lineHeight: '1.8' }}>
              The bottleneck exists whether you diagnose it or not. The difference is that right now, you're paying for it without knowing the fix. For $4.99, you get the specific diagnosis, the financial impact, and the exact next step.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <div className="rounded-2xl border p-8" style={{ borderColor: '#2a2a2a', background: '#111', minWidth: '320px' }}>
              <div className="text-center mb-6">
                <div className="text-4xl font-black mb-1" style={{ color: '#f97316' }}>$4.99</div>
                <div className="text-sm" style={{ color: '#666' }}>Complete Diagnostic Report</div>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  'Funnel analysis',
                  'Unit economics breakdown',
                  'Benchmark comparison',
                  'Cost of inaction calculation',
                  'Bottleneck diagnosis',
                  '90-day action plan',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: '#f97316' }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ color: '#a3a3a3' }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="/diagnostic"
                className="block w-full text-center py-4 rounded-xl font-bold text-base transition-all"
                style={{ background: '#f97316', color: '#fff' }}
                onMouseOver={e => { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.25)'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.boxShadow = 'none'; }}>
                Run My Diagnostic Now →
              </a>
              <div className="text-center mt-3 text-xs" style={{ color: '#555' }}>No subscription · Instant delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
