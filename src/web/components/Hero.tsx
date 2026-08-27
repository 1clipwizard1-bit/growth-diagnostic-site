export function Hero() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden hero-glow">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-14 items-center">
        {/* Left: copy */}
        <div>
          {/* Badge */}
          <div className="badge-premium mb-6">
            <div className="pulse-dot" />
            <span className="section-label" style={{ color: 'var(--orange)' }}>Business Growth Diagnostic</span>
          </div>

          {/* Headline */}
          <h1 className="mb-5">
            Find Where Your Marketing <span style={{ color: 'var(--orange)' }}>Leaks Money</span> — in 7&nbsp;Minutes
          </h1>

          <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--muted)' }}>
            Stop guessing why your ads aren't scaling. This <strong>7-minute diagnostic</strong> pinpoints where customers leak out — and shows <strong>exactly how much it costs you every month</strong>.
          </p>

          {/* CTA block */}
          <a href="/diagnostic" className="btn-primary">
            See Where Your Money Is Leaking
            <span className="price-badge">FREE</span>
            <svg className="ml-1" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Risk reversal */}
          <div className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>
            <strong style={{ color: 'var(--text)' }}>100% Free.</strong> No credit card required. No sales call.
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-[13px] items-center" style={{ color: 'var(--muted)' }}>
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

        {/* Right: mock report card */}
        <div className="w-full max-w-md mx-auto lg:max-w-none">
          <div className="card-premium-featured p-6">
            <div className="flex items-center justify-between mb-1">
              <div className="section-label" style={{ color: 'var(--orange)' }}>Diagnostic Report</div>
              <div className="px-2.5 py-1 rounded text-[11px] font-bold tracking-wide" style={{ background: 'rgba(239,68,68,0.12)', color: 'var(--red)' }}>CRITICAL</div>
            </div>
            <div className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Sunrise Plumbing Co. · <span className="num">$15k/mo</span> ads</div>

            {/* Warning block */}
            <div className="warning-block mb-4">
              <div className="warning-block-label">⚠ Primary Bottleneck Detected</div>
              <div className="font-bold text-base mb-1" style={{ color: 'var(--text)' }}>Slow Lead Response Time</div>
              <div className="num text-xs" style={{ color: 'var(--muted)' }}>Avg. response: 52 min · Benchmark: &lt;15 min</div>
            </div>

            <div className="space-y-0">
              <div className="flex justify-between text-[13px] py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>Monthly ad spend</span>
                <span style={{ color: 'var(--text)' }} className="num font-semibold">$15,000</span>
              </div>
              <div className="flex justify-between text-[13px] py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>Est. leads/month</span>
                <span style={{ color: 'var(--text)' }} className="num font-semibold">142</span>
              </div>
              <div className="flex justify-between text-[13px] py-1.5 border-b" style={{ borderColor: 'var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>Current close rate</span>
                <span style={{ color: 'var(--text)' }} className="num font-semibold">12%</span>
              </div>
              <div className="pt-2.5">
                <div className="flex justify-between text-[13px] mb-1.5">
                  <span className="font-semibold" style={{ color: 'var(--text)' }}>Missed revenue / month</span>
                  <span className="num font-bold" style={{ color: 'var(--red)' }}>−$4,300</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: '62%' }} />
                </div>
              </div>
            </div>

            {/* Fix/Tip box */}
            <div className="mt-4 text-xs leading-relaxed rounded-lg p-3" style={{ background: 'var(--bg2)', color: 'var(--muted)' }}>
              <span className="font-bold" style={{ color: 'var(--orange)' }}>Fix: </span>
              Instant lead routing + automated SMS follow-up within 2 min
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
