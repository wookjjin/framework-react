import { Droppable } from '@hello-pangea/dnd'
import styled from 'styled-components'

import Task from '~/components/dnd/task'
import { IColumnProps } from '~/types/dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  padding: 8px;
`

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`

const Column = ({column, tasks}: IColumnProps) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <TaskList {...provided.droppableProps} ref={provided.innerRef}>
            <>
              {tasks.map((task, idx) => (
                <Task key={task.id} index={idx} task={task} />
              ))}
              {provided.placeholder}
            </>
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}

export default Column
