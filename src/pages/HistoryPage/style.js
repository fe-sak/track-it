import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 98px 17px 100px 17px;
  background-color: #F2F2F2;
  overflow: scroll;

  span{
    display: block;
  }

  &>div:last-child{
    width: 100%;
    margin-top: 11px;
    border-radius: 10px;
    border: none;
  }
`;

const TitleSpan = styled.span`
  font-size: 23px;
  color: #126BA5;

  &:last-of-type{
    margin-top: 10px;
  }
`;

const CalendarContainer = styled.div`
  .react-calendar{
    width: 100%;
  }
  

  .complete {
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
    .incomplete {
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
`;

const Habits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`;

const Habit = styled.div`
  position: relative;
  width: 100%;
  padding: 18px;
  background-color: white;

  span{
    font-size: 20px;
    color: ${props => props.isDone ? '#8CC654' : '#EA5766'};
  }
`;

export {
  Container,
  TitleSpan,
  CalendarContainer,
  Habit,
  Habits
};