import { Link, useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useData } from '../context/DataContext'
import QuantitySelector from '../components/QuantitySelector'

const DELIVERY_FEE = 30

export default function Cart() {
  const { items, setQty, removeItem, clearCart } = useCart()
  const { foods } = useData()
  const navigate = useNavigate()

  const lines = items
    .map((i) => ({ ...i, food: foods.find((f) => f.id === i.foodId) }))
    .filter((l) => l.food)

  const subtotal = lines.reduce((sum, l) => sum + l.food.price * l.qty, 0)
  const total = lines.length ? subtotal + DELIVERY_FEE : 0

  if (lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display text-2xl text-ink mb-2">Your cart is empty</h1>
        <p className="text-sm text-muted mb-6">Add a few dishes from the menu to get started.</p>
        <Link to="/menu" className="inline-flex bg-maroon-500 hover:bg-maroon-600 text-white text-sm font-semibold px-5 py-3 rounded-thali">
          Browse the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="font-display text-3xl text-ink mb-8">Your cart</h1>

      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {lines.map((l) => (
          <div key={l.foodId} className="flex items-center gap-4 py-4">
            <img src={l.food.image} alt={l.food.name} className="w-16 h-16 object-cover rounded-thali shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base text-ink truncate">{l.food.name}</h3>
              <p className="text-sm text-muted">₹{l.food.price} each</p>
            </div>
            <QuantitySelector value={l.qty} onChange={(q) => setQty(l.foodId, q)} />
            <span className="w-16 text-right text-sm font-semibold text-ink">₹{l.food.price * l.qty}</span>
            <button onClick={() => removeItem(l.foodId)} className="text-muted hover:text-chili p-1" aria-label="Remove item">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={clearCart} className="text-sm text-muted hover:text-chili">Empty cart</button>
      </div>

      <div className="mt-8 max-w-sm ml-auto space-y-2">
        <div className="flex justify-between text-sm text-ink/70">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-ink/70">
          <span>Delivery / service fee</span>
          <span>₹{DELIVERY_FEE}</span>
        </div>
        <div className="rule pt-2 flex justify-between font-display text-lg text-ink">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button
          onClick={() => navigate('/checkout', { state: { type: 'order' } })}
          className="mt-4 w-full bg-maroon-500 hover:bg-maroon-600 text-white font-semibold text-sm py-3 rounded-thali transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}
