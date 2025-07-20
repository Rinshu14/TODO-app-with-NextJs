import { Router } from 'express'
import TaskController from '../Controllers/TaskController'
import isLoggedIn from "../Middleware/AuthMiddleware"

class Taskrouter {
    router
    taskController: TaskController
    constructor() {
        this.router = Router()
        this.taskController = new TaskController()
        this.routes()
    }

    routes = () => {
        this.router.post("/add", isLoggedIn, this.taskController.addTask)
        this.router.get("/tasks", isLoggedIn, this.taskController.fetchTask)
        this.router.patch("/update/:id",isLoggedIn,this.taskController.updateTask)
        this.router.delete("/delete/:id",isLoggedIn,this.taskController.deleteTask)
    }
}

export default new Taskrouter().router
