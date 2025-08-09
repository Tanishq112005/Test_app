import React from 'react';

import Header from './Header';
import HeroSection from './Herosection';
import WhyUsSection from './whytouse';
import FeaturesSection from './feature_section';
import Footer from './footer';
import './landing.css'; // This will be our new, scoped CSS file

function Landing_Page() {
  return (
    // This wrapper is the key. All styles in landing.css will only apply inside this div.
    <div className="landing-page">
      <Header />
      <main>
        <HeroSection />
        <WhyUsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

export default Landing_Page;