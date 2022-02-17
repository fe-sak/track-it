import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Context from './contexts/Context';
import Footer from './components/Footer';
import Header from './components/Header';
import HabitsPage from './pages/HabitsPage';
import HistoryPage from './pages/HistoryPage';
import SignInPage from './pages/SignInSignUpPages/SignInPage';
import SignUpPage from './pages/SignInSignUpPages/SignUpPage';
import TodayPage from './pages/TodayPage/index';

export default function App() {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todaysHabits, setTodaysHabits] = useState([]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        todaysHabits,
        setTodaysHabits,
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/cadastro' element={<SignUpPage />} />
          <Route path='/habitos' element={<HabitsPage />} />
          <Route path='/hoje' element={<TodayPage />} />
          <Route path='/historico' element={<HistoryPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  );
}
