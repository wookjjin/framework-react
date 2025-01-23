import styled from "styled-components"

interface TodoItemProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`

const Button = styled.button`
  color: red;
  padding: 0.3em;
  width: 4em;
  border: none;
`

const Span = styled.span`
  margin-right: 1em;
`

const TodoItem = ({ id, text, onDelete }: TodoItemProps) => {
	return (
		<Wrapper>
			<Span>{text}</Span>
			<Button onClick={() => onDelete(id)} >
				Delete
			</Button>
		</Wrapper>
	)
}

export default TodoItem