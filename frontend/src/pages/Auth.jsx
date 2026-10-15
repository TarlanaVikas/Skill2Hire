import { useState, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/useAuth';
import { Eye, EyeClosed, WarningCircle, User, Buildings, CheckCircle, XCircle } from '@phosphor-icons/react';
import Logo from '../components/Logo';
import { Crosshair, CloudArrowUp, RocketLaunch } from '@phosphor-icons/react';

const Auth = ({ isSignup = false }) => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(!isSignup);
  const [userType, setUserType] = useState('candidate');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const appliedInitRef = useRef(null);
  if (appliedInitRef.current == null) {
    appliedInitRef.current = true;
    setIsLoginMode(!isSignup);
  }

  // Password strength checks
  const pwChecks = useMemo(() => {
    const pw = formData.user_password;
    return [
      { label: 'At least 8 characters', pass: pw.length >= 8 },
      { label: 'One uppercase letter', pass: /[A-Z]/.test(pw) },
      { label: 'One number', pass: /[0-9]/.test(pw) },
      { label: 'One special character', pass: /[^A-Za-z0-9]/.test(pw) },
    ];
  }, [formData.user_password]);

  const allPwValid = pwChecks.every(c => c.pass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoginMode && !allPwValid) {
      setError('Please meet all password requirements.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (isLoginMode) {
        const userData = await login(formData.user_email, formData.user_password);
        // Redirect based on profile state
        if (!userData.profile_completed) {
          navigate(`/onboarding/${userData.user_type}`);
        } else {
          navigate(userData.user_type === 'employer' ? '/employer' : '/dashboard');
        }
      } else {
        const userData = await signup(formData.user_name, formData.user_email, formData.user_password, userType);
        // New user → always go to onboarding
        navigate(`/onboarding/${userType}`);
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 15px',
    borderRadius: '10px',
    border: '1.5px solid var(--s2h-line)',
    background: '#fff',
    fontSize: '0.95rem',
    color: 'var(--s2h-ink)',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };
  const focusOn = (e) => { e.target.style.borderColor = 'var(--s2h-primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(10,127,114,0.14)'; };
  const focusOff = (e) => { e.target.style.borderColor = 'var(--s2h-line)'; e.target.style.boxShadow = 'none'; };
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--s2h-ink)', marginBottom: '8px' };

  const asidePoints = [
    { icon: CloudArrowUp, t: 'Upload once', d: 'We parse your PDF resume and map your skills.' },
    { icon: Crosshair, t: 'Ranked by fit', d: 'Every job gets a transparent match score.' },
    { icon: RocketLaunch, t: 'Apply & track', d: 'One-click applications with live status.' },
  ];

  return (
    <div className="s2h-auth-split" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.05fr 1fr', background: 'var(--s2h-bg)' }}>
      {/* Brand panel */}
      <aside className="s2h-auth-aside section-dark" style={{ padding: '48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'inline-block', width: 'fit-content' }}><Logo size="lg" tone="dark" /></Link>

        <div>
          <div className="s2h-eyebrow on-dark font-mono" style={{ marginBottom: '20px' }}>Skill-first hiring</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem,3.2vw,2.9rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '34px' }}>
            Let your skills <span style={{ color: '#6FE0CF' }}>do the talking.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '400px' }}>
            {asidePoints.map(({ icon: Icon, t, d }) => (
              <div key={t} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(111,224,207,0.12)', border: '1px solid rgba(111,224,207,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color="#6FE0CF" weight="duotone" />
                </div>
                <div>
                  <div className="font-display" style={{ color: '#fff', fontWeight: 600, fontSize: '0.98rem' }}>{t}</div>
                  <div className="font-body" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.5 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="font-mono" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>&copy; {new Date().getFullYear()} Skill2Hire</div>
      </aside>

      {/* Form side */}
      <div className="s2h-auth-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: '440px' }}>
          <div style={{ marginBottom: '26px' }}>
            <div className="md:hidden" style={{ marginBottom: '18px' }}><Link to="/" style={{ display: 'inline-block' }}><Logo size="md" /></Link></div>
            <h1 className="font-display" style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--s2h-ink)', marginBottom: '6px' }}>
              {isLoginMode ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="font-body" style={{ color: 'var(--s2h-muted)', fontSize: '0.98rem' }}>
              {isLoginMode ? 'Sign in to continue to Skill2Hire.' : 'Join Skill2Hire and get matched on skills.'}
            </p>
          </div>

          <div className="s2h-form-card">
            {/* Mode tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '26px', padding: '4px', background: '#EEF3F2', borderRadius: '10px' }}>
              {[{ v: true, l: 'Sign In' }, { v: false, l: 'Sign Up' }].map(({ v, l }) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setIsLoginMode(v)}
                  className="font-body"
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
                    background: isLoginMode === v ? '#fff' : 'transparent',
                    boxShadow: isLoginMode === v ? '0 1px 3px rgba(6,44,48,0.12)' : 'none',
                    color: isLoginMode === v ? 'var(--s2h-ink)' : 'var(--s2h-faint)',
                    fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* User Type Toggle - Sign Up only */}
            <AnimatePresence>
              {!isLoginMode && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginBottom: '20px' }}>
                  <p className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--s2h-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>I am a</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {[
                      { key: 'candidate', label: 'Candidate', icon: User },
                      { key: 'employer', label: 'Employer', icon: Buildings },
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setUserType(key)}
                        className="font-body"
                        style={{
                          flex: 1, padding: '12px', borderRadius: '10px',
                          border: userType === key ? '2px solid var(--s2h-primary)' : '1.5px solid var(--s2h-line)',
                          background: userType === key ? 'var(--s2h-primary-soft)' : '#fff',
                          color: userType === key ? '#075E55' : 'var(--s2h-muted)',
                          fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s ease',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        }}
                      >
                        <Icon size={16} />
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="font-body"
                  style={{ padding: '12px 14px', borderRadius: '10px', marginBottom: '20px', background: '#FDECEC', border: '1px solid #F8C4C4', color: '#9B1C1C', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <WarningCircle size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              {/* Username - Sign Up only */}
              <AnimatePresence>
                {!isLoginMode && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginBottom: '16px' }}>
                    <label className="font-body" style={labelStyle}>Username</label>
                    <input
                      type="text"
                      value={formData.user_name}
                      onChange={(e) => setFormData({ ...formData, user_name: e.target.value.toLowerCase().replace(/\s/g, '') })}
                      placeholder="Enter a unique username"
                      style={inputStyle}
                      onFocus={focusOn} onBlur={focusOff}
                      required={!isLoginMode}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div style={{ marginBottom: '16px' }}>
                <label className="font-body" style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={formData.user_email}
                  onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                  placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={focusOn} onBlur={focusOff}
                  required
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: !isLoginMode ? '16px' : '26px', position: 'relative' }}>
                <label className="font-body" style={labelStyle}>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.user_password}
                  onChange={(e) => setFormData({ ...formData, user_password: e.target.value })}
                  placeholder="Enter your password"
                  style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={focusOn} onBlur={focusOff}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: '12px', top: '38px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--s2h-faint)', padding: '4px' }}
                >
                  {showPassword ? <EyeClosed size={18} /> : <Eye weight="duotone" size={18} />}
                </button>
              </div>

              {/* Password strength - Sign Up only */}
              <AnimatePresence>
                {!isLoginMode && formData.user_password.length > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginBottom: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {pwChecks.map(c => (
                        <div key={c.label} className="font-body" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: c.pass ? '#1E8E5F' : 'var(--s2h-faint)' }}>
                          {c.pass ? <CheckCircle size={13} /> : <XCircle weight="duotone" size={13} />}
                          {c.label}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ y: loading ? 0 : -2 }}
                whileTap={{ scale: 0.98 }}
                className="font-body"
                style={{
                  width: '100%', padding: '14px', fontSize: '0.95rem', fontWeight: 700,
                  borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  background: 'var(--s2h-primary)', color: 'white', boxShadow: 'var(--shadow-glow-primary)',
                  opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {loading ? (
                  <>
                    <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Please wait...
                  </>
                ) : isLoginMode ? 'Sign In' : 'Create Account'}
              </motion.button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '22px' }}>
              <p className="font-body" style={{ fontSize: '0.85rem', color: 'var(--s2h-muted)' }}>
                {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}
                  className="font-body"
                  style={{ background: 'none', border: 'none', color: 'var(--s2h-primary)', fontWeight: 700, cursor: 'pointer', marginLeft: '4px' }}
                >
                  {isLoginMode ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
