import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Login } from 'pages/Auth/Login';
import { Register } from 'pages/Auth/Register';
import { HomePage } from 'pages/Home';
import { ProfilePage } from 'pages/formatter/formatterSettings';
import { SettingPage } from 'pages/Course/Chapter/chapterSettings';
import { FormationSetting } from 'pages/Course/courseSettings';
import MakerHubPage from 'pages/maker/hub';
import NewQuiz from 'pages/NewQuiz/quiz';
import './styles.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

// Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/quiz/:id/:sectionId/:lessonId',
    element: <NewQuiz />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/setting',
    element: <SettingPage />,
  },
  {
    path: '/formation',
    element: <FormationSetting />,
  },
  {
    path: '/course/:id',
    element: <MakerHubPage />,
  },
  {
    path: '/course/:id/:sectionId',
    element: <MakerHubPage />,
  },
  {
    path: '/course/:id/:sectionId',
    element: <MakerHubPage />,
  },
  {
    path: '/course/:id/:sectionId/:lessonId',
    element: <MakerHubPage />,
  },
]);

// React Query setup (use to query the backend)
const queryCache = new QueryCache();
const mutationCache = new MutationCache();
export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ['data', 'error', 'isError', 'isLoading'],
    },
  },
});

// Style
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');


  * {
    box-sizing: border-box;
  }

  p, h1, h2, span, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
`;

// EntryPoint of the app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
);
