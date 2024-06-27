import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '~/layouts/default'
import About from '~/pages/about'
import ErrorPage from '~/pages/error-page'
import React from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'about',
        element: <About />
      }
    ]
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
