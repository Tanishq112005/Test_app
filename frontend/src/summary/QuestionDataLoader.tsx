import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux_state_manegemet/store";
import { question_page_type } from "../redux_state_manegemet/question_contest";

function QuestionDataLoader() {
  const dispatch = useDispatch<AppDispatch>();

  // Get all necessary data from the Redux store
  const cfQuestions = useSelector((s: RootState) => s.codeforcesquestion.value);
  const lcQuestions = useSelector((s: RootState) => s.leetcodequestionlist.value);
  const questionNumber = useSelector((s: RootState) => s.question_is_on.value);

  useEffect(() => {
  
    if (!Array.isArray(cfQuestions) || !Array.isArray(lcQuestions)) {
    
      return;
    }

    const cfCount = cfQuestions.length;
    const index = questionNumber - 1; 

    let questionHtml: string | undefined;

  
    if (index < cfCount) {
     
      const question = cfQuestions[index];
      if (question) {
        questionHtml = question.statementHTML;
      }
    } else {
     
      const lcIndex = index - cfCount;
      if (lcIndex >= 0 && lcIndex < lcQuestions.length) {
        const question = lcQuestions[lcIndex];
        if (question) {
          questionHtml = question.descriptionHtml;
        }
      }
    }

    

    dispatch(question_page_type(questionHtml || "<p>Question not found.</p>"));

  }, [ questionNumber , dispatch]); 

  
  return null;
}

export default QuestionDataLoader;