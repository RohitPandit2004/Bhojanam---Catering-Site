import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, eventTypes, pricePerGuest, serviceTypes } from '../data/mockData'
import { useData } from '../context/DataContext'
import { Input, Select } from '../components/Field'

const menuCategoryOrder = ['starters', 'mains', 'biryani', 'breads', 'desserts', 'beverages']

const steps = ['Event Details', 'Select Menu', 'Review Reservation']

export default function CateringReservation() {
  const { foods } = useData()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const [event, setEvent] = useState({
    eventType: eventTypes[0],
    eventDate: '',
    guests: 100,
    location: '',
    serviceType: serviceTypes[0],
  })
  const [selectedMenu, setSelectedMenu] = useState([])

  function toggleFood(id) {
    setSelectedMenu((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const estimatedTotal = useMemo(() => event.guests * pricePerGuest, [event.guests])

  const canContinueStep0 = event.eventDate && event.location.trim() && event.guests > 0
  const canContinueStep1 = selectedMenu.length > 0

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToCheckout() {
    navigate('/checkout', {
      state: {
        type: 'reservation',
        reservation: { ...event, menu: selectedMenu, amount: estimatedTotal },
      },
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="font-display text-3xl text-ink mb-2">Book Catering</h1>
      <p className="text-sm text-muted mb-8">Tell us about the event, then build the menu.</p>

      {/* Stepper */}
      <ol className="flex items-center gap-2 mb-10">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2 flex-1">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                i <= step ? 'bg-maroon-500 text-white' : 'bg-ink/10 text-ink/40'
              }`}
            >
              {i + 1}
            </span>
            <span className={`text-xs font-medium hidden sm:inline ${i <= step ? 'text-ink' : 'text-ink/40'}`}>{label}</span>
            {i < steps.length - 1 && <span className="flex-1 h-px bg-ink/10" />}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="space-y-6">
          <fieldset>
            <legend className="text-sm font-medium text-ink/80 mb-2.5">Event Type</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {eventTypes.map((t) => (
                <label
                  key={t}
                  className={`flex items-center gap-2 text-sm border rounded-thali px-3.5 py-2.5 cursor-pointer transition-colors ${
                    event.eventType === t ? 'border-maroon-500 bg-maroon-50 text-maroon-500 font-medium' : 'border-ink/15 text-ink/80'
                  }`}
                >
                  <input
                    type="radio"
                    name="eventType"
                    className="accent-maroon-500"
                    checked={event.eventType === t}
                    onChange={() => setEvent((e) => ({ ...e, eventType: t }))}
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <Input
            label="Event Date"
            type="date"
            value={event.eventDate}
            onChange={(e) => setEvent((ev) => ({ ...ev, eventDate: e.target.value }))}
          />

          <Input
            label="Number of Guests"
            type="number"
            min={10}
            value={event.guests}
            onChange={(e) => setEvent((ev) => ({ ...ev, guests: Math.max(0, Number(e.target.value)) }))}
          />

          <Input
            label="Event Location"
            placeholder="Enter venue or address"
            value={event.location}
            onChange={(e) => setEvent((ev) => ({ ...ev, location: e.target.value }))}
          />

          <fieldset>
            <legend className="text-sm font-medium text-ink/80 mb-2.5">Service Type</legend>
            <div className="grid grid-cols-3 gap-2.5">
              {serviceTypes.map((t) => (
                <label
                  key={t}
                  className={`flex items-center justify-center text-center gap-2 text-sm border rounded-thali px-3 py-2.5 cursor-pointer transition-colors ${
                    event.serviceType === t ? 'border-maroon-500 bg-maroon-50 text-maroon-500 font-medium' : 'border-ink/15 text-ink/80'
                  }`}
                >
                  <input
                    type="radio"
                    name="serviceType"
                    className="accent-maroon-500 sr-only"
                    checked={event.serviceType === t}
                    onChange={() => setEvent((ev) => ({ ...ev, serviceType: t }))}
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            disabled={!canContinueStep0}
            onClick={next}
            className="w-full bg-maroon-500 hover:bg-maroon-600 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-sm py-3 rounded-thali transition-colors"
          >
            Continue
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="text-sm text-muted mb-5">Pick dishes for the buffet across each course.</p>
          <div className="space-y-7">
            {menuCategoryOrder.map((catId) => {
              const cat = categories.find((c) => c.id === catId)
              const items = foods.filter((f) => f.category === catId)
              if (!items.length) return null
              return (
                <div key={catId}>
                  <h3 className="font-display text-lg text-ink mb-2.5">{cat.name}</h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {items.map((f) => (
                      <label
                        key={f.id}
                        className={`flex items-center justify-between gap-3 text-sm border rounded-thali px-3.5 py-2.5 cursor-pointer transition-colors ${
                          selectedMenu.includes(f.id) ? 'border-maroon-500 bg-maroon-50' : 'border-ink/15'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            className="accent-maroon-500"
                            checked={selectedMenu.includes(f.id)}
                            onChange={() => toggleFood(f.id)}
                          />
                          {f.name}
                        </span>
                        <span className="text-muted shrink-0">₹{f.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 rounded-thali border border-marigold-500/40 bg-marigold-50 px-5 py-4">
            <p className="text-xs text-muted uppercase tracking-wide">Estimated Cost</p>
            <p className="text-sm text-ink mt-1">
              {event.guests} guests × ₹{pricePerGuest}/person
            </p>
            <p className="font-display text-2xl text-maroon-500 mt-1">₹{estimatedTotal.toLocaleString('en-IN')}</p>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={back} className="flex-1 border border-ink/15 text-ink/70 font-semibold text-sm py-3 rounded-thali">
              Back
            </button>
            <button
              disabled={!canContinueStep1}
              onClick={next}
              className="flex-[2] bg-maroon-500 hover:bg-maroon-600 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-sm py-3 rounded-thali transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="rounded-thali border border-ink/10 divide-y divide-ink/10">
            <div className="px-5 py-4">
              <p className="text-xs text-muted uppercase tracking-wide mb-2">Event</p>
              <p className="text-sm text-ink">{event.eventType} · {event.serviceType}</p>
              <p className="text-sm text-ink">{event.eventDate || '—'}</p>
              <p className="text-sm text-ink">{event.guests} guests · {event.location}</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-xs text-muted uppercase tracking-wide mb-2">Selected Menu</p>
              <ul className="space-y-1">
                {selectedMenu.map((id) => {
                  const f = foods.find((x) => x.id === id)
                  return f ? (
                    <li key={id} className="text-sm text-ink flex justify-between">
                      <span>✓ {f.name}</span>
                      <span className="text-muted">₹{f.price}</span>
                    </li>
                  ) : null
                })}
              </ul>
            </div>
            <div className="px-5 py-4 flex justify-between items-center">
              <span className="text-sm font-medium text-ink/70">Estimated Total</span>
              <span className="font-display text-xl text-maroon-500">₹{estimatedTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={back} className="flex-1 border border-ink/15 text-ink/70 font-semibold text-sm py-3 rounded-thali">
              Back
            </button>
            <button
              onClick={goToCheckout}
              className="flex-[2] bg-maroon-500 hover:bg-maroon-600 text-white font-semibold text-sm py-3 rounded-thali transition-colors"
            >
              Continue to Confirmation
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
