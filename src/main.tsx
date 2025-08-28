import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './features/auth/AuthProvider';
import { RequireAuth } from './features/auth/RequireAuth';
import { ThemeProvider } from './features/theme/ThemeProvider';
import GamePage from './routes/GamePage';
import GlobalMetricsPage from './routes/GlobalMetricsPage';
import LandingPage from './routes/LandingPage';
// import MetricsDashboardPage from './routes/MetricsDashboardPage';
import NotFoundPage from './routes/NotFoundPage';
import PlayersPage from './routes/PlayersPage';
import PlayerStatsPage from './routes/PlayerStatsPage';
import ProfilePage from './routes/ProfilePage';

const router = createBrowserRouter(
  [
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
          path: 'metrics',
          element: (
            <RequireAuth>
              <GlobalMetricsPage />
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
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
