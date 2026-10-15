/**
 * Skill2Hire logo — inline SVG so it stays crisp at any size and recolours for dark surfaces.
 * size   : sm | md | lg | xl | 2xl  (height of the mark)
 * variant: 'full' (mark + wordmark) | 'mark' (mark only)
 * tone   : 'light' (for light surfaces) | 'dark' (for dark surfaces)
 */
const SIZE_MAP = { sm: 28, md: 36, lg: 48, xl: 60, '2xl': 84 };

export const LogoMark = ({ size = 36, title = 'Skill2Hire' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-label={title} style={{ flexShrink: 0 }}>
    <defs>
      <linearGradient id="s2h-logo-grad" x1="44" y1="13" x2="20" y2="51" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#7BE8D6" />
        <stop offset="1" stopColor="#19B7A4" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="#062C30" />
    <path
      d="M44 22C44 16 38 13 32 13C25 13 20 17 20 23C20 29 25 31 32 32C39 33 44 35 44 41C44 47 39 51 32 51C25 51 20 48 20 42"
      stroke="url(#s2h-logo-grad)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <circle cx="44" cy="22" r="5" fill="#fff" />
    <circle cx="20" cy="42" r="5.5" fill="#F5A524" />
  </svg>
);

const Logo = ({ size = 'md', variant = 'full', tone = 'light' }) => {
  const px = SIZE_MAP[size] || SIZE_MAP.md;
  const base = tone === 'dark' ? '#FFFFFF' : '#062C30';
  const accent = tone === 'dark' ? '#6FE0CF' : '#0A7F72';

  return (
    <div className="flex items-center" data-testid="logo" style={{ gap: `${Math.round(px * 0.28)}px` }}>
      <LogoMark size={px} />
      {variant === 'full' && (
        <span
          className="font-display"
          style={{
            fontSize: `${Math.round(px * 0.58)}px`,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: base,
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          Skill<span style={{ color: '#F5A524', fontWeight: 800 }}>2</span>
          <span style={{ color: accent }}>Hire</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
