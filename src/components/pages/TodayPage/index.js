import axios from "axios";
import { useCallback, useContext, useEffect } from "react";
import { Container, DaySpan, Habit, HabitsContainer, ProgressSpan } from "./style";
import Context from "../../contexts/Context"
import { useState } from "react/cjs/react.development";
import countProgress from "./countProgress";

export default function TodayPage() {
  const { user } = useContext(Context);
  const [todaysHabits, setTodaysHabits] = useState([]);

  const getHabits = useCallback(() => {
    axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then((response) => setTodaysHabits(response.data))
  }, [user.token]);


  const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const currentDate = new Date();

  useEffect(() => {
    getHabits()
  }, [getHabits])

  if (todaysHabits === undefined) return '';
  else {
    const [done, total] = countProgress(todaysHabits);

    return (
      <Container>
        <DaySpan>
          {`${weekdays[currentDate.getDay()]}, 
          ${currentDate.getDate().toLocaleString('pt-br', { minimumIntegerDigits: 2 })}/
          ${(currentDate.getMonth() + 1).toLocaleString('pt-br', { minimumIntegerDigits: 2, })}`}
        </DaySpan>

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
                  axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`, {},
                    {
                      headers: {
                        'Authorization': `Bearer ${user.token}`
                      }
                    })
                    .then(() => getHabits())
                }
                else {
                  axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`, {},
                    {
                      headers: {
                        'Authorization': `Bearer ${user.token}`
                      }
                    })
                    .then(() => getHabits())
                }
              }}>
                <ion-icon name="checkmark-sharp"></ion-icon>
              </div>
            </Habit>
          )}
        </HabitsContainer>
      </Container>
    )
  }
}