import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
import roadmapData from '../data/roadmap-data';
import api from '../api';
import './Roadmap.css';

export default function Roadmap() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const domain = state.selectedDomain;
  const domainId = domain ? domain.id : 'webdev';
  const defaultData = roadmapData[domainId] || roadmapData['webdev'];

  const [currentRoadmap, setCurrentRoadmap] = useState(defaultData);
  const [completedWeeks, setCompletedWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingProgress, setSavingProgress] = useState(false);

  // Load saved roadmap from backend
  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 3 });
    let isMounted = true;

    async function fetchRoadmap() {
      try {
        const res = await api.get('/roadmap');
        if (res.data?.roadmapData && isMounted) {
          const savedData = res.data.roadmapData;
          if (savedData.domainId === domainId) {
            setCurrentRoadmap(savedData);
            if (Array.isArray(savedData.completedWeeks)) {
              setCompletedWeeks(savedData.completedWeeks);
            }
          }
        }
      } catch {
        // If no saved roadmap, use default data
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRoadmap();

    return () => { isMounted = false; };
  }, [domainId, dispatch]);

  const toggleWeekCompletion = async (weekNumber) => {
    const isCompleted = completedWeeks.includes(weekNumber);
    const updated = isCompleted
      ? completedWeeks.filter((w) => w !== weekNumber)
      : [...completedWeeks, weekNumber];

    setCompletedWeeks(updated);

    // Persist to backend
    setSavingProgress(true);
    try {
      const payload = {
        roadmapData: {
          ...currentRoadmap,
          domainId,
          completedWeeks: updated,
        }
      };
      await api.post('/roadmap/save', payload);
    } catch (err) {
      console.warn('Could not persist roadmap progress:', err);
    } finally {
      setSavingProgress(false);
    }
  };

  const totalWeeks = currentRoadmap.weeks?.length || 12;
  const progressPercentage = Math.round((completedWeeks.length / totalWeeks) * 100);

  return (
    <div className="page page-enter">
      <div className="roadmap-container">
        {/* Header */}
        <div className="roadmap-header fade-in-up">
          <span className="badge badge-teal">🗺️ Step 3: Personalized Learning Plan</span>
          <h1 className="gradient-text" style={{ marginTop: 12 }}>{currentRoadmap.title}</h1>
          <p className="subtitle">{currentRoadmap.description}</p>
          
          {domain && (
            <div className="badge" style={{ marginTop: 8, borderColor: `var(--${domain.color}-500)` }}>
              Active Path: {domain.name}
            </div>
          )}

          {/* Progress Tracker */}
          <div className="roadmap-progress-panel glass-panel" style={{ marginTop: 24 }}>
            <div className="progress-stats-row">
              <span>Learning Progress</span>
              <span className="gradient-text">
                {completedWeeks.length} of {totalWeeks} Milestones Completed ({progressPercentage}%)
              </span>
            </div>
            <div className="progress-bar" style={{ height: 8, marginTop: 8 }}>
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            {savingProgress && <span className="saving-indicator">Saving progress...</span>}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {currentRoadmap.weeks.map((week, index) => {
            const isCompleted = completedWeeks.includes(week.week);
            return (
              <div
                className={`timeline-item fade-in-up ${isCompleted ? 'milestone-completed' : ''}`}
                key={week.week}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="timeline-marker">
                  <span>{isCompleted ? '✓' : week.week}</span>
                </div>
                
                <div className="timeline-content glass-panel">
                  <div className="milestone-top-row">
                    <h3>{week.title}</h3>
                    <button
                      type="button"
                      className={`btn btn-sm ${isCompleted ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => toggleWeekCompletion(week.week)}
                    >
                      {isCompleted ? '✓ Completed' : 'Mark Complete'}
                    </button>
                  </div>
                  
                  <div className="topics-list">
                    <h4>Key Topics:</h4>
                    <ul>
                      {week.topics.map((topic, idx) => (
                        <li key={idx}>
                          <span
                            className="bullet"
                            style={{ backgroundColor: domain ? `var(--${domain.color}-400, var(--accent-teal))` : 'var(--accent-teal)' }}
                          ></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-box">
                    <h4>🔨 Milestone Project</h4>
                    <p>{week.project}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="roadmap-footer center-content" style={{ marginTop: '3rem' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/skills')}>
            Analyze Skill Gap Next →
          </button>
        </div>
      </div>
    </div>
  );
}

