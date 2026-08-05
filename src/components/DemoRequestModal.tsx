import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useDemoRequest } from '../context/DemoRequestContext'
import { Button } from './ui/Button'

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/aswin.voldumar@gmail.com'

const OWNER_SUBJECT = 'RV Dump — New Demo Request'
const CLIENT_AUTORESPONSE = `Hi there,

Thanks for requesting a demo of RV Dump.

We've received your details and will connect with you shortly to schedule a walkthrough of the intelligent RV waste automation system.

— RV Dump Team`

type Status = 'idle' | 'loading' | 'success' | 'error'

export function DemoRequestModal() {
  const { isOpen, closeDemoRequest } = useDemoRequest()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status !== 'loading') closeDemoRequest()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeDemoRequest, status])

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setEmail('')
      setStatus('idle')
      setError('')
    }
  }, [isOpen])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: `${name} requested a product demo for RV Dump.`,
          _subject: OWNER_SUBJECT,
          _template: 'table',
          _captcha: 'false',
          _autoresponse: CLIENT_AUTORESPONSE,
          _replyto: email,
        }),
      })

      const data = (await response.json()) as { success?: string | boolean; message?: string }

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send demo request.')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close demo request form"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => status !== 'loading' && closeDemoRequest()}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-request-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-gradient relative z-10 w-full max-w-md rounded-[1.75rem] bg-surface p-6 shadow-[0_30px_80px_rgb(0_0_0/0.55)] sm:p-8"
          >
            <button
              type="button"
              aria-label="Close"
              disabled={status === 'loading'}
              onClick={closeDemoRequest}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-primary/40 hover:text-white disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>

            {status === 'success' ? (
              <div className="py-4 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-secondary" />
                <h2
                  id="demo-request-title"
                  className="font-body mt-4 text-2xl font-light tracking-tight text-white"
                >
                  Request received
                </h2>
                <p className="font-body mt-3 text-base leading-relaxed font-extralight text-copper">
                  Thanks {name.split(' ')[0] || 'there'}. We emailed{' '}
                  <span className="text-white">{email}</span> with a confirmation, and our team
                  will connect with you shortly.
                </p>
                <Button className="mt-8" onClick={closeDemoRequest}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                  Request Demo
                </p>
                <h2
                  id="demo-request-title"
                  className="font-body mt-3 text-2xl font-light tracking-tight text-white sm:text-3xl"
                >
                  Get a hands-free walkthrough.
                </h2>
                <p className="font-body mt-3 text-base leading-relaxed font-extralight text-copper">
                  Share your details and we&apos;ll reach out to schedule your RV Dump demo.
                </p>

                <form className="mt-7 space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label htmlFor="demo-name" className="mb-2 block text-sm text-muted">
                      Name
                    </label>
                    <input
                      id="demo-name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-muted/50 focus:border-secondary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="demo-email" className="mb-2 block text-sm text-muted">
                      Email
                    </label>
                    <input
                      id="demo-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-muted/50 focus:border-secondary/50"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted/70">
                    You&apos;ll get a confirmation email. We&apos;ll also notify our team to connect
                    with you.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
