// src/components/Question_solved_or_not.tsx

import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux_state_manegemet/store";
import { question_list_type } from "../redux_state_manegemet/question_list";


function Question_solved_or_not() {
  const dispatch = useDispatch<AppDispatch>();

  // Global state from Redux
  const question_is_on = useSelector((s: RootState) => s.question_is_on.value);
  const codeforces_quesion = useSelector((s: RootState) => s.codeforcesquestion.value);
  const question_results = useSelector((s: RootState) => s.question_list.value);


  const [solved, setSolved] = useState<number | null>(null);

 
  useEffect(() => {
    const currentQuestionResult = question_results.find(
      (q) => q.question_number === question_is_on
    );

    if (currentQuestionResult) {
      setSolved(currentQuestionResult.question_solved);
    } else {
      setSolved(null); // Reset if no result is found for the new question
    }
  }, [question_is_on, question_results]);



  const handleSolveClick = (solveStatus: number) => {
    // Update local state for immediate visual feedback
    setSolved(solveStatus);

    // Determine the question type
    let type = (question_is_on - 1 < codeforces_quesion.length) ? "codeforces" : "leetcode";

    // Dispatch the result to the global Redux store
    dispatch(question_list_type({
      question_number: question_is_on,
      question_type: type,
      question_solved: solveStatus
    }));
  }

  return (
    <div className="solve-status-container">
      <p>Did you pass all test cases?</p>
      <div className="solve-buttons">
        <button
          className={`solve-btn solved ${solved === 1 ? 'active' : ''}`}
          onClick={() => handleSolveClick(1)}>
          ✓ Solved
        </button>
        <button
          className={`solve-btn failed ${solved === 0 ? 'active' : ''}`}
          onClick={() => handleSolveClick(0)}>
          ✗ Failed
        </button>
      </div>
    </div>
  );
}

export default Question_solved_or_not;