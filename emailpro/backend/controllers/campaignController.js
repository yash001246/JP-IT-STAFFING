import path from 'path'
import Campaign from '../models/Campaign.js'
import Lead from '../models/Lead.js'
import { sendCampaignEmails } from '../utils/mailer.js'

// GET /api/campaigns
export const getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ owner: req.user._id }).sort({ createdAt: -1 })
    res.json({ campaigns })
  } catch (err) {
    next(err)
  }
}

// GET /api/campaigns/:id
export const getCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findOne({ _id: req.params.id, owner: req.user._id }).populate('leads')
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
    res.json({ campaign })
  } catch (err) {
    next(err)
  }
}

// POST /api/campaigns
export const createCampaign = async (req, res, next) => {
  try {
    const { name, subject, body, scheduledAt } = req.body
    // multipart/form-data sends repeated 'leads[]' fields; multer collapses these into
    // req.body.leads as an array (stripping the [] suffix).
    let leadIds = req.body.leads || req.body['leads[]'] || []
    if (!Array.isArray(leadIds)) leadIds = [leadIds]

    if (!name || !subject || !body) {
      return res.status(400).json({ message: 'Name, subject, and body are required' })
    }
    if (leadIds.length === 0) {
      return res.status(400).json({ message: 'Select at least one lead' })
    }

    const leads = await Lead.find({ _id: { $in: leadIds }, owner: req.user._id })
    if (leads.length === 0) {
      return res.status(404).json({ message: 'None of the selected leads were found' })
    }

    const attachmentPath = req.file ? req.file.path : undefined
    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : undefined
    const attachmentName = req.file ? req.file.originalname : undefined

    // Scheduled campaigns are stored but not dispatched immediately.
    // A production deployment should pick these up with a cron job or queue (e.g. node-cron, BullMQ)
    // that calls sendCampaignEmails() once scheduledAt has passed.
    if (scheduledAt) {
      const campaign = await Campaign.create({
        owner: req.user._id,
        name,
        subject,
        body,
        leads: leads.map((l) => l._id),
        attachment: attachmentUrl,
        status: 'Scheduled',
        scheduledAt,
        stats: { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0 },
      })
      return res.status(201).json({ campaign, message: 'Campaign scheduled' })
    }

    // Send immediately via configured SMTP.
    const sendResult = await sendCampaignEmails({ subject, body, leads, attachmentPath, attachmentName })

    const campaign = await Campaign.create({
      owner: req.user._id,
      name,
      subject,
      body,
      leads: leads.map((l) => l._id),
      attachment: attachmentUrl,
      status: 'Active',
      stats: {
        sent: sendResult.sent,
        delivered: sendResult.sent,
        opened: 0,
        clicked: 0,
        bounced: sendResult.bounced,
      },
    })

    res.status(201).json({
      campaign,
      message: sendResult.bounced > 0
        ? `Sent to ${sendResult.sent} leads, ${sendResult.bounced} failed`
        : `Sent to ${sendResult.sent} leads`,
      failures: sendResult.errors,
    })
  } catch (err) {
    next(err)
  }
}

// PATCH /api/campaigns/:id
export const updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true })
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
    res.json({ campaign })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/campaigns/:id
export const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
    res.json({ message: 'Campaign deleted' })
  } catch (err) {
    next(err)
  }
}
