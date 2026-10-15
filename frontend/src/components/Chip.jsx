const VARIANTS = {
  default: { background: '#FDE9B8', color: '#8A4B08' },
  skill: { background: '#DCE8FF', color: '#1D3F94' },
  success: { background: 'rgba(34,160,107,0.14)', color: '#14633F' },
  primary: { background: '#D9F0EC', color: '#075E55' },
  dark: { background: 'rgba(6,44,48,0.08)', color: '#062C30' },
};

const Chip = ({ children, variant = 'default', className = '', style: styleProp, ...props }) => {
  const style = VARIANTS[variant] || VARIANTS.default;

  return (
    <span
      className={`font-mono inline-flex items-center ${className}`}
      style={{
        padding: '0.3rem 0.65rem',
        borderRadius: '6px',
        fontSize: '0.7rem',
        fontWeight: 500,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        lineHeight: 1.4,
        ...style,
        ...styleProp,
      }}
      {...props}
    >
      {children}
    </span>
  );
};

export default Chip;
