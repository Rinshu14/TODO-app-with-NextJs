import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'; // Import the immer middleware
import userSlice from './userSlice';
import taskSlice from './taskSlice';
import uISlice from './UISlice';
import { UserSlice, TaskSlice,UISlice } from './types';
import { devtools } from 'zustand/middleware'
 


// Combine the state interfaces
export type AppState = UserSlice & TaskSlice & UISlice;

export const useCentralStore = create<AppState>()(
   
    devtools(immer((...a) => ({

        ...userSlice(...a),
        ...taskSlice(...a),
        ...uISlice(...a),
    })), { name: "centralStore" })
);


export default useCentralStore
// When you use create<AppState>()(immer(...)), the immer middleware is intercepting the set and get functions and changing their type signatures to enable mutable updates.

// Standard set: Expects a (state) => partialState function that returns a new object.

// Immer's set: Expects a (state) => void function that mutates a draft.