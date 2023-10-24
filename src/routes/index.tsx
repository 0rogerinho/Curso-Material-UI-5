import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { UseDrawerContext } from '../shared/context';
const AppRoutes = () => {
  const { toggleDrawer } = UseDrawerContext();

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button variant="contained" color="primary" onClick={toggleDrawer}>
            toggle drawer
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};

export default AppRoutes;
