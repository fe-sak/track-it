import React, { useContext, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../contexts/Context';
import countProgress from '../pages/TodayPage/countProgress';
import { useAxiosGet } from '../services/services';

export default function Footer() {
  const location = useLocation();
  const { user, todaysHabits, setTodaysHabits } = useContext(Context);
  const getTodaysHabits = useAxiosGet();

  useEffect(() => {
    if (user !== '') {
      getTodaysHabits('habits/today', user.token, setTodaysHabits);
    }
  }, [getTodaysHabits, user, user.token, setTodaysHabits]);

  const [done, total] = countProgress(todaysHabits);
  return (
    <>
      {location.pathname === '/' || location.pathname === '/cadastro' ? '' :
        <PageFooter>
          <StyledLink to='/habitos'>Hábitos</StyledLink>
          <ProgressbarLink to='/hoje'>
            <CircularProgressbar
              value={Math.round(((done / total) * 100))}
              text='Hoje'
              background='true'
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: '#52B6FF',
                trailColor: '#52B6FF',
                pathColor: 'white',
                textColor: 'white',
              })} />
          </ProgressbarLink>
          <StyledLink to='/historico'>Histórico</StyledLink>
        </PageFooter>}
    </>
  );
}

const PageFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  background-color: white;
  color: #52B6FF;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a:first-of-type{
    margin-left: 36px;
  }

  a:last-of-type{
    margin-right: 36px;
  }

`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #52B6FF;
  font-size: 18px;
`;

const ProgressbarLink = styled(Link)`
  width: 91px;
  height: 91px;
  font-size: 18px;
  position: fixed;
  margin-left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
`;

