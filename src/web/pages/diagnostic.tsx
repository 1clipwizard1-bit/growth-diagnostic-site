import { useState, useEffect } from 'react';

// ─── N8N Webhook ─────────────────────────────────────────────────────────────
const N8N_WEBHOOK_URL = 'https://learning11b.app.n8n.cloud/webhook/34e63fac-0d56-4720-8f08-366bee6e8d90';

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1
  businessType: string;
  leadSource: string;
  adSpend: string;
  // Step 2
  monthlyLeads: string;
  callsBooked: string;
  callsCompleted: string;
  customersClosed: string;
  // Step 3
  dealSize: string;
  profitMargin: string;
  salesCycle: string;
  totalRevenue: string;
  // Step 4
  responseTime: string;
  trackingQuality: string;
  followUpSystem: string;
  email: string;
}

const initial: FormData = {
  businessType: '', leadSource: '', adSpend: '',
  monthlyLeads: '', callsBooked: '', callsCompleted: '', customersClosed: '',
  dealSize: '', profitMargin: '', salesCycle: '', totalRevenue: '',
  responseTime: '', trackingQuality: '', followUpSystem: '', email: '',
};

// ─── Smart Tooltip Component ──────────────────────────────────────────────────
function SmartTooltip({ items }: { items: string[] }) {
  return (
    <div className="absolute left-0 top-full mt-2 z-50 rounded-xl border p-3 w-72 shadow-2xl"
      style={{ background: '#1c1c1c', borderColor: '#3a3a3a' }}>
      <div className="text-xs font-semibold mb-2" style={{ color: '#f97316' }}>EXAMPLES</div>
      <div className="grid grid-cols-2 gap-1.5">
        {items.map(item => (
          <div key={item} className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg"
            style={{ background: '#2a2a2a', color: '#a3a3a3' }}>
            <div className="w-1 h-1 rounded-full shrink-0" style={{ background: '#f97316' }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Field Components ─────────────────────────────────────────────────────────
function Label({ children, required, helper }: { children: React.ReactNode; required?: boolean; helper?: string }) {
  return (
    <div className="mb-2">
      <label className="font-semibold text-sm flex items-center gap-1" style={{ color: '#f5f5f5' }}>
        {children}
        {required && <span style={{ color: '#f97316' }}>*</span>}
      </label>
      {helper && <div className="text-xs mt-0.5" style={{ color: '#666' }}>{helper}</div>}
    </div>
  );
}

function Select({ value, onChange, options, placeholder, error }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string; error?: string;
}) {
  return (
    <div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border text-sm appearance-none outline-none transition-all"
        style={{
          background: '#161616', color: value ? '#f5f5f5' : '#555',
          borderColor: error ? '#ef4444' : value ? '#f97316' : '#2a2a2a',
          boxShadow: error ? '0 0 0 1px rgba(239,68,68,0.2)' : value ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
        }}
      >
        <option value="" disabled style={{ color: '#555' }}>{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <div className="text-xs mt-1" style={{ color: '#ef4444' }}>{error}</div>}
    </div>
  );
}

function NumberInput({ value, onChange, placeholder, helper, error, optional }: {
  value: string; onChange: (v: string) => void;
  placeholder: string; helper?: string; error?: string; optional?: boolean;
}) {
  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        min="0"
        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
        style={{
          background: '#161616', color: '#f5f5f5',
          borderColor: error ? '#ef4444' : value ? '#f97316' : '#2a2a2a',
          boxShadow: error ? '0 0 0 1px rgba(239,68,68,0.2)' : value ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
        }}
      />
      {helper && <div className="text-xs mt-1" style={{ color: '#555' }}>{helper}</div>}
      {error && <div className="text-xs mt-1" style={{ color: '#ef4444' }}>{error}</div>}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = ((step - 1) / (total - 1)) * 100;
  const labels = ['Business Profile', 'Funnel Metrics', 'Unit Economics', 'Performance'];
  return (
    <div className="mb-10">
      <div className="flex justify-between mb-3">
        {labels.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1" style={{ width: '25%' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              style={{
                background: i + 1 < step ? '#f97316' : i + 1 === step ? '#f97316' : '#1c1c1c',
                color: i + 1 <= step ? '#fff' : '#555',
                border: `2px solid ${i + 1 <= step ? '#f97316' : '#2a2a2a'}`,
              }}>
              {i + 1 < step
                ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : i + 1}
            </div>
            <span className="text-xs text-center hidden sm:block" style={{ color: i + 1 === step ? '#f97316' : '#555' }}>{label}</span>
          </div>
        ))}
      </div>
      <div className="h-1 rounded-full" style={{ background: '#1c1c1c' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ background: '#f97316', width: `${pct}%` }} />
      </div>
      <div className="flex justify-between mt-2 text-xs" style={{ color: '#555' }}>
        <span>Step {step} of {total}</span>
        <span>Approximate answers are fine</span>
      </div>
    </div>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────
const businessTypeTooltips: Record<string, string[]> = {
  local: ['Plumbing', 'HVAC', 'Roofing', 'Cleaning', 'Dental', 'Auto Repair', 'Landscaping', 'Electrical'],
  agency: ['Marketing Agency', 'SEO Agency', 'Design Studio', 'PR Firm', 'Web Dev', 'Consulting'],
  coaching: ['Online Courses', 'High-ticket Coaching', 'Masterminds', 'Group Programs', 'Tutoring'],
  clinic: ['Dental Clinic', 'Chiropractic', 'Aesthetics', 'Psychology', 'Physiotherapy', 'Optometry'],
  other: ['E-commerce', 'SaaS', 'Real Estate', 'Finance', 'Legal Services', 'Retail'],
};

function Step1({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start gap-2 mb-2 relative">
          <label className="font-semibold text-sm" style={{ color: '#f5f5f5' }}>
            Business Type <span style={{ color: '#f97316' }}>*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
              onFocus={() => setTooltip(true)}
              onBlur={() => setTooltip(false)}
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors"
              style={{ background: '#2a2a2a', color: '#a3a3a3', border: '1px solid #3a3a3a' }}
            >?</button>
            {tooltip && (
              <div className="absolute left-0 top-full mt-2 z-50 rounded-xl border p-3 w-72 shadow-2xl"
                style={{ background: '#1c1c1c', borderColor: '#3a3a3a' }}>
                <div className="text-xs mb-2" style={{ color: '#a3a3a3' }}>
                  Local service = businesses that get customers from a specific geographic area.
                </div>
                {data.businessType && businessTypeTooltips[data.businessType] && (
                  <>
                    <div className="text-xs font-semibold mb-2" style={{ color: '#f97316' }}>EXAMPLES FOR YOUR TYPE</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {businessTypeTooltips[data.businessType].map(item => (
                        <div key={item} className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg"
                          style={{ background: '#2a2a2a', color: '#a3a3a3' }}>
                          <div className="w-1 h-1 rounded-full shrink-0" style={{ background: '#f97316' }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Visual business type cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-1">
          {[
            { value: 'local', label: 'Local Service Business', desc: 'Plumbing · HVAC · Cleaning · Dental · Roofing', icon: '🔧' },
            { value: 'agency', label: 'Agency / Consulting', desc: 'Marketing · SEO · Design · B2B Services', icon: '💼' },
            { value: 'coaching', label: 'Coaching / Education', desc: 'Online courses · High-ticket programs', icon: '🎓' },
            { value: 'clinic', label: 'Clinic / Medical', desc: 'Dental · Chiro · Aesthetics · Health', icon: '🏥' },
            { value: 'other', label: 'Other', desc: 'E-commerce · SaaS · Real Estate · Finance', icon: '📦' },
          ].map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('businessType', opt.value)}
              className="text-left p-4 rounded-xl border transition-all"
              style={{
                background: data.businessType === opt.value ? 'rgba(249,115,22,0.08)' : '#161616',
                borderColor: data.businessType === opt.value ? '#f97316' : '#2a2a2a',
                boxShadow: data.businessType === opt.value ? '0 0 16px rgba(249,115,22,0.12)' : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{opt.icon}</span>
                <div>
                  <div className="font-semibold text-sm" style={{ color: data.businessType === opt.value ? '#f97316' : '#f5f5f5' }}>{opt.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#555' }}>{opt.desc}</div>
                </div>
                {data.businessType === opt.value && (
                  <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: '#f97316' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </div>

              {/* Smart tooltip examples shown inline when selected */}
              {data.businessType === opt.value && businessTypeTooltips[opt.value] && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: '#2a2a2a' }}>
                  <div className="text-xs font-semibold mb-2" style={{ color: '#f97316' }}>COMMON EXAMPLES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {businessTypeTooltips[opt.value].map(ex => (
                      <span key={ex} className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#2a2a2a', color: '#a3a3a3' }}>{ex}</span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
        {errors.businessType && <div className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.businessType}</div>}
      </div>

      <div>
        <Label required helper="Where do most of your new customers come from?">Main Lead Source</Label>
        <Select value={data.leadSource} onChange={v => onChange('leadSource', v)} placeholder="Select lead source" error={errors.leadSource}
          options={[
            { value: 'paid-ads', label: 'Paid Ads (Google, Meta, etc.)' },
            { value: 'seo', label: 'SEO / Organic Search' },
            { value: 'referrals', label: 'Referrals / Word of Mouth' },
            { value: 'mixed', label: 'Mixed / Multiple channels' },
          ]}
        />
      </div>

      <div>
        <Label required helper="Include all ad platforms combined">Monthly Ad Spend</Label>
        <Select value={data.adSpend} onChange={v => onChange('adSpend', v)} placeholder="Select spend range" error={errors.adSpend}
          options={[
            { value: 'under-2k', label: 'Under $2,000' },
            { value: '2k-5k', label: '$2,000 – $5,000' },
            { value: '5k-10k', label: '$5,000 – $10,000' },
            { value: '10k-25k', label: '$10,000 – $25,000' },
            { value: '25k+', label: '$25,000+' },
          ]}
        />
      </div>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────
function Step2({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  const fields: { key: keyof FormData; label: string; helper: string; placeholder: string }[] = [
    { key: 'monthlyLeads', label: 'Monthly Leads', helper: 'Total inbound leads generated in the last 30 days', placeholder: 'e.g. 120' },
    { key: 'callsBooked', label: 'Calls / Appointments Booked', helper: 'How many leads booked a call or appointment?', placeholder: 'e.g. 55' },
    { key: 'callsCompleted', label: 'Calls / Appointments Completed', helper: 'How many actually showed up?', placeholder: 'e.g. 38' },
    { key: 'customersClosed', label: 'Customers Closed', helper: 'How many became paying customers?', placeholder: 'e.g. 12' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
        <div className="text-xs font-semibold mb-1" style={{ color: '#f97316' }}>WHY THIS MATTERS</div>
        <div className="text-xs" style={{ color: '#a3a3a3' }}>
          These numbers reveal where leads are dropping out of your funnel. The gap between any two steps is where your revenue leak lives.
        </div>
      </div>

      {fields.map(f => (
        <div key={f.key}>
          <Label required helper={f.helper}>{f.label}</Label>
          <NumberInput value={data[f.key]} onChange={v => onChange(f.key, v)} placeholder={f.placeholder} error={errors[f.key]} />
        </div>
      ))}

      {/* Visual funnel mini-preview */}
      {data.monthlyLeads && data.callsBooked && data.callsCompleted && data.customersClosed && (
        <div className="rounded-xl border p-4" style={{ borderColor: '#2a2a2a', background: '#111' }}>
          <div className="text-xs font-semibold mb-3" style={{ color: '#a3a3a3' }}>YOUR FUNNEL PREVIEW</div>
          <div className="space-y-2">
            {[
              { label: 'Leads', value: parseInt(data.monthlyLeads) || 0, base: parseInt(data.monthlyLeads) || 1 },
              { label: 'Booked', value: parseInt(data.callsBooked) || 0, base: parseInt(data.monthlyLeads) || 1 },
              { label: 'Completed', value: parseInt(data.callsCompleted) || 0, base: parseInt(data.monthlyLeads) || 1 },
              { label: 'Closed', value: parseInt(data.customersClosed) || 0, base: parseInt(data.monthlyLeads) || 1 },
            ].map(row => {
              const pct = Math.min(100, Math.round((row.value / row.base) * 100));
              return (
                <div key={row.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: '#666' }}>{row.label}</span>
                    <span style={{ color: '#f5f5f5' }}>{row.value} <span style={{ color: '#555' }}>({pct}%)</span></span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: '#2a2a2a' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#f97316' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────
function Step3({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  return (
    <div className="space-y-6">
      <div>
        <Label required helper="How much does one customer typically pay you? (contract value or average order)">Average Deal Size ($)</Label>
        <NumberInput value={data.dealSize} onChange={v => onChange('dealSize', v)} placeholder="e.g. 1800" error={errors.dealSize} />
      </div>

      <div>
        <Label required helper="What % of revenue is profit after all costs?">Profit Margin</Label>
        <Select value={data.profitMargin} onChange={v => onChange('profitMargin', v)} placeholder="Select margin range" error={errors.profitMargin}
          options={[
            { value: 'under-20', label: 'Under 20%' },
            { value: '20-40', label: '20% – 40%' },
            { value: '40-60', label: '40% – 60%' },
            { value: '60+', label: '60%+' },
            { value: 'not-sure', label: 'Not Sure' },
          ]}
        />
      </div>

      <div>
        <Label required helper="From first contact to signed deal, how long does it typically take?">Sales Cycle</Label>
        <Select value={data.salesCycle} onChange={v => onChange('salesCycle', v)} placeholder="Select sales cycle" error={errors.salesCycle}
          options={[
            { value: 'same-day', label: 'Same day' },
            { value: '1-7-days', label: '1–7 days' },
            { value: '1-2-weeks', label: '1–2 weeks' },
            { value: '2plus-weeks', label: '2+ weeks' },
          ]}
        />
      </div>

      <div>
        <Label helper="Optional — helps us calibrate your unit economics more precisely">Total Revenue Last 30 Days ($) <span className="font-normal text-xs" style={{ color: '#555' }}>(optional)</span></Label>
        <NumberInput value={data.totalRevenue} onChange={v => onChange('totalRevenue', v)} placeholder="e.g. 28000" />
      </div>

      {/* Revenue estimate preview */}
      {data.dealSize && data.customersClosed && (
        <div className="rounded-xl border p-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
          <div className="text-xs font-semibold mb-2" style={{ color: '#a3a3a3' }}>ESTIMATED MONTHLY REVENUE</div>
          <div className="text-2xl font-black" style={{ color: '#f97316' }}>
            ${((parseInt(data.dealSize) || 0) * (parseInt(data.customersClosed) || 0)).toLocaleString()}
          </div>
          <div className="text-xs mt-1" style={{ color: '#555' }}>
            Based on {data.customersClosed} closes × ${parseInt(data.dealSize).toLocaleString()} avg. deal
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 4 ───────────────────────────────────────────────────────────────────
function Step4({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
        <div className="text-xs font-semibold mb-1" style={{ color: '#f97316' }}>ALMOST DONE</div>
        <div className="text-xs" style={{ color: '#a3a3a3' }}>
          These last fields have a disproportionate impact on your diagnostic result. Lead response time alone accounts for 40%+ of revenue leaks in local service businesses.
        </div>
      </div>

      <div>
        <Label required helper="After a lead submits a form or calls in, how quickly does your team respond?">Lead Response Time</Label>
        <Select value={data.responseTime} onChange={v => onChange('responseTime', v)} placeholder="Select response time" error={errors.responseTime}
          options={[
            { value: 'under-5min', label: 'Under 5 minutes ✓' },
            { value: '5-15min', label: '5–15 minutes' },
            { value: '15-30min', label: '15–30 minutes' },
            { value: '30-60min', label: '30–60 minutes ⚠' },
            { value: '1h+', label: '1 hour+ ✗' },
          ]}
        />
      </div>

      <div>
        <Label required helper="Can you accurately attribute which ads are generating closed customers?">Conversion Tracking Quality</Label>
        <Select value={data.trackingQuality} onChange={v => onChange('trackingQuality', v)} placeholder="Select tracking status" error={errors.trackingQuality}
          options={[
            { value: 'fully', label: 'Fully tracked — I know my CPL and CPC' },
            { value: 'partial', label: 'Partially tracked — some gaps' },
            { value: 'none', label: 'Not tracked — guessing' },
          ]}
        />
      </div>

      <div>
        <Label required helper="Do you have a structured follow-up process (email, SMS, calls) for leads who don't convert immediately?">Follow-up System</Label>
        <Select value={data.followUpSystem} onChange={v => onChange('followUpSystem', v)} placeholder="Select option" error={errors.followUpSystem}
          options={[
            { value: 'yes', label: 'Yes — automated and consistent' },
            { value: 'sometimes', label: 'Sometimes — manual and inconsistent' },
            { value: 'no', label: 'No follow-up system' },
          ]}
        />
      </div>

      <div>
        <Label required helper="Your diagnostic report will be sent here">Email Address</Label>
        <input
          type="email"
          value={data.email}
          onChange={e => onChange('email', e.target.value)}
          placeholder="you@company.com"
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
          style={{
            background: '#161616', color: '#f5f5f5',
            borderColor: errors.email ? '#ef4444' : data.email ? '#f97316' : '#2a2a2a',
            boxShadow: errors.email ? '0 0 0 1px rgba(239,68,68,0.2)' : data.email ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
          }}
        />
        {errors.email && <div className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email}</div>}
        <div className="text-xs mt-1" style={{ color: '#555' }}>🔒 Confidential. Used only to deliver your report.</div>
      </div>
    </div>
  );
}

// ─── Analyzing Screen ─────────────────────────────────────────────────────────
function AnalyzingScreen() {
  const steps = [
    'Calculating funnel conversion rates...',
    'Benchmarking against industry averages...',
    'Identifying unit economics gaps...',
    'Isolating primary bottleneck...',
    'Estimating revenue opportunity...',
    'Generating your report...',
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c < steps.length - 1 ? c + 1 : c));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: '#1c1c1c' }} />
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: '#f97316', borderTopColor: 'transparent' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L20 8V16L12 21L4 16V8L12 3Z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <h2 className="font-black text-2xl mb-2" style={{ color: '#f5f5f5' }}>Analyzing your data...</h2>
      <p className="text-sm mb-10" style={{ color: '#a3a3a3' }}>Running your funnel through our diagnostic engine</p>

      <div className="w-full max-w-sm space-y-2 text-left">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-3 text-sm transition-all"
            style={{ color: i <= current ? '#f5f5f5' : '#333', opacity: i <= current ? 1 : 0.4 }}>
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all"
              style={{ background: i < current ? '#f97316' : i === current ? 'rgba(249,115,22,0.2)' : '#1c1c1c', border: `1px solid ${i <= current ? '#f97316' : '#2a2a2a'}` }}>
              {i < current && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              {i === current && <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#f97316' }} />}
            </div>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ email }: { email: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8" style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16L13 23L26 10" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <h2 className="font-black text-2xl mb-3" style={{ color: '#f5f5f5' }}>Diagnostic submitted!</h2>
      <p className="text-sm mb-2" style={{ color: '#a3a3a3' }}>Your Business Growth Diagnostic report is being generated.</p>
      <p className="text-sm mb-10" style={{ color: '#666' }}>
        It will be sent to <span className="font-semibold" style={{ color: '#f5f5f5' }}>{email}</span> within a few minutes.
      </p>
      <div className="rounded-xl border p-6 w-full max-w-sm text-left" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
        <div className="text-xs font-semibold mb-3" style={{ color: '#a3a3a3' }}>YOUR REPORT WILL INCLUDE</div>
        <div className="space-y-2">
          {['Funnel analysis', 'Unit economics breakdown', 'Benchmark comparison', 'Cost of inaction', 'Bottleneck diagnosis', '90-day action plan'].map(item => (
            <div key={item} className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: '#f97316' }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ color: '#a3a3a3' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <a href="/" className="mt-8 text-sm transition-colors" style={{ color: '#555' }}
        onMouseOver={e => e.currentTarget.style.color = '#a3a3a3'}
        onMouseOut={e => e.currentTarget.style.color = '#555'}>
        ← Back to homepage
      </a>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function DiagnosticForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'form' | 'analyzing' | 'success' | 'error'>('form');
  const [submitError, setSubmitError] = useState('');

  const onChange = (key: keyof FormData, value: string) => {
    setData(d => ({ ...d, [key]: value }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!data.businessType) errs.businessType = 'Please select a business type';
      if (!data.leadSource) errs.leadSource = 'Please select a lead source';
      if (!data.adSpend) errs.adSpend = 'Please select your ad spend range';
    }

    if (step === 2) {
      if (!data.monthlyLeads) errs.monthlyLeads = 'Required';
      if (!data.callsBooked) errs.callsBooked = 'Required';
      if (!data.callsCompleted) errs.callsCompleted = 'Required';
      if (!data.customersClosed) errs.customersClosed = 'Required';

      const leads = parseInt(data.monthlyLeads) || 0;
      const booked = parseInt(data.callsBooked) || 0;
      const completed = parseInt(data.callsCompleted) || 0;
      const closed = parseInt(data.customersClosed) || 0;

      if (booked > leads) errs.callsBooked = 'Cannot exceed total leads';
      if (completed > booked) errs.callsCompleted = 'Cannot exceed calls booked';
      if (closed > completed) errs.customersClosed = 'Cannot exceed calls completed';
    }

    if (step === 3) {
      if (!data.dealSize) errs.dealSize = 'Required';
      if (!data.profitMargin) errs.profitMargin = 'Required';
      if (!data.salesCycle) errs.salesCycle = 'Required';
    }

    if (step === 4) {
      if (!data.responseTime) errs.responseTime = 'Required';
      if (!data.trackingQuality) errs.trackingQuality = 'Required';
      if (!data.followUpSystem) errs.followUpSystem = 'Required';
      if (!data.email) errs.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step < 4) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setStatus('analyzing');
    setSubmitError('');

    const payload = {
      // Step 1
      businessType: data.businessType,
      leadSource: data.leadSource,
      adSpend: data.adSpend,
      // Step 2
      monthlyLeads: parseInt(data.monthlyLeads) || 0,
      callsBooked: parseInt(data.callsBooked) || 0,
      callsCompleted: parseInt(data.callsCompleted) || 0,
      customersClosed: parseInt(data.customersClosed) || 0,
      // Step 3
      dealSize: parseInt(data.dealSize) || 0,
      profitMargin: data.profitMargin,
      salesCycle: data.salesCycle,
      totalRevenue: parseInt(data.totalRevenue) || null,
      // Step 4
      responseTime: data.responseTime,
      trackingQuality: data.trackingQuality,
      followUpSystem: data.followUpSystem,
      email: data.email,
      // Meta
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Success — show analyzing UX for at least 4s
      setTimeout(() => setStatus('success'), 4000);
    } catch (err) {
      console.error('Webhook error:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setSubmitError(`Submission failed: ${message}. Please try again.`);
      setStatus('error');
    }
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      {/* Nav */}
      <nav className="border-b" style={{ background: 'rgba(10,10,10,0.95)', borderColor: '#1a1a1a' }}>
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: '#f97316' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 6V10L8 14L2 10V6L8 2Z" fill="white" fillOpacity="0.9"/>
                <path d="M8 5L11 7V9L8 11L5 9V7L8 5Z" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-sm" style={{ color: '#f5f5f5' }}>GrowthDiagnostic</span>
          </a>
          <div className="flex items-center gap-2 text-xs" style={{ color: '#555' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="5" width="10" height="7" rx="1.5" stroke="#555" strokeWidth="1.2"/><path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Secure & Confidential
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {status === 'form' && (
          <>
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4" style={{ borderColor: '#2a2a2a', background: '#161616' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#f97316' }} />
                <span className="text-xs font-semibold" style={{ color: '#f97316', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Business Growth Diagnostic</span>
              </div>
              <h1 className="font-black text-3xl mb-3" style={{ color: '#f5f5f5' }}>
                Identify your revenue leak<br />in 3 minutes
              </h1>
              <p className="text-sm" style={{ color: '#a3a3a3' }}>
                Answer 13 questions. Get a structured PDF report showing your biggest growth bottleneck and how much it's costing you.
              </p>
            </div>

            {/* Progress */}
            <ProgressBar step={step} total={4} />

            {/* Form card */}
            <div className="rounded-2xl border p-8" style={{ background: '#111', borderColor: '#2a2a2a' }}>
              <div className="mb-6">
                <div className="section-label mb-1">
                  {['Business Profile', 'Funnel Metrics', 'Unit Economics', 'Performance & Capture'][step - 1]}
                </div>
                <h2 className="font-bold text-lg" style={{ color: '#f5f5f5' }}>
                  {[
                    'Tell us about your business',
                    'How does your funnel perform?',
                    'What are your deal economics?',
                    'How do you handle leads?',
                  ][step - 1]}
                </h2>
              </div>

              {step === 1 && <Step1 data={data} onChange={onChange} errors={errors} />}
              {step === 2 && <Step2 data={data} onChange={onChange} errors={errors} />}
              {step === 3 && <Step3 data={data} onChange={onChange} errors={errors} />}
              {step === 4 && <Step4 data={data} onChange={onChange} errors={errors} />}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t" style={{ borderColor: '#2a2a2a' }}>
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                    style={{ background: '#1c1c1c', color: '#a3a3a3', border: '1px solid #2a2a2a' }}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#3a3a3a'}
                    onMouseOut={e => e.currentTarget.style.borderColor = '#2a2a2a'}
                  >
                    ← Back
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all"
                  style={{ background: '#f97316', color: '#fff' }}
                  onMouseOver={e => { e.currentTarget.style.background = '#ea6c0a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {step < 4 ? (
                    <>Continue <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                  ) : (
                    <>Generate My Report — $9.99 <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                  )}
                </button>
              </div>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs" style={{ color: '#444' }}>
              <span>🔒 Confidential</span>
              <span>⚡ Report delivered instantly</span>
              <span>📄 Structured PDF</span>
              <span>✓ No subscription</span>
            </div>
          </>
        )}

        {status === 'analyzing' && <AnalyzingScreen />}
        {status === 'success' && <SuccessScreen email={data.email} />}
        {status === 'error' && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
              style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid #ef4444' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 10V18M16 22V23M8 28H24L30 16L24 4H8L2 16L8 28Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-black text-2xl mb-3" style={{ color: '#f5f5f5' }}>Submission failed</h2>
            <p className="text-sm mb-8 max-w-sm" style={{ color: '#a3a3a3' }}>{submitError}</p>
            <button
              onClick={() => { setStatus('form'); setSubmitError(''); }}
              className="px-6 py-3 rounded-lg text-sm font-bold transition-all"
              style={{ background: '#f97316', color: '#fff' }}
              onMouseOver={e => e.currentTarget.style.background = '#ea6c0a'}
              onMouseOut={e => e.currentTarget.style.background = '#f97316'}
            >
              ← Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
