import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bhojanam_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) localStorage.setItem('bhojanam_user', JSON.stringify(user))
      else localStorage.removeItem('bhojanam_user')
    } catch {
      // ignore storage failures
    }
  }, [user])

  function login(email, password) {
    // Mock authentication — any credentials succeed.
    // Using "admin@bhojanam.com" signs in as an admin for demo purposes.
    const role = email.trim().toLowerCase() === 'admin@bhojanam.com' ? 'ADMIN' : 'CUSTOMER'
    const account = {
      id: 'u1',
      name: role === 'ADMIN' ? 'Admin' : email.split('@')[0] || 'Guest',
      email,
      phone: '',
      address: '',
      role,
    }
    setUser(account)
    return account
  }

  function register({ name, email, phone }) {
    const account = { id: 'u' + Date.now(), name, email, phone, address: '', role: 'CUSTOMER' }
    setUser(account)
    return account
  }

  function logout() {
    setUser(null)
  }

  function updateProfile(patch) {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
