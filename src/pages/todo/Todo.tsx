import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
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
	return (
		<>
			<Wrapper>
				<Input />
				<Button >
					Add
				</Button>
			</Wrapper>
		</>
	)
}

export default Todo
