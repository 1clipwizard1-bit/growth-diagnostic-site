const problems = [
  {
    icon: '📣',
    wrong: 'You think: "I need more traffic"',
    real: 'Reality: Your funnel converts at 1.2% when competitors convert at 4–6%',
    loss: '$3,800/mo lost',
  },
  {
    icon: '📞',
    wrong: 'You think: "My leads aren\'t quality"',
    real: 'Reality: 60% of inbound leads never get a follow-up within 1 hour',
    loss: '$5,100/mo lost',
  },
  {
    icon: '📊',
    wrong: 'You think: "My ads aren\'t working"',
    real: 'Reality: Your cost-per-lead is fine. Your cost-per-close is broken',
    loss: '$4,200/mo lost',
  },
];

export function ProblemFraming() {
  return (
    <section className="py-24 border-t" style={{ borderColor: '#1a1a1a', background: '#0d0d0d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="section-label mb-4">The Real Problem</div>
          <h2 className="font-black tracking-tight mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#f5f5f5' }}>
            Most businesses running paid ads are treating the symptom, not the disease.
          </h2>
          <p style={{ color: '#a3a3a3' }}>
            You're not losing money because of bad traffic. You're losing it because of a specific, identifiable gap in your funnel economics — one that gets more expensive every month you ignore it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div key={p.wrong} className="rounded-xl border p-6 card-hover" style={{ background: '#111', borderColor: '#2a2a2a' }}>
              <div className="text-2xl mb-4">{p.icon}</div>
              <div className="text-sm font-medium mb-3 line-through" style={{ color: '#666' }}>{p.wrong}</div>
              <div className="text-sm font-semibold mb-4" style={{ color: '#f5f5f5' }}>{p.real}</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1V9M5 9L2 6M5 9L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {p.loss}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border p-6 flex flex-col md:flex-row items-start md:items-center gap-6" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
          <div className="flex-1">
            <div className="font-bold text-base mb-1" style={{ color: '#f5f5f5' }}>The bottleneck is already costing you money this month.</div>
            <div className="text-sm" style={{ color: '#a3a3a3' }}>Every day without a diagnosis is a day you're paying for leads that never convert — not because of the leads, but because of a fixable process gap.</div>
          </div>
          <a href="/diagnostic" className="shrink-0 px-6 py-3 rounded-lg font-semibold text-sm transition-all" style={{ background: '#f97316', color: '#fff' }}
            onMouseOver={e => e.currentTarget.style.background = '#ea6c0a'}
            onMouseOut={e => e.currentTarget.style.background = '#f97316'}>
            Find My Bottleneck
          </a>
        </div>
      </div>
    </section>
  );
}
