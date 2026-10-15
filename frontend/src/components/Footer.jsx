import Logo from './Logo';
import { Envelope, MapPin } from '@phosphor-icons/react';

const FOOTER_LINKS = {
  Platform: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Features', href: '/#features' },
    { label: 'For Employers', href: '/#employers' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const dim = 'rgba(255,255,255,0.55)';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const hoverOn = (e) => { e.currentTarget.style.color = '#6FE0CF'; };
  const hoverOff = (c) => (e) => { e.currentTarget.style.color = c; };

  return (
    <footer className="section-dark s2h-footer" data-testid="footer" style={{ padding: '80px 40px 36px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="s2h-footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '22px' }}><Logo size="lg" tone="dark" /></div>
            <p className="font-body" style={{ fontSize: '0.92rem', color: dim, marginBottom: '22px', maxWidth: '320px', lineHeight: 1.7 }}>
              Skill-first hiring. Upload your resume, get ranked matches, and let your skills do the talking.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="mailto:hello@skill2hire.com"
                className="font-body"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: dim, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={hoverOn} onMouseLeave={hoverOff(dim)}
              >
                <Envelope size={14} /> hello@skill2hire.com
              </a>
              <span className="font-body" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: dim }}>
                <MapPin weight="duotone" size={14} /> Remote-first company
              </span>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6FE0CF', marginBottom: '20px' }}>
                {category}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', padding: 0, margin: 0, listStyle: 'none' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body"
                      style={{ fontSize: '0.9rem', color: dim, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={hoverOn} onMouseLeave={hoverOff(dim)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="s2h-footer-bottom"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '64px', paddingTop: '26px', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="font-mono" style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)' }}>
            &copy; {currentYear} Skill2Hire. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-body"
                style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={hoverOn} onMouseLeave={hoverOff('rgba(255,255,255,0.4)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
