import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from './pages/auth/Auth';
import Register from './pages/Register/Register';
import { Home } from './pages/home/Home';
import { Tasks } from './pages/Tasks/Tasks';
import { Achievements } from './pages/Achievements/Achievements';
import { Market } from './pages/Market/Market';
import { Settings } from './pages/Settings/Settings';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';
import Desktop from './pages/Desktop/Desktop';

import '@mantine/dropzone/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import "./main.css";
import { Stats } from './pages/Stats/Stats';
import AchievementsSettings from './pages/AchievementsSettings/AchievementsSettings';

const App = () => {
  return (
    <ReduxProvider store={store}>
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
            <Route path='/auth/desktop' element={<Desktop />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />}>
              <Route path='/home/tasks' element={<Tasks />}></Route>
              <Route path='/home/market' element={<Market />}></Route>
              <Route path='/home/achievements-settings' element={<AchievementsSettings />}></Route>
              <Route path='/home/achievements' element={<Achievements />}></Route>
              <Route path='/home/stats' element={<Stats />}></Route>
              <Route path='/home/categories' element={<></>}></Route>
              <Route path='/home/settings' element={<Settings />}></Route>
              <Route path='/home/support' element={<></>}></Route>
            </Route>
            <Route path='*' element={<Navigate to='/auth' />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ReduxProvider>
  )
}

export default App
