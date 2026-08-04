const problems = [
  {
    icon: '📣',
    wrong: 'You think: "I need more traffic"',
    real: 'Reality: Maybe the traffic is fine — but customers drop off before they book, buy, or show up.',
    loss: 'More spend goes into the same broken path.',
  },
  {
    icon: '📞',
    wrong: 'You think: "My leads aren\'t quality"',
    real: 'Reality: More than half the people who ask for a quote never hear back within the hour. They hire whoever answers first.',
    loss: '$5,100/mo lost',
  },
  {
    icon: '📊',
    wrong: 'You think: "My ads aren\'t working"',
    real: 'Reality: You may not have an ad problem. You may have a follow-up or sales problem — leads come in, but too few become real jobs.',
    loss: '$4,200/mo lost',
  },
  {
    icon: '📅',
    wrong: 'You think: "Ads work in season, so we pause them in summer"',
    real: 'Reality: You may cut ads, increase spend, or wait it out — without knowing what actually needs fixing.',
    loss: 'Thousands overpaid every season',
  },
];

export function ProblemFraming() {
  return (
    <section className="py-24 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="section-label mb-4" style={{ color: 'var(--muted)' }}>The Real Problem</div>
          <h2 className="mb-4">
            Most businesses running paid ads are treating the symptom, not the disease.
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            You're not losing money because of bad traffic. You're losing it because of a specific, identifiable gap in your funnel economics — one that gets more expensive every month you ignore it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p) => (
            <div key={p.wrong} className="card-premium p-6 flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-4">{p.icon}</div>
                <div className="text-sm font-medium mb-3 line-through" style={{ color: 'var(--muted)' }}>{p.wrong}</div>
                <div className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>{p.real}</div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold self-start mt-2 border" style={{ background: 'rgba(239,68,68,0.04)', borderColor: 'rgba(239,68,68,0.2)', color: 'var(--red)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1V9M5 9L2 6M5 9L8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {p.loss}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border p-6 flex flex-col md:flex-row items-start md:items-center gap-6" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="flex-1">
            <div className="font-bold text-base mb-1" style={{ color: 'var(--text)' }}>The bottleneck is already costing you money this month.</div>
            <div className="text-sm" style={{ color: 'var(--muted)' }}>Every day without a diagnosis is a day you're paying for leads that never convert — not because of the leads, but because of a fixable process gap.</div>
          </div>
          <a href="/diagnostic" className="btn-primary shrink-0">
            See Where Your Money Is Leaking
            <span className="price-badge">$4.99</span>
          </a>
        </div>
      </div>
    </section>
  );
}
