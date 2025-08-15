import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import App from './App';
import LandingPage from './routes/LandingPage';
import GamePage from './routes/GamePage';
import ProfilePage from './routes/ProfilePage';
import PlayersPage from './routes/PlayersPage';
import PlayerStatsPage from './routes/PlayerStatsPage';
import NotFoundPage from './routes/NotFoundPage';
import { AuthProvider } from './features/auth/AuthProvider';
import { RequireAuth } from './features/auth/RequireAuth';
import { ThemeProvider } from './features/theme/ThemeProvider';

const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Amsterdam',
}).format(new Date());

const router = createBrowserRouter([
  {
    element: (
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    ),
    children: [
      { index: true, element: <LandingPage /> },

      {
        path: 'game',
        element: (
          <RequireAuth>
            <GamePage />
          </RequireAuth>
        ),
      },
      {
        path: 'profile',
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: 'players',
        element: (
          <RequireAuth>
            <PlayersPage />
          </RequireAuth>
        ),
      }, // список
      {
        path: 'players/:uid',
        element: (
          <RequireAuth>
            <PlayerStatsPage />
          </RequireAuth>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
