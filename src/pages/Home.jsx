import { Link } from 'react-router-dom'
import { ArrowRight, Image as ImageIcon, Droplets, Users, Recycle } from 'lucide-react'
import { categories, foods } from '../data/mockData'
import HeroCarousel from '../components/HeroCarousel'

// Add or remove paths here to match the images you drop into public/images/
const heroImages = [
  '/images/dish1.jpg',
  '/images/dish2.webp',
  '/images/dish3.png',
]

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
      <section className="bg-gradient-to-br from-marigold-50 via-ivory to-maroon-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
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
                className="group inline-flex items-center gap-2 bg-maroon-500 hover:bg-maroon-600 text-white font-semibold text-sm px-5 py-3 rounded-thali transition-colors"
              >
                Book Catering
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
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
            <div className="absolute inset-0 thali-ring border-[3px] scale-100 shadow-[0_25px_50px_-12px_rgba(122,31,61,0.45),0_10px_20px_-8px_rgba(36,25,20,0.35)]" />
            <div className="absolute inset-6 thali-ring border" />
            <HeroCarousel images={heroImages} />
          </div>
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

      {/* About Us */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Image placeholder — swap for a real photo (see note below) */}
          <div className="order-2 md:order-1">
            <img
              src="/images/about.jpg"
              alt="The Bhojanam team preparing a catering order"
              className="aspect-[4/5] sm:aspect-[5/4] md:aspect-[4/5] rounded-thali object-cover w-full"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">About Us</h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
              At Bhojanam, we believe that food is more than just a meal — it is a way to bring people together, create memories, and care for one another.
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
              We are committed to serving fresh, hygienic, and delicious food while maintaining the highest standards of quality and cleanliness. Trust, respect, and customer satisfaction are at the heart of everything we do. Whether it is a family celebration, wedding, corporate gathering, or any special occasion, we strive to make every event memorable through great food and reliable service.
            </p>

            <div className="rounded-thali border-l-4 border-marigold-500 bg-marigold-50 px-5 py-4 mb-6">
              <p className="text-sm sm:text-base text-ink/80 leading-relaxed">
                Our responsibility goes beyond our customers. We believe good food should never go to waste — whenever possible, safe leftover food is responsibly distributed to people in need. We also organize food-serving events to support underprivileged communities and share a good meal with those who need it most.
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
              To make every celebration even more rewarding, we also provide special offers and deals for our customers, helping them enjoy quality catering at great value.
            </p>

            <p className="font-display text-lg sm:text-xl text-maroon-500 italic">
              Bhojanam — bringing people together, one meal at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Social Responsibility */}
      <section className="bg-leaf/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">Social Responsibility</h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
              At Bhojanam, our responsibility goes beyond serving our customers. We believe that food is a basic necessity and that sharing it with people in need can make a meaningful difference in the community.
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              We actively organize and participate in social initiatives where we use our resources and catering experience to support people during difficult times. We also believe in reducing food waste by ensuring that safe, untouched surplus food from our events reaches those who need it rather than being thrown away.
            </p>
          </div>

          <h3 className="font-display text-lg text-ink mb-6">Our Initiatives</h3>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div>
              <img
                src="/images/ekta-1.jpg"
                alt="Flood Relief Food Distribution"
                className="aspect-[4/3] rounded-thali object-cover w-full mb-4"
              />
              <div className="flex items-center gap-2 mb-2">
                <Droplets size={18} className="text-leaf" strokeWidth={1.75} />
                <h4 className="font-display text-base text-ink">Flood Relief Food Distribution</h4>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                During flood situations, we organize food distribution drives to provide freshly prepared meals to affected families and communities.
              </p>
            </div>

            <div>
              <img
                src="/images/SP1_3242_result.webp"
                alt="Meals for the Underprivileged"
                className="aspect-[4/3] rounded-thali object-cover w-full mb-4"
              />
              <div className="flex items-center gap-2 mb-2">
                <Users size={18} className="text-leaf" strokeWidth={1.75} />
                <h4 className="font-display text-base text-ink">Meals for the Underprivileged</h4>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                We organize community food events where nutritious meals are prepared and served to people from economically disadvantaged backgrounds.
              </p>
            </div>

            <div>
              <img
                src="/images/images11.jpeg"
                    alt="No Food Wasted"
                    className="aspect-[4/3] rounded-thali object-cover w-full mb-4"
                  />
              <div className="flex items-center gap-2 mb-2">
                <Recycle size={18} className="text-leaf" strokeWidth={1.75} />
                <h4 className="font-display text-base text-ink">No Food Wasted</h4>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                We make every effort to responsibly distribute suitable leftover food from catering events instead of letting it go to waste, helping both people and the environment.
              </p>
            </div>
          </div>

          <p className="font-display text-lg sm:text-xl text-leaf italic">
            For us, every meal is an opportunity to care, share, and make a difference.
          </p>
        </div>
      </section>
    </div>
  )
}