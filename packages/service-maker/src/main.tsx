import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import ReactDOM from 'react-dom/client';
import Login from 'src/pages/Login';
import React from 'react';
import Register from 'src/pages/Register';
import HomePage from 'src/pages/Home';
import QuizEditor from 'src/pages/Quiz';
import ProfilePage from 'src/pages/Profile';
import MakerHubPage from 'src/pages/maker/hub';

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
    element: <QuizEditor />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
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
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
