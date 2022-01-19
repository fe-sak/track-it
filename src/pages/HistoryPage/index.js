import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Context from '../../contexts/Context';
import { useAxiosGet } from '../../services/services';
import historyParser from './historyParser';
import { Container, TitleSpan, CalendarContainer, Habits, Habit } from './style';

export default function HistoryPage() {
  const { user, setUser } = useContext(Context);
  const [calendar, setCalendar] = useState(new Date());
  const [history, setHistory] = useState([]);
  const [clickedDay, setClickedDay] = useState([]);

  const axiosGet = useAxiosGet();
  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [setUser]);

  useEffect(() => {
    if (user !== '') {
      axiosGet('habits/history/daily', user.token, setHistory);
    }
  }, [axiosGet, user, setHistory]);

  const [completeDays, incompleteDays] = historyParser(history);

  function tileClassName({ date }) {
    date = dayjs(date).format('DD/MM/YYYY');
    if (completeDays.map(e => e.day).includes(date)) {
      return 'complete';
    }
    else if (incompleteDays.map(e => e.day).includes(date)) return 'incomplete';
    else return '';
  }

  if (history.length === 0) return '';
  else {
    return (
      <Container>
        <TitleSpan>Histórico</TitleSpan>
        <CalendarContainer>
          <Calendar
            calendarType='US'
            locale='pt-br'
            formatDay={(locale, date) => dayjs(date).format('DD')}
            value={calendar}
            onChange={setCalendar}
            tileClassName={tileClassName}
            onClickDay={(date) => {
              date = dayjs(date).format('DD/MM/YYYY');
              if (completeDays.map(e => e.day).includes(date) || incompleteDays.map(e => e.day).includes(date)) {
                setClickedDay(history.filter((e) => e.day === date));
              }
              else setClickedDay([]);
            }}
          />
          <TitleSpan>
            {clickedDay.length !== 0 && `Hábitos do dia ${clickedDay[0].day}`}
          </TitleSpan>
          { }
          {clickedDay.length !== 0 && <Habits>
            {clickedDay[0].habits.map((habit) =>
              <Habit key={habit.id} isDone={habit.done}>
                <span>{habit.name}</span>
              </Habit>)}
          </Habits>}
        </CalendarContainer>
      </Container>
    );
  }
}

