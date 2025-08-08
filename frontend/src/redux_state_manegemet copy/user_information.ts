import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface QuestionState {
  value: any
}

const initialState: QuestionState = {
  value: {},
}

export const counterSlice = createSlice({
  name: 'user_information',
  initialState,
  reducers: {
    user_information_changer: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
})


export const { user_information_changer } = counterSlice.actions

export const user_inforamtion_reducer = counterSlice.reducer;
