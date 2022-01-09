import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  padding: 98px 17px 100px 17px;
  background-color: #F2F2F2;
`
const TitleSpan = styled.span`
  font-size: 23px;
  color: #126BA5;
`

const NoHabitsSpan = styled.span`
  font-size: 18px;
  color: #666666;
  margin-top: 28px;
  display: inline-block;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Button = styled.div`
  width: 40px;
  height: 35px;
  border-radius: 4.63636px;
  background-color: #52B6FF;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ion-icon{
    color: white;
    font-size: 30px;
  }
`

const StyledForm = styled.form`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 18px;
  margin-top: 20px;

  input{
    width:  100%;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    padding-left: 11px;
    color: #666666;
    font-size: 20px;

    &::placeholder{
      font-size: 20px;
      color: #DBDBDB;
    }

    &:focus{
      outline: none;
    }

    
  }
`

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  margin-top: 10px;

`

const Checkbox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-size: 20px;
  color: ${props => props.isSelected ? 'white' : '#DBDBDB'};
  background-color: ${props => props.isSelected ? '#CFCFCF' : 'white'};
  cursor: pointer;
  pointer-events: ${props => props.isLoading ? 'none' : 'default'};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 23px;
  width: 100%;
`

const CancelButton = styled.button`
  all: initial;
  font: 400 16px 'lexend deca';
  color: #52B6FF;
  cursor: pointer;
`

const SubmitButton = styled.button`
  all: initial;
  font: 400 16px 'lexend deca';
  background-color: #52B6FF;
  color: white;
  padding: 7px 17px;
  border-radius: 4.63636px;
  opacity: ${props => props.isLoading ? 0.7 : 1};
  cursor: ${props => props.isLoading ? 'default' : 'pointer'};
  pointer-events: ${props => props.isLoading ? 'none' : 'auto'};
`

const Habits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`

const Habit = styled.div`
  position: relative;
  width: 100%;
  padding: 18px;
  background-color: white;

  &>span{
    font-size: 20px;
    color: #666666;
  }

  ion-icon{
    position: absolute;
    top: 11px;
    right: 11px;
    font-size: 15px;
    color: #666666;
  }
`

export {
  Container,
  TitleSpan,
  NoHabitsSpan,
  TitleContainer,
  Button,
  StyledForm,
  CheckboxContainer,
  Checkbox,
  ButtonContainer,
  CancelButton,
  SubmitButton,
  Habits,
  Habit
}