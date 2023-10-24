import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/context';
import SideMenu from './shared/components/side-menu/SideMenu';

function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <SideMenu>
            <AppRoutes />
          </SideMenu>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

export default App;
