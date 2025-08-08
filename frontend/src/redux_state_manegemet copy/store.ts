import { configureStore } from '@reduxjs/toolkit'
import questionReducer from './total_question'
import codeforcesQuestionReducer from './question_of_codeforces' 
import { leetcodereducer } from './leetcode_question'
import { codeforces_rating_reducer } from './codeforces_rating'
import { leetcode_typereducer } from './leetcode_type'
import {  total_duration_type } from './total_duration'
import { changer_reducer } from './loading_to_timer'
import { codeforces_question_reducer } from './codeforces_question'
import { leetcode_question_list_reducer } from './leetcode_question_list'
import { question_typereducer } from './question_is_on'
import { sample_test_reducer } from './sample_test_case'
import { question_page_reducer } from './question_contest'
import { code_val_reducer } from './code_val'
import { lang_reducer } from './lang'
import { template_reducer } from './template'
import { files_reducer } from './files'
import { modal_reducer } from './modal_show_up'
import { submission_button_reducer } from './submission_button'
import { timer_complete_reducer } from './timer_complete'
import { full_screen, full_screen_reducer } from './full_screen'
import { test_endup_reducer } from './test_end_up'
import { user_inforamtion_reducer } from './user_information'
import { question_list_reducer } from './question_list'



export const store = configureStore({
  reducer: {
    question: questionReducer,
    codeforces_question: codeforcesQuestionReducer,
    leetcodequestion : leetcodereducer , 
    codeforces_rating : codeforces_rating_reducer , 
    leetcodequestion_type : leetcode_typereducer ,
    total_duration : total_duration_type , 
    changer : changer_reducer , 
    codeforcesquestion : codeforces_question_reducer,
    leetcodequestionlist : leetcode_question_list_reducer , 
    question_is_on : question_typereducer , 
    question_page : question_page_reducer  , 
    sample_test : sample_test_reducer , 
    code_val : code_val_reducer , 
    lang : lang_reducer ,
    template : template_reducer , 
    files : files_reducer , 
    modal : modal_reducer , 
    submission_button : submission_button_reducer  , 
    timer_complete : timer_complete_reducer  ,
    full_screen : full_screen_reducer , 
    test_endup : test_endup_reducer  ,
    user_inforamtion : user_inforamtion_reducer , 
    question_list : question_list_reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
