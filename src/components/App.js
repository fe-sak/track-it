import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInPage isLoading={isLoading} setIsLoading={setIsLoading} />} />
        <Route path='/cadastro' element={<SignUpPage isLoading={isLoading} setIsLoading={setIsLoading} />} />
        <Route path='/habitos' />
        <Route path='/hoje' />
        <Route path='/historico' />
      </Routes>
    </BrowserRouter>
  )
}

