import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
import roadmapData from '../data/roadmap-data';
import './Roadmap.css';

export default function Roadmap() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 3 });
  }, [dispatch]);

  const domain = state.selectedDomain;

  // Fallback to webdev if accessed directly without domain selected
  const domainId = domain ? domain.id : 'webdev';
  const data = roadmapData[domainId];

  const handleNext = () => {
    navigate('/skills');
  };

  return (
    <div className="roadmap-container">
      <div className="roadmap-header">
        <h1 className="gradient-text">{data.title}</h1>
        <p className="subtitle">{data.description}</p>
        {domain && <div className="badge" style={{ backgroundColor: `var(--${domain.color}-500)` }}>{domain.name}</div>}
      </div>

      <div className="timeline">
        {data.weeks.map((week, index) => (
          <div className="timeline-item fade-in-up" key={week.week} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="timeline-marker">
              <span>{week.week}</span>
            </div>
            
            <div className="timeline-content glass-panel">
              <h3>{week.title}</h3>
              
              <div className="topics-list">
                <h4>Key Topics:</h4>
                <ul>
                  {week.topics.map((topic, idx) => (
                    <li key={idx}>
                      <span className="bullet" style={{ backgroundColor: domain ? `var(--${domain.color}-400)` : 'var(--teal-400)' }}></span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="project-box">
                <h4>Milestone Project</h4>
                <p>{week.project}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="roadmap-footer center-content" style={{ marginTop: '4rem' }}>
        <button className="primary-btn" onClick={handleNext}>
          Analyze Skill Gap
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
