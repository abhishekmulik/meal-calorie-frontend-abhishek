import { ReactNode } from 'react'

type FadeInAnimationProps = {
    children: ReactNode
}

function FadeInAnimation({children}: FadeInAnimationProps) {
  return (
    <div className="animate-fade-in">{children}</div>
  )
}

export default FadeInAnimation