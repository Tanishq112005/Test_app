import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__socials">
          <a href="#" aria-label="GitHub"><FaGithub /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
        </div>
        <div className="footer__links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} AlgoDojo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;