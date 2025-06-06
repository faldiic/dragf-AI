import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Globals.css';

const Support = () => (
  <div className="hero-container">
    <header className="navbar">
      <Link to="/" className="logo mobile-only"><span>dragfAI</span></Link>
      <nav className="nav-desktop">
        <Link to="/" className="logo desktop-only"><span>dragfAI</span></Link>
        <div className="nav-link-custom"><Link to="/about">About</Link></div>
        <div className="nav-link-custom"><Link to="/support">Support</Link></div>
      </nav>
      <div className="mode-toggle">☀️</div>
    </header>
    <main className="hero-content">
      <h2>Support</h2>
      <h1 className="highlight">How Can We Help?</h1>
      <p>Need help? Visit our support resources or contact our team for assistance. We are ready to support you!</p>
      <section className='hero-content_contact-support'>
        <div className='hero-content_contact-support_machine-learning-team'>
          <h1>Machine Learning Team:</h1>
          <a href="https://www.linkedin.com/in/salman-alfarizi-taha/" target='_blank'>Salman Alfarizi Taha</a>
          <a href="https://www.linkedin.com/in/girvanazhar/" target='_blank'>Mochamad Girvan Azhar</a>
          <a href="https://www.linkedin.com/in/faizahrzki/" target='_blank'>Faizah Rizki Auliawati</a>
        </div>
        <div className='hero-content_contact-support_frontend-team'>
          <h1>Frontend Team:</h1>
          <a href="https://www.linkedin.com/in/ridhormdhan/" target='_blank'>Ridho Ramadhan</a>
          <a href="https://www.linkedin.com/in/muhamad-rifaldi-3517a8293" target='_blank'>Muhamad Rifaldi</a>
        </div>
      </section>
    </main>
    <footer className='footer-container'>
        <a href="/" className='footer-logo'><span>dragfAI</span></a>
        <p className='footer-logo_copyrights'>© 2025 All rights reserved.</p>
    </footer>
  </div>
);

export default Support;
