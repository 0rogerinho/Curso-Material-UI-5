import { Routes, Route, Navigate } from 'react-router-dom';

import { UseDrawerContext } from '../shared/context';
import { useEffect } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import Dashboard from '../pages/dashboard/Dashboard';

const listItem = [
  {
    to: '/initial-page',
    label: 'Initial Page',
    icon: <HomeIcon />,
  },
];

const AppRoutes = () => {
  const { setDrawerOptions } = UseDrawerContext();

  useEffect(() => {
    setDrawerOptions(listItem);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/initial-page" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/initial-page" />} />
    </Routes>
  );
};

export default AppRoutes;
