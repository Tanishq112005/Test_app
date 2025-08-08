import { useDispatch, useSelector } from "react-redux";
import {type AppDispatch, type RootState } from "../redux_state_manegemet/store";
import { useEffect } from "react";
import {  question_page_type } from "../redux_state_manegemet/question_contest";
import { sample_test_type } from "../redux_state_manegemet/sample_test_case";

function Question_sample_test_case() {
    const codeforces_question_list = useSelector((s : RootState) => s.codeforcesquestion.value) ; 
    const leetcode_question_list = useSelector((s : RootState) => s.leetcodequestionlist.value) ;
    let value : number = useSelector((s : RootState) => s.question_is_on.value) ;
    value -- ;  
    const dispatch = useDispatch<AppDispatch>() ; 
     let question : any ; 
     let sample_test_case : any ; 
    useEffect(() => {
      if(value < codeforces_question_list.length){
        question = codeforces_question_list.statementHTML ; 
        sample_test_case = codeforces_question_list.samples;
      }
      else {
        question = leetcode_question_list.descriptionHtml ; 
        sample_test_case = leetcode_question_list.sampleTestCase ; 
      }
     
      dispatch(question_page_type(question));
      dispatch(sample_test_type(sample_test_case)) ; 
      
    } , [value])
  
    return null ; 
}

export default Question_sample_test_case 