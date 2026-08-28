import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HERO_VIDEOS } from '../data/heroSlides'
import { Container } from './ui/Container'

const slides = [
  {
    id: 0,
    title: 'Intelligent Automation',
    headline: 'Experiences Powered\nby Intelligence.',
    cta: 'Explore Automation',
    ctaHref: '#automation',
    src: HERO_VIDEOS[0],
  },
  {
    id: 1,
    title: 'Hands-Free Disposal',
    headline: 'Connect Once.\nThe System Takes Over.',
    cta: 'View Features',
    ctaHref: '#features',
    src: HERO_VIDEOS[1],
  },
  {
    id: 2,
    title: 'Smart Controller',
    headline: 'Precision Hardware.\nBuilt to Automate.',
    cta: 'See the Product',
    ctaHref: '#features',
    src: HERO_VIDEOS[2],
  },
  {
    id: 3,
    title: 'Remote Control',
    headline: 'Monitor Anywhere.\nControl From Your Phone.',
    cta: 'Explore the App',
    ctaHref: '#mobile-app',
    src: HERO_VIDEOS[3],
  },
  {
    id: 4,
    title: 'Complete Cycle',
    headline: 'Done. Clean.\nHands-Free.',
    cta: 'Get Started',
    ctaHref: '#contact',
    src: HERO_VIDEOS[4],
  },
]

export function Hero() {
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<number | null>(null)
  const indexRef = useRef(0)

  const active = slides[index]
  const next = slides[(index + 1) % slides.length]

  const goTo = useCallback((nextIndex: number) => {
    const resolved = ((nextIndex % slides.length) + slides.length) % slides.length
    indexRef.current = resolved
    setIndex(resolved)
    setProgress(0)
  }, [])

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.loop = false
    video.src = active.src
    video.load()
    void video.play().catch(() => {})

    const syncProgress = () => {
      const duration = video.duration
      if (Number.isFinite(duration) && duration > 0) {
        setProgress(Math.min(1, video.currentTime / duration))
      }
      frameRef.current = requestAnimationFrame(syncProgress)
    }

    const onEnded = () => {
      goTo(indexRef.current + 1)
    }

    const onLoadedMetadata = () => {
      setProgress(0)
    }

    video.addEventListener('ended', onEnded)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    frameRef.current = requestAnimationFrame(syncProgress)

    return () => {
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [active.src, goTo])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = muted
  }, [muted])

  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          autoPlay
          muted={muted}
          playsInline
          preload="auto"
          aria-hidden
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
      </div>

      <Container className="relative z-10 flex h-full items-end pb-28 sm:pb-32 lg:items-center lg:pb-0">
        <div className="w-full max-w-xl text-left lg:max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-body text-[2rem] leading-[1.15] font-light tracking-tight whitespace-pre-line text-white sm:text-4xl md:text-5xl lg:text-[56px]">
                {active.headline}
              </h1>

              <a
                href={active.ctaHref}
                className="font-body mt-7 inline-flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-primary sm:text-lg"
              >
                {active.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      <div className="absolute right-4 bottom-6 z-20 flex items-end gap-3 sm:right-8 sm:bottom-8">
        <div className="w-[220px] overflow-hidden rounded-lg bg-black/45 backdrop-blur-md sm:w-[260px]">
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="group flex w-full items-center gap-3 px-3 pt-3 pb-2.5 text-left transition hover:bg-white/5"
          >
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm bg-surface">
              <video
                key={next.src}
                src={next.src}
                muted
                playsInline
                autoPlay
                loop
                preload="metadata"
                className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.18em] text-white/60 uppercase">Next</p>
              <p className="font-body truncate text-sm font-semibold text-white sm:text-base">
                {next.title}
              </p>
            </div>
          </button>

          <div className="flex gap-1.5 px-3 pb-3">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                onClick={() => goTo(i)}
                className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/25"
              >
                <span
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{
                    width:
                      i < index ? '100%' : i === index ? `${Math.round(progress * 100)}%` : '0%',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          onClick={() => setMuted((m) => !m)}
          className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur-md transition hover:bg-white/10"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      <a
        href="#automation"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-white/70 transition hover:text-white"
        aria-label="Scroll to next section"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </a>
    </section>
  )
}
