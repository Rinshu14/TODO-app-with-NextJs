
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

interface User {
    name: string
    email: string
    phoneNumber: string
    isLoggedIn: boolean
    photoUrl: string
}

type Actions = {
    setUser: (user: User) => void
    clearUserStore: () => void
    updateUser: (user: Partial<User>) => void
}

type UserState = {
    user: User | null
}


export const useUserStore = create<UserState & Actions>()(
     devtools(immer((set) => ({
        user: null,

        setUser: (user) => {
            set((state) =>{ state.user = user

            })
        },

        clearUserStore: () => {
            set((state) => {state.user = null})
        },

        updateUser: (user) => {
            set((state) => Object.assign(state,user) )
        }


    })),{name:"UserStore"}),
)

