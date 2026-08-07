import { useEffect, useState } from 'react'
import { Mail, Key, Users, Moon, Sun, Copy, Eye, EyeOff, Plus, Check, RefreshCw, AlertCircle, PlugZap } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { teamMembers } from '../lib/dummyData'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

export default function Settings() {
  const { token } = useAuth()
  const [dark, setDark] = useState(true)
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [rotating, setRotating] = useState(false)
  const [error, setError] = useState('')
  const [smtpStatus, setSmtpStatus] = useState(null) // null | 'testing' | 'ok' | 'fail'
  const [smtpMessage, setSmtpMessage] = useState('')

  useEffect(() => {
    async function loadKey() {
      try {
        const data = await api.getApiKey(token)
        setApiKey(data.apiKey)
      } catch (err) {
        setError(err.message)
      }
    }
    loadKey()
  }, [token])

  const copyKey = () => {
    navigator.clipboard?.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const rotateKey = async () => {
    setRotating(true)
    setError('')
    try {
      const data = await api.rotateApiKey(token)
      setApiKey(data.apiKey)
      setShowKey(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setRotating(false)
    }
  }

  const testSmtp = async () => {
    setSmtpStatus('testing')
    setSmtpMessage('')
    try {
      const data = await api.testSMTP(token)
      setSmtpStatus('ok')
      setSmtpMessage(data.message)
    } catch (err) {
      setSmtpStatus('fail')
      setSmtpMessage(err.message)
    }
  }

  return (
    <div className="space-y-6 animate-fadeUp">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-muted">Manage integrations, API access, and your team.</p>
      </div>

      {/* Sending providers */}
      <GlassCard className="p-6">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-white">
          <Mail size={17} /> Email sending (SMTP)
        </h3>
        <p className="mt-1 text-sm text-muted">
          Campaigns send through the SMTP credentials configured in your backend's <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-xs">.env</code> file
          (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS). Test the connection here before sending a real campaign.
        </p>
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-white/8 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">Custom SMTP</p>
            <p className="text-xs text-muted">Works with SendGrid, Mailgun, Postmark, Amazon SES, or any SMTP provider</p>
          </div>
          <div className="flex items-center gap-3">
            {smtpStatus === 'ok' && <Badge tone="success"><Check size={12} /> Connected</Badge>}
            {smtpStatus === 'fail' && <Badge tone="danger"><AlertCircle size={12} /> Failed</Badge>}
            <Button variant="outline" size="sm" onClick={testSmtp} disabled={smtpStatus === 'testing'}>
              <PlugZap size={14} className={smtpStatus === 'testing' ? 'animate-pulse' : ''} />
              {smtpStatus === 'testing' ? 'Testing...' : 'Test connection'}
            </Button>
          </div>
        </div>
        {smtpMessage && (
          <p className={`mt-3 text-xs ${smtpStatus === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>{smtpMessage}</p>
        )}
      </GlassCard>

      {/* API keys */}
      <GlassCard className="p-6">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-white">
          <Key size={17} /> API keys
        </h3>
        <p className="mt-1 text-sm text-muted">Use this key to access the EmailPro REST API.</p>
        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            <AlertCircle size={15} /> {error}
          </div>
        )}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              readOnly
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              placeholder="Loading..."
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 font-mono text-sm text-white outline-none"
            />
            <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white">
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <Button variant="secondary" onClick={copyKey} disabled={!apiKey}>
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="outline" onClick={rotateKey} disabled={rotating}>
            <RefreshCw size={16} className={rotating ? 'animate-spin' : ''} /> Rotate
          </Button>
        </div>
      </GlassCard>

      {/* Team members */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-white">
            <Users size={17} /> Team members
          </h3>
          <Button size="sm" variant="outline"><Plus size={14} /> Invite</Button>
        </div>
        <div className="mt-4 space-y-3">
          {teamMembers.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-grad-primary text-xs font-semibold text-white">
                  {m.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{m.name}</p>
                  <p className="text-xs text-muted">{m.email}</p>
                </div>
              </div>
              <Badge tone={m.role === 'Owner' ? 'purple' : 'neutral'}>{m.role}</Badge>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Appearance */}
      <GlassCard className="p-6">
        <h3 className="font-display text-base font-semibold text-white">Appearance</h3>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/8 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            {dark ? <Moon size={18} className="text-accent-violet" /> : <Sun size={18} className="text-amber-400" />}
            <div>
              <p className="text-sm font-medium text-white">{dark ? 'Dark mode' : 'Light mode'}</p>
              <p className="text-xs text-muted">Switch the EmailPro interface theme</p>
            </div>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className={`relative h-6 w-11 rounded-full transition-colors ${dark ? 'bg-grad-primary' : 'bg-white/15'}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${dark ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </GlassCard>
    </div>
  )
}
