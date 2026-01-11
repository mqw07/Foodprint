import React from 'react';
import axios from 'axios';
import './WasteLogList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const WasteLogList = ({ logs, onLogDeleted }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food waste log?')) {
      try {
        await axios.delete(`${API_URL}/waste/${id}`);
        onLogDeleted();
      } catch (error) {
        console.error('Error deleting log:', error);
        alert('Error deleting food waste log. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      Produce: '🥬',
      Dairy: '🥛',
      Meat: '🥩',
      Grains: '🍞',
      Beverages: '🥤',
      Other: '🍽️'
    };
    return emojis[category] || '🍽️';
  };

  const formatCause = (cause) => {
    if (!cause) return 'Other';
    return cause === 'over-purchased' ? 'Over-purchased' : cause.charAt(0).toUpperCase() + cause.slice(1);
  };

  if (logs.length === 0) {
    return (
      <div className="card">
        <h2>Recent Food Waste Logs</h2>
        <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
          No food waste logs yet. Start tracking your food waste impact!
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Recent Food Waste Logs</h2>
      <div className="logs-list">
        {logs.map((log) => (
          <div key={log._id} className="log-item">
            <div className="log-header">
              <span className="log-emoji">{getCategoryEmoji(log.category)}</span>
              <div className="log-info">
                <h3>{log.item}</h3>
                <span className="log-category">{log.category}</span>
              </div>
              <button 
                type="button"
                className="delete-btn"
                aria-label={`Delete log ${log.item}`}
                onClick={() => handleDelete(log._id)}
                title="Delete log"
              >
                ×
              </button>
            </div>
            
            <div className="log-details">
              <div className="detail-item">
                <span className="detail-label">Weight:</span>
                <span className="detail-value">{(log.weightKg || 0).toFixed(2)} kg</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Carbon:</span>
                <span className="detail-value">{(log.carbonKg || 0).toFixed(2)} kg CO₂</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Money Lost:</span>
                <span className="detail-value">${(log.moneyLost || 0).toFixed(2)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Cause:</span>
                <span className="detail-value">{formatCause(log.cause)}</span>
              </div>
            </div>
            
            <div className="log-date">{formatDate(log.date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WasteLogList;
