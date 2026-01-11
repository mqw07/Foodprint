import React from 'react';
import './Suggestions.css';

const Suggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="card suggestions-card">
        <h2>💡 Tips & Suggestions</h2>
        <p className="no-suggestions">
          Start logging your food waste to get personalized suggestions!
        </p>
      </div>
    );
  }

  return (
    <div className="card suggestions-card">
      <h2>💡 Personalized Suggestions</h2>
      <div className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion-item">
            <h3 className="suggestion-title">{suggestion.title}</h3>
            <ul className="suggestion-tips">
              {suggestion.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="suggestion-tip">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
