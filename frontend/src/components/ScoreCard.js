import React from 'react';
import './ScoreCard.css';

const ScoreCard = ({ score, scoreGrade }) => {
  if (score === undefined || scoreGrade === undefined) {
    return null;
  }

  const { grade, label, color } = scoreGrade;

  // Calculate circular progress (for visual indicator)
  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="card score-card">
      <h2>📊 Your Waste Score</h2>
      <div className="score-container">
        <div className="score-circle-wrapper">
          <svg className="score-circle" width="120" height="120">
            <circle
              className="score-circle-background"
              cx="60"
              cy="60"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              className="score-circle-progress"
              cx="60"
              cy="60"
              r="45"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="score-value" style={{ color }}>
            <div className="score-number">{score}</div>
            <div className="score-grade">{grade}</div>
          </div>
        </div>
        <div className="score-info">
          <h3 className="score-label" style={{ color }}>{label}</h3>
          <p className="score-description">
            {score >= 80 
              ? "Excellent work! You're doing great at minimizing food waste."
              : score >= 60
              ? "Good progress! There's room for improvement in reducing waste."
              : "Let's work together to reduce your food waste and save money!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
