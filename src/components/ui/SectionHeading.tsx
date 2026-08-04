import { motion } from 'framer-motion'
import { FadeIn } from './FadeIn'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`grid items-start gap-5 md:grid-cols-2 md:gap-10 lg:gap-16 ${className}`}
    >
      <div className="max-w-2xl overflow-visible">
        {eyebrow && (
          <FadeIn direction="right" once>
            <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              {eyebrow}
            </p>
          </FadeIn>
        )}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-[1.75rem] leading-[1.15] font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[44px]"
        >
          {title}
        </motion.h2>
      </div>

      {description && (
        <FadeIn delay={0.12} direction="left" once>
          <p className="max-w-xl font-body text-base leading-relaxed font-extralight text-copper text-left md:pt-8 md:justify-self-end md:text-right lg:text-lg">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  )
}
