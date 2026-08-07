import { useState } from 'react'
import { Sparkles, Copy, RefreshCw, Check, AlertCircle } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

export default function AIGenerator() {
  const { token } = useAuth()
  const [form, setForm] = useState({ business: '', industry: '', product: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  const generate = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await api.generateEmail(token, form)
      setResult(data.result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copy = (key, text) => {
    navigator.clipboard?.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div className="space-y-6 animate-fadeUp">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">AI Email Generator</h1>
        <p className="text-sm text-muted">Generate a personalized outreach email and follow-up in seconds.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="mb-4 font-display text-base font-semibold text-white">Lead details</h3>
          <div className="space-y-4">
            <Input
              label="Business name"
              placeholder="Northwind Analytics"
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
            />
            <Input
              label="Industry"
              placeholder="B2B SaaS Analytics"
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            />
            <Input
              label="Product / Service"
              placeholder="EmailPro's AI outreach platform"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            />
            <Button onClick={generate} disabled={loading || !form.business} className="w-full">
              {loading ? (
                <>Generating <RefreshCw size={16} className="animate-spin" /></>
              ) : (
                <>Generate emails <Sparkles size={16} /></>
              )}
            </Button>
          </div>
        </GlassCard>

        <div className="space-y-5">
          {!result && !loading && (
            <GlassCard className="flex h-full min-h-[280px] flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-grad-primary shadow-glow">
                <Sparkles size={20} />
              </div>
              <p className="text-sm text-muted">Fill in lead details and generate your first AI email.</p>
            </GlassCard>
          )}

          {loading && (
            <GlassCard className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 p-6">
              <RefreshCw size={22} className="animate-spin text-accent-violet" />
              <p className="text-sm text-muted">Writing a personalized email...</p>
            </GlassCard>
          )}

          {result && !loading && (
            <>
              <GlassCard className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">Subject line</span>
                  <CopyBtn active={copied === 'subject'} onClick={() => copy('subject', result.subject)} />
                </div>
                <p className="font-display text-base font-medium text-white">{result.subject}</p>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">Personalized email</span>
                  <CopyBtn active={copied === 'body'} onClick={() => copy('body', result.body)} />
                </div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-white/85">{result.body}</p>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">Follow-up email</span>
                  <CopyBtn active={copied === 'followUp'} onClick={() => copy('followUp', result.followUp)} />
                </div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-white/85">{result.followUp}</p>
              </GlassCard>

              <Button variant="secondary" className="w-full" onClick={generate}>
                <RefreshCw size={16} /> Regenerate
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function CopyBtn({ onClick, active }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors">
      {active ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
      {active ? 'Copied' : 'Copy'}
    </button>
  )
}
