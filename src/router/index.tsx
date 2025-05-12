import { createBrowserRouter, RouterProvider } from 'react-router'

import DefaultLayout from '~/components/layouts/Default'
import About from '~/pages/about'
import Home from '~/pages/home'

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
])

export function Router() {
  return <RouterProvider router={router} />
}

export default Router
