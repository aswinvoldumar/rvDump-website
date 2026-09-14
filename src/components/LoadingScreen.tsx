import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HERO_IMAGE } from '../data/heroSlides'

type LoadingScreenProps = {
  onReady: () => void
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      resolve()
    }

    img.onload = done
    img.onerror = done
    img.src = src
    window.setTimeout(done, 8000)
  })
}

export function LoadingScreen({ onReady }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let cancelled = false
    const minDisplay = new Promise((r) => window.setTimeout(r, 1000))

    Promise.all([preloadImage(HERO_IMAGE), minDisplay]).then(() => {
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
            <motion.div
              className="absolute inset-0 rounded-full border-[3px] border-secondary/20 border-t-secondary"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-center text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              <span className="text-secondary">RV</span>{' '}
              <span className="text-white">Dump</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
