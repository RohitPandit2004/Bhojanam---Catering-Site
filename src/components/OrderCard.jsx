import StatusBadge from './StatusBadge'

export default function OrderCard({ order, foods }) {
  return (
    <div className="rounded-thali border border-ink/10 px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted">Order #{order.id}</p>
          <p className="text-sm text-ink mt-1">
            {order.items.map((i) => {
              const f = foods.find((x) => x.id === i.foodId)
              return f ? `${f.name} × ${i.qty}` : null
            }).filter(Boolean).join(', ')}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-muted">{order.date}</span>
        <span className="font-display text-lg text-maroon-500">₹{order.total}</span>
      </div>
    </div>
  )
}
