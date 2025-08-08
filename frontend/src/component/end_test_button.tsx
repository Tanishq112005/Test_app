import React from 'react';
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../redux_state_manegemet/store";
import { submission_type } from "../redux_state_manegemet/submission_button";

function End_test_button() {
    const dispatch = useDispatch<AppDispatch>();
    
    const handleEndTestClick = () => {
       
        dispatch(submission_type(true)); 
    };

    return (
        <div>
            <button onClick={handleEndTestClick} className="end-test-btn">
                End Test
            </button>
        </div>
    );
}

export default End_test_button;