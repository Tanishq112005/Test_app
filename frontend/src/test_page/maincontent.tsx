

import MonacoEditorComponent from './Codeeditor/Codeeditor';
import QuestionDisplay from './questiondisplay';
import TestCases from './testcase';

function MainContent() {
  return (

    <div className="main-content">


      <div className="question-panel">
        <QuestionDisplay />
      </div>


      <div className="right-column">

        <div className="editor-panel">
          <div className="editor-placeholder">
             <MonacoEditorComponent></MonacoEditorComponent>
          </div>
        </div>

        <div className="bottom-panel">
          <TestCases />
        </div>
      </div>

    </div>
  );
}

export default MainContent;