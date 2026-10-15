import { motion } from 'framer-motion';

// Name kept for import-compatibility; renders a crisp bordered surface card.
const GlassCard = ({ children, className = '', style, hover = true, variant = 'light', ...props }) => {
  const baseStyle = variant === 'dark'
    ? { background: '#062C30', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 12px 32px rgba(0,0,0,0.25)' }
    : { background: '#FFFFFF', border: '1px solid #DCE5E3', boxShadow: '0 1px 2px rgba(6,44,48,0.06)' };

  return (
    <motion.div
      className={className}
      style={{ borderRadius: '16px', ...baseStyle, ...style }}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
