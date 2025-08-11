
import './test_page.css'; 

function TimeUpModal() {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <h2>Time's Up!</h2>
        <p>Your allocated time for the test has expired. Redirecting to the summary page...</p>
       
      </div>
    </div>
  );
}

export default TimeUpModal;