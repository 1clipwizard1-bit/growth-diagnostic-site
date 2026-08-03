const industries = [
  {
    name: 'Local Services',
    examples: 'Plumbing · HVAC · Cleaning · Contractors · Landscaping',
    icon: '🔧',
    topBottleneck: 'Slow lead response time',
    avgLeak: '$4,300/mo',
  },
  {
    name: 'Consulting & Agencies',
    examples: 'Marketing · Design · B2B Services · Freelance',
    icon: '💼',
    topBottleneck: 'Discovery-to-proposal conversion gap',
    avgLeak: '$6,100/mo',
  },
  {
    name: 'Coaching & Education',
    examples: 'Online courses · High-ticket programs · Masterminds',
    icon: '🎓',
    topBottleneck: 'Webinar/VSL conversion below benchmark',
    avgLeak: '$5,200/mo',
  },
  {
    name: 'Clinics & Medical',
    examples: 'Dental · Chiro · Aesthetics · Health & Wellness',
    icon: '🏥',
    topBottleneck: 'No-show rate and front desk conversion gap',
    avgLeak: '$5,700/mo',
  },
];

export function Industries() {
  return (
    <section className="py-24 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="section-label mb-4" style={{ color: 'var(--muted)' }}>Industries Supported</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <h2>
            Built for businesses running paid ads
          </h2>
          <p className="max-w-sm text-sm" style={{ color: 'var(--muted)' }}>
            Every industry has a different bottleneck profile. The diagnostic is calibrated for each.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map(ind => (
            <div key={ind.name} className="card-premium p-6">
              <div className="text-3xl mb-4">{ind.icon}</div>
              <div className="font-bold mb-1" style={{ color: 'var(--text)' }}>{ind.name}</div>
              <div className="text-xs mb-4" style={{ color: 'var(--muted)' }}>{ind.examples}</div>
              <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Most common bottleneck</div>
                <div className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>{ind.topBottleneck}</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--red)' }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                    Avg. leak: <span className="num font-bold" style={{ color: 'var(--red)' }}>{ind.avgLeak}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
