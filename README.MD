# AlgoDojo

[![GitHub issues](https://img.shields.io/github/issues/Tanishq112005/Test_app)](https://github.com/Tanishq112005/Test_app/issues) [![GitHub forks](https://img.shields.io/github/forks/Tanishq112005/Test_app)](https://github.com/Tanishq112005/Test_app/network/members) [![GitHub stars](https://img.shields.io/github/stars/Tanishq112005/Test_app)](https://github.com/Tanishq112005/Test_app/stargazers)

Welcome to **AlgoDojo**, your personal coding gymnasium for mastering algorithmic challenges.

---

## 🌟 About The Project

**AlgoDojo** is a dual-purpose training platform meticulously crafted for two key audiences: the aspiring **competitive programmer** and the diligent **interview candidate**. It provides a versatile and focused environment to hone your problem-solving skills under realistic, time-constrained conditions.

### 1. For the Competitive Programmer: Sharpen Your Edge
For those looking to climb the ranks on platforms like **Codeforces** and **LeetCode**, AlgoDojo acts as the perfect sparring partner. Move beyond random practice and into the realm of strategic training.

*   **Simulate Real Contests:** Create custom "mashups" of problems from your favorite platforms. This allows you to practice solving a set of diverse problems within a single, timed session, just like in a live contest.
*   **Targeted Practice for Rating Improvement:** The ability to filter problems by specific rating ranges is crucial. You can focus on problems just above your current comfort level to effectively attack your weaknesses, solidify your strengths, and build the intuition needed to solve higher-rated problems.
*   **Perform Under Pressure:** The built-in timer forces you to manage your time effectively, make quick decisions, and debug efficiently—key skills for boosting your performance and improving your rating when it truly matters.

### 2. For the Interview Candidate: Ace Your Technical Interviews
Technical interviews are all about thinking clearly and delivering a working solution under the pressure of the clock. AlgoDojo replicates this high-stakes environment, allowing you to build the confidence and composure needed to succeed.

*   **Practice in a Realistic Setting:** Solve LeetCode-style problems within a set time limit, mirroring the conditions of a typical online assessment or a live coding interview round. This helps you get accustomed to the pressure and manage your nerves.
*   **Build Problem-Solving Muscle:** By repeatedly practicing in a timed setting, you reduce anxiety and train your brain to stay focused on the logic, even when the clock is ticking.
*   **Master the Clock:** Learn to pace yourself, allocate time for understanding the problem, coding the solution, and testing it—all within the interview's constraints.

Whether you are aiming for a new rating milestone or preparing to land your dream job, **AlgoDojo** provides the structured practice you need to achieve your goals.

---

## 📸 Screenshots

*(This is where you can add screenshots of your application. Replace the placeholder links below with your actual images.)*

| Login Page                                     | Contest Setup                                      | Practice Arena                                       |
| :--------------------------------------------: | :------------------------------------------------: | :--------------------------------------------------: |
| ![Login Page](link_to_your_login_screenshot.png) | ![Contest Setup](link_to_your_setup_screenshot.png) | ![Practice Arena](link_to_your_arena_screenshot.png) |

---

## ✨ Key Features

*   **Problem Aggregator:** Access a vast library of questions from LeetCode and Codeforces.
*   **Custom Contests:** Create your own timed practice sessions.
*   **Difficulty Filtering:** Choose problems based on their rating to match your skill level.
*   **Timed Environment:** A built-in timer to simulate real-world pressure.
*   **User Authentication:** Secure login and registration to track your progress.

---

## 🛠️ Tech Stack

*   **Languages:** TypeScript, JavaScript, HTML, CSS
*   **Frontend:** React, Vite
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Authentication:** JSON Web Tokens (JWT)
*   **Web Scraping:** [Puppeteer](https://pptr.dev/) (for gathering problem data)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/en/) (which includes npm)
*   [Git](https://git-scm.com/)
*   [TypeScript](https://www.typescriptlang.org/download) and [ts-node](https://www.npmjs.com/package/ts-node) installed globally. If not, run:
    ```bash
    npm install -g typescript ts-node
    ```

### Installation

1.  **Fork the repository** by clicking the "Fork" button at the top right of this page.

2.  **Clone your forked repository** (replace `YOUR_USERNAME` with your GitHub username):
    ```bash
    git clone https://github.com/YOUR_USERNAME/Test_app.git
    cd Test_app
    ```

3.  **Set up the Frontend:**
    ```bash
    cd frontend
    npm install
    ```

4.  **Set up the Backend:**
    ```bash
    cd ../backend
    npm install
    ```

### Environment Configuration

The project requires some environment variables to be set up.

#### 1. Backend `.env` File
In the `backend` directory, create a new file named `.env` and add the following content:
```env
PORT_NUMBER=8000
MONGO_DB=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_API_KEY=your_google_api_key
COMPANY_MAIL=your_gmail_address_for_sending_otps
COMPANY_PASSWORD=your_16_digit_google_app_password