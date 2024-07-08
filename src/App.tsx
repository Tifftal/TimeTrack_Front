import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from './pages/auth/Auth';
import './App.css'
import { Home } from './pages/home/Home';

const App = () => {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />}>
            <Route />
            <Route />
          </Route>
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
