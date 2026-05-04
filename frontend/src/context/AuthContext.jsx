import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  const normalize = (res) => res?.data?.user || res?.data || res?.user || null

  const loginUser = async (email, password) => {
    const res   = await authService.login({ email, password })
    const token = res?.data?.accessToken || res?.accessToken
    const u     = normalize(res)
    if (!token) throw new Error('Access token missing')
    localStorage.setItem('accessToken', token)
    setUser(u)
    return u
  }

  const registerUser = async (payload) => {
    const res   = await authService.register(payload)
    const token = res?.data?.accessToken || res?.accessToken
    const u     = normalize(res)
    if (token) localStorage.setItem('accessToken', token)
    setUser(u)
    return u
  }

  const logoutUser = async () => {
    try { await authService.logout() } catch {}
    localStorage.removeItem('accessToken')
    setUser(null)
  }

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('accessToken')
      if (!token) { setLoading(false); return }
      try {
        const res = await authService.getMe()
        setUser(normalize(res))
      } catch {
        localStorage.removeItem('accessToken')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    loginUser,
    registerUser,
    logoutUser,
  }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
