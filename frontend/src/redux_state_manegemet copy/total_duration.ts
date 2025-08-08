import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface QuestionState {
  value: number
}

const initialState: QuestionState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'total_duaration',
  initialState,
  reducers: {
    total_duration: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
})


export const { total_duration } = counterSlice.actions

export const total_duration_type = counterSlice.reducer;
