import { Draggable } from '@hello-pangea/dnd'
import styled from 'styled-components'

import type { ITaskProps } from '~/types/dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`

const Task = ({ task, index }: ITaskProps) => {
  return (
    <Draggable draggableId={task.id} index={index} >
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}

export default Task
