import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
import hackathonEvents from '../data/hackathon-events';
import domains from '../data/domains';
import api from '../api';
import './Hackathons.css';

export default function Hackathons() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedHackathons, setSuggestedHackathons] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [activeDomainId, setActiveDomainId] = useState(state.selectedDomain ? state.selectedDomain.id : domains[0].id);

  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];
  const userSkills = state.profile?.skills || [];

  // Load saved bookmarks from backend
  useEffect(() => {
    let isMounted = true;
    api.get('/internships')
      .then((res) => {
        if (isMounted && Array.isArray(res.data)) {
          setSavedItems(res.data.filter(item => item.type === 'hackathon'));
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 6 });
    setLoading(true);

    const timer = setTimeout(() => {
      const events = hackathonEvents[activeDomain.id] || [];
      
      const analyzedEvents = events.map(event => {
        const required = event.requiredSkills || [];
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
    }, 600);

    return () => clearTimeout(timer);
  }, [activeDomain.id, userSkills, dispatch]);

  const isEventSaved = (event) => {
    return savedItems.some(item => item.title.toLowerCase() === event.name.toLowerCase());
  };

  const getSavedRecordId = (event) => {
    const found = savedItems.find(item => item.title.toLowerCase() === event.name.toLowerCase());
    return found ? found._id : null;
  };

  const toggleSave = async (event) => {
    const recordId = getSavedRecordId(event);

    if (recordId) {
      // Unsave
      try {
        await api.delete(`/internships/${recordId}`);
        setSavedItems(savedItems.filter(item => item._id !== recordId));
      } catch (err) {
        console.error('Failed to remove hackathon bookmark:', err);
      }
    } else {
      // Save
      try {
        const res = await api.post('/internships/save', {
          title: event.name,
          company: event.theme,
          location: 'Global / Online',
          link: `https://devpost.com/hackathons?search=${encodeURIComponent(event.theme)}`,
          type: 'hackathon'
        });
        setSavedItems([res.data, ...savedItems]);
      } catch (err) {
        console.error('Failed to bookmark hackathon:', err);
      }
    }
  };

  const getFilteredEvents = () => {
    let result = suggestedHackathons;

    if (difficultyFilter === 'Bookmarked') {
      result = result.filter(e => isEventSaved(e));
    } else if (difficultyFilter !== 'All') {
      result = result.filter(e => e.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.theme.toLowerCase().includes(q) ||
        (e.requiredSkills && e.requiredSkills.some(s => s.toLowerCase().includes(q)))
      );
    }

    return result;
  };

  const filteredEvents = getFilteredEvents();
  const bookmarkedCount = suggestedHackathons.filter(e => isEventSaved(e)).length;

  return (
    <div className="page page-enter">
      <div className="hackathons-container">
        <div className="hackathons-header fade-in-up">
          <span className="badge badge-violet">🏆 Competitive Programming & Building</span>
          <h1 className="gradient-text" style={{ marginTop: 12 }}>Smart Hackathon Explorer</h1>
          <p className="subtitle">Test your abilities, collaborate with peers, build portfolio projects, and win prizes.</p>
          
          {/* Domain Selector */}
          <div className="domain-selector">
            {domains.map(d => (
              <button 
                key={d.id}
                className={`domain-pill ${activeDomainId === d.id ? 'active' : ''}`}
                onClick={() => setActiveDomainId(d.id)}
                style={{ 
                  borderColor: activeDomainId === d.id ? `var(--${d.color}-500)` : 'var(--glass-border)',
                  color: activeDomainId === d.id ? `var(--${d.color}-400, var(--accent-teal))` : 'var(--text-secondary)'
                }}
              >
                <span className="icon">{d.icon}</span> {d.name}
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="search-filter-row">
            <div className="internship-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search hackathons, themes, or skills (e.g. AI, Web3, FinTech)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="internship-search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            <div className="filter-tabs">
              {['All', 'Beginner', 'Intermediate', 'Advanced', 'Bookmarked'].map(f => (
                <button 
                  key={f}
                  className={`filter-btn ${difficultyFilter === f ? 'active' : ''}`}
                  onClick={() => setDifficultyFilter(f)}
                >
                  {f} {f === 'Bookmarked' && `(${bookmarkedCount})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="internships-loading glass-panel">
            <div className="spinner"></div>
            <h3>Analyzing upcoming hackathons...</h3>
            <p className="subtitle">Matching hackathon tracks and required skills to your background.</p>
          </div>
        ) : (
          <div className="hackathons-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => {
                const saved = isEventSaved(event);
                return (
                  <div className="hackathon-card glass-panel fade-in-up" key={event.id || index} style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="card-header">
                      <div>
                        <h3>{event.name}</h3>
                        <span className="prize-badge">🏆 {event.prize}</span>
                      </div>
                      <button 
                        className={`save-btn ${saved ? 'saved' : ''}`}
                        onClick={() => toggleSave(event)}
                        title={saved ? "Remove Bookmark" : "Bookmark Hackathon"}
                        aria-label={saved ? "Remove Bookmark" : "Bookmark Hackathon"}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="card-details">
                      <p><span className="detail-icon">🎯</span> <strong>Theme:</strong> {event.theme}</p>
                      <p><span className="detail-icon">📈</span> <strong>Difficulty:</strong> {event.difficulty}</p>
                    </div>

                    <div className="match-section">
                      <div className="match-header">
                        <span>Skill Match</span>
                        <span style={{ color: event.matchPercentage >= 50 ? 'var(--accent-teal)' : 'var(--accent-rose)'}}>
                          {event.matchPercentage}% Ready
                        </span>
                      </div>
                      <div className="match-bar-bg">
                        <div 
                          className="match-bar-fill" 
                          style={{ 
                            width: `${event.matchPercentage}%`,
                            background: event.matchPercentage >= 50 ? 'linear-gradient(90deg, var(--accent-teal), #00c49a)' : 'var(--accent-rose)'
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
                      <p className="apply-text">Register via partner portals:</p>
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
                          href="https://mlh.io/seasons/2024/events" 
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
                );
              })
            ) : (
              <div className="no-results glass-panel fade-in-up">
                <span className="no-results-icon">🏆</span>
                <h3>No hackathons found matching your criteria.</h3>
                <p>Try clearing your search keyword, selecting a different difficulty, or choosing another domain.</p>
                <button className="btn btn-secondary btn-sm" onClick={() => { setDifficultyFilter('All'); setSearchQuery(''); }}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        <div className="hackathons-footer center-content">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
            Back to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}

