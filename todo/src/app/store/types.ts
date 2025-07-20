
export enum status {
    pending = "Pending",
    completed = "Completed",
    inProgress = "InProgress"
}
export enum priority {
    high = "High",
    low = "Low",
    medium = "Medium"
}
export enum category {
    work = "Work",
    personal = "Personal",
    hobbies = "Hobbies"
}

interface DueDate {
    date: Date
    timeZone: string

}

export interface Task {
    id: string
    title: string
    status: status
    priority?: priority
    description?: string
    dueDate?: DueDate
    userId: string
    category: category[]
    createdAt: string
}

export type TaskActions = {
    setTasks: (tasks: Task[]) => void
    setTask: (task: Task) => void
    clearTaskStore: () => void
    updateTask: (task: Partial<Task>) => void
    deleteTask: (taskId: string) => void
}

export type TaskState = {
    task: Task[] 
}

export interface UI {
    isSidebarOpen: boolean
    selectedTask: Task | null
}

export type UIActions = {
    setSidebar: (flag: boolean) => void
    setSelectedTask: (task: Task | null) => void
    clearSelectedTask: () => void
    updateSelectedTask: (task: Task) => void
}



export interface User {
    id: string
    name: string
    email: string
    phoneNumber: string
    isLoggedIn: boolean
    photoUrl: string
}

export type UserActions = {
    setUser: (user: User) => void
    clearUserStore: () => void
    updateUser: (user: Partial<User>) => void
}

export type UserState = {
    user: User | null
}


export type UserSlice = UserActions & UserState
export type TaskSlice = TaskActions & TaskState
export type UISlice = UIActions & UI