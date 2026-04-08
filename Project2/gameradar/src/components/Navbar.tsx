import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#1a1a2e"/>
              <path d="M8 16h4M20 16h4M16 8v4M16 20v4" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="3" fill="#e63946"/>
            </svg>
          </div>
          <span className="logo-text">GameRadar</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/upcoming" className={`nav-link ${location.pathname === '/upcoming' ? 'active' : ''}`}>Upcoming</Link>
          <Link to="/wishlist" className={`nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`}>Wishlist</Link>
        </div>
      </div>
    </nav>
  );
}
