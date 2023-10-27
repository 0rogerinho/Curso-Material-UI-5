import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { UseDrawerContext } from '../context';

interface IBasePageLayoutProps {
  title?: string;
  children?: React.JSX.Element;
  toolbar?: React.JSX.Element;
}

const BasePageLayout = ({ children, title, toolbar }: IBasePageLayoutProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { toggleDrawer } = UseDrawerContext();

  return (
    <Box height="100vh" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(12)}
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        >
          {title}
        </Typography>
      </Box>

      {toolbar && <Box>{toolbar}</Box>}

      <Box flex={1}>{children}</Box>
    </Box>
  );
};

export default BasePageLayout;
