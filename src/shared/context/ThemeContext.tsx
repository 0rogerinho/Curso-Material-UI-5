import React from 'react';
// Theme
import { LightTheme, DarkTheme } from '../themes';
// MUI
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';

interface IThemeContext {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}
interface IAppThemeProvider {
  children: React.ReactNode;
}

const themeContext = React.createContext({} as IThemeContext);

export const UseAppThemeContext = () => {
  return React.useContext(themeContext);
};

export const AppThemeProvider = ({ children }: IAppThemeProvider) => {
  const [themeName, setThemeName] = React.useState<'light' | 'dark'>('dark');

  const toggleTheme = React.useCallback(() => {
    setThemeName(themeName === 'dark' ? 'light' : 'dark');
  }, [themeName]);

  const theme = React.useMemo(() => {
    if (themeName === 'dark') return LightTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <themeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </themeContext.Provider>
  );
};
