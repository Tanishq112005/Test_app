

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value:boolean
}
  
const initialState: QuestionState = {
    value: false,
}

const modal_show = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modal_type: (state, action : PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
})

export const { modal_type } = modal_show.actions
export const modal_reducer = modal_show.reducer 