import React from 'react';
//react-router-Dom
import { useNavigate, useParams } from 'react-router-dom';
//mui
import { Box, Paper, Grid, Typography, LinearProgress } from '@mui/material';
//form
import { VTextField, VForm, useVForm } from '../../shared/forms';
//api
import { peopleService } from '../../shared/services/api';
//layout
import BasePageLayout from '../../shared/layouts/BasePageLayout';
//components
import { DetailTools } from '../../shared/components';

interface IFormData {
  email: string;
  fullName: string;
  cityId: number;
}

export const DetailPeople = () => {
  const navigate = useNavigate();
  const { id = 'new' } = useParams<'id'>();

  const { formRef, isSaveAndClose, save, saveAndClose } = useVForm();

  const idNumber = Number(id);
  const [name, setName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);
      peopleService.getById(Number(id)).then((response) => {
        setIsLoading(false);
        if (response instanceof Error) {
          alert('deu tudo errado');
          navigate('/people');
        } else {
          setName(response.fullName);
          formRef.current?.setData(response);
        }
      });
    } else {
      formRef.current?.setData({ fullName: '', email: '', cityId: '' });
    }
  }, [id, navigate]);

  const handleSave = (data: IFormData) => {
    if (id === 'new') {
      setIsLoading(true);
      peopleService.create(data).then((response) => {
        setIsLoading(false);
        if (response instanceof Error) {
          alert(response.message);
        }
        if (isSaveAndClose()) {
          console.log(response);
          navigate('/people');
        } else {
          navigate(`/people/detail/${response}`);
        }
      });
    } else {
      peopleService.updateById(idNumber, data).then((response) => {
        setIsLoading(false);
        if (response instanceof Error) {
          alert(response.message);
        }
        if (isSaveAndClose()) navigate('/people');
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('realmente deseja apagar?')) {
      peopleService.deleteById(id).then((response) => {
        if (response instanceof Error) {
          alert(response.message);
        } else {
          alert('deletado com sucesso');
          navigate('/people');
        }
      });
    }
  };

  return (
    <BasePageLayout
      title={id === 'new' ? 'Create User' : name}
      toolbar={
        <DetailTools
          showButtonSave
          showButtonSaveAndReturn
          showButtonNew={id !== 'new'}
          showButtonDelete={id != 'new'}
          showButtonReturn
          //
          whenClickingSaveAndReturn={saveAndClose}
          whenClickingDelete={() => handleDelete(Number(id))}
          whenClickingSave={save}
          whenClickingNew={() => navigate('/people/detail/new')}
          whenClickingReturn={() => navigate('/people')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={1}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6" color="initial">
                All
              </Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  placeholder="full name"
                  name="fullName"
                  disabled={isLoading}
                  label="Full Name"
                  onChange={({ target }) => setName(target.value)}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" item spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  placeholder="e-mail"
                  name="email"
                  disabled={isLoading}
                  label="E-mail"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  placeholder="city"
                  name="cityId"
                  disabled={isLoading}
                  label="City"
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </BasePageLayout>
  );
};
