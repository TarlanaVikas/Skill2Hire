import { motion } from 'framer-motion';

const MatchRing = ({ score, size = 64, strokeWidth = 4, showLabel = true, className = '' }) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  
  const getColor = () => {
    if (score >= 80) return { primary: '#16A06A', glow: 'rgba(22,160,106,0.35)' };
    if (score >= 60) return { primary: '#E99A12', glow: 'rgba(233,154,18,0.35)' };
    return { primary: '#E2574C', glow: 'rgba(226,87,76,0.35)' };
  };

  const colors = getColor();

  const containerVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const ringVariants = {
    initial: { pathLength: 0 },
    animate: { pathLength: score / 100, transition: { duration: 2.2, ease: 'easeOut' } }
  };

  return (
    <motion.div
      className={className}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          {score >= 80 && (
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(6,44,48,0.06)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          variants={ringVariants}
          filter={score >= 80 ? 'url(#glow)' : undefined}
          style={{
            strokeDashoffset: circumference - progress,
          }}
        />
      </svg>
      
      {showLabel && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
            <motion.span
              className="font-display font-bold"
              style={{ 
                fontSize: size * 0.32, 
                color: colors.primary,
                lineHeight: 1,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {score}
            </motion.span>
            {size > 50 && (
              <motion.span
                className="font-body"
                style={{ fontSize: size * 0.18, color: '#7A8C89', textTransform: 'uppercase', marginLeft: '1px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                %
              </motion.span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MatchRing;