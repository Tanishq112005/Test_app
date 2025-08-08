import React from 'react';
import './test_page.css'; 


type ConfirmationModalProps = {
  onConfirm: () => void; 
  onCancel: () => void;  
};

function EndTestConfirmationModal({ onConfirm, onCancel }: ConfirmationModalProps) {
  return (
   
    <div className="modal-overlay">
     
      <div className="confirmation-modal">
        <h2>End Test?</h2>
        <p>Are you sure you want to submit your test? This action cannot be undone.</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="modal-btn cancel-btn">
            No, Continue
          </button>
          <button onClick={onConfirm} className="modal-btn confirm-btn">
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndTestConfirmationModal;