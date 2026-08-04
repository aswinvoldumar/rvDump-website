import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HERO_VIDEOS } from '../data/heroSlides'

type LoadingScreenProps = {
  onReady: () => void
}

function preloadVideo(src: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true

    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      resolve()
    }

    video.addEventListener('canplaythrough', done, { once: true })
    video.addEventListener('loadeddata', done, { once: true })
    video.addEventListener('error', done, { once: true })
    video.src = src
    video.load()

    // Safety timeout per video
    window.setTimeout(done, 10000)
  })
}

export function LoadingScreen({ onReady }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let cancelled = false
    const minDisplay = new Promise((r) => window.setTimeout(r, 1200))

    Promise.all([
      // Prioritize first hero video, also warm the rest
      preloadVideo(HERO_VIDEOS[0]),
      ...HERO_VIDEOS.slice(1).map((src) => preloadVideo(src)),
      minDisplay,
    ]).then(() => {
      if (cancelled) return
      setVisible(false)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onReady}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
            {/* Loading circle */}
            <motion.div
              className="absolute inset-0 rounded-full border-[3px] border-[#0a0a0a]/15 border-t-[#0a0a0a]"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-center text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              <span className="text-[#0a0a0a]">RV</span>{' '}
              <span className="text-[#0a0a0a]/75">Dump</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
