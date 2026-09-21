import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { categories } from '../data/mockData'
import { useData } from '../context/DataContext'
import { useCart } from '../context/CartContext'
import FoodCard from '../components/FoodCard'
import FoodDetail from '../components/FoodDetail'

export default function Menu() {
  const { foods } = useData()
  const { addItem } = useCart()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [vegOnly, setVegOnly] = useState(false)
  const [sort, setSort] = useState('popularity')
  const [active, setActive] = useState(null)

  const category = params.get('category') || 'all'

  function setCategory(id) {
    if (id === 'all') setParams({})
    else setParams({ category: id })
  }

  const filtered = useMemo(() => {
    let list = foods.filter((f) => f.availability !== false)
    if (category !== 'all') list = list.filter((f) => f.category === category)
    if (vegOnly) list = list.filter((f) => f.veg)
    if (query.trim()) list = list.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase()))
    if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'popularity') list = [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    return list
  }, [foods, category, vegOnly, query, sort])

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="font-display text-3xl text-ink mb-1">Menu</h1>
      <p className="text-sm text-muted mb-8">Search, filter and add dishes to your cart.</p>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes…"
            className="w-full pl-10 pr-4 py-2.5 rounded-thali border border-ink/15 bg-white text-sm focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 outline-none"
          />
        </div>
        <label className="flex items-center gap-2 text-sm px-3.5 py-2.5 border border-ink/15 rounded-thali bg-white shrink-0">
          <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} className="accent-leaf" />
          Veg only
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3.5 py-2.5 rounded-thali border border-ink/15 bg-white text-sm shrink-0"
        >
          <option value="popularity">Sort: Popularity</option>
          <option value="price-low">Sort: Price (low to high)</option>
          <option value="price-high">Sort: Price (high to low)</option>
        </select>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        <button
          onClick={() => setCategory('all')}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            category === 'all' ? 'bg-maroon-500 text-white border-maroon-500' : 'border-ink/15 text-ink/70 hover:border-maroon-500'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              category === c.id ? 'bg-maroon-500 text-white border-maroon-500' : 'border-ink/15 text-ink/70 hover:border-maroon-500'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted py-16 text-center">No dishes match your search. Try a different filter.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
          {filtered.map((food) => (
            <FoodCard key={food.id} food={food} onOpen={setActive} onAdd={addItem} />
          ))}
        </div>
      )}

      <FoodDetail food={active} open={!!active} onClose={() => setActive(null)} onAdd={addItem} />
    </div>
  )
}
