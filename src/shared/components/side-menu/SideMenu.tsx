import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';

import React from 'react';

interface ISideMenu {
  children: React.ReactNode;
}

const SideMenu = ({ children }: ISideMenu) => {
  const theme = useTheme();
  return (
    <>
      <Drawer variant="permanent">
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
                <Icon baseClassName="material-icons-two-tone">add_circle</Icon>
                <ListItemText primary="Initial page" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};

export default SideMenu;
