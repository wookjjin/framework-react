import { createBrowserRouter } from "react-router"
import Todo from '~/pages/todo/Todo.tsx'
import Home from "~/pages/home/Home"

const router = createBrowserRouter([
	{
		path: '/',
		Component: Home
	},
	{
		path: '/todo',
		Component: Todo
	}
])

export default router