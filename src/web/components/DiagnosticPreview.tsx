export function DiagnosticPreview() {
  return (
    <section className="py-24 border-t" style={{ borderColor: '#1a1a1a', background: '#0d0d0d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-label mb-4">Sample Output</div>
        <h2 className="font-black tracking-tight mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#f5f5f5' }}>
          This is what your diagnostic report looks like
        </h2>
        <p className="mb-12 max-w-2xl" style={{ color: '#a3a3a3' }}>
          Real numbers, real benchmarks, real financial impact. Not generic advice — a specific diagnosis for your specific funnel.
        </p>

        {/* Report card */}
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#2a2a2a', background: '#111' }}>
          {/* Report header */}
          <div className="border-b px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: '#a3a3a3' }}>BUSINESS GROWTH DIAGNOSTIC · REPORT #1847</div>
              <div className="font-bold text-lg" style={{ color: '#f5f5f5' }}>Sunrise Plumbing Co.</div>
              <div className="text-sm" style={{ color: '#666' }}>Local Service Business · $15,000/mo ad spend · Generated March 2026</div>
            </div>
            <div className="flex gap-3">
              <div className="text-center px-4 py-2 rounded-lg border" style={{ borderColor: '#2a2a2a', background: '#0d0d0d' }}>
                <div className="text-lg font-black" style={{ color: '#ef4444' }}>1</div>
                <div className="text-xs" style={{ color: '#666' }}>Critical issue</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg border" style={{ borderColor: '#2a2a2a', background: '#0d0d0d' }}>
                <div className="text-lg font-black" style={{ color: '#f97316' }}>3</div>
                <div className="text-xs" style={{ color: '#666' }}>Gaps found</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg border" style={{ borderColor: '#2a2a2a', background: '#0d0d0d' }}>
                <div className="text-lg font-black" style={{ color: '#22c55e' }}>$4,300</div>
                <div className="text-xs" style={{ color: '#666' }}>Mo. opportunity</div>
              </div>
            </div>
          </div>

          <div className="p-8 grid lg:grid-cols-3 gap-8">
            {/* Left: bottleneck */}
            <div className="lg:col-span-1">
              <div className="section-label mb-4">Bottleneck Diagnosis</div>
              <div className="rounded-xl border p-5 mb-4" style={{ borderColor: '#ef4444', background: 'rgba(239,68,68,0.04)' }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.15)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L14 12H2L8 2Z" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 7V9M8 11V11.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: '#ef4444' }}>PRIMARY BOTTLENECK</div>
                    <div className="font-bold" style={{ color: '#f5f5f5' }}>Slow Lead Response Time</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#a3a3a3' }}>
                  Your average response to inbound leads is 52 minutes. Industry benchmark for local services is under 15 minutes. After 5 minutes, lead conversion probability drops by 80%.
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border p-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                  <div className="text-xs mb-2" style={{ color: '#666' }}>Response time comparison</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: '#a3a3a3' }}>Your avg.</span>
                        <span className="font-bold" style={{ color: '#ef4444' }}>52 min</span>
                      </div>
                      <div className="metric-bar"><div className="metric-bar-fill-red" style={{ width: '87%' }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: '#a3a3a3' }}>Benchmark</span>
                        <span className="font-bold" style={{ color: '#22c55e' }}>&lt;15 min</span>
                      </div>
                      <div className="metric-bar"><div className="metric-bar-fill" style={{ width: '25%', background: '#22c55e' }} /></div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                  <div className="text-xs mb-2" style={{ color: '#666' }}>Suggested fix</div>
                  <div className="text-sm font-medium" style={{ color: '#f5f5f5' }}>Instant lead routing + automated SMS follow-up within 2 minutes of form submission</div>
                </div>
              </div>
            </div>

            {/* Middle: funnel + unit economics */}
            <div className="lg:col-span-1">
              <div className="section-label mb-4">Funnel Analysis</div>
              <div className="rounded-xl border p-5 mb-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                <div className="space-y-3">
                  {[
                    { label: 'Impressions', value: '42,000', pct: 100, color: '#f97316' },
                    { label: 'Clicks', value: '1,680', pct: 75, color: '#f97316' },
                    { label: 'Leads', value: '142', pct: 52, color: '#f59e0b' },
                    { label: 'Contacted', value: '68', pct: 33, color: '#f59e0b' },
                    { label: 'Booked', value: '24', pct: 18, color: '#ef4444' },
                    { label: 'Closed', value: '17', pct: 10, color: '#ef4444' },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: '#a3a3a3' }}>{row.label}</span>
                        <span className="font-semibold" style={{ color: '#f5f5f5' }}>{row.value}</span>
                      </div>
                      <div className="metric-bar">
                        <div className="metric-bar-fill" style={{ width: `${row.pct}%`, background: row.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-label mb-3">Unit Economics</div>
              <div className="rounded-xl border p-5" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                <div className="space-y-2">
                  {[
                    { label: 'Cost per lead (CPL)', value: '$105.63', flag: false },
                    { label: 'Cost per close (CPC)', value: '$882.35', flag: true },
                    { label: 'Avg. deal value', value: '$1,800', flag: false },
                    { label: 'ROAS', value: '1.7x', flag: true },
                    { label: 'Benchmark ROAS', value: '3.2x', flag: false },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-xs py-1.5 border-b last:border-0" style={{ borderColor: '#2a2a2a' }}>
                      <span style={{ color: '#a3a3a3' }}>{row.label}</span>
                      <span className="font-bold" style={{ color: row.flag ? '#ef4444' : '#f5f5f5' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: revenue opportunity */}
            <div className="lg:col-span-1">
              <div className="section-label mb-4">Revenue Opportunity</div>
              <div className="rounded-xl border p-5 mb-4" style={{ borderColor: '#22c55e', background: 'rgba(34,197,94,0.04)' }}>
                <div className="text-3xl font-black mb-1" style={{ color: '#22c55e' }}>+$4,300</div>
                <div className="text-sm mb-3" style={{ color: '#a3a3a3' }}>Estimated monthly revenue recovered by fixing primary bottleneck</div>
                <div className="text-xs" style={{ color: '#666' }}>
                  If response time drops from 52 min → 8 min, contact rate improves from 48% → 72%, adding ~7 closed deals/month at $1,800 avg. deal value.
                </div>
              </div>

              <div className="section-label mb-3">Cost of Inaction</div>
              <div className="rounded-xl border p-5 mb-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                <div className="space-y-2 text-xs">
                  {[
                    { period: 'This month', cost: '$4,300' },
                    { period: '3 months', cost: '$12,900' },
                    { period: '6 months', cost: '$25,800' },
                    { period: '12 months', cost: '$51,600' },
                  ].map(row => (
                    <div key={row.period} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: '#2a2a2a' }}>
                      <span style={{ color: '#a3a3a3' }}>{row.period}</span>
                      <span className="font-bold" style={{ color: '#ef4444' }}>{row.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-label mb-3">90-Day Action Plan</div>
              <div className="rounded-xl border p-5" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                <div className="space-y-2">
                  {[
                    { day: 'Week 1', action: 'Set up instant lead routing system' },
                    { day: 'Week 2', action: 'Deploy 3-touch SMS follow-up sequence' },
                    { day: 'Week 3–4', action: 'Implement conversion tracking' },
                    { day: 'Month 2–3', action: 'A/B test landing page offer' },
                  ].map(item => (
                    <div key={item.day} className="flex gap-3 text-xs">
                      <div className="shrink-0 px-1.5 py-0.5 rounded text-xs font-semibold" style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316' }}>{item.day}</div>
                      <span style={{ color: '#a3a3a3' }}>{item.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
