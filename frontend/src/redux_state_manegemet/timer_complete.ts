

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value:boolean
}
  
const initialState: QuestionState = {
    value: false,
}

const timer_complete_show = createSlice({
  name: "timer_complete",
  initialState,
  reducers: {
    timer_complete_type: (state, action : PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
})

export const { timer_complete_type } = timer_complete_show.actions
export const timer_complete_reducer = timer_complete_show.reducer 