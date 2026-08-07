import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    business: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    source: { type: String, enum: ['LinkedIn', 'Web Scrape', 'Google Maps', 'Instagram', 'Referral', 'Manual', 'CSV Import'], default: 'Manual' },
    score: { type: Number, min: 0, max: 100, default: 50 },
    contacted: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
)

leadSchema.index({ owner: 1, email: 1 }, { unique: true })

export default mongoose.model('Lead', leadSchema)
