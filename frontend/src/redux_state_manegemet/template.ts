

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface QuestionState {
    value: string
}

const initialState: QuestionState = {
    value: `#include<bits/stdc++.h>
using namespace std;

int main() {
   // write your code from here 
   return 0; 
  }`
}


const template = createSlice({
    name: "template",
    initialState,
    reducers: {
        template_type: (state, action: PayloadAction<any>) => {

            state.value = action.payload;
        },
    },
})

export const { template_type } = template.actions
export const template_reducer = template.reducer