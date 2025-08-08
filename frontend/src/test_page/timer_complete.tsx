import { useNavigate } from "react-router";
import { useEffect } from "react";
import './timer_complete.css';

function Timer_complete() {
    const navigate = useNavigate();

    useEffect(() => {
     
        const timerId = setTimeout(() => {
            navigate("/summary_page");
        }, 2500);

        
        return () => clearTimeout(timerId);
    }, [navigate]);

    return (
        <div className="timer-complete-overlay">
            <div className="timer-complete-modal">
                <h2>Time's Up!</h2>
                <p>Your test time is complete. Redirecting to the summary page...</p>
            </div>
        </div>
    );
}

export default Timer_complete;