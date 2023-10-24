import { Box, Button, Paper, TextField, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface IToolbarProps {
  textSearch?: string;
  showInputSearch?: boolean;
  changeSearchText?: (newText: string) => void;
  textNewButton?: string;
  showNewButton?: boolean;
  whenClickingNewButton?: () => void;
}

export const ListingTools = ({
  textSearch = '',
  showInputSearch = false,
  changeSearchText,
  textNewButton = 'New',
  showNewButton = true,
  whenClickingNewButton,
}: IToolbarProps) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      marginX={1}
      padding={1}
      paddingX={2}
      height={theme.spacing(5)}
      component={Paper}
    >
      {showInputSearch && (
        <TextField
          size="small"
          placeholder="Pesquisar..."
          value={textSearch}
          onChange={({ target }) => changeSearchText?.(target.value)}
        />
      )}

      {showNewButton && (
        <Box flex={1} display="flex" justifyContent="end">
          <Button
            color="primary"
            variant="contained"
            endIcon={<AddIcon />}
            disableElevation
            onClick={whenClickingNewButton}
          >
            {textNewButton}
          </Button>
        </Box>
      )}
    </Box>
  );
};
