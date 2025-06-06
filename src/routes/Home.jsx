import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Globals.css';
import UploadPhoto from '../components/UploadPhoto';
import Typewriter from "typewriter-effect";
import Navbar from '../components/Navbar';

const HeroSection = () => {

  const handleGetStarted = () => {
    const uploadSection = document.getElementById('upload-image');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="hero-container">
      <Navbar />
      <main className="hero-content">
        <h2>Reveal your true <span className='hero-content-skintone'>Color</span> with</h2>
        <h1 className='highlight'>
          <Typewriter options={{
            strings: ['dragfAI'],
            autoStart: true,
            loop: true,
            delay: 'natural',
            cursor: '_',
          }} />
        </h1>
        <p>
          Unveil the perfect pallete that enhances your skin tone and personal elegance,
          achieving effortless harmony in every outfit.
        </p>
        <div className="hero-buttons">
          <button onClick={handleGetStarted}>Get Started →</button>
        </div>
        <section className='hero-upload_photo-main-container'>
          <div className='hero-upload_photo-description'>
            <p>Drag and Drop your photo and wait for a second.....</p>
            <small>Tips: Use a photo with a good lightning and don't use any filter😁</small>
          </div>
          <div className='hero-upload_photo-container'>
            <UploadPhoto />
          </div>
        </section>
      </main>

      <footer className='footer-container'>
          <a href="/" className='footer-logo'><span>dragfAI</span></a>
          <p className='footer-logo_copyrights'>© 2025 All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HeroSection;
