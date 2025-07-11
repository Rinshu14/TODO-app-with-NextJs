import { UserSlice, TaskSlice } from "./types";
import { StateCreator } from "zustand";
import { immer } from 'zustand/middleware/immer'

const taskSlice: StateCreator<
    UserSlice & TaskSlice,
    [],
    [['zustand/immer', never]],
    TaskSlice
> = immer((set) => ({
    task: [],

    setTask: (task) => {
        set((state) => {state.task?.push(task)})
    },

    clearTaskStore: () => {
        set((state) => { state.task = null })
    },

    updateTask: (task) => {
        set((state) => {
            state.task?.map((item, index) => {
                if (item.id == task.id && state.task) {
                    state.task[index] = { ...item, ...task }
                }
            })


        })
    }


}))

export default taskSlice


