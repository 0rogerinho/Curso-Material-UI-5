import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import AppThemeProvider from './shared/context/ThemeContext';
import SideMenu from './shared/components/side-menu/SideMenu';

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <SideMenu>
          <AppRoutes />
        </SideMenu>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
