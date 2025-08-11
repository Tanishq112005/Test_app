import Nav_bar from "./nav_bar";
import Side_bar from "./side_bar";
import MainContent from "./maincontent";
// Import useRef to track if the user was ever in fullscreen
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux_state_manegemet/store";
import { question_page_type } from "../redux_state_manegemet/question_contest";
import { sample_test_type } from "../redux_state_manegemet/sample_test_case";
import './test_page.css'
import parseSamplesFromHtml from "./test_case_praser";
import { question_file_making } from "./Codeeditor/question_file";
import { submission_type } from "../redux_state_manegemet/submission_button";
import { useNavigate } from "react-router";
import EndTestConfirmationModal from './EndTestConfirmationModal'
import Timer_complete from "./timer_complete";

import { full_screen } from "../redux_state_manegemet/full_screen";
import { test_endup } from "../redux_state_manegemet/test_end_up";
import Test_End_Up from "./test_endup";

function Test_page() {
  const cfQuestions = useSelector((s: RootState) => s.codeforcesquestion.value);
  const lcQuestions = useSelector((s: RootState) => s.leetcodequestionlist.value);
  const questionNumber = useSelector((s: RootState) => s.question_is_on.value);
  
  const isSubmissionModalVisible = useSelector((s: RootState) => s.submission_button.value);
  const timer_complete = useSelector((s: RootState) => s.timer_complete.value);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const test_endup_value = useSelector((s: RootState) => s.test_endup.value);
  const full_screen_value = useSelector((s: RootState) => s.full_screen.value);
  
  const hasBeenFullscreen = useRef(full_screen_value);
  const hasBeenVisible = useRef(!document.hidden); 

  question_file_making((cfQuestions.length + lcQuestions.length));

  useEffect(() => {
    if (!Array.isArray(cfQuestions) || !Array.isArray(lcQuestions)) {
      return;
    }
    const cfCount = cfQuestions.length;
    const index = questionNumber - 1;
    let questionHtml;
    let sampleTestCase;
    if (index < cfCount) {
      const question = cfQuestions[index];
      if (question) {
        questionHtml = question.statementHTML;
        if (Array.isArray(question.samples)) {
          sampleTestCase = question.samples.map((sample: any) => ({
            input: sample.input,
            expectedOutput: sample.output,
          }));
        }
      }
    } else {
      const lcIndex = index - cfCount;
      if (lcIndex >= 0 && lcIndex < lcQuestions.length) {
        const question = lcQuestions[lcIndex];
        if (question) {
          questionHtml = question.descriptionHtml;
          if (typeof question.sampleTestCase === 'string') {
            sampleTestCase = parseSamplesFromHtml(question.descriptionHtml);
          }
        }
      }
    }
    if (questionHtml) {
      dispatch(question_page_type(questionHtml));
      dispatch(sample_test_type(sampleTestCase));
    }
  }, [cfQuestions, lcQuestions, questionNumber, dispatch]);
  

  useEffect(() => {
    if (full_screen_value) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen().catch(err => console.log(err));
      }
   
    }
  }, [full_screen_value]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
 
        if (hasBeenVisible.current) {
          console.log("User switched tabs. Ending the test.");
          dispatch(test_endup(true));
        }
      } else {
    
        hasBeenVisible.current = true;
      }
    };

    
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleFullscreenChange = () => {
      const isFullscreenNow = document.fullscreenElement !== null;
      
      if (isFullscreenNow) {
     
        hasBeenFullscreen.current = true;
      } else {
    
        if (hasBeenFullscreen.current) {
       
          console.log("Exited fullscreen. Ending the test.");
          dispatch(test_endup(true));
        }
      }
   
      dispatch(full_screen(isFullscreenNow));
    };

   
    document.addEventListener('fullscreenchange', handleFullscreenChange);


    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch]);




  const handleConfirmSubmission = () => {
    navigate("/summary_page");
    dispatch(submission_type(false));
  };

  const handleCancelSubmission = () => {
    dispatch(submission_type(false));
  };

  return (
    <div className="test-page-container">
      
      {test_endup_value && <Test_End_Up />}

      {!test_endup_value && (
        <>
          <Nav_bar />
          <div className="main-body">
            <Side_bar />
            <MainContent />
          </div>

          {isSubmissionModalVisible && (
            <EndTestConfirmationModal
              onConfirm={handleConfirmSubmission}
              onCancel={handleCancelSubmission}
            />
          )}

          {timer_complete && <Timer_complete />}
        </>
      )}
    </div>
  );
}

export default Test_page;