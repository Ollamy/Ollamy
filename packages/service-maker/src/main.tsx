import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from 'pages/Auth/Login';
import { Register } from 'pages/Auth/Register';
import CourseManagerPage from 'pages/CourseManager/CourseManagerPage';
import HomePage from 'pages/Home/HomePage';
import LectureEditorPage from 'pages/LectureEditor/LectureEditorPage';
import QuizEditorPage from 'pages/QuizEditor/QuizEditorPage';
import { createGlobalStyle } from 'styled-components';

import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import ProtectedRoute from 'pages/Auth/ProtectedRoute';

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
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/course/:courseId',
    element: <CourseManagerPage />,
  },
  {
    path: '/quizEditor/:lessonId',
    element: <QuizEditorPage />,
  },
  {
    path: '/lectureEditor/:lessonId',
    element: <LectureEditorPage />,
  },
  // {
  //   path: '/profile',
  //   element: <ProfilePage />,
  // },
  // {
  //   path: '/setting',
  //   element: <SettingPage />,
  // },
  // {
  //   path: '/formation',
  //   element: <FormationSetting />,
  // },
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

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');


  * {
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }
  
  button {
    cursor: pointer !important;
    &[disabled] {
      cursor: not-allowed !important;
    }
  }
`;

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
