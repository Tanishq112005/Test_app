import axios from "axios";
import { port_number } from "./keys";
import bodyParser from "body-parser";
import puppeteer from "puppeteer-core";
import ai_testing from "./ai";
import { mongo_db_connect } from "./database/database";
import { login } from "./database/login";
import { new_user } from "./database/insert_new_user";
import adding_contest_information from "./database/adding_contest";
import { user_details_getting } from "./database/userdetails";
import { validating } from "./validating";
import { forgot_password, verification_password } from "./forgot_password";
import { mongo_db_connect_password } from "./database/password";
import { finding_user } from "./database/finding_user";

const cors = require('cors') ; 

const express = require('express');
const port = port_number;
const app = express();
app.use(express.json()) ; 
app.use(bodyParser.json()) ; 
app.use(cors()) ; 
 mongo_db_connect() ; 
 mongo_db_connect_password() ; 
type ProblemSummary = {
  questionFrontendId: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  paidOnly?: boolean;
  topicTags?: { name: string }[];
};

type CodeforcesSample = { input: string; output: string };
app.use(express.json());




app.post('/problems_codeforces', async (req: any, res: any) => {
 
    const rating: number = req.body.rating;
  
    try {
        const response: any = await axios.get('https://codeforces.com/api/problemset.problems');
        const problems = response.data.result.problems;

        const filtered = problems.filter((problem: any) =>
            problem.rating === rating 
        );
       
        res.status(200).json({
          status: "OK",
          result: {
            problems: filtered 
          }
        }) ; 

        
    }
    catch (err) {
        res.status(404).json({
            Error: "Error occurs in calling the codeforces api "
        })
    }

})


// getting the question and sample test case for the codeforces problem 
async function scrapeProblem(contestId: string, problemIndex: string) {
  const url = `https://codeforces.com/contest/${contestId}/problem/${problemIndex}?mobile=false`;
  const launchOptions: any = {
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      // The following args are recommended for Render/Docker environments
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // This is for Docker environments, might help
      '--disable-gpu'
    ]
  };
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1280, height: 800 });

  try {
  
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

    await page.waitForSelector('div.problem-statement', { timeout: 20000 });

    const data = await page.evaluate(() => {
      const container = document.querySelector('div.problem-statement') as HTMLElement | null;
      if (!container) {
        return {
          title: '',
          timeLimit: '',
          memoryLimit: '',
          statementParas: [],
          statementHTML: '',
          samples: []
        };
      }

      const header = container.querySelector('.header') as HTMLElement | null;
      const title = (header?.querySelector('.title') as HTMLElement | null)?.innerText.trim() || '';
      const timeLimit = (header?.querySelector('.time-limit') as HTMLElement | null)?.innerText.trim() || '';
      const memoryLimit = (header?.querySelector('.memory-limit') as HTMLElement | null)?.innerText.trim() || '';

      const statementParas = Array.from(
        container.querySelectorAll('div:not(.header):not(.input-specification):not(.output-specification) > p')
      ).map(p => (p as HTMLElement).innerText.trim());

      const statementHTML = container.innerHTML.trim();

      const inputs = Array.from(
        container.querySelectorAll('.sample-test .input pre')
      ).map(el => (el as HTMLElement).innerText.trim());
      const outputs = Array.from(
        container.querySelectorAll('.sample-test .output pre')
      ).map(el => (el as HTMLElement).innerText.trim());
      const samples = inputs.map((input, i) => ({ input, output: outputs[i] || '' }));

      return { title, timeLimit, memoryLimit, statementParas, statementHTML, samples };
    });

    return { contestId, problemIndex, url, scrapedAt: new Date().toISOString(), ...data };
  } catch (error) {
    console.error(`Error while scraping ${url}:`, error);
    throw new Error('ScrapeFailed');
  } finally {
    await browser.close();
  }
}




app.post('/full_question_codeforces', async (req : any, res : any) => {
  const { contestId, index } = req.body;
  if (!contestId || !index) {
    return res.status(400).json({ error: 'Please provide both contestId and index' });
  }

  try {
    const result = await scrapeProblem(contestId.toString(), index.toString());
    res.status(200).json(result);
  } catch (err) {
    console.error('Error scraping full question:', err);
    if ((err as Error).message === 'ScrapeFailed') {
      res.status(502).json({ error: 'Failed to scrape full question from Codeforces' });
    } else {
      res.status(500).json({ error: err });
    }
  }
});




// getting the problem name 
app.post('/problems_leetcode', async (req : any, res : any) => {
  const { difficulty } = req.body;
  if (!difficulty) {
    return res.status(400).json({ error: "Please send { difficulty: 'easy' } as JSON" });
  }

  const query = `
    query questionList(
      $categorySlug: String,
      $filters: QuestionListFilterInput,
      $limit: Int,
      $skip: Int
    ) {
      questionList(
        categorySlug: $categorySlug,
        filters: $filters,
        limit: $limit,
        skip: $skip
      ) {
        totalNum
        data {
          questionFrontendId
          title
          titleSlug
          difficulty
          isPaidOnly
          topicTags {
            name
          }
        }
      }
    }
  `;

  const variables = {
    categorySlug: "",
    skip: 0,
    limit: 50,
    filters: {
      difficulty: difficulty.toUpperCase(),
    },
  };

  try {
    const response: any = await axios.post(
      'https://leetcode.com/graphql',
      {
        operationName: "questionList",
        query,
        variables
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://leetcode.com/problemset/all/',
          'Origin': 'https://leetcode.com',
        },
      }
    );

    const nodeSet = response.data.data.questionList.data;  
  
    const unpaid = nodeSet.filter((q: any) => q.isPaidOnly === false);

    return res.json({ total: response.data.data.questionList.totalNum, unpaid });
  } catch (err: any) {
 
 
    return res.status(500).json({ error: "Unexpected error fetching from LeetCode" });
  }
});



app.post('/full_leetcode_question', async (req : any, res : any) => {
  const { titleSlug } = req.body;
  if (!titleSlug) {
    return res.status(400).json({ error: "Please send { titleSlug: 'two-sum' }" });
  }

  const query = `
    query getQuestion($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        content              # the full problem statement in HTML
        sampleTestCase       # the default sample input
      }
    }
  `;
  const variables = { titleSlug };

  try {
    const response: any = await axios.post(
      'https://leetcode.com/graphql',
      {
        operationName: "getQuestion",
        query,
        variables
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
          'Referer': `https://leetcode.com/problems/${titleSlug}/`,
          'Origin': 'https://leetcode.com',
        },
      }
    );

    const q = response.data.data.question;
    if (!q) {
      return res.status(404).json({ error: "Question not found" });
    }

    return res.json({
      titleSlug,
      descriptionHtml: q.content,
      sampleTestCase: q.sampleTestCase
    });
  } catch (err: any) {
  
    if (err.response?.status >= 400 && err.response.status < 500) {
      return res.status(err.response.status).json(err.response.data);
    }
    return res.status(500).json({ error: "Failed to fetch question details" });
  }
});

 
app.post("/checking_the_problem" , ai_testing , function (req : any , res : any) {
    const result = req.body.result ; 
    res.status(200).json({
      result : result 
    })
} )





app.post("/login" , login ) ; 
app.post("/sign_up" , new_user) ; 
app.post("/adding_contest_inforamtion" , adding_contest_information) ; 
app.post("/getting_user_data" , user_details_getting ) ; 
app.post("/adding_contest_information" , adding_contest_information) ; 
app.post("/validating_auth" , validating ) ; 
 const server = app.listen(port, '0.0.0.0' ,  function () {
    console.log(`Server is running on the port ${port}`);
})

app.post("/forgot_password" , forgot_password) ; 
app.post("/verification" , verification_password) ; 

app.post("/finding_user" , finding_user) ; 
 