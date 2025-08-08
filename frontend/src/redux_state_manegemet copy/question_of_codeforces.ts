import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface QuestionState {
  value: number
}

const initialState: QuestionState = {
  value: 0,
}

export const counterquestion = createSlice({
  name: 'question_of_codeforces',
  initialState,
  reducers: {
    question_of_reducer: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
})


export const { question_of_reducer } = counterquestion.actions

export default counterquestion.reducer;
