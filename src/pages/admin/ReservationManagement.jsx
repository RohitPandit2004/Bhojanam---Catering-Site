import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { reservationStatusFlow } from '../../data/mockData'
import StatusBadge from '../../components/StatusBadge'
import Modal from '../../components/Modal'

export default function ReservationManagement() {
  const { reservations, foods, updateReservationStatus } = useData()
  const [viewing, setViewing] = useState(null)

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Reservation Management</h1>

      <div className="overflow-x-auto rounded-thali border border-ink/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Reservation ID</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Guests</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {reservations.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3 font-medium text-ink">{r.id}</td>
                <td className="px-4 py-3 text-ink">{r.eventType}</td>
                <td className="px-4 py-3 text-muted">{r.eventDate}</td>
                <td className="px-4 py-3 text-muted">{r.guests}</td>
                <td className="px-4 py-3 text-ink">₹{r.amount.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={r.status}
                      onChange={(e) => updateReservationStatus(r.id, e.target.value)}
                      className="text-xs border border-ink/15 rounded-thali px-2 py-1.5 bg-white"
                    >
                      {['Pending Confirmation', ...reservationStatusFlow, 'Rejected'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button onClick={() => setViewing(r)} className="text-xs font-semibold text-maroon-500 hover:underline">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              {viewing.customer && (
                <>
                  <p className="pt-2 text-xs text-muted uppercase tracking-wide">Customer</p>
                  <p>{viewing.customer.name} · {viewing.customer.phone}</p>
                  <p>{viewing.customer.email}</p>
                </>
              )}
            </div>
            <p className="text-xs text-muted uppercase tracking-wide mt-4 mb-1.5">Selected Menu</p>
            <div className="space-y-1">
              {viewing.menu.map((id) => {
                const f = foods.find((x) => x.id === id)
                return f ? <p key={id} className="text-sm text-ink">✓ {f.name}</p> : null
              })}
            </div>
            <div className="rule mt-4 pt-4 flex justify-between font-display text-lg">
              <span>Amount</span>
              <span className="text-maroon-500">₹{viewing.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
