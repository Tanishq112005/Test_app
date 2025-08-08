

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value: number
}
  
const initialState: QuestionState = {
    value: 57,
}

const code_val = createSlice({
  name: "code_val",
  initialState,
  reducers: {
    code_val_type: (state, action : PayloadAction<any>) => {
   
      state.value = action.payload;
    },
  },
})

export const { code_val_type } = code_val.actions
export const code_val_reducer = code_val.reducer