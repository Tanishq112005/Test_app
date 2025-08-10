// src/components/Result_Saving.tsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { AppDispatch, RootState } from "../redux_state_manegemet/store";
import { user_information_changer } from "../redux_state_manegemet/user_information";
import { saving_contest, validating_auth_token } from "../keys/links";

/**
 * This component is responsible for the final "Submit Contest" button.
 * It opens a confirmation modal and handles the logic for sending all
 * contest data to the backend upon confirmation.
 */
function Result_Saving() {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Select all necessary data from the Redux store
  const question_list = useSelector((s: RootState) => s.question_list.value);
  const total_duration = useSelector((s: RootState) => s.total_duration.value);
  const codeforces_rating = useSelector((s: RootState) => s.codeforces_rating.value);
  const leetcode_rating = useSelector((s: RootState) => s.leetcodequestion_type.value);
  const codeforces_quesion = useSelector((s: RootState) => s.codeforcesquestion.value);
  const leetcode_question = useSelector((s: RootState) => s.leetcodequestionlist.value);


  async function for_saving_data() {
    const authtoken = localStorage.getItem('authToken');
    if (!authtoken) {
      alert("Authentication token not found. Please log in again.");
      return;
    }

    try {
      // 1. Validate the auth token with the backend
      const validationResponse = await axios.post(validating_auth_token, { authtoken });
      const validationMsg = validationResponse.data; // Assuming backend sends JSON directly

      if (validationMsg.msg === "Valid Auth") {
        // 2. Decode token to get user info
        const decoded_auth: any = jwtDecode(authtoken);
        const { name, email } = decoded_auth;

        // 3. Process results to get solved counts
        let solved_codeforces = 0;
        let solved_leetcode = 0;
        question_list.forEach(q => {
          if (q.question_type === "codeforces" && q.question_solved === 1) {
            solved_codeforces++;
          } else if (q.question_type === "leetcode" && q.question_solved === 1) {
            solved_leetcode++;
          }
        });
         let f = codeforces_quesion.length + leetcode_question.length ;
         const now = new Date();
         const year = now.getFullYear();
         const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(now.getDate()).padStart(2, '0'); 
         const formattedDate = `${year}-${month}-${day}`; 
        
        const dataSendingResponse = await axios.post(saving_contest, {
          name,
          email,
          time_duration: total_duration,
          rating_codeforces: codeforces_rating,
          rating_leetcode: leetcode_rating,
          codeforces_question: codeforces_quesion.length,
          leetcode_question: leetcode_question.length,
          solved_codeforces_question: solved_codeforces,
          solved_leetcode_question: solved_leetcode ,
          total_question : f ,
          date : formattedDate
        });
        
        // 5. Handle success, update user info in Redux, and navigate
        const result = dataSendingResponse.data;
        dispatch(user_information_changer(result.user));
        navigate("/dashboard");

      } else {
        alert("Authentication failed. Please log in again.");
      }
    } catch (err: any) {
      console.error("Error saving data:", err);
      alert(`An error occurred: ${err.response?.data?.message || err.message}`);
    }
  }

  return (
    <div className="result-saving-container">
      <button className="submit-contest-btn" onClick={() => setModal(true)}>
        Submit Contest
      </button>

      {/* --- The Modal, conditionally rendered --- */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Submission</h3>
            <p>Are you sure you want to finalize and submit your contest results? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-confirm"
                onClick={async () => {
                  await for_saving_data();
                  setModal(false); // Close modal after action
                }}>
                Yes, Submit
              </button>
              <button
                className="modal-btn modal-btn-cancel"
                onClick={() => setModal(false)}>
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Result_Saving;