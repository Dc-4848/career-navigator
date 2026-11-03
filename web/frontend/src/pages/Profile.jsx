import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Calendar,
  Zap,
  Target,
  Check,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import api from '../api';
import './Profile.css';

const interestOptions = [
  'Building Websites', 'Mobile Apps', 'Artificial Intelligence',
  'Data Analysis', 'Cybersecurity', 'Game Development',
  'Cloud Computing', 'Automation', 'Design / UI/UX',
  'Problem Solving', 'Research', 'Startups',
];

const skillSuggestions = [
  'HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C++', 'React',
  'Node.js', 'SQL', 'Git', 'Linux', 'Flutter', 'TypeScript',
  'Machine Learning', 'Data Structures', 'Algorithms',
];

export default function Profile() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    degree: state.profile?.degree || '',
    year: state.profile?.year || '',
    skills: state.profile?.skills || [],
    interests: state.profile?.interests || [],
    goal: state.profile?.goal || '',
  });

  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const [initialLoading, setInitialLoading] = useState(!state.profileLoaded);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Fetch saved profile from MongoDB on mount
  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const res = await api.get('/profile');
        if (res.data && isMounted) {
          setForm({
            degree: res.data.degree || '',
            year: res.data.year || '',
            skills: Array.isArray(res.data.skills) ? res.data.skills : [],
            interests: Array.isArray(res.data.interests) ? res.data.interests : [],
            goal: res.data.goal || '',
          });
          dispatch({ type: 'SET_PROFILE', payload: res.data });
        }
      } catch (err) {
        // If 404, user hasn't saved a profile yet, which is expected
        if (err.response?.status !== 404) {
          console.warn('Could not load profile:', err.message);
        }
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  function addSkill(skill) {
    const s = skill.trim();
    if (!s) return;
    const exists = form.skills.some(
      (item) => item.toLowerCase() === s.toLowerCase()
    );
    if (!exists) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, s] }));
    }
    setSkillInput('');
  }

  function removeSkill(skillToRemove) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.toLowerCase() !== skillToRemove.toLowerCase()),
    }));
  }

  function toggleInterest(interest) {
    const exists = form.interests.includes(interest);
    setForm((prev) => ({
      ...prev,
      interests: exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  async function handleSubmit(e, continueToNext = true) {
    if (e) e.preventDefault();
    setSaveError('');
    setSaveSuccess(false);

    const newErrors = {};
    if (!form.degree) newErrors.degree = 'Please select your degree';
    if (!form.year) newErrors.year = 'Please select your year';
    if (form.interests.length === 0) newErrors.interests = 'Select at least one interest';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = document.querySelector('.form-error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSaving(true);
    try {
      const res = await api.post('/profile', form);
      dispatch({ type: 'SET_PROFILE', payload: res.data });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);

      if (continueToNext) {
        dispatch({ type: 'SET_STEP', payload: 2 });
        navigate('/domains');
      }
    } catch (err) {
      setSaveError(
        err.response?.data?.message || 'Unable to save your profile. Please check your connection and try again.'
      );
    } finally {
      setSaving(false);
    }
  }

  if (initialLoading) {
    return (
      <div className="page page-enter">
        <section className="profile-section">
          <div className="container">
            <div className="profile-skeleton glass-card">
              <div className="skeleton-line skeleton-title"></div>
              <div className="skeleton-line skeleton-subtitle"></div>
              <div className="skeleton-block"></div>
              <div className="skeleton-block"></div>
              <div className="skeleton-block"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page page-enter">
      <section className="profile-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <User size={13} /> Step 1: Academic & Skills Profile
            </span>
            <h2 style={{ marginTop: '16px' }}>
              Tell Us About <span className="gradient-text">Your Background</span>
            </h2>
            <p>We personalize your learning roadmap and career tracking based on your profile.</p>
          </div>

          {/* Success Banner */}
          {saveSuccess && (
            <div className="profile-banner success-banner glass-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--accent-teal)" />
              <span>Your profile has been saved successfully to your account!</span>
            </div>
          )}

          {/* Error Banner */}
          {saveError && (
            <div className="profile-banner error-banner glass-card" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} color="var(--accent-rose)" />
              <span>{saveError}</span>
            </div>
          )}

          <form className="profile-form glass-card" onSubmit={(e) => handleSubmit(e, true)} id="profile-form">
            {/* Degree */}
            <div className="form-group">
              <label className="form-label" htmlFor="degree" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <GraduationCap size={15} /> Degree / Program <span className="required-star">*</span>
              </label>
              <select
                className={`form-select ${errors.degree ? 'input-error' : ''}`}
                id="degree"
                value={form.degree}
                onChange={(e) => {
                  setForm({ ...form, degree: e.target.value });
                  if (errors.degree) setErrors({ ...errors, degree: null });
                }}
                disabled={saving}
              >
                <option value="">Select your degree...</option>
                <option value="btech">B.Tech / B.E.</option>
                <option value="bsc">B.Sc Computer Science / IT</option>
                <option value="bca">BCA</option>
                <option value="mca">MCA</option>
                <option value="mtech">M.Tech</option>
                <option value="other">Other / Self-Taught</option>
              </select>
              {errors.degree && <span className="form-error">{errors.degree}</span>}
            </div>

            {/* Year */}
            <div className="form-group">
              <label className="form-label" htmlFor="year" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={15} /> Current Year <span className="required-star">*</span>
              </label>
              <select
                className={`form-select ${errors.year ? 'input-error' : ''}`}
                id="year"
                value={form.year}
                onChange={(e) => {
                  setForm({ ...form, year: e.target.value });
                  if (errors.year) setErrors({ ...errors, year: null });
                }}
                disabled={saving}
              >
                <option value="">Select your year...</option>
                <option value="1">1st Year (Freshman)</option>
                <option value="2">2nd Year (Sophomore)</option>
                <option value="3">3rd Year (Junior)</option>
                <option value="4">4th Year (Senior)</option>
                <option value="graduate">Recent Graduate / Working</option>
              </select>
              {errors.year && <span className="form-error">{errors.year}</span>}
            </div>

            {/* Skills */}
            <div className="form-group">
              <label className="form-label" htmlFor="skill-input" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Zap size={15} /> Current Skills (Type and press Enter)
              </label>
              <div className="tag-container" onClick={() => document.getElementById('skill-input')?.focus()}>
                {form.skills.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                    <button
                      type="button"
                      className="tag-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSkill(s);
                      }}
                      aria-label={`Remove ${s}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  id="skill-input"
                  type="text"
                  placeholder={form.skills.length === 0 ? "Type a skill (e.g., Python, React) and press Enter..." : "Add another skill..."}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                  disabled={saving}
                />
              </div>

              {/* Suggestions */}
              <div className="skill-suggestions-wrapper">
                <span className="suggestion-hint">Suggested skills:</span>
                <div className="skill-suggestions">
                  {skillSuggestions
                    .filter((s) => !form.skills.some((userSkill) => userSkill.toLowerCase() === s.toLowerCase()))
                    .slice(0, 8)
                    .map((s) => (
                      <button
                        type="button"
                        key={s}
                        className="skill-suggest-btn"
                        onClick={() => addSkill(s)}
                        disabled={saving}
                      >
                        + {s}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Target size={15} /> Technical Interests <span className="required-star">*</span>
                {errors.interests && <span className="form-error" style={{ marginLeft: 8 }}>{errors.interests}</span>}
              </label>
              <div className="check-grid">
                {interestOptions.map((interest) => {
                  const isSelected = form.interests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      className={`check-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        toggleInterest(interest);
                        if (errors.interests) setErrors({ ...errors, interests: null });
                      }}
                      disabled={saving}
                    >
                      <span className="check-box-indicator">
                        {isSelected ? <Check size={12} /> : ''}
                      </span>
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Goal */}
            <div className="form-group">
              <label className="form-label" htmlFor="goal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Compass size={15} /> Career Goal (Optional)
              </label>
              <textarea
                className="form-textarea"
                id="goal"
                placeholder="e.g., I want to become a full-stack developer and land an internship at a top tech company..."
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                disabled={saving}
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="profile-actions">
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={(e) => handleSubmit(e, false)}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                id="profile-submit"
                disabled={saving}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                {saving ? (
                  <span className="btn-loading">Saving to MongoDB...</span>
                ) : (
                  <>Save & Continue to Domains <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

