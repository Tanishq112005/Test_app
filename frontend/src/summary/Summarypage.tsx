
import './SummaryPage.css'; 

import Side_bar from '../test_page/side_bar'; 
import QuestionDisplay from '../test_page/questiondisplay';
import Editor_page from './Editior_page';
import Question_solved_or_not from './question_solved_or_not';
import Result_Saving from './submit_button_clicking';
import link_generator from './link_generator';
import QuestionDataLoader from './QuestionDataLoader';

function SummaryPage() {
  const link : any= link_generator();

  return (
    <div className="summary-page-container">
      <header className="summary-header">
        <h1>Contest Review</h1>
        <Result_Saving />
      </header>

      <div className="summary-main-content">
      <QuestionDataLoader></QuestionDataLoader>
        <div className="summary-sidebar">
          <Side_bar />
        </div>

        <div className="summary-question-panel">
          <QuestionDisplay />
        </div>

       
        <section className="summary-editor-panel">
          <div className="editor-wrapper">
            <Editor_page />
          </div>
          <div className="editor-footer">
            <div className="problem-link-container">
              <strong>Problem Link:</strong>
              <a href={link} target="_blank" rel="noopener noreferrer">
   Problem-Link
</a>

            </div>
            <Question_solved_or_not />
          </div>
        </section>
      </div>
    </div>
  );
}

export default SummaryPage;
