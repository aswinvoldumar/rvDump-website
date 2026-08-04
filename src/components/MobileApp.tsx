import { motion } from 'framer-motion'
import {
  Bell,
  Bluetooth,
  MapPin,
  RefreshCw,
  Shield,
  Smartphone,
  Wifi,
  Wrench,
} from 'lucide-react'
import { Container } from './ui/Container'
import { FadeIn } from './ui/FadeIn'
import { SectionHeading } from './ui/SectionHeading'

const floatingCards = [
  { icon: Bell, title: 'Real-Time Alerts', desc: 'Instant status push', pos: 'top-[8%] -left-2 sm:-left-8' },
  { icon: Smartphone, title: 'Remote Start', desc: 'Begin from anywhere', pos: 'top-[28%] -right-2 sm:-right-10' },
  { icon: RefreshCw, title: 'Auto Cleaning', desc: 'Scheduled cycles', pos: 'bottom-[28%] -left-2 sm:-left-10' },
  { icon: Shield, title: 'System Diagnostics', desc: 'Health at a glance', pos: 'bottom-[10%] -right-2 sm:-right-8' },
  { icon: Wrench, title: 'OTA Updates', desc: 'Always improving', pos: 'top-[55%] right-0 sm:right-[-2%]' },
]

const dashboardRows = [
  { label: 'Black Tank', value: '42%', width: '42%' },
  { label: 'Grey Tank', value: '67%', width: '67%' },
  { label: 'Fresh Water', value: '81%', width: '81%' },
]

export function MobileApp() {
  return (
    <section id="mobile-app" className="relative py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Companion App"
          title="Full Control in Your Pocket"
          description="Live tank levels, pump and valve status, cleaning cycles, dump station locator, and completion alerts — all in one premium interface."
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Floating cards */}
          {floatingCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                className={`absolute z-20 hidden md:block ${card.pos}`}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              >
                <div className="glass flex w-44 items-start gap-3 rounded-2xl p-3 shadow-[0_20px_50px_rgb(0_0_0/0.4)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">{card.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}

          <FadeIn>
            <div className="relative mx-auto w-[260px] sm:w-[290px]">
              <div className="rounded-[2.4rem] border border-white/15 bg-[#0a0a0a] p-2.5 shadow-[0_40px_100px_rgb(0_0_0/0.55)]">
                <div className="overflow-hidden rounded-[2rem] border border-white/5 bg-[#111]">
                  {/* Notch */}
                  <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-black" />
                  <div className="space-y-4 px-4 pt-4 pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] tracking-[0.18em] text-primary uppercase">
                          Dashboard
                        </p>
                        <p className="font-body text-sm font-semibold">System Live</p>
                      </div>
                      <div className="flex gap-1.5 text-primary">
                        <Bluetooth className="h-3.5 w-3.5" />
                        <Wifi className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {dashboardRows.map((row) => (
                        <div key={row.label} className="rounded-2xl bg-black/40 p-3">
                          <div className="mb-1.5 flex justify-between text-xs">
                            <span className="text-muted">{row.label}</span>
                            <span className="font-semibold text-white">{row.value}</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gradient-amber"
                              style={{ width: row.width }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Pump', value: 'Standby' },
                        { label: 'Valves', value: 'Sealed' },
                        { label: 'Cleaning', value: 'Ready' },
                        { label: 'Battery', value: '94%' },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl bg-black/40 p-2.5">
                          <p className="text-[10px] text-muted">{item.label}</p>
                          <p className="mt-0.5 text-xs font-semibold text-white">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {[
                        { icon: MapPin, label: 'GPS Dump Station Locator' },
                        { icon: Bell, label: 'Notifications & History' },
                        { icon: Wrench, label: 'Maintenance Reminder' },
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.label}
                            className="flex items-center gap-2 rounded-xl border border-white/5 bg-primary/5 px-3 py-2"
                          >
                            <Icon className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[11px] text-white/90">{item.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Mobile floating cards as grid */}
          <div className="mt-8 grid grid-cols-2 gap-3 md:hidden">
            {floatingCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="glass rounded-2xl p-3">
                  <Icon className="mb-2 h-4 w-4 text-primary" />
                  <p className="text-xs font-semibold text-white">{card.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
