import { motion } from 'framer-motion'
import {
  Bluetooth,
  Droplets,
  Gauge,
  Radio,
  Smartphone,
  Waves,
  Zap,
} from 'lucide-react'

const floaters = [
  { icon: Gauge, label: 'Tank Sensors', x: '8%', y: '12%', delay: 0 },
  { icon: Zap, label: 'Pump Control', x: '72%', y: '8%', delay: 0.4 },
  { icon: Droplets, label: 'Valve Network', x: '78%', y: '58%', delay: 0.8 },
  { icon: Radio, label: 'Wireless Hub', x: '4%', y: '62%', delay: 1.2 },
  { icon: Smartphone, label: 'App Linked', x: '62%', y: '78%', delay: 0.6 },
  { icon: Bluetooth, label: 'Live Sync', x: '18%', y: '82%', delay: 1 },
]

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Atmospheric background */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(40_28_16)_0%,rgb(8_8_8)_55%,rgb(5_5_5)_100%)]" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[80px]" />
          <div className="absolute right-8 bottom-16 h-40 w-40 rounded-full bg-secondary/10 blur-[60px]" />
        </div>
        {/* Soft horizon / nature suggestion */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0c1410] via-transparent to-transparent opacity-60" />
        <div className="absolute inset-x-[10%] bottom-[18%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Central controller */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-20 w-[58%] -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="border-gradient relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] p-5 shadow-[0_30px_80px_rgb(0_0_0/0.6)] sm:p-7">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(255_255_255/0.06)_0%,transparent_40%)]" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
                  Automation Core
                </p>
                <p className="font-body mt-1 text-sm font-semibold sm:text-base">Controller X1</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Waves className="h-5 w-5" />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Black Tank', value: '42%', color: 'bg-primary' },
                { label: 'Grey Tank', value: '67%', color: 'bg-secondary' },
                { label: 'Pump', value: 'Ready', color: 'bg-emerald-400' },
                { label: 'Valves', value: 'Auto', color: 'bg-sky-400' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/5 bg-black/40 px-3 py-2.5"
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${item.color} animate-pulse`} />
                    <p className="text-[10px] text-muted">{item.label}</p>
                  </div>
                  <p className="font-body mt-1 text-sm font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary">Disposal Cycle</span>
                <span className="font-semibold text-white">Running</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/40">
                <motion.div
                  className="h-full rounded-full bg-gradient-amber"
                  initial={{ width: '18%' }}
                  animate={{ width: ['18%', '86%', '18%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Orbiting hardware chips */}
      {floaters.map((item) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.label}
            className="absolute z-30"
            style={{ left: item.x, top: item.y }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4 + item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            <div className="glass flex items-center gap-2 rounded-2xl px-3 py-2 shadow-[0_12px_40px_rgb(0_0_0/0.4)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="hidden text-xs font-medium text-white sm:inline">{item.label}</span>
            </div>
          </motion.div>
        )
      })}

      {/* Soft reflection */}
      <div className="pointer-events-none absolute inset-x-[15%] bottom-[6%] h-16 rounded-[100%] bg-primary/10 blur-2xl" />
    </div>
  )
}
