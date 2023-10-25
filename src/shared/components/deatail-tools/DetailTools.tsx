import {
  Box,
  Paper,
  useTheme,
  Button,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IDetailTools {
  showButtonNew?: boolean;
  showButtonSave?: boolean;
  showButtonReturn?: boolean;
  showButtonDelete?: boolean;
  showButtonSaveAndReturn?: boolean;

  loadButtonNew?: boolean;
  loadButtonSave?: boolean;
  loadButtonReturn?: boolean;
  loadButtonDelete?: boolean;
  loadButtonSaveAndReturn?: boolean;

  whenClickingNew?: () => void;
  whenClickingSave?: () => void;
  whenClickingReturn?: () => void;
  whenClickingDelete?: () => void;
  whenClickingSaveAndReturn?: () => void;
}

export const DetailTools = ({
  showButtonDelete,
  showButtonNew,
  showButtonReturn,
  showButtonSave,
  showButtonSaveAndReturn,

  whenClickingDelete,
  whenClickingNew,
  whenClickingReturn,
  whenClickingSave,
  whenClickingSaveAndReturn,

  loadButtonDelete = false,
  loadButtonNew = false,
  loadButtonReturn = false,
  loadButtonSave = false,
  loadButtonSaveAndReturn = false,
}: IDetailTools) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      display="flex"
      alignItems="center"
      marginX={1}
      padding={1}
      paddingX={2}
      height={theme.spacing(5)}
      component={Paper}
    >
      {showButtonSave && !loadButtonSave && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={whenClickingSave}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            Save
          </Typography>
        </Button>
      )}

      {loadButtonSave && <Skeleton width={91} height={60} />}

      {showButtonSaveAndReturn && !loadButtonSaveAndReturn && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={whenClickingSaveAndReturn}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            Save and return
          </Typography>
        </Button>
      )}

      {loadButtonReturn && <Skeleton width={180} height={60} />}

      {showButtonDelete && !loadButtonDelete && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<DeleteIcon />}
          onClick={whenClickingDelete}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            Delete
          </Typography>
        </Button>
      )}

      {loadButtonDelete && <Skeleton width={91} height={60} />}

      {showButtonNew && !loadButtonNew && (
        <Button
          variant="outlined"
          color="primary"
          endIcon={<AddIcon />}
          onClick={whenClickingNew}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            New
          </Typography>
        </Button>
      )}

      {loadButtonNew && <Skeleton width={91} height={60} />}

      {showButtonNew &&
        (showButtonDelete ||
          showButtonReturn ||
          showButtonSave ||
          showButtonSaveAndReturn) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {showButtonReturn && !loadButtonReturn && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={whenClickingReturn}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            Return
          </Typography>
        </Button>
      )}

      {loadButtonReturn && <Skeleton width={91} height={60} />}
    </Box>
  );
};
