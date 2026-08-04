import { motion } from 'framer-motion'
import { ArrowDown, BellRing, Cable, Cpu, Fingerprint, Workflow } from 'lucide-react'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'
import { SectionHeading } from './ui/SectionHeading'

const steps = [
  {
    icon: Cpu,
    title: 'Install the Automation Controller',
    description: 'Mount the intelligent core and connect sensors, valves, and pump interfaces.',
  },
  {
    icon: Cable,
    title: 'Connect Disposal Hose',
    description: 'One physical connection. The system takes over from here.',
  },
  {
    icon: Fingerprint,
    title: 'Press Start',
    description: 'Initiate from the controller or schedule remotely through the mobile app.',
  },
  {
    icon: Workflow,
    title: 'System Automatically',
    description: '',
    bullets: [
      'Detects Tank Levels',
      'Opens Valves',
      'Starts Pump',
      'Monitors Flow',
      'Flushes Tanks',
      'Cleans System',
      'Closes Valves',
    ],
  },
  {
    icon: BellRing,
    title: 'Receive Completion Notification',
    description: 'Your phone confirms the cycle is finished, sealed, and ready for the road.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <Container>
        <SectionHeading
          eyebrow="Workflow"
          title="How It Works"
          description="A cinematic five-step sequence that replaces the entire manual disposal ritual."
        />

        <div className="relative mt-16">
          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block">
            <div className="absolute top-[52px] right-8 left-8 h-px bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10" />
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <FadeIn key={step.title} delay={index * 0.08}>
                    <div className="relative flex h-full flex-col">
                      <div className="relative z-10 mx-auto mb-6 flex h-[104px] w-[104px] items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.06 }}
                          className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-surface shadow-[0_0_30px_rgb(216_154_74/0.2)]"
                        >
                          <Icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-amber text-xs font-bold text-[#0a0a0a]">
                          {index + 1}
                        </span>
                      </div>
                      <div className="border-gradient flex flex-1 flex-col rounded-3xl bg-surface/70 p-5 backdrop-blur-xl">
                        <h3 className="font-body text-sm font-semibold text-white">
                          {step.title}
                        </h3>
                        {step.description && (
                          <p className="mt-2 font-body text-sm leading-relaxed font-light text-copper">
                            {step.description}
                          </p>
                        )}
                        {step.bullets && (
                          <ul className="mt-3 space-y-1.5">
                            {step.bullets.map((b) => (
                              <li key={b} className="flex items-center gap-2 text-xs text-muted">
                                <span className="h-1 w-1 rounded-full bg-primary" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>

          {/* Mobile / tablet vertical */}
          <div className="space-y-4 lg:hidden">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <FadeIn key={step.title}>
                  <div className="border-gradient rounded-3xl bg-surface/70 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                          Step {index + 1}
                        </p>
                        <h3 className="font-body text-sm font-semibold text-white">{step.title}</h3>
                      </div>
                    </div>
                    {step.description && (
                      <p className="font-body text-sm leading-relaxed font-light text-copper">
                        {step.description}
                      </p>
                    )}
                    {step.bullets && (
                      <ul className="mt-3 grid grid-cols-2 gap-2">
                        {step.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-xs text-muted">
                            <span className="h-1 w-1 rounded-full bg-primary" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-2 text-primary/60">
                      <ArrowDown className="h-5 w-5" />
                    </div>
                  )}
                </FadeIn>
              )
            })}
          </div>
        </div>

        <FadeIn delay={0.2}>
          <p className="font-body mt-14 text-center text-2xl font-light tracking-tight text-white sm:text-3xl lg:text-4xl">
            Done. <span className="text-primary">Clean.</span> Hands-Free.
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
