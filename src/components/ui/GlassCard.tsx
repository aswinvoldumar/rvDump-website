import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type GlassCardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.25 } } : undefined}
      className={`border-gradient rounded-3xl bg-surface/80 p-6 shadow-[0_24px_80px_rgb(0_0_0/0.35)] backdrop-blur-xl transition-colors duration-300 ${
        hover ? 'hover:bg-surface-hover' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}
