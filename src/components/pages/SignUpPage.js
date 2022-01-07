import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Container, Form, Input, Button, StyledLink } from '../page components/styledComponents';
import Loading from "../page components/Loader";
import Logo from "../page components/Logo";
import Context from "../contexts/Context";
import { handleSignUpSubmit } from "../services/services";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    name: '',
    image: '',
    password: ''
  });
  const { isLoading, setIsLoading } = useContext(Context);

  function handleInputChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', formValues)
  //     .then((response) => {
  //       console.log(response);
  //       setIsLoading(false);
  //       toast.success(`Usuário criado com sucesso!
  //       Você será redirecionado para a página de login`, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       setTimeout(() => navigate('/'), 6000);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //       setIsLoading(false);
  //       toast.error(error.response.data.message === 'Campo "body" inválido!' ? 'Email inválido' : error.response.data.message, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     })
  // }

  console.log(isLoading);

  return (
    <Container>
      <Logo />
      <Form onSubmit={(e) => {
        handleSignUpSubmit(e, 'auth/sign-up', formValues, setIsLoading)
          .then(() => setTimeout(() => navigate('/'), 5500))
      }
      }>
        <Input
          type="email"
          placeholder="email"
          name='email'
          value={formValues.email}
          onChange={handleInputChange} />
        <Input
          type="password"
          placeholder="senha"
          name='password'
          value={formValues.password}
          onChange={handleInputChange} />
        <Input
          type="text"
          placeholder="nome"
          name='name'
          value={formValues.name}
          onChange={handleInputChange} />
        <Input
          type="url"
          placeholder="foto"
          name='image'
          value={formValues.image}
          onChange={handleInputChange} />

        <Button isLoading={isLoading} type="submit">
          {isLoading ? <Loading /> : 'Cadastrar'}
        </Button>
      </Form>
      <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
      <ToastContainer />
    </Container>
  )
}