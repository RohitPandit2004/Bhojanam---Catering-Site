import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'

export default function Dashboard() {
  const { orders, reservations } = useData()

  const todaysOrders = orders.length
  const pendingReservations = reservations.filter((r) => r.status === 'Pending Confirmation' || r.status === 'Requested').length
  const revenue = orders.reduce((s, o) => s + o.total, 0) + reservations.reduce((s, r) => s + r.amount, 0)

  const stats = [
    { label: "Today's Orders", value: todaysOrders },
    { label: 'Pending Reservations', value: pendingReservations },
    { label: 'Total Customers', value: 156 },
    { label: 'Revenue', value: `₹${revenue.toLocaleString('en-IN')}` },
  ]

  const recentActivity = [
    ...reservations.slice(0, 2).map((r) => ({
      title: 'New Catering Reservation',
      detail: `${r.eventType} · ${r.guests} Guests`,
      amount: `₹${r.amount.toLocaleString('en-IN')}`,
    })),
    ...orders.slice(0, 2).map((o) => ({
      title: 'New Food Order',
      detail: `Order #${o.id}`,
      amount: `₹${o.total}`,
    })),
  ]

  const quickActions = [
    { label: 'Add Food', to: '/admin/menu' },
    { label: 'Manage Orders', to: '/admin/orders' },
    { label: 'Manage Reservations', to: '/admin/reservations' },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="rounded-thali border border-ink/10 px-5 py-4">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="font-display text-2xl text-maroon-500 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-lg text-ink mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="rounded-thali border border-ink/10 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink">{a.title}</p>
                  <p className="text-xs text-muted">{a.detail}</p>
                </div>
                <span className="text-sm font-semibold text-maroon-500">{a.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg text-ink mb-3">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="block rounded-thali border border-maroon-500/20 px-4 py-3 text-sm font-medium text-maroon-500 hover:bg-maroon-50 transition-colors"
              >
                {a.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
