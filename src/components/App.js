import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Context from './contexts/Context';
import Footer from './page components/Footer';
import Header from './page components/Header';
import HabitsPage from './pages/HabitsPage';
import HistoryPage from './pages/HistoryPage';
import SignInPage from './pages/SignInSignUpPages/SignInPage';
import SignUpPage from './pages/SignInSignUpPages/SignUpPage';
import TodayPage from './pages/TodayPage/index';

export default function App() {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Context.Provider value={{ user, setUser, isLoading, setIsLoading }}>
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
  )
}

