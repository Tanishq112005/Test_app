import { GoogleGenAI } from "@google/genai";
import { google_api_key } from "./keys";

const ai = new GoogleGenAI({
  apiKey: google_api_key,
});


function buildPrompt(questionContext: string, code: string): string {
  return `
You are a world-class, strict programming judge. Your task is to analyze a C++ code submission against a problem description and determine if the code is correct.

**Your analysis process MUST follow these steps in order:**

1.  **Check for Implementation:** First, and most importantly, verify that the code actually implements the logic required by the problem. The code MUST read input, perform relevant calculations, and print output in the specified format. **If the code is empty, a simple template, or does not attempt to solve the problem, it is an automatic and immediate failure.**

2.  **Check for Correctness:** If the code is a genuine attempt, analyze its logic. Check for correctness, off-by-one errors, incorrect algorithms, and edge cases based on the problem's constraints.

This is the problem description and its constraints:
---
${questionContext}
---

And here is the C++ code submitted for it:
---
${code}
---

And by giving the your answer first check the contraints properly of the code with the timelimit and input sixe also 

**Your response MUST follow one of these two formats EXACTLY:**

A.  If the code is a correct solution that passes all test cases, respond with a single word:
true

B.  If the code is incorrect for ANY reason (including being an empty template, not reading input, or having a logical flaw), respond with the word "false", followed by a newline, and then provide a single, concrete test case or reason for the failure.

**Example of a response for a non-attempt:**
false
Reason: The submitted code is just an empty template. It does not read any input or implement the required logic to find the minimum and maximum possible values for d_i.

**Example of a response for a logical error:**
false
Input:
n = 4
a = [10, 20, 30, 40]
b = [22, 33, 33, 55]

Your Code's Output:
d_min = [12, 2, 3, 10]
d_max = [20, 13, 3, 15]

Expected Output:
d_min = [12, 2, 3, 15]
d_max = [23, 13, 3, 15]

Do NOT provide any other explanation.
`;
}

async function ai_testing(req: any, res: any) {
  const { question, code } = req.body;

  if (!question || !code || !question.descriptionHtml) {
    return res.status(400).json({ Error: "Missing 'question' or 'code' in request body." });
  }

  const plainTextDescription = question.descriptionHtml.replace(/<[^>]*>/g, ' ').replace(/\s\s+/g, ' ').trim();
  const fullQuestionContext = `
Problem Title: ${question.titleSlug}
Problem Description:
${plainTextDescription}
Sample Test Case from Problem:
Input: ${question.sampleTestCase}
`;

  console.log("--- Sending to AI (v2 Prompt) ---");
  const prompt = buildPrompt(fullQuestionContext, code);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    const resultText = response.text?.trim() || "AI did not provide a valid response.";
    return res.json({ result: resultText });

  } catch (err: any) {
    console.error("GenAI error:", err);
    return res.status(500).json({
      Error: {
        message: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
      }
    });
  }
}

export default ai_testing;