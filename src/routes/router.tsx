import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '~/layouts/default'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      // {
      //   path: '',
      //   element: <Home />
      // },
    ]
  },
  // {
  //   path: '/login',
  //   element: <Login />
  // },
  // {
  //   path: '/create-account',
  //   element: <CreateAccount />
  // }
])

const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router
