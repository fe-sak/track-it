import axios from "axios";
import { useCallback } from "react";
import { toastError, toastSuccess } from "../page components/toasts";

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/'

export function handleSignInSubmit(e, url, toSend, setIsLoading) {
  return new Promise((resolve, reject) => {

    e.preventDefault();
    setIsLoading(true);
    axios.post(`${BASE_URL}${url}`, toSend)
      .then((response) => {
        setIsLoading(false);
        resolve(response.data)
      })
      .catch((error) => {
        toastError(error.response.statusText === 'Unprocessable Entity' ? 'Email inválido' : error.response.data.message)
        setIsLoading(false);
        reject();
      })
  })
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
        console.log(error.response)
        setIsLoading(false);
        toastError(error.response.data.message === 'Campo "body" inválido!' ? 'Email inválido' : error.response.data.message)
        reject();
      })
  })
}

export function useAxiosGet() {
  const axiosGet = useCallback((url, token, setHabits) => {
    axios.get(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setHabits(response.data);
      })
  }, [])

  return axiosGet
}

export function axiosPost(url, body, config) {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}${url}`, body, config)
      .then(() => resolve())
      .catch(() => reject())
  })
}

export function axiosDelete(url, config) {
  return new Promise((resolve, reject) => {
    axios.delete(`${BASE_URL}${url}`, config)
      .then(() => resolve())
      .catch(() => reject())
  })
}
