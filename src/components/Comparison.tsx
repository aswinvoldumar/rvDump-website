import {
  Droplets,
  Gauge,
  ShieldCheck,
  Sparkles,
  ToggleRight,
  Waves,
  Wind,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'
import { SectionHeading } from './ui/SectionHeading'

const COMPARISON_IMAGE = '/comparison.jpg'

const automated = [
  { icon: ToggleRight, label: 'Automatic Valve Control' },
  { icon: Zap, label: 'Automatic Pump Operation' },
  { icon: Gauge, label: 'Real-Time Monitoring' },
  { icon: Droplets, label: 'Automatic Flush' },
  { icon: ShieldCheck, label: 'Overflow Protection' },
  { icon: Sparkles, label: 'Leak Detection' },
  { icon: Wind, label: 'Odor Elimination' },
  { icon: Waves, label: 'One-Touch Automation' },
]

function ComparisonVisual() {
  return (
    <div className="border-gradient relative w-full overflow-hidden rounded-[1.5rem] bg-surface shadow-[0_30px_80px_rgb(0_0_0/0.45)] sm:rounded-[1.75rem]">
      <img
        src={COMPARISON_IMAGE}
        alt="Traditional manual RV dumping versus automated hands-free disposal"
        className="block h-auto w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />

      <div className="pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-black/55 px-3 py-1.5 backdrop-blur-sm sm:top-5 sm:left-5 sm:px-3.5">
        <span className="font-body text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase sm:text-xs">
          Traditional
        </span>
      </div>
      <div className="pointer-events-none absolute top-4 right-4 z-10 rounded-full bg-primary/90 px-3 py-1.5 backdrop-blur-sm sm:top-5 sm:right-5 sm:px-3.5">
        <span className="font-body text-[11px] font-semibold tracking-[0.14em] text-[#0a0a0a] uppercase sm:text-xs">
          Automated
        </span>
      </div>

      <div className="pointer-events-none absolute right-3 bottom-4 z-10 rounded-lg bg-black px-3 py-1.5 sm:right-4 sm:bottom-5 sm:px-3.5 sm:py-2">
        <span className="font-body text-sm font-semibold tracking-tight sm:text-base">
          <span className="text-primary">RV</span> <span className="text-white">Dump</span>
        </span>
      </div>
    </div>
  )
}

function AutomatedPoints() {
  const listRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    let ticking = false

    const update = () => {
      ticking = false
      const rect = list.getBoundingClientRect()
      const viewH = window.innerHeight

      const start = viewH * 0.72
      const end = viewH * 0.28
      const travel = start - end + rect.height
      const scrolled = start - rect.top
      const progress = Math.min(1, Math.max(0, scrolled / travel))

      if (progress <= 0) {
        setActiveIndex(-1)
        return
      }

      const next = Math.min(automated.length - 1, Math.floor(progress * automated.length))
      setActiveIndex(next)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="flex flex-col justify-center">
      <p className="mb-8 text-xs font-semibold tracking-[0.22em] text-primary uppercase">
        Automated Model
      </p>

      <ul ref={listRef} className="m-0 list-none space-y-1 p-0">
        {automated.map((item, i) => {
          const Icon = item.icon
          const isActive = i === activeIndex
          const isPast = i < activeIndex

          return (
            <li
              key={item.label}
              className={`flex items-center gap-3 py-3.5 transition-all duration-500 ease-out ${
                isActive
                  ? 'translate-x-1 opacity-100'
                  : isPast
                    ? 'opacity-70'
                    : 'opacity-30'
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-colors duration-500 ${
                  isActive ? 'text-secondary' : isPast ? 'text-primary/70' : 'text-muted/50'
                }`}
                aria-hidden
              />
              <span
                className={`font-body text-base tracking-tight transition-colors duration-500 sm:text-lg ${
                  isActive
                    ? 'font-medium text-secondary'
                    : isPast
                      ? 'font-light text-white'
                      : 'font-light text-muted'
                }`}
              >
                {item.label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Comparison() {
  return (
    <section id="automation" className="relative py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="The Shift"
          title="Traditional vs Automated"
          description="From a messy multi-step ritual to a single connection and intelligent control."
        />

        <div className="mt-12 grid items-center gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.55fr)] lg:gap-12 xl:gap-16">
          <FadeIn direction="right">
            <AutomatedPoints />
          </FadeIn>

          <FadeIn delay={0.1} direction="left" className="w-full lg:sticky lg:top-28">
            <ComparisonVisual />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
