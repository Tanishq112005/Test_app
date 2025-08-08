

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
export interface ArrayState {
  question_number : number ;
    question_type : string ; 
    question_solved : number ; 
}
export interface QuestionState {
   value : ArrayState[] ;  
   }
  
const initialState: QuestionState = {
  value:  [],
}

const question_list = createSlice({
  name: "question_list",
  initialState,
  reducers: {
   
    question_list_type: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload);

    },
  },
})

export const { question_list_type } = question_list.actions;
export const question_list_reducer = question_list.reducer;