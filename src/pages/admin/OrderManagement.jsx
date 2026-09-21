import { useData } from '../../context/DataContext'
import { orderStatusFlow } from '../../data/mockData'
import StatusBadge from '../../components/StatusBadge'

export default function OrderManagement() {
  const { orders, foods, updateOrderStatus } = useData()

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Order Management</h1>

      <div className="overflow-x-auto rounded-thali border border-ink/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-medium text-ink">{o.id}</td>
                <td className="px-4 py-3 text-muted max-w-[220px]">
                  {o.items.map((i) => {
                    const f = foods.find((x) => x.id === i.foodId)
                    return f ? `${f.name} × ${i.qty}` : null
                  }).filter(Boolean).join(', ')}
                </td>
                <td className="px-4 py-3 text-ink">₹{o.total}</td>
                <td className="px-4 py-3 text-muted">{o.date}</td>
                <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    className="text-xs border border-ink/15 rounded-thali px-2 py-1.5 bg-white"
                  >
                    {orderStatusFlow.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
