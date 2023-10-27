import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListPeople {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

export interface IDetailPeople {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

type TFullPeopleCount = {
  data: IListPeople[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = '',
): Promise<TFullPeopleCount | Error> => {
  try {
    const urlRelative = `/people?_page=${page}&_limit=${Environment.LINE_LIMIT}&fullName_like=${filter}`;

    const { data, headers } = await Api.get(urlRelative);

    if (data) {
      console.log(data);

      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT),
      };
    }

    return new Error('Error list register');
  } catch (error) {
    return new Error(
      (error as { message: string }).message || 'Error list register',
    );
  }
};

const getById = async (id: number): Promise<IDetailPeople | Error> => {
  try {
    const { data } = await Api.get(`/people/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao consultar o registro.',
    );
  }
};

const create = async (
  sendData: Omit<IDetailPeople, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailPeople>('/people', sendData);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro.',
    );
  }
};

const updateById = async (
  id: number,
  data: Omit<IDetailPeople, 'id'>,
): Promise<void | Error> => {
  try {
    await Api.put(`/people/${id}`, data);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro.',
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/people/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro.',
    );
  }
};

export const peopleService = {
  getAll,

  create,
  getById,
  updateById,
  deleteById,
};
