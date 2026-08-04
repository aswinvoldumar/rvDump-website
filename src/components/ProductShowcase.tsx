import { motion } from 'framer-motion'
import productExploded from '../assets/product-exploded.png'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'
import { SectionHeading } from './ui/SectionHeading'

const specs = [
  { label: 'Installation Time', value: '~2–4 hrs' },
  { label: 'Power Consumption', value: '< 8W idle' },
  { label: 'Connectivity', value: 'Wi-Fi / BT / LTE' },
  { label: 'Sensor Accuracy', value: '±1.5%' },
  { label: 'Operating Temp', value: '-20°C to 70°C' },
  { label: 'Ingress Protection', value: 'IP67' },
]

export function ProductShowcase() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px]" />
      <Container>
        <SectionHeading
          eyebrow="Hardware"
          title="Engineered as a System"
          description="An exploded view of the intelligent core — designed like premium industrial instrumentation, not plumbing hardware."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <FadeIn>
            <motion.div
              className="relative w-full overflow-hidden rounded-[2rem] border border-white/8 bg-black shadow-[0_40px_100px_rgb(0_0_0/0.45)]"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(5_5_5/0.45)_100%)]" />
              <div className="relative z-0 flex min-h-[420px] items-center justify-center px-4 py-6 sm:min-h-[520px] sm:px-6 sm:py-8">
                <img
                  src={productExploded}
                  alt="Exploded view of the RV Waste Automation System controller, circuit boards, ports, and sensor connectors"
                  className="h-auto w-[280px] object-contain object-center sm:w-[320px] lg:w-[340px]"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {specs.map((spec, i) => (
              <FadeIn key={spec.label} delay={i * 0.05}>
                <div className="border-gradient rounded-3xl bg-surface/80 p-5 backdrop-blur-xl">
                  <p className="text-xs tracking-[0.14em] text-muted uppercase">{spec.label}</p>
                  <p className="font-body mt-2 text-base font-semibold text-white sm:text-lg">
                    {spec.value}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
