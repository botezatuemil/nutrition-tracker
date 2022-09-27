import { createSlice } from '@reduxjs/toolkit'

const initialState : boolean = false

export const isAddedSlice = createSlice({
  name: 'added',
  initialState,
  reducers: {
    isAdded : (state) => {
        //return !state;
    } 
  },
})

export const { isAdded } = isAddedSlice.actions
export default isAddedSlice.reducer