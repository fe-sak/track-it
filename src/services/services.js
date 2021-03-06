import axios from 'axios';
import { useCallback } from 'react';
import { toastError, toastSuccess } from '../components/toasts';

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/';

function createConfig(token) {
  return { headers: {Authorization: `Bearer ${token}` } };
}

export function getTodaysHabits(token) {
  const config = createConfig(token);

  return axios.get(`${BASE_URL}habits/today`, config);
}

export function handleSignInSubmit(e, url, toSend, setIsLoading) {
  return new Promise((resolve, reject) => {

    e.preventDefault();
    setIsLoading(true);
    axios.post(`${BASE_URL}${url}`, toSend)
      .then((response) => {
        setIsLoading(false);
        resolve(response.data);
      })
      .catch((error) => {
        toastError(error.response.statusText === 'Unprocessable Entity' ? 'Email inválido' : error.response.data.message);
        setIsLoading(false);
        reject();
      });
  });
}

export function handleSignUpSubmit(e, url, toSend, setIsLoading) {
  return new Promise((resolve, reject) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${BASE_URL}${url}`, toSend)
      .then(() => {
        setIsLoading(false);
        toastSuccess(`Usuário criado com sucesso!
        Você será redirecionado para a página de login`);
        resolve();
      })
      .catch((error) => {
        setIsLoading(false);
        toastError(error.response.data.message === 'Campo \'body\' inválido!' ? 'Email inválido' : error.response.data.message);
        reject();
      });
  });
}

export function useAxiosGet() {
  const axiosGet = useCallback((url, token, setState) => {
    axios.get(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setState(response.data);
      });
  }, []);

  return axiosGet;
}

export function axiosPost(url, body, config) {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}${url}`, body, config)
      .then(() => resolve())
      .catch(() => reject());
  });
}

export function axiosDelete(url, config) {
  return new Promise((resolve, reject) => {
    axios.delete(`${BASE_URL}${url}`, config)
      .then(() => resolve())
      .catch(() => reject());
  });
}
