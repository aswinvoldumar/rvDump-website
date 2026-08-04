import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/Button'
import { Container } from './ui/Container'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Automation', href: '#automation' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Mobile App', href: '#mobile-app' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-[0_10px_40px_rgb(0_0_0/0.35)]' : 'bg-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <a
          href="#home"
          className="font-body text-xl font-semibold tracking-tight sm:text-2xl"
        >
          <span className="text-primary">RV</span> <span className="text-white">Dump</span>
        </a>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contact" className="hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Request Demo
          </Button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface/60 text-white xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-strong border-t border-white/5 xl:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-muted transition-colors hover:bg-surface-hover hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <Button href="#contact" className="mt-2" onClick={() => setOpen(false)}>
                Request Demo
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
