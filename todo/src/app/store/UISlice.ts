import { UISlice, UI, UserSlice, TaskSlice, Task } from "./types";
import { StateCreator } from "zustand";
import { immer } from 'zustand/middleware/immer'

const uISlice: StateCreator<
    UserSlice & TaskSlice & UISlice,
    [],
    [['zustand/immer', never]],
    UISlice
> = immer((set) => ({
    isSidebarOpen: false,
    selectedTask: null,
    setSidebar: (flag: boolean) => {
        set((state) => { state.isSidebarOpen = flag })
    },
    setSelectedTask: (task: Task | null) => {
        set((state) => { 
           state.selectedTask = task })
    },
    clearSelectedTask: () => { set((state) => { state.selectedTask = null }) },
    
    updateSelectedTask: (task: Task) => {
        set((state) => { state.selectedTask = { ...state.selectedTask, ...task } })
    }


}


))

export default uISlice


