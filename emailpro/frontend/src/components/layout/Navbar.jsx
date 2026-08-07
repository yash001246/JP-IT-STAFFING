import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Menu, ChevronDown } from 'lucide-react'
import { notifications } from '../../lib/dummyData'
import { useAuth } from '../../context/AuthContext'

export default function Navbar({ onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const currentUser = {
    name: user?.name || 'Guest',
    email: user?.email || '',
    avatar: (user?.name || 'G').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(),
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/8 bg-base-900/80 px-4 py-3.5 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-muted hover:text-white lg:hidden">
          <Menu size={22} />
        </button>
        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            placeholder="Search leads, campaigns..."
            className="w-64 rounded-xl bg-white/5 border border-white/10 py-2 pl-9 pr-4 text-sm text-white placeholder:text-muted/70 outline-none transition-all focus:border-accent-purple/60 focus:w-80 focus-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
            className="relative rounded-xl p-2 text-muted hover:bg-white/5 hover:text-white transition-colors"
          >
            <Bell size={19} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-purple animate-pulseGlow" />
          </button>
          {notifOpen && (
            <div className="glass-strong absolute right-0 mt-2 w-80 rounded-2xl p-2 animate-fadeUp">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted">Notifications</p>
              {notifications.map((n) => (
                <div key={n.id} className="rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <span className="text-xs text-muted">{n.time}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{n.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/5 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-grad-primary text-xs font-semibold text-white">
              {currentUser.avatar}
            </div>
            <span className="hidden text-sm font-medium text-white sm:block">{currentUser.name}</span>
            <ChevronDown size={14} className="hidden text-muted sm:block" />
          </button>
          {profileOpen && (
            <div className="glass-strong absolute right-0 mt-2 w-56 rounded-2xl p-2 animate-fadeUp">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-white">{currentUser.name}</p>
                <p className="text-xs text-muted">{currentUser.email}</p>
              </div>
              <hr className="my-1 border-white/8" />
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted hover:bg-white/5 hover:text-white transition-colors">Profile settings</button>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted hover:bg-white/5 hover:text-white transition-colors">Billing</button>
              <button onClick={handleLogout} className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors">Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
