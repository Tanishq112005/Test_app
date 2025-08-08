import QuestionDisplay from '../test_page/questiondisplay';
import Editor_page from './Editior_page';
import Link_generator from './link_generator';
import Question_solved_or_not from './question_solved_or_not';
import QuestionDataLoader from './QuestionDataLoader'; // Import the new logic component

function Main_content_page() {
  return (
    <div className="main-content">
      {/* 
        This component is now "headless". It doesn't render any HTML, 
        but its internal useEffect hook will run and manage loading the 
        question data into the Redux store.
      */}
      <QuestionDataLoader />

      <div className="question-panel">
        <QuestionDisplay />
      </div>

      <div className="right-column">
        <div className="editor-panel">
          <div className="editor-placeholder">
             <Editor_page />
          </div>
        </div>
        <div className="bottom-panel">
          <Link_generator /> 
          <Question_solved_or_not />
        </div>
      </div>
    </div>
  );
}

export default Main_content_page;