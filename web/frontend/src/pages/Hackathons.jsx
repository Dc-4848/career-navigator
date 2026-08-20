import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
import hackathonEvents from '../data/hackathon-events';
import domains from '../data/domains';
import './Hackathons.css';

export default function Hackathons() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [suggestedHackathons, setSuggestedHackathons] = useState([]);
  const [savedHackathons, setSavedHackathons] = useState([]);
  const [activeDomainId, setActiveDomainId] = useState(state.selectedDomain ? state.selectedDomain.id : domains[0].id);

  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];
  const userSkills = state.profile.skills || [];

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 6 });

    setLoading(true);
    // Simulate AI analysis delay
    const timer = setTimeout(() => {
      const events = hackathonEvents[activeDomain.id] || [];
      
      const analyzedEvents = events.map(event => {
        const required = event.requiredSkills;
        const matched = required.filter(rSkill => 
          userSkills.some(uSkill => uSkill.toLowerCase() === rSkill.toLowerCase())
        );
        const matchPercentage = required.length > 0 ? Math.round((matched.length / required.length) * 100) : 0;
        
        return {
          ...event,
          matchPercentage,
          matchedSkills: matched,
          missingSkills: required.filter(s => !matched.includes(s))
        };
      });

      // Sort by match percentage
      analyzedEvents.sort((a, b) => b.matchPercentage - a.matchPercentage);
      
      setSuggestedHackathons(analyzedEvents);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [activeDomain.id, userSkills, dispatch]);

  const toggleSave = (id) => {
    if (savedHackathons.includes(id)) {
      setSavedHackathons(savedHackathons.filter(savedId => savedId !== id));
    } else {
      setSavedHackathons([...savedHackathons, id]);
    }
  };

  const handleFinish = () => {
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="hackathons-container center-content">
        <div className="analyzer-box glass-panel">
          <div className="spinner"></div>
          <h2>Analyzing Hackathons...</h2>
          <p className="subtitle">Finding the best competitive events for your skill level.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hackathons-container">
      <div className="hackathons-header fade-in-up">
        <h1 className="gradient-text">Smart Hackathon Explorer</h1>
        <p className="subtitle">Test your skills, build projects, and win prizes.</p>
        
        <div className="domain-selector">
          {domains.map(d => (
            <button 
              key={d.id}
              className={`domain-pill ${activeDomainId === d.id ? 'active' : ''}`}
              onClick={() => setActiveDomainId(d.id)}
              style={{ 
                borderColor: activeDomainId === d.id ? `var(--${d.color}-500)` : 'var(--border)',
                color: activeDomainId === d.id ? `var(--${d.color}-400)` : 'var(--text-secondary)'
              }}
            >
              <span className="icon">{d.icon}</span> {d.name}
            </button>
          ))}
        </div>
      </div>

      <div className="hackathons-grid">
        {suggestedHackathons.length > 0 ? (
          suggestedHackathons.map((event, index) => (
            <div className="hackathon-card glass-panel fade-in-up" key={event.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-header">
                <div>
                  <h3>{event.name}</h3>
                  <span className="prize-badge">{event.prize} Prize</span>
                </div>
                <button 
                  className={`save-btn ${savedHackathons.includes(event.id) ? 'saved' : ''}`}
                  onClick={() => toggleSave(event.id)}
                  title={savedHackathons.includes(event.id) ? "Unsave" : "Save Hackathon"}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={savedHackathons.includes(event.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
              
              <div className="card-details">
                <p><span className="icon">🎯</span> Theme: {event.theme}</p>
                <p><span className="icon">📈</span> Difficulty: {event.difficulty}</p>
              </div>

              <div className="match-section">
                <div className="match-header">
                  <span>Skill Match</span>
                  <span style={{ color: event.matchPercentage >= 50 ? 'var(--teal-400)' : 'var(--rose-400)'}}>
                    {event.matchPercentage}% Ready
                  </span>
                </div>
                <div className="match-bar-bg">
                  <div 
                    className="match-bar-fill" 
                    style={{ 
                      width: `${event.matchPercentage}%`,
                      background: event.matchPercentage >= 50 ? 'var(--teal-500)' : 'var(--rose-500)'
                    }}
                  ></div>
                </div>
              </div>

              <div className="tags-container">
                {event.requiredSkills.map((skill, idx) => {
                  const hasSkill = event.matchedSkills.includes(skill);
                  return (
                    <span key={idx} className={`tag ${hasSkill ? 'has-skill' : 'missing-skill'}`}>
                      {hasSkill ? '✓ ' : ''}{skill}
                    </span>
                  );
                })}
              </div>

              <div className="apply-actions">
                <p className="apply-text">Register via:</p>
                <div className="action-buttons">
                  <a 
                    href={`https://devpost.com/hackathons?search=${encodeURIComponent(event.theme)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="platform-btn devpost"
                  >
                    Devpost
                  </a>
                  <a 
                    href={`https://mlh.io/seasons/2024/events`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="platform-btn mlh"
                  >
                    MLH
                  </a>
                  <a 
                    href={`https://unstop.com/hackathons?search=${encodeURIComponent(event.name)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="platform-btn unstop"
                  >
                    Unstop
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results glass-panel">
            <h3>No upcoming hackathons found for this domain.</h3>
            <p>Stay tuned for updates!</p>
          </div>
        )}
      </div>

      <div className="hackathons-footer center-content">
        <button className="primary-btn outline" onClick={handleFinish}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
