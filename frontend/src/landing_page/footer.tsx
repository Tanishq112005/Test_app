import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__socials">
          <a href="https://github.com/Tanishq112005/Test_app" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/tanishq-jain-6b90b1292/" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://x.com/tanishq__jain" aria-label="Twitter"><FaTwitter /></a>
        </div>
        <div className="footer__links">
        <a href="/contact">Contact Us</a>
        </div>
        <p>© {new Date().getFullYear()} AlgoDojo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;