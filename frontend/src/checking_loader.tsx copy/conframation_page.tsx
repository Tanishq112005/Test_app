import  { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../redux_state_manegemet/store';
import Coading_language from '../test_page/Codeeditor/Coding'; // <-- keep this import
import { useNavigate } from 'react-router';
import { full_screen } from '../redux_state_manegemet/full_screen';

const ScreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
);
const IntegrityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);
const TimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const FullScreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
);
const FileCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m9 15 2 2 4-4"></path></svg>
);

const RuleItem = ({ icon, title, children } : any) => (
  <div className="rule-item">
    <div className="rule-icon">{icon}</div>
    <div className="rule-content">
      <h3>{title}</h3>
      <div className="rule-desc">{children}</div>
    </div>
  </div>
);

function ConfirmationPage() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const contestDuration = useSelector((s: RootState) => s.total_duration.value);
  const dispatch = useDispatch<AppDispatch>();
  const enterFullScreen = () => {
    dispatch(full_screen(true));
  };

  const handleStartContest = () => {
    if (agreed) {
      enterFullScreen();
      alert('Your Contest Is Starting');
      navigate('/loader_to_timer');
    }
  };

  return (
    <div className="confirmation-container">
      <header className="confirmation-header">
        <h1>Contest Rules & Integrity Agreement</h1>
        <p>
          Please read the following rules carefully before you begin. Adherence to these rules ensures a fair and equitable environment for all participants.
        </p>
      </header>

      <main>
        <div className="rules-grid">
          <RuleItem icon={<FullScreenIcon />} title="Mandatory Full-Screen">
            <p>To ensure a focused environment, the contest will <strong>automatically enter full-screen mode</strong> upon starting. Exiting full-screen will immediately end your session.</p>
          </RuleItem>

          <RuleItem icon={<ScreenIcon />} title="Environment & Monitoring">
            <p>Your screen will be monitored. Do <strong>not</strong> switch tabs, minimize the window, or open any other applications. Leaving the contest window will end your session.</p>
          </RuleItem>

          <RuleItem icon={<IntegrityIcon />} title="Academic Integrity">
            <p>This is an individual assessment. You must <strong>not</strong> collaborate, share solutions, or use external resources (e.g., other people, websites like Stack Overflow, or AI code generators). All work must be your own.</p>
          </RuleItem>

          <RuleItem icon={<TimeIcon />} title="Time Limit & Submission">
            <p>The contest has a strict time limit of <strong>{contestDuration} minutes</strong>. Your code will be automatically submitted when the timer expires.</p>
          </RuleItem>

          <RuleItem icon={<FileCheckIcon />} title="AI Evaluation & Post-Contest Summary">
            <p>Your solution will be evaluated by an AI assistant. After the contest, a summary page will be available with your results, the AI's feedback, and a link to the question. If you believe the AI's analysis is incorrect, you may flag it for review.</p>
          </RuleItem>

          {/* Moved language selector to be the LAST item in the grid */}
          <RuleItem icon={<CodeIcon />} title="Language & Allowed Resources">
            <p>Please select your preferred language below. You may only use the built-in code editor. Do not use any external devices.</p>
            <div >
              <Coading_language />
            </div>
          </RuleItem>
        </div>

        <div className="declaration-section">
          <label htmlFor="declaration" className="confirmation-checkbox-container">
            <input
              type="checkbox"
              id="declaration"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <div className="custom-checkbox">
              <div className="checkmark" />
            </div>
            <span className="declaration-label">
              I have read, understood, and agree to abide by all the contest rules.
            </span>
          </label>
        </div>
      </main>

      <footer>
        <button
          className="start-button"
          disabled={!agreed}
          onClick={handleStartContest}
        >
          {agreed ? 'Start Contest' : 'Agree to Rules to Start'}
        </button>
      </footer>
    </div>
  );
}

export default ConfirmationPage;
