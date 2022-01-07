import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import Context from './contexts/Context';
import TodayPage from './pages/TodayPage';

export default function App() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Context.Provider value={{ token, setToken, isLoading, setIsLoading }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/cadastro' element={<SignUpPage />} />
          <Route path='/habitos' />
          <Route path='/hoje' element={<TodayPage />} />
          <Route path='/historico' />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

