import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiClient from '../api/client';
import Navbar from '../components/Navbar';
import MatchRing from '../components/MatchRing';
import { MapPin, Coins, Briefcase, PaperPlaneRight, CheckCircle, ArrowLeft, WarningCircle, Buildings, CurrencyInr, CurrencyEur, CurrencyGbp, CurrencyDollar, Target } from '@phosphor-icons/react';

const getCurrencyIcon = (salaryStr) => {
  if (!salaryStr) return Coins;
  const str = salaryStr.toUpperCase();
  if (str.includes('INR')) return CurrencyInr;
  if (str.includes('EUR')) return CurrencyEur;
  if (str.includes('GBP')) return CurrencyGbp;
  if (str.includes('USD') || str.includes('CAD') || str.includes('AUD')) return CurrencyDollar;
  return Coins;
};

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await apiClient.get(`/job/${jobId}`);
        setJob(res.data);
        // Check if already applied
        const appsRes = await apiClient.get('/application/my-applications');
        setApplied(appsRes.data.some(a => a.job_id === parseInt(jobId)));
      } catch {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = async () => {
    setApplying(true);
    setError('');
    try {
      await apiClient.post(`/application/apply/${jobId}`);
      setApplied(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--s2h-bg)', backgroundImage: 'var(--mesh-bg)', backgroundSize: '22px 22px' }}>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid var(--s2h-primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--s2h-bg)', backgroundImage: 'var(--mesh-bg)', backgroundSize: '22px 22px' }}>
        <Navbar />
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px', textAlign: 'center' }}>
          <WarningCircle size={64} color="#EF4444" style={{ marginBottom: '16px' }} />
          <h2 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--s2h-ink)', marginBottom: '8px' }}>
            {error || 'Job not found'}
          </h2>
          <button onClick={() => navigate('/')} className="btn-primary font-body" style={{ marginTop: '20px' }}>
            <ArrowLeft weight="duotone" size={16} style={{ marginRight: '8px' }} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--s2h-bg)', backgroundImage: 'var(--mesh-bg)', backgroundSize: '22px 22px' }}>
      <Navbar />
      
      <div className="s2h-page-content" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '100px', paddingBottom: '60px' }}>
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="font-body"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', background: 'white', border: '1px solid rgba(6,44,48,0.08)', color: '#52665F', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '24px' }}
        >
          <ArrowLeft weight="duotone" size={16} /> Back
        </motion.button>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card s2h-detail-card"
          style={{}}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--s2h-ink)', marginBottom: '12px' }}>
                {job.job_title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <span className="font-body" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#52665F', fontSize: '0.9rem' }}>
                  <MapPin weight="duotone" size={16} /> {job.job_location}
                </span>
                <span className="font-body" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#52665F' }}>
                  {(() => {
                    const Icon = getCurrencyIcon(job.salary_range);
                    return <Icon weight="duotone" size={16} />;
                  })()}
                  {job.salary_range}
                </span>
                <span className="font-body" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#52665F', fontSize: '0.9rem' }}>
                  <Briefcase weight="duotone" size={16} /> {job.job_type}
                </span>
                {job.company_name && (
                  <span className="font-body" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#52665F', fontSize: '0.9rem' }}>
                    <Buildings size={16} /> {job.company_name}
                  </span>
                )}
              </div>
            </div>

            {job.match_score != null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', background: 'var(--pro-match-bg)', color: 'var(--s2h-ink)', border: '1px solid var(--pro-match-border)', fontWeight: 700, fontSize: '0.88rem', fontFamily: 'var(--font-body)' }}>
                <Target weight="duotone" size={18} color="var(--s2h-ink)" /> {job.match_score}% Match
              </div>
            )}
          </div>
        </motion.div>

        {/* Job Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card s2h-detail-card"
          style={{}}
        >
          <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--s2h-ink)', marginBottom: '16px' }}>
            Job Description
          </h2>
          <p className="font-body" style={{ color: '#3F524F', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {job.job_description}
          </p>
        </motion.div>

        {/* Skills Required */}
        {job.skills_required && job.skills_required.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card s2h-detail-card"
            style={{}}
          >
            <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--s2h-ink)', marginBottom: '16px' }}>
              Skills Required
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {job.skills_required.map(skill => (
                <span key={skill} className="font-body" style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, background: 'rgba(37,99,235,0.08)', color: '#2563EB' }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Apply Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          {applied ? (
            <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34,160,107,0.08)' }}>
              <CheckCircle weight="duotone" size={20} color="#22A06B" />
              <span className="font-body" style={{ color: '#177A52', fontWeight: 600 }}>Application Submitted</span>
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying}
              className="font-body"
              style={{ 
                padding: '16px 36px', fontSize: '1rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px',
                borderRadius: '8px', background: 'var(--pro-btn-dark)', color: 'var(--pro-btn-dark-text)', border: 'none', cursor: applying ? 'not-allowed' : 'pointer',
                opacity: applying ? 0.7 : 1, transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(31,41,55,0.15)'; e.currentTarget.style.background = 'var(--pro-btn-dark-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--pro-btn-dark)'; }}
            >
              {applying ? (
                <>
                  <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Applying...
                </>
              ) : 'Apply Now'}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetail;