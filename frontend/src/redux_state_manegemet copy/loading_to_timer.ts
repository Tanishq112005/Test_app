

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value:boolean
}
  
const initialState: QuestionState = {
    value: false,
}

const changer_slice = createSlice({
  name: "changer",
  initialState,
  reducers: {
    changer_type: (state, action : PayloadAction<boolean>) => {
      // CORRECT WAY: Update the 'value' property of the state object.
      // Do not return anything. Immer handles the update.
      state.value = action.payload;
    },
  },
})

export const { changer_type } = changer_slice.actions
export const changer_reducer = changer_slice.reducer