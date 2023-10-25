import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IListPeople {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

interface IDetailPeople {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
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
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LINE_LIMIT}&nomeCompleto_like=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros.',
    );
  }
};

const getById = async (id: number): Promise<IDetailPeople | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);

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
  dados: Omit<IDetailPeople, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailPeople>('/pessoas', dados);

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
  dados: IDetailPeople,
): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro.',
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro.',
    );
  }
};

export const PessoasService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
