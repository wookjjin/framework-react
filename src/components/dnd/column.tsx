import { Droppable, Draggable } from '@hello-pangea/dnd'
import styled from 'styled-components'

import Task from '~/components/dnd/task'
import { IColumnProps } from '~/types/dnd'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 220px;
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`

const Title = styled.h3`
  padding: 8px;
`

const TaskList = styled.div<{ $isDraggingOver: boolean }>`
  padding: 8px;

  background-color: ${(props) => (props.$isDraggingOver ? 'skyblue' : 'white')};

  transition: background-color 0.2s ease;
  /* flex-grow: 1;
  min-height: 100px; */
`

const Column = ({ column, tasks, index }: IColumnProps) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type='task'>
            {(provided, snapshot) => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef} $isDraggingOver={snapshot.isDraggingOver}>
                <>
                  {tasks.map((task, idx) => (
                    <Task key={task.id} task={task} index={idx} />
                  ))}
                  {provided.placeholder}
                </>
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column
