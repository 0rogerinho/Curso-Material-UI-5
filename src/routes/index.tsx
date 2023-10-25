import { Routes, Route, Navigate } from 'react-router-dom';

import { UseDrawerContext } from '../shared/context';
import { useEffect } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import { Dashboard, ListCity } from '../pages';

const listItem = [
  {
    to: '/initial-page',
    label: 'Initial Page',
    icon: <HomeIcon />,
  },
  {
    to: '/city',
    label: 'City',
    icon: <LocationCityIcon />,
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
      <Route path="/city" element={<ListCity />} />
      {/*<Route
        path="/city/detail/id:"
        element={<Navigate to="/initial-page" />}
  />*/}
      <Route path="*" element={<Navigate to="/initial-page" />} />
    </Routes>
  );
};

export default AppRoutes;
