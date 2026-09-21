import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories, foods } from '../data/mockData'

const steps = [
  { title: 'Choose your menu', body: 'Browse starters through dessert and pick what fits the occasion.' },
  { title: 'Select event details', body: 'Tell us the date, guest count and where it\u2019s happening.' },
  { title: 'Place your reservation', body: 'Review the estimate and confirm — we take it from there.' },
]

export default function Home() {
  const popular = foods.filter((f) => f.popular).slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] text-ink">
            Catering for every occasion, cooked like it&rsquo;s family.
          </h1>
          <p className="mt-5 text-base text-muted leading-relaxed max-w-md">
            From a weeknight order to a 300-guest wedding buffet, Bhojanam books the menu,
            the headcount and the timeline in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/catering"
              className="inline-flex items-center gap-2 bg-maroon-500 hover:bg-maroon-600 text-white font-semibold text-sm px-5 py-3 rounded-thali transition-colors"
            >
              Book Catering <ArrowRight size={16} />
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 border border-maroon-500 text-maroon-500 hover:bg-maroon-50 font-semibold text-sm px-5 py-3 rounded-thali transition-colors"
            >
              Explore Menu
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full">
          <div className="absolute inset-0 thali-ring border-[3px] scale-100" />
          <div className="absolute inset-6 thali-ring border" />
          <img
            src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80"
            alt="A spread of festive Indian catering dishes"
            className="absolute inset-10 w-[calc(100%-5rem)] h-[calc(100%-5rem)] object-cover rounded-full"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl text-ink">Popular food categories</h2>
          <Link to="/menu" className="text-sm font-semibold text-maroon-500 hover:underline">
            View full menu
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/menu?category=${c.id}`}
              className="group rounded-thali border border-maroon-500/15 p-4 hover:border-maroon-500 transition-colors"
            >
              <h3 className="font-display text-base text-ink group-hover:text-maroon-500">{c.name}</h3>
              <p className="text-xs text-muted mt-1">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular dishes */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <h2 className="font-display text-2xl text-ink mb-6">Featured dishes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
          {popular.map((f) => (
            <Link key={f.id} to="/menu" className="group">
              <div className="aspect-[4/3] rounded-thali overflow-hidden bg-maroon-50 mb-3">
                <img src={f.image} alt={f.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
              </div>
              <h3 className="font-display text-sm text-ink leading-snug">{f.name}</h3>
              <p className="text-sm text-maroon-500 font-semibold mt-1">₹{f.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-maroon-500/[0.04] mt-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <h2 className="font-display text-2xl text-ink mb-10">How Bhojanam works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <span className="font-display text-3xl text-marigold-500 leading-none">{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg text-ink">{s.title}</h3>
                  <p className="text-sm text-muted mt-1.5 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
