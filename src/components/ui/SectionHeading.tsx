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
      <div className="max-w-xl">
        {eyebrow && (
          <FadeIn>
            <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              {eyebrow}
            </p>
          </FadeIn>
        )}
        <FadeIn delay={0.05}>
          <h2 className="font-body text-[1.75rem] leading-[1.15] font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[44px]">
            {title}
          </h2>
        </FadeIn>
      </div>

      {description && (
        <FadeIn delay={0.1}>
          <p className="max-w-xl font-body text-base leading-relaxed font-light text-copper text-left md:pt-8 md:justify-self-end md:text-right lg:text-lg">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  )
}
