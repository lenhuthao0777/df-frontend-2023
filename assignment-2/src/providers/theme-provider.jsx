import { Button } from 'components/ui/button';
import { createContext, useContext, useEffect, useState } from 'react';
import { Moon, SunMoon } from 'lucide-react';

const ThemeContext = createContext(null);

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark');
  }, [isDarkMode]);

  const ButtonMode = () => {
    return (
      <div className='flex items-center justify-center h-10 w-10 border border-zinc-900 dark:border-white rounded-full'>
        <Button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? (
            <Moon className='w-5 h-5' />
          ) : (
            <SunMoon className='w-5 h-5' />
          )}
        </Button>
      </div>
    );
  };

  return (
    <ThemeContext.Provider value={{ setIsDarkMode, ButtonMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
