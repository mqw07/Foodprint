import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import '../styles/stripe-like.css';

export default function Landing() {
  return (
    <main id="main-content" className="stripe-root" role="main">
      <SiteHeader />

      <section className="hero container">
        <div className="hero-left">
          <h1 className="hero-title">Foodprint — Reduce waste. Save money. Cut CO₂.</h1>
          <p className="hero-sub">
            Wasted food acts as an immense environmental and economic burden, releasing an extraordinary amount
            of CO₂ into the atmosphere, and costing hungry Canadians billions of dollars.
          </p>

          <div className="stats">
            <div className="stat">
              <div className="stat-value">46%</div>
              <div className="stat-label">of all food in Canada is wasted yearly</div>
            </div>
            <div className="stat">
              <div className="stat-value">41%</div>
              <div className="stat-label">is avoidable; ~$58B net loss</div>
            </div>
            <div className="stat">
              <div className="stat-value">Tens of M tCO₂</div>
              <div className="stat-label">equivalent to billions of car miles</div>
            </div>
          </div>

          <p className="problem-detail">
            Most people are aware that they waste food every time they throw something out, but they don’t register the
            total amount of environmental impact, and money wasted by these seemingly small actions.
          </p>

          <p className="problem-detail">
            Foodprint discourages wasted meals by logging user’s food waste data, displaying the ecological footprint and
            total value of the total waste, while providing suggestions to reduce overall waste.
          </p>

          <div className="cta-row">
            <Link className="btn primary" to="/dashboard">Get started — it's free</Link>
            <Link className="btn ghost" to="/how-it-works">How it works</Link>
          </div>
        </div>

        <aside className="hero-card">
          <div className="card-content">
            <h3 className="card-title">Track your waste • Visualize impact</h3>
            <p className="card-sub">Record meals, costs and carbon. See weekly trends and tips to cut waste.</p>
            <div className="card-stats">
              <div><strong>Avg. saved</strong><div className="muted">$32 / month</div></div>
              <div><strong>CO₂</strong><div className="muted">2.4 kg / meal</div></div>
            </div>
          </div>
        </aside>
      </section>

      <footer className="stripe-footer container muted">
        Source: SecondHarvest — Foodprint helps reduce wasted meals by logging and advising.
      </footer>
    </main>
  );
}
