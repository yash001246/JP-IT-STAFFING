import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    company: { type: String, trim: true },
    role: { type: String, enum: ['Owner', 'Admin', 'Editor', 'Viewer'], default: 'Owner' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    plan: { type: String, enum: ['Starter', 'Pro', 'Scale'], default: 'Starter' },
    apiKey: { type: String, select: false },
    authProvider: { type: String, enum: ['local', 'google', 'github'], default: 'local' },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.model('User', userSchema)
