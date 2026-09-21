import { Plus } from 'lucide-react'

export default function FoodCard({ food, onOpen, onAdd }) {
  return (
    <div className="group flex flex-col">
      <button
        onClick={() => onOpen(food)}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-thali bg-maroon-50 mb-3"
      >
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span
          className={`absolute top-2.5 left-2.5 w-4 h-4 rounded-sm border-2 flex items-center justify-center bg-white ${
            food.veg ? 'border-leaf' : 'border-chili'
          }`}
          title={food.veg ? 'Vegetarian' : 'Non-vegetarian'}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${food.veg ? 'bg-leaf' : 'bg-chili'}`} />
        </span>
      </button>

      <button onClick={() => onOpen(food)} className="text-left">
        <h3 className="font-display text-base text-ink leading-snug">{food.name}</h3>
        <p className="text-sm text-muted mt-0.5 line-clamp-2">{food.desc}</p>
      </button>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-sm font-semibold text-maroon-500">₹{food.price}</span>
        <button
          onClick={() => onAdd(food.id)}
          className="flex items-center gap-1 text-xs font-semibold text-maroon-500 border border-maroon-500 rounded-thali px-2.5 py-1.5 hover:bg-maroon-500 hover:text-white transition-colors"
        >
          <Plus size={13} strokeWidth={2.5} /> Add
        </button>
      </div>
    </div>
  )
}
