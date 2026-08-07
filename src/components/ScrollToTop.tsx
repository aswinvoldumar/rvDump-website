import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { getLenisInstance } from '../lib/lenis'

const SHOW_AFTER = 480
const SIZE = 52
const STROKE = 2.5
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const circleRef = useRef<SVGCircleElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const apply = (scroll: number, limit: number) => {
      const next = limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0
      progressRef.current = next

      const circle = circleRef.current
      if (circle) {
        circle.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - next)}`
      }

      setVisible((prev) => {
        const show = scroll > SHOW_AFTER
        return prev === show ? prev : show
      })
    }

    let detachLenis: (() => void) | undefined
    let retryId = 0

    const attachLenis = () => {
      const lenis = getLenisInstance()
      if (!lenis) return false

      const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
        apply(scroll, limit)
      }

      lenis.on('scroll', onScroll)
      apply(lenis.scroll, lenis.limit)
      detachLenis = () => lenis.off('scroll', onScroll)
      return true
    }

    if (!attachLenis()) {
      retryId = window.setInterval(() => {
        if (attachLenis()) window.clearInterval(retryId)
      }, 40)
    }

    const onWindowScroll = () => {
      if (getLenisInstance()) return
      const scrollTop = window.scrollY
      const limit = document.documentElement.scrollHeight - window.innerHeight
      apply(scrollTop, limit)
    }

    const onResize = () => {
      const lenis = getLenisInstance()
      if (lenis) {
        apply(lenis.scroll, lenis.limit)
        return
      }
      onWindowScroll()
    }

    window.addEventListener('scroll', onWindowScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.clearInterval(retryId)
      detachLenis?.()
      window.removeEventListener('scroll', onWindowScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const scrollToTop = () => {
    const lenis = getLenisInstance()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.15 })
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
        scale: visible ? 1 : 0.9,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      whileHover={visible ? { scale: 1.06 } : undefined}
      whileTap={visible ? { scale: 0.96 } : undefined}
      tabIndex={visible ? 0 : -1}
      className="glass-strong fixed right-5 bottom-5 z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full text-primary shadow-[0_12px_40px_rgb(0_0_0/0.45)] transition-colors duration-300 hover:bg-primary/15 hover:text-secondary sm:right-7 sm:bottom-7"
    >
      <svg
        className="pointer-events-none absolute inset-0 -rotate-90"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="rgb(255 255 255 / 0.12)"
          strokeWidth={STROKE}
        />
        <circle
          ref={circleRef}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          className="text-primary"
        />
      </svg>
      <ArrowUp className="relative h-5 w-5" strokeWidth={2.25} />
    </motion.button>
  )
}
