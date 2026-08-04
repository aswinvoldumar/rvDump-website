import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  id?: string
}

export function Container({ children, className = '', id }: ContainerProps) {
  return (
    <div id={id} className={`mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
