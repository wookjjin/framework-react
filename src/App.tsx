import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import DefaultLayout from '~/layouts/default'
import About from '~/pages/about'
import ErrorPage from '~/pages/error-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'example/:category',
      },
    ],
  },
])

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
