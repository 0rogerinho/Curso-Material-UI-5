import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button variant="contained" color="primary">
            Test
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};

export default AppRoutes;
