import React, { useState, useEffect, useRef } from 'react';
import './../App.css';
import SiteHeader from '../components/SiteHeader';
import Dashboard from '../components/Dashboard';
import WasteLogForm from '../components/WasteLogForm';
import WasteLogList from '../components/WasteLogList';
import Suggestions from '../components/Suggestions';
import ScoreCard from '../components/ScoreCard';
import Tabs from '../components/Tabs';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function DashboardPage() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/waste`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/waste/stats`);
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, []);

  const handleLogAdded = () => {
    fetchLogs();
    fetchStats();
  };

  const handleLogDeleted = () => {
    fetchLogs();
    fetchStats();
  };

  const [activeTab, setActiveTab] = useState('log');
  const firstPanelRef = useRef(null);

  useEffect(() => {
    // when switching to panels that should show updated data, make sure we have fresh data
    if (activeTab === 'history') fetchLogs();
    if (activeTab === 'overview') fetchStats();
  }, [activeTab]);

  return (
    <div className="App stripe-root">
      <SiteHeader />
      <header className="App-header">
        <h1>🍽️ Food Waste Impact Tracker</h1>
        <p>Track your food waste and see your environmental & financial impact</p>
      </header>

      <main id="main-content" className="App-main container" role="main">
        <Tabs
          tabs={[
            { id: 'log', label: 'Log Waste' },
            { id: 'overview', label: 'Overview' },
            { id: 'history', label: 'History' },
            { id: 'suggestions', label: 'Suggestions' }
          ]}
          activeTab={activeTab}
          onChange={(id) => {
            setActiveTab(id);
            // move focus to panel for screen reader users
            setTimeout(() => {
              if (firstPanelRef.current) firstPanelRef.current.focus();
            }, 10);
          }}
        />

        <section id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" tabIndex={-1} ref={activeTab === 'overview' ? firstPanelRef : null} hidden={activeTab !== 'overview'}>
          {loading ? (
            <div className="loading">Loading statistics...</div>
          ) : (
            <div className="content-article">
              <ScoreCard score={stats.score} scoreGrade={stats.scoreGrade} />
              <Dashboard stats={stats} />
            </div>
          )}
        </section>

        <section id="panel-log" role="tabpanel" aria-labelledby="tab-log" tabIndex={-1} ref={activeTab === 'log' ? firstPanelRef : null} hidden={activeTab !== 'log'}>
          <div className="content-article">
            <WasteLogForm onLogAdded={() => { handleLogAdded(); setActiveTab('history'); }} />
          </div>
        </section>

        <section id="panel-history" role="tabpanel" aria-labelledby="tab-history" tabIndex={-1} ref={activeTab === 'history' ? firstPanelRef : null} hidden={activeTab !== 'history'}>
          <div className="content-article">
            <WasteLogList logs={logs} onLogDeleted={handleLogDeleted} />
          </div>
        </section>

        <section id="panel-suggestions" role="tabpanel" aria-labelledby="tab-suggestions" tabIndex={-1} ref={activeTab === 'suggestions' ? firstPanelRef : null} hidden={activeTab !== 'suggestions'}>
          <div className="content-article">
            <Suggestions suggestions={stats ? stats.suggestions : []} />
          </div>
        </section>

      </main>
    </div>
  );
}
