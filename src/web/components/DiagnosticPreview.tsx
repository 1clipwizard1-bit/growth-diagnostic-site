export function DiagnosticPreview() {
  return (
    <section className="py-24 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-label mb-4" style={{ color: 'var(--muted)' }}>Sample Output</div>
        <h2 className="mb-4">
          This is what your diagnostic report looks like
        </h2>
        <p className="mb-12 max-w-2xl" style={{ color: 'var(--muted)' }}>
          Real numbers, real benchmarks, real financial impact. Not generic advice — a specific diagnosis for your specific funnel.
        </p>

        {/* Report card */}
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          {/* Report header */}
          <div className="border-b px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: 'var(--muted)' }}>BUSINESS GROWTH DIAGNOSTIC · Sample Report</div>
              <div className="font-bold text-lg" style={{ color: 'var(--text)' }}>Sunrise Plumbing Co.</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>Local Service Business · $15,000/mo ad spend · Generated March 2026</div>
            </div>
            <div className="flex gap-3">
              <div className="text-center px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                <div className="text-lg font-black num" style={{ color: 'var(--red)' }}>1</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>Critical issue</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                <div className="text-lg font-black num" style={{ color: 'var(--orange)' }}>3</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>Gaps found</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                <div className="text-lg font-black num" style={{ color: '#22c55e' }}>$4,300</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>Mo. opportunity</div>
              </div>
            </div>
          </div>

          <div className="p-8 grid lg:grid-cols-3 gap-8">
            {/* Left: bottleneck */}
            <div className="lg:col-span-1">
              <div className="section-label mb-4" style={{ color: 'var(--muted)' }}>Bottleneck Diagnosis</div>
              <div className="warning-block mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.15)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L14 12H2L8 2Z" stroke="var(--red)" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 7V9M8 11V11.5" stroke="var(--red)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <div>
                    <div className="warning-block-label mb-0">⚠ PRIMARY BOTTLENECK</div>
                    <div className="font-bold" style={{ color: 'var(--text)' }}>Slow Lead Response Time</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Your average response to inbound leads is 52 minutes. Industry benchmark for local services is under 15 minutes. After 5 minutes, lead conversion probability drops by 80%.
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                  <div className="text-xs mb-2" style={{ color: 'var(--muted)' }}>Response time comparison</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'var(--muted)' }}>Your avg.</span>
                        <span className="font-bold" style={{ color: 'var(--red)' }}>52 min</span>
                      </div>
                      <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '87%', background: 'var(--red)' }} /></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'var(--muted)' }}>Benchmark</span>
                        <span className="font-bold" style={{ color: '#22c55e' }}>&lt;15 min</span>
                      </div>
                      <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '25%', background: '#22c55e' }} /></div>
                    </div>
                  </div>
                </div>

                {/* Fix/Tip box */}
                <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                  <div className="text-xs mb-2" style={{ color: 'var(--muted)' }}>Suggested fix</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                    <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>Fix: </span>
                    Instant lead routing + automated SMS follow-up within 2 minutes of form submission
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: funnel + unit economics */}
            <div className="lg:col-span-1">
              <div className="section-label mb-4" style={{ color: 'var(--muted)' }}>Funnel Analysis</div>
              <div className="rounded-xl border p-5 mb-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                <div className="space-y-3">
                  {[
                    { label: 'Impressions', value: '42,000', pct: 100, color: 'var(--orange)' },
                    { label: 'Clicks', value: '1,680', pct: 75, color: 'var(--orange)' },
                    { label: 'Leads', value: '142', pct: 52, color: 'var(--orange)' },
                    { label: 'Contacted', value: '68', pct: 33, color: 'var(--orange)' },
                    { label: 'Booked', value: '24', pct: 18, color: 'var(--red)' },
                    { label: 'Closed', value: '17', pct: 10, color: 'var(--red)' },
                  ].map(row => (
                    <div key={row.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'var(--muted)' }}>{row.label}</span>
                        <span className="font-semibold num" style={{ color: 'var(--text)' }}>{row.value}</span>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${row.pct}%`, background: row.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-label mb-3" style={{ color: 'var(--muted)' }}>Unit Economics</div>
              <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                <div className="space-y-2">
                  {[
                    { label: 'Cost per lead (CPL)', value: '$105.63', flag: false },
                    { label: 'Cost per close (CPC)', value: '$882.35', flag: true },
                    { label: 'Avg. deal value', value: '$1,800', flag: false },
                    { label: 'ROAS', value: '1.7x', flag: true },
                    { label: 'Benchmark ROAS', value: '3.2x', flag: false },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-xs py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                      <span style={{ color: 'var(--muted)' }}>{row.label}</span>
                      <span className="font-bold num" style={{ color: row.flag ? 'var(--red)' : 'var(--text)' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seasonality block */}
              <div className="section-label mb-3 mt-6" style={{ color: 'var(--muted)' }}>Seasonality Risk Check</div>
              <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--orange)' }}>⚠ SEASONALITY RISK DETECTED</div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                  Your answers suggest seasonality may be affecting how you read your marketing numbers. This diagnostic can flag the risk, but a full seasonality adjustment requires historical monthly data.
                </p>
                <div className="text-xs p-2 rounded" style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }}>
                  <span className="font-bold" style={{ color: 'var(--orange)' }}>Next Step: </span>
                  Before increasing or cutting ad spend, compare this period against the same period last year.
                </div>
              </div>
            </div>

            {/* Right: revenue opportunity */}
            <div className="lg:col-span-1">
              <div className="section-label mb-4" style={{ color: 'var(--muted)' }}>Revenue Opportunity</div>
              <div className="rounded-xl border p-5 mb-4" style={{ borderColor: 'rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.04)' }}>
                <div className="text-3xl font-black mb-1 num" style={{ color: '#22c55e' }}>+$4,300</div>
                <div className="text-sm mb-3" style={{ color: 'var(--muted)' }}>Estimated monthly revenue recovered by fixing primary bottleneck</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>
                  If response time drops from 52 min → 8 min, contact rate improves from 48% → 72%, adding ~7 closed deals/month at $1,800 avg. deal value.
                </div>
              </div>

              <div className="section-label mb-3" style={{ color: 'var(--muted)' }}>Cost of Inaction</div>
              <div className="rounded-xl border p-5 mb-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                <div className="space-y-2 text-xs">
                  {[
                    { period: 'This month', cost: '$4,300' },
                    { period: '3 months', cost: '$12,900' },
                    { period: '6 months', cost: '$25,800' },
                    { period: '12 months', cost: '$51,600' },
                  ].map(row => (
                    <div key={row.period} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                      <span style={{ color: 'var(--muted)' }}>{row.period}</span>
                      <span className="font-bold num" style={{ color: 'var(--red)' }}>{row.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-label mb-3" style={{ color: 'var(--muted)' }}>90-Day Action Plan</div>
              <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                <div className="space-y-2">
                  {[
                    { day: 'Week 1', action: 'Set up instant lead routing system' },
                    { day: 'Week 2', action: 'Deploy 3-touch SMS follow-up sequence' },
                    { day: 'Week 3–4', action: 'Implement conversion tracking' },
                    { day: 'Month 2–3', action: 'A/B test landing page offer' },
                  ].map(item => (
                    <div key={item.day} className="flex gap-3 text-xs items-center">
                      <div className="shrink-0 px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid var(--border)', color: 'var(--orange)' }}>{item.day}</div>
                      <span style={{ color: 'var(--muted)' }}>{item.action}</span>
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
