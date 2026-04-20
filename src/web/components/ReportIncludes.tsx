const CheckIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const items = [
  {
    title: 'Funnel Analysis',
    desc: 'Full breakdown of every stage in your funnel — from impression to close — with conversion rate at each step and where the biggest drop-off occurs.',
    iconPath: 'M9 2L3 5V9C3 12.3 5.7 15.4 9 16C12.3 15.4 15 12.3 15 9V5L9 2Z',
    iconType: 'path',
  },
  {
    title: 'Unit Economics Breakdown',
    desc: 'Your CPL, cost-per-close, ROAS, margin per deal, and LTV vs. CAC ratio — calculated from your actual inputs, not industry averages.',
    iconPath: 'rects',
    iconType: 'rects',
  },
  {
    title: 'Benchmark Comparison',
    desc: 'Your metrics scored against real industry benchmarks. See exactly where you rank and by how much — not as a percentage, but in dollars.',
    iconPath: 'circle-clock',
    iconType: 'circle-clock',
  },
  {
    title: 'Cost of Inaction Calculation',
    desc: 'The projected revenue lost at 1, 3, 6, and 12 months if the bottleneck is not addressed. Hard numbers, not theoretical.',
    iconPath: 'M3 9H15M3 5H11M3 13H9',
    iconType: 'lines',
  },
  {
    title: 'Bottleneck Diagnosis',
    desc: 'The single biggest constraint in your growth system, ranked by financial impact — with a clear explanation of why it\'s costing you revenue.',
    iconPath: 'M9 2L14 12H4L9 2Z',
    iconType: 'triangle',
  },
  {
    title: 'Revenue Opportunity Estimate',
    desc: 'If this bottleneck were fixed, this is the estimated monthly revenue gain — modeled from your specific funnel inputs and benchmark data.',
    iconPath: 'arrow-circle',
    iconType: 'arrow-circle',
  },
  {
    title: '90-Day Action Plan',
    desc: 'A prioritized, week-by-week action plan to address the bottleneck — with specific tactics and implementation sequence.',
    iconPath: 'M4 9L7.5 12.5L14 6',
    iconType: 'check',
  },
  {
    title: 'Structured PDF Report',
    desc: 'Everything delivered as a clean, professionally formatted PDF you can share with your team, media buyer, or implementation partner.',
    iconPath: 'doc',
    iconType: 'doc',
  },
];

function ItemIcon({ type, path }: { type: string; path: string }) {
  if (type === 'rects') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="10" width="3" height="6" rx="1" stroke="#f97316" strokeWidth="1.5"/>
        <rect x="7" y="6" width="3" height="10" rx="1" stroke="#f97316" strokeWidth="1.5"/>
        <rect x="12" y="2" width="3" height="14" rx="1" stroke="#f97316" strokeWidth="1.5"/>
      </svg>
    );
  }
  if (type === 'circle-clock') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#f97316" strokeWidth="1.5"/>
        <path d="M9 5V9L12 11" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'lines') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9H15M3 5H11M3 13H9" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'triangle') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L14 12H4L9 2Z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 7V10M9 12.5V13" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'arrow-circle') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C5.1 2 2 5.1 2 9C2 12.9 5.1 16 9 16C12.9 16 16 12.9 16 9" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 2L16 2L16 6" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 2L10 8" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'check') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 9L7.5 12.5L14 6" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === 'doc') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="2" width="12" height="14" rx="2" stroke="#f97316" strokeWidth="1.5"/>
        <path d="M6 6H12M6 9H12M6 12H9" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  // default path
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d={path} stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function ReportIncludes() {
  return (
    <section id="report" className="py-24 border-t" style={{ borderColor: '#1a1a1a', background: '#0d0d0d' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="section-label mb-4">What's Included</div>
            <h2 className="font-black tracking-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#f5f5f5' }}>
              Your report includes 8 sections.<br />
              <span style={{ color: '#a3a3a3' }}>All built around your actual numbers.</span>
            </h2>
          </div>
          <div className="shrink-0 px-6 py-4 rounded-xl border text-center" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
            <div className="text-3xl font-black mb-0.5" style={{ color: '#f97316' }}>$4.99</div>
            <div className="text-xs" style={{ color: '#666' }}>One-time · PDF delivered instantly</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border p-5 card-hover" style={{ background: '#111', borderColor: '#2a2a2a' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(249,115,22,0.1)' }}>
                <ItemIcon type={item.iconType} path={item.iconPath} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: '#f97316' }}>
                  <CheckIcon />
                </div>
                <div className="font-bold text-sm" style={{ color: '#f5f5f5' }}>{item.title}</div>
              </div>
              <div className="text-xs leading-relaxed" style={{ color: '#666' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
