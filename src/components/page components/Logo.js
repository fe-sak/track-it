import styled from 'styled-components'
import logoPath from '../../assets/logo.svg'

export default function Logo() {
  return <Img src={logoPath} alt="site logo" />
}

const Img = styled.img`
  margin: 68px 0px 33px 0px;
`