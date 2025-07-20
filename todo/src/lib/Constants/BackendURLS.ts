export const authUrls = {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout"

}

export const profileUrls={
    viewProfile:"/profile/view"
}
export const taskUrls={
    addTask:"/task/add",
    fetchTask:"/task/tasks",
    updateTask:"/task/update",
    deleteTask:"/task/delete"

}

export enum httpMethods{
    get="get",
    put="put",
    post="post",
    patch="patch",
    delete="delete"
}