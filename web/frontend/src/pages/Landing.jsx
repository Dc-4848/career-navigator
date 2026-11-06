import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  Briefcase,
  Target,
  FileText,
  CheckCircle2,
  Layers,
  Award,
  ArrowRight,
  TrendingUp,
  FolderGit2,
  ShieldCheck,
  Check,
  Users
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import domains from '../data/domains';
import api from '../api';
import './Landing.css';

const platformCapabilities = [
  {
    icon: Compass,
    title: '12+ Structured Learning Roadmaps',
    desc: 'Step-by-step milestone curriculums for Full Stack, Backend, AI and ML, DevOps, Cybersecurity, Mobile, and DSA.',
  },
  {
    icon: BookOpen,
    title: 'Curated Resource Library',
    desc: 'Verified official documentation, high-yield tutorials, and interactive sandboxes filtered by skill level and tech stack.',
  },
  {
    icon: Briefcase,
    title: 'Opportunity Pipeline Tracker',
    desc: 'Manage applications across 6 lifecycle stages (Saved, Applied, Assessment, Interview, Offered, Rejected) with notes and deadlines.',
  },
  {
    icon: Target,
    title: 'Skill Gap Analyzer',
    desc: 'Evaluate your current competencies against specific engineering job roles to identify missing prerequisite skills.',
  },
  {
    icon: FileText,
    title: 'ATS Resume Evaluation',
    desc: 'Review resume keyword density and formatting criteria against target industry software engineering profiles.',
  },
  {
    icon: Award,
    title: 'Hackathon Discovery',
    desc: 'Discover active collegiate hackathons and competitive engineering events to build portfolio projects.',
  },
  {
    icon: Compass,
    title: 'Curated Learning Resources',
    desc: 'Access verified tutorials, documentation, and video courses structured for your chosen technical track.',
  },
];

export default function Landing() {
  const { state } = useAppState();
  const navigate = useNavigate();
  const [backendStats, setBackendStats] = useState(null);

  useEffect(() => {
    if (state.isAuthenticated) {
      api.get('/dashboard/stats')
        .then(res => {
          if (res.data) setBackendStats(res.data);
        })
        .catch(() => {});
    }
  }, [state.isAuthenticated]);

  // Profile completion calculation
  const profile = state.profile || {};
  const checklist = [
    { label: 'Degree and Program', completed: !!profile.degree, route: '/profile' },
    { label: 'Current Year of Study', completed: !!profile.year, route: '/profile' },
    { label: 'Technical Skills Added', completed: Array.isArray(profile.skills) && profile.skills.length > 0, route: '/profile' },
    { label: 'Interests Selected', completed: Array.isArray(profile.interests) && profile.interests.length > 0, route: '/profile' },
    { label: 'Career Objective', completed: !!profile.goal, route: '/profile' },
    { label: 'Specialization Domain', completed: !!state.selectedDomain, route: '/domains' },
  ];

  const completedCount = checklist.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);
  const missingItems = checklist.filter(item => !item.completed);

  const rawDomain = state.selectedDomain || profile.selectedDomain || state.quizResult?.domain;
  const activeDomain = typeof rawDomain === 'string'
    ? (domains.find(d => d.id === rawDomain) || domains[0])
    : (rawDomain || domains[0]);

  const userSkills = profile.skills || [];
  const domainSkills = activeDomain.skills || [];
  const matchedDomainSkills = domainSkills.filter(dSkill =>
    userSkills.some(uSkill => uSkill.toLowerCase() === dSkill.toLowerCase())
  );
  const domainMatchPercentage = domainSkills.length > 0
    ? Math.round((matchedDomainSkills.length / domainSkills.length) * 100)
    : 0;

  const savedInternshipsCount = (state.savedInternships || []).length;

  // ----------------------------------------------------
  // AUTHENTICATED USER DASHBOARD
  // ----------------------------------------------------
  if (state.isAuthenticated) {
    return (
      <div className="page dashboard-page">
        <div className="container dashboard-container">
          {/* Welcome Header */}
          <div className="dashboard-welcome glass-card">
            <div className="welcome-text">
              <span className="badge badge-cyan">Student Dashboard</span>
              <h2>Welcome back, {state.user?.name || 'Developer'}</h2>
              <p>Review your active learning milestones, profile readiness, and application pipeline.</p>
            </div>
            <div className="welcome-cta">
              <button className="btn btn-secondary btn-sm" onClick={() => navigate('/profile')}>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Top Metrics Row */}
          <div className="dashboard-grid top-metrics-grid">
            {/* 1. Profile Completion Card */}
            <div className="glass-card metric-card">
              <div className="metric-header">
                <FileText size={18} color="#0EA5E9" />
                <h4>Profile Readiness</h4>
              </div>
              <div className="completion-ring-box">
                <div className="completion-bar-wrapper">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
                  </div>
                  <div className="completion-value">{completionPercentage}% Completed</div>
                </div>
              </div>

              {missingItems.length > 0 ? (
                <div className="missing-checklist">
                  <span className="checklist-title">Recommended Next Actions:</span>
                  <ul>
                    {missingItems.slice(0, 2).map((item, idx) => (
                      <li key={idx}>
                        <span className="bullet-missing">&bull;</span> {item.label}
                      </li>
                    ))}
                  </ul>
                  <button className="text-link-btn" onClick={() => navigate(missingItems[0].route)}>
                    Complete {missingItems[0].label} &rarr;
                  </button>
                </div>
              ) : (
                <div className="checklist-complete">
                  <span className="badge badge-teal">Profile Complete</span>
                </div>
              )}
            </div>

            {/* 2. Target Domain Card */}
            <div className="glass-card metric-card">
              <div className="metric-header">
                <Compass size={18} color="#0EA5E9" />
                <h4>Target Specialization</h4>
              </div>
              <div className="domain-highlight">
                <h3>{activeDomain.name}</h3>
                <p className="domain-tagline">{activeDomain.tagline}</p>
                <div className="match-pill">
                  <span>Skill Match:</span>
                  <strong>{domainMatchPercentage}%</strong>
                </div>
              </div>
              <div className="metric-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/domains')}>
                  Change Track
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/roadmap')}>
                  View Roadmap
                </button>
              </div>
            </div>

            {/* 3. Opportunities & Applications Status */}
            <div className="glass-card metric-card">
              <div className="metric-header">
                <Briefcase size={18} color="#0EA5E9" />
                <h4>Opportunities & Pipeline</h4>
              </div>
              <div className="saved-metrics">
                <div className="saved-metric-item">
                  <span className="saved-num">
                    {backendStats?.opportunities?.totalApplicationsTracked !== undefined
                      ? backendStats.opportunities.totalApplicationsTracked
                      : savedInternshipsCount}
                  </span>
                  <span className="saved-label">Tracked Applications</span>
                </div>
                <div className="saved-divider"></div>
                <div className="saved-metric-item">
                  <span className="saved-num">
                    {backendStats?.learning?.activeRoadmapsCount
                      ? `${backendStats.learning.overallProgressPercent}%`
                      : `${userSkills.length}`}
                  </span>
                  <span className="saved-label">
                    {backendStats?.learning?.activeRoadmapsCount ? 'Roadmap Progress' : 'Profile Skills'}
                  </span>
                </div>
              </div>
              <div className="metric-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/internships')}>
                  Opportunities
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/resources')}>
                  Resources
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="dashboard-section">
            <h3 className="section-title">Career Acceleration Tools</h3>
            <div className="quick-actions-grid">
              <div className="glass-card action-tile" onClick={() => navigate('/profile')}>
                <div className="action-icon-box"><FileText size={20} color="#38BDF8" /></div>
                <h4>Update Profile</h4>
                <p>Manage degree, skills, and goals</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/domains')}>
                <div className="action-icon-box"><Compass size={20} color="#38BDF8" /></div>
                <h4>Domain Explorer</h4>
                <p>Browse high-demand tech tracks</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/roadmap')}>
                <div className="action-icon-box"><Layers size={20} color="#38BDF8" /></div>
                <h4>Learning Roadmaps</h4>
                <p>12+ verified career tracks and checklist</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/resources')}>
                <div className="action-icon-box"><BookOpen size={20} color="#38BDF8" /></div>
                <h4>Resource Library</h4>
                <p>Curated documentation, sandboxes, and courses</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/skills')}>
                <div className="action-icon-box"><Target size={20} color="#38BDF8" /></div>
                <h4>Skill Gap Analyzer</h4>
                <p>Identify missing prerequisite skills</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/internships')}>
                <div className="action-icon-box"><Briefcase size={20} color="#38BDF8" /></div>
                <h4>Opportunities & Tracker</h4>
                <p>Discover roles and manage hiring pipelines</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/hackathons')}>
                <div className="action-icon-box"><Award size={20} color="#38BDF8" /></div>
                <h4>Hackathons</h4>
                <p>Upcoming competitive collegiate events</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/resume-analyzer')}>
                <div className="action-icon-box"><CheckCircle2 size={20} color="#38BDF8" /></div>
                <h4>Resume Analyzer</h4>
                <p>ATS scoring and keyword evaluation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // UNAUTHENTICATED VISITOR PRODUCT HOMEPAGE
  // ----------------------------------------------------
  return (
    <div className="page landing-page">
      {/* Hero Section (Clean, Credible, Product-Focused) */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <span className="badge badge-cyan">Technical Career Development Platform</span>
          </div>

          <h1 className="hero-title">
            Structured Technical Learning Paths and Job Application Tracking
          </h1>

          <p className="hero-description">
            Career Navigator provides engineering students and early-career developers with verified multi-stage roadmaps, curated documentation, skill gap diagnostics, and a centralized pipeline to track internship and fresher job applications.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/signup')}>
              Get Started Free &rarr;
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>

          {/* Factual Product Capabilities Strip (NO fake statistics or artificial customer numbers) */}
          <div className="capabilities-strip glass-card">
            <div className="capability-item">
              <div className="cap-icon-box"><Layers size={20} color="#0EA5E9" /></div>
              <div>
                <strong>12+ Structured Tracks</strong>
                <p>Full Stack, DevOps, AI, Cloud, and Systems</p>
              </div>
            </div>
            <div className="capability-divider"></div>
            <div className="capability-item">
              <div className="cap-icon-box"><BookOpen size={20} color="#0EA5E9" /></div>
              <div>
                <strong>Curated Resources</strong>
                <p>Verified documentation and interactive tools</p>
              </div>
            </div>
            <div className="capability-divider"></div>
            <div className="capability-item">
              <div className="cap-icon-box"><Briefcase size={20} color="#0EA5E9" /></div>
              <div>
                <strong>Application Pipeline</strong>
                <p>6-stage tracking from saved to offer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Architecture & Capabilities Grid */}
      <section className="capabilities-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-cyan">Platform Capabilities</span>
            <h2>Core Features Built for Software Engineering Preparation</h2>
            <p>Every feature is designed to reduce ambiguity in technical learning and application cycles.</p>
          </div>

          <div className="capabilities-grid">
            {platformCapabilities.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="glass-card feature-card">
                  <div className="feature-icon-box">
                    <IconComp size={22} color="#38BDF8" strokeWidth={2} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering Workflow Overview Section */}
      <section className="workflow-section">
        <div className="container">
          <div className="workflow-card glass-card">
            <div className="section-header" style={{ marginBottom: '2rem' }}>
              <span className="badge badge-cyan">Methodology</span>
              <h2>A Systematic Approach to Career Readiness</h2>
              <p>Move from foundational theory to production projects and structured applications.</p>
            </div>

            <div className="workflow-steps-grid">
              <div className="workflow-step">
                <div className="step-number">01</div>
                <h4>Select Track</h4>
                <p>Choose from curated industry paths like Full Stack Web, Backend Systems, or Cloud DevOps.</p>
              </div>
              <div className="workflow-step">
                <div className="step-number">02</div>
                <h4>Master Milestones</h4>
                <p>Check off topics, review official documentation, and complete practical assignments.</p>
              </div>
              <div className="workflow-step">
                <div className="step-number">03</div>
                <h4>Build Capstone</h4>
                <p>Develop end-to-end production projects demonstrating full competency requirements.</p>
              </div>
              <div className="workflow-step">
                <div className="step-number">04</div>
                <h4>Track Applications</h4>
                <p>Log submission deadlines, interview rounds, and follow-ups in your private tracker.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section (Professional, No Gimmicks) */}
      <section className="cta-section">
        <div className="container">
          <div className="glass-card cta-card">
            <h2>Start Organizing Your Engineering Career Path</h2>
            <p>
              Create an account to access structured learning curricula, curate personal resource bookmarks, and track your job application pipeline.
            </p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/signup')}>
                Create Free Account
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/login')}>
                Sign In to Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
