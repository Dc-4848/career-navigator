import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
import internshipRoles from '../data/internship-roles';
import domains from '../data/domains';
import './Internships.css';

export default function Internships() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [suggestedRoles, setSuggestedRoles] = useState([]);
  const [savedInternships, setSavedInternships] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeDomainId, setActiveDomainId] = useState(state.selectedDomain ? state.selectedDomain.id : domains[0].id);

  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];
  const userSkills = state.profile.skills || [];

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 5 });

    setLoading(true);
    // Simulate AI analysis delay
    const timer = setTimeout(() => {
      const roles = internshipRoles[activeDomain.id] || [];
      
      const analyzedRoles = roles.map(role => {
        const required = role.requiredSkills;
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
    }, 1200);

    return () => clearTimeout(timer);
  }, [activeDomain.id, userSkills, dispatch]);

  const toggleSave = (id) => {
    if (savedInternships.includes(id)) {
      setSavedInternships(savedInternships.filter(savedId => savedId !== id));
    } else {
      setSavedInternships([...savedInternships, id]);
    }
  };

  const getFilteredRoles = () => {
    if (filter === 'All') return suggestedRoles;
    if (filter === 'Saved') return suggestedRoles.filter(r => savedInternships.includes(r.id));
    return suggestedRoles.filter(r => r.level === filter);
  };

  const filteredRoles = getFilteredRoles();

  if (loading) {
    return (
      <div className="internships-container center-content">
        <div className="analyzer-box glass-panel">
          <div className="spinner"></div>
          <h2>Analyzing your profile...</h2>
          <p className="subtitle">Finding the best internship opportunities based on your skills.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="internships-container">
      <div className="internships-header fade-in-up">
        <h1 className="gradient-text">Internship Explorer</h1>
        <p className="subtitle">Discover opportunities and see how well your skills match.</p>
        
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

        <div className="filter-tabs">
          {['All', 'Beginner', 'Intermediate', 'Advanced', 'Saved'].map(f => (
            <button 
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f} {f === 'Saved' && `(${savedInternships.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="internships-grid">
        {filteredRoles.length > 0 ? (
          filteredRoles.map((role, index) => (
            <div className="internship-card glass-panel fade-in-up" key={role.id} style={{ animationDelay: `${index * 0.1}s` }}>
              
              <div className="card-header">
                <div>
                  <h3>{role.title}</h3>
                  <span className={`level-badge ${role.level.toLowerCase()}`}>{role.level}</span>
                </div>
                <button 
                  className={`save-btn ${savedInternships.includes(role.id) ? 'saved' : ''}`}
                  onClick={() => toggleSave(role.id)}
                  title={savedInternships.includes(role.id) ? "Unsave" : "Save Internship"}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={savedInternships.includes(role.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>
              
              <p className="role-description">{role.description}</p>

              <div className="match-section">
                <div className="match-header">
                  <span>Skill Match</span>
                  <span style={{ color: role.matchPercentage >= 50 ? 'var(--teal-400)' : 'var(--rose-400)'}}>
                    {role.matchPercentage}% Ready
                  </span>
                </div>
                <div className="match-bar-bg">
                  <div 
                    className="match-bar-fill" 
                    style={{ 
                      width: `${role.matchPercentage}%`,
                      background: role.matchPercentage >= 50 ? 'var(--teal-500)' : 'var(--rose-500)'
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
                <p className="apply-text">Search & Apply via:</p>
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
          ))
        ) : (
          <div className="no-results glass-panel fade-in-up">
            <h3>No internships found for this filter.</h3>
            <p>Try changing your filter or updating your profile skills.</p>
          </div>
        )}
      </div>

      <div className="internships-footer center-content" style={{ marginTop: '3rem' }}>
        <button className="primary-btn" onClick={() => navigate('/hackathons')}>
          Explore Hackathons
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
