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
      <Button onClick={() => setIsDarkMode(!isDarkMode)} className='mr-2'>
        {isDarkMode ? (
          <Moon className='w-5 h-5' />
        ) : (
          <SunMoon className='w-5 h-5' />
        )}
      </Button>
    );
  };

  console.log(isDarkMode);

  return (
    <ThemeContext.Provider value={{ setIsDarkMode, ButtonMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
