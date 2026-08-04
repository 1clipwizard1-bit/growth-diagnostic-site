export function CostOfInaction() {
  return (
    <section className="py-24 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4" style={{ color: 'var(--muted)' }}>The Math You're Not Doing</div>
            <h2 className="mb-6">
              Before you spend more, find out where the money is going.
            </h2>
            <p className="mb-6" style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
              If customers are dropping off somewhere in your journey, more traffic may only make the leak more expensive. The diagnostic shows where to look first — and what that leak may be costing you.
            </p>
            <p className="mb-8" style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
              In this example, one missed stage in the customer journey represents <strong style={{ color: 'var(--text)' }}>$4,300/month</strong> in lost revenue.
            </p>
            <a href="/diagnostic" className="btn-primary">
              See Where Customers Drop Off
              <span className="price-badge">$4.99</span>
            </a>
          </div>

          <div className="space-y-4">
            {/* Inaction table */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                <div className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>COST OF INACTION — Scenario: One hidden bottleneck worth $4,300/month</div>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {[
                  { period: 'This month', loss: '$4,300', context: 'You could recover this with 1 fix' },
                  { period: '3 months', loss: '$12,900', context: 'Enough to hire a part-time person' },
                  { period: '6 months', loss: '$25,800', context: 'A full media buy cycle wasted' },
                  { period: '12 months', loss: '$51,600', context: 'Equivalent to a full salary' },
                ].map((row, i) => (
                  <div key={row.period} className="px-6 py-4 flex items-center justify-between" style={{ background: i === 3 ? 'rgba(239,68,68,0.04)' : 'transparent' }}>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: i === 3 ? 'var(--text)' : 'var(--muted)' }}>{row.period}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{row.context}</div>
                    </div>
                    <div className="text-xl font-bold num" style={{ color: 'var(--red)' }}>–{row.loss}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-5 flex gap-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(34,197,94,0.12)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 9L8 12L13 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>The diagnostic costs $4.99.</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>If you're spending more than $3,000/month on ads, the ROI of knowing your biggest bottleneck is immediate. The cost of not knowing is compounding daily.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
