import { Link } from 'react-router-dom'
import {
  Mail, Sparkles, Users, BarChart3, Send, ShieldCheck, ArrowRight, Check, Menu, X, PlayCircle,
} from 'lucide-react'
import { useState } from 'react'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const features = [
  { icon: Sparkles, title: 'AI Email Generator', desc: 'Generate personalized subject lines, email bodies, and follow-ups in seconds, tailored to each lead\'s business and industry.' },
  { icon: Users, title: 'Lead Management', desc: 'Import leads via CSV, enrich them automatically, and score every contact so your team focuses on who matters most.' },
  { icon: Send, title: 'Campaign Builder', desc: 'Design rich campaigns with a drag-free editor, attach catalogs or PDFs, and schedule sends across time zones.' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Track opens, clicks, replies, and bounces with country-level breakdowns and campaign-by-campaign comparisons.' },
  { icon: ShieldCheck, title: 'Deliverability First', desc: 'Built-in warmup, SPF/DKIM guidance, and smart throttling keep your domain reputation healthy at scale.' },
  { icon: Mail, title: 'Multi-Provider Sending', desc: 'Connect Gmail, SMTP, or Resend — route volume across providers automatically for maximum inbox placement.' },
]

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/mo',
    desc: 'For solo founders testing outreach.',
    features: ['2,000 emails / month', '500 lead credits', 'AI email generator', 'Basic analytics'],
    cta: 'Start free trial',
  },
  {
    name: 'Pro',
    price: '$89',
    period: '/mo',
    desc: 'For growing teams running real pipelines.',
    features: ['25,000 emails / month', '10,000 lead credits', 'Advanced AI personalization', 'Full analytics + country insights', 'Team roles & permissions'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '$249',
    period: '/mo',
    desc: 'For agencies managing multiple clients.',
    features: ['150,000 emails / month', 'Unlimited lead credits', 'Dedicated IP warmup', 'Priority support', 'API access'],
    cta: 'Talk to sales',
  },
]

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-base-950 text-white overflow-x-hidden">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-accent-purple/20 blur-[120px] animate-floaty" />
        <div className="absolute top-96 right-0 h-80 w-80 rounded-full bg-accent-blue/20 blur-[120px] animate-floaty" style={{ animationDelay: '2s' }} />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-base-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-grad-primary shadow-glow">
              <Mail size={18} />
            </div>
            <span className="font-display text-lg font-semibold">EmailPro</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login" className="text-sm text-muted hover:text-white transition-colors">Log in</Link>
            <Link to="/signup"><Button size="sm">Get Started</Button></Link>
          </div>
          <button className="text-white md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/8 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm text-muted">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <Link to="/login">Log in</Link>
              <Link to="/signup"><Button size="sm" className="w-full">Get Started</Button></Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 text-center lg:pt-28">
        <div className="animate-fadeUp mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted">
          <Sparkles size={13} className="text-accent-violet" />
          Now with AI-personalized follow-up sequences
        </div>
        <h1 className="animate-fadeUp font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl" style={{ animationDelay: '0.05s' }}>
          AI-Powered Email Outreach
          <br />
          <span className="text-gradient">That Converts</span>
        </h1>
        <p className="animate-fadeUp mx-auto mt-6 max-w-2xl text-base text-muted lg:text-lg" style={{ animationDelay: '0.1s' }}>
          Find leads, write emails that sound human, and send bulk campaigns at scale —
          then watch opens, clicks, and replies roll in through analytics built for outbound teams.
        </p>
        <div className="animate-fadeUp mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '0.15s' }}>
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started <ArrowRight size={16} />
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            <PlayCircle size={16} /> Live Demo
          </Button>
        </div>

        {/* Dashboard preview */}
        <div className="animate-fadeUp relative mx-auto mt-16 max-w-4xl" style={{ animationDelay: '0.2s' }}>
          <GlassCard strong className="overflow-hidden p-2">
            <div className="rounded-xl bg-base-900 p-4 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Total Leads', value: '18,432' },
                  { label: 'Emails Sent', value: '92,187' },
                  { label: 'Open Rate', value: '41.6%' },
                  { label: 'Conversion', value: '6.8%' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/8 bg-white/5 p-4 text-left">
                    <p className="text-xs text-muted">{s.label}</p>
                    <p className="mt-1.5 font-display text-xl font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-40 rounded-xl border border-white/8 bg-white/5 sm:h-52" style={{
                backgroundImage: 'linear-gradient(180deg, rgba(124,92,255,0.15), transparent)',
              }}>
                <div className="flex h-full items-end gap-2 p-4">
                  {[40, 65, 50, 80, 60, 90, 70, 55, 85, 45, 75, 95].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md bg-grad-primary opacity-80" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Logos strip */}
      <section className="mx-auto max-w-5xl px-6 py-10 text-center">
        <p className="text-xs uppercase tracking-widest text-muted">Trusted by outbound teams at</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-8 text-muted/50 font-display text-lg">
          <span>Northwind</span><span>Bluepeak</span><span>Vantage</span><span>Kestrel</span><span>Alto</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Everything outbound needs, in one place</h2>
          <p className="mt-3 text-muted">From finding leads to writing emails to measuring what actually works.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <GlassCard key={title} hover className="p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-grad-primary shadow-glow">
                <Icon size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-3 text-muted">Start free for 14 days. No credit card required.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <GlassCard
              key={plan.name}
              strong={plan.highlighted}
              hover
              className={`relative p-7 ${plan.highlighted ? 'border-accent-purple/50 shadow-glow' : ''}`}
            >
              {plan.highlighted && (
                <Badge tone="purple" className="absolute -top-3 right-6">Most Popular</Badge>
              )}
              <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold">{plan.price}</span>
                <span className="text-muted">{plan.period}</span>
              </div>
              <Link to="/signup">
                <Button variant={plan.highlighted ? 'primary' : 'secondary'} className="mt-6 w-full">
                  {plan.cta}
                </Button>
              </Link>
              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                    <Check size={16} className="mt-0.5 text-accent-violet shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <GlassCard strong className="flex flex-col items-center justify-between gap-6 p-10 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-display text-2xl font-semibold">Ready to fill your pipeline?</h3>
            <p className="mt-1 text-muted">Join hundreds of teams sending smarter outreach with EmailPro.</p>
          </div>
          <Link to="/signup">
            <Button size="lg" className="shrink-0">Get Started <ArrowRight size={16} /></Button>
          </Link>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-primary">
                <Mail size={16} />
              </div>
              <span className="font-display text-base font-semibold">EmailPro</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">AI-powered outreach and lead generation for modern go-to-market teams.</p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            { title: 'Resources', links: ['Docs', 'API Reference', 'Status', 'Support'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-muted hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-muted sm:flex-row">
          <span>© 2026 EmailPro, Inc. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
