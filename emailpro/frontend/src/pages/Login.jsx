import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
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
      await login(form)
      navigate('/app')
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Log in to keep your campaigns running.">
      {serverError && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {serverError}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
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
          placeholder="••••••••"
          icon={<Lock size={16} />}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted">
            <input type="checkbox" className="rounded border-white/20 bg-white/5" />
            Remember me
          </label>
          <a href="#" className="text-accent-violet hover:text-white transition-colors">Forgot password?</a>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : <>Log in <ArrowRight size={16} /></>}
        </Button>
      </form>
      <SocialDivider />
      <p className="mt-6 text-center text-sm text-muted">
        Don't have an account? <Link to="/signup" className="text-accent-violet hover:text-white transition-colors">Sign up</Link>
      </p>
    </AuthShell>
  )
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-base-950 px-4 py-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-accent-purple/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent-blue/20 blur-[120px]" />
      </div>
      <GlassCard strong className="relative w-full max-w-md p-8">
        <Link to="/" className="mb-6 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-grad-primary shadow-glow">
            <Mail size={18} className="text-white" />
          </div>
          <span className="font-display text-lg font-semibold text-white">EmailPro</span>
        </Link>
        <h1 className="font-display text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
        <div className="mt-7">{children}</div>
      </GlassCard>
    </div>
  )
}

export function SocialDivider() {
  return (
    <>
      <div className="my-6 flex items-center gap-3">
        <hr className="flex-1 border-white/8" />
        <span className="text-xs text-muted">OR CONTINUE WITH</span>
        <hr className="flex-1 border-white/8" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.8v3.6h5c-.2 1.2-1.5 3.6-5 3.6-3 0-5.4-2.4-5.4-5.4S9 7.2 12 7.2c1.7 0 2.8.7 3.5 1.3l2.4-2.3C16.4 4.7 14.4 3.6 12 3.6 6.9 3.6 2.9 7.7 2.9 12.6S6.9 21.6 12 21.6c5.6 0 8.4-4 8.4-8.7 0-.6-.1-1.2-.2-1.7H12z"/></svg>
          Google
        </Button>
        <Button variant="outline" className="w-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.4-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.5-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/></svg>
          GitHub
        </Button>
      </div>
    </>
  )
}
