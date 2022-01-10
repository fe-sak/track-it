import { useContext, useEffect } from "react";
import Context from "../../contexts/Context";
import { Container, StyledSpan, TitleSpan } from "./style";

export default function HistoryPage() {

  const { setUser } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [setUser])
  return (
    <Container>
      <TitleSpan>Histórico</TitleSpan>
      <StyledSpan>Em breve você poderá ver o histórico dos seus hábitos aqui!</StyledSpan>
    </Container>
  )
}