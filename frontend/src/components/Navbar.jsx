import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import Logo from './Logo';
import { useAuth } from '../context/useAuth';

// ── Nav items — only shown on the landing page ──
const LANDING_LINKS = [
  { label: 'Features',      key: 'features',      href: '#features' },
  { label: 'How It Works',  key: 'how-it-works',  href: '#how-it-works' },
  { label: 'For Employers', key: 'for-employers', href: '#employers' },
];

const PRIMARY = '#0A7F72';
const MUTED = '#52665F';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const lastScrollY = useRef(0);
  const isLanding = location.pathname === '/';

  // hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close mobile panel when route changes
  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      prevPathRef.current = location.pathname;
      setMobileOpen(false);
    }
  }, [location.pathname]);

  // smooth anchor scroll (only on landing page)
  const handleAnchorClick = (e, href) => {
    if (isLanding && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  // initials for logged-in avatar
  const initials = (
    (user?.first_name?.[0] || '') +
    (user?.last_name?.[0] || '') ||
    (user?.user_name?.[0] || 'U')
  ).toUpperCase();

  const avatarStyle = (px, font) => ({
    width: px, height: px, borderRadius: '10px', overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none', flexShrink: 0,
    border: `2px solid ${PRIMARY}`,
    background: user?.profile_picture_url ? 'transparent' : PRIMARY,
    color: '#fff', fontWeight: 700, fontSize: font, fontFamily: 'inherit',
  });

  return (
    <nav
      className="s2h-navbar-container font-body"
      data-testid="navbar"
      aria-label="Primary navigation"
      style={{
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px', margin: '0 auto', height: 'var(--navbar-h)',
          padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px',
        }}
      >
        {/* ─── Logo ─── */}
        <Link to="/" className="shrink-0" data-testid="navbar-logo" aria-label="Skill2Hire home">
          <Logo size="md" />
        </Link>

        {/* ─── Anchor links (desktop, landing only) ─── */}
        {isLanding ? (
          <div className="hidden md:flex items-center flex-1 justify-center" style={{ gap: '34px' }}>
            {LANDING_LINKS.map(({ label, key, href }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                data-testid={`navbar-link-${key}`}
                className="s2h-nav-link"
              >
                {label}
              </a>
            ))}
          </div>
        ) : (
          <div style={{ flex: 1 }} />
        )}

        {/* ─── Auth / Profile (desktop) ─── */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {!user ? (
            <>
              <Link to="/login" className="s2h-nav-link" data-testid="navbar-login-link">Sign in</Link>
              <Link
                to="/signup"
                data-testid="navbar-getstarted-btn"
                style={{
                  display: 'inline-block', background: PRIMARY, color: '#fff', fontWeight: 600,
                  fontSize: '0.9rem', borderRadius: '10px', padding: '10px 20px', textDecoration: 'none',
                  boxShadow: '0 6px 16px rgba(10,127,114,0.25)',
                }}
              >
                Get started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                data-testid="navbar-avatar-btn"
                aria-label={`Profile — ${user.user_name}`}
                title={user.user_name}
                style={avatarStyle('38px', '0.8rem')}
              >
                {user?.profile_picture_url ? (
                  <img src={user.profile_picture_url} alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : initials}
              </Link>

              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                data-testid="navbar-logout-btn"
                aria-label="Log out"
                style={{
                  color: MUTED, fontWeight: 500, fontSize: '0.9rem', background: 'none',
                  border: '1px solid #DCE5E3', borderRadius: '10px', cursor: 'pointer', padding: '8px 14px',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY; e.currentTarget.style.borderColor = PRIMARY; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; e.currentTarget.style.borderColor = '#DCE5E3'; }}
              >
                Log out
              </button>
            </>
          )}
        </div>

        {/* ─── Mobile: avatar if logged in ─── */}
        {user && (
          <Link
            to="/dashboard"
            className="s2h-mobile-avatar"
            aria-label={`Profile — ${user.user_name}`}
            style={{ ...avatarStyle('32px', '0.7rem'), display: 'none' }}
          >
            {user?.profile_picture_url ? (
              <img src={user.profile_picture_url} alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : initials}
          </Link>
        )}

        {/* ─── Mobile hamburger ─── */}
        <button
          className="s2h-mobile-hamburger"
          style={{
            width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #DCE5E3',
            background: '#fff', cursor: 'pointer', padding: 0, display: 'none',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          data-testid="navbar-hamburger"
        >
          {mobileOpen ? <X weight="bold" size={20} color="var(--s2h-ink)" /> : <List weight="bold" size={20} color="var(--s2h-ink)" />}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <div
          className="md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{ background: '#fff', padding: '16px 24px 22px', borderTop: '1px solid #DCE5E3', fontFamily: 'var(--font-body)' }}
        >
          {isLanding && (
            <div className="flex flex-col" style={{ gap: '4px' }}>
              {LANDING_LINKS.map(({ label, key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={(e) => handleAnchorClick(e, href)}
                  data-testid={`navbar-mobile-${key}`}
                  style={{ color: '#0F2E2B', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', padding: '12px 4px', borderBottom: '1px solid #EEF3F2' }}
                >
                  {label}
                </a>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3" style={{ marginTop: '14px' }}>
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  style={{ border: '1px solid #DCE5E3', color: '#062C30', fontWeight: 600, textAlign: 'center', textDecoration: 'none', padding: '12px 14px', borderRadius: '10px' }}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  style={{ background: PRIMARY, color: '#fff', fontWeight: 600, textAlign: 'center', textDecoration: 'none', padding: '12px 14px', borderRadius: '10px' }}
                >
                  Get started
                </Link>
              </>
            ) : (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                style={{ background: '#F3F7F6', color: PRIMARY, fontWeight: 600, border: 'none', padding: '12px 14px', borderRadius: '10px', cursor: 'pointer' }}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
