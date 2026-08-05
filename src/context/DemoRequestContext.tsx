import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type DemoRequestContextValue = {
  openDemoRequest: () => void
  closeDemoRequest: () => void
  isOpen: boolean
}

const DemoRequestContext = createContext<DemoRequestContextValue | null>(null)

export function DemoRequestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const value = useMemo(
    () => ({
      isOpen,
      openDemoRequest: () => setIsOpen(true),
      closeDemoRequest: () => setIsOpen(false),
    }),
    [isOpen],
  )

  return <DemoRequestContext.Provider value={value}>{children}</DemoRequestContext.Provider>
}

export function useDemoRequest() {
  const ctx = useContext(DemoRequestContext)
  if (!ctx) {
    throw new Error('useDemoRequest must be used within DemoRequestProvider')
  }
  return ctx
}
