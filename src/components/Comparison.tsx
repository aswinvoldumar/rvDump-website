import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Check,
  Droplets,
  Gauge,
  Hand,
  ShieldCheck,
  Sparkles,
  Wind,
  Wrench,
  X,
} from 'lucide-react'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'
import { SectionHeading } from './ui/SectionHeading'

const traditional = [
  { icon: Hand, label: 'Manual Valves' },
  { icon: Wrench, label: 'Manual Pump' },
  { icon: Gauge, label: 'Guess Tank Levels' },
  { icon: Droplets, label: 'Messy Cleanup' },
  { icon: Wind, label: 'Bad Odors' },
  { icon: AlertTriangle, label: 'Overflow Risk' },
  { icon: X, label: 'Multiple Steps' },
]

const automated = [
  { icon: Check, label: 'Automatic Valve Control' },
  { icon: Check, label: 'Automatic Pump Operation' },
  { icon: Check, label: 'Real-Time Monitoring' },
  { icon: Check, label: 'Automatic Flush' },
  { icon: ShieldCheck, label: 'Overflow Protection' },
  { icon: Sparkles, label: 'Leak Detection' },
  { icon: Wind, label: 'Odor Elimination' },
  { icon: Check, label: 'One-Touch Automation' },
]

export function Comparison() {
  return (
    <section id="automation" className="relative py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="The Shift"
          title="Traditional vs Automated"
          description="From a messy multi-step ritual to a single connection and intelligent control."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-3xl border border-white/8 bg-surface/60 p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-muted">
                  <X className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                    Before
                  </p>
                  <h3 className="font-body text-base font-semibold text-white">
                    Traditional RV Waste Disposal
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {traditional.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/30 px-4 py-3.5"
                    >
                      <Icon className="h-4 w-4 text-red-400/80" />
                      <span className="text-sm text-muted line-through decoration-white/20">
                        {item.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="border-gradient relative h-full overflow-hidden rounded-3xl bg-surface/80 p-6 shadow-[0_0_60px_rgb(216_154_74/0.08)] sm:p-8">
              <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                    After
                  </p>
                  <h3 className="font-body text-base font-semibold text-white">
                    Our Smart Automation
                  </h3>
                </div>
              </div>

              <div className="relative space-y-3">
                {automated.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3.5"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-white">{item.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
