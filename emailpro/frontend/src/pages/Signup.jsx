import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Building2, ArrowRight, AlertCircle } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { AuthShell, SocialDivider } from './Login'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (form.name.trim().length < 2) errs.name = 'Enter your full name'
    if (form.company.trim().length < 2) errs.company = 'Enter your company name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address'
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters'
    return errs
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return

    setLoading(true)
    try {
      await signup(form)
      navigate('/app')
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Start your 14-day free trial. No card required.">
      {serverError && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {serverError}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Full name"
          placeholder="Ariana Cole"
          icon={<User size={16} />}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />
        <Input
          label="Company name"
          placeholder="Nimbus Growth"
          icon={<Building2 size={16} />}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          error={errors.company}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="you@company.com"
          icon={<Mail size={16} />}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          icon={<Lock size={16} />}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating account...' : <>Create account <ArrowRight size={16} /></>}
        </Button>
      </form>
      <SocialDivider />
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <Link to="/login" className="text-accent-violet hover:text-white transition-colors">Log in</Link>
      </p>
    </AuthShell>
  )
}
