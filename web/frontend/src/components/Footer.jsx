import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Shield, FileText, CheckCircle2 } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Brand & Mission Column */}
        <div className="footer-col footer-brand-col">
          <Link to="/" className="footer-logo">
            <Compass size={20} color="#38BDF8" strokeWidth={2.2} />
            <span className="footer-brand-name">Career Navigator</span>
          </Link>
          <p className="footer-desc">
            A software career development platform providing structured engineering roadmaps, curated documentation, and job application tracking for college students and developers.
          </p>
          <div className="footer-status-pill">
            <span className="footer-status-dot"></span>
            <span className="footer-status-text">Backend API Operational</span>
          </div>
        </div>

        {/* Learning Paths Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Learning Paths</h4>
          <ul className="footer-links">
            <li><Link to="/roadmap">Full Stack Web Development</Link></li>
            <li><Link to="/roadmap">Backend and Cloud Architecture</Link></li>
            <li><Link to="/roadmap">Machine Learning and AI</Link></li>
            <li><Link to="/roadmap">Cybersecurity Engineering</Link></li>
            <li><Link to="/resources">Curated Resource Library</Link></li>
          </ul>
        </div>

        {/* Tools & Pipeline Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Career Tools</h4>
          <ul className="footer-links">
            <li><Link to="/internships">Opportunities Discovery</Link></li>
            <li><Link to="/internships">Application Pipeline Tracker</Link></li>
            <li><Link to="/skills">Skill Gap Analyzer</Link></li>
            <li><Link to="/resume-analyzer">ATS Resume Analyzer</Link></li>
            <li><Link to="/domains">Tech Domain Explorer</Link></li>
          </ul>
        </div>

        {/* Legal & Compliance Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Trust & Legal</h4>
          <ul className="footer-links">
            <li>
              <Link to="/privacy" className="footer-icon-link">
                <Shield size={14} />
                <span>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link to="/terms" className="footer-icon-link">
                <FileText size={14} />
                <span>Terms and Conditions</span>
              </Link>
            </li>
            <li><Link to="/profile">Account Settings</Link></li>
          </ul>
          <div className="footer-compliance-note">
            <CheckCircle2 size={13} color="#0D9488" />
            <span>Atlas Cloud Verified Data Storage</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Career Navigator. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy</Link>
            <span className="footer-dot-sep">&bull;</span>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
