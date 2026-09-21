import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Input } from '../components/Field'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useData } from '../context/DataContext'

const DELIVERY_FEE = 30

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, clearCart } = useCart()
  const { foods, placeOrder, placeReservation } = useData()

  const state = location.state
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
  })
  const [confirmedId, setConfirmedId] = useState(null)

  if (!state) return <Navigate to="/" replace />

  const isReservation = state.type === 'reservation'

  const orderLines = !isReservation
    ? items.map((i) => ({ ...i, food: foods.find((f) => f.id === i.foodId) })).filter((l) => l.food)
    : []
  const orderTotal = orderLines.reduce((sum, l) => sum + l.food.price * l.qty, 0) + DELIVERY_FEE

  const reservation = state.reservation

  const canConfirm = form.name.trim() && form.phone.trim() && form.email.trim() && form.address.trim()

  function handleConfirm() {
    if (isReservation) {
      const res = placeReservation({ ...reservation, customer: form })
      setConfirmedId(res.id)
    } else {
      const order = placeOrder({
        items: orderLines.map((l) => ({ foodId: l.foodId, qty: l.qty })),
        total: orderTotal,
        customer: form,
      })
      clearCart()
      setConfirmedId(order.id)
    }
  }

  if (confirmedId) {
    return (
      <div className="max-w-lg mx-auto px-5 sm:px-8 py-24 text-center">
        <span className="inline-flex w-14 h-14 rounded-full bg-leaf/10 text-leaf items-center justify-center font-display text-2xl mb-5">✓</span>
        <h1 className="font-display text-2xl text-ink mb-2">
          {isReservation ? 'Reservation requested' : 'Order confirmed'}
        </h1>
        <p className="text-sm text-muted mb-1">
          Reference <span className="font-semibold text-ink">{confirmedId}</span>
        </p>
        <p className="text-sm text-muted mb-8">
          {isReservation
            ? 'We\u2019ll confirm your event details shortly. Track its status under My Orders.'
            : 'Your food is being prepared. Track its status under My Orders.'}
        </p>
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex bg-maroon-500 hover:bg-maroon-600 text-white text-sm font-semibold px-5 py-3 rounded-thali"
        >
          View My Orders
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="font-display text-3xl text-ink mb-8">Checkout</h1>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Full name" />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="10-digit number" />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
        <Input label="Address" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} placeholder="Delivery / event address" />
      </div>

      <div className="rule my-8" />

      <h2 className="font-display text-lg text-ink mb-4">Order Summary</h2>

      {isReservation ? (
        <div className="rounded-thali border border-ink/10 px-5 py-4 space-y-2">
          <p className="text-sm text-ink">Event: {reservation.eventType}</p>
          <p className="text-sm text-ink">Date: {reservation.eventDate}</p>
          <p className="text-sm text-ink">Guests: {reservation.guests}</p>
          <div className="pt-2">
            <p className="text-xs text-muted uppercase tracking-wide mb-1.5">Selected Menu</p>
            {reservation.menu.map((id) => {
              const f = foods.find((x) => x.id === id)
              return f ? <p key={id} className="text-sm text-ink">✓ {f.name}</p> : null
            })}
          </div>
          <div className="rule pt-3 flex justify-between font-display text-lg text-ink">
            <span>Estimated Total</span>
            <span className="text-maroon-500">₹{reservation.amount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      ) : (
        <div className="rounded-thali border border-ink/10 px-5 py-4 space-y-2">
          {orderLines.map((l) => (
            <div key={l.foodId} className="flex justify-between text-sm text-ink">
              <span>{l.food.name} × {l.qty}</span>
              <span>₹{l.food.price * l.qty}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm text-muted">
            <span>Delivery / service fee</span>
            <span>₹{DELIVERY_FEE}</span>
          </div>
          <div className="rule pt-3 flex justify-between font-display text-lg text-ink">
            <span>Total</span>
            <span className="text-maroon-500">₹{orderTotal}</span>
          </div>
        </div>
      )}

      <p className="text-xs text-muted mt-4">
        Payment: Cash on delivery / pay later. No online payment is processed for this confirmation.
      </p>

      <button
        disabled={!canConfirm}
        onClick={handleConfirm}
        className="mt-6 w-full bg-maroon-500 hover:bg-maroon-600 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-sm py-3 rounded-thali transition-colors"
      >
        {isReservation ? 'Confirm Reservation' : 'Place Order'}
      </button>
    </div>
  )
}
