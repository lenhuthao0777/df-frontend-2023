import React, { ReactNode } from 'react'

import Header from '@/components/header'
import { BookProvider } from '@/providers/book-provider'

type Props = {
  children: ReactNode
}

function layout({ children }: Props) {
  return (
    <BookProvider>
      <div className="h-full">
        <div className="hidden md:flex h-full w-[72px z-30 flex-col fixed inset-y-0">
          <Header />
        </div>
        <main className="mt-20 h-full container mx-auto">{children}</main>
      </div>
    </BookProvider>
  )
}

export default layout
