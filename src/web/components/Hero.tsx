export function Hero() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden hero-glow">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '64px 64px'
      }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="badge-premium mb-8">
            <div className="pulse-dot" />
            <span className="section-label" style={{ color: 'var(--orange)' }}>Business Growth Diagnostic</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 max-w-2xl">
            Know Exactly Where Your Marketing<br />
            <span style={{ color: 'var(--orange)' }}>Leaks Money</span> — in 7 Minutes
          </h1>

          <p className="text-lg leading-relaxed mb-10 max-w-3xl" style={{ color: 'var(--muted)' }}>
            Stop guessing why your marketing isn’t scaling. Whether you spend a few hundred or <strong>$20k/month</strong>, this <strong>7-minute diagnostic</strong> shows where customers leak out — and what it may be costing you every month.
          </p>

          {/* CTA block */}
          <div className="mb-10">
            <a href="/diagnostic" className="btn-primary">
              See Where Your Money Is Leaking
              <span className="price-badge">$4.99</span>
              <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Risk reversal */}
            <div className="mt-4 text-sm font-bold" style={{ color: 'var(--text)' }}>
              Refund if no bottleneck found. No subscription. No sales call.
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-6 mt-6 text-[13px] items-center" style={{ color: 'var(--muted)' }}>
              <div className="flex items-center gap-1.5">
                <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>✓</span> PDF delivered instantly
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>✓</span> Works from $500 to $20k/mo ad spend
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>✓</span> 7 minutes, 18 questions
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 border-t pt-8" style={{ borderColor: 'var(--border)' }}>
            {[
              { value: '8', label: 'growth blockers analyzed' },
              { value: '18', label: 'questions' },
              { value: '7 min', label: 'to complete' },
              { value: 'Refund', label: 'if no bottleneck found' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold num" style={{ color: 'var(--orange)' }}>{stat.value}</div>
                <div className="text-[11px] font-bold uppercase tracking-wider mt-0.5" style={{ color: 'var(--muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero card — mock report preview */}
        <div className="absolute right-0 top-0 bottom-0 hidden xl:flex items-center pr-6" style={{ width: '380px' }}>
          <div className="w-full card-premium-featured p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="section-label mb-0.5">Diagnostic Report</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>Sunrise Plumbing Co. · <span className="num">$15k/mo</span> ads</div>
              </div>
              <div className="px-2 py-1 rounded text-xs font-bold" style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--red)' }}>CRITICAL</div>
            </div>
            
            {/* Warning block */}
            <div className="warning-block mb-4">
              <div className="warning-block-label">⚠ PRIMARY BOTTLENECK DETECTED</div>
              <div className="font-bold text-base mb-1" style={{ color: 'var(--text)' }}>Slow Lead Response Time</div>
              <div className="num text-xs" style={{ color: 'var(--muted)' }}>Avg. response: 52 min · Benchmark: &lt;15 min</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs border-b pb-1.5" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>Monthly ad spend</span>
                <span style={{ color: 'var(--text)' }} className="num font-semibold">$15,000</span>
              </div>
              <div className="flex justify-between text-xs border-b pb-1.5" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>Est. leads/month</span>
                <span style={{ color: 'var(--text)' }} className="num font-semibold">142</span>
              </div>
              <div className="flex justify-between text-xs border-b pb-1.5" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>Current close rate</span>
                <span style={{ color: 'var(--text)' }} className="num font-semibold">12%</span>
              </div>
              <div className="pt-1.5">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--muted)' }}>Missed revenue / month</span>
                  <span className="num font-bold" style={{ color: 'var(--red)' }}>–$4,300</span>
                </div>
                {/* Progress/Metric Bar */}
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: '72%', background: 'var(--red)' }} />
                </div>
              </div>
            </div>
            
            {/* Fix/Tip box */}
            <div className="mt-4 text-xs rounded-lg p-3" style={{ background: 'var(--bg2)', color: 'var(--text)' }}>
              <span className="font-semibold" style={{ color: 'var(--orange)' }}>Fix: </span>
              Instant lead routing + automated SMS follow-up within 2 min
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
