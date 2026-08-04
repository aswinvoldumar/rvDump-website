import { Cpu, Hand, HeartPulse, Plug, Shield, Timer } from 'lucide-react'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'
import { GlassCard } from './ui/GlassCard'
import { SectionHeading } from './ui/SectionHeading'

const benefits = [
  {
    icon: Hand,
    title: 'Hands-Free Operation',
    description: 'Connect once. The system executes the full disposal sequence without intervention.',
  },
  {
    icon: Cpu,
    title: 'Smart Automation',
    description: 'Sensors, valves, and pumps orchestrated by an intelligent control brain.',
  },
  {
    icon: Plug,
    title: 'Plug & Play Installation',
    description: 'Designed for existing RVs with modular interfaces and clear install paths.',
  },
  {
    icon: Shield,
    title: 'Premium Engineering',
    description: 'Industrial-grade components finished to luxury product standards.',
  },
  {
    icon: Timer,
    title: 'Low Maintenance',
    description: 'Self-cleaning cycles and predictive reminders minimize ownership effort.',
  },
  {
    icon: HeartPulse,
    title: 'Long Product Life',
    description: 'Built for years of travel with sealed enclosures and OTA longevity.',
  },
]

export function Benefits() {
  return (
    <section className="relative py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built for the Way You Travel"
          description="Premium automation that disappears into the background — until you need it, then it just works."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <FadeIn key={benefit.title} delay={(index % 3) * 0.06}>
                <GlassCard className="h-full">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-body text-base font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-3 font-body text-base leading-relaxed font-extralight text-copper">
                    {benefit.description}
                  </p>
                </GlassCard>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
