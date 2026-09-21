import { useState } from 'react'
import Modal from './Modal'
import QuantitySelector from './QuantitySelector'

export default function FoodDetail({ food, open, onClose, onAdd }) {
  const [qty, setQty] = useState(1)

  if (!food) return null

  function handleAdd() {
    onAdd(food.id, qty)
    setQty(1)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl text-ink">{food.name}</h2>
          <span
            className={`shrink-0 mt-1.5 w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
              food.veg ? 'border-leaf' : 'border-chili'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${food.veg ? 'bg-leaf' : 'bg-chili'}`} />
          </span>
        </div>
        <p className="text-sm text-muted mt-2 leading-relaxed">{food.desc}</p>
        <p className="text-xs text-muted mt-3">
          <span className="font-medium text-ink/70">Ingredients: </span>
          {food.ingredients}
        </p>

        <div className="rule mt-5 pt-5 flex items-center justify-between">
          <span className="font-display text-xl text-maroon-500">₹{food.price}</span>
          <QuantitySelector value={qty} onChange={setQty} />
        </div>

        <button
          onClick={handleAdd}
          className="mt-5 w-full rounded-thali bg-maroon-500 hover:bg-maroon-600 text-white font-semibold py-3 transition-colors"
        >
          Add to cart · ₹{food.price * qty}
        </button>
      </div>
    </Modal>
  )
}
