import styled from 'styled-components'
import TodoItem from './TodoItem'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
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
	const [startDate, setStartDate] = useState(new Date() as Date | null)
	return (
		<>
			<div>
				<Wrapper>
					<Input />
					<Button >
						Add
					</Button>
					<DatePicker
						showIcon
						selected={startDate}
						onChange={(date) => setStartDate(date)}
					/>
				</Wrapper>
				<TodoItem />
			</div>
		</>
	)
}

export default Todo
