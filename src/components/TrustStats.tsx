import CountUpImport from 'react-countup'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'

// Vite/CJS interop: default export can be nested as { default: Component }
const CountUp =
  typeof CountUpImport === 'function'
    ? CountUpImport
    : (CountUpImport as unknown as { default: typeof CountUpImport }).default

const stats = [
  { end: 100, suffix: '%', label: 'Hands-Free Disposal' },
  { end: 12, suffix: ' min', label: 'Average Cycle Time' },
  { end: 99.8, suffix: '%', label: 'Sensor Accuracy', decimals: 1 },
  { end: 24, suffix: '/7', label: 'Remote Monitoring' },
]

export function TrustStats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-10 lg:py-14" ref={ref}>
      <Container>
        <FadeIn>
          <div className="border-gradient grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/[0.04] sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface/90 px-4 py-8 text-center backdrop-blur-xl sm:px-6"
              >
                <p className="font-body text-xl font-semibold text-white sm:text-2xl">
                  {inView ? (
                    <CountUp
                      end={stat.end}
                      decimals={stat.decimals ?? 0}
                      duration={2.2}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
