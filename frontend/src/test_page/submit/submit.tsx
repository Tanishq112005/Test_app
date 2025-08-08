import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux_state_manegemet/store";
import { modal_type } from "../../redux_state_manegemet/modal_show_up";
import { checking_link } from "../../keys/links";


function submit_button() {
  const [message, setmessage] = useState("");
  const [question, setquestion] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [code, setcode] = useState("");
  const question_is_on = useSelector((s: RootState) => s.question_is_on.value);
  const files: any = useSelector((s: RootState) => s.files.value);
  const codeforces: any = useSelector((s: RootState) => s.codeforces_question.value);
  const leetcode: any = useSelector((s: RootState) => s.leetcodequestionlist.value);
  const u = question_is_on - 1;

  if (u < codeforces.length) {
    setquestion(codeforces[u]);
  }
  else {
    setquestion(leetcode[u]);
  }

  setcode(files[u].value);

  useEffect(() => {
    try {
      const response: any = axios.post(checking_link, {
        question: question,
        code: code
      });
      const h: any = JSON.stringify(response);
      const f = h.result;
      setmessage(f);
      dispatch(modal_type(true));
    }
    catch (err: any) {
      setmessage(err);
      dispatch(modal_type(true));
    }
  }, []);
  
  return <div className="">
    {message === "" ? (
      <div className="">
        Your Solution Is Went To The Submission , Wait For The While ... 
        </div>
    ) : (
      <div className="">
        {message}
        </div>
    )}
  </div>

}


export default submit_button; 