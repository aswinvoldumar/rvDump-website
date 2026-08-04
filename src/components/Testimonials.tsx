import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'
import { SectionHeading } from './ui/SectionHeading'

const testimonials = [
  {
    name: 'Elena Marchetti',
    role: 'Full-Time Traveler',
    company: 'Airstream Living',
    rating: 5,
    review:
      'The first dump station stop after installing this felt surreal. Hose on, start pressed, phone alerted me when it was done. No gloves. No guesswork.',
    initials: 'EM',
  },
  {
    name: 'Marcus Chen',
    role: 'Fleet Operations Lead',
    company: 'Horizon RV Rentals',
    rating: 5,
    review:
      'We manage dozens of coaches. Remote monitoring and auto cleaning cut our sanitation turnaround dramatically. This is industrial automation done right.',
    initials: 'MC',
  },
  {
    name: 'Sofia Alvarez',
    role: 'Vanlife Creator',
    company: 'Road Quiet Media',
    rating: 5,
    review:
      'It finally feels like the rest of my smart RV — polished, quiet, intelligent. The app status cards alone are worth the upgrade.',
    initials: 'SA',
  },
  {
    name: 'James Whitaker',
    role: 'Overland Engineer',
    company: 'Northline Expeditions',
    rating: 5,
    review:
      'Leak detection caught a loose fitting on day three. That one alert paid for the system. Everything else is just beautiful convenience.',
    initials: 'JW',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [])

  const active = testimonials[index]

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Voices"
          title="Trusted by Modern Travelers"
          description="Owners who traded a messy ritual for intelligent, hands-free disposal."
        />

        <FadeIn>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className="border-gradient glass-strong rounded-[2rem] p-8 sm:p-10"
              >
                <Quote className="mb-6 h-8 w-8 text-primary/60" />
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-body text-lg leading-relaxed font-extralight text-white/90 sm:text-xl">
                  “{active.review}”
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="font-body flex h-12 w-12 items-center justify-center rounded-full bg-gradient-amber text-sm font-bold text-[#0a0a0a]">
                    {active.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{active.name}</p>
                    <p className="text-sm text-muted">
                      {active.role} · {active.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Peek cards on large screens */}
        <div className="mt-10 hidden gap-4 lg:grid lg:grid-cols-3">
          {testimonials
            .filter((_, i) => i !== index)
            .slice(0, 3)
            .map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border border-white/5 bg-surface/40 p-5 opacity-60"
              >
                <p className="line-clamp-3 text-sm text-muted">“{t.review}”</p>
                <p className="mt-3 text-sm font-semibold text-white">{t.name}</p>
              </div>
            ))}
        </div>
      </Container>
    </section>
  )
}
