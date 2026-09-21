import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ value, onChange, min = 1 }) {
  return (
    <div className="flex items-center gap-1 border border-ink/15 rounded-thali">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 flex items-center justify-center text-ink/70 hover:text-maroon-500"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="w-7 text-center text-sm font-semibold">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 flex items-center justify-center text-ink/70 hover:text-maroon-500"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
