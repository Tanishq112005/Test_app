
import './test__endup.css'; 
import { useNavigate } from 'react-router';

function Test_End_Up() {
    const navigate = useNavigate() ;
  return (
    
    <div className="modal-overlay">
      
      <div className="modal-box">
        <h2>Test Terminated</h2>
        <p>Your test has ended because you exited full-screen mode or You Switch The Tab.</p>
        <p>This is considered a violation of the test rules.</p>
        
        <button 
          className="modal-button" 
          onClick={() => {
            navigate("/summary_page")
          }}>
          View Summary
        </button>
      </div>
    </div>
  );
}

export default Test_End_Up;