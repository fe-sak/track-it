import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 98px 17px 100px 17px;
  background-color: #F2F2F2;

  span{
    display: block;
  }

  &>div:last-child{
    width: 100%;
    margin-top: 11px;
    border-radius: 10px;
    border: none;
  }
`

const TitleSpan = styled.span`
  font-size: 23px;
  color: #126BA5;
`

const StyledSpan = styled.span`
  font-size: 18px;
  color: #666666;
  margin-top: 10px;
`

export { Container, TitleSpan, StyledSpan }