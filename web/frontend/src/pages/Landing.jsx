import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
              onClick={() => navigate('/profile')}
            >
              🚀 Start Your Journey
            </button>
            <button
              className="btn btn-secondary btn-lg"
              id="cta-explore"
              onClick={() => navigate('/domains')}
            >
              🧭 Explore Domains
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
              onClick={() => navigate('/profile')}
            >
              🚀 Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
