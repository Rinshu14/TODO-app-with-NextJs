import { model, Mongoose, Schema, Document, Types } from "mongoose";

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

export interface ITaskModel extends Document {
    _id: Types.ObjectId
    title: string
    status: status
    priority?: priority
    description?: string
    dueDate?: Date
    userId: string
    category?: category[]
    createdAt:Date
    
}


const taskSchema = new Schema<ITaskModel>({
    title: {
        type: String,
        require: true,
        maxlength: 150
    },
    status: {
        type: String,
        require: true
    },
    priority: String,
    description: {
        type: String,
        maxlength: 300
    },
    dueDate: {

        type: new Schema({
            date: {
                type: Date,
                required: true
            },
            timezone: {
                type: String,
                required: true
            }
        }, { _id: false })
    },
    category: [],
    userId: {
        type: String,
        require: true

    }

}, { timestamps: true })

const Task = model<ITaskModel>("Task", taskSchema)

export default Task