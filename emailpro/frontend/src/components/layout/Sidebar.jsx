import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, Sparkles, Send, BarChart3, Settings, Mail, X,
} from 'lucide-react'
import clsx from 'clsx'

const links = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/leads', label: 'Leads', icon: Users },
  { to: '/app/ai-generator', label: 'AI Generator', icon: Sparkles },
  { to: '/app/campaigns', label: 'Campaigns', icon: Send },
  { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} />}
      <aside
        className={clsx(
          'fixed z-40 flex h-full w-64 flex-col border-r border-white/8 bg-base-900/95 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-grad-primary shadow-glow">
              <Mail size={18} className="text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-white">EmailPro</span>
          </div>
          <button onClick={onClose} className="text-muted hover:text-white lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                clsx(
                  'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-grad-primary text-white shadow-glow'
                    : 'text-muted hover:bg-white/5 hover:text-white'
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="m-4 rounded-2xl border border-white/8 bg-white/5 p-4">
          <p className="text-xs font-medium text-white/80">Pro Plan</p>
          <p className="mt-1 text-xs text-muted">12,400 / 25,000 emails used this month</p>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10">
            <div className="h-1.5 w-[50%] rounded-full bg-grad-primary" />
          </div>
        </div>
      </aside>
    </>
  )
}
