import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { HERO_IMAGE } from '../data/heroSlides'
import { Container } from './ui/Container'

export function Hero() {
  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div className="absolute inset-0 bg-[#0a1620]">
        <img
          src={HERO_IMAGE}
          alt="Family camping beside their RV at sunset overlooking a mountain lake"
          className="h-full w-full object-cover object-[72%_center]"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
      </div>

      <Container className="relative z-10 flex h-full items-end pb-28 sm:pb-32 lg:items-center lg:pb-0">
        <div className="w-full max-w-xl text-left lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-body text-[2rem] leading-[1.15] font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[56px]">
              Hands-Free RV
              <br />
              Waste Disposal.
            </h1>

            <p className="font-body mt-5 max-w-md text-base leading-relaxed font-extralight text-white/80 sm:text-lg">
              Connect once. Intelligent automation handles the rest — clean, sealed, and
              stress-free.
            </p>

            <a
              href="#automation"
              className="font-body mt-8 inline-flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-primary sm:text-lg"
            >
              Explore Automation
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </Container>

      <a
        href="#automation"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-white/70 transition hover:text-white"
        aria-label="Scroll to next section"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </a>
    </section>
  )
}
