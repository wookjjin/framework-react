import { createBrowserRouter } from "react-router";
import Todo from '~/pages/todo/Todo.tsx'

const router = createBrowserRouter([
	{
		path: '/todo',
		Component: Todo
	}
])

export default router