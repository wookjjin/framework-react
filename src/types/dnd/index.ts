export interface IDndData {
  tasks: {
    [key: string]: { id: string, content: string }
  }
  columns: {
    [key: string]: { id: string, title: string, taskIds: string[] }
  }
  columnOrder: string[]
}

export interface IColumnProps {
  column: {
    id: string,
    title: string,
    taskIds: string[]
  }
  tasks: {
    id: string
    content: string
  }[]
  index: number
}

export interface ITaskList {
  isDraggingOver: boolean
}

export interface IContainer {
  isDragDisabled: boolean
  isDragging: boolean
}

export interface ITaskProps {
  task: {
    id: string
    content: string
  }
  index: number
}
