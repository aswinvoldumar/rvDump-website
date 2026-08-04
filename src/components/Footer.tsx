import { Globe, Mail, Share2, Video } from 'lucide-react'
import { Container } from './ui/Container'

const columns = [
  {
    title: 'Automation',
    links: ['Smart Monitoring', 'Valve Control', 'Pump Control', 'Cleaning Cycles'],
  },
  {
    title: 'Support',
    links: ['Installation Guide', 'Warranty', 'Troubleshooting', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Brochure', 'Specs', 'Videos', 'Blog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Partners'],
  },
]

const socials = [
  { icon: Share2, label: 'Social' },
  { icon: Video, label: 'YouTube' },
  { icon: Globe, label: 'Website' },
  { icon: Mail, label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <a
              href="#home"
              className="font-body text-xl font-semibold tracking-tight sm:text-2xl"
            >
              <span className="text-primary">RV</span> <span className="text-white">Dump</span>
            </a>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed font-extralight text-copper">
              The intelligent automation system that replaces manual RV waste disposal with
              hands-free precision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-body text-xs font-semibold tracking-wide text-white uppercase">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-muted transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} RV Dump. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href="#contact"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>
      </Container>
    </footer>
  )
}
