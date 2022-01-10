import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useState } from "react/cjs/react.development";
import Context from '../../contexts/Context'
import Loading from "../../page components/Loader";
import { Button, ButtonContainer, CancelButton, Checkbox, CheckboxContainer, Container, Habit, Habits, NoHabitsSpan, StyledForm, SubmitButton, TitleContainer, TitleSpan } from "./style";
import { toastError } from "../../page components/toasts";
import { weekdaysDefault } from "./weekdays";
import { axiosDelete, axiosPost, useAxiosGet } from "../../services/services";

export default function HabitsPage() {
  const deepCopyWeekdaysDefault = JSON.parse(JSON.stringify(weekdaysDefault));

  const { user, isLoading, setIsLoading } = useContext(Context);
  const [input, setInput] = useState('');
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [weekdays, setWeekdays] = useState(deepCopyWeekdaysDefault)

  const getHabits = useAxiosGet();

  const noHabitsSpanString = 'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!';


  const requestConfig = {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  }

  useEffect(() => {
    getHabits('habits', user.token, setHabits);
  }, [user.token, getHabits])

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
            const requestBody = {
              name: input,
              days
            }

            if (days.length === 0) {
              toastError('Escolha pelo menos um dia da semana!');
            }
            else {
              setIsLoading(true);
              axiosPost('habits', requestBody, requestConfig)
                .then(() => {
                  setTimeout(() => {
                    setIsLoading(false);
                    setInput('');
                    setWeekdays(deepCopyWeekdaysDefault);
                    setShowForm(false);
                    getHabits('habits', user.token, setHabits);
                  }, 500);
                })
                .catch((error) => {
                  toastError(error.response.data.message === 'Campo "body" inválido!' ?
                    'Nome do hábito não pode ser vazio!' :
                    error.response.data.message)
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
            <CancelButton onClick={() => setShowForm(false)}>
              Cancelar
            </CancelButton>

            <SubmitButton
              type='submit'
              isLoading={isLoading}>
              {isLoading ? <Loading /> : 'Salvar'}
            </SubmitButton>
          </ButtonContainer>

        </StyledForm>}
      {habits.length === 0 ? <NoHabitsSpan>{noHabitsSpanString}</NoHabitsSpan> :
        <Habits>
          {habits.map((habit) =>
            <Habit key={habit.id}>
              <span>
                {habit.name}
              </span>
              <CheckboxContainer>
                {weekdaysDefault.map((weekday) =>
                  <Checkbox
                    key={weekday.index}
                    isSelected={habit.days.includes(weekday.index)}>

                    <span>{weekday.day}</span>

                    <ion-icon
                      name="trash-outline"
                      onClick={() => {
                        if (window.confirm("Deseja deletar este hábito?")) {
                          axiosDelete(`habits/${habit.id}`, requestConfig)
                            .then(() => getHabits('habits', user.token, setHabits))
                        }
                      }}></ion-icon>

                  </Checkbox>
                )}
              </CheckboxContainer>
            </Habit>
          )}
        </Habits>}
      <ToastContainer />
    </Container >
  )

}