import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/'

export function handleSignInSubmit(e, url, toSend, setIsLoading) {
  return new Promise((resolve, reject) => {

    e.preventDefault();
    setIsLoading(true);
    axios.post(`${BASE_URL}${url}`, toSend)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        resolve(response.data.token)
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.statusText === 'Unprocessable Entity' ? 'Email inválido' : error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
        toast.success(`Usuário criado com sucesso!
        Você será redirecionado para a página de login`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        resolve()
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message === 'Campo "body" inválido!' ? 'Email inválido' : error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reject();
      })
  })
}
const exportedObject = { handleSignInSubmit, handleSignUpSubmit }
export default exportedObject;