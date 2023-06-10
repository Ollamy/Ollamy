import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { createGlobalStyle } from 'styled-components';

const router = createBrowserRouter([
  {
    path: '/',
    element: Home(),
  },
  {
    path: '/register',
    element: Register(),
  },
  {
    path: '/login',
    element: Login(),
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
