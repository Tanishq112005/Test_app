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

        if (
            !totalQuestions || !testDuration || !codeforcesQuestions ||
            !leetcodeQuestions || !codeforcesRating || !leetcodeDifficulty
        ) {
            alert("Error: Please fill out all fields before submitting.");
            console.error("Validation failed: One or more fields are empty.");
            return;
        }

        const totalNum = parseInt(totalQuestions, 10);
        const cfNum = parseInt(codeforcesQuestions, 10);
        const lcNum = parseInt(leetcodeQuestions, 10);

        // 2. Check for the minimum 1-1 requirement
        if (cfNum < 1 || lcNum < 1) {
            alert("Error: You must request at least one Codeforces and one LeetCode question.");
            console.error("Validation failed: Minimum question count not met.");
            return;
        }

        // 3. Check if the sum of parts equals the total
        if (totalNum !== cfNum + lcNum) {
            alert(`Error: The sum of Codeforces questions (${cfNum}) and LeetCode questions (${lcNum}) must equal the total number of questions (${totalNum}).`);
            console.error("Validation failed: Question counts do not add up.");
            return;
        }

        // --- End of Enhanced Validation ---


        navigate("/loader");

        // Dispatch actions to Redux store
        dispatch(total_question_changer(totalNum));
        dispatch(question_of_reducer(cfNum));
        dispatch(setcodeforces_rating(parseInt(codeforcesRating, 10)));
        dispatch(setLeetcodeQuestions_type(leetcodeDifficulty));
        dispatch(setLeetcodeQuestions_number(lcNum));
        dispatch(total_duration(parseInt(testDuration, 10)));

        const options = {
            total_question: totalNum,
            codeforces_question: cfNum,
            codeforces_rating: parseInt(codeforcesRating, 10),
            leetcode_question: lcNum,
            leetcode_type: leetcodeDifficulty,
        };

      

        try {
            const { codeforces_questions, leetcode_questions } = await decider(options);

       

            if (codeforces_questions.length < cfNum || leetcode_questions.length < lcNum) {
                alert("Could not fetch the required number of questions. Please try different criteria (e.g., a more common rating or difficulty).");
                navigate("/dashboard");
                return;
            }

            dispatch(leetcode_question_type(leetcode_questions));
            dispatch(codeforces_question_type(codeforces_questions));

            navigate("/confirmation_page");
        } catch (err) {
            console.error("!!! CRITICAL ERROR caught in handleSubmit !!!");
            console.error("The 'decider' function failed. See detailed error below:", err);
            alert("Failed to generate the test. Please check the developer console for errors and try again.");
            navigate("/dashboard");
        }
    };

    return (
        <div className="page-container">
            <form className="form-card" onSubmit={handleSubmit}>
                <h1 className="form-header">Enter Question Details</h1>
                <div className="form-body">
                    <div className="form-group">
                        <label htmlFor="totalQuestions" className="form-label">Total Number of Questions</label>
                        <input type="number" id="totalQuestions" className="form-input" placeholder="e.g., 4" value={totalQuestions} onChange={(e) => setTotalQuestions(e.target.value)} min="2" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="testDuration" className="form-label">Test Duration (minutes)</label>
                        <input type="number" id="testDuration" className="form-input" placeholder="e.g., 60" value={testDuration} onChange={(e) => setTestDuration(e.target.value)} min="1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codeforcesQuestions" className="form-label">Number of Codeforces Questions</label>
                        {/* CHANGE: Added min="1" attribute */}
                        <input type="number" id="codeforcesQuestions" className="form-input" placeholder="e.g., 2" value={codeforcesQuestions} onChange={(e) => setCodeforcesQuestions(e.target.value)} min="1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="leetcodeQuestions" className="form-label">Number of LeetCode Questions</label>
                        {/* CHANGE: Added min="1" attribute */}
                        <input type="number" id="leetcodeQuestions" className="form-input" placeholder="e.g., 2" value={leetcodeQuestions} onChange={(e) => setLeetcodeQuestions(e.target.value)} min="1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codeforcesRating" className="form-label">Codeforces Question Rating</label>
                        <input type="number" id="codeforcesRating" className="form-input" placeholder="e.g. , 1400" value={codeforcesRating} onChange={(e) => {
                            if (e.target.value === '') {
                                setCodeforcesRating('');
                                return;
                            }
                            const numericValue = parseInt(e.target.value, 10);
                            if (numericValue <= 800) {
                                setCodeforcesRating("800");
                            } else {
                                let b = Math.ceil(numericValue / 100) * 100;
                                setCodeforcesRating(b.toString());
                            }
                        }} step="100" min="800" />
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