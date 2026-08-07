import { useEffect, useState, useCallback } from 'react'
import { Upload, Plus, Search, CheckCircle2, Circle, ChevronLeft, ChevronRight, Trash2, Loader2, AlertCircle } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

const PAGE_SIZE = 6
const SOURCES = ['All', 'LinkedIn', 'Web Scrape', 'Google Maps', 'Instagram', 'Referral', 'Manual', 'CSV Import']

export default function Leads() {
  const { token } = useAuth()
  const [leads, setLeads] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [query, setQuery] = useState('')
  const [sourceFilter, setSourceFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [addOpen, setAddOpen] = useState(false)
  const [newLead, setNewLead] = useState({ business: '', email: '', phone: '', country: '', source: 'Manual' })
  const [saving, setSaving] = useState(false)

  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState('')

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
        ...(query && { search: query }),
        ...(sourceFilter !== 'All' && { source: sourceFilter }),
      })
      const data = await api.getLeads(token, `?${params.toString()}`)
      setLeads(data.leads)
      setTotal(data.total)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token, page, query, sourceFilter])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const scoreTone = (score) => (score >= 80 ? 'success' : score >= 60 ? 'warning' : 'neutral')

  const addLead = async () => {
    if (!newLead.business || !newLead.email) return
    setSaving(true)
    try {
      await api.createLead(token, newLead)
      setNewLead({ business: '', email: '', phone: '', country: '', source: 'Manual' })
      setAddOpen(false)
      setPage(1)
      fetchLeads()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const removeLead = async (id) => {
    try {
      await api.deleteLead(token, id)
      fetchLeads()
    } catch (err) {
      setError(err.message)
    }
  }

  const onUploadCSV = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadMsg('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const data = await api.uploadLeadsCSV(token, formData)
      setUploadMsg(data.message || 'CSV imported')
      setPage(1)
      fetchLeads()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-6 animate-fadeUp">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Leads</h1>
          <p className="text-sm text-muted">{total.toLocaleString()} leads found</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" disabled={uploading} onClick={() => document.getElementById('csv-input').click()}>
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? 'Uploading...' : 'Upload CSV'}
          </Button>
          <input id="csv-input" type="file" accept=".csv" className="hidden" onChange={onUploadCSV} />
          <Button onClick={() => setAddOpen(true)}><Plus size={16} /> Add Lead</Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          <AlertCircle size={15} /> {error}
        </div>
      )}
      {uploadMsg && !error && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400">
          <CheckCircle2 size={15} /> {uploadMsg}
        </div>
      )}

      <GlassCard className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              placeholder="Search by business, email, or country..."
              className="w-full rounded-xl bg-white/5 border border-white/10 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-muted/70 outline-none focus:border-accent-purple/60 focus-ring"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {SOURCES.map((s) => (
              <button
                key={s}
                onClick={() => { setSourceFilter(s); setPage(1) }}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  sourceFilter === s ? 'border-accent-purple/60 bg-accent-purple/15 text-white' : 'border-white/10 text-muted hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/8 text-xs uppercase tracking-wide text-muted">
              <th className="whitespace-nowrap px-5 py-3.5">Business Name</th>
              <th className="whitespace-nowrap px-5 py-3.5">Email</th>
              <th className="whitespace-nowrap px-5 py-3.5">Phone</th>
              <th className="whitespace-nowrap px-5 py-3.5">Country</th>
              <th className="whitespace-nowrap px-5 py-3.5">Source</th>
              <th className="whitespace-nowrap px-5 py-3.5">Score</th>
              <th className="whitespace-nowrap px-5 py-3.5">Contacted</th>
              <th className="whitespace-nowrap px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={8} className="px-5 py-10 text-center text-muted"><Loader2 size={18} className="mx-auto animate-spin" /></td></tr>
            )}
            {!loading && leads.map((l) => (
              <tr key={l._id || l.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.03]">
                <td className="whitespace-nowrap px-5 py-3.5 font-medium text-white">{l.business}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-muted">{l.email}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-muted">{l.phone}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-muted">{l.country}</td>
                <td className="whitespace-nowrap px-5 py-3.5"><Badge tone="neutral">{l.source}</Badge></td>
                <td className="whitespace-nowrap px-5 py-3.5"><Badge tone={scoreTone(l.score)}>{l.score}</Badge></td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  {l.contacted ? (
                    <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 size={15} /> Yes</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-muted"><Circle size={15} /> No</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <button onClick={() => removeLead(l._id || l.id)} className="text-muted hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && leads.length === 0 && (
              <tr><td colSpan={8} className="px-5 py-10 text-center text-muted">No leads match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </GlassCard>

      <div className="flex items-center justify-between text-sm text-muted">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={15} /> Prev
          </Button>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next <ChevronRight size={15} />
          </Button>
        </div>
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add a new lead"
        footer={<>
          <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={addLead} disabled={saving}>{saving ? 'Saving...' : 'Add Lead'}</Button>
        </>}
      >
        <div className="space-y-3">
          <Input label="Business name" value={newLead.business} onChange={(e) => setNewLead({ ...newLead, business: e.target.value })} placeholder="Acme Inc." />
          <Input label="Email" type="email" value={newLead.email} onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} placeholder="hello@acme.com" />
          <Input label="Phone" value={newLead.phone} onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} placeholder="+1 555 000 0000" />
          <Input label="Country" value={newLead.country} onChange={(e) => setNewLead({ ...newLead, country: e.target.value })} placeholder="United States" />
        </div>
      </Modal>
    </div>
  )
}
