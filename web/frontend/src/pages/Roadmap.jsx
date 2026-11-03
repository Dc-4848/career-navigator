import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  BookOpen,
  Sparkles,
  Clock,
  CheckCircle2,
  FolderGit2,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckSquare,
  Square,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import roadmapData from '../data/roadmap-data';
import domains from '../data/domains';
import api from '../api';
import './Roadmap.css';

export default function Roadmap() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const domain = state.selectedDomain || state.profile.selectedDomain;
  const domainId = typeof domain === 'string' ? domain : (domain ? domain.id : 'webdev');
  const activeDomainObj = typeof domain === 'object' && domain ? domain : (domains.find(d => d.id === domainId) || domains[0]);
  const defaultLegacyData = roadmapData[domainId] || roadmapData['webdev'];

  // Tabs: 'active' | 'catalog' | 'ai'
  const [activeTab, setActiveTab] = useState('active');

  // Catalog State
  const [catalog, setCatalog] = useState([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('All');

  // Active Structured Roadmap State
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(domainId === 'webdev' ? 'fullstack' : domainId);
  const [roadmapDetail, setRoadmapDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [savingProgress, setSavingProgress] = useState(false);

  // AI Generator State
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiCustomInput, setAiCustomInput] = useState({
    targetRole: activeDomainObj?.name || 'Full Stack Developer',
    experienceLevel: 'Beginner',
    timeCommitment: '10-15 hours/week'
  });

  // Load catalog on mount
  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 3 });
    fetchCatalog();
  }, [dispatch]);

  // Load detail when selected roadmap changes
  useEffect(() => {
    if (selectedRoadmapId) {
      fetchRoadmapDetail(selectedRoadmapId);
    }
  }, [selectedRoadmapId]);

  const fetchCatalog = async () => {
    try {
      setLoadingCatalog(true);
      const res = await api.get('/roadmaps/catalog');
      if (Array.isArray(res.data) && res.data.length > 0) {
        setCatalog(res.data);
      }
    } catch (e) {
      console.warn('Failed to fetch structured catalog:', e);
    } finally {
      setLoadingCatalog(false);
    }
  };

  const fetchRoadmapDetail = async (id) => {
    try {
      setLoadingDetail(true);
      const res = await api.get(`/roadmaps/${id}`);
      if (res.data) {
        setRoadmapDetail(res.data);
      }
    } catch {
      // Fallback: build a structured shape from legacy data if available
      if (defaultLegacyData) {
        setRoadmapDetail({
          id: domainId,
          title: defaultLegacyData.title,
          category: activeDomainObj?.name || 'Software Engineering',
          description: defaultLegacyData.description,
          estimatedWeeks: defaultLegacyData.weeks?.length || 12,
          difficulty: 'Intermediate',
          stages: (defaultLegacyData.weeks || []).map((w, idx) => ({
            stageNumber: w.week || idx + 1,
            title: w.title,
            estimatedHours: 15,
            topics: w.topics || [],
            assignments: [w.project || 'Complete week project milestone.'],
            miniProject: w.project,
          })),
          capstoneProject: {
            title: `${defaultLegacyData.title} Production Capstone`,
            description: 'Build, test, containerize and deploy an end-to-end full stack solution with CI/CD.',
            keyRequirements: ['Authentication', 'Database Integration', 'Production Deployment']
          },
          progress: {
            completedStages: [],
            completedTopics: [],
            progressPercent: 0
          }
        });
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleToggleStage = async (stageNumber) => {
    if (!roadmapDetail) return;
    const completed = roadmapDetail.progress?.completedStages || [];
    const isCompleted = completed.includes(stageNumber);
    const updatedStages = isCompleted
      ? completed.filter(s => s !== stageNumber)
      : [...completed, stageNumber];

    const progressPercent = Math.round((updatedStages.length / (roadmapDetail.stages?.length || 1)) * 100);

    // Optimistic UI update
    setRoadmapDetail(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        completedStages: updatedStages,
        progressPercent
      }
    }));

    setSavingProgress(true);
    try {
      await api.post(`/roadmaps/${roadmapDetail.id}/progress`, { stageNumber });
      // Update catalog progress in background
      fetchCatalog();
    } catch (e) {
      console.warn('Failed to save stage progress:', e);
    } finally {
      setSavingProgress(false);
    }
  };

  const handleToggleTopic = async (topic) => {
    if (!roadmapDetail) return;
    const completedTopics = roadmapDetail.progress?.completedTopics || [];
    const isCompleted = completedTopics.includes(topic);
    const updated = isCompleted
      ? completedTopics.filter(t => t !== topic)
      : [...completedTopics, topic];

    setRoadmapDetail(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        completedTopics: updated
      }
    }));

    try {
      await api.post(`/roadmaps/${roadmapDetail.id}/progress`, { topic });
    } catch (e) {
      console.warn('Failed to save topic progress:', e);
    }
  };

  const handleGenerateAI = async (e) => {
    e.preventDefault();
    setGeneratingAI(true);
    setAiError('');

    try {
      const res = await api.post('/ai/generate-roadmap', {
        degree: state.profile?.degree || 'B.Tech CS',
        careerGoal: aiCustomInput.targetRole,
        experienceLevel: aiCustomInput.experienceLevel,
        timeCommitment: aiCustomInput.timeCommitment,
      });

      if (res.data) {
        // Adapt AI response into roadmapDetail
        const aiRoadmap = res.data.roadmap || res.data;
        const weeks = aiRoadmap.weeks || [];
        const adaptedDetail = {
          id: 'custom-ai',
          title: aiRoadmap.title || `AI Custom Plan: ${aiCustomInput.targetRole}`,
          category: 'AI Generated',
          description: aiRoadmap.description || 'Custom tailored learning path based on your exact profile and goal.',
          estimatedWeeks: weeks.length || 10,
          difficulty: aiCustomInput.experienceLevel,
          stages: weeks.map((w, idx) => ({
            stageNumber: w.week || idx + 1,
            title: w.title,
            estimatedHours: 12,
            topics: w.topics || [],
            assignments: [w.project || 'Milestone assignment.'],
            miniProject: w.project,
          })),
          capstoneProject: {
            title: `${aiCustomInput.targetRole} Capstone Project`,
            description: 'Comprehensive portfolio-ready project demonstrating mastered concepts.',
            keyRequirements: ['Architecture', 'Implementation', 'Live Deployment']
          },
          progress: {
            completedStages: [],
            completedTopics: [],
            progressPercent: 0
          }
        };

        setRoadmapDetail(adaptedDetail);
        setActiveTab('active');
      }
    } catch (err) {
      setAiError(err.response?.data?.message || err.message || 'Failed to generate AI roadmap');
    } finally {
      setGeneratingAI(false);
    }
  };

  const categories = ['All', ...new Set(catalog.map(r => r.category).filter(Boolean))];

  const filteredCatalog = catalog.filter(item => {
    const matchesSearch = !catalogSearch ||
      item.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchesCat = catalogCategory === 'All' || item.category === catalogCategory;
    return matchesSearch && matchesCat;
  });

  const progressPercent = roadmapDetail?.progress?.progressPercent || 0;
  const completedStagesCount = roadmapDetail?.progress?.completedStages?.length || 0;
  const totalStages = roadmapDetail?.stages?.length || 0;

  return (
    <div className="page page-enter">
      <div className="roadmap-container">
        {/* Header */}
        <div className="roadmap-header">
          <span className="badge badge-cyan">Structured Engineering Curricula</span>
          <h1 style={{ marginTop: 12 }}>
            {roadmapDetail ? roadmapDetail.title : 'Career Learning Roadmaps'}
          </h1>
          <p className="subtitle">
            {roadmapDetail?.description || 'Follow verified step-by-step roadmaps, complete milestones, and track your engineering mastery.'}
          </p>

          {/* Navigation Tabs */}
          <div className="roadmap-tabs">
            <button
              className={`roadmap-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              <Layers size={15} />
              <span>Active Roadmap {roadmapDetail ? `(${progressPercent}%)` : ''}</span>
            </button>
            <button
              className={`roadmap-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <BookOpen size={15} />
              <span>Explore All Roadmaps ({catalog.length || 12})</span>
            </button>
            <button
              className={`roadmap-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles size={15} />
              <span>Custom Generator</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ACTIVE ROADMAP */}
        {activeTab === 'active' && (
          <div className="active-roadmap-view">
            {loadingDetail ? (
              <div className="center-content" style={{ padding: '3rem' }}>
                <div className="loading-spinner"></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading roadmap details...</p>
              </div>
            ) : roadmapDetail ? (
              <>
                {/* Roadmap Metadata & Progress Banner */}
                <div className="roadmap-meta-card glass-panel">
                  <div className="roadmap-meta-left">
                    <div className="badges-row">
                      <span className="badge badge-cyan">{roadmapDetail.category}</span>
                      <span className="badge badge-blue">{roadmapDetail.difficulty || 'All Levels'}</span>
                      <span className="badge badge-amber">
                        <Clock size={12} />
                        <span>~{roadmapDetail.estimatedWeeks} Weeks</span>
                      </span>
                    </div>
                    <h2 style={{ marginTop: '0.75rem' }}>{roadmapDetail.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.95rem' }}>
                      {roadmapDetail.description}
                    </p>
                  </div>

                  <div className="roadmap-meta-right">
                    <div className="progress-radial-box">
                      <span className="progress-number">{progressPercent}%</span>
                      <span className="progress-label">Completed</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="roadmap-progress-panel glass-panel">
                  <div className="progress-stats-row">
                    <span>Stage Completion</span>
                    <span className="gradient-text">
                      {completedStagesCount} of {totalStages} Stages Complete ({progressPercent}%)
                    </span>
                  </div>
                  <div className="progress-bar" style={{ height: 10, marginTop: 8 }}>
                    <div
                      className="progress-fill"
                      style={{ width: `${progressPercent}%`, transition: 'width 0.4s ease' }}
                    ></div>
                  </div>
                  {savingProgress && <span className="saving-indicator">Saving progress to Atlas...</span>}
                </div>

                {/* Timeline Stages */}
                <div className="timeline" style={{ marginTop: '2.5rem' }}>
                  {roadmapDetail.stages?.map((stage, index) => {
                    const isCompleted = roadmapDetail.progress?.completedStages?.includes(stage.stageNumber);
                    const completedTopics = roadmapDetail.progress?.completedTopics || [];

                    return (
                      <div
                        className={`timeline-item fade-in-up ${isCompleted ? 'milestone-completed' : ''}`}
                        key={stage.stageNumber}
                        style={{ animationDelay: `${index * 0.04}s` }}
                      >
                        <div className="timeline-marker">
                          {isCompleted ? <Check size={18} /> : <span>{stage.stageNumber}</span>}
                        </div>

                        <div className="timeline-content glass-panel">
                          <div className="milestone-top-row">
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="stage-pill">Stage {stage.stageNumber}</span>
                                {stage.estimatedHours && (
                                  <span className="hours-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                    <Clock size={12} /> {stage.estimatedHours}h est.
                                  </span>
                                )}
                              </div>
                              <h3 style={{ marginTop: 6 }}>{stage.title}</h3>
                            </div>
                            <button
                              type="button"
                              className={`btn btn-sm ${isCompleted ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => handleToggleStage(stage.stageNumber)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                            >
                              {isCompleted ? (
                                <>
                                  <Check size={14} /> Stage Completed
                                </>
                              ) : (
                                'Mark Stage Done'
                              )}
                            </button>
                          </div>

                          {/* Topics with interactive checkboxes */}
                          <div className="topics-list">
                            <h4>Key Topics:</h4>
                            <div className="interactive-topics-grid">
                              {stage.topics?.map((topic, idx) => {
                                const topicDone = completedTopics.includes(topic);
                                return (
                                  <div
                                    key={idx}
                                    className={`interactive-topic-item ${topicDone ? 'topic-done' : ''}`}
                                    onClick={() => handleToggleTopic(topic)}
                                  >
                                    <span className="topic-checkbox" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                      {topicDone ? <CheckSquare size={14} /> : <Square size={14} />}
                                    </span>
                                    <span className="topic-text">{topic}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Assignments / Practical projects */}
                          {stage.assignments && stage.assignments.length > 0 && (
                            <div className="assignments-box">
                              <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FileText size={14} /> Practical Assignments:
                              </h4>
                              <ul>
                                {stage.assignments.map((assignment, aIdx) => (
                                  <li key={aIdx}>{assignment}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Mini Project */}
                          {stage.miniProject && (
                            <div className="project-box" style={{ marginTop: '1rem' }}>
                              <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FolderGit2 size={14} /> Milestone Project
                              </h4>
                              <p>{stage.miniProject}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Capstone Project Section */}
                {roadmapDetail.capstoneProject && (
                  <div className="capstone-panel glass-panel fade-in-up" style={{ marginTop: '3rem' }}>
                    <div className="capstone-header">
                      <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <Trophy size={13} /> Production Capstone Project
                      </span>
                      <h2 style={{ marginTop: 10 }}>{roadmapDetail.capstoneProject.title}</h2>
                      <p style={{ color: 'var(--text-secondary)', marginTop: 6 }}>
                        {roadmapDetail.capstoneProject.description}
                      </p>
                    </div>

                    {roadmapDetail.capstoneProject.keyRequirements && (
                      <div className="capstone-reqs" style={{ marginTop: 16 }}>
                        <h4 style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', marginBottom: 8 }}>
                          Key Requirements to Build:
                        </h4>
                        <div className="reqs-grid">
                          {roadmapDetail.capstoneProject.keyRequirements.map((req, rIdx) => (
                            <div key={rIdx} className="req-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                              <Check size={13} /> {req}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Navigation */}
                <div className="roadmap-footer center-content" style={{ marginTop: '3rem' }}>
                  <button className="btn btn-secondary btn-lg" onClick={() => setActiveTab('catalog')} style={{ marginRight: '1rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <ArrowLeft size={16} /> Explore Other Roadmaps
                  </button>
                  <button className="btn btn-primary btn-lg" onClick={() => navigate('/skills')}>
                    Analyze Skill Gap Next →
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-state glass-panel center-content" style={{ padding: '3rem' }}>
                <p>No roadmap loaded. Choose one from the catalog to begin!</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('catalog')} style={{ marginTop: '1rem' }}>
                  Browse Roadmap Catalog
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPLORE CATALOG */}
        {activeTab === 'catalog' && (
          <div className="catalog-view fade-in-up">
            {/* Filter and Search Bar */}
            <div className="catalog-controls glass-panel">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search roadmaps by role or technology (e.g. Full Stack, AI, DevOps)..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="category-chips">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-chip ${catalogCategory === cat ? 'active' : ''}`}
                    onClick={() => setCatalogCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            {loadingCatalog ? (
              <div className="center-content" style={{ padding: '3rem' }}>
                <div className="loading-spinner"></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading catalog...</p>
              </div>
            ) : (
              <div className="catalog-grid">
                {filteredCatalog.map((item) => {
                  const isCurrent = roadmapDetail?.id === item.id;
                  const itemProgress = item.progress?.progressPercent || 0;

                  return (
                    <div
                      key={item.id}
                      className={`catalog-card glass-panel ${isCurrent ? 'current-active-card' : ''}`}
                    >
                      <div className="card-top">
                        <span className="badge badge-teal">{item.category}</span>
                        <span className="badge badge-cyan">{item.difficulty}</span>
                      </div>

                      <h3 style={{ marginTop: '1rem', fontSize: '1.25rem' }}>{item.title}</h3>
                      <p className="card-desc">{item.description}</p>

                      <div className="card-stats">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <Layers size={13} /> {item.stagesCount || item.stages?.length || 5} Stages
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <Clock size={13} /> ~{item.estimatedWeeks} Weeks
                        </span>
                      </div>

                      {itemProgress > 0 && (
                        <div className="mini-progress-bar">
                          <div className="mini-progress-fill" style={{ width: `${itemProgress}%` }}></div>
                          <span className="mini-progress-text">{itemProgress}% completed</span>
                        </div>
                      )}

                      <div className="card-action" style={{ marginTop: '1.25rem' }}>
                        <button
                          className={`btn ${isCurrent ? 'btn-primary' : 'btn-secondary'} btn-full`}
                          onClick={() => {
                            setSelectedRoadmapId(item.id);
                            setActiveTab('active');
                          }}
                          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                        >
                          {isCurrent ? 'Resume Roadmap' : 'View & Track Roadmap'} <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AI CUSTOM GENERATOR */}
        {activeTab === 'ai' && (
          <div className="ai-generator-view glass-panel fade-in-up" style={{ padding: '2.5rem', maxWidth: 700, margin: '0 auto' }}>
            <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={13} /> AI Roadmap Generator
            </span>
            <h2 style={{ marginTop: '0.75rem' }}>Generate a Tailored Learning Plan</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.75rem' }}>
              Career Navigator analyzes your current education level, target career role, and weekly time commitment to synthesize a customized roadmap.
            </p>

            {aiError && (
              <div className="alert alert-error" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(239,68,68,0.15)', border: '1px solid var(--accent-rose)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={16} /> {aiError}
              </div>
            )}

            <form onSubmit={handleGenerateAI} className="ai-form">
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Target Role / Goal</label>
                <input
                  type="text"
                  value={aiCustomInput.targetRole}
                  onChange={(e) => setAiCustomInput({ ...aiCustomInput, targetRole: e.target.value })}
                  placeholder="e.g. Cloud Security Specialist, Machine Learning Engineer"
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Your Experience Level</label>
                <select
                  value={aiCustomInput.experienceLevel}
                  onChange={(e) => setAiCustomInput({ ...aiCustomInput, experienceLevel: e.target.value })}
                  className="input-field"
                >
                  <option value="Beginner">Beginner (Little to no experience)</option>
                  <option value="Intermediate">Intermediate (Familiar with programming fundamentals)</option>
                  <option value="Advanced">Advanced (Looking to specialize or transition roles)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Weekly Time Commitment</label>
                <select
                  value={aiCustomInput.timeCommitment}
                  onChange={(e) => setAiCustomInput({ ...aiCustomInput, timeCommitment: e.target.value })}
                  className="input-field"
                >
                  <option value="5-10 hours/week">5-10 hours / week (Part-time / College classes)</option>
                  <option value="10-15 hours/week">10-15 hours / week (Standard pacing)</option>
                  <option value="20+ hours/week">20+ hours / week (Full-time intensive study)</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-full"
                disabled={generatingAI}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                {generatingAI ? (
                  <>
                    <Sparkles size={16} /> Synthesizing Custom Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Generate Learning Roadmap
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
