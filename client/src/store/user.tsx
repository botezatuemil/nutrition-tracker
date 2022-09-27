import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Nutrients} from '../interfaces/index';

// Define a type for the slice state

// Define the initial state using that type
const initialState: Nutrients = {
  calories: 0,
  carbs: 0,
  fat: 0,
  protein: 0,
  sugar: 0
}

export const counterSlice = createSlice({
  name: 'profile',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetchMacros: (state, action: any) => {
      console.log(action.payload.data[0]);
       Object.assign(state, action.payload.data[0])
    },
  },
})

export const { fetchMacros } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer