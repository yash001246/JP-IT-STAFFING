import Campaign from '../models/Campaign.js'
import Lead from '../models/Lead.js'

// GET /api/analytics/overview
export const getOverview = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ owner: req.user._id })
    const totals = campaigns.reduce(
      (acc, c) => {
        acc.sent += c.stats?.sent || 0
        acc.delivered += c.stats?.delivered || 0
        acc.opened += c.stats?.opened || 0
        acc.clicked += c.stats?.clicked || 0
        acc.bounced += c.stats?.bounced || 0
        return acc
      },
      { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0 }
    )

    const totalLeads = await Lead.countDocuments({ owner: req.user._id })
    const openRate = totals.sent ? ((totals.opened / totals.sent) * 100).toFixed(1) : '0.0'
    const conversionRate = totals.sent ? ((totals.clicked / totals.sent) * 100).toFixed(1) : '0.0'

    res.json({
      totalLeads,
      emailsSent: totals.sent,
      openRate: Number(openRate),
      conversionRate: Number(conversionRate),
      funnel: totals,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/analytics/campaigns/top
export const getTopCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ owner: req.user._id })
    const ranked = campaigns
      .map((c) => ({
        id: c._id,
        name: c.name,
        sent: c.stats?.sent || 0,
        openRate: c.stats?.sent ? Number(((c.stats.opened / c.stats.sent) * 100).toFixed(1)) : 0,
      }))
      .sort((a, b) => b.openRate - a.openRate)
      .slice(0, 5)

    res.json({ campaigns: ranked })
  } catch (err) {
    next(err)
  }
}
