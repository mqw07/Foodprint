import React from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import '../styles/stripe-like.css';

export default function About(){
  return (
    <main id="main-content" role="main">
      <SiteHeader />
      <div className="container">
        <article className="content-article">
          <h2>🌱 About FoodPrint</h2>
          <p>
            Food waste is a major environmental and economic problem — yet its true impact often goes unnoticed.
            In Canada alone, nearly half of all food produced is wasted, contributing to billions of dollars in losses
            and massive amounts of avoidable carbon emissions. While many people know that wasting food is bad, the
            scale of its impact is hard to grasp at the individual level.
          </p>

          <p>
            FoodPrint was created to bridge that gap. By tracking food waste and translating it into real-world
            environmental and financial consequences, FoodPrint empowers individuals to make more informed and
            sustainable choices. Small actions, when measured and understood, can lead to meaningful change.
          </p>

          <p>
            FoodPrint is a step toward making sustainability personal, measurable, and achievable.
          </p>

          <Link className="back-link" to="/">← Back to Home</Link>
        </article>
      </div>
    </main>
  );
}
