import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';
import { Home } from './pages/Home/Home';
import { Tasks } from './pages/Tasks/Tasks';
import { Achievements } from './pages/Achievements/Achievements';
import { Market } from './pages/Market/Market';
import { Settings } from './pages/Settings/Settings';

import "./main.css";

const App = () => {
  return (
    <MantineProvider
      theme={{
        colors: {
          primary: [
            "#e6f1ff",
            "#cfddff",
            "#9db8ff",
            "#6891fb",
            "#3c70f9",
            "#1f5bf8",
            "#0b51f9",
            "#0042de",
            "#003ac7",
            "#0031b0"
          ],
        },
        primaryColor: 'primary',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />}>
            <Route path='/home/tasks' element={<Tasks />}></Route>
            <Route path='/home/market' element={<Market />}></Route>
            <Route path='/home/achievements' element={<Achievements />}></Route>
            <Route path='/home/stats' element={<></>}></Route>
            <Route path='/home/categories' element={<></>}></Route>
            <Route path='/home/settings' element={<Settings />}></Route>
            <Route path='/home/support' element={<></>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
