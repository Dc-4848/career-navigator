import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
import internshipRoles from '../data/internship-roles';
import domains from '../data/domains';
import api from '../api';
import './Internships.css';

export default function Internships() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedRoles, setSuggestedRoles] = useState([]);
  const [savedItems, setSavedItems] = useState(state.savedInternships || []);
  const [filter, setFilter] = useState('All');
  const [activeDomainId, setActiveDomainId] = useState(state.selectedDomain ? state.selectedDomain.id : domains[0].id);

  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];
  const userSkills = state.profile?.skills || [];

  // Load saved internships from backend
  useEffect(() => {
    let isMounted = true;
    api.get('/internships')
      .then((res) => {
        if (isMounted && Array.isArray(res.data)) {
          setSavedItems(res.data);
          dispatch({ type: 'SET_SAVED_INTERNSHIPS', payload: res.data });
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, [dispatch]);

  // Analyze roles against user profile
  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 5 });
    setLoading(true);

    const timer = setTimeout(() => {
      const roles = internshipRoles[activeDomain.id] || [];
      
      const analyzedRoles = roles.map(role => {
        const required = role.requiredSkills || [];
        const matched = required.filter(rSkill => 
          userSkills.some(uSkill => uSkill.toLowerCase() === rSkill.toLowerCase())
        );
        const matchPercentage = required.length > 0 ? Math.round((matched.length / required.length) * 100) : 0;
        
        return {
          ...role,
          matchPercentage,
          matchedSkills: matched,
          missingSkills: required.filter(s => !matched.includes(s))
        };
      });

      // Sort by match percentage
      analyzedRoles.sort((a, b) => b.matchPercentage - a.matchPercentage);
      
      setSuggestedRoles(analyzedRoles);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [activeDomain.id, userSkills, dispatch]);

  const isRoleSaved = (role) => {
    return savedItems.some(item => item.title.toLowerCase() === role.title.toLowerCase());
  };

  const getSavedRecordId = (role) => {
    const found = savedItems.find(item => item.title.toLowerCase() === role.title.toLowerCase());
    return found ? found._id : null;
  };

  const toggleSave = async (role) => {
    const recordId = getSavedRecordId(role);

    if (recordId) {
      // Unsave
      try {
        await api.delete(`/internships/${recordId}`);
        const updated = savedItems.filter(item => item._id !== recordId);
        setSavedItems(updated);
        dispatch({ type: 'SET_SAVED_INTERNSHIPS', payload: updated });
      } catch (err) {
        console.error('Failed to remove bookmark:', err);
      }
    } else {
      // Save
      try {
        const res = await api.post('/internships/save', {
          title: role.title,
          company: 'Career Navigator Partner',
          location: 'Remote / Hybrid',
          link: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role.title)}`,
          type: 'internship'
        });
        const updated = [res.data, ...savedItems];
        setSavedItems(updated);
        dispatch({ type: 'SET_SAVED_INTERNSHIPS', payload: updated });
      } catch (err) {
        console.error('Failed to save bookmark:', err);
      }
    }
  };

  const getFilteredRoles = () => {
    let result = suggestedRoles;

    // Filter by tab
    if (filter === 'Saved') {
      result = result.filter(r => isRoleSaved(r));
    } else if (filter !== 'All') {
      result = result.filter(r => r.level === filter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.requiredSkills && r.requiredSkills.some(s => s.toLowerCase().includes(q)))
      );
    }

    return result;
  };

  const filteredRoles = getFilteredRoles();
  const savedCount = suggestedRoles.filter(r => isRoleSaved(r)).length;

  return (
    <div className="page page-enter">
      <div className="internships-container">
        <div className="internships-header fade-in-up">
          <span className="badge badge-teal">💼 Career Opportunities</span>
          <h1 className="gradient-text" style={{ marginTop: 12 }}>Internship Explorer</h1>
          <p className="subtitle">Discover real-world opportunities and match them directly with your skillset.</p>
          
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

          {/* Search & Filter Bar */}
          <div className="search-filter-row">
            <div className="internship-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search roles or skills (e.g., React, Python, Backend)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="internship-search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            <div className="filter-tabs">
              {['All', 'Beginner', 'Intermediate', 'Advanced', 'Saved'].map(f => (
                <button 
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f} {f === 'Saved' && `(${savedCount})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="internships-loading glass-panel">
            <div className="spinner"></div>
            <h3>Analyzing your profile match...</h3>
            <p className="subtitle">Ranking opportunities tailored to your technical abilities.</p>
          </div>
        ) : (
          <div className="internships-grid">
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role, index) => {
                const saved = isRoleSaved(role);
                return (
                  <div className="internship-card glass-panel fade-in-up" key={role.id || index} style={{ animationDelay: `${index * 0.05}s` }}>
                    
                    <div className="card-header">
                      <div>
                        <h3>{role.title}</h3>
                        <span className={`level-badge ${role.level.toLowerCase()}`}>{role.level}</span>
                      </div>
                      <button 
                        className={`save-btn ${saved ? 'saved' : ''}`}
                        onClick={() => toggleSave(role)}
                        title={saved ? "Remove Bookmark" : "Bookmark Internship"}
                        aria-label={saved ? "Remove Bookmark" : "Bookmark Internship"}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <p className="role-description">{role.description}</p>

                    <div className="match-section">
                      <div className="match-header">
                        <span>Skill Match</span>
                        <span style={{ color: role.matchPercentage >= 50 ? 'var(--accent-teal)' : 'var(--accent-rose)'}}>
                          {role.matchPercentage}% Ready
                        </span>
                      </div>
                      <div className="match-bar-bg">
                        <div 
                          className="match-bar-fill" 
                          style={{ 
                            width: `${role.matchPercentage}%`,
                            background: role.matchPercentage >= 50 ? 'linear-gradient(90deg, var(--accent-teal), #00c49a)' : 'var(--accent-rose)'
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="tags-container">
                      {role.requiredSkills.map((skill, idx) => {
                        const hasSkill = role.matchedSkills.includes(skill);
                        return (
                          <span key={idx} className={`tag ${hasSkill ? 'has-skill' : 'missing-skill'}`}>
                            {hasSkill ? '✓ ' : ''}{skill}
                          </span>
                        );
                      })}
                    </div>

                    <div className="apply-actions">
                      <p className="apply-text">Apply on official boards:</p>
                      <div className="action-buttons">
                        <a 
                          href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role.title)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="platform-btn linkedin"
                        >
                          LinkedIn
                        </a>
                        <a 
                          href={`https://internshala.com/internships/${encodeURIComponent(role.title.toLowerCase().replace(/ /g, '-'))}-internship/`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="platform-btn internshala"
                        >
                          Internshala
                        </a>
                        <a 
                          href={`https://unstop.com/internships?search=${encodeURIComponent(role.title)}`} 
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
                <span className="no-results-icon">📂</span>
                <h3>No internships found matching your criteria.</h3>
                <p>Try changing your filter, clearing your search keywords, or selecting a different career domain.</p>
                <button className="btn btn-secondary btn-sm" onClick={() => { setFilter('All'); setSearchQuery(''); }}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        <div className="internships-footer center-content">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/hackathons')}>
            Explore Hackathons →
          </button>
        </div>
      </div>
    </div>
  );
}

