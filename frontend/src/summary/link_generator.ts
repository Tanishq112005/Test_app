// src/components/link_generator.tsx

import { useSelector } from "react-redux";
import type { RootState } from "../redux_state_manegemet/store";

// This component will now return a string, not JSX
function link_generator() {
    const codeforces_quesion = useSelector((s: RootState) => s.codeforcesquestion.value);
    const leecode_question = useSelector((s: RootState) => s.leetcodequestionlist.value);
    const question_is_on = useSelector((s: RootState) => s.question_is_on.value);
    
    let question_link = '#'; // Default value

    if (codeforces_quesion && leecode_question && question_is_on) {
        if ((question_is_on - 1) < codeforces_quesion.length) {
            question_link = codeforces_quesion[question_is_on - 1]?.url || '#';
        } else {
           const leetcodeIndex = question_is_on - 1 - codeforces_quesion.length;
           const title_slug = leecode_question[leetcodeIndex]?.titleSlug;
           if (title_slug) {
             question_link = `https://leetcode.com/problems/${title_slug}/description/`;
           }
        }
    }
    
    return question_link ; 

    
}

export default link_generator;