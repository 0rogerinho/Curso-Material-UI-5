import React from 'react';
// Theme
import { LightTheme, DarkTheme } from './../themes';
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAppThemeContext = () => {
  return React.useContext(themeContext);
};

const AppThemeProvider = ({ children }: IAppThemeProvider) => {
  const [themeName, setThemeName] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = React.useCallback(() => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
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

export default AppThemeProvider;
