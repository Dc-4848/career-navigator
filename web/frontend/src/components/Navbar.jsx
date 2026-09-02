import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/profile', label: 'Profile' },
  { path: '/domains', label: 'Domains' },
  { path: '/quiz', label: 'Find My Domain' },
  { path: '/roadmap', label: 'Roadmap' },
  { path: '/skills', label: 'Skills' },
  { path: '/internships', label: 'Internships' },
  { path: '/hackathons', label: 'Hackathons' },
  { path: '/resume-analyzer', label: 'Resume Analyzer' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
    setMobileOpen(false);
  };

  const userInitial = state.user?.name ? state.user.name.charAt(0).toUpperCase() : 'U';

  return (
    <>
      <header className="nav-header" id="main-nav">
        <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)} aria-label="Career Navigator Home">
          <span className="nav-logo-icon">🧭</span>
          <span>Career Navigator</span>
        </Link>

        {/* Hamburger Toggle Button */}
        <button
          className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop & Mobile Navigation Links */}
        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`} aria-label="Main Navigation">
          {mobileOpen && (
            <div className="mobile-nav-header">
              <span className="mobile-nav-title">Menu</span>
              <button
                className="mobile-close-btn"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
          )}

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Auth State in Nav */}
          <div className="nav-auth-section">
            {state.isAuthenticated ? (
              <div className="nav-user-controls">
                <div className="nav-user-avatar" title={state.user?.email || 'Logged in'}>
                  {userInitial}
                </div>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm nav-auth-btn" aria-label="Log out">
                  Logout
                </button>
              </div>
            ) : (
              <div className="nav-guest-controls">
                <Link to="/login" className="nav-login-link" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm" onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Backdrop for Mobile Drawer */}
      {mobileOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

