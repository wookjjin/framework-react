import { Draggable } from '@hello-pangea/dnd'
import React from 'react'
import styled from 'styled-components'

import type { ITaskProps } from '~/types/dnd'

const Container = styled.div<{ $isDragging?: boolean }>`
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  background-color: ${props => (props.$isDragging ? 'lightgreen' : 'white')};
`

const Task = ({ task, index }: ITaskProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}

export default React.memo(Task)
