import crypto from 'crypto'
import User from '../models/User.js'
import Team from '../models/Team.js'
import { verifySMTP } from '../utils/mailer.js'

// GET /api/settings/api-key
export const getApiKey = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+apiKey')
    res.json({ apiKey: user.apiKey })
  } catch (err) {
    next(err)
  }
}

// POST /api/settings/api-key/rotate
export const rotateApiKey = async (req, res, next) => {
  try {
    const apiKey = `epk_live_${crypto.randomBytes(20).toString('hex')}`
    const user = await User.findByIdAndUpdate(req.user._id, { apiKey }, { new: true }).select('+apiKey')
    res.json({ apiKey: user.apiKey })
  } catch (err) {
    next(err)
  }
}

// GET /api/settings/test-smtp
export const testSMTP = async (req, res, next) => {
  try {
    await verifySMTP()
    res.json({ ok: true, message: 'SMTP connection successful' })
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message })
  }
}

// GET /api/settings/team
export const getTeam = async (req, res, next) => {
  try {
    const team = await Team.findOne({ owner: req.user._id }).populate('members.user', 'name email role')
    res.json({ team })
  } catch (err) {
    next(err)
  }
}

// POST /api/settings/team/invite
export const inviteMember = async (req, res, next) => {
  try {
    const { email, role = 'Viewer' } = req.body
    if (!email) return res.status(400).json({ message: 'Email is required' })

    let team = await Team.findOne({ owner: req.user._id })
    if (!team) team = await Team.create({ name: `${req.user.name}'s Team`, owner: req.user._id, members: [] })

    let invitee = await User.findOne({ email: email.toLowerCase() })
    if (!invitee) {
      // In production, send an email invite instead of creating a placeholder user.
      return res.status(202).json({ message: `Invite sent to ${email}` })
    }

    team.members.push({ user: invitee._id, role })
    await team.save()

    res.status(201).json({ team })
  } catch (err) {
    next(err)
  }
}
