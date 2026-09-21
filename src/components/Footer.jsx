import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-maroon-500/10 mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full thali-ring flex items-center justify-center border-2 border-maroon-500">
            <span className="w-2 h-2 rounded-full bg-marigold-500" />
          </span>
          <span className="font-display text-lg text-maroon-500">Bhojanam</span>
        </div>
        <nav className="flex gap-6 text-sm text-muted">
          <Link to="/menu" className="hover:text-maroon-500">Menu</Link>
          <Link to="/catering" className="hover:text-maroon-500">Book Catering</Link>
          <Link to="/orders" className="hover:text-maroon-500">My Orders</Link>
        </nav>
        <p className="text-xs text-muted">&copy; {new Date().getFullYear()} Bhojanam. Made for your table.</p>
      </div>
    </footer>
  )
}
