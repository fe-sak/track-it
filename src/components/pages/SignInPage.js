import { useContext, useState } from "react"
import { Container, Form, Input, Button, StyledLink } from '../page components/styledComponents';
import axios from "axios";
import Loading from "../page components/Loader";
import Logo from "../page components/Logo";
import Context from "../contexts/Context";

export default function SignInPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const { isLoading, setIsLoading } = useContext(Context);

  function handleInputChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', formValues)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      })
  }
  return (
    <Container>
      <Logo />
      <Form onSubmit={handleSubmit}>
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
    </Container>
  )
}