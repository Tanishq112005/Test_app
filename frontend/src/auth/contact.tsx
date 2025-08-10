import React from 'react';
import { Mail, MapPin, User, Phone } from 'lucide-react';
import './contact.css';


const ContactPage: React.FC = () => {

  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-card__header">
          <h1 className="contact-card__logo">Contact Us</h1>
          <p className="contact-card__title">Get in touch with us</p>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">
              <User />
            </div>
            <div className="contact-details">
              <h3 className="contact-label">Name</h3>
              <p className="contact-value">Tanishq Jain</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <Mail />
            </div>
            <div className="contact-details">
              <h3 className="contact-label">Email</h3>
              <p className="contact-value">algodojo1@gmail.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <Phone />
            </div>
            <div className="contact-details">
              <h3 className="contact-label">Phone</h3>
              <p className="contact-value">+91 62614 29301</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <MapPin />
            </div>
            <div className="contact-details">
              <h3 className="contact-label">Address</h3>
              <p className="contact-value">
                7 number Chauraha , Morar <br />
                Gwalior, Madhya Pradesh 474006<br />
                India
              </p>
            </div>
          </div>
        </div>

    
       
        <div className="contact-actions">
          <a className="btn btn-primary" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSHvnnsZpWTwtMcpXmFknLkLrcHXskfzrGStwWhZHHszFbZhqGcVFvnGbkhdJRbvdkKzBNnM">
          
            <Mail size={20} />
            Send Email 
          </a>
        </div>

        <div className="links-container">
          <a href="/" className="link">Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;