'use client'

import { ReactNode, createContext, useContext } from 'react'
import Cookies from 'js-cookie'

interface Auth {
  userInfo: {
    email: string
    token: string
  }
}
const authContext = createContext<Auth | {}>({
  userInfo: {
    email: '',
    token: '',
  },
})

const initial: Auth = {
  userInfo: {
    email: '',
    token: Cookies.get('userInfo') || '',
  },
}

export const useAuth = () => useContext(authContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <authContext.Provider
      value={{
        userInfo: {
          email: initial.userInfo.email,
        },
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export { AuthProvider }
