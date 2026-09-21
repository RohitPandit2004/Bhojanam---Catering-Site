export function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-ink/80 mb-1.5">{label}</span>}
      <input
        className={`w-full rounded-thali border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 outline-none transition-colors ${className}`}
        {...props}
      />
      {error && <span className="block text-xs text-chili mt-1">{error}</span>}
    </label>
  )
}

export function Select({ label, options, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-ink/80 mb-1.5">{label}</span>}
      <select
        className={`w-full rounded-thali border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 outline-none transition-colors ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  )
}

export function Textarea({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-ink/80 mb-1.5">{label}</span>}
      <textarea
        className={`w-full rounded-thali border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 outline-none transition-colors ${className}`}
        {...props}
      />
    </label>
  )
}
