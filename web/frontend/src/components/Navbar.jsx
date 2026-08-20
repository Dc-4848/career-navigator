import { useState } from 'react';
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
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <header className="nav-header" id="main-nav">
      <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
        <span className="nav-logo-icon">🧭</span>
        <span>Career Navigator</span>
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
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
        {state.isAuthenticated ? (
          <button onClick={handleLogout} className="nav-auth-btn">Logout</button>
        ) : (
          <Link to="/login" className="nav-auth-btn" onClick={() => setMobileOpen(false)}>Login</Link>
        )}
      </nav>
    </header>
  );
}
