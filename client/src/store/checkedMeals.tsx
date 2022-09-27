import { createSlice } from '@reduxjs/toolkit'


const initialState : string[] = [

]

export const checkedSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    clearSelectedMeals : (state) => {
      state.length = 0;
      return state;
    },
    addChecked : (state, action) => {
        return [...state, action.payload];
    },
    removeChecked : (state, action) => {
        return state.filter(value => value !== action.payload)
    }
  },
})

export const { addChecked, removeChecked, clearSelectedMeals } = checkedSlice.actions
export default checkedSlice.reducer