const steps = [
  {
    num: '01',
    title: 'You answer 12 diagnostic questions',
    desc: 'Covers your ad spend, funnel stages, lead volume, close rate, response time, and average deal value. Takes under 7 minutes.',
  },
  {
    num: '02',
    title: 'The system runs your funnel math',
    desc: 'We calculate your unit economics, compare them against industry benchmarks, and identify where the largest gap exists.',
  },
  {
    num: '03',
    title: 'The bottleneck is isolated',
    desc: 'Out of 8 possible growth blockers, the diagnostic identifies your single most impactful constraint — the one costing the most.',
  },
  {
    num: '04',
    title: 'You receive a structured PDF report',
    desc: 'Includes your bottleneck diagnosis, the financial impact, a benchmark comparison, cost of inaction, and a clear suggested fix.',
  },
];

export function ProductExplanation() {
  return (
    <section id="how-it-works" className="py-24 border-t" style={{ borderColor: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4">What It Is</div>
            <h2 className="font-black tracking-tight mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#f5f5f5' }}>
              A structured financial analysis of your growth constraints
            </h2>
            <p className="mb-8" style={{ color: '#a3a3a3', lineHeight: '1.8' }}>
              The Business Growth Diagnostic is not a quiz or a generic audit. It's a systematic analysis that applies funnel economics logic to your actual numbers — then benchmarks them against your industry to quantify the exact revenue impact of your biggest gap.
            </p>
            <div className="rounded-xl border p-5" style={{ background: '#111', borderColor: '#2a2a2a' }}>
              <div className="text-xs font-semibold mb-3" style={{ color: '#a3a3a3' }}>8 GROWTH BLOCKERS ANALYZED</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Lead response speed', 'Funnel conversion rate', 'Cost per acquisition', 'Offer-to-close ratio',
                  'Follow-up sequence', 'Tracking accuracy', 'Unit economics gap', 'Customer LTV vs. CAC'
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs" style={{ color: '#a3a3a3' }}>
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: '#f97316' }} />
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
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: i === 0 ? '#f97316' : '#1c1c1c', color: i === 0 ? '#fff' : '#f97316', border: '1px solid', borderColor: i === 0 ? 'transparent' : '#2a2a2a' }}>
                    {step.num}
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: '#f5f5f5' }}>{step.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: '#a3a3a3' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
