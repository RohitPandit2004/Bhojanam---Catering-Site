const DWELL_SECONDS = 3 // how long each dish stays fully, motionless, in frame
const TRANSITION_SECONDS = 0.8 // how long the slide to the next dish takes
const ANIMATION_NAME = 'film-roll-steps'

// One dish fully visible at a time, holding in place, then a quick slide to
// the next one. Pure CSS animation (no JS timers), so it can't get stuck.
export default function HeroCarousel({ images }) {
  const n = images.length
  if (n === 0) return null

  const reversed = [...images].reverse()
  const strip = [...reversed, ...reversed] // duplicated once for a seamless loop

  // translateX stop (% of the track's own width) for each dish, in display order
  const stops = []
  for (let k = 0; k < n; k++) {
    stops.push(-(((2 * n - 1) - k) / (2 * n)) * 100)
  }
  stops.push(-((n - 1) / (2 * n)) * 100) // wrap-around stop, visually identical to stops[0]

  const segmentDuration = DWELL_SECONDS + TRANSITION_SECONDS
  const totalDuration = n * segmentDuration

  const keyframeLines = []
  for (let i = 0; i < n; i++) {
    const holdStart = (i * segmentDuration / totalDuration) * 100
    const holdEnd = ((i * segmentDuration + DWELL_SECONDS) / totalDuration) * 100
    const transitionEnd = ((i + 1) * segmentDuration / totalDuration) * 100
    keyframeLines.push(`${holdStart.toFixed(3)}% { transform: translateX(${stops[i].toFixed(3)}%); }`)
    keyframeLines.push(`${holdEnd.toFixed(3)}% { transform: translateX(${stops[i].toFixed(3)}%); }`)
    keyframeLines.push(`${transitionEnd.toFixed(3)}% { transform: translateX(${stops[i + 1].toFixed(3)}%); }`)
  }
  const keyframesCss = `@keyframes ${ANIMATION_NAME} { ${keyframeLines.join(' ')} }`

  return (
    <div className="absolute inset-10 w-[calc(100%-5rem)] h-[calc(100%-5rem)] rounded-full overflow-hidden">
      <style>{keyframesCss}</style>
      <div
        className="flex h-full"
        style={{
          width: `${strip.length * 100}%`,
          animationName: ANIMATION_NAME,
          animationDuration: `${totalDuration}s`,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}
      >
        {strip.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Bhojanam catering dish"
            className="h-full object-cover shrink-0"
            style={{ width: `${100 / strip.length}%` }}
          />
        ))}
      </div>
    </div>
  )
}