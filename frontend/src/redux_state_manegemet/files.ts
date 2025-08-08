// src/redux_state_manegemet/files.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a proper type for a single file
export interface FileState {
  name: string;
  language: string;
  value: string;
}

// Define the shape of this slice's state
export interface FilesSliceState {
    value: FileState[];
}
  
const initialState: FilesSliceState = {
    value: [],
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    // The action payload should be the entire new array of files
    setFiles: (state, action: PayloadAction<FileState[]>) => {
      // CORRECT: This correctly updates the 'value' property inside the state object.
      state.value = action.payload;
    },
    // An action to update a single file, which is more efficient
    updateFile: (state, action: PayloadAction<{ index: number; newContent: Partial<FileState> }>) => {
        const { index, newContent } = action.payload;
        if (state.value[index]) {
            state.value[index] = { ...state.value[index], ...newContent };
        }
    }
  },
});

// Export the correct action creator
export const { setFiles, updateFile } = filesSlice.actions;
export const files_reducer = filesSlice.reducer;