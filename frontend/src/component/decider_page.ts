

import axios from "axios";
import {
  codeforces_full_question,
  codeforces_get_question_list,
  leetcode_full_question,
  leetcode_get_question_list,
} from "../keys/links";


interface DeciderOptions {
  total_question: number;
  codeforces_question: number;
  leetcode_question: number;
  codeforces_rating: number;
  leetcode_type: string;
}
interface CodeforcesProblemBrief {
  contestId: number;
  index: string;
  name: string;
}
interface LeetcodeProblemBrief {
  titleSlug: string;
}


function getRandomUniqueSet(value: number, choiceCount: number): number[] {
  if (choiceCount > value) {
    console.warn(`Warning: Requesting ${choiceCount} items, but only ${value} are available. Returning all available items.`);
    return Array.from(Array(value).keys());
  }
  const resultSet = new Set<number>();
  while (resultSet.size < choiceCount) {
    const rand = Math.floor(Math.random() * value);
    resultSet.add(rand);
  }
  return Array.from(resultSet);
}


async function decider(
  options: DeciderOptions
): Promise<{ codeforces_questions: any[]; leetcode_questions: any[] }> {
  const {
    codeforces_question: cfCount,
    codeforces_rating,
    leetcode_question: lcCount,
    leetcode_type,
  } = options;

  console.log("Decider: Starting process...");

  
  console.log("Decider: Requesting CF problem list for rating:", codeforces_rating);
  const cfListRes = await axios.post(codeforces_get_question_list, {
    rating: codeforces_rating
  });


  if (!cfListRes.data || !Array.isArray(cfListRes.data.result.problems)) {
    console.error("Decider Error: The API response for the Codeforces problem list is invalid.", cfListRes.data);
    throw new Error(`Failed to get Codeforces problem list. Backend responded with an error: ${JSON.stringify(cfListRes.data)}`);
  }

  const cfProblems: CodeforcesProblemBrief[] = cfListRes.data.result.problems;
  console.log(`Decider: Received ${cfProblems.length} CF problems from list API.`);

  if (cfProblems.length === 0) {
    throw new Error(`No Codeforces problems found for rating ${codeforces_rating}. Please try a different rating.`);
  }

  const cfIndices = getRandomUniqueSet(cfProblems.length, cfCount);



  const codeforces_array: any[] = [];
  for (let i = 0; i < cfIndices.length; i++) {
    try {
      const cfFullResponse = await axios.post(
        codeforces_full_question,
        {
          contestId: cfProblems[cfIndices[i] - 1].contestId,
          index: cfProblems[cfIndices[i] - 1].index
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      codeforces_array.push(cfFullResponse.data);
    }
    catch (err) {
      console.error(err);
    }
  }
  const codeforces_questions = codeforces_array;
  console.log(`Decider: Successfully fetched full CF questions.`);


  console.log("Decider: Requesting LC list for difficulty:", leetcode_type);
  const lcListRes = await axios.post(leetcode_get_question_list, {
    difficulty: leetcode_type
  });


  if (!lcListRes.data || !Array.isArray(lcListRes.data.unpaid)) {
    throw new Error(`Failed to get LeetCode problem list. Backend responded with an error: ${JSON.stringify(lcListRes.data)}`);
  }

  const lcProblems: LeetcodeProblemBrief[] = lcListRes.data.unpaid;
  console.log(`Decider: Received ${lcProblems.length} LC problems from list API.`);

  if (lcProblems.length === 0) {
    throw new Error(`No LeetCode problems found for difficulty "${leetcode_type}". Please check the spelling (e.g., Easy, Medium, Hard).`);
  }

  const lcIndices = getRandomUniqueSet(lcProblems.length, lcCount);
  const selectedLcBriefs = lcIndices.map((i) => lcProblems[i]);

  console.log(`Decider: Requesting full details for ${selectedLcBriefs.length} LC problems.`);
  const lcFullPromises = selectedLcBriefs.map((brief) =>
    axios.post(leetcode_full_question, { titleSlug: brief.titleSlug })
      .then(res => res.data)
  );
  const leetcode_questions = await Promise.all(lcFullPromises);
  console.log(`Decider: Successfully fetched ${leetcode_questions.length} full LC questions.`);

  return { codeforces_questions, leetcode_questions };
}

export default decider;