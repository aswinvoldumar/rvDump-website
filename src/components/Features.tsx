import { useState } from 'react'
import {
  Bell,
  Droplets,
  Gauge,
  Hand,
  ShieldAlert,
  Smartphone,
  Sparkles,
  SprayCan,
  Waves,
  Wind,
  type LucideIcon,
} from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Gauge,
    title: 'Smart Tank Monitoring',
    description: 'Continuously monitors Black & Grey tanks with live precision.',
  },
  {
    icon: Waves,
    title: 'Automatic Valve Control',
    description: 'System intelligently opens and closes valves at the right moment.',
  },
  {
    icon: Droplets,
    title: 'Automatic Pump Control',
    description: 'Starts and stops the pump automatically based on flow and level.',
  },
  {
    icon: ShieldAlert,
    title: 'Overflow Protection',
    description: 'Prevents accidental overflow with predictive threshold control.',
  },
  {
    icon: Sparkles,
    title: 'Leak Detection',
    description: 'Detects leaks before they become costly roadside problems.',
  },
  {
    icon: SprayCan,
    title: 'Automatic Cleaning Cycle',
    description: 'Flushes tanks after disposal for a cleaner closed system.',
  },
  {
    icon: Wind,
    title: 'Odor Elimination',
    description: 'Keeps the waste system fresh between dump cycles.',
  },
  {
    icon: Bell,
    title: 'Maintenance Reminders',
    description: 'Predictive maintenance notifications keep hardware healthy.',
  },
  {
    icon: Smartphone,
    title: 'Remote Monitoring',
    description: 'View status, history, and alerts from anywhere.',
  },
  {
    icon: Hand,
    title: 'One-Touch Operation',
    description: 'One button handles the complete disposal process.',
  },
]

export function Features() {
  const [active, setActive] = useState(0)
  const [hoverActive, setHoverActive] = useState<number | null>(null)

  const openIndex = hoverActive ?? active

  return (
    <section
      id="features"
      className="relative flex min-h-screen flex-col justify-center py-20 lg:py-28"
    >
      <Container className="max-w-[1440px]">
        <SectionHeading
          eyebrow="Capabilities"
          title="Complete Automation. Zero Manual Operation."
          description="Every critical step of RV waste disposal — monitored, controlled, and completed by intelligent hardware."
        />

        <div
          className="mt-14 flex h-[340px] items-stretch gap-2 overflow-x-auto pb-2 sm:gap-3 lg:h-[380px] lg:overflow-visible"
          onMouseLeave={() => setHoverActive(null)}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isOpen = openIndex === index

            return (
              <button
                key={feature.title}
                type="button"
                aria-expanded={isOpen}
                onMouseEnter={() => setHoverActive(index)}
                onFocus={() => {
                  setActive(index)
                  setHoverActive(index)
                }}
                onClick={() => {
                  setActive(index)
                  setHoverActive(index)
                }}
                className={`group relative flex h-full shrink-0 flex-col overflow-hidden rounded-3xl bg-surface/80 text-left shadow-[0_24px_80px_rgb(0_0_0/0.35)] backdrop-blur-xl outline-none will-change-[width,flex-grow,padding] ${
                  isOpen
                    ? 'border-gradient z-20 w-[220px] px-5 py-6 glow-amber sm:w-[240px] lg:flex-[2.4]'
                    : 'z-10 w-[72px] items-center border border-white/8 px-2 py-6 sm:w-[84px] lg:w-auto lg:min-w-[72px] lg:flex-1'
                }`}
                style={{
                  transition:
                    'width 700ms cubic-bezier(0.22, 1, 0.36, 1), flex-grow 700ms cubic-bezier(0.22, 1, 0.36, 1), padding 700ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 700ms cubic-bezier(0.22, 1, 0.36, 1), background-color 700ms ease',
                }}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen
                      ? 'mb-5 self-start bg-primary/20 text-secondary'
                      : 'mb-6 self-center bg-primary/12 text-primary'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="relative min-h-0 w-full flex-1">
                  <div
                    className={`absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen
                        ? 'translate-y-0 opacity-100 delay-150'
                        : 'pointer-events-none translate-y-3 opacity-0'
                    }`}
                  >
                    <h3 className="font-body text-base font-semibold whitespace-normal text-white">
                      {feature.title}
                    </h3>
                    <p className="font-body mt-3 text-sm leading-relaxed font-extralight text-copper">
                      {feature.description}
                    </p>
                  </div>

                  <div
                    className={`absolute inset-x-0 bottom-2 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen
                        ? 'pointer-events-none translate-y-2 opacity-0'
                        : 'opacity-100 delay-100'
                    }`}
                  >
                    <span className="origin-center rotate-180 text-[11px] leading-tight font-semibold whitespace-nowrap text-white [writing-mode:vertical-rl] sm:text-xs">
                      {feature.title}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5" aria-hidden>
          {features.map((feature, index) => (
            <span
              key={feature.title}
              className={`h-1 rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                openIndex === index
                  ? 'w-6 bg-secondary'
                  : index < openIndex
                    ? 'w-2 bg-primary/50'
                    : 'w-2 bg-white/15'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
