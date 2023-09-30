import { Button } from 'components/ui/button';
import { createContext, useContext, useEffect, useState } from 'react';
import { Moon, SunMoon } from 'lucide-react';

const ThemeContext = createContext(null);

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const checkDarkMode = document.documentElement.classList.contains('dark');

  useEffect(() => {
    document.body.style.backgroundColor = checkDarkMode ? '#2A2C2C' : '#D3D3D3';
  }, [checkDarkMode]);

  const handleSetDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const ButtonMode = () => {
    return (
      <div className='flex items-center justify-center h-10 w-10 border border-zinc-900 dark:border-white rounded-full'>
        <Button onClick={() => handleSetDarkMode()}>
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
