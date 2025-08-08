

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value:any
}
  
const initialState: QuestionState = {
    value: [],
}

const leetcode_question_list = createSlice({
  name: "leetcode_question_list",
  initialState,
  reducers: {
    leetcode_question_type: (state, action : PayloadAction<any>) => {
   
      state.value = action.payload;
    },
  },
})

export const { leetcode_question_type } = leetcode_question_list.actions
export const leetcode_question_list_reducer = leetcode_question_list.reducer