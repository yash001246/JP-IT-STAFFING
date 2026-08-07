import { useEffect, useState } from 'react'
import { Bold, Italic, Underline, List, Link2, Paperclip, Send, Clock, Users, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

export default function CampaignBuilder() {
  const { token } = useAuth()
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('Hi {{first_name}},\n\nI wanted to reach out because...')
  const [leads, setLeads] = useState([])
  const [leadsLoading, setLeadsLoading] = useState(true)
  const [selectedLeads, setSelectedLeads] = useState([])
  const [attachment, setAttachment] = useState(null)
  const [sendOption, setSendOption] = useState('now')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendMessage, setSendMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeads() {
      setLeadsLoading(true)
      try {
        const data = await api.getLeads(token, '?limit=100')
        setLeads(data.leads || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLeadsLoading(false)
      }
    }
    loadLeads()
  }, [token])

  const toggleLead = (id) => {
    setSelectedLeads((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    setSelectedLeads(selectedLeads.length === leads.length ? [] : leads.map((l) => l._id || l.id))
  }

  const submit = async () => {
    setError('')
    setSending(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('subject', subject)
      formData.append('body', body)
      selectedLeads.forEach((id) => formData.append('leads[]', id))
      if (sendOption === 'schedule' && scheduleDate) {
        const iso = new Date(`${scheduleDate}T${scheduleTime || '09:00'}`).toISOString()
        formData.append('scheduledAt', iso)
      }
      if (attachment) formData.append('attachment', attachment)

      const data = await api.createCampaign(token, formData)
      setSent(true)
      setSendMessage(data.message || 'Campaign queued successfully')
      setName(''); setSubject(''); setSelectedLeads([]); setAttachment(null)
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-6 animate-fadeUp">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Campaign Builder</h1>
          <p className="text-sm text-muted">Compose, target, and schedule your next campaign.</p>
        </div>
        {sent && (
          <Badge tone="success" className="animate-fadeUp">
            <CheckCircle2 size={13} /> {sendMessage}
          </Badge>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <GlassCard className="p-6">
            <div className="space-y-4">
              <Input label="Campaign name" placeholder="Q4 Agency Outreach" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Subject line" placeholder="Quick idea for {{business_name}}" value={subject} onChange={(e) => setSubject(e.target.value)} />
              <div>
                <span className="mb-1.5 block text-sm font-medium text-white/80">Email body</span>
                <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                  <div className="flex items-center gap-1 border-b border-white/8 px-3 py-2">
                    {[Bold, Italic, Underline, List, Link2].map((Icon, i) => (
                      <button key={i} type="button" className="rounded-lg p-1.5 text-muted hover:bg-white/10 hover:text-white transition-colors">
                        <Icon size={15} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={9}
                    className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-muted/70 outline-none"
                  />
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium text-white/80">Attachment</span>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-sm text-muted hover:border-accent-purple/50 hover:text-white transition-colors">
                  <Paperclip size={16} />
                  {attachment ? attachment.name : 'Click to attach a PDF or catalog'}
                  <input type="file" accept=".pdf" className="hidden" onChange={(e) => setAttachment(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="mb-3 font-display text-base font-semibold text-white">Delivery</h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSendOption('now')}
                className={`flex flex-1 items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors ${sendOption === 'now' ? 'border-accent-purple/60 bg-accent-purple/10 text-white' : 'border-white/10 text-muted hover:text-white'}`}
              >
                <Send size={15} /> Send immediately
              </button>
              <button
                type="button"
                onClick={() => setSendOption('schedule')}
                className={`flex flex-1 items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors ${sendOption === 'schedule' ? 'border-accent-purple/60 bg-accent-purple/10 text-white' : 'border-white/10 text-muted hover:text-white'}`}
              >
                <Clock size={15} /> Schedule for later
              </button>
            </div>
            {sendOption === 'schedule' && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Input type="date" label="Date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
                <Input type="time" label="Time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
              </div>
            )}
          </GlassCard>
        </div>

        {/* Lead selection */}
        <GlassCard className="h-fit p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-white">
              <Users size={16} /> Select leads
            </h3>
            <button onClick={toggleAll} className="text-xs text-accent-violet hover:text-white transition-colors">
              {selectedLeads.length === leads.length && leads.length > 0 ? 'Clear all' : 'Select all'}
            </button>
          </div>
          <p className="mb-3 text-xs text-muted">{selectedLeads.length} of {leads.length} leads selected</p>

          {leadsLoading ? (
            <div className="flex justify-center py-10"><Loader2 size={18} className="animate-spin text-muted" /></div>
          ) : (
            <div className="max-h-80 space-y-1.5 overflow-y-auto pr-1">
              {leads.map((l) => {
                const id = l._id || l.id
                return (
                  <label
                    key={id}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(id)}
                        onChange={() => toggleLead(id)}
                        className="rounded border-white/20 bg-white/5"
                      />
                      <div>
                        <p className="font-medium text-white/90">{l.business}</p>
                        <p className="text-xs text-muted">{l.country}</p>
                      </div>
                    </div>
                    <Badge tone="neutral">{l.score}</Badge>
                  </label>
                )
              })}
              {leads.length === 0 && <p className="py-6 text-center text-sm text-muted">No leads yet — add some on the Leads page first.</p>}
            </div>
          )}

          <Button onClick={submit} className="mt-5 w-full" disabled={!name || !subject || selectedLeads.length === 0 || sending}>
            {sending ? (
              <>Sending <Loader2 size={16} className="animate-spin" /></>
            ) : sendOption === 'now' ? (
              <>Send campaign <Send size={16} /></>
            ) : (
              <>Schedule campaign <Clock size={16} /></>
            )}
          </Button>
        </GlassCard>
      </div>
    </div>
  )
}
