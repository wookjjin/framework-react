import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

import Column from '~/components/dnd/column'
import { IDndData } from '~/types/dnd'
import { initialData } from '~/types/dnd/constans'

const Container = styled.div`
  display: flex;
`

const KanbanBoard: React.FC = () => {
  const [data, setData] = useState<IDndData>(initialData)
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result
      if (!destination) return
      if (destination.droppableId === source.droppableId && source.index === destination.index) return

      if (type === 'column') {
        const newColumnOrder = Array.from(data.columnOrder)
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index, 0, draggableId)

        const newData = {
          ...data,
          columnOrder: newColumnOrder,
        }
        setData(newData)
        return
      }
      const startColumn = data.columns[source.droppableId]
      const finishColumn = data.columns[destination.droppableId]

      if (startColumn === finishColumn) {
        const newTaskIds = Array.from(startColumn.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn = {
          ...startColumn,
          taskIds: newTaskIds,
        }

        const newData = {
          ...data,
          columns: {
            ...data.columns,
            [newColumn.id]: newColumn,
          },
        }

        setData(newData)
      } else {
        const startTaskIds = Array.from(startColumn.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStartColumn = {
          ...startColumn,
          taskIds: startTaskIds,
        }

        const finishTaskIds = Array.from(finishColumn.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinishColumn = {
          ...finishColumn,
          taskIds: finishTaskIds,
        }

        const newData = {
          ...data,
          columns: {
            ...data.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
          },
        }

        setData(newData)
      }
    },
    [data],
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId]
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId])
              return <Column column={column} tasks={tasks} key={column.id} index={index} />
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default KanbanBoard
