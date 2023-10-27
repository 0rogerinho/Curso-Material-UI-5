import { Routes, Route, Navigate } from 'react-router-dom';

import { UseDrawerContext } from '../shared/context';
import { useEffect } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import { Dashboard, DetailPeople, ListPeople } from '../pages';

const listItem = [
  {
    to: '/initial-page',
    label: 'Initial Page',
    icon: <HomeIcon />,
  },
  {
    to: '/people',
    label: 'People',
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
      <Route path="/people" element={<ListPeople />} />

      <Route path="/people/detail/:id" element={<DetailPeople />} />
      <Route path="*" element={<Navigate to="/initial-page" />} />
    </Routes>
  );
};

export default AppRoutes;
