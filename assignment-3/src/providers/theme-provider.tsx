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

  const checkDarkMode = document.documentElement.classList.contains('dark')

  useEffect(() => {
    document.body.style.backgroundColor = checkDarkMode ? '#2A2C2C' : '#D3D3D3'
  }, [checkDarkMode])

  const handleSetDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setIsDarkMode(!isDarkMode)
  }

  const ButtonMode = useCallback(() => {
    return (
      <div className="flex items-center justify-center h-10 w-10 border border-zinc-900 dark:border-white rounded-full">
        <Button onClick={handleSetDarkMode}>
          {isDarkMode ? (
            <Moon className="w-5 h-5" />
          ) : (
            <SunMoon className="w-5 h-5" />
          )}
        </Button>
      </div>
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode])

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
