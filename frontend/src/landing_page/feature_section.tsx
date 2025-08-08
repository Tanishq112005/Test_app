import React from 'react';
import './featuresection.css';

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2>Powerful Features to Boost Your Preparation</h2>
      <div className="features-container">
        <div className="features-list">
          <div className="feature-item">
            <h4>Timed Tests</h4>
            <p>Set a timer for your practice sessions to get accustomed to interview time constraints.</p>
          </div>
          <div className="feature-item">
            <h4>Select by Rating</h4>
            <p>Choose questions based on their difficulty rating to systematically improve your skills.</p>
          </div>
          <div className="feature-item">
            <h4>LeetCode & Codeforces Problems</h4>
            <p>Access a vast library of questions from the most reputable competitive programming platforms.</p>
          </div>
        </div>
        <div className="dashboard-screenshot">
          {/* This is the placeholder for your screenshot */}
          <div className="screenshot-placeholder">
            <p>Screenshot of the Test Dashboard</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;