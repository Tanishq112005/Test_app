

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value:any
}
  
const initialState: QuestionState = {
    value: [],
}

const codeforces_question = createSlice({
  name: "codeforces_question",
  initialState,
  reducers: {
    codeforces_question_type: (state, action : PayloadAction<any>) => {
   
      state.value = action.payload;
    },
  },
})

export const { codeforces_question_type } = codeforces_question.actions
export const codeforces_question_reducer = codeforces_question.reducer