import { useEffect, useState } from 'react'

const VISIBLE_MS = 5500 // how long the rings/logo stay fully shown
const FADE_MS = 500 // how long the fade-out transition takes

// Full-screen splash shown for a moment before the app's first paint.
// Click/tap anywhere to skip it early.
export default function Splash({ onFinish }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const startExit = setTimeout(() => setExiting(true), VISIBLE_MS)
    const finish = setTimeout(onFinish, VISIBLE_MS + FADE_MS)
    return () => {
      clearTimeout(startExit)
      clearTimeout(finish)
    }
  }, [onFinish])

  function handleSkip() {
    setExiting(true)
    setTimeout(onFinish, 300)
  }

  return (
    <div
      onClick={handleSkip}
      role="presentation"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-maroon-500 cursor-pointer transition-opacity duration-500 ease-out ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <span className="splash-ring absolute inset-0 rounded-full border-2 border-marigold-500/30" style={{ animationDelay: '0ms' }} />
        <span className="splash-ring absolute inset-3 rounded-full border-2 border-marigold-500/60" style={{ animationDelay: '150ms' }} />
        <span className="splash-ring absolute inset-6 rounded-full border-2 border-ivory" style={{ animationDelay: '300ms' }} />
        <span className="splash-dot absolute inset-[42%] rounded-full bg-marigold-500" />
      </div>

      <h1 className="splash-text font-display text-3xl sm:text-4xl text-ivory mt-6" style={{ animationDelay: '450ms' }}>
        Bhojanam
      </h1>
      <p className="splash-text text-sm text-marigold-100 mt-1.5" style={{ animationDelay: '600ms' }}>
        Catering for every occasion
      </p>
    </div>
  )
}