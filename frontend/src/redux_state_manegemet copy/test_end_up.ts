

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

export interface QuestionState {
    value: boolean
}
  
const initialState: QuestionState = {
    value: false,
}

const test_endup_Slice = createSlice({
  name: "test_endup",
  initialState,
  reducers: {
    test_endup : (state, action : PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
})

export const { test_endup } = test_endup_Slice.actions
export const test_endup_reducer = test_endup_Slice.reducer
