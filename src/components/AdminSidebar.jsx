import { NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, UtensilsCrossed, ClipboardList, CalendarCheck, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/menu', label: 'Menu Management', icon: UtensilsCrossed },
  { to: '/admin/orders', label: 'Order Management', icon: ClipboardList },
  { to: '/admin/reservations', label: 'Reservation Management', icon: CalendarCheck },
]

export default function AdminSidebar() {
  const { logout } = useAuth()
  return (
    <aside className="w-full md:w-60 shrink-0 md:border-r border-maroon-500/10 md:min-h-[calc(100vh-4rem)] md:pr-6">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 whitespace-nowrap px-3.5 py-2.5 rounded-thali text-sm font-medium transition-colors ${
                isActive ? 'bg-maroon-500 text-white' : 'text-ink/70 hover:bg-maroon-50'
              }`
            }
          >
            <Icon size={16} strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
        <button
          onClick={logout}
          className="flex items-center gap-2.5 whitespace-nowrap px-3.5 py-2.5 rounded-thali text-sm font-medium text-chili hover:bg-chili/5 md:mt-4"
        >
          <LogOut size={16} strokeWidth={1.75} />
          Sign out
        </button>
      </nav>
    </aside>
  )
}
