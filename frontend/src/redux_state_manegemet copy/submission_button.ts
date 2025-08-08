import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface QuestionState {
    value: boolean;
}
  
const initialState: QuestionState = {
    value: false,
};

const submission_button_show = createSlice({
  name: "submission_button",
  initialState,
  reducers: {
    // --- FIX 1: Correct the reducer name here ---
    submission_type: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

// --- FIX 2: Export the action with the corrected name ---
export const { submission_type } = submission_button_show.actions;

export const submission_button_reducer = submission_button_show.reducer;