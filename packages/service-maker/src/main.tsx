import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Courses } from './pages/Courses';
import { CreateCourse } from './pages/CreateCourse';
import { Explore } from './pages/Explore';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/courses',
    element: <Courses />,
  },
  {
    path: '/create-course',
    element: <CreateCourse />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');


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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
