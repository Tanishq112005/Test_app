// codeforces_rating_slice.ts

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

export interface QuestionState {
    value: number
}
  
const initialState: QuestionState = {
    value: 0,
}

const codeforces_rating_Slice = createSlice({
  name: "codeforces_rating",
  initialState,
  reducers: {
    setcodeforces_rating: (state, action : PayloadAction<number>) => {
      // CORRECT WAY: Update the 'value' property of the state object.
      // Do not return anything. Immer handles the update.
      state.value = action.payload;
    },
  },
})

export const { setcodeforces_rating } = codeforces_rating_Slice.actions
export const codeforces_rating_reducer = codeforces_rating_Slice.reducer