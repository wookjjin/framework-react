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
      const { destination, source, draggableId } = result

      if (!destination) return

      if (destination.droppableId === source.droppableId &&
        destination.index === source.index) return

      const column = data.columns[source.droppableId]
      const newTaskIds = Array.from(column.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...column,
        taskIds: newTaskIds
      }

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      }
      setData(newData)
    },
    [data]
  )
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {data.columnOrder.map((columnId, idx) => {
          const column = data.columns[columnId]
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId])
          return (
            <Column column={column} index={idx} tasks={tasks} key={column.id}/>
          )
        })}
      </Container>
    </DragDropContext>
  )
}

export default KanbanBoard
