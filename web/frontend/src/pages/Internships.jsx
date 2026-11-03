import { useState, useEffect, useMemo } from 'react';
import {
  Briefcase,
  Search,
  ClipboardList,
  Target,
  MapPin,
  DollarSign,
  Clock,
  Bookmark,
  BookmarkCheck,
  FileText,
  ExternalLink,
  Building2,
  Plus,
  Trash2
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import domains from '../data/domains';
import internshipRoles from '../data/internship-roles';
import api from '../api';
import './Internships.css';

const WORKPLACE_OPTIONS = ['All', 'Remote', 'Hybrid', 'On-site'];
const JOB_TYPE_OPTIONS = ['All', 'Internship', 'Fresher Job', 'Entry-Level Job', 'Off-Campus'];
const APP_STATUSES = ['Saved', 'Applied', 'Assessment', 'Interview', 'Offered', 'Rejected'];

export default function Internships() {
  const { state, dispatch } = useAppState();

  const [activeTab, setActiveTab] = useState('opportunities'); // 'opportunities', 'tracker', 'matcher'
  
  // Opportunities state
  const [opportunities, setOpportunities] = useState([]);
  const [loadingOpps, setLoadingOpps] = useState(true);
  const [oppSearch, setOppSearch] = useState('');
  const [workplaceFilter, setWorkplaceFilter] = useState('All');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');
  const [savedOppIds, setSavedOppIds] = useState(new Set());

  // Application tracker state
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [appStatusFilter, setAppStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalCompany, setModalCompany] = useState('');
  const [modalStatus, setModalStatus] = useState('Applied');
  const [modalDeadline, setModalDeadline] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [savingApp, setSavingApp] = useState(false);

  // Matcher state (legacy/existing)
  const [activeDomainId, setActiveDomainId] = useState(state.selectedDomain ? state.selectedDomain.id : domains[0].id);
  const [matcherSearch, setMatcherSearch] = useState('');
  const [matcherFilter, setMatcherFilter] = useState('All');

  const userSkills = state.profile?.skills || [];
  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];

  useEffect(() => {
    loadOpportunities();
    loadApplications();
  }, [workplaceFilter, jobTypeFilter]);

  const loadOpportunities = async () => {
    try {
      setLoadingOpps(true);
      const params = {};
      if (workplaceFilter !== 'All') params.workplace = workplaceFilter;
      if (jobTypeFilter !== 'All') params.type = jobTypeFilter;

      const res = await api.get('/opportunities', { params });
      if (Array.isArray(res.data)) {
        setOpportunities(res.data);
        const saved = new Set(res.data.filter(o => o.isSaved).map(o => o._id));
        setSavedOppIds(saved);
      }
    } catch (err) {
      console.error('Error loading opportunities:', err);
    } finally {
      setLoadingOpps(false);
    }
  };

  const loadApplications = async () => {
    try {
      setLoadingApps(true);
      const res = await api.get('/opportunities/applications');
      if (Array.isArray(res.data)) {
        setApplications(res.data);
      }
    } catch (err) {
      console.error('Error loading applications:', err);
    } finally {
      setLoadingApps(false);
    }
  };

  const handleToggleSaveOpp = async (oppId) => {
    try {
      const res = await api.post(`/opportunities/${oppId}/bookmark`);
      const isNowSaved = res.data?.isSaved;

      setSavedOppIds(prev => {
        const next = new Set(prev);
        if (isNowSaved) next.add(oppId);
        else next.delete(oppId);
        return next;
      });

      setOpportunities(prev => prev.map(o => o._id === oppId ? { ...o, isSaved: isNowSaved } : o));
    } catch (err) {
      console.error('Error saving opportunity:', err);
    }
  };

  const handleQuickTrack = (opp) => {
    setModalTitle(opp.title);
    setModalCompany(opp.company);
    setModalDeadline(opp.deadline || '');
    setModalStatus('Applied');
    setModalNotes(`Discovered via Career Navigator. Location: ${opp.location || 'Remote'}`);
    setModalOpen(true);
  };

  const handleSaveModalApplication = async (e) => {
    e.preventDefault();
    if (!modalTitle.trim() || !modalCompany.trim()) return;

    try {
      setSavingApp(true);
      const res = await api.post('/opportunities/applications', {
        title: modalTitle.trim(),
        company: modalCompany.trim(),
        status: modalStatus,
        deadline: modalDeadline.trim(),
        notes: modalNotes.trim(),
      });

      if (res.data) {
        setApplications(prev => [res.data, ...prev]);
        setModalOpen(false);
        setModalTitle('');
        setModalCompany('');
        setModalNotes('');
        setModalDeadline('');
        setActiveTab('tracker');
      }
    } catch (err) {
      console.error('Error saving application:', err);
    } finally {
      setSavingApp(false);
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      const res = await api.put(`/opportunities/applications/${appId}`, { status: newStatus });
      if (res.data) {
        setApplications(prev => prev.map(a => a._id === appId ? res.data : a));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteApplication = async (appId) => {
    try {
      await api.delete(`/opportunities/applications/${appId}`);
      setApplications(prev => prev.filter(a => a._id !== appId));
    } catch (err) {
      console.error('Error deleting application:', err);
    }
  };

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const q = oppSearch.toLowerCase();
      const matchesSearch = !q ||
        opp.title.toLowerCase().includes(q) ||
        opp.company.toLowerCase().includes(q) ||
        opp.skills.some(s => s.toLowerCase().includes(q)) ||
        opp.location.toLowerCase().includes(q);

      const matchesWorkplace = workplaceFilter === 'All' || opp.workplaceType === workplaceFilter;
      const matchesJobType = jobTypeFilter === 'All' || opp.jobType === jobTypeFilter;

      return matchesSearch && matchesWorkplace && matchesJobType;
    });
  }, [opportunities, oppSearch, workplaceFilter, jobTypeFilter]);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      if (appStatusFilter === 'All') return true;
      return app.status === appStatusFilter;
    });
  }, [applications, appStatusFilter]);

  // Analyzed roles for Matcher tab
  const analyzedMatcherRoles = useMemo(() => {
    const roles = internshipRoles[activeDomain.id] || [];
    const analyzed = roles.map(role => {
      const required = role.requiredSkills || [];
      const matched = required.filter(rSkill =>
        userSkills.some(uSkill => uSkill.toLowerCase() === rSkill.toLowerCase())
      );
      const matchPercentage = required.length > 0 ? Math.round((matched.length / required.length) * 100) : 0;
      return { ...role, matchPercentage, matchedSkills: matched, missingSkills: required.filter(s => !matched.includes(s)) };
    });
    analyzed.sort((a, b) => b.matchPercentage - a.matchPercentage);
    return analyzed.filter(r => {
      const q = matcherSearch.toLowerCase();
      const matchesQ = !q || r.title.toLowerCase().includes(q) || r.requiredSkills.some(s => s.toLowerCase().includes(q));
      const matchesFilter = matcherFilter === 'All' || r.level === matcherFilter;
      return matchesQ && matchesFilter;
    });
  }, [activeDomain.id, userSkills, matcherSearch, matcherFilter]);

  return (
    <div className="page page-enter">
      <div className="internships-container">
        {/* Page Header */}
        <div className="internships-header fade-in-up">
          <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Briefcase size={13} /> Career Opportunities
          </span>
          <h1 className="gradient-text" style={{ marginTop: 12 }}>Opportunities & Application Tracker</h1>
          <p className="subtitle">Discover verified internships, fresher drives, remote roles, and manage your active application pipeline.</p>
        </div>

        {/* Master Tab Selector */}
        <div className="opp-nav-tabs">
          <button
            className={`opp-nav-btn ${activeTab === 'opportunities' ? 'active' : ''}`}
            onClick={() => setActiveTab('opportunities')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Search size={14} /> Discover Opportunities ({opportunities.length})
          </button>
          <button
            className={`opp-nav-btn ${activeTab === 'tracker' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracker')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <ClipboardList size={14} /> Application Tracker ({applications.length})
          </button>
          <button
            className={`opp-nav-btn ${activeTab === 'matcher' ? 'active' : ''}`}
            onClick={() => setActiveTab('matcher')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Target size={14} /> Role Skill Matcher
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OPPORTUNITY DISCOVERY */}
        {/* ========================================================= */}
        {activeTab === 'opportunities' && (
          <div className="opp-tab-content">
            {/* Filter Bar */}
            <div className="opp-filters-bar">
              <input
                type="text"
                className="opp-search-input"
                placeholder="Search job title, company, skills (e.g. React, Python, Node, SQL)..."
                value={oppSearch}
                onChange={(e) => setOppSearch(e.target.value)}
              />

              <div className="opp-filter-chips-row">
                <span className="opp-filter-label">Workplace:</span>
                {WORKPLACE_OPTIONS.map(w => (
                  <button
                    key={w}
                    className={`opp-chip-btn ${workplaceFilter === w ? 'active' : ''}`}
                    onClick={() => setWorkplaceFilter(w)}
                  >
                    {w}
                  </button>
                ))}

                <span className="opp-filter-label" style={{ marginLeft: 12 }}>Type:</span>
                {JOB_TYPE_OPTIONS.map(t => (
                  <button
                    key={t}
                    className={`opp-chip-btn ${jobTypeFilter === t ? 'active' : ''}`}
                    onClick={() => setJobTypeFilter(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {loadingOpps ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#38bdf8' }}>Loading opportunities...</div>
            ) : null}

            {/* Opportunities Grid */}
            <div className="opp-grid">
              {filteredOpportunities.map(opp => {
                const isSaved = savedOppIds.has(opp._id);

                return (
                  <div key={opp._id || opp.title} className="opp-card">
                    <div className="opp-card-header">
                      <div className="opp-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Building2 size={20} color="var(--accent-primary)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span className="opp-company-name">{opp.company}</span>
                        <h2 className="opp-card-title">{opp.title}</h2>
                      </div>
                      <button
                        className="opp-save-btn"
                        onClick={() => handleToggleSaveOpp(opp._id)}
                        title={isSaved ? 'Remove from Saved' : 'Save Opportunity'}
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {isSaved ? <BookmarkCheck size={16} color="var(--accent-cyan)" /> : <Bookmark size={16} />}
                      </button>
                    </div>

                    <div className="opp-meta-row">
                      <span className="opp-meta-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={12} /> {opp.location}
                      </span>
                      <span className="opp-meta-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Briefcase size={12} /> {opp.jobType}
                      </span>
                      <span className="opp-meta-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <DollarSign size={12} /> {opp.stipendOrSalary}
                      </span>
                    </div>

                    <p className="opp-desc-text">{opp.description}</p>

                    <div className="opp-skills-row">
                      {opp.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="opp-skill-pill">{skill}</span>
                      ))}
                    </div>

                    <div className="opp-card-footer">
                      <span className="opp-deadline-text" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} /> Deadline: {opp.deadline}
                      </span>
                      <div className="opp-actions-group">
                        <a
                          href={opp.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opp-apply-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        >
                          Apply <ExternalLink size={13} />
                        </a>
                        <button
                          className="opp-track-btn"
                          onClick={() => handleQuickTrack(opp)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        >
                          <Plus size={13} /> Track App
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: APPLICATION TRACKER */}
        {/* ========================================================= */}
        {activeTab === 'tracker' && (
          <div className="tracker-tab-content">
            <div className="tracker-top-bar">
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>Your Job Applications</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Track interview rounds, assessments, and recruitment decisions.</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setModalTitle('');
                  setModalCompany('');
                  setModalDeadline('');
                  setModalNotes('');
                  setModalStatus('Applied');
                  setModalOpen(true);
                }}
              >
                + Track New Job
              </button>
            </div>

            {/* Status Filter Chips */}
            <div className="tracker-status-chips">
              {['All', ...APP_STATUSES].map(st => (
                <button
                  key={st}
                  className={`tracker-status-btn ${appStatusFilter === st ? 'active' : ''}`}
                  onClick={() => setAppStatusFilter(st)}
                >
                  {st}
                </button>
              ))}
            </div>

            {filteredApplications.length === 0 ? (
              <div className="tracker-empty">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ClipboardList size={36} color="var(--text-secondary)" />
                </div>
                <h3 style={{ color: '#f8fafc', marginTop: '0.75rem' }}>No applications tracked yet</h3>
                <p style={{ color: '#94a3b8' }}>Discover opportunities from the tab above or add jobs manually to track your pipeline.</p>
              </div>
            ) : null}

            {/* Applications List */}
            <div className="tracker-list">
              {filteredApplications.map(app => (
                <div key={app._id} className="tracker-item-card">
                  <div className="tracker-item-main">
                    <div>
                      <span className="opp-company-name">{app.company}</span>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginTop: 4 }}>{app.title}</h3>
                    </div>

                    <div className="tracker-status-dropdown-box">
                      <select
                        className={`status-select ${app.status.toLowerCase()}`}
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                      >
                        {APP_STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {app.notes && (
                    <div className="tracker-notes-box" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FileText size={13} /> {app.notes}
                    </div>
                  )}

                  <div className="tracker-footer-row">
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {app.deadline ? (
                        <>
                          <Clock size={12} /> Deadline: {app.deadline}
                        </>
                      ) : (
                        `Applied: ${new Date(app.appliedDate || app.createdAt).toLocaleDateString()}`
                      )}
                    </span>
                    <button
                      className="tracker-delete-btn"
                      onClick={() => handleDeleteApplication(app._id)}
                    >
                      Delete Record
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: ROLE SKILL MATCHER (LEGACY FEATURE PRESERVED) */}
        {/* ========================================================= */}
        {activeTab === 'matcher' && (
          <div className="matcher-tab-content">
            {/* Domain Selector */}
            <div className="domain-selector">
              {domains.map(d => (
                <button
                  key={d.id}
                  className={`domain-pill ${activeDomainId === d.id ? 'active' : ''}`}
                  onClick={() => setActiveDomainId(d.id)}
                >
                  <span className="icon">{d.icon}</span> {d.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="search-filter-row">
              <input
                type="text"
                placeholder="Search domain roles or required skills..."
                value={matcherSearch}
                onChange={(e) => setMatcherSearch(e.target.value)}
                className="internship-search-input"
              />
            </div>

            {/* Roles Grid */}
            <div className="internships-grid">
              {analyzedMatcherRoles.map(role => (
                <div key={role.id || role.title} className="internship-card">
                  <div className="card-header">
                    <div>
                      <h3 className="role-title">{role.title}</h3>
                      <span className="experience-badge">{role.level}</span>
                    </div>
                    <div className="match-pill">
                      <span>{role.matchPercentage}% Match</span>
                    </div>
                  </div>

                  <p className="role-description">{role.description}</p>

                  <div className="skills-section">
                    <span className="skills-label">Required Skills:</span>
                    <div className="skills-tags">
                      {role.requiredSkills?.map((s, idx) => (
                        <span key={idx} className="skill-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Track Job Modal */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>Track Application</h2>
            <form onSubmit={handleSaveModalApplication}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: 4 }}>Job Title *</label>
                <input
                  type="text"
                  required
                  className="modal-input"
                  placeholder="e.g. Frontend Developer Intern"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: 4 }}>Company Name *</label>
                <input
                  type="text"
                  required
                  className="modal-input"
                  placeholder="e.g. Google, Microsoft, Startup"
                  value={modalCompany}
                  onChange={(e) => setModalCompany(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: 4 }}>Status</label>
                <select
                  className="modal-input"
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                >
                  {APP_STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: 4 }}>Deadline / Next Step</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="e.g. Online Assessment due Nov 15"
                  value={modalDeadline}
                  onChange={(e) => setModalDeadline(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: 4 }}>Notes</label>
                <textarea
                  className="modal-input"
                  rows="3"
                  placeholder="e.g. Applied via career portal, prepared resume highlighting React 19"
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={savingApp}>
                  {savingApp ? 'Saving...' : 'Save to Tracker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
