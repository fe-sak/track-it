import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 98px 17px 100px 17px;
  background-color: #F2F2F2;
  overflow: scroll;
  
  span{
    display: block;
  }
`

const TitleSpan = styled.span`
  font-size: 23px;
  color: #126BA5;
`

const ProgressSpan = styled.span`
  font-size: 18px;
  color: ${props => props.isDone ? '#8FC549' : '#BABABA'};
  margin-top: 10px;
`

const HabitsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 26px;
`
const Habit = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px;

  &>div:first-of-type{
    span{
      display: block;
      color: #666666;
      font-size: 13px;
      margin-bottom: 4px;
    }
    
    span:first-of-type{
      font-size: 20px;
      margin-bottom: 7px;
    }
    
    span:nth-child(2){
      color: ${props => props.isDone ? '#8FC549' : '#666666'};
    }

    span:nth-child(3){
      color: ${props => props.isHighestSequence ? '#8FC549' : '#666666'};
    }
  }

  &>div:last-of-type{
    width: 69px;
    height: 69px;
    background-color: ${props => props.isDone ? '#8FC549' : '#EBEBEB'};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    ion-icon{
      color: white;
      font-size: 60px;
    }
  }
`

export { Container, TitleSpan, ProgressSpan, HabitsContainer, Habit }