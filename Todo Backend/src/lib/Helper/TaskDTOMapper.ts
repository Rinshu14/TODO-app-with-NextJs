
import { ITaskModel, status, priority, category } from "Models/taskModel"


// export const taskListDTO = (data: ITaskModel[]): TaskDTO[] =>
//   data.map(taskDTO)
interface TaskDTO {
    id: string
    title: string
    status: status
    priority?: priority
    description?: string
    dueDate?: Date
    userId: string
    category?: category
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
        category: data.category
    }
}