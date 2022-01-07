import { useContext, useState } from "react"
import { Container, Form, Input, Button, StyledLink } from '../page components/styledComponents';
import Loading from "../page components/Loader";
import Logo from "../page components/Logo";
import Context from "../contexts/Context";
import { handleSignInSubmit } from "../services/services";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const { isLoading, setIsLoading, setUser } = useContext(Context);

  function handleInputChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <Container>
      <Logo />
      <Form onSubmit={(e) => handleSignInSubmit(e, 'auth/login', formValues, setIsLoading)
        .then((response) => {
          setUser(response);
          console.log("A");
          console.log(response);
          navigate('/hoje');
        })}>
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
        <Button isLoading={isLoading} type="submit">{isLoading ? <Loading /> : 'Entrar'}</Button>
      </Form>
      <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se!</StyledLink>
      <ToastContainer />
    </Container>
  )
}
