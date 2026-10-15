import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MatchRing from '../components/MatchRing';
import {
  CloudArrowUp, Crosshair, Gauge, Lightning, Flame, SealCheck, Bank,
  RocketLaunch, ArrowRight, FileText, CheckCircle, Star,
} from '@phosphor-icons/react';

/* ── Animation variants ── */
const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const fadeLeft = { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const FadeSection = ({ children, style = {}, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} style={style} className={className}>
      {children}
    </motion.div>
  );
};

const SKILL_TICKER = [
  'React', 'Python', 'FastAPI', 'Node.js', 'SQL', 'TypeScript', 'Docker', 'AWS',
  'Machine Learning', 'Figma', 'Java', 'Kubernetes', 'Data Analysis', 'Product Design', 'DevOps', 'Go',
];

const features = [
  { icon: Crosshair, title: 'AI Skill Matching', desc: 'TF-IDF vectorization and cosine similarity match your real skills to job requirements — not just keyword stuffing.' },
  { icon: CloudArrowUp, title: 'Resume Analysis', desc: 'Upload your PDF resume and we extract, understand, and map your skills automatically.' },
  { icon: Gauge, title: 'Transparent Scores', desc: 'See exactly how well you fit each role with a clear percentage score and skill breakdown.' },
  { icon: Lightning, title: 'One-Click Apply', desc: 'Found your match? Apply instantly — your resume and skills are already on file.' },
  { icon: Flame, title: 'Quality Over Quantity', desc: 'No endless scrolling. Only curated, AI-recommended jobs that match your profile.' },
  { icon: Bank, title: 'Built for Employers', desc: 'Post jobs and see pre-scored candidates ranked by how well they match your requirements.' },
];

const steps = [
  { step: '01', icon: CloudArrowUp, title: 'Upload your resume', desc: 'Drop in a PDF or add skills manually. We extract and map your capabilities in seconds.' },
  { step: '02', icon: Crosshair, title: 'Get ranked matches', desc: 'Our TF-IDF engine compares your skills against every open role and ranks them by match %.' },
  { step: '03', icon: RocketLaunch, title: 'Apply & track', desc: 'Apply with one click to your best matches and follow each application in real time.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Frontend Developer', quote: 'I uploaded my resume and within seconds had 5 perfectly matched roles. Got hired in 2 weeks!', score: 94 },
  { name: 'Alex Johnson', role: 'HR Director, TechCorp', quote: 'The match scores saved us hours of resume screening. We only see candidates who actually fit.', score: 91 },
  { name: 'Rahul Patel', role: 'Full Stack Developer', quote: 'Unlike other platforms, Skill2Hire showed me roles I was actually qualified for. No more applying blindly.', score: 88 },
];

const employerStats = [
  { value: '73%', label: 'Faster hiring', icon: Lightning },
  { value: '4.2×', label: 'Better matches', icon: Crosshair },
  { value: '89%', label: 'Accept rate', icon: SealCheck },
  { value: '< 48h', label: 'Avg. time to fill', icon: Gauge },
];

const heroStats = [
  { v: '94%', l: 'Match accuracy' },
  { v: '2.1k+', l: 'Jobs matched' },
  { v: '< 30s', l: 'To first match' },
];

const Landing = () => (
  <div style={{ background: 'var(--s2h-bg)', minHeight: '100vh' }}>
    <Navbar />

    {/* ══ HERO ══ */}
    <section className="section-mesh" style={{ position: 'relative', overflow: 'hidden', paddingTop: 'calc(var(--navbar-h) + 72px)', paddingBottom: '104px' }}>
      <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(10,127,114,0.16), transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-160px', left: '-100px', width: '460px', height: '460px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,165,36,0.14), transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <div className="s2h-eyebrow font-mono" style={{ marginBottom: '22px' }}>Skill-first hiring</div>

            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,5vw,4.2rem)', fontWeight: 700, color: 'var(--s2h-ink)', lineHeight: 1.05, marginBottom: '22px' }}>
              From skill to{' '}
              <span style={{ background: 'linear-gradient(90deg,#0A7F72,#19B7A4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>hired</span>
              , in one upload.
            </h1>

            <p className="font-body" style={{ fontSize: '1.1rem', color: 'var(--s2h-muted)', lineHeight: 1.75, marginBottom: '34px', maxWidth: '500px' }}>
              Drop in your resume and Skill2Hire ranks every open role by how well your skills actually fit.
              No endless scrolling, no guessing — just matches that make sense.
            </p>

            <div style={{ display: 'flex', gap: '14px', marginBottom: '48px', flexWrap: 'wrap' }}>
              <Link to="/signup"><button className="btn-primary font-body" style={{ fontSize: '1rem' }}><CloudArrowUp weight="duotone" size={18} /> Upload Resume</button></Link>
              <Link to="/signup">
                <button className="font-body" style={{ fontSize: '1rem', fontWeight: 600, padding: '0.8rem 1.5rem', borderRadius: '10px', border: '1.5px solid var(--s2h-ink)', background: 'transparent', color: 'var(--s2h-ink)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Bank weight="duotone" size={18} /> I'm Hiring
                </button>
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', paddingTop: '28px', borderTop: '1px solid var(--s2h-line)' }}>
              {heroStats.map((s) => (
                <div key={s.l}>
                  <div className="s2h-stat-val">{s.v}</div>
                  <div className="s2h-stat-lbl">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — resume → match visual */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.7, ease: EASE }} style={{ position: 'relative', maxWidth: '520px', width: '100%', margin: '0 auto' }}>
            <div className="s2h-resume-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px dashed var(--s2h-line)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--s2h-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText weight="duotone" size={22} color="#0A7F72" />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="font-display" style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--s2h-ink)' }}>resume_aanya.pdf</div>
                  <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--s2h-faint)' }}>8 skills extracted</div>
                </div>
                <span className="font-mono" style={{ fontSize: '0.66rem', padding: '4px 8px', borderRadius: '6px', background: 'rgba(34,160,107,0.14)', color: '#14633F' }}>PARSED</span>
              </div>

              <div className="font-mono" style={{ fontSize: '0.66rem', letterSpacing: '0.08em', color: 'var(--s2h-faint)', marginBottom: '10px' }}>YOUR SKILLS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {['React', 'TypeScript', 'Node.js', 'SQL', 'Figma', 'REST', 'Git', 'Docker'].map((s) => <span key={s} className="s2h-tag">{s}</span>)}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px 0 16px', color: 'var(--s2h-primary)' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--s2h-line)' }} />
                <span className="font-mono" style={{ fontSize: '0.66rem', letterSpacing: '0.1em', padding: '0 12px' }}>MATCHED TO ▾</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--s2h-line)' }} />
              </div>

              <div style={{ border: '1px solid var(--s2h-line)', borderRadius: '14px', padding: '18px', background: '#F9FBFA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <div className="font-display" style={{ fontWeight: 700, fontSize: '1.08rem', color: 'var(--s2h-ink)' }}>Senior Frontend Developer</div>
                    <div className="font-body" style={{ fontSize: '0.78rem', color: 'var(--s2h-muted)', marginTop: '3px' }}>NorthPeak Labs · Remote · $130k – $165k</div>
                  </div>
                  <MatchRing score={96} size={56} strokeWidth={5} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {[{ l: 'Skill overlap', v: 96 }, { l: 'Role keywords', v: 88 }, { l: 'Tooling', v: 92 }].map((r) => (
                    <div key={r.l} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--s2h-muted)', width: '92px' }}>{r.l}</span>
                      <div className="s2h-bar" style={{ flex: 1 }}>
                        <motion.span initial={{ width: 0 }} animate={{ width: `${r.v}%` }} transition={{ delay: 0.7, duration: 1.1, ease: 'easeOut' }} />
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--s2h-ink)', width: '30px', textAlign: 'right' }}>{r.v}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '-18px', right: '-14px', zIndex: 5, background: 'var(--s2h-ink)', color: '#fff', borderRadius: '12px', padding: '10px 14px', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle weight="fill" size={18} color="#6FE0CF" />
              <span className="font-display" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Interview ready</span>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }} style={{ position: 'absolute', bottom: '-16px', left: '-16px', zIndex: 5, background: '#fff', border: '1px solid var(--s2h-line)', borderRadius: '12px', padding: '10px 14px', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--s2h-amber)' }} />
              <span className="font-display" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--s2h-ink)' }}>4 new matches today</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ══ SKILL TICKER ══ */}
    <div style={{ padding: '30px 0', overflow: 'hidden', background: 'var(--s2h-ink)' }}>
      <div className="animate-marquee-scroll" style={{ display: 'flex', gap: '14px', width: 'max-content' }}>
        {[...SKILL_TICKER, ...SKILL_TICKER, ...SKILL_TICKER].map((s, i) => (
          <span key={i} className="font-mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.78)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#F5A524' }}>◆</span>{s}
          </span>
        ))}
      </div>
    </div>

    {/* ══ FEATURES ══ */}
    <section id="features" style={{ padding: '110px 40px', background: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <FadeSection style={{ marginBottom: '60px', maxWidth: '680px' }}>
          <motion.div variants={fadeUp} className="s2h-eyebrow font-mono" style={{ marginBottom: '16px' }}>Why Skill2Hire</motion.div>
          <motion.h2 variants={fadeUp} className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3.1rem)', fontWeight: 700, color: 'var(--s2h-ink)', marginBottom: '16px', lineHeight: 1.1 }}>
            Not just another job board.
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body" style={{ fontSize: '1.08rem', color: 'var(--s2h-muted)', lineHeight: 1.7 }}>
            We don't let you scroll endlessly. Our engine reads your resume, understands your skills, and serves only the jobs that actually fit.
          </motion.p>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp} className="s2h-feature">
              <div className="ico"><f.icon weight="duotone" size={22} color="#0A7F72" /></div>
              <h3 className="font-display" style={{ fontSize: '1.08rem', fontWeight: 600, color: 'var(--s2h-ink)', marginBottom: '8px' }}>{f.title}</h3>
              <p className="font-body" style={{ fontSize: '0.92rem', color: 'var(--s2h-muted)', lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </FadeSection>
      </div>
    </section>

    {/* ══ HOW IT WORKS ══ */}
    <section id="how-it-works" style={{ padding: '110px 40px', background: 'var(--s2h-bg2)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <FadeSection style={{ marginBottom: '60px' }}>
          <motion.div variants={fadeUp} className="s2h-eyebrow font-mono" style={{ marginBottom: '16px' }}>Simple process</motion.div>
          <motion.h2 variants={fadeUp} className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3.1rem)', fontWeight: 700, color: 'var(--s2h-ink)', lineHeight: 1.1 }}>
            Three steps to your <span style={{ color: 'var(--s2h-primary)' }}>perfect match.</span>
          </motion.h2>
        </FadeSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 * idx, ease: EASE }}
              style={{ background: '#fff', border: '1px solid var(--s2h-line)', borderRadius: '16px', padding: '32px 28px', position: 'relative', overflow: 'hidden' }}
            >
              <div className="font-display" style={{ position: 'absolute', top: '6px', right: '18px', fontSize: '5.5rem', fontWeight: 800, color: 'rgba(10,127,114,0.08)', lineHeight: 1 }}>{item.step}</div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--s2h-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '22px' }}>
                <item.icon size={22} color="#6FE0CF" weight="duotone" />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--s2h-ink)', marginBottom: '10px' }}>{item.title}</h3>
              <p className="font-body" style={{ fontSize: '0.92rem', color: 'var(--s2h-muted)', lineHeight: 1.65 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ FOR EMPLOYERS ══ */}
    <section id="employers" className="section-dark" style={{ padding: '110px 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeSection>
            <motion.div variants={fadeLeft} className="s2h-eyebrow on-dark font-mono" style={{ marginBottom: '22px' }}>For employers</motion.div>
            <motion.h2 variants={fadeLeft} className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#fff', marginBottom: '22px', lineHeight: 1.12 }}>
              Find candidates who <span style={{ color: '#6FE0CF' }}>actually fit</span> your roles.
            </motion.h2>
            <motion.p variants={fadeLeft} className="font-body" style={{ fontSize: '1.02rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, marginBottom: '34px', maxWidth: '480px' }}>
              Stop sifting through hundreds of unqualified resumes. Post a job and see candidates pre-ranked by match score. Accept or reject with one click.
            </motion.p>
            <motion.div variants={fadeLeft}>
              <Link to="/signup">
                <button className="btn-primary font-body" style={{ fontSize: '1rem', background: '#19B7A4', color: '#042226', boxShadow: 'none' }}>
                  Start Hiring <ArrowRight weight="bold" size={16} />
                </button>
              </Link>
            </motion.div>
          </FadeSection>

          <FadeSection className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {employerStats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} whileHover={{ y: -4 }} style={{ padding: '26px 24px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <s.icon size={20} color="#F5A524" style={{ marginBottom: '16px' }} />
                <div className="font-display" style={{ fontSize: '1.9rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{s.value}</div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{s.label}</div>
              </motion.div>
            ))}
          </FadeSection>
        </div>
      </div>
    </section>

    {/* ══ TESTIMONIALS ══ */}
    <section style={{ padding: '110px 40px', background: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <FadeSection style={{ marginBottom: '56px' }}>
          <motion.div variants={fadeUp} className="s2h-eyebrow font-mono" style={{ marginBottom: '16px' }}>Testimonials</motion.div>
          <motion.h2 variants={fadeUp} className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--s2h-ink)', lineHeight: 1.1 }}>
            Loved by candidates & employers.
          </motion.h2>
        </FadeSection>

        <FadeSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp} style={{ padding: '30px', borderRadius: '16px', background: '#F7FAF9', border: '1px solid var(--s2h-line)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '26px' }}>
              <div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => <Star weight="fill" key={i} size={15} color="#F5A524" />)}
                </div>
                <p className="font-body" style={{ fontSize: '0.98rem', color: '#2B4440', lineHeight: 1.7 }}>&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="font-display" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--s2h-ink)' }}>{t.name}</div>
                  <div className="font-body" style={{ fontSize: '0.8rem', color: 'var(--s2h-faint)' }}>{t.role}</div>
                </div>
                <MatchRing score={t.score} size={48} />
              </div>
            </motion.div>
          ))}
        </FadeSection>
      </div>
    </section>

    {/* ══ CTA ══ */}
    <section style={{ padding: '0 40px 110px', background: '#fff' }}>
      <FadeSection>
        <motion.div variants={fadeUp} style={{ maxWidth: '1100px', margin: '0 auto', borderRadius: '24px', padding: '64px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(120deg, #062C30 0%, #0B4A4A 55%, #0A7F72 100%)' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'linear-gradient(90deg, transparent, #000)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000)' }} />
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', fontWeight: 700, color: '#fff', marginBottom: '12px', lineHeight: 1.1 }}>
                Your next role is already <span style={{ color: '#FDE9B8' }}>looking for you.</span>
              </h2>
              <p className="font-body" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '440px', lineHeight: 1.7 }}>
                Join thousands of candidates and employers who've discovered smarter hiring with Skill2Hire.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/signup">
                <motion.button whileHover={{ y: -2 }} className="font-body" style={{ fontWeight: 700, padding: '15px 28px', borderRadius: '10px', background: '#F5A524', color: '#2A1A00', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                  I'm looking for work
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button whileHover={{ y: -2 }} className="font-body" style={{ fontWeight: 600, padding: '15px 28px', borderRadius: '10px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.95rem' }}>
                  I'm hiring
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </FadeSection>
    </section>

    <Footer />
  </div>
);

export default Landing;
