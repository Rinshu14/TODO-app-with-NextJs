import { taskDTO, taskListDTO } from "../lib/Helper/TaskDTOMapper"
import Task, { category } from "../Models/taskModel"
import { Request, Response } from "express"
import APIResponse from "../lib/BaseClasses.ts/APIResponse"
import APIError from "../lib/BaseClasses.ts/APIError"



class TaskController {


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
    fetchTask = async (req: Request, res: Response) => {
        try {
            let user = req.user;
            let data = await Task.find({ userId: user?.id })
            let mappedData = taskListDTO(data)
           
            res.json(new APIResponse("task successfully completed", mappedData))
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
    updateTask = async (req: Request, res: Response) => {
        try {

            let id = req.params.id
            let task = await Task.findById(id)
            let updatedTask = { ...task?.toObject(), ...req.body }
            let returnDocument;
            let updatedTaskDB = await Task.findByIdAndUpdate(id, updatedTask, { returnDocument: "after" })
            if (updatedTaskDB) {

                returnDocument = taskDTO(updatedTaskDB);
              
                res.json(new APIResponse("Task details updated successfully", returnDocument))
                return
            }
            res.json(new APIResponse("something is wrong while updating task details", {}))

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
    deleteTask = async (req: Request, res: Response) => {
        try {

            let id = req.params.id
            let task = await Task.findById(id)
            if (!task) {
                res.json(new APIResponse("Task Doesn't exist", {}))
                return
            }
            await Task.deleteOne({ _id: id })

            res.json(new APIResponse("Task deleted successfully", {}))

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