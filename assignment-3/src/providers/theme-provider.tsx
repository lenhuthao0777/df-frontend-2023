import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Moon, SunMoon } from 'lucide-react'

import { Button } from '../components/ui/button'

interface ThemeValueType {
  isDarkMode: boolean
  ButtonMode: FC
}

const ThemeContext = createContext<ThemeValueType>({
  isDarkMode: false,
  ButtonMode: () => <div />,
})

const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark')
    document.body.style.backgroundColor = isDarkMode ? '#2A2C2C' : '#D3D3D3'
  }, [isDarkMode])

  const ButtonMode = useCallback(() => {
    return (
      <div className="flex items-center justify-center h-10 w-10 border border-zinc-900 dark:border-white rounded-full">
        <Button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? (
            <Moon className="w-5 h-5" />
          ) : (
            <SunMoon className="w-5 h-5" />
          )}
        </Button>
      </div>
    )
  }, [setIsDarkMode, isDarkMode])

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({ isDarkMode, ButtonMode }),
        [isDarkMode, ButtonMode],
      )}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, useTheme }
