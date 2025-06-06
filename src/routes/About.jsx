import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Globals.css';
import Navbar from '../components/Navbar';

const About = () => {

  return (
    <div className="hero-container">
      <Navbar />
      <main className="hero-content">
        <h2>About Us</h2>
        <h1 className="highlight">Our Mission</h1>
        <p>Welcome to our About page.
          We are dedicated to helping you uncover the colors that best enhance your style, 
          elevate your confindence, and reflect your true essence.
        </p>
      </main>
      <footer className='footer-container'>
            <a href="/" className='footer-logo'><span>dragfAI</span></a>
            <p className='footer-logo_copyrights'>© 2025 All rights reserved.</p>
        </footer>
    </div>
  );
};

export default About;
