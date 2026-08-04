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
import { FadeIn } from './ui/FadeIn'
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
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="features" className="relative py-20 lg:py-28">
      <Container className="max-w-[1440px]">
        <SectionHeading
          eyebrow="Capabilities"
          title="Complete Automation. Zero Manual Operation."
          description="Every critical step of RV waste disposal — monitored, controlled, and completed by intelligent hardware."
        />

        <FadeIn>
          <div
            className="mt-14 flex h-[340px] items-stretch gap-2 overflow-x-auto pb-2 sm:gap-3 lg:h-[380px] lg:overflow-visible"
            onMouseLeave={() => setActive(null)}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isOpen = active === index

              return (
                <button
                  key={feature.title}
                  type="button"
                  aria-expanded={isOpen}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(isOpen ? null : index)}
                  className={`border-gradient group relative flex h-full shrink-0 flex-col overflow-hidden rounded-3xl bg-surface/80 text-left shadow-[0_24px_80px_rgb(0_0_0/0.35)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    isOpen
                      ? 'z-20 w-[260px] bg-surface-hover px-5 py-6 ring-1 ring-primary/30 glow-amber sm:w-[300px]'
                      : 'z-10 w-[72px] items-center px-2 py-6 hover:bg-surface-hover sm:w-[84px] lg:w-auto lg:min-w-[72px] lg:flex-1'
                  }`}
                >
                  {/* Icon — top aligned across all cards */}
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-transform duration-500 ${
                      isOpen ? 'mb-5 scale-110' : 'mb-6'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  {isOpen ? (
                    <>
                      {/* Expanded: horizontal heading + description */}
                      <h3 className="font-body text-base font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="font-body mt-3 text-sm leading-relaxed font-light text-copper">
                        {feature.description}
                      </p>
                    </>
                  ) : (
                    /* Collapsed: vertical heading top → bottom */
                    <h3 className="font-body mt-auto mb-2 flex flex-1 items-end justify-center">
                      <span className="origin-center rotate-180 text-[11px] leading-tight font-semibold whitespace-nowrap text-white [writing-mode:vertical-rl] sm:text-xs">
                        {feature.title}
                      </span>
                    </h3>
                  )}
                </button>
              )
            })}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
