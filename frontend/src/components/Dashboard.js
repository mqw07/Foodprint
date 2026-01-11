import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './Dashboard.css';

const Dashboard = ({ stats }) => {
  if (!stats) {
    return <div className="card">No statistics available</div>;
  }

  const chartData = stats.dailyBreakdown || [];
  const categoryData = Object.entries(stats.byCategory || {}).map(([category, count]) => ({
    category,
    count
  })).filter(item => item.count > 0);

  const causeData = Object.entries(stats.byCause || {}).map(([cause, count]) => ({
    cause: cause === 'over-purchased' ? 'Over-purchased' : cause.charAt(0).toUpperCase() + cause.slice(1),
    count
  })).filter(item => item.count > 0);

  return (
    <div className="dashboard">
      <div className="card">
        <h2>📊 Your Food Waste Impact</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Items</h3>
            <div className="value">{stats.totalItems || 0}</div>
            <div className="unit">items logged</div>
          </div>

          <div className="stat-card">
            <h3>Total Weight</h3>
            <div className="value">{(stats.totalWeightKg || 0).toFixed(2)}</div>
            <div className="unit">kg</div>
          </div>

          <div className="stat-card">
            <h3>Carbon Emissions</h3>
            <div className="value">{(stats.totalCarbonKg || 0).toFixed(2)}</div>
            <div className="unit">kg CO₂</div>
          </div>

          <div className="stat-card">
            <h3>Money Lost</h3>
            <div className="value">${(stats.totalMoneyLost || 0).toFixed(2)}</div>
            <div className="unit">USD</div>
          </div>
        </div>

        {categoryData.length > 0 && (
          <div className="category-stats">
            <h3 style={{ gridColumn: '1 / -1', marginBottom: '0.5rem' }} className="section-title">
              Waste by Category
            </h3>
            {categoryData.map((item, index) => (
              <div key={index} className="category-stat">
                <h4>{item.category}</h4>
                <div className="count">{item.count}</div>
              </div>
            ))}
          </div>
        )}

        {causeData.length > 0 && (
          <div className="category-stats">
            <h3 style={{ gridColumn: '1 / -1', marginBottom: '0.5rem', marginTop: '1rem' }} className="section-title">
              Waste by Cause
            </h3>
            {causeData.map((item, index) => (
              <div key={index} className="category-stat">
                <h4>{item.cause}</h4>
                <div className="count">{item.count}</div>
              </div>
            ))}
          </div>
        )}

        {chartData.length > 0 && (
          <div className="chart-container">
            <h3 className="section-title">Daily Carbon Emissions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="carbonKg" stroke="#667eea" strokeWidth={2} name="Carbon (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="chart-container">
            <h3 className="section-title">Daily Money Lost</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="moneyLost" fill="#764ba2" name="Money Lost ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="chart-container">
            <h3 className="section-title">Daily Weight</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weightKg" stroke="#48bb78" strokeWidth={2} name="Weight (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
