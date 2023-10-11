import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function layout({ children }: Props) {
  return (
    <div className="h-full">
      <main className="flex items-center justify-center mt-40">{children}</main>
    </div>
  )
}

export default layout
