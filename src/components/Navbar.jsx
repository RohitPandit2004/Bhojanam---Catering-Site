import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, User, Menu as MenuIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/catering', label: 'Book Catering' },
  { to: '/orders', label: 'My Orders' },
]

export default function Navbar() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur border-b border-maroon-500/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-full thali-ring flex items-center justify-center border-2 border-maroon-500">
            <span className="w-2.5 h-2.5 rounded-full bg-marigold-500" />
          </span>
          <span className="font-display text-xl text-maroon-500 tracking-tight">Bhojanam</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-maroon-500' : 'text-ink/70 hover:text-maroon-500'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 -mr-2 text-ink/80 hover:text-maroon-500 transition-colors">
            <ShoppingBag size={20} strokeWidth={1.75} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] leading-4 text-center rounded-full bg-marigold-500 text-maroon-700 font-bold">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => navigate(user.role === 'ADMIN' ? '/admin' : '/profile')}
                className="flex items-center gap-1.5 text-sm font-medium text-ink/80 hover:text-maroon-500"
              >
                <User size={17} strokeWidth={1.75} />
                {user.name}
              </button>
              <button onClick={logout} className="text-sm text-muted hover:text-chili">
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex text-sm font-semibold text-white bg-maroon-500 hover:bg-maroon-600 px-4 py-2 rounded-thali transition-colors"
            >
              Sign in
            </Link>
          )}

          <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-maroon-500/10 bg-ivory px-5 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm font-medium text-ink/80">
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <Link to={user.role === 'ADMIN' ? '/admin' : '/profile'} onClick={() => setOpen(false)} className="text-sm font-medium text-ink/80">
                {user.role === 'ADMIN' ? 'Admin dashboard' : 'Profile'}
              </Link>
              <button onClick={() => { logout(); setOpen(false) }} className="text-sm text-left text-chili">
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-semibold text-maroon-500">
              Sign in
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
