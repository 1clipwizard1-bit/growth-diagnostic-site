import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { trackEvent } from '../lib/analytics';
const RevenueWarning = React.lazy(() => import('../components/RevenueWarning'));

declare global {
  interface Window {
    paypal?: any;
  }
}


// ─── N8N Webhook ─────────────────────────────────────────────────────────────
const N8N_WEBHOOK_URL = 'https://learning11b.app.n8n.cloud/webhook/34e63fac-0d56-4720-8f08-366bee6e8d90';

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1: Context
  name: string;
  website: string;
  // Step 2: Profile
  businessType: string;
  leadSource: string;
  adSpend: string;
  exactAdSpend: string;
  // Step 3: Seasonality
  isSeasonal: string;
  seasonStatus: string;
  // Step 4: Funnel Metrics
  monthlyLeads: string;
  callsBooked: string;
  callsCompleted: string;
  customersClosed: string;
  // Step 5: Unit Economics
  dealSize: string;
  profitMargin: string;
  salesCycle: string;
  totalRevenue: string;
  // Step 6: Performance
  responseTime: string;
  trackingQuality: string;
  followUpSystem: string;
  email: string;
}

const initial: FormData = {
  name: '', website: '',
  businessType: '', leadSource: '', adSpend: '', exactAdSpend: '',
  isSeasonal: '', seasonStatus: '',
  monthlyLeads: '', callsBooked: '', callsCompleted: '', customersClosed: '',
  dealSize: '', profitMargin: '', salesCycle: '', totalRevenue: '',
  responseTime: '', trackingQuality: '', followUpSystem: '', email: '',
};

// ─── Smart Tooltip Component ──────────────────────────────────────────────────
function SmartTooltip({ items }: { items: string[] }) {
  return (
    <div className="absolute left-0 top-full mt-2 z-50 rounded-xl border p-3 w-72 shadow-2xl"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <div className="text-xs font-semibold mb-2" style={{ color: 'var(--orange)' }}>EXAMPLES</div>
      <div className="grid grid-cols-2 gap-1.5">
        {items.map(item => (
          <div key={item} className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg"
            style={{ background: 'var(--bg2)', color: 'var(--muted)' }}>
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--orange)' }} />
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
      <label className="font-semibold text-sm flex items-center gap-1" style={{ color: 'var(--text)' }}>
        {children}
        {required && <span style={{ color: 'var(--orange)' }}>*</span>}
      </label>
      {helper && <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{helper}</div>}
    </div>
  );
}

function Select({ value, onChange, options, placeholder, error, disabled }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string; error?: string; disabled?: boolean;
}) {
  return (
    <div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 rounded-xl border text-sm appearance-none outline-none transition-all"
        style={{
          background: 'var(--bg2)', color: value ? 'var(--text)' : 'var(--muted)',
          borderColor: error ? 'var(--red)' : value ? 'var(--orange)' : 'var(--border)',
          boxShadow: error ? '0 0 0 1px rgba(239,68,68,0.25)' : value ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
          opacity: disabled ? 0.4 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <option value="" disabled style={{ color: 'var(--muted)' }}>{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <div className="text-xs mt-1" style={{ color: 'var(--red)' }}>{error}</div>}
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
          background: 'var(--bg2)', color: 'var(--text)',
          borderColor: error ? 'var(--red)' : value ? 'var(--orange)' : 'var(--border)',
          boxShadow: error ? '0 0 0 1px rgba(239,68,68,0.25)' : value ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
        }}
      />
      {helper && <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{helper}</div>}
      {error && <div className="text-xs mt-1" style={{ color: 'var(--red)' }}>{error}</div>}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = ((step - 1) / (total - 1)) * 100;
  const labels = ['Context', 'Profile', 'Seasonality', 'Funnel', 'Economics', 'Performance'];
  return (
    <div className="mb-10">
      <div className="flex justify-between mb-3">
        {labels.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1" style={{ width: `${100 / total}%` }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              style={{
                background: i + 1 < step ? 'var(--orange)' : i + 1 === step ? 'var(--orange)' : 'var(--bg2)',
                color: i + 1 <= step ? '#0a0a0a' : 'var(--muted)',
                border: `2px solid ${i + 1 <= step ? 'var(--orange)' : 'var(--border)'}`,
              }}>
              {i + 1 < step
                ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : i + 1}
            </div>
            <span className="text-xs text-center hidden sm:block" style={{ color: i + 1 === step ? 'var(--orange)' : 'var(--muted)' }}>{label}</span>
          </div>
        ))}
      </div>
      <div className="h-[5px] rounded-full" style={{ background: 'var(--border)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ background: 'linear-gradient(90deg, var(--orange) 0%, var(--orange-dark) 100%)', width: `${pct}%` }} />
      </div>
      <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--muted)' }}>
        <span>Step {step} of {total}</span>
        <span>Approximate answers are fine</span>
      </div>
    </div>
  );
}

// ─── Step 1: Context ─────────────────────────────────────────────────────────
function Step1({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  return (
    <div className="space-y-6">
      <div>
        <Label helper="Your full name or how we should address you (Optional)">Full Name</Label>
        <input
          type="text"
          value={data.name}
          onChange={e => onChange('name', e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
          style={{
            background: 'var(--bg2)', color: 'var(--text)',
            borderColor: errors.name ? 'var(--red)' : data.name ? 'var(--orange)' : 'var(--border)',
            boxShadow: errors.name ? '0 0 0 1px rgba(248,113,113,0.25)' : data.name ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
          }}
        />
        {errors.name && <div className="text-xs mt-1" style={{ color: 'var(--red)' }}>{errors.name}</div>}
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
            background: 'var(--bg2)', color: 'var(--text)',
            borderColor: errors.email ? 'var(--red)' : data.email ? 'var(--orange)' : 'var(--border)',
            boxShadow: errors.email ? '0 0 0 1px rgba(248,113,113,0.25)' : data.email ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
          }}
        />
        {errors.email && <div className="text-xs mt-1" style={{ color: 'var(--red)' }}>{errors.email}</div>}
        <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>🔒 Confidential. Used only to deliver your report.</div>
      </div>

      <div>
        <Label helper="Website URL or social media profile link (LinkedIn / Facebook) (Optional)">Website / Social Profile</Label>
        <input
          type="text"
          value={data.website}
          onChange={e => onChange('website', e.target.value)}
          placeholder="www.company.com or linkedin.com/in/..."
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
          style={{
            background: 'var(--bg2)', color: 'var(--text)',
            borderColor: errors.website ? 'var(--red)' : data.website ? 'var(--orange)' : 'var(--border)',
            boxShadow: errors.website ? '0 0 0 1px rgba(248,113,113,0.25)' : data.website ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
          }}
        />
        {errors.website && <div className="text-xs mt-1" style={{ color: 'var(--red)' }}>{errors.website}</div>}
      </div>
    </div>
  );
}

// ─── Step 2: Profile ─────────────────────────────────────────────────────────
const businessTypeTooltips: Record<string, string[]> = {
  local: ['Plumbing', 'HVAC', 'Roofing', 'Cleaning', 'Dental', 'Auto Repair', 'Landscaping', 'Electrical'],
  agency: ['Marketing Agency', 'SEO Agency', 'Design Studio', 'PR Firm', 'Web Dev', 'Consulting'],
  coaching: ['Online Courses', 'High-ticket Coaching', 'Masterminds', 'Group Programs', 'Tutoring'],
  clinic: ['Dental Clinic', 'Chiropractic', 'Aesthetics', 'Psychology', 'Physiotherapy', 'Optometry'],
  other: ['E-commerce', 'SaaS', 'Real Estate', 'Finance', 'Legal Services', 'Retail'],
};

function Step2({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start gap-2 mb-2 relative">
          <label className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
            Business Type <span style={{ color: 'var(--orange)' }}>*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
              onFocus={() => setTooltip(true)}
              onBlur={() => setTooltip(false)}
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors"
              style={{ background: 'var(--border)', color: 'var(--muted)', border: '1px solid #3a3a3a' }}
            >?</button>
            {tooltip && (
              <div className="absolute left-0 top-full mt-2 z-50 rounded-xl border p-3 w-72 shadow-2xl"
                style={{ background: 'var(--card)', borderColor: '#383838' }}>
                <div className="text-xs mb-2" style={{ color: 'var(--muted)' }}>
                  Local service = businesses that get customers from a specific geographic area.
                </div>
                {data.businessType && businessTypeTooltips[data.businessType] && (
                  <>
                    <div className="text-xs font-semibold mb-2" style={{ color: 'var(--orange)' }}>EXAMPLES FOR YOUR TYPE</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {businessTypeTooltips[data.businessType].map(item => (
                        <div key={item} className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg"
                          style={{ background: 'var(--border)', color: 'var(--muted)' }}>
                          <div className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--orange)' }} />
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
                background: data.businessType === opt.value ? 'rgba(249,115,22,0.08)' : 'var(--bg2)',
                borderColor: data.businessType === opt.value ? 'var(--orange)' : 'var(--border)',
                boxShadow: data.businessType === opt.value ? '0 0 16px rgba(249,115,22,0.12)' : 'none',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{opt.icon}</span>
                <div>
                  <div className="font-semibold text-sm" style={{ color: data.businessType === opt.value ? 'var(--orange)' : 'var(--text)' }}>{opt.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{opt.desc}</div>
                </div>
                {data.businessType === opt.value && (
                  <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--orange)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                )}
              </div>

              {/* Smart tooltip examples shown inline when selected */}
              {data.businessType === opt.value && businessTypeTooltips[opt.value] && (
                <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-xs font-semibold mb-2" style={{ color: 'var(--orange)' }}>COMMON EXAMPLES</div>
                  <div className="flex flex-wrap gap-1.5">
                    {businessTypeTooltips[opt.value].map(ex => (
                      <span key={ex} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--border)', color: 'var(--muted)' }}>{ex}</span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Soft warning for Other business type */}
        {data.businessType === 'other' && (
          <div className="rounded-xl border p-4 mt-1 transition-all" style={{ borderColor: 'rgba(249,115,22,0.35)', background: 'rgba(249,115,22,0.06)' }}>
            <div className="flex items-start gap-3">
              <span style={{ fontSize: '16px', lineHeight: 1.4 }}>⚠️</span>
              <div>
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--orange)' }}>Different funnel model detected</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                  This diagnostic is built for service businesses with a sales call funnel. You can still complete the form —
                  we'll review your data manually and send a <strong style={{ color: 'var(--text)' }}>custom analysis</strong> tailored to your business model. No charge.
                </div>
              </div>
            </div>
          </div>
        )}

        {errors.businessType && <div className="text-xs mt-1" style={{ color: 'var(--red)' }}>{errors.businessType}</div>}
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

        {/* Spend range dropdown with clear button */}
        <div className="relative">
          <Select
            value={data.adSpend}
            onChange={v => { onChange('adSpend', v); if (v) onChange('exactAdSpend', ''); }}
            placeholder="Select spend range"
            error={errors.adSpend}
            disabled={!!data.exactAdSpend}
            options={[
              { value: 'under-2k', label: 'Under $2,000' },
              { value: '2k-5k', label: '$2,000 – $5,000' },
              { value: '5k-10k', label: '$5,000 – $10,000' },
              { value: '10k-25k', label: '$10,000 – $25,000' },
              { value: '25k+', label: '$25,000+' },
            ]}
          />
          {data.adSpend && !data.exactAdSpend && (
            <button
              type="button"
              onClick={() => onChange('adSpend', '')}
              className="absolute right-9 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'var(--border)', color: 'var(--muted)' }}
              onMouseOver={e => { e.currentTarget.style.background = '#383838'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
              title="Clear selection"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-3 my-3">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>OR enter exact amount</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Exact spend input with clear button */}
        <div className="relative">
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold pointer-events-none"
            style={{ color: data.exactAdSpend ? 'var(--orange)' : 'var(--muted)' }}
          >$</div>
          <input
            type="number"
            value={data.exactAdSpend}
            onChange={e => { onChange('exactAdSpend', e.target.value); if (e.target.value) onChange('adSpend', ''); }}
            placeholder="Enter exact 30-day spend"
            min="0"
            disabled={!!data.adSpend}
            className="w-full pl-8 pr-10 py-3 rounded-xl border text-sm outline-none transition-all"
            style={{
              background: 'var(--bg2)',
              color: 'var(--text)',
              borderColor: data.exactAdSpend ? 'var(--orange)' : 'var(--border)',
              boxShadow: data.exactAdSpend ? '0 0 0 1px rgba(249,115,22,0.15)' : 'none',
              opacity: data.adSpend ? 0.4 : 1,
              cursor: data.adSpend ? 'not-allowed' : 'text',
            }}
          />
          {data.exactAdSpend && !data.adSpend && (
            <button
              type="button"
              onClick={() => onChange('exactAdSpend', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all"
              style={{ background: 'var(--border)', color: 'var(--muted)' }}
              onMouseOver={e => { e.currentTarget.style.background = '#383838'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
              title="Clear"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Disclaimer */}
        <div
          className="flex items-start gap-2 mt-3 px-3 py-2.5 rounded-lg"
          style={{ background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.12)' }}
        >
          <span style={{ fontSize: '11px', lineHeight: 1.6, marginTop: '1px', flexShrink: 0 }}>📊</span>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
            Spend precision = calculation precision. An estimate works —{' '}
            <span style={{ color: 'var(--muted)' }}>exact 30-day spend gives you a surgical-grade result.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Seasonality ─────────────────────────────────────────────────────
function Step3({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4 bg-[var(--bg2)]" style={{ borderColor: 'var(--border)' }}>
        <div className="text-xs font-semibold mb-1" style={{ color: 'var(--orange)' }}>WHY THIS MATTERS</div>
        <div className="text-xs" style={{ color: 'var(--muted)' }}>
          This helps us avoid confusing seasonal demand with funnel performance.
        </div>
      </div>

      <div>
        <Label required helper="Does your sales volume or lead count change significantly depending on the time of year?">Is your business seasonal?</Label>
        <Select
          value={data.isSeasonal}
          onChange={v => onChange('isSeasonal', v)}
          placeholder="Select option"
          error={errors.isSeasonal}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'somewhat', label: 'Somewhat' },
            { value: 'no', label: 'No' },
            { value: 'not-sure', label: 'Not sure' },
          ]}
        />
      </div>

      <div>
        <Label required helper="Which seasonal period is your business in right now?">Right now, are you entering:</Label>
        <Select
          value={data.seasonStatus}
          onChange={v => onChange('seasonStatus', v)}
          placeholder="Select period"
          error={errors.seasonStatus}
          options={[
            { value: 'busy', label: 'Busy season' },
            { value: 'slow', label: 'Slow season' },
            { value: 'normal', label: 'Normal season' },
            { value: 'not-sure', label: 'Not sure' },
          ]}
        />
      </div>
    </div>
  );
}

// ─── Step 4: Funnel Metrics ──────────────────────────────────────────────────
function Step4({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  const isOther = data.businessType === 'other';

  const fields: { key: keyof FormData; label: string; helper: string; placeholder: string }[] = isOther ? [
    { key: 'monthlyLeads', label: 'Monthly Leads / Visitors', helper: 'Total traffic or leads generated in the last 30 days', placeholder: 'e.g. 5000' },
    { key: 'callsBooked', label: 'Add to Carts / Checkout Initiated', helper: 'How many users reached the first step of checkout?', placeholder: 'e.g. 450' },
    { key: 'callsCompleted', label: 'Reached Payment Info', helper: 'How many reached the final payment confirmation page?', placeholder: 'e.g. 210' },
    { key: 'customersClosed', label: 'Total Sales / Purchases', helper: 'How many successful transactions were completed?', placeholder: 'e.g. 95' },
  ] : [
    { key: 'monthlyLeads', label: 'Monthly Leads', helper: 'Total inbound leads generated in the last 30 days', placeholder: 'e.g. 120' },
    { key: 'callsBooked', label: 'Calls / Appointments Booked', helper: 'How many leads booked a call or appointment?', placeholder: 'e.g. 55' },
    { key: 'callsCompleted', label: 'Calls / Appointments Completed', helper: 'How many actually showed up?', placeholder: 'e.g. 38' },
    { key: 'customersClosed', label: 'Customers Closed', helper: 'How many became paying customers?', placeholder: 'e.g. 12' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="text-xs font-semibold mb-1" style={{ color: 'var(--orange)' }}>WHY THIS MATTERS</div>
        <div className="text-xs" style={{ color: 'var(--muted)' }}>
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
        <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
          <div className="text-xs font-semibold mb-3" style={{ color: 'var(--muted)' }}>YOUR FUNNEL PREVIEW</div>
          <div className="space-y-2">
            {[
              { label: isOther ? 'Leads' : 'Leads', value: parseInt(data.monthlyLeads) || 0, base: parseInt(data.monthlyLeads) || 1 },
              { label: isOther ? 'Carts' : 'Booked', value: parseInt(data.callsBooked) || 0, base: parseInt(data.monthlyLeads) || 1 },
              { label: isOther ? 'Payment' : 'Completed', value: parseInt(data.callsCompleted) || 0, base: parseInt(data.monthlyLeads) || 1 },
              { label: isOther ? 'Sales' : 'Closed', value: parseInt(data.customersClosed) || 0, base: parseInt(data.monthlyLeads) || 1 },
            ].map(row => {
              const pct = Math.min(100, Math.round((row.value / row.base) * 100));
              return (
                <div key={row.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--muted)' }}>{row.label}</span>
                    <span style={{ color: 'var(--text)' }}>{row.value} <span style={{ color: 'var(--muted)' }}>({pct}%)</span></span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'var(--orange)' }} />
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

// ─── Step 5: Unit Economics ──────────────────────────────────────────────────
function Step5({
  data, onChange, errors, revenueConfirmed, onRevenueConfirm
}: {
  data: FormData;
  onChange: (k: keyof FormData, v: string) => void;
  errors: Partial<Record<keyof FormData, string>>;
  revenueConfirmed: boolean;
  onRevenueConfirm: (v: boolean) => void;
}) {
  const impliedRevenue = (parseInt(data.dealSize) || 0) * (parseInt(data.customersClosed) || 0);
  const enteredRevenue = parseInt(data.totalRevenue) || 0;

  const isExtremeMismatch = data.totalRevenue && data.dealSize && data.customersClosed &&
    impliedRevenue > 0 && enteredRevenue < impliedRevenue * 0.1;

  const isSoftMismatch = !isExtremeMismatch && data.totalRevenue && data.dealSize && data.customersClosed &&
    impliedRevenue > 0 && enteredRevenue < impliedRevenue * 0.5;

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
            { value: '1-3-days', label: '1–3 days' },
            { value: '4-7-days', label: '4–7 days' },
            { value: '1-2-weeks', label: '1–2 weeks' },
            { value: '2plus-weeks', label: '2+ weeks' },
          ]}
        />
      </div>

      <div>
        <Label helper="Optional — helps us calibrate your unit economics more precisely">Total Revenue Last 30 Days ($) <span className="font-normal text-xs" style={{ color: 'var(--muted)' }}>(optional)</span></Label>
        <NumberInput value={data.totalRevenue} onChange={v => onChange('totalRevenue', v)} placeholder="e.g. 28000" error={errors.totalRevenue === 'confirm_required' ? undefined : errors.totalRevenue} />

        {/* EXTREME mismatch: <10% of implied — require explicit confirmation */}
        {isExtremeMismatch && (
          <Suspense fallback={<div className="text-xs mt-2" style={{ color: 'var(--muted)' }}>Loading...</div>}>
            <RevenueWarning
              revenueConfirmed={revenueConfirmed}
              onRevenueConfirm={onRevenueConfirm}
              enteredRevenue={enteredRevenue}
              impliedRevenue={impliedRevenue}
              errors={errors}
            />
          </Suspense>
        )}

{/* SOFT mismatch: 10%–50% of implied — informational only */ }
{
  isSoftMismatch && (
    <div className="rounded-xl border p-4 mt-2" style={{ borderColor: 'rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.06)' }}>
      <div className="flex items-start gap-3">
        <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
        <div>
          <div className="text-sm font-semibold mb-1" style={{ color: 'var(--red)' }}>Revenue mismatch detected</div>
          <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
            You entered <strong style={{ color: 'var(--text)' }}>${enteredRevenue.toLocaleString()}</strong> revenue, but{' '}
            <strong style={{ color: 'var(--text)' }}>{data.customersClosed} deals × ${(parseInt(data.dealSize) || 0).toLocaleString()}</strong> = <strong style={{ color: 'var(--text)' }}>${impliedRevenue.toLocaleString()}</strong>.{' '}
            Please verify your revenue figure — this affects the accuracy of your entire audit.
          </div>
        </div>
      </div>
    </div>
  )
}
        </div >

  {/* Revenue estimate preview */ }
{
  data.dealSize && data.customersClosed && (
    <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
      <div className="text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>ESTIMATED MONTHLY REVENUE</div>
      <div className="text-2xl font-black" style={{ color: 'var(--orange)' }}>
        ${((parseInt(data.dealSize) || 0) * (parseInt(data.customersClosed) || 0)).toLocaleString()}
      </div>
      <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
        Based on {data.customersClosed} closes × ${parseInt(data.dealSize).toLocaleString()} avg. deal
      </div>
    </div>
  )
}
      </div >
      );
}

// ─── Step 6: Performance ──────────────────────────────────────────────────────
function Step6({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Partial<Record<keyof FormData, string>> }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="text-xs font-semibold mb-1" style={{ color: 'var(--orange)' }}>ALMOST DONE</div>
        <div className="text-xs" style={{ color: 'var(--muted)' }}>
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
    </div>
  );
}

// ─── Analyzing Screen ─────────────────────────────────────────────────────────
function AnalyzingScreen({ businessType, isCheckoutConfirming }: { businessType: string; isCheckoutConfirming?: boolean }) {
  const isOther = businessType === 'other';
  const steps = isCheckoutConfirming
    ? [
        'Verifying checkout session...',
        'Confirming payment status...',
        'Calibrating funnel analysis models...',
        'Mapping unit economics diagnostics...',
        'Generating custom PDF layout...',
        'Finalizing report...',
      ]
    : isOther
    ? [
        'Mapping bespoke funnel topology...',
        'Analyzing model-specific constraints...',
        'Evaluating unit economics metrics...',
        'Assigning to senior analyst queue...',
        'Preparing strategic review brief...',
        'Initiating custom model audit...',
      ]
    : [
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
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: 'var(--card)' }} />
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: 'var(--orange)', borderTopColor: 'transparent' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L20 8V16L12 21L4 16V8L12 3Z" stroke="var(--orange)" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <h2 className="font-black text-2xl mb-2" style={{ color: 'var(--text)' }}>
        {isCheckoutConfirming ? 'Verifying payment...' : 'Analyzing your data...'}
      </h2>
      <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>
        {isCheckoutConfirming ? 'Securing your diagnostic data' : 'Running your funnel through our diagnostic engine'}
      </p>

      <div className="w-full max-w-sm space-y-2 text-left">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-3 text-sm transition-all"
            style={{ color: i <= current ? 'var(--text)' : 'var(--muted)', opacity: i <= current ? 1 : 0.4 }}>
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all"
              style={{ background: i < current ? 'var(--orange)' : i === current ? 'rgba(249,115,22,0.2)' : 'var(--card)', border: `1px solid ${i <= current ? 'var(--orange)' : 'var(--border)'}` }}>
              {i < current && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              {i === current && <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--orange)' }} />}
            </div>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ email, businessType }: { email: string; businessType: string }) {
  const isOther = businessType === 'other';

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{
          background: isOther ? 'rgba(249,115,22,0.1)' : 'rgba(34,197,94,0.1)',
          border: `2px solid ${isOther ? 'var(--orange)' : '#22c55e'}`,
        }}>
        {isOther ? (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6z" stroke="var(--orange)" strokeWidth="2" />
            <path d="M16 11v6M16 22v1" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16L13 23L26 10" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </div>

      {isOther ? (
        <>
          <h2 className="font-black text-2xl mb-3" style={{ color: 'var(--text)' }}>Bespoke Audit Initiated!</h2>
          <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>
            We've detected a custom business model (E-commerce / SaaS / Product).
          </p>
          <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
            Because your model is non-standard, your data has been flagged for a <span style={{ color: 'var(--text)', fontWeight: 'bold' }}>Senior Strategic Review.</span>
          </p>
          <div className="rounded-xl border p-5 w-full max-w-sm text-left mb-8" style={{ borderColor: 'rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.04)' }}>
            <div className="text-xs font-semibold mb-3" style={{ color: 'var(--orange)' }}>WHAT'S INCLUDED IN YOUR CUSTOM AUDIT</div>
            <div className="space-y-3">
              {[
                { icon: '🗺️', text: 'Manual funnel topology mapping' },
                { icon: '📈', text: 'Custom unit economics analysis' },
                { icon: '🚀', text: 'Bespoke 90-day growth roadmap' },
                { icon: '⏱️', text: 'Personalized delivery in 24–48 hours' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-sm">
                  <span style={{ fontSize: '14px' }}>{item.icon}</span>
                  <span style={{ color: 'var(--muted)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8 text-left" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
            <div className="text-xs font-bold text-neutral-200 mb-2 uppercase tracking-wider" style={{ color: 'var(--text)' }}>Recommended Next Step</div>
            <p className="text-sm text-neutral-400 mb-5" style={{ color: 'var(--muted)' }}>
              Since your model is unique, a quick 15-min chat ensures our custom audit is 100% accurate to your specific operations.
            </p>
            <a href="#" className="btn-primary w-full text-center flex items-center justify-center gap-2">
              Book 15-min Calibration Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          <div className="text-xs px-4 py-2 rounded-full border" style={{ background: 'var(--bg2)', color: 'var(--muted)', borderColor: 'var(--border)' }}>
            ✓ No charge — custom senior analysis is free
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl mb-3" style={{ color: 'var(--text)' }}>Good call. Your diagnostic is running.</h2>
          <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>Your Business Growth Diagnostic report is being generated.</p>
          <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
            It will be sent to <span className="font-semibold" style={{ color: 'var(--text)' }}>{email}</span> within a few minutes.
          </p>
          
          <div className="rounded-xl border p-6 w-full max-w-sm text-left mb-8" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
            <div className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Analysis Progress</div>
            <div className="space-y-4">
              {[
                'We validate your inputs',
                'We benchmark them against your industry',
                'We isolate your biggest constraint',
                'Your report lands in your inbox'
              ].map((item, idx) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                    <span className="text-xs font-bold num" style={{ color: 'var(--orange)' }}>{idx + 1}</span>
                  </div>
                  <span style={{ color: 'var(--muted)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-5 w-full max-w-sm text-left" style={{ borderColor: 'rgba(249,115,22,0.15)', background: 'rgba(249,115,22,0.02)' }}>
            <div className="font-bold text-sm mb-2" style={{ color: 'var(--text)' }}>💡 While you wait, write down one guess:</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
              What do YOU think your biggest bottleneck is? Most owners are surprised by the answer.
            </p>
          </div>
        </>
      )}

      <Link href="/" className="mt-8 text-sm transition-colors" style={{ color: 'var(--muted)' }}
        onMouseOver={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>
        ← Back to homepage
      </Link>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function DiagnosticForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'form' | 'analyzing' | 'success' | 'error'>('form');
  const [isCheckoutConfirming, setIsCheckoutConfirming] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [revenueConfirmed, setRevenueConfirmed] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const sessionId = params.get('session_id');

    if (success === 'true' && sessionId) {
      setStatus('analyzing');
      setIsCheckoutConfirming(true);
      
      let pollCount = 0;
      const interval = setInterval(async () => {
        pollCount++;
        try {
          const res = await fetch(`/api/check-session?session_id=${sessionId}`);
          if (!res.ok) {
            throw new Error(`Session check failed: ${res.status}`);
          }
          const checkData = await res.json();
          if (checkData.status === 'completed' && checkData.token) {
            clearInterval(interval);
            setLocation(`/report/${checkData.token}`);
          } else if (pollCount > 60) { // Timeout after 2 minutes (60 * 2 seconds)
            clearInterval(interval);
            setSubmitError("We are taking longer than expected to process your payment and generate the report. Please check your email or contact support.");
            setStatus('error');
            setIsCheckoutConfirming(false);
          }
        } catch (err: any) {
          console.error("Error polling session status:", err);
          if (pollCount > 60) {
            clearInterval(interval);
            setSubmitError(`Error checking report status: ${err.message}`);
            setStatus('error');
            setIsCheckoutConfirming(false);
          }
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [setLocation]);

  const onChange = (key: keyof FormData, value: string) => {
    setData(d => ({ ...d, [key]: value }));
    setErrors(e => ({ ...e, [key]: '' }));
    // Reset revenue confirmation if user edits the revenue field
    if (key === 'totalRevenue') setRevenueConfirmed(false);
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!data.email) errs.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email';
    }

    if (step === 2) {
      if (!data.businessType) errs.businessType = 'Please select a business type';
      if (!data.leadSource) errs.leadSource = 'Please select a lead source';
      if (!data.adSpend && !data.exactAdSpend) errs.adSpend = 'Please select a range or enter an exact amount';
    }

    if (step === 3) {
      if (!data.isSeasonal) errs.isSeasonal = 'Required';
      if (!data.seasonStatus) errs.seasonStatus = 'Required';
    }

    if (step === 4) {
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

    if (step === 5) {
      if (!data.dealSize) errs.dealSize = 'Required';
      if (!data.profitMargin) errs.profitMargin = 'Required';
      if (!data.salesCycle) errs.salesCycle = 'Required';

      // Extreme mismatch: entered < 10% of implied — require explicit confirmation
      if (data.totalRevenue && data.dealSize && data.customersClosed) {
        const implied = (parseInt(data.dealSize) || 0) * (parseInt(data.customersClosed) || 0);
        const entered = parseInt(data.totalRevenue) || 0;
        if (implied > 0 && entered < implied * 0.1 && !revenueConfirmed) {
          errs.totalRevenue = 'confirm_required';
        }
      }
    }

    if (step === 6) {
      if (!data.responseTime) errs.responseTime = 'Required';
      if (!data.trackingQuality) errs.trackingQuality = 'Required';
      if (!data.followUpSystem) errs.followUpSystem = 'Required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step < 6) {
      const stepNames = ['context', 'business_profile', 'seasonality', 'funnel_metrics', 'unit_economics', 'performance'];
      trackEvent('quiz_step_completed', {
        step,
        step_name: stepNames[step - 1],
        business_type: data.businessType,
      });
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    trackEvent('quiz_submitted', {
      business_type: data.businessType,
      is_custom: data.businessType === 'other',
    });
    setStatus('analyzing');
    setSubmitError('');

    const payload = {
      // Step 1
      name: data.name,
      website: data.website,
      // Step 2
      businessType: data.businessType,
      leadSource: data.leadSource,
      adSpend: data.adSpend || null,
      exactAdSpend: data.exactAdSpend ? parseInt(data.exactAdSpend) : null,
      // Step 3
      isSeasonal: data.isSeasonal,
      seasonStatus: data.seasonStatus,
      // Step 4
      monthlyLeads: parseInt(data.monthlyLeads) || 0,
      callsBooked: parseInt(data.callsBooked) || 0,
      callsCompleted: parseInt(data.callsCompleted) || 0,
      customersClosed: parseInt(data.customersClosed) || 0,
      // Step 5
      dealSize: parseInt(data.dealSize) || 0,
      profitMargin: data.profitMargin,
      salesCycle: data.salesCycle,
      totalRevenue: parseInt(data.totalRevenue) || null,
      // Step 6
      responseTime: data.responseTime,
      trackingQuality: data.trackingQuality,
      followUpSystem: data.followUpSystem,
      email: data.email,
      // Meta
      submittedAt: new Date().toISOString(),
      isCustomRequest: data.businessType === 'other',
    };

    if (data.businessType === 'other') {
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
    } else {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          let errorMsg = `Server error: ${response.status}`;
          try {
            const errJson = await response.json();
            if (errJson.error) errorMsg = errJson.error;
          } catch {}
          throw new Error(errorMsg);
        }

        const resData = await response.json();
        if (resData.url) {
          window.location.href = resData.url;
        } else {
          throw new Error('No checkout URL returned from server.');
        }
      } catch (err) {
        console.error('Checkout error:', err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        setSubmitError(`Failed to initiate checkout: ${message}. Please try again.`);
        setStatus('error');
      }
    }
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Nav */}
      <nav className="border-b" style={{ background: 'rgba(10,10,10,0.95)', borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'var(--orange)' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 6V10L8 14L2 10V6L8 2Z" fill="#0a0a0a" />
                <path d="M8 5L11 7V9L8 11L5 9V7L8 5Z" fill="#0a0a0a" />
              </svg>
            </div>
            <span className="font-bold text-sm" style={{ color: 'var(--text)' }}>GrowthDiagnostic</span>
          </Link>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="5" width="10" height="7" rx="1.5" stroke="var(--muted)" strokeWidth="1.2" /><path d="M3.5 5V3.5a2.5 2.5 0 015 0V5" stroke="var(--muted)" strokeWidth="1.2" strokeLinecap="round" /></svg>
            Secure & Confidential
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {status === 'form' && (
          <>
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--orange)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Business Growth Diagnostic</span>
              </div>
              <h1 className="mb-3 text-[clamp(22px,5.5vw,42px)] font-extrabold leading-tight">
                <span className="block whitespace-nowrap">Identify your revenue leak</span>
                <span className="block mt-1">in 7 minutes</span>
              </h1>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Answer 18 questions. Get a structured PDF report showing your biggest growth bottleneck and how much it's costing you.
              </p>
            </div>

            {/* Progress */}
            <ProgressBar step={step} total={6} />

            {/* Form card */}
            <div className="card-premium p-8 animate-fade-up">
              <div className={`mb-6 ${step === 1 ? 'text-center' : ''}`}>
                {step > 1 && (
                  <div className="section-label mb-1" style={{ color: 'var(--muted)' }}>
                    {['Context', 'Business Profile', 'Seasonality', 'Funnel Metrics', 'Unit Economics', 'Performance & Capture'][step - 1]}
                  </div>
                )}
                <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>
                  {[
                    'Welcome',
                    'Tell us about your business',
                    'How seasonality affects you',
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
              {step === 5 && <Step5 data={data} onChange={onChange} errors={errors} revenueConfirmed={revenueConfirmed} onRevenueConfirm={setRevenueConfirmed} />}
              {step === 6 && <Step6 data={data} onChange={onChange} errors={errors} />}

              {/* Navigation */}
              <div className="mt-8 pt-6 border-t animate-fade-in" style={{ borderColor: 'var(--border)' }}>
                {step === 6 && data.businessType !== 'other' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={() => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border"
                          style={{ background: 'var(--bg2)', color: 'var(--muted)', borderColor: 'var(--border)' }}
                          onMouseOver={e => e.currentTarget.style.borderColor = 'var(--muted)'}
                          onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                        >
                          ← Back
                        </button>
                      ) : <div />}
                      <span className="text-xs text-right" style={{ color: 'var(--muted)' }}>
                        🔒 Secured by PayPal
                      </span>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                      <PayPalButtonContainer
                        data={data}
                        validate={validate}
                        onStartPayment={() => {
                          trackEvent('payment_initiated', { business_type: data.businessType });
                          setStatus('analyzing');
                          setIsCheckoutConfirming(true);
                        }}
                        onSuccessPayment={(orderId) => {
                          trackEvent('payment_completed', { business_type: data.businessType, order_id: orderId });
                          window.location.href = `/diagnostic?success=true&session_id=${orderId}`;
                        }}
                        onPaymentError={(errMessage) => {
                          trackEvent('payment_failed', { business_type: data.businessType, error: errMessage });
                          setSubmitError(errMessage);
                          setStatus('error');
                          setIsCheckoutConfirming(false);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border"
                        style={{ background: 'var(--bg2)', color: 'var(--muted)', borderColor: 'var(--border)' }}
                        onMouseOver={e => e.currentTarget.style.borderColor = 'var(--muted)'}
                        onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                      >
                        ← Back
                      </button>
                    ) : <div />}

                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary"
                    >
                      {step < 6 ? (
                        <>Continue <svg className="ml-1" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></>
                      ) : (
                        <>Request Custom Analysis <svg className="ml-1" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs" style={{ color: 'var(--muted)' }}>
              <span>🔒 Confidential</span>
              <span>⚡ Report delivered instantly</span>
              <span>📄 Structured PDF</span>
              <span>✓ No subscription</span>
            </div>
          </>
        )}

        {status === 'analyzing' && (
          <AnalyzingScreen
            businessType={data.businessType}
            isCheckoutConfirming={isCheckoutConfirming}
          />
        )}
        {status === 'success' && <SuccessScreen email={data.email} businessType={data.businessType} />}
        {status === 'error' && (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
              style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid var(--red)' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 10V18M16 22V23M8 28H24L30 16L24 4H8L2 16L8 28Z" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-black text-2xl mb-3" style={{ color: 'var(--text)' }}>Submission failed</h2>
            <p className="text-sm mb-8 max-w-sm" style={{ color: 'var(--muted)' }}>{submitError}</p>
            <button
              onClick={() => { setStatus('form'); setSubmitError(''); }}
              className="btn-primary"
            >
              ← Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

interface PayPalButtonContainerProps {
  data: FormData;
  validate: () => boolean;
  onStartPayment: () => void;
  onSuccessPayment: (orderId: string) => void;
  onPaymentError: (msg: string) => void;
}

function PayPalButtonContainer({ data, validate, onStartPayment, onSuccessPayment, onPaymentError }: PayPalButtonContainerProps) {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsInstanceRef = useRef<any>(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    if (!clientId) {
      console.error("VITE_PAYPAL_CLIENT_ID is not configured in env variables.");
      setLoadError(true);
      return;
    }

    if (window.paypal) {
      setPaypalLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setPaypalLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load PayPal SDK script.");
      setLoadError(true);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (paypalLoaded && window.paypal && containerRef.current) {
      containerRef.current.innerHTML = '';
      
      try {
        buttonsInstanceRef.current = window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal'
          },
          onClick: (clickData: any, actions: any) => {
            if (!validate()) {
              return actions.reject();
            }
            return actions.resolve();
          },
          createOrder: async () => {
            const res = await fetch('/api/paypal-create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: data.email })
            });
            if (!res.ok) {
              const errData = await res.json();
              throw new Error(errData.error || 'Failed to create PayPal order');
            }
            const order = await res.json();
            return order.id;
          },
          onApprove: async (approveData: any) => {
            onStartPayment();
            try {
              const payload = {
                businessType: data.businessType,
                leadSource: data.leadSource,
                adSpend: data.adSpend || null,
                exactAdSpend: data.exactAdSpend ? parseInt(data.exactAdSpend) : null,
                monthlyLeads: parseInt(data.monthlyLeads) || 0,
                callsBooked: parseInt(data.callsBooked) || 0,
                callsCompleted: parseInt(data.callsCompleted) || 0,
                customersClosed: parseInt(data.customersClosed) || 0,
                dealSize: parseInt(data.dealSize) || 0,
                profitMargin: data.profitMargin,
                salesCycle: data.salesCycle,
                totalRevenue: parseInt(data.totalRevenue) || null,
                responseTime: data.responseTime,
                trackingQuality: data.trackingQuality,
                followUpSystem: data.followUpSystem,
                email: data.email,
                submittedAt: new Date().toISOString(),
                isCustomRequest: data.businessType === 'other',
              };

              const res = await fetch(`/api/paypal-capture-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: approveData.orderID,
                  payload
                })
              });
              
              if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to capture PayPal order');
              }
              const result = await res.json();
              if (result.success) {
                onSuccessPayment(approveData.orderID);
              } else {
                throw new Error('Capture failed');
              }
            } catch (err: any) {
              console.error('PayPal capture error:', err);
              onPaymentError(err.message || 'Payment capture failed. Please contact support.');
            }
          },
          onError: (err: any) => {
            console.error('PayPal Buttons error:', err);
            onPaymentError('An error occurred during PayPal checkout. Please try again.');
          }
        });
        
        buttonsInstanceRef.current.render(containerRef.current);
      } catch (err) {
        console.error('Error rendering PayPal buttons:', err);
      }
    }
  }, [paypalLoaded, data]);

  if (loadError) {
    return (
      <div className="p-4 rounded-xl border text-center text-sm" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'var(--red)', color: 'var(--red)' }}>
        ⚠️ Failed to load PayPal checkout. Please refresh or verify env variables.
      </div>
    );
  }

  if (!paypalLoaded) {
    return (
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mb-2" style={{ borderColor: 'var(--orange)', borderTopColor: 'transparent' }} />
        <div className="text-xs" style={{ color: 'var(--muted)' }}>Loading secure PayPal checkout...</div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full" />;
}
