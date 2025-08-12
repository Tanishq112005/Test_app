"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const ai_1 = __importDefault(require("./ai"));
const database_1 = require("./database/database");
const login_1 = require("./database/login");
const insert_new_user_1 = require("./database/insert_new_user");
const adding_contest_1 = __importDefault(require("./database/adding_contest"));
const userdetails_1 = require("./database/userdetails");
const validating_1 = require("./validating");
const forgot_password_1 = require("./forgot_password");
const password_1 = require("./database/password");
const finding_user_1 = require("./database/finding_user");
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const port = process.env.Port_number;
const app = express();
app.use(express.json());
app.use(body_parser_1.default.json());
const corsOptions = {
    origin: 'https://algodojo.vercel.app'
};
app.use(cors(corsOptions));
(0, database_1.mongo_db_connect)();
(0, password_1.mongo_db_connect_password)();
app.use(express.json());
app.post('/problems_codeforces', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rating = req.body.rating;
    try {
        const response = yield axios_1.default.get('https://codeforces.com/api/problemset.problems');
        const problems = response.data.result.problems;
        const filtered = problems.filter((problem) => problem.rating === rating);
        res.status(200).json({
            status: "OK",
            result: {
                problems: filtered
            }
        });
    }
    catch (err) {
        res.status(404).json({
            Error: "Error occurs in calling the codeforces api "
        });
    }
}));
// getting the question and sample test case for the codeforces problem 
function scrapeProblem(contestId, problemIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://codeforces.com/contest/${contestId}/problem/${problemIndex}?mobile=false`;
        const launchOptions = {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        };
        if (process.env.PUPPETEER_EXECUTABLE_PATH) {
            launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
        }
        const browser = yield puppeteer_core_1.default.launch(launchOptions);
        const page = yield browser.newPage();
        yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36');
        yield page.setViewport({ width: 1280, height: 800 });
        try {
            yield page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });
            yield page.waitForSelector('div.problem-statement', { timeout: 20000 });
            const data = yield page.evaluate(() => {
                var _a, _b, _c;
                const container = document.querySelector('div.problem-statement');
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
                const header = container.querySelector('.header');
                const title = ((_a = header === null || header === void 0 ? void 0 : header.querySelector('.title')) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || '';
                const timeLimit = ((_b = header === null || header === void 0 ? void 0 : header.querySelector('.time-limit')) === null || _b === void 0 ? void 0 : _b.innerText.trim()) || '';
                const memoryLimit = ((_c = header === null || header === void 0 ? void 0 : header.querySelector('.memory-limit')) === null || _c === void 0 ? void 0 : _c.innerText.trim()) || '';
                const statementParas = Array.from(container.querySelectorAll('div:not(.header):not(.input-specification):not(.output-specification) > p')).map(p => p.innerText.trim());
                const statementHTML = container.innerHTML.trim();
                const inputs = Array.from(container.querySelectorAll('.sample-test .input pre')).map(el => el.innerText.trim());
                const outputs = Array.from(container.querySelectorAll('.sample-test .output pre')).map(el => el.innerText.trim());
                const samples = inputs.map((input, i) => ({ input, output: outputs[i] || '' }));
                return { title, timeLimit, memoryLimit, statementParas, statementHTML, samples };
            });
            return Object.assign({ contestId, problemIndex, url, scrapedAt: new Date().toISOString() }, data);
        }
        catch (error) {
            throw new Error('ScrapeFailed');
        }
        finally {
            yield browser.close();
        }
    });
}
app.post('/full_question_codeforces', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contestId, index } = req.body;
    if (!contestId || !index) {
        return res.status(400).json({ error: 'Please provide both contestId and index' });
    }
    try {
        const result = yield scrapeProblem(contestId.toString(), index.toString());
        res.status(200).json(result);
    }
    catch (err) {
        console.error('Error scraping full question:', err);
        if (err.message === 'ScrapeFailed') {
            res.status(502).json({ error: 'Failed to scrape full question from Codeforces' });
        }
        else {
            res.status(500).json({ error: err });
        }
    }
}));
// getting the problem name 
app.post('/problems_leetcode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post('https://leetcode.com/graphql', {
            operationName: "questionList",
            query,
            variables
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://leetcode.com/problemset/all/',
                'Origin': 'https://leetcode.com',
            },
        });
        const nodeSet = response.data.data.questionList.data;
        const unpaid = nodeSet.filter((q) => q.isPaidOnly === false);
        return res.json({ total: response.data.data.questionList.totalNum, unpaid });
    }
    catch (err) {
        return res.status(500).json({ error: "Unexpected error fetching from LeetCode" });
    }
}));
app.post('/full_leetcode_question', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        const response = yield axios_1.default.post('https://leetcode.com/graphql', {
            operationName: "getQuestion",
            query,
            variables
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0',
                'Referer': `https://leetcode.com/problems/${titleSlug}/`,
                'Origin': 'https://leetcode.com',
            },
        });
        const q = response.data.data.question;
        if (!q) {
            return res.status(404).json({ error: "Question not found" });
        }
        return res.json({
            titleSlug,
            descriptionHtml: q.content,
            sampleTestCase: q.sampleTestCase
        });
    }
    catch (err) {
        if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) >= 400 && err.response.status < 500) {
            return res.status(err.response.status).json(err.response.data);
        }
        return res.status(500).json({ error: "Failed to fetch question details" });
    }
}));
app.post("/checking_the_problem", ai_1.default, function (req, res) {
    const result = req.body.result;
    res.status(200).json({
        result: result
    });
});
app.post("/login", login_1.login);
app.post("/sign_up", insert_new_user_1.new_user);
app.post("/adding_contest_inforamtion", adding_contest_1.default);
app.post("/getting_user_data", userdetails_1.user_details_getting);
app.post("/adding_contest_information", adding_contest_1.default);
app.post("/validating_auth", validating_1.validating);
const server = app.listen(port, '0.0.0.0', function () {
    console.log(`Server is running on the port ${port}`);
});
app.post("/forgot_password", forgot_password_1.forgot_password);
app.post("/verification", forgot_password_1.verification_password);
app.post("/finding_user", finding_user_1.finding_user);
