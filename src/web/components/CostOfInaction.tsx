export function CostOfInaction() {
  return (
    <section className="py-24 border-t" style={{ borderColor: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4">The Math You're Not Doing</div>
            <h2 className="font-black tracking-tight mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#f5f5f5' }}>
              Every month without a diagnosis is a month you're paying for it anyway.
            </h2>
            <p className="mb-6" style={{ color: '#a3a3a3', lineHeight: '1.8' }}>
              The average business running paid ads loses <strong style={{ color: '#f5f5f5' }}>$3,800–$6,200 per month</strong> to a single fixable funnel gap. Not traffic. Not the economy. A specific, diagnosable, fixable process problem.
            </p>
            <p className="mb-8" style={{ color: '#a3a3a3', lineHeight: '1.8' }}>
              The question isn't whether the bottleneck exists. It's whether you want to know what it is.
            </p>
            <a href="/diagnostic" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all" style={{ background: '#f97316', color: '#fff' }}
              onMouseOver={e => e.currentTarget.style.background = '#ea6c0a'}
              onMouseOut={e => e.currentTarget.style.background = '#f97316'}>
              Run My Diagnostic — $9.99
            </a>
          </div>

          <div className="space-y-4">
            {/* Inaction table */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#2a2a2a', background: '#111' }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                <div className="text-xs font-semibold" style={{ color: '#a3a3a3' }}>COST OF INACTION — EXAMPLE: $4,300/mo BOTTLENECK</div>
              </div>
              <div className="divide-y" style={{ borderColor: '#2a2a2a' }}>
                {[
                  { period: 'This month', loss: '$4,300', context: 'You could recover this with 1 fix' },
                  { period: '3 months', loss: '$12,900', context: 'Enough to hire a part-time person' },
                  { period: '6 months', loss: '$25,800', context: 'A full media buy cycle wasted' },
                  { period: '12 months', loss: '$51,600', context: 'Equivalent to a full salary' },
                ].map((row, i) => (
                  <div key={row.period} className="px-6 py-4 flex items-center justify-between" style={{ background: i === 3 ? 'rgba(239,68,68,0.04)' : 'transparent' }}>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: i === 3 ? '#f5f5f5' : '#a3a3a3' }}>{row.period}</div>
                      <div className="text-xs" style={{ color: '#555' }}>{row.context}</div>
                    </div>
                    <div className="text-xl font-black" style={{ color: i === 3 ? '#ef4444' : '#666' }}>{row.loss}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-5 flex gap-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(34,197,94,0.12)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 9L8 12L13 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: '#f5f5f5' }}>The diagnostic costs $9.99.</div>
                <div className="text-xs" style={{ color: '#a3a3a3' }}>If you're spending more than $3,000/month on ads, the ROI of knowing your biggest bottleneck is immediate. The cost of not knowing is compounding daily.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
