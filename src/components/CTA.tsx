import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { Button } from './ui/Button'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'

export function CTA() {
  return (
    <section id="contact" className="relative py-20 lg:py-28">
      <Container>
        <FadeIn>
          <div className="border-gradient relative overflow-hidden rounded-[2rem] bg-surface px-6 py-14 sm:px-12 lg:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(216_154_74/0.18),transparent_55%)]" />
            <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative">
              <div className="grid items-start gap-5 md:grid-cols-2 md:gap-10 lg:gap-16">
                <div className="max-w-xl">
                  <FadeIn direction="right">
                    <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                      Ready When You Are
                    </p>
                  </FadeIn>
                  <motion.h2
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="font-body text-[1.75rem] leading-[1.15] font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[44px]"
                  >
                    Stop Managing Your RV Waste System Manually.
                  </motion.h2>
                </div>
                <FadeIn delay={0.18} direction="left">
                  <p className="max-w-xl font-body text-base leading-relaxed font-extralight text-copper text-left md:pt-8 md:justify-self-end md:text-right lg:text-lg">
                    Experience the future of RV sanitation with a fully automated waste management
                    system designed for cleaner, safer, and smarter travel.
                  </p>
                </FadeIn>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4 md:justify-start">
                <Button href="#contact">Request Demo</Button>
                <Button href="#features" variant="secondary">
                  <FileText className="h-4 w-4 shrink-0" aria-hidden />
                  <span>Download Brochure</span>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
