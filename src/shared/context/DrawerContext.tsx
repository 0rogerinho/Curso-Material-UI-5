import React from 'react';

interface IThemeContext {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}
interface IAppThemeProvider {
  children: React.ReactNode;
}

const drawerContext = React.createContext({} as IThemeContext);

export const UseDrawerContext = () => {
  return React.useContext(drawerContext);
};

export const DrawerProvider = ({ children }: IAppThemeProvider) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = React.useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);

  return (
    <drawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </drawerContext.Provider>
  );
};
