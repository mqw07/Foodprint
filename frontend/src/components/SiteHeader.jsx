import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/stripe-like.css';

export default function SiteHeader(){
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="stripe-header container" role="navigation" aria-label="Main navigation">
        <div className="logo">Foodprint</div>
        <nav className="nav">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active muted' : 'nav-link muted'}>About</NavLink>
          <NavLink to="/how-it-works" className={({isActive}) => isActive ? 'nav-link active muted' : 'nav-link muted'}>How it works</NavLink>
        </nav>
      </header>
    </>
  );
}
