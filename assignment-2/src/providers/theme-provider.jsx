import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, useTheme };
