import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux_state_manegemet/store";
import { question_page_type } from "../redux_state_manegemet/question_contest";

/**
 * A non-visual, "headless" component responsible for loading the correct
 * question data into the Redux store whenever the active question number changes.
 */
function QuestionDataLoader() {
  const dispatch = useDispatch<AppDispatch>();

  // Get all necessary data from the Redux store
  const cfQuestions = useSelector((s: RootState) => s.codeforcesquestion.value);
  const lcQuestions = useSelector((s: RootState) => s.leetcodequestionlist.value);
  const questionNumber = useSelector((s: RootState) => s.question_is_on.value);

  useEffect(() => {
    // Ensure data arrays are loaded before proceeding
    if (!Array.isArray(cfQuestions) || !Array.isArray(lcQuestions)) {
      console.log("Waiting for question lists to load...");
      return;
    }

    const cfCount = cfQuestions.length;
    const index = questionNumber - 1; // Convert 1-based question number to 0-based index

    let questionHtml: string | undefined;

    // Logic to find the current question's HTML
    if (index < cfCount) {
      // It's a Codeforces question
      const question = cfQuestions[index];
      if (question) {
        questionHtml = question.statementHTML;
      }
    } else {
      // It's a LeetCode question
      const lcIndex = index - cfCount;
      if (lcIndex >= 0 && lcIndex < lcQuestions.length) {
        const question = lcQuestions[lcIndex];
        if (question) {
          questionHtml = question.descriptionHtml;
        }
      }
    }

    // Dispatch the found HTML to the store.
    // If no question is found, dispatch an empty string or a "not found" message.
    dispatch(question_page_type(questionHtml || "<p>Question not found.</p>"));

  }, [cfQuestions, lcQuestions, questionNumber, dispatch]); // This effect re-runs when the question number changes

  // This component does not render anything to the DOM
  return null;
}

export default QuestionDataLoader;