import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Zap,
  FolderGit2,
  Briefcase,
  Target,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import domains from '../data/domains';
import './Domains.css';

import api from '../api';

export default function Domains() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  async function selectDomain(domain) {
    dispatch({ type: 'SET_DOMAIN', payload: domain });
    dispatch({ type: 'SET_STEP', payload: 3 });

    // Persist selected domain to MongoDB profile
    try {
      if (state.token) {
        await api.post('/profile', { selectedDomain: domain.id });
      }
    } catch (err) {
      console.warn('Could not persist selected domain:', err);
    }

    navigate('/roadmap');
  }

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  return (
    <div className="page page-enter">
      <section className="domains-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Layers size={13} /> Step 2: Choose Career Domain
            </span>
            <h2 style={{ marginTop: '16px' }}>
              Explore Tech <span className="gradient-text">Domains</span>
            </h2>
            <p>Discover what each domain is about, what skills you need, and where it can take you.</p>
          </div>

          <div className="domains-grid">
            {domains.map((domain, i) => (
              <div
                key={domain.id}
                className={`glass-card domain-card domain-card-${domain.color} ${expandedId === domain.id ? 'expanded' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Card Header */}
                <div className="domain-header" onClick={() => toggleExpand(domain.id)}>
                  <div className={`icon-circle icon-circle-${domain.color}`}>
                    <Layers size={22} color="var(--accent-primary)" />
                  </div>
                  <div className="domain-header-text">
                    <h3 className="domain-name">{domain.name}</h3>
                    <p className="domain-tagline">{domain.tagline}</p>
                  </div>
                  <span className={`domain-expand-icon ${expandedId === domain.id ? 'rotated' : ''}`}>
                    ▾
                  </span>
                </div>

                {/* Expanded Content */}
                {expandedId === domain.id && (
                  <div className="domain-details">
                    <div className="divider"></div>

                    {/* Description */}
                    <p className="domain-desc">{domain.description}</p>

                    {/* Skills Required */}
                    <div className="domain-block">
                      <h5 className="domain-block-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Zap size={14} /> Skills Required
                      </h5>
                      <div className="domain-skills">
                        {domain.skills.map((skill) => (
                          <span className="badge" key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>

                    {/* Example Projects */}
                    <div className="domain-block">
                      <h5 className="domain-block-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <FolderGit2 size={14} /> Example Projects
                      </h5>
                      <div className="domain-projects">
                        {domain.exampleProjects.map((proj, j) => (
                          <div className="project-item" key={j}>
                            <div className="project-header">
                              <span className="project-name">{proj.name}</span>
                              <span className={`badge ${proj.difficulty === 'Beginner' ? '' : proj.difficulty === 'Intermediate' ? 'badge-cyan' : 'badge-rose'}`}>
                                {proj.difficulty}
                              </span>
                            </div>
                            <p className="project-desc">{proj.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Opportunities */}
                    <div className="domain-block">
                      <h5 className="domain-block-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Briefcase size={14} /> Career Opportunities
                      </h5>
                      <div className="domain-careers">
                        {domain.careers.map((career, j) => (
                          <div className="career-item" key={j}>
                            <span className="career-role">{career.role}</span>
                            <span className="career-salary">{career.salary}</span>
                            <span className={`badge ${career.demand === 'Very High' ? '' : career.demand === 'High' ? 'badge-cyan' : 'badge-rose'}`}>
                              {career.demand}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Select Button */}
                    <button
                      className="btn btn-primary btn-lg domain-select-btn"
                      onClick={() => selectDomain(domain)}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                    >
                      Choose {domain.name} <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quiz CTA */}
          <div className="domains-quiz-cta glass-card">
            <div className="quiz-cta-content">
              <h4>Need guidance choosing a technical track?</h4>
              <p>Complete a quick assessment to evaluate your skills and target specializations.</p>
            </div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/quiz')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Target size={15} /> Take Career Assessment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
