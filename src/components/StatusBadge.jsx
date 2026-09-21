const statusColors = {
  Placed: 'bg-ink/10 text-ink/70',
  Requested: 'bg-ink/10 text-ink/70',
  'Pending Confirmation': 'bg-marigold-100 text-marigold-600',
  Confirmed: 'bg-leaf/10 text-leaf',
  Preparing: 'bg-marigold-100 text-marigold-600',
  Ready: 'bg-leaf/10 text-leaf',
  Delivered: 'bg-leaf/15 text-leaf',
  Completed: 'bg-leaf/15 text-leaf',
  Cancelled: 'bg-chili/10 text-chili',
  Rejected: 'bg-chili/10 text-chili',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[status] || 'bg-ink/10 text-ink/70'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
