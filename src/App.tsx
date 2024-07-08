import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from './pages/auth/Auth';
import './App.css'

const App = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
