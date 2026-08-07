import mongoose from 'mongoose'

const campaignSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    leads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }],
    attachment: { type: String },
    status: { type: String, enum: ['Draft', 'Scheduled', 'Active', 'Completed'], default: 'Draft' },
    scheduledAt: { type: Date },
    stats: {
      sent: { type: Number, default: 0 },
      delivered: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      clicked: { type: Number, default: 0 },
      bounced: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
)

export default mongoose.model('Campaign', campaignSchema)
