import React from 'react';
//environment
import { Environment } from '../../shared/environment';
//api
import { IListPeople, peopleService } from '../../shared/services/api';
//react-router-dom
import { useNavigate, useSearchParams } from 'react-router-dom';
//layouts
import BasePageLayout from '../../shared/layouts/BasePageLayout';
//hooks
import { useDebounce } from '../../shared/hooks';
//mui
import {
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//components
import { ListingTools } from '../../shared/components';

export const ListPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [rows, setRows] = React.useState<IListPeople[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalcount, setTotalCounts] = React.useState(0);

  const navigate = useNavigate();

  const search = React.useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const page = React.useMemo(() => {
    return Number(searchParams.get('page') ?? '1');
  }, [searchParams]);

  const { debounce } = useDebounce();

  React.useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      peopleService.getAll(page, search).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result.data);
          setTotalCounts(result.totalCount);
        }
      });
    });
  }, [search, page, debounce]);

  const handleDelete = (id: number) => {
    if (confirm('realmente deseja apagar?')) {
      peopleService.deleteById(id).then((response) => {
        if (response instanceof Error) {
          alert(response.message);
        } else {
          alert('deletado com sucesso');
          setRows([...rows.filter((row) => row.id != id)]);
        }
      });
    }
  };

  return (
    <BasePageLayout
      title="List People  "
      toolbar={
        <ListingTools
          showInputSearch
          textNewButton="New"
          textSearch={search}
          whenClickingNewButton={() => navigate('/people/detail/new')}
          changeSearchText={(text) =>
            setSearchParams({ search: text, page: '1' }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>full name</TableCell>
              <TableCell>e-mail</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(({ id, email, fullName }) => {
              return (
                <TableRow key={id}>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/people/detail/${id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell>{fullName}</TableCell>
                  <TableCell>{email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {totalcount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LIST}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalcount > Environment.LINE_LIMIT && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalcount / Environment.LINE_LIMIT)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { search, page: newPage.toString() },
                        { replace: true },
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BasePageLayout>
  );
};
