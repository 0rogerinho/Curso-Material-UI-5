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
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { UseDrawerContext } from '../../context';

interface ISideMenu {
  children: React.ReactNode;
}

const SideMenu = ({ children }: ISideMenu) => {
  const theme = useTheme();
  const smDow = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawer } = UseDrawerContext();
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
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText primary="Initial page" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDow ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};

export default SideMenu;
