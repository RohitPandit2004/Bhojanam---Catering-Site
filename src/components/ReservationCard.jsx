import StatusBadge from './StatusBadge'

export default function ReservationCard({ reservation, onView }) {
  return (
    <div className="rounded-thali border border-ink/10 px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted">Reservation #{reservation.id}</p>
          <p className="font-display text-base text-ink mt-1">{reservation.eventType} Event</p>
          <p className="text-sm text-muted">{reservation.eventDate} · {reservation.guests} guests</p>
        </div>
        <StatusBadge status={reservation.status} />
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="font-display text-lg text-maroon-500">₹{reservation.amount.toLocaleString('en-IN')}</span>
        {onView && (
          <button onClick={() => onView(reservation)} className="text-xs font-semibold text-maroon-500 hover:underline">
            View Details
          </button>
        )}
      </div>
    </div>
  )
}
