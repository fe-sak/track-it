import { useContext, useState } from "react"
import { Container, Form, Input, Button, StyledLink } from '../page components/styledComponents';
import Loading from "../page components/Loader";
import Logo from "../page components/Logo";
import Context from "../contexts/Context";
import { handleSignInSubmit } from "../services/services";

export default function SignInPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const { isLoading, setIsLoading } = useContext(Context);

  function handleInputChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }


  return (
    <Container>
      <Logo />
      <Form onSubmit={(e) => handleSignInSubmit(e, 'auth/login', formValues, setIsLoading)}>
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
