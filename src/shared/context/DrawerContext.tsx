import React from 'react';

interface IDrawerOptions {
  to: string;
  label: string;
  icon: React.JSX.Element;
}

interface IThemeContext {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  drawerOptions: IDrawerOptions[];
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
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
  const [drawerOptions, setDrawerOptions] = React.useState<IDrawerOptions[]>(
    [],
  );

  const toggleDrawer = React.useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);

  const handleSetDrawerOptions = React.useCallback(
    (newDrawerOptions: IDrawerOptions[]) => {
      setDrawerOptions(newDrawerOptions);
    },
    [],
  );

  return (
    <drawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawer,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </drawerContext.Provider>
  );
};
