import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { auth } from '../firebase/config';
import { signOut, updateProfile } from 'firebase/auth';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const { cartCount } = useCart();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { currentUser, userRole } = useAuth();
  const dropdownRef = useRef(null);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [savingName, setSavingName] = useState(false);

  const handleSaveName = async () => {
    if (!newName.trim() || newName === currentUser?.displayName) {
      setEditingName(false);
      return;
    }
    setSavingName(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newName.trim() });
      window.location.reload(); // Refresh to reflect everywhere
    } catch (err) {
      console.error('Failed to update name', err);
    } finally {
      setSavingName(false);
      setEditingName(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      setViewOpen(false);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setViewOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const avatarUrl = currentUser?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.displayName || currentUser?.email || 'User')}&background=ec4899&color=fff&bold=true`;

  return (
    <>
      {/* ============================= STYLES ============================= */}
      <style>{`
        /* Announcement bar */
        .header-announce {
          background: #1a1a1a;
          color: #fff;
          text-align: center;
          padding: 9px 16px;
          font-size: 11px;
          letter-spacing: 1.5px;
          font-weight: 600;
        }
        .header-announce a { color: #ec4899; text-decoration: none; }

        /* Main header */
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
        }
        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;
        }

        /* Logo */
        .header-logo {
          font-size: 22px;
          font-weight: 900;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: -1px;
          flex-shrink: 0;
        }

        /* Desktop nav */
        .header-nav {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .header-nav a {
          font-size: 12px;
          font-weight: 700;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: 1px;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .header-nav a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ec4899;
          transition: width 0.25s ease;
        }
        .header-nav a:hover { color: #ec4899; }
        .header-nav a:hover::after { width: 100%; }

        /* Right side */
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }

        /* Mobile hamburger */
        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .mobile-toggle .bar {
          display: block;
          width: 22px;
          height: 2px;
          background: #1a1a1a;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        .mobile-toggle.open .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .mobile-toggle.open .bar:nth-child(2) { opacity: 0; }
        .mobile-toggle.open .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile nav drawer */
        .mobile-nav {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.35s ease;
          opacity: 0;
          border-top: 1px solid transparent;
        }
        .mobile-nav.open {
          max-height: 500px;
          opacity: 1;
          border-top-color: #f0f0f0;
        }
        .mobile-nav a {
          display: block;
          padding: 14px 24px;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-bottom: 1px solid #f5f5f5;
          transition: color 0.2s, background 0.2s;
        }
        .mobile-nav a:hover { color: #ec4899; background: #fdf6f0; }

        /* ---- Profile Avatar ---- */
        .profile-wrap {
          position: relative;
        }
        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          border: 2.5px solid #ec4899;
          object-fit: cover;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .profile-avatar:hover {
          box-shadow: 0 0 0 4px rgba(236,72,153,0.18);
          transform: scale(1.06);
        }

        /* Login button (when not logged in) */
        .login-btn {
          font-size: 12px;
          font-weight: 700;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 8px 18px;
          border: 2px solid #1a1a1a;
          transition: all 0.25s;
        }
        .login-btn:hover { background: #1a1a1a; color: #fff; }

        /* ---- Dropdown ---- */
        .profile-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          width: 240px;
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 14px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
          overflow: hidden;
          animation: dropIn 0.2s ease;
          z-index: 200;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Dropdown header (user info summary) */
        .dd-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-bottom: 1px solid #f5f5f5;
          background: linear-gradient(135deg, #fff5f9 0%, #fff 100%);
        }
        .dd-header img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #ec4899;
          object-fit: cover;
        }
        .dd-header-info { flex: 1; overflow: hidden; }
        .dd-header-name {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dd-header-email {
          font-size: 11px;
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Dropdown items */
        .dd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.18s, color 0.18s;
          text-align: left;
        }
        .dd-item:hover { background: #fdf2f8; color: #ec4899; }
        .dd-item svg { flex-shrink: 0; }
        .dd-separator { border: none; border-top: 1px solid #f0f0f0; margin: 0; }

        /* View submenu */
        .dd-submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .dd-submenu.open { max-height: 400px; }
        .dd-submenu-inner {
          background: #fdf6f0;
          padding: 12px 16px 14px;
          border-top: 1px solid #f5e8e8;
        }
        .user-info-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #ec4899;
          margin-bottom: 10px;
        }
        .user-info-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 8px;
        }
        .user-info-label {
          font-size: 10px;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          min-width: 52px;
          padding-top: 1px;
        }
        .user-info-value {
          font-size: 12px;
          font-weight: 600;
          color: #1a1a1a;
          word-break: break-all;
        }
        .user-info-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          background: #fce7f3;
          color: #be185d;
        }
        .user-info-badge.admin { background: #ede9fe; color: #6d28d9; }

        .dd-logout {
          color: #e11d48;
        }
        .dd-logout:hover { background: #fff1f2; color: #be123c; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .header-nav { display: none; }
          .mobile-toggle { display: flex; }

          /* On mobile, when hamburger opens, show the nav */
          .header-inner { height: 56px; }
          .header-logo { font-size: 18px; }
          .header-announce { font-size: 10px; padding: 7px 12px; }

          .profile-dropdown {
            right: -8px;
            width: 220px;
          }
        }

        @media (max-width: 480px) {
          .header-inner { padding: 0 16px; }
          .profile-dropdown {
            right: -4px;
            width: 200px;
          }
        }
      `}</style>

      {/* ============================= ANNOUNCEMENT BAR ============================= */}
      <div className="header-announce">
        FREE SHIPPING ON ORDERS OVER $50&nbsp;|&nbsp;
        <a href="/shop">SHOP NOW</a>
      </div>

      {/* ============================= HEADER ============================= */}
      <header className="site-header">
        <div className="header-inner">

          {/* Logo */}
          <Link to="/" className="header-logo">rhode skin</Link>

          {/* Desktop Nav */}
          <nav className="header-nav">
            <Link to="/skincare">Skincare</Link>
            <Link to="/lip-cheek">Lip &amp; Cheek</Link>
            <Link to="/sets">Sets</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Right side */}
          <div className="header-right">
            {/* Cart icon */}
            <Link to="/cart" style={{ position: 'relative', color: '#1a1a1a', textDecoration: 'none', display: 'flex', alignItems: 'center' }} title="Your Bag">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-7px', right: '-8px', background: '#ec4899', color: '#fff', fontSize: '9px', fontWeight: '800', width: '17px', height: '17px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>{cartCount > 99 ? '99+' : cartCount}</span>
              )}
            </Link>

            {/* ---- Profile (always shown) ---- */}
            {currentUser ? (
              <div className="profile-wrap" ref={dropdownRef}>
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="profile-avatar"
                  onClick={() => { setDropdownOpen(o => !o); setViewOpen(false); }}
                />

                {dropdownOpen && (
                  <div className="profile-dropdown">
                    {/* User summary header */}
                    <div className="dd-header">
                      <img src={avatarUrl} alt="avatar" />
                      <div className="dd-header-info">
                        <div className="dd-header-name">
                          {currentUser.displayName || 'User'}
                        </div>
                        <div className="dd-header-email">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>

                    {/* Dashboard */}
                    <Link
                      to={userRole === 'admin' ? '/admin' : '/dashboard'}
                      className="dd-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                      </svg>
                      Dashboard
                    </Link>

                    <hr className="dd-separator" />

                    {/* View (toggle submenu) */}
                    <button
                      className="dd-item"
                      onClick={() => setViewOpen(o => !o)}
                      style={{ justifyContent: 'space-between' }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                        </svg>
                        View Profile
                      </span>
                      <svg
                        width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: viewOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    {/* View submenu — user info */}
                    <div className={`dd-submenu ${viewOpen ? 'open' : ''}`}>
                      <div className="dd-submenu-inner">
                        <div className="user-info-title">Account Info</div>

                        <div className="user-info-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: editingName ? '6px' : '0' }}>
                            <span className="user-info-label">Name</span>
                            {!editingName && (
                              <button onClick={(e) => { e.preventDefault(); setEditingName(true); setNewName(currentUser?.displayName || ''); }} style={{ background: 'none', border: 'none', color: '#ec4899', fontSize: '10px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>Edit</button>
                            )}
                          </div>
                          {editingName ? (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} style={{ padding: '6px 10px', border: '1.5px solid #ec4899', borderRadius: '6px', fontSize: '12px', outline: 'none', flex: 1, fontFamily: 'Inter, sans-serif', width: '100%', boxSizing: 'border-box' }} autoFocus />
                              <button onClick={(e) => { e.preventDefault(); handleSaveName(); }} disabled={savingName} style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '0 12px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>{savingName ? '...' : 'SAVE'}</button>
                            </div>
                          ) : (
                            <span className="user-info-value">{currentUser?.displayName || '—'}</span>
                          )}
                        </div>

                        <div className="user-info-row">
                          <span className="user-info-label">Email</span>
                          <span className="user-info-value">{currentUser.email}</span>
                        </div>

                        <div className="user-info-row">
                          <span className="user-info-label">UID</span>
                          <span className="user-info-value" style={{ fontSize: '10px', color: '#aaa' }}>
                            {currentUser.uid?.slice(0, 16)}…
                          </span>
                        </div>

                        <div className="user-info-row">
                          <span className="user-info-label">Role</span>
                          <span className={`user-info-badge ${userRole === 'admin' ? 'admin' : ''}`}>
                            {userRole || 'user'}
                          </span>
                        </div>

                        <div className="user-info-row">
                          <span className="user-info-label">Verified</span>
                          <span className="user-info-value">
                            {currentUser.emailVerified ? '✅ Yes' : '❌ No'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <hr className="dd-separator" />

                    {/* Logout */}
                    <button className="dd-item dd-logout" onClick={handleLogout}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in — show LOGIN link only */
              <Link to="/login" className="login-btn">Login</Link>
            )}

            {/* Mobile hamburger (nav links only, no icons) */}
            <button
              className={`mobile-toggle ${mobileNavOpen ? 'open' : ''}`}
              onClick={() => setMobileNavOpen(o => !o)}
              aria-label="Toggle navigation"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        <nav className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`}>
          <Link to="/skincare"  onClick={() => setMobileNavOpen(false)}>Skincare</Link>
          <Link to="/lip-cheek" onClick={() => setMobileNavOpen(false)}>Lip &amp; Cheek</Link>
          <Link to="/sets"      onClick={() => setMobileNavOpen(false)}>Sets</Link>
          <Link to="/about"     onClick={() => setMobileNavOpen(false)}>About</Link>
          <Link to="/contact"   onClick={() => setMobileNavOpen(false)}>Contact</Link>
          {!currentUser && (
            <Link to="/login" onClick={() => setMobileNavOpen(false)} style={{ color: '#ec4899' }}>
              Login / Sign Up
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
