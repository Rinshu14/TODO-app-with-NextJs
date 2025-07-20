
import { ITaskModel, status, priority, category } from "Models/taskModel"

interface TaskDTO {
    id: string
    title: string
    status: status
    priority?: priority
    description?: string
    dueDate?: Date
    userId: string
    category?: category[]
    createdAt: string
}
export const taskDTO = (data: ITaskModel): TaskDTO | null => {

    if (!data) return null;
    return {
        id: data._id.toString(),
        title: data.title,
        status: data.status,
        userId: data.userId,
        priority: data.priority,
        description: data.description,
        dueDate: data.dueDate,
        category: data.category,
        createdAt: data.createdAt.toUTCString()
    }
}

export const taskListDTO = (data: ITaskModel[]): (TaskDTO | null)[] => data.map(taskDTO)