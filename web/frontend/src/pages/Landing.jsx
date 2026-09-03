import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
import domains from '../data/domains';
import './Landing.css';

const features = [
  {
    icon: '🧭',
    title: 'Domain Explorer',
    desc: 'Discover tech domains like Web Dev, AI/ML, Cybersecurity and more.',
    color: 'teal',
  },
  {
    icon: '🎯',
    title: 'AI Domain Quiz',
    desc: 'Take a quick quiz and find which domain suits your personality.',
    color: 'violet',
  },
  {
    icon: '🗺️',
    title: 'Personalized Roadmap',
    desc: 'Get a 12-week learning plan tailored to your skills and goals.',
    color: 'teal',
  },
  {
    icon: '⚡',
    title: 'Skill Gap Analysis',
    desc: 'See exactly what skills you need to improve for your dream role.',
    color: 'rose',
  },
  {
    icon: '💼',
    title: 'Internship Guide',
    desc: 'Find relevant internships and learn how to apply successfully.',
    color: 'violet',
  },
  {
    icon: '🏆',
    title: 'Hackathon Explorer',
    desc: 'Discover hackathons, get beginner ideas, and build your portfolio.',
    color: 'rose',
  },
];

const roles = ['Web Developer', 'AI Engineer', 'Data Scientist', 'Cybersecurity Analyst', 'App Developer'];

export default function Landing() {
  const { state } = useAppState();
  const navigate = useNavigate();
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Calculate profile completion percentage and missing items
  const profile = state.profile || {};
  const checklist = [
    { label: 'Degree / Program', completed: !!profile.degree, route: '/profile' },
    { label: 'Current Year', completed: !!profile.year, route: '/profile' },
    { label: 'Skills Added', completed: Array.isArray(profile.skills) && profile.skills.length > 0, route: '/profile' },
    { label: 'Interests Selected', completed: Array.isArray(profile.interests) && profile.interests.length > 0, route: '/profile' },
    { label: 'Career Goal', completed: !!profile.goal, route: '/profile' },
    { label: 'Target Domain Selected', completed: !!state.selectedDomain, route: '/domains' },
  ];

  const completedCount = checklist.filter((item) => item.completed).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);
  const missingItems = checklist.filter((item) => !item.completed);

  // Determine active/recommended domain safely (object or string ID)
  const rawDomain = state.selectedDomain || (profile.selectedDomain) || (state.quizResult?.domain);
  const activeDomain = typeof rawDomain === 'string'
    ? (domains.find(d => d.id === rawDomain) || domains[0])
    : (rawDomain || domains[0]);

  const userSkills = profile.skills || [];

  // Match calculations for active domain
  const domainSkills = activeDomain.skills || [];
  const matchedDomainSkills = domainSkills.filter((dSkill) =>
    userSkills.some((uSkill) => uSkill.toLowerCase() === dSkill.toLowerCase())
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
      <div className={`page dashboard-page ${visible ? 'visible' : ''}`}>
        <div className="container dashboard-container">
          {/* Welcome Header */}
          <div className="dashboard-welcome glass-card">
            <div className="welcome-text">
              <span className="badge badge-teal">🚀 Career Navigator Dashboard</span>
              <h2>
                Welcome back, <span className="gradient-text">{state.user?.name || 'Explorer'}</span>!
              </h2>
              <p>Here is your career readiness, personalized roadmap, and next action items.</p>
            </div>
            <div className="welcome-cta">
              <button className="btn btn-primary" onClick={() => navigate('/profile')}>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Top Metrics Row */}
          <div className="dashboard-grid top-metrics-grid">
            {/* 1. Profile Completion Card */}
            <div className="glass-card metric-card">
              <div className="metric-header">
                <span className="metric-icon">📋</span>
                <h4>Profile Completion</h4>
              </div>
              <div className="completion-ring-box">
                <div className="completion-bar-wrapper">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
                  </div>
                  <div className="completion-value gradient-text">{completionPercentage}% Complete</div>
                </div>
              </div>

              {missingItems.length > 0 ? (
                <div className="missing-checklist">
                  <span className="checklist-title">To reach 100%:</span>
                  <ul>
                    {missingItems.slice(0, 2).map((item, idx) => (
                      <li key={idx}>
                        <span className="bullet-missing">○</span> {item.label}
                      </li>
                    ))}
                  </ul>
                  <button className="text-link-btn" onClick={() => navigate(missingItems[0].route)}>
                    Complete {missingItems[0].label} →
                  </button>
                </div>
              ) : (
                <div className="checklist-complete">
                  <span className="badge badge-teal">✓ Profile 100% Completed</span>
                </div>
              )}
            </div>

            {/* 2. Recommended Career Domain */}
            <div className="glass-card metric-card">
              <div className="metric-header">
                <span className="metric-icon">{activeDomain.icon || '🧭'}</span>
                <h4>Recommended Domain</h4>
              </div>
              <div className="domain-highlight">
                <h3 style={{ color: `var(--${activeDomain.color || 'teal'}-400, var(--accent-teal))` }}>
                  {activeDomain.name}
                </h3>
                <p className="domain-tagline">{activeDomain.tagline}</p>
                <div className="match-pill">
                  <span>Skill Match Score:</span>
                  <strong className="gradient-text">{domainMatchPercentage}%</strong>
                </div>
              </div>
              <div className="metric-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/domains')}>
                  Change Domain
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/roadmap')}>
                  View Roadmap →
                </button>
              </div>
            </div>

            {/* 3. Saved Opportunities & Status */}
            <div className="glass-card metric-card">
              <div className="metric-header">
                <span className="metric-icon">💼</span>
                <h4>Saved Opportunities</h4>
              </div>
              <div className="saved-metrics">
                <div className="saved-metric-item">
                  <span className="saved-num gradient-text">{savedInternshipsCount}</span>
                  <span className="saved-label">Saved Internships</span>
                </div>
                <div className="saved-divider"></div>
                <div className="saved-metric-item">
                  <span className="saved-num gradient-text">{userSkills.length}</span>
                  <span className="saved-label">Profile Skills</span>
                </div>
              </div>
              <div className="metric-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/internships')}>
                  Internships
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/hackathons')}>
                  Hackathons
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="dashboard-section">
            <h3 className="section-title">
              <span className="gradient-text">⚡ Quick Actions</span>
            </h3>
            <div className="quick-actions-grid">
              <div className="glass-card action-tile" onClick={() => navigate('/profile')}>
                <span className="action-icon">📋</span>
                <h4>Update Profile</h4>
                <p>Manage degree, skills, and goals</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/quiz')}>
                <span className="action-icon">🎯</span>
                <h4>Find My Domain</h4>
                <p>Take the AI-powered career quiz</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/roadmap')}>
                <span className="action-icon">🗺️</span>
                <h4>View Roadmap</h4>
                <p>12-week step-by-step master plan</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/skills')}>
                <span className="action-icon">⚡</span>
                <h4>Skill Gap Analyzer</h4>
                <p>Target role skills & gap breakdown</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/internships')}>
                <span className="action-icon">💼</span>
                <h4>Explore Internships</h4>
                <p>Find matched opportunities</p>
              </div>

              <div className="glass-card action-tile" onClick={() => navigate('/hackathons')}>
                <span className="action-icon">🏆</span>
                <h4>Hackathon Explorer</h4>
                <p>Upcoming competitive events</p>
              </div>

              <div className="glass-card action-tile action-tile-highlight" onClick={() => navigate('/resume-analyzer')}>
                <span className="action-icon">📄</span>
                <h4>Resume Analyzer</h4>
                <p>ATS scoring & keyword extraction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // UNAUTHENTICATED VISITOR LANDING PAGE
  // ----------------------------------------------------
  return (
    <div className={`page landing-page ${visible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="container hero-container">
          <div className="hero-badge">
            <span className="badge">✨ AI-Powered Career Guidance</span>
          </div>

          <h1 className="hero-title">
            Your Journey to Becoming a
            <br />
            <span className="hero-role gradient-text-animated" key={roleIndex}>
              {roles[roleIndex]}
            </span>
            <br />
            <span className="hero-sub">Starts Here.</span>
          </h1>

          <p className="hero-description">
            Confused about your career path? Career Navigator uses AI to help you
            discover your ideal tech domain, build the right skills, and land
            your first opportunity — one step at a time.
          </p>

          <div className="hero-actions">
            <button
              className="btn btn-primary btn-lg"
              id="cta-start"
              onClick={() => navigate('/signup')}
            >
              🚀 Get Started Free
            </button>
            <button
              className="btn btn-secondary btn-lg"
              id="cta-explore"
              onClick={() => navigate('/login')}
            >
              Sign In →
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number gradient-text">5+</span>
              <span className="hero-stat-label">Tech Domains</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number gradient-text">12 Weeks</span>
              <span className="hero-stat-label">Guided Roadmap</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number gradient-text">AI</span>
              <span className="hero-stat-label">Powered Insights</span>
            </div>
          </div>
        </div>

        {/* Decorative glow orbs */}
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-violet">Features</span>
            <h2 style={{ marginTop: '16px' }}>
              Everything You Need in <span className="gradient-text">One Place</span>
            </h2>
            <p>A complete AI-powered toolkit to navigate your tech career journey.</p>
          </div>

          <div className="features-grid">
            {features.map((feat, i) => (
              <div
                className="glass-card feature-card"
                key={i}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`icon-circle icon-circle-${feat.color}`}>
                  {feat.icon}
                </div>
                <h4 className="feature-title">{feat.title}</h4>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta-bottom">
        <div className="container">
          <div className="glass-card cta-card">
            <h3>Ready to Find Your Path?</h3>
            <p>
              It only takes 2 minutes to set up your profile. Let AI guide you to
              the right career in tech.
            </p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/signup')}
            >
              🚀 Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

