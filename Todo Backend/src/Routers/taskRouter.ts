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
    }
}

export default new Taskrouter().router
