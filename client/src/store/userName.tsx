import { createSlice } from '@reduxjs/toolkit'

const initialState: string = "";

export const username = createSlice({
  name: 'username',
  initialState,
  reducers: {
    fetchUserName: (state, action: any) => {
     state = action.payload;
     return state;
    },
  },
})

export const { fetchUserName } = username.actions
export default username.reducer