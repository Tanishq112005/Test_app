import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface QuestionState {
    value: number
}
  
const initialState: QuestionState = {
    value: 0,
}

const leetcodeSlice = createSlice({
  name: "leetcodequestion",
  initialState,
  reducers: {
    // 1. Add the correct type for the action's payload
    setLeetcodeQuestions_number: (state, action: PayloadAction<number>) => {
      // 2. CORRECT: Mutate the 'value' property of the state object.
      // Immer will create a new state object for you behind the scenes.
      state.value = action.payload
    },
  },
})

// These exports are correct and do not need to be changed
export const { setLeetcodeQuestions_number } = leetcodeSlice.actions
export const leetcodereducer = leetcodeSlice.reducer