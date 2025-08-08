import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface QuestionState {
  value: number
}

const initialState: QuestionState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'total_question',
  initialState,
  reducers: {
    total_question_changer: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
})


export const { total_question_changer } = counterSlice.actions

export default counterSlice.reducer;
