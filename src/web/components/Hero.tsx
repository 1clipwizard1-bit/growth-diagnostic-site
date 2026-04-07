export function Hero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden hero-glow">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#f97316' }} />
            <span className="section-label">Business Growth Diagnostic</span>
          </div>

          {/* Headline */}
          <h1 className="font-black tracking-tight leading-none mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#f5f5f5' }}>
            Your traffic isn't the problem.{' '}
            <span style={{ color: '#f97316' }}>Your funnel is.</span>
          </h1>

          <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: '#a3a3a3' }}>
            Most businesses spending on paid ads are losing revenue to a single fixable bottleneck — and don't know which one.
            The Business Growth Diagnostic analyzes your funnel, unit economics, and conversion process to pinpoint exactly where you're leaking money.
          </p>

          {/* CTA block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <a href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-base transition-all"
              style={{ background: '#f97316', color: '#fff' }}
              onMouseOver={e => { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              Run My Diagnostic — $9.99
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <span className="text-sm" style={{ color: '#666' }}>PDF delivered instantly · No subscription</span>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: '$4,300', label: 'Avg. monthly revenue leak found' },
              { value: '7 min', label: 'Time to complete' },
              { value: '94%', label: 'Identified a fixable bottleneck' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-black" style={{ color: '#f97316' }}>{stat.value}</div>
                <div className="text-xs mt-0.5" style={{ color: '#666' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero card — mock report preview */}
        <div className="absolute right-0 top-0 bottom-0 hidden xl:flex items-center pr-6" style={{ width: '380px' }}>
          <div className="w-full rounded-2xl border p-6 glow-orange" style={{ background: '#111', borderColor: '#2a2a2a' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="section-label mb-0.5">Diagnostic Report</div>
                <div className="text-xs" style={{ color: '#666' }}>Sunrise Plumbing Co. · $15k/mo ads</div>
              </div>
              <div className="px-2 py-1 rounded text-xs font-bold" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>CRITICAL</div>
            </div>
            <div className="border rounded-xl p-4 mb-4" style={{ borderColor: '#ef4444', background: 'rgba(239,68,68,0.04)' }}>
              <div className="text-xs font-semibold mb-2" style={{ color: '#ef4444' }}>⚠ PRIMARY BOTTLENECK DETECTED</div>
              <div className="font-bold text-base mb-1" style={{ color: '#f5f5f5' }}>Slow Lead Response Time</div>
              <div className="text-xs" style={{ color: '#a3a3a3' }}>Avg. response: 52 min · Benchmark: &lt;15 min</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span style={{ color: '#a3a3a3' }}>Monthly ad spend</span>
                <span style={{ color: '#f5f5f5' }} className="font-semibold">$15,000</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: '#a3a3a3' }}>Est. leads/month</span>
                <span style={{ color: '#f5f5f5' }} className="font-semibold">142</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: '#a3a3a3' }}>Current close rate</span>
                <span style={{ color: '#f5f5f5' }} className="font-semibold">12%</span>
              </div>
              <div className="border-t pt-3" style={{ borderColor: '#2a2a2a' }}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: '#a3a3a3' }}>Missed revenue / month</span>
                  <span className="font-black" style={{ color: '#ef4444' }}>–$4,300</span>
                </div>
                <div className="metric-bar">
                  <div className="metric-bar-fill-red" style={{ width: '72%' }} />
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs rounded-lg p-3" style={{ background: '#1c1c1c', color: '#a3a3a3' }}>
              <span className="font-semibold" style={{ color: '#f97316' }}>Fix: </span>
              Instant lead routing + automated SMS follow-up within 2 min
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
