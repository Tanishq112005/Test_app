

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value:any
}
  
const initialState: QuestionState = {
    value: 0,
}

const sample_test_slice = createSlice({
  name: "sample_test",
  initialState,
  reducers: {
    sample_test_type: (state, action : PayloadAction<any>) => {
      // CORRECT WAY: Update the 'value' property of the state object.
      // Do not return anything. Immer handles the update.
      state.value = action.payload;
    },
  },
})

export const { sample_test_type } = sample_test_slice.actions
export const sample_test_reducer = sample_test_slice.reducer