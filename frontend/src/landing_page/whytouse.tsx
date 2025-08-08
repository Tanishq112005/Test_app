import React from 'react';
import './whytouse.css';

const WhyUsSection = () => {
  return (
    <section className="why-us-section">
      <h2>Why Use Our Platform to Ace the Interview?</h2>
      <div className="benefits-grid">
        <div className="benefit-card">
          <h3>Realistic Test Environment</h3>
          <p>Our timed tests simulate real interview conditions, helping you manage time and perform under pressure.</p>
        </div>
        <div className="benefit-card">
          <h3>Curated High-Quality Questions</h3>
          <p>We feature a curated selection of problems from LeetCode and Codeforces that frequently appear in top tech company interviews.</p>
        </div>
        <div className="benefit-card">
          <h3>Track Your Progress</h3>
          <p>Monitor your performance, identify your weak areas, and focus your practice on what matters most.</p>
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;