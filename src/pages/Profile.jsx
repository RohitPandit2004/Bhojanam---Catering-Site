import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/Field'

export default function Profile() {
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: user.name, phone: user.phone, address: user.address })
  const [saved, setSaved] = useState(false)

  function handleSave() {
    updateProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto px-5 sm:px-8 py-10">
      <h1 className="font-display text-3xl text-ink mb-8">Profile</h1>

      <div className="space-y-5">
        <Input label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        <Input label="Email" value={user.email} disabled className="bg-ivory text-muted" />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="10-digit number" />
        <Input label="Saved address" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} placeholder="Add an address" />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full bg-maroon-500 hover:bg-maroon-600 text-white font-semibold text-sm py-3 rounded-thali transition-colors"
      >
        {saved ? 'Saved' : 'Save changes'}
      </button>

      <button onClick={handleLogout} className="mt-3 w-full border border-ink/15 text-chili font-semibold text-sm py-3 rounded-thali">
        Log out
      </button>
    </div>
  )
}
