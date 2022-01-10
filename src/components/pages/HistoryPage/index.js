import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import Context from "../../contexts/Context";
import { useAxiosGet } from "../../services/services";
import { Checkbox, CheckboxContainer } from "../HabitsPage/style";
import { Container, TitleSpan, CalendarContainer } from "./style";

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

  const [userDatesComplete, userDatesIncomplete] = history.map((object) => object.habits.map((habit) => habit.done ? object.day : object.day))

  function tileClassName({ date }) {
    date = dayjs(date).format('DD/MM/YYYY');
    if (userDatesComplete.includes(date)) {
      return 'complete';
    }
    else if (userDatesIncomplete.includes(date)) return 'incomplete';
    else return ''
  }

  let showHabits = [];
  console.log(history);
  console.log(showHabits);
  if (history.length === 0) return '';
  else {
    return (
      <Container>
        <TitleSpan>Histórico</TitleSpan>
        <CalendarContainer>
          <Calendar
            calendarType="US"
            locale="pt-br"
            formatDay={(locale, date) => dayjs(date).format("DD")}
            value={calendar}
            onChange={setCalendar}
            tileClassName={tileClassName}
            onClickDay={(date) => {
              date = dayjs(date).format('DD/MM/YYYY');
              if (userDatesComplete.includes(date) || userDatesIncomplete.includes(date)) {
                console.log(date);
                console.log(history[0].day)
                showHabits = history.filter(object => object.day === date)
              }
            }}
          />
          <CheckboxContainer>
            <Checkbox>
              {showHabits}
            </Checkbox>
          </CheckboxContainer>
        </CalendarContainer>
      </Container>
    )
  }
}

