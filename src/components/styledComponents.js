import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  display:flex;
  flex-direction: column;
  width: 303px;
  gap: 6px;
`

const Input = styled.input`
  height: 45px;
  border: 1px solid #d5d5d5;
  padding-left: 11px;

  &::placeholder {
    font-size: 19.976px;
    color: #DBDBDB;
  }

`

const Button = styled.button`
  background-color: #52B6FF;
  color: white;
  font-size: 20.98px;
  border: none;
  border-radius: 4.63636px;
  height: 45px;
  opacity: ${props => props.isLoading ? 0.7 : 1};
  cursor: ${props => props.isLoading ? 'default' : 'pointer'};
  pointer-events: ${props => props.isLoading ? 'none' : 'auto'};
`
const StyledLink = styled(Link)`
  color: #52B6FF;
  margin-top: 25px;

`

export {
  Container,
  Form,
  Input,
  Button,
  StyledLink
}