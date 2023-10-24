import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import React from 'react';
import { UseAppThemeContext, UseDrawerContext } from '../../context';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface ISideMenu {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  label: string;
  icon: React.JSX.Element;
  onClick: (() => void) | undefined;
}

const ListItemLink = ({ to, label, icon, onClick }: IListItemLinkProps) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  function handleClick() {
    navigate(to);
    onClick?.();
  }
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const Sidebar = ({ children }: ISideMenu) => {
  const theme = useTheme();
  const smDow = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawer, drawerOptions } = UseDrawerContext();

  const { toggleTheme } = UseAppThemeContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDow ? 'temporary' : 'permanent'}
        onClose={toggleDrawer}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
              src="/devRogerinho.jpg"
            />
          </Box>
          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(({ to, label, icon }) => {
                return (
                  <ListItemLink
                    key={to}
                    to={to}
                    label={label}
                    icon={icon}
                    onClick={smDow ? toggleDrawer : undefined}
                  />
                );
              })}
            </List>
          </Box>
          <Box>
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>
              <ListItemText primary="Change Theme" />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDow ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
