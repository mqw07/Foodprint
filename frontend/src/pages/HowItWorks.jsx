import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import '../styles/stripe-like.css';

export default function HowItWorks(){
  return (
    <main id="main-content" role="main">
      <SiteHeader />
      <div className="container">
        <article className="content-article">
          <h2>How It Works</h2>
          <p>FoodPrint helps users understand and reduce their food waste by turning everyday disposal into measurable impact.</p>

          <div className="steps">
            <div className="step-card">
              <h4>Log Food Waste</h4>
              <p>Users record food items they throw away, including type and quantity.</p>
            </div>

            <div className="step-card">
              <h4>Calculate Impact</h4>
              <p>FoodPrint converts this data into estimated carbon emissions and the monetary value of wasted food using established environmental and economic estimates.</p>
            </div>

            <div className="step-card">
              <h4>Visualize Your Footprint</h4>
              <p>Users see summaries of their total food waste over time, helping them recognize patterns and habits.</p>
            </div>

            <div className="step-card">
              <h4>Reduce Waste</h4>
              <p>Based on logged data, FoodPrint provides actionable suggestions to help users minimize future waste.</p>
            </div>
          </div>

          <p style={{marginTop:18}}>The goal is to make the hidden cost of food waste visible, tangible, and actionable.</p>
          <Link className="back-link" to="/">← Back to Home</Link>
        </article>
      </div>
    </main>
  );
}
