import React from 'react';
import './hero_section.css';
import { useNavigate } from 'react-router';

const HeroSection = () => {
  const navigate = useNavigate() ; 
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Ace Your Next Tech Interview</h1>
        <p>Practice with timed tests and questions from LeetCode & Codeforces to master data structures and algorithms.</p>
        <button className="cta-button" onClick={() => {
           navigate("/signup");
        }}>Start Your Free Test Now</button>
      </div>
    </section>
  );
}

export default HeroSection;