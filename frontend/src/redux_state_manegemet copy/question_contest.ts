

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value:any
}
  
const initialState: QuestionState = {
    value: 0,
}

const question_page_slice = createSlice({
  name: "question_page",
  initialState,
  reducers: {
    question_page_type: (state, action : PayloadAction<any>) => {
     
      state.value = action.payload;
    },
  },
})

export const { question_page_type } = question_page_slice.actions
export const question_page_reducer = question_page_slice.reducer