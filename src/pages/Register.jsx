import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/Field'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords don\u2019t match.')
      return
    }
    register(form)
    navigate('/')
  }

  return (
    <div className="max-w-sm mx-auto px-5 sm:px-8 py-16">
      <h1 className="font-display text-3xl text-ink mb-1">Create account</h1>
      <p className="text-sm text-muted mb-8">Set up your Bhojanam account in a minute.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        <Input label="Phone" required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="10-digit number" />
        <Input label="Password" type="password" required value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
        <Input
          label="Confirm password"
          type="password"
          required
          value={form.confirm}
          onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
          error={error}
        />
        <button className="w-full bg-maroon-500 hover:bg-maroon-600 text-white font-semibold text-sm py-3 rounded-thali transition-colors">
          Create Account
        </button>
      </form>

      <p className="text-sm text-muted mt-6">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-maroon-500 hover:underline">Login</Link>
      </p>
    </div>
  )
}
