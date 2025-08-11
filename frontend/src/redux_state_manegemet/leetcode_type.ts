// leetcode_question.ts
import { createSlice } from "@reduxjs/toolkit"

export interface QuestionState {
    value: string
  }
  
  const initialState: QuestionState = {
    value: "",
  }

const leetcode_type_Slice = createSlice({
  name: "leetcodequestion_type",
  initialState,
  reducers: {
    setLeetcodeQuestions_type: (_state,  action) => {
      return action.payload
    },
  },
})

export const { setLeetcodeQuestions_type } = leetcode_type_Slice.actions
export const leetcode_typereducer = leetcode_type_Slice.reducer
