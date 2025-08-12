
import { useSelector } from "react-redux";
import type { RootState } from "../redux_state_manegemet/store";

function QuestionDisplay() {

  const questionHtml = useSelector((s : RootState) => s.question_page.value);

  return (
    <div className="question-container">
     
      {questionHtml ? (
             
             <div dangerouslySetInnerHTML={{ __html: questionHtml }} />
             
         
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}

export default QuestionDisplay;