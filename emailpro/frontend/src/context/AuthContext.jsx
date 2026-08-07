import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('emailpro_token'))
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('emailpro_user')
    return cached ? JSON.parse(cached) : null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Revalidate the token against the backend on load, in case it expired.
    async function checkSession() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const data = await api.me(token)
        setUser(data.user)
      } catch {
        logout()
      } finally {
        setLoading(false)
      }
    }
    checkSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const persist = (nextToken, nextUser) => {
    localStorage.setItem('emailpro_token', nextToken)
    localStorage.setItem('emailpro_user', JSON.stringify(nextUser))
    setToken(nextToken)
    setUser(nextUser)
  }

  const login = async ({ email, password }) => {
    setError('')
    const data = await api.login({ email, password })
    persist(data.token, data.user)
    return data
  }

  const signup = async ({ name, email, password, company }) => {
    setError('')
    const data = await api.register({ name, email, password, company })
    persist(data.token, data.user)
    return data
  }

  const logout = () => {
    localStorage.removeItem('emailpro_token')
    localStorage.removeItem('emailpro_user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, error, setError, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
