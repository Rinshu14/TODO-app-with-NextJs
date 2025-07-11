import { taskDTO } from "../lib/Helper/TaskDTOMapper"
import Task from "../Models/taskModel"
import { Request, Response } from "express"
import APIResponse from "../lib/BaseClasses.ts/APIResponse"
import APIError from "../lib/BaseClasses.ts/APIError"


class TaskController {

    constructor() {

    }

    addTask = async (req: Request, res: Response) => {
        try {
            let task = new Task(req.body)
            let savedTask = await task.save()
            let data = taskDTO(savedTask);
            res.json(new APIResponse("task successfully completed", data))
        }
        catch (ex) {
            if (ex instanceof APIError) {
                res.status(ex.statusCode || 400).json(ex);
            }
            else if (ex instanceof Error) {
                console.log(ex.message)
                console.log(ex.name)
            }
            else res.json(new APIError("something went wrong"))
        }
    }
}

export default TaskController