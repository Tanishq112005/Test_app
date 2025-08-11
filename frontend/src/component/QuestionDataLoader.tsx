

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux_state_manegemet/store";
import { question_page_type } from "../redux_state_manegemet/question_contest";
import { sample_test_type } from "../redux_state_manegemet/sample_test_case";
import parseSamplesFromHtml from "../test_page/test_case_praser"; // Adjust path if needed


function QuestionDataLoader() {
  const dispatch = useDispatch<AppDispatch>();

  
  const cfQuestions = useSelector((s: RootState) => s.codeforcesquestion.value);
  const lcQuestions = useSelector((s: RootState) => s.leetcodequestionlist.value);
  const questionNumber = useSelector((s: RootState) => s.question_is_on.value);

 
  useEffect(() => {
    // Ensure data is loaded before proceeding
    if (!Array.isArray(cfQuestions) || !Array.isArray(lcQuestions)) {
      return;
    }

    const cfCount = cfQuestions.length;
    const index = questionNumber - 1;

    let questionHtml;
    let sampleTestCase;

    // Logic to find the current question's data
    if (index < cfCount) {
      const question = cfQuestions[index];
      if (question) {
        questionHtml = question.statementHTML;
        if (Array.isArray(question.samples)) {
          sampleTestCase = question.samples.map((sample: any) => ({
            input: sample.input,
            expectedOutput: sample.output,
          }));
        }
      }
    } else {
      const lcIndex = index - cfCount;
      if (lcIndex >= 0 && lcIndex < lcQuestions.length) {
        const question = lcQuestions[lcIndex];
        if (question) {
          questionHtml = question.descriptionHtml;
          // You might not have sampleTestCase for LeetCode in the same format
          // Here we parse it from the HTML
          if (typeof question.descriptionHtml === 'string') {
            sampleTestCase = parseSamplesFromHtml(question.descriptionHtml);
          }
        }
      }
    }

    // Dispatch the found data to Redux.
    // If the question is not found, it might be good to dispatch a "not found" state.
    if (questionHtml) {
      dispatch(question_page_type(questionHtml));
      if (sampleTestCase) {
        dispatch(sample_test_type(sampleTestCase));
      }
    }
  }, [cfQuestions, lcQuestions, questionNumber, dispatch]);

  // This component renders nothing.
  return null;
}

export default QuestionDataLoader;