import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenisInstance } from '../lib/lenis'

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    setLenisInstance(lenis)

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const el = document.querySelector(hash)
      if (!(el instanceof HTMLElement)) return

      event.preventDefault()
      lenis.scrollTo(el, { offset: -80 })
    }

    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      cancelAnimationFrame(frame)
      setLenisInstance(null)
      lenis.destroy()
    }
  }, [])

  return null
}
