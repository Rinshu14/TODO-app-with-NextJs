import { UserSlice, TaskSlice, User } from "./types";
import { StateCreator } from "zustand";
import { immer } from 'zustand/middleware/immer'

const userSlice: StateCreator<
    UserSlice & TaskSlice,
    [],
    [['zustand/immer', never]],
    UserSlice
> = immer((set) => ({
    user: null,
    setUser: (user: User) => {
        set((state) => {
            state.user = user

        })
    },
    clearUserStore: () => {
        set((state) => { state.user = null })
    },

    updateUser: (user) => {
        set((state) => Object.assign(state, user))
    }


}))

export default userSlice
