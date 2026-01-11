import React, { useState } from 'react';
import axios from 'axios';
import './WasteLogForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const WasteLogForm = ({ onLogAdded }) => {
  const [formData, setFormData] = useState({
    item: '',
    category: 'Produce',
    weightKg: '',
    cause: 'spoiled',
    date: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      await axios.post(`${API_URL}/waste`, formData);
      setMessage('Food waste logged successfully! 🌱');
      setFormData({
        item: '',
        category: 'Produce',
        weightKg: '',
        cause: 'spoiled',
        date: new Date().toISOString().split('T')[0]
      });
      onLogAdded();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error logging food waste. Please try again.');
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2>Log Food Waste</h2>
      <form onSubmit={handleSubmit} className="waste-form">
        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Produce">Produce</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Grains">Grains</option>
            <option value="Beverages">Beverages</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="item">Item Name *</label>
          <input
            type="text"
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
            placeholder="e.g., Lettuce, Milk, Bread"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weightKg">Weight (kg) *</label>
          <input
            type="number"
            id="weightKg"
            name="weightKg"
            value={formData.weightKg}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.35"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cause">Cause *</label>
          <select
            id="cause"
            name="cause"
            value={formData.cause}
            onChange={handleChange}
            required
          >
            <option value="spoiled">Spoiled</option>
            <option value="expired">Expired</option>
            <option value="over-purchased">Over-purchased</option>
            <option value="leftovers">Leftovers</option>
            <option value="damaged">Damaged</option>
            <option value="other">Other</option>
          </select>
        </div>

        {message && (
          <div role="status" aria-live="polite" className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? 'Logging...' : 'Log Food Waste'}
        </button>
      </form>
    </div>
  );
};

export default WasteLogForm;
