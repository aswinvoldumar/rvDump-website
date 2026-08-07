import {
  Droplets,
  Gauge,
  Loader2,
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

const COMPARISON_VIDEO = '/comparison-auto-vs-manual.mp4'

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

function ComparisonVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [aspectRatio, setAspectRatio] = useState('16 / 9')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const syncAspect = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setAspectRatio(`${video.videoWidth} / ${video.videoHeight}`)
      }
    }

    const markReady = () => {
      syncAspect()
      setLoading(false)
    }

    if (video.readyState >= 2) {
      markReady()
    }

    syncAspect()
    video.addEventListener('loadedmetadata', syncAspect)
    video.addEventListener('loadeddata', markReady)
    video.addEventListener('canplay', markReady)
    video.addEventListener('playing', markReady)
    video.addEventListener('error', markReady)

    return () => {
      video.removeEventListener('loadedmetadata', syncAspect)
      video.removeEventListener('loadeddata', markReady)
      video.removeEventListener('canplay', markReady)
      video.removeEventListener('playing', markReady)
      video.removeEventListener('error', markReady)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const frame = frameRef.current
    if (!video || !frame) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playPromise = video.play()
          if (playPromise) playPromise.catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.35, rootMargin: '0px' },
    )

    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={frameRef}
      className="border-gradient relative w-full overflow-hidden rounded-[1.5rem] bg-surface shadow-[0_30px_80px_rgb(0_0_0/0.45)] sm:rounded-[1.75rem]"
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        src={COMPARISON_VIDEO}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        tabIndex={-1}
        aria-label="Traditional versus automated RV waste disposal"
      />

      {loading && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-surface"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
          <span className="font-body text-xs tracking-[0.18em] text-muted uppercase">
            Loading video
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-black/15" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgb(0_0_0/0.15)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />

      <div className="pointer-events-none absolute right-3 bottom-7 z-10 rounded-lg bg-black px-3 py-1.5 sm:right-4 sm:bottom-9 sm:px-3.5 sm:py-2">
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

      // Progress through the list while it travels the viewport
      const start = viewH * 0.72
      const end = viewH * 0.28
      const travel = start - end + rect.height
      const scrolled = start - rect.top
      const progress = Math.min(1, Math.max(0, scrolled / travel))

      if (progress <= 0) {
        setActiveIndex(-1)
        return
      }

      const next = Math.min(
        automated.length - 1,
        Math.floor(progress * automated.length),
      )
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
            <ComparisonVideo />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
