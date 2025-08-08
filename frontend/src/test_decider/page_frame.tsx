import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../redux_state_manegemet/store';
import { total_question_changer } from '../redux_state_manegemet/total_question';
import { question_of_reducer } from '../redux_state_manegemet/question_of_codeforces';
import { setLeetcodeQuestions_number } from '../redux_state_manegemet/leetcode_question';
import { setcodeforces_rating } from '../redux_state_manegemet/codeforces_rating';
import { setLeetcodeQuestions_type } from '../redux_state_manegemet/leetcode_type';
import { total_duration } from '../redux_state_manegemet/total_duration';
import decider from '../component/decider_page';
import { leetcode_question_type } from '../redux_state_manegemet/leetcode_question_list';
import { codeforces_question_type } from '../redux_state_manegemet/codeforces_question';
import { useNavigate } from 'react-router';

function PageFrame() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [totalQuestions, setTotalQuestions] = useState('');
    const [testDuration, setTestDuration] = useState('');
    const [codeforcesQuestions, setCodeforcesQuestions] = useState('');
    const [leetcodeQuestions, setLeetcodeQuestions] = useState('');
    const [codeforcesRating, setCodeforcesRating] = useState('');
    const [leetcodeDifficulty, setLeetcodeDifficulty] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("--- Form submitted. Starting handleSubmit. ---");

        if (
            !totalQuestions || !testDuration || !codeforcesQuestions ||
            !leetcodeQuestions || !codeforcesRating || !leetcodeDifficulty
        ) {
            alert("Error: Please fill out all fields before submitting.");
            console.error("Validation failed: One or more fields are empty.");
            return;
        }

        navigate("/loader");


        dispatch(total_question_changer(parseInt(totalQuestions)));
        dispatch(question_of_reducer(parseInt(codeforcesQuestions)));
        dispatch(setcodeforces_rating(parseInt(codeforcesRating)));
        dispatch(setLeetcodeQuestions_type(leetcodeDifficulty));
        dispatch(setLeetcodeQuestions_number(parseInt(leetcodeQuestions)));
        dispatch(total_duration(parseInt(testDuration)));


        const options = {
            total_question: parseInt(totalQuestions),
            codeforces_question: parseInt(codeforcesQuestions),
            codeforces_rating: parseInt(codeforcesRating),
            leetcode_question: parseInt(leetcodeQuestions),
            leetcode_type: leetcodeDifficulty,
        };

        console.log("Calling decider function with these options:", options);

        try {
            const { codeforces_questions, leetcode_questions } = await decider(options);
            
            console.log("Decider function successful. Received questions.");

    
            if (codeforces_questions.length === 0 || leetcode_questions.length === 0) {
                alert("Could not fetch the required number of questions. Please try different criteria (e.g., a more common rating or difficulty).");
                navigate("/");
                return;
            }

            dispatch(leetcode_question_type(leetcode_questions));
            dispatch(codeforces_question_type(codeforces_questions));

            navigate("/confirmation_page");
        }
        catch (err) {
            console.error("!!! CRITICAL ERROR caught in handleSubmit !!!");
            console.error("The 'decider' function failed. See detailed error below:", err);
            alert("Failed to generate the test. Please check the developer console for errors and try again.");
            navigate("/");
        }
    };

    return (
        <div className="page-container">
            <form className="form-card" onSubmit={handleSubmit}>
                <h1 className="form-header">Enter Question Details</h1>
                <div className="form-body">
                  
                    <div className="form-group">
                        <label htmlFor="totalQuestions" className="form-label">Total Number of Questions</label>
                        <input type="number" id="totalQuestions" className="form-input" placeholder="e.g., 4" value={totalQuestions} onChange={(e) => setTotalQuestions(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="testDuration" className="form-label">Test Duration (minutes)</label>
                        <input type="number" id="testDuration" className="form-input" placeholder="e.g., 60" value={testDuration} onChange={(e) => setTestDuration(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codeforcesQuestions" className="form-label">Number of Codeforces Questions</label>
                        <input type="number" id="codeforcesQuestions" className="form-input" placeholder="e.g., 2" value={codeforcesQuestions} onChange={(e) => setCodeforcesQuestions(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="leetcodeQuestions" className="form-label">Number of LeetCode Questions</label>
                        <input type="number" id="leetcodeQuestions" className="form-input" placeholder="e.g., 2" value={leetcodeQuestions} onChange={(e) => setLeetcodeQuestions(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codeforcesRating" className="form-label">Codeforces Question Rating</label>
                        <input type="number" id="codeforcesRating" className="form-input" placeholder="e.g., 1400" value={codeforcesRating} onChange={(e) => setCodeforcesRating(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="leetcodeDifficulty" className="form-label">LeetCode Question Difficulty</label>
                        <input type="text" id="leetcodeDifficulty" className="form-input" placeholder="e.g., Easy, Medium" value={leetcodeDifficulty} onChange={(e) => setLeetcodeDifficulty(e.target.value)} />
                    </div>
                    <button type="submit" className="submit-button">Generate Test</button>
                </div>
            </form>
        </div>
    );
}

export default PageFrame;