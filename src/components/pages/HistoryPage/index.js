import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import Context from "../../contexts/Context";
import { Container, StyledSpan, TitleSpan } from "./style";

export default function HistoryPage() {
  const { setUser } = useContext(Context);
  const [calendar, setCalendar] = useState(new Date())

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [setUser])
  return (
    <Container>
      <TitleSpan>Histórico</TitleSpan>
      <StyledSpan>Em breve você poderá ver o histórico dos seus hábitos aqui!</StyledSpan>
      <Calendar
        calendarType="US"
        locale="pt-br"
      />
    </Container>
  )
}