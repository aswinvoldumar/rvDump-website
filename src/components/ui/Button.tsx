import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  className?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  'aria-label'?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-white text-[#0a0a0a] hover:bg-secondary hover:shadow-[0_0_32px_rgb(255_182_92/0.45)] border border-transparent',
  secondary:
    'glass text-white hover:bg-surface-hover hover:border-primary/40 border border-white/10',
  ghost: 'bg-transparent text-muted hover:text-white border border-transparent',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  type = 'button',
  onClick,
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-base font-semibold transition-all duration-300 ${variants[variant]} ${className}`

  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2 leading-none">
        {children}
      </span>
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-black/10 transition-transform duration-500 group-hover:translate-x-full" />
      )}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
    >
      {content}
    </motion.button>
  )
}
