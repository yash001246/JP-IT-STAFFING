import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import CampaignTrendChart from '../components/charts/CampaignTrendChart'
import CountryBarChart from '../components/charts/CountryBarChart'
import FunnelBars from '../components/charts/FunnelBars'
import { campaignPerformanceTrend, countryPerformance, funnelStats, campaigns } from '../lib/dummyData'

export default function Analytics() {
  const topCampaigns = [...campaigns].sort((a, b) => b.opened / b.sent - a.opened / a.sent).slice(0, 4)

  return (
    <div className="space-y-6 animate-fadeUp">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Analytics</h1>
        <p className="text-sm text-muted">Deep dive into delivery, engagement, and geography.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { label: 'Sent', value: '92,187' },
          { label: 'Delivered', value: '89,210' },
          { label: 'Opened', value: '38,340' },
          { label: 'Clicked', value: '11,670' },
          { label: 'Bounced', value: '2,977' },
        ].map((s) => (
          <GlassCard key={s.label} hover className="p-4">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1.5 font-display text-xl font-semibold text-white">{s.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-white">Campaign performance trend</h3>
          <p className="mb-2 text-xs text-muted">Opens and clicks over the last 6 weeks</p>
          <CampaignTrendChart data={campaignPerformanceTrend} />
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-display text-base font-semibold text-white">Funnel breakdown</h3>
          <p className="mb-4 text-xs text-muted">From sent to bounced</p>
          <FunnelBars data={funnelStats} />
        </GlassCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-white">Country-wise performance</h3>
          <p className="mb-2 text-xs text-muted">Opens by country</p>
          <CountryBarChart data={countryPerformance} />
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-4 font-display text-base font-semibold text-white">Top performing campaigns</h3>
          <div className="space-y-4">
            {topCampaigns.map((c) => {
              const rate = ((c.opened / c.sent) * 100).toFixed(1)
              return (
                <div key={c.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white/90">{c.name}</p>
                    <p className="text-xs text-muted">{c.sent.toLocaleString()} sent</p>
                  </div>
                  <Badge tone="purple" className="shrink-0">{rate}% open</Badge>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
