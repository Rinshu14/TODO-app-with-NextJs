
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

export interface Task {
    id: string
    title: string
    status: status
    priority?: priority
    description?: string
    dueDate?: Date
    userId: string
    category?: category
}

export type TaskActions = {
    setTask: (user: Task) => void
    clearTaskStore: () => void
    updateTask: (user: Partial<Task>) => void
}

export type TaskState = {
    task: Task[] | null
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