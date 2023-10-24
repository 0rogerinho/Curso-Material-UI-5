import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/context';
import { Sidebar } from './shared/components';

function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <Sidebar>
            <AppRoutes />
          </Sidebar>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

export default App;
