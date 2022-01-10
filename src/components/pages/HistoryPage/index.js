import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import Context from "../../contexts/Context";
import { useAxiosGet } from "../../services/services";
import { Container, StyledSpan, TitleSpan } from "./style";
import styled from "styled-components";

export default function HistoryPage() {
  const { user, setUser } = useContext(Context);
  const [calendar, setCalendar] = useState(new Date())
  const [history, setHistory] = useState([]);



  const axiosGet = useAxiosGet();
  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [setUser])

  useEffect(() => {
    if (user !== '') {
      axiosGet(`habits/history/daily`, user.token, setHistory);
    }
  }, [axiosGet, user, setHistory])
  console.log(history);

  const [userDatesComplete, userDatesIncomplete] = history.map((object) => object.habits.map((habit) => habit.done ? object.day : object.day))

  console.log(userDatesComplete);

  function tileClassName({ date }) {
    if (userDatesComplete.includes(dayjs(date).format('DD/MM/YYYY'))) {
      return 'highlightGreen';
    }
    else if (userDatesIncomplete.includes(dayjs(date).format('DD/MM/YYYY'))) return 'highlightRed';
    else return ''
  }



  if (history.length === 0) return '';
  else {
    return (
      <Container>
        <TitleSpan>Histórico</TitleSpan>
        <CalendarContainer>
          <Calendar
            value={calendar}
            onChange={setCalendar}
            calendarType="US"
            locale="pt-br"
            tileClassName={tileClassName}
            formatDay={(locale, date) => dayjs(date).format("DD")}
          />
        </CalendarContainer>
      </Container>
    )
  }
}

const CalendarContainer = styled.div`
  .react-calendar{
    width: 100%;
  }
  

  .highlightGreen {
    position: relative;
    background-color: transparent;
    z-index: 10;

    abbr{
      padding: 7px;
      border-radius: 100%;
      background-color: #8CC654;
      color: black;
    }
  }
    .highlightRed {
    position: relative;
    background-color: transparent;
    z-index: 10;

    abbr{
      padding: 7px;
      border-radius: 100%;
      background-color: #EA5766;
      color: black;
    }
  }
`