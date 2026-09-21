import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import OrderCard from '../components/OrderCard'
import ReservationCard from '../components/ReservationCard'
import Modal from '../components/Modal'

export default function MyOrders() {
  const { orders, reservations, foods } = useData()
  const [tab, setTab] = useState('orders')
  const [viewing, setViewing] = useState(null)

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="font-display text-3xl text-ink mb-2">My Orders & Reservations</h1>
      <p className="text-sm text-muted mb-8">Track the status of everything you&rsquo;ve booked.</p>

      <div className="flex gap-2 border-b border-ink/10 mb-6">
        {[
          { id: 'orders', label: 'Food Orders' },
          { id: 'reservations', label: 'Catering Reservations' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === t.id ? 'border-maroon-500 text-maroon-500' : 'border-transparent text-muted'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        orders.length === 0 ? (
          <Empty text="No food orders yet." to="/menu" cta="Browse the menu" />
        ) : (
          <div className="space-y-4">
            {orders.map((o) => <OrderCard key={o.id} order={o} foods={foods} />)}
          </div>
        )
      )}

      {tab === 'reservations' && (
        reservations.length === 0 ? (
          <Empty text="No catering reservations yet." to="/catering" cta="Book catering" />
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => <ReservationCard key={r.id} reservation={r} onView={setViewing} />)}
          </div>
        )
      )}

      <Modal open={!!viewing} onClose={() => setViewing(null)} maxWidth="max-w-md">
        {viewing && (
          <div className="p-6">
            <p className="text-xs text-muted mb-1">Reservation #{viewing.id}</p>
            <h2 className="font-display text-xl text-ink mb-4">{viewing.eventType} Event</h2>
            <div className="space-y-1.5 text-sm text-ink">
              <p>Date: {viewing.eventDate}</p>
              <p>Guests: {viewing.guests}</p>
              <p>Location: {viewing.location}</p>
              <p>Service: {viewing.serviceType}</p>
            </div>
            <p className="text-xs text-muted uppercase tracking-wide mt-4 mb-1.5">Menu</p>
            <div className="space-y-1">
              {viewing.menu.map((id) => {
                const f = foods.find((x) => x.id === id)
                return f ? <p key={id} className="text-sm text-ink">✓ {f.name}</p> : null
              })}
            </div>
            <div className="rule mt-4 pt-4 flex justify-between font-display text-lg">
              <span>Estimated Total</span>
              <span className="text-maroon-500">₹{viewing.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function Empty({ text, to, cta }) {
  return (
    <div className="text-center py-16 border border-dashed border-ink/15 rounded-thali">
      <p className="text-sm text-muted mb-4">{text}</p>
      <Link to={to} className="text-sm font-semibold text-maroon-500 hover:underline">{cta} →</Link>
    </div>
  )
}
