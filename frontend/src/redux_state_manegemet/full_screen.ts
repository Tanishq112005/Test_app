

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

export interface QuestionState {
    value: boolean
}
  
const initialState: QuestionState = {
    value: false,
}

const full_screen_Slice = createSlice({
  name: "full_screen",
  initialState,
  reducers: {
    full_screen : (state, action : PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
})

export const { full_screen } = full_screen_Slice.actions
export const full_screen_reducer = full_screen_Slice.reducer