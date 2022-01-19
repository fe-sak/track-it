import React, { useContext, useEffect } from 'react';
import { Container, TitleSpan, Habit, HabitsContainer, ProgressSpan } from './style';
import Context from '../../contexts/Context';
import countProgress from './countProgress';
import { axiosPost, useAxiosGet } from '../../services/services';
import { weekdays } from '../../utils/weekdays';

export default function TodayPage() {
  const { user, setUser, todaysHabits, setTodaysHabits } = useContext(Context);
  const getTodaysHabits = useAxiosGet();

  const currentDate = new Date();

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [setUser]);

  const requestConfig = {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  };

  useEffect(() => {
    if (user !== '') {
      getTodaysHabits('habits/today', user.token, setTodaysHabits);
    }
  }, [getTodaysHabits, user, user.token, setTodaysHabits]);

  if (todaysHabits === undefined) return '';
  else {
    const [done, total] = countProgress(todaysHabits);

    return (
      <Container>
        <TitleSpan>
          {`${weekdays[currentDate.getDay()]}, 
          ${currentDate.getDate().toLocaleString('pt-br', { minimumIntegerDigits: 2 })}/
          ${(currentDate.getMonth() + 1).toLocaleString('pt-br', { minimumIntegerDigits: 2, })}`}
        </TitleSpan>

        <ProgressSpan isDone={done !== 0}>
          {done === 0 ? 'Nenhum hábito concluído ainda' : `${Math.round(((done / total) * 100))}% dos hábitos concluídos`}
        </ProgressSpan>

        <HabitsContainer>
          {todaysHabits.map((habit) =>
            <Habit
              key={habit.id}
              isDone={habit.done}
              isHighestSequence={habit.highestSequence === habit.currentSequence && habit.highestSequence !== 0}
            >
              <div>
                <span>{habit.name}</span>
                <span>Sequência atual: {habit.currentSequence} dias</span>
                <span>Seu recorde: {habit.highestSequence} dias</span>
              </div>
              <div onClick={() => {
                if (habit.done) {
                  axiosPost(`habits/${habit.id}/uncheck`, {}, requestConfig)
                    .then(() => getTodaysHabits('habits/today', user.token, setTodaysHabits));
                }
                else {
                  axiosPost(`habits/${habit.id}/check`, {}, requestConfig)
                    .then(() => getTodaysHabits('habits/today', user.token, setTodaysHabits));
                }
              }}>
                <ion-icon name='checkmark-sharp'></ion-icon>
              </div>
            </Habit>
          )}
        </HabitsContainer>
      </Container>
    );
  }
}