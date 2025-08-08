// leetcode_question.ts - CORRECTED

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface QuestionState {
  value: number
}
  
const initialState: QuestionState = {
  value: 1,
}

const question_type_Slice = createSlice({
  name: "question_is_on",
  initialState,
  reducers: {
   
    setquestion_is_on_type: (state, action: PayloadAction<number>) => {
    
      state.value = action.payload;
    },
  },
})

export const { setquestion_is_on_type } = question_type_Slice.actions;
export const question_typereducer = question_type_Slice.reducer;