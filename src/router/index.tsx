import { createBrowserRouter, RouterProvider } from 'react-router'

import DefaultLayout from '~/components/layout/Default'
import LayoutEmpty from '~/components/layout/LayoutEmpty'
import About from '~/pages/about'
import Home from '~/pages/home'
import LoginPage from '~/pages/login'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    element: <LayoutEmpty />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}

export default Router
