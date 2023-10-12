'use client'

import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Avatar, AvatarFallback } from './ui/avatar'

const Header = () => {
  return (
    <div className="shadow fixed w-full h-20 dark:bg-[#1e1f22] bg-[#e3e5e8]">
      <div className="container mx-auto flex items-center h-full justify-between">
        <h2 className="text-2xl dark:text-white font-extrabold">Book store</h2>
        <div className="flex items-center">
          <ModeToggle />
          <Avatar className="w-10 h-10 ml-3">
            <AvatarFallback>JH</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default Header
