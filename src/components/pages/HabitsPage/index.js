import axios from "axios";
import { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react/cjs/react.development";
import Context from '../../contexts/Context'
import Loading from "../../page components/Loader";
import { Button, ButtonContainer, CancelButton, Checkbox, CheckboxContainer, Container, Habit, Habits, NoHabitsSpan, StyledForm, SubmitButton, TitleContainer, TitleSpan } from "./style";
import { weekdaysDefault } from "./weekdays";

export default function HabitsPage() {
  const { user, isLoading, setIsLoading } = useContext(Context);
  const deepCopyWeekdaysDefault = JSON.parse(JSON.stringify(weekdaysDefault));

  const [input, setInput] = useState('');
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [weekdays, setWeekdays] = useState(deepCopyWeekdaysDefault)

  console.log(habits);

  const noHabitsSpanString = 'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!';

  useEffect(() => {
    axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then((response) => {
        setHabits(response.data);
      })
  }, [user.token])


  return (
    <Container>
      <TitleContainer>
        <TitleSpan>Meus hábitos</TitleSpan>
        <Button onClick={() => {
          if (showForm === false) setShowForm(true);
          else setShowForm(false);
        }}>
          <ion-icon name="add-outline"></ion-icon>
        </Button>
      </TitleContainer>
      {showForm &&
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();

            const days = weekdays.filter((weekday) => weekday.isSelected === true).map((filteredWeekday) => filteredWeekday.index);
            if (days.length === 0) {
              toast.error('Escolha pelo menos um dia da semana!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }

            else {
              setIsLoading(true);
              axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
                {
                  name: input,
                  days
                },
                {
                  headers: {
                    'Authorization': `Bearer ${user.token}`
                  }
                })
                .then(() => {
                  setTimeout(() => {
                    setIsLoading(false);
                    setInput('');
                    setWeekdays(deepCopyWeekdaysDefault);
                    setShowForm(false);
                    axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', {
                      headers: {
                        Authorization: `Bearer ${user.token}`
                      }
                    })
                      .then((response) => {
                        setHabits(response.data);
                      })

                  }, 500);
                })
                .catch((error) => {
                  toast.error(error.response.data.message === 'Campo "body" inválido!' ? 'Nome do hábito não pode ser vazio!' : error.response.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setIsLoading(false);
                })
            }
          }}>

          <input type="text"
            placeholder="nome do hábito"
            value={input}
            disabled={isLoading}
            onChange={(e) => setInput(e.target.value)} />

          <CheckboxContainer>

            {weekdays.map((weekday, index) =>
              <Checkbox
                isSelected={weekday.isSelected}
                key={index}
                isLoading={isLoading}
                onClick={() => {
                  if (weekday.isSelected === false) setWeekdays([...weekdays], weekday.isSelected = true);
                  else setWeekdays([...weekdays], weekday.isSelected = false);
                }}>
                <span>{weekday.day}</span>
              </Checkbox>)}

          </CheckboxContainer>

          <ButtonContainer>
            <CancelButton>Cancelar</CancelButton>
            <SubmitButton
              type='submit'
              isLoading={isLoading}>{isLoading ? <Loading /> : 'Salvar'}</SubmitButton>

          </ButtonContainer>
        </StyledForm>}
      {habits.length === 0 ? <NoHabitsSpan>{noHabitsSpanString}</NoHabitsSpan> :
        <Habits>
          {habits.map((habit) =>
            <Habit key={habit.id}>
              <span>{habit.name}</span>
              <CheckboxContainer>
                {weekdaysDefault.map((weekday) =>
                  <Checkbox
                    key={weekday.index}
                    isSelected={habit.days.includes(weekday.index)}>
                    <span>{weekday.day}</span>
                    <ion-icon name="trash-outline"></ion-icon>
                  </Checkbox>
                )}
              </CheckboxContainer>
            </Habit>
          )}
        </Habits>}
      <ToastContainer />
    </Container>
  )

}