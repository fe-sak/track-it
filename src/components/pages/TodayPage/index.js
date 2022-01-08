import axios from "axios";
import { useContext, useEffect } from "react";
import { Container, Span } from "./style";
import Context from "../../contexts/Context"
import { useState } from "react/cjs/react.development";

export default function TodayPage() {
  const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const [todaysHabits, setTodaysHabits] = useState([]);
  const currentDate = new Date()
  const { user } = useContext(Context);

  useEffect(() => {
    axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then((response) => {
        console.log(response);
        setTodaysHabits(response.data)

      })
  }, [user.token])

  return (
    <Container>
      <Span>
        {`${weekdays[currentDate.getDay()]}, ${currentDate.getDate()}/${(currentDate.getMonth() + 1).toLocaleString('pt-br', {
          minimumIntegerDigits: 2,
        })}`}
      </Span>
    </Container>
  )
}