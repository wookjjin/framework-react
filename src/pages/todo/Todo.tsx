import styled from 'styled-components'
import TodoItem from './TodoItem'
import { useState } from 'react'

interface Todo {
  id: number;
  text: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 1em;
`

const Input = styled.input`
  padding: 0.5em;
  background-color: antiquewhite;
  color: #BF4F74;
  border: none;
  border-radius: 5px;
  &:focus-visible {
    outline: bisque auto 1px;
  }
`

const Button = styled.button`
  background-color: burlywood;
  color: black;
  padding: 0.3em;
  width: 4em;
  font-weight: 600;
`

const Todo = () => {
	const [todoList, setTodoList] = useState<Todo[]>([])
	const [inputValue, setInputValue] = useState('')
  
	const handleAddTodo = () => {
		if (inputValue.trim() === '') 
			return

		const newTodo: Todo = {
			id: Date.now(),
			text: inputValue
		}
    
		setTodoList([...todoList, newTodo])
		setInputValue('')
	}
  
	const handleDeleteTodo = (id: number) => {
		setTodoList(todoList.filter((todo) => todo.id !== id))
	}

	return (
		<>
			<div>
				<Wrapper>
					<Input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
					<Button onClick={handleAddTodo}>
						Add
					</Button>
				</Wrapper>
				{todoList.length ? (
					todoList.map((todo) => (
						<TodoItem key={todo.id} id={todo.id} text={todo.text} onDelete={handleDeleteTodo} />
					))
				) : (
					<p>No todos yet.</p>
				)
				}
			</div>
		</>
	)
}

export default Todo
