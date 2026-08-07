import { useEffect, useState } from 'react'
import { TrendingUp, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import DeliveryChart from '../components/charts/DeliveryChart'
import { deliveryPerformance } from '../lib/dummyData'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { Link } from 'react-router-dom'

const statusTone = {
  Active: 'info',
  Scheduled: 'warning',
  Completed: 'success',
  Draft: 'neutral',
}

export default function Dashboard() {
  const { user, token } = useAuth()
  const [overview, setOverview] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')
      try {
        const [overviewData, campaignsData] = await Promise.all([
          api.getAnalyticsOverview(token),
          api.getCampaigns(token),
        ])
        setOverview(overviewData)
        setCampaigns((campaignsData.campaigns || []).slice(0, 5))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [token])

  const statCards = overview ? [
    { label: 'Total Leads', value: overview.totalLeads.toLocaleString() },
    { label: 'Emails Sent', value: overview.emailsSent.toLocaleString() },
    { label: 'Open Rate', value: `${overview.openRate}%` },
    { label: 'Conversion Rate', value: `${overview.conversionRate}%` },
  ] : []

  return (
    <div className="space-y-6 animate-fadeUp">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Welcome back, {user?.name?.split(' ')[0] || 'there'}</h1>
          <p className="text-sm text-muted">Here's how your outreach is performing today.</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* Stat cards */}
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 size={20} className="animate-spin text-muted" /></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((s) => (
            <GlassCard key={s.label} hover className="p-5">
              <p className="text-sm text-muted">{s.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="font-display text-2xl font-semibold text-white">{s.value}</p>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <TrendingUp size={13} /> live
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Delivery chart */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-white">Delivery performance</h3>
              <p className="text-xs text-muted">Sample 7-day sent vs. opened trend</p>
            </div>
            <div className="flex gap-3 text-xs text-muted">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-accent-purple inline-block" /> Sent</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-accent-cyan inline-block" /> Opened</span>
            </div>
          </div>
          <DeliveryChart data={deliveryPerformance} />
        </GlassCard>

        {/* Recent activity — real campaigns */}
        <GlassCard className="p-6">
          <h3 className="font-display text-base font-semibold text-white">Recent campaigns</h3>
          <div className="mt-4 space-y-4">
            {campaigns.length === 0 && !loading && (
              <p className="text-sm text-muted">No campaigns yet. Create one from the Campaign Builder.</p>
            )}
            {campaigns.map((c) => (
              <div key={c._id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white/90">{c.name}</p>
                  <p className="text-xs text-muted">{c.stats?.sent || 0} sent · {c.stats?.opened || 0} opened</p>
                </div>
                <Badge tone={statusTone[c.status] || 'neutral'}>{c.status}</Badge>
              </div>
            ))}
          </div>
          <Link to="/app/campaigns" className="mt-4 flex items-center gap-1 text-sm text-accent-violet hover:text-white transition-colors">
            Go to campaigns <ArrowUpRight size={14} />
          </Link>
        </GlassCard>
      </div>
    </div>
  )
}
