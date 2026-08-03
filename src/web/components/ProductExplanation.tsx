const steps = [
  {
    num: '01',
    title: 'You answer 18 diagnostic questions',
    desc: 'Covers your business info, seasonality, ad spend, funnel metrics, and lead capturing. Takes under 7 minutes.',
  },
  {
    num: '02',
    title: 'The system runs your funnel math',
    desc: 'We validate your numbers, compare them against industry benchmarks, and calculate your unit economics.',
  },
  {
    num: '03',
    title: 'The bottleneck is isolated',
    desc: 'Out of 8 possible growth blockers, the diagnostic identifies your single most impactful constraint — the one costing the most.',
  },
  {
    num: '04',
    title: 'You receive a structured PDF report',
    desc: 'Includes your bottleneck diagnosis, the financial impact, a seasonality risk check, and a clear 90-day action plan.',
  },
];

export function ProductExplanation() {
  return (
    <section id="how-it-works" className="py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4" style={{ color: 'var(--muted)' }}>What It Is</div>
            <h2 className="mb-6">
              A simple report showing where customers drop off and how much it may be costing you
            </h2>
            <p className="mb-6" style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
              This isn’t a generic audit. You answer a few questions. We compare your numbers to industry benchmarks and show where your business is most likely leaking money.
            </p>

            {/* Methodology flow */}
            <div className="flex flex-wrap items-center gap-1.5 mb-6 text-[10px] sm:text-xs font-bold" style={{ color: 'var(--muted)' }}>
              <span>Your numbers</span>
              <span style={{ color: 'var(--orange)' }}>➔</span>
              <span>Validation</span>
              <span style={{ color: 'var(--orange)' }}>➔</span>
              <span>Benchmark</span>
              <span style={{ color: 'var(--orange)' }}>➔</span>
              <span>Business Math</span>
              <span style={{ color: 'var(--orange)' }}>➔</span>
              <span>Diagnosis</span>
              <span style={{ color: 'var(--orange)' }}>➔</span>
              <span>Action Plan</span>
            </div>

            <p className="text-xs mb-8 italic" style={{ color: 'var(--muted)' }}>
              *AI explains the findings. The business math comes first.
            </p>

            <div className="rounded-xl border p-5" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
              <div className="text-xs font-semibold mb-3" style={{ color: 'var(--muted)' }}>8 GROWTH BLOCKERS ANALYZED</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Lead response speed', 'Funnel conversion rate', 'Cost per acquisition', 'Offer-to-close ratio',
                  'Follow-up sequence', 'Tracking accuracy', 'Unit economics gap', 'Customer LTV vs. CAC'
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--orange)' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-5">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: i === 0 ? 'var(--orange)' : 'var(--bg2)', color: i === 0 ? '#0a0a0a' : 'var(--orange)', border: '1px solid', borderColor: i === 0 ? 'transparent' : 'var(--border)' }}>
                    {step.num}
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: 'var(--text)' }}>{step.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
