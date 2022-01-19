import React, { useContext, useState } from 'react';
import { Container, Form, Input, Button, StyledLink } from './style';
import Loading from '../../components/Loader';
import Logo from '../../components/Logo';
import Context from '../../contexts/Context';
import { handleSignInSubmit } from '../../services/services';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const { isLoading, setIsLoading, setUser } = useContext(Context);

  if (localStorage.getItem('user') !== null) {
    setUser(JSON.parse(localStorage.getItem('user')));
    navigate('/hoje');
  }

  function handleInputChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  return (
    <Container>
      <Logo />
      <Form onSubmit={(e) => handleSignInSubmit(e, 'auth/login', formValues, setIsLoading)
        .then((response) => {
          setUser(response);
          localStorage.setItem('user', JSON.stringify(response));
          navigate('/hoje');
        })}>
        <Input
          type='email'
          placeholder='email'
          name='email'
          value={formValues.email}
          onChange={handleInputChange}
        />
        <Input
          type='password'
          placeholder='senha'
          name='password'
          value={formValues.password}
          onChange={handleInputChange} />
        <Button isLoading={isLoading} type='submit'>{isLoading ? <Loading /> : 'Entrar'}</Button>
      </Form>
      <StyledLink to='/cadastro'>Não tem uma conta? Cadastre-se!</StyledLink>
      <ToastContainer />
    </Container>
  );
}
