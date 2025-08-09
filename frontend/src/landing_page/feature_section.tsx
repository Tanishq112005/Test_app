import React from 'react';
import { FaClock, FaTachometerAlt, FaCode } from 'react-icons/fa';
// Make sure you have a real image here for the best look
import dashboardImage from "../assets/Screenshot 2025-08-09 180126.png"; 

const featureHighlights = [
    {
      icon: <FaClock />,
      title: 'Timed Tests',
      description: 'Simulate real interview pressure and improve your time management.',
    },
    {
      icon: <FaTachometerAlt />,
      title: 'Select by Rating',
      description: 'Systematically level up by tackling problems matched to your skill.',
    },
    {
      icon: <FaCode />,
      title: 'Vast Problem Library',
      description: 'Access curated challenges from LeetCode & Codeforces.',
    },
];

const FeaturesSection = () => {
  return (
    // Use the single, correct class name for the section
    <section className="features-section">
      <div className="features-section__intro">
        <h2>Everything You Need, All in One Place</h2>
        <p className="features-section__subtitle">
          Our platform is meticulously designed to provide a complete and effective training ground for your technical interviews.
        </p>
      </div>

      <div className="features-section__card">
        <div className="features-section__visual">
          
           <div className="mockup-image-container">
             <img src={dashboardImage} alt="AlgoDojo Dashboard Preview" />
           </div>
        </div>
        
        <div className="features-section__grid">
          {featureHighlights.map((feature, index) => (
             <div className="feature-box" key={index}>
                <div className="feature-box__icon">{feature.icon}</div>
                <h4 className="feature-box__title">{feature.title}</h4>
                <p className="feature-box__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;