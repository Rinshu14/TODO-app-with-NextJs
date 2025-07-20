import { UserSlice, TaskSlice, Task, UISlice } from "./types";
import { StateCreator } from "zustand";
import { immer } from 'zustand/middleware/immer'

const taskSlice: StateCreator<
    UserSlice & TaskSlice & UISlice,
    [],
    [['zustand/immer', never]],
    TaskSlice
> = immer((set) => ({
    task: [],

    setTasks: (task: Task[]) => {
        set((state) => { state.task?.push(...task) })
    },

    setTask: (task: Task) => {
        set((state) => { state.task?.push(task) })
    },
    clearTaskStore: () => {
        set((state) => { state.task =[] })
    },

    updateTask: (task) => {
        set((state) => {
            state.task?.map((item, index) => {
                if (item.id == task.id && state.task) {
                    state.task[index] = { ...item, ...task }
                }
            })


        })
    },

    deleteTask: (taskId) => {
        set((state) => {
           let newArr = [...state.task?.filter((item)=> item.id!=taskId)]
           state.task=[...newArr]
        })
    }


}))

export default taskSlice


