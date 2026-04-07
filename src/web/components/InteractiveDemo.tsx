import { useState } from 'react';

const industryData: Record<string, {
  name: string;
  bottlenecks: { rank: number; title: string; desc: string; impact: string }[];
  avgLeak: string;
}> = {
  local: {
    name: 'Local Service Business',
    bottlenecks: [
      { rank: 1, title: 'Slow lead response time', desc: 'Most local service leads go cold within 5 minutes of submission. Response times over 15 min result in up to 80% contact rate drop.', impact: '$3,800–$6,200/mo' },
      { rank: 2, title: 'Low call booking rate', desc: 'Leads are generated but not being converted to booked calls. Often caused by weak offer framing or unclear next-step instructions.', impact: '$2,100–$4,500/mo' },
      { rank: 3, title: 'Missing conversion tracking', desc: 'Without accurate attribution, ad spend is optimized toward the wrong actions — inflating CPL and lowering ROAS.', impact: '$1,500–$3,000/mo' },
    ],
    avgLeak: '$4,300',
  },
  agency: {
    name: 'Consulting / Agency',
    bottlenecks: [
      { rank: 1, title: 'Broken discovery-to-proposal ratio', desc: 'Too many discovery calls that never convert to proposals. Usually a qualification or positioning problem, not a traffic problem.', impact: '$5,200–$9,800/mo' },
      { rank: 2, title: 'High churn / low LTV', desc: 'Acquiring clients profitably but losing them at month 3–4. LTV drops below CAC threshold within 6 months.', impact: '$4,000–$7,000/mo' },
      { rank: 3, title: 'No retargeting or nurture sequence', desc: 'Warm leads are being abandoned after first contact. 80% of B2B deals require 5+ touchpoints.', impact: '$2,800–$5,100/mo' },
    ],
    avgLeak: '$6,100',
  },
  coaching: {
    name: 'Coaching / Education',
    bottlenecks: [
      { rank: 1, title: 'Webinar / VSL conversion below benchmark', desc: 'Webinar show rates under 30% or VSL completion under 40% indicate a pre-sell gap. Benchmark is 45–55% show rate.', impact: '$3,500–$7,200/mo' },
      { rank: 2, title: 'Low call-to-enroll close rate', desc: 'Sales calls are happening but close rates are below 20%. Benchmark for high-ticket coaching is 25–35%.', impact: '$4,100–$6,500/mo' },
      { rank: 3, title: 'Offer-market mismatch', desc: 'Ad CTR is acceptable but landing page conversion is under 3%. The traffic is relevant; the offer framing is not.', impact: '$2,200–$4,800/mo' },
    ],
    avgLeak: '$5,200',
  },
  clinic: {
    name: 'Clinic / Medical',
    bottlenecks: [
      { rank: 1, title: 'No-show rate above 18%', desc: 'Booking rate is healthy but actual appointments suffer from high no-shows. Automated reminders + prep sequences reduce this by 60%.', impact: '$4,500–$8,000/mo' },
      { rank: 2, title: 'Front desk conversion gap', desc: 'Inbound phone leads convert at 30–40% when 55–65% is achievable. Front desk scripting and inquiry handling is the bottleneck.', impact: '$3,100–$5,500/mo' },
      { rank: 3, title: 'Unapplied patient reactivation', desc: 'Dormant patient database sitting unused. One reactivation campaign per quarter typically yields 8–12% return rate.', impact: '$2,000–$4,200/mo' },
    ],
    avgLeak: '$5,700',
  },
  other: {
    name: 'Other Business',
    bottlenecks: [
      { rank: 1, title: 'Cost-per-close exceeding margin threshold', desc: 'Gross margins are being eroded by acquisition cost. Unit economics are negative at current funnel efficiency.', impact: '$3,000–$6,000/mo' },
      { rank: 2, title: 'No systematic follow-up process', desc: 'Leads are falling through the cracks after initial contact. Automated follow-up sequences recapture 20–35% of lost leads.', impact: '$2,500–$4,500/mo' },
      { rank: 3, title: 'Offer clarity gap', desc: 'Landing page messaging is misaligned with ad intent, causing high bounce rates and poor lead quality signals.', impact: '$1,800–$3,500/mo' },
    ],
    avgLeak: '$4,000',
  },
};

export function InteractiveDemo() {
  const [selected, setSelected] = useState<string>('');
  const [revealed, setRevealed] = useState(false);

  const data = selected ? industryData[selected] : null;

  return (
    <section className="py-24 border-t" style={{ borderColor: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4">Mini Diagnostic Preview</div>
            <h2 className="font-black tracking-tight mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#f5f5f5' }}>
              What's the most common bottleneck in your industry?
            </h2>
            <p className="mb-8" style={{ color: '#a3a3a3' }}>
              Select your business type to see the top 3 revenue killers in your industry — then run the full diagnostic to find out which one is costing you the most.
            </p>

            <div className="space-y-3 mb-6">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#f5f5f5' }}>Select your business type:</label>
              {[
                { key: 'local', label: 'Local Service Business', desc: 'Plumbing, HVAC, cleaning, contractors…' },
                { key: 'agency', label: 'Consulting / Agency', desc: 'Marketing, design, B2B services…' },
                { key: 'coaching', label: 'Coaching / Education', desc: 'Online courses, high-ticket coaching…' },
                { key: 'clinic', label: 'Clinic / Medical', desc: 'Dental, chiro, aesthetics, health…' },
                { key: 'other', label: 'Other Business', desc: 'E-commerce, SaaS, mixed model…' },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => { setSelected(opt.key); setRevealed(false); setTimeout(() => setRevealed(true), 100); }}
                  className="w-full text-left px-4 py-3 rounded-xl border transition-all"
                  style={{
                    borderColor: selected === opt.key ? '#f97316' : '#2a2a2a',
                    background: selected === opt.key ? 'rgba(249,115,22,0.08)' : '#111',
                    boxShadow: selected === opt.key ? '0 0 16px rgba(249,115,22,0.12)' : 'none',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm" style={{ color: selected === opt.key ? '#f97316' : '#f5f5f5' }}>{opt.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#666' }}>{opt.desc}</div>
                    </div>
                    {selected === opt.key && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: '#f97316' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            {!data ? (
              <div className="rounded-2xl border p-8 flex flex-col items-center justify-center text-center min-h-80" style={{ borderColor: '#2a2a2a', background: '#111', borderStyle: 'dashed' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: '#1c1c1c' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#666" strokeWidth="1.5"/><path d="M10 7V10M10 13V13.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div className="font-semibold mb-2" style={{ color: '#a3a3a3' }}>Select your business type</div>
                <div className="text-sm" style={{ color: '#555' }}>We'll show you the most common bottlenecks in your industry</div>
              </div>
            ) : (
              <div className={revealed ? 'animate-fade-up' : 'opacity-0'}>
                <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#2a2a2a', background: '#111' }}>
                  <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: '#a3a3a3' }}>INDUSTRY ANALYSIS</div>
                      <div className="font-bold" style={{ color: '#f5f5f5' }}>{data.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs mb-0.5" style={{ color: '#666' }}>Avg. monthly leak</div>
                      <div className="font-black text-xl" style={{ color: '#ef4444' }}>{data.avgLeak}</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-semibold mb-4" style={{ color: '#a3a3a3' }}>TOP 3 REVENUE KILLERS IN THIS INDUSTRY</div>
                    <div className="space-y-4">
                      {data.bottlenecks.map((b, i) => (
                        <div key={b.rank} className="rounded-xl border p-4" style={{ borderColor: i === 0 ? 'rgba(239,68,68,0.3)' : '#2a2a2a', background: i === 0 ? 'rgba(239,68,68,0.04)' : '#161616' }}>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-black" style={{ background: i === 0 ? '#ef4444' : '#2a2a2a', color: i === 0 ? '#fff' : '#666' }}>
                              {b.rank}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm mb-1" style={{ color: i === 0 ? '#f5f5f5' : '#a3a3a3' }}>{b.title}</div>
                              <div className="text-xs leading-relaxed mb-2" style={{ color: '#666' }}>{b.desc}</div>
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                                {b.impact}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-xl border p-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                      <div className="text-xs mb-3" style={{ color: '#666' }}>This is industry-level data. The full diagnostic identifies <span className="font-semibold" style={{ color: '#f97316' }}>your specific bottleneck</span> based on your actual numbers.</div>
                      <a href="/diagnostic" className="block w-full text-center py-3 rounded-lg font-bold text-sm transition-all" style={{ background: '#f97316', color: '#fff' }}
                        onMouseOver={e => e.currentTarget.style.background = '#ea6c0a'}
                        onMouseOut={e => e.currentTarget.style.background = '#f97316'}>
                        Run My Full Diagnostic — $9.99
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
