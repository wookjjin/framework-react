import './App.css'
import {
	RouterProvider,
} from "react-router";
import router from '~/shared/route'

function App() {

	return (
		<RouterProvider router={router} />
	)
}

export default App
