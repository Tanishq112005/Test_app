// src/pages/SummaryPage.tsx

import React from 'react';
import './SummaryPage.css'; // The new CSS file is below

import Side_bar from '../test_page/side_bar'; // Using your new sidebar
import QuestionDisplay from '../test_page/questiondisplay';
import Editor_page from './Editior_page';
import Link_generator from './link_generator';
import Question_solved_or_not from './question_solved_or_not';
import Result_Saving from './submit_button_clicking';
import link_generator from './link_generator';

function SummaryPage() {
  const link : any= link_generator();

  return (
    <div className="summary-page-container">
      <header className="summary-header">
        <h1>Contest Review</h1>
        <Result_Saving />
      </header>

      <div className="summary-main-content">
        {/* Column 1: Sidebar */}
        <div className="summary-sidebar">
          <Side_bar />
        </div>

        <div className="summary-question-panel">
          <QuestionDisplay />
        </div>

        {/* Column 3: Editor and Controls */}
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
