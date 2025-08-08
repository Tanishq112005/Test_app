

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value: string
}
  
const initialState: QuestionState = {
    value: 'cpp',
}

const lang = createSlice({
  name: "lang",
  initialState,
  reducers: {
    lang_type: (state, action : PayloadAction<any>) => {
   
      state.value = action.payload;
    },
  },
})

export const { lang_type } = lang.actions ; 
export const lang_reducer = lang.reducer ; 