import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Container, Form, Input, Button, StyledLink } from './style';
import Loading from "../../page components/Loader";
import Logo from "../../page components/Logo";
import Context from "../../contexts/Context";
import { handleSignUpSubmit } from "../../services/services";

export default function SignUpPage() {
  const { isLoading, setIsLoading } = useContext(Context);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: '',
    name: '',
    image: '',
    password: ''
  });

  function handleInputChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

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