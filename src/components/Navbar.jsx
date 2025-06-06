import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Globals.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <Link to="/" className="logo mobile-only"><span>dragfAI</span></Link>
      <nav className="nav-desktop">
        <Link to="/" className="logo desktop-only"><span>dragfAI</span></Link>
        <div className="nav-link-custom"><Link to="/about">About</Link></div>
        <div className="nav-link-custom"><Link to="/support">Support</Link></div>
      </nav>
      <button
        className="hamburger-menu"
        aria-label="Open navigation menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>
      {open && (
        <div className="mobile-nav-dropdown">
          <div className="nav-link-custom"><Link to="/about" onClick={() => setOpen(false)}>About</Link></div>
          <div className="nav-link-custom"><Link to="/support" onClick={() => setOpen(false)}>Support</Link></div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
