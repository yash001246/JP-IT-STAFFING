import fs from 'fs'
import csv from 'csv-parser'
import Lead from '../models/Lead.js'

// GET /api/leads?search=&source=&page=&limit=
export const getLeads = async (req, res, next) => {
  try {
    const { search = '', source, page = 1, limit = 10 } = req.query
    const query = { owner: req.user._id }

    if (source && source !== 'All') query.source = source
    if (search) {
      query.$or = [
        { business: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ]
    }

    const skip = (Number(page) - 1) * Number(limit)
    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Lead.countDocuments(query),
    ])

    res.json({ leads, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    next(err)
  }
}

// POST /api/leads
export const createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create({ ...req.body, owner: req.user._id })
    res.status(201).json({ lead })
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'This lead already exists' })
    next(err)
  }
}

// PATCH /api/leads/:id
export const updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true })
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json({ lead })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/leads/:id
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json({ message: 'Lead deleted' })
  } catch (err) {
    next(err)
  }
}

// POST /api/leads/upload-csv  (multipart/form-data, field: file)
export const uploadCSV = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No CSV file uploaded' })

    const results = []
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        results.push({
          owner: req.user._id,
          business: row.business || row.Business || row.company || '',
          email: (row.email || row.Email || '').toLowerCase(),
          phone: row.phone || row.Phone || '',
          country: row.country || row.Country || '',
          source: 'CSV Import',
          score: Number(row.score) || 50,
        })
      })
      .on('end', async () => {
        const valid = results.filter((r) => r.business && r.email)
        const inserted = await Lead.insertMany(valid, { ordered: false }).catch((e) => e.insertedDocs || [])
        fs.unlink(req.file.path, () => {})
        res.status(201).json({ message: `Imported ${inserted.length || valid.length} leads`, count: inserted.length || valid.length })
      })
      .on('error', (err) => next(err))
  } catch (err) {
    next(err)
  }
}
