import React from 'react';
import { useNavigate } from 'react-router';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero__content">
        <h1>Ace Your Next Tech Interview</h1>
        <p>Practice with timed tests and questions from LeetCode & Codeforces to master data structures and algorithms.</p>
        <button className="btn btn--cta" onClick={() => navigate("/signup")}>
          Start Your Contest
        </button>
      </div>
    </section>
  );
};

export default HeroSection;