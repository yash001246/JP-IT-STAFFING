import crypto from 'crypto'
import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'

// POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, company } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) return res.status(409).json({ message: 'An account with this email already exists' })

    const apiKey = `epk_live_${crypto.randomBytes(20).toString('hex')}`

    const user = await User.create({ name, email, password, company, apiKey })

    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, company: user.company, role: user.role, plan: user.plan },
    })
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, company: user.company, role: user.role, plan: user.plan },
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/auth/me
export const getProfile = async (req, res, next) => {
  try {
    res.json({ user: req.user })
  } catch (err) {
    next(err)
  }
}
