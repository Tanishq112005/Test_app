
import { useDispatch, useSelector } from "react-redux";
import {type AppDispatch, type RootState } from "../redux_state_manegemet/store";
import {  setquestion_is_on_type } from "../redux_state_manegemet/question_is_on";


function Side_bar() {
  const dispatch = useDispatch < AppDispatch > ();
  const total_question = useSelector((S : RootState) => S.question.value);
  const currentQuestion = useSelector((s : RootState) => s.question_is_on.value);

  const questionButtons = [];
  for (let i = 1; i <= total_question; i++) {
  
    const isActive = i === currentQuestion;
    questionButtons.push(
      <button 
        key={i}
   
        className={`question-nav-btn ${isActive ? 'active' : ''}`}
        onClick={() => {
          dispatch(setquestion_is_on_type(i));
        }} 
      >
        {i}
      </button>
    );
  }

  return (
    <div className="side-bar">
      <div className="question-palette">
        {questionButtons}
      </div>
    </div>
  );
}

export default Side_bar;