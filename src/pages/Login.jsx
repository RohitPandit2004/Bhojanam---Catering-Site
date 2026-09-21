import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/Field'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  function handleSubmit(e) {
    e.preventDefault()
    const account = login(form.email, form.password)
    navigate(account.role === 'ADMIN' ? '/admin' : '/')
  }

  return (
    <div className="max-w-sm mx-auto px-5 sm:px-8 py-16">
      <h1 className="font-display text-3xl text-ink mb-1">Welcome back</h1>
      <p className="text-sm text-muted mb-8">Sign in to book catering and track your orders.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          placeholder="••••••••"
        />
        <button className="w-full bg-maroon-500 hover:bg-maroon-600 text-white font-semibold text-sm py-3 rounded-thali transition-colors">
          Login
        </button>
      </form>

      <p className="text-xs text-muted mt-4">
        Tip: sign in with <span className="font-medium text-ink/70">admin@bhojanam.com</span> to view the admin dashboard. This is a demo login — any password works.
      </p>

      <p className="text-sm text-muted mt-6">
        Don&rsquo;t have an account?{' '}
        <Link to="/register" className="font-semibold text-maroon-500 hover:underline">Create Account</Link>
      </p>
    </div>
  )
}
