import React from 'react';
import Header from './Header';
import HeroSection from './Herosection';
import WhyUsSection from './whytouse';
import FeaturesSection from './feature_section';
import Footer from './footer';
import './landing.css';

function Landing_Page() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <WhyUsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}

export default Landing_Page;