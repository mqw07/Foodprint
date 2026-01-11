import React, { useRef } from 'react';
import '../styles/stripe-like.css';

// Simple accessible tabs component
export default function Tabs({ tabs, activeTab, onChange }){
  const tablistRef = useRef(null);

  const handleKeyDown = (e, idx) => {
    const key = e.key;
    const count = tabs.length;
    if (key === 'ArrowRight'){
      e.preventDefault();
      const next = (idx + 1) % count;
      onChange(tabs[next].id);
      tablistRef.current.querySelectorAll('[role="tab"]')[next].focus();
    } else if (key === 'ArrowLeft'){
      e.preventDefault();
      const prev = (idx - 1 + count) % count;
      onChange(tabs[prev].id);
      tablistRef.current.querySelectorAll('[role="tab"]')[prev].focus();
    } else if (key === 'Home'){
      e.preventDefault();
      onChange(tabs[0].id);
      tablistRef.current.querySelectorAll('[role="tab"]')[0].focus();
    } else if (key === 'End'){
      e.preventDefault();
      onChange(tabs[count-1].id);
      tablistRef.current.querySelectorAll('[role="tab"]')[count-1].focus();
    }
  };

  return (
    <div className="tabs-wrapper">
      <div className="tabs" role="tablist" aria-label="Dashboard tabs" ref={tablistRef}>
        {tabs.map((t, idx) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            aria-controls={`panel-${t.id}`}
            id={`tab-${t.id}`}
            className={`tab ${activeTab === t.id ? 'tab-active' : ''}`}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            tabIndex={activeTab === t.id ? 0 : -1}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
