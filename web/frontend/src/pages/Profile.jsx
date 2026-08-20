import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
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
    degree: state.profile.degree || '',
    year: state.profile.year || '',
    skills: state.profile.skills || [],
    interests: state.profile.interests || [],
    goal: state.profile.goal || '',
  });

  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});

  function addSkill(skill) {
    const s = skill.trim();
    if (s && !form.skills.includes(s)) {
      setForm({ ...form, skills: [...form.skills, s] });
    }
    setSkillInput('');
  }

  function removeSkill(skill) {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  }

  function toggleInterest(interest) {
    const exists = form.interests.includes(interest);
    setForm({
      ...form,
      interests: exists
        ? form.interests.filter((i) => i !== interest)
        : [...form.interests, interest],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.degree) newErrors.degree = 'Please select your degree';
    if (!form.year) newErrors.year = 'Please select your year';
    if (form.interests.length === 0) newErrors.interests = 'Select at least one interest';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch({ type: 'SET_PROFILE', payload: form });
    dispatch({ type: 'SET_STEP', payload: 2 });
    navigate('/domains');
  }

  return (
    <div className="page page-enter">
      <section className="profile-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">📋 Step 1</span>
            <h2 style={{ marginTop: '16px' }}>
              Tell Us About <span className="gradient-text">Yourself</span>
            </h2>
            <p>We'll personalize your entire journey based on your profile.</p>
          </div>

          <form className="profile-form glass-card" onSubmit={handleSubmit} id="profile-form">
            {/* Degree */}
            <div className="form-group">
              <label className="form-label" htmlFor="degree">🎓 Degree / Program</label>
              <select
                className="form-select"
                id="degree"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
              >
                <option value="">Select your degree...</option>
                <option value="btech">B.Tech / B.E.</option>
                <option value="bsc">B.Sc Computer Science</option>
                <option value="bca">BCA</option>
                <option value="mca">MCA</option>
                <option value="mtech">M.Tech</option>
                <option value="other">Other</option>
              </select>
              {errors.degree && <span className="form-error">{errors.degree}</span>}
            </div>

            {/* Year */}
            <div className="form-group">
              <label className="form-label" htmlFor="year">📅 Current Year</label>
              <select
                className="form-select"
                id="year"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              >
                <option value="">Select your year...</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="graduate">Graduate</option>
              </select>
              {errors.year && <span className="form-error">{errors.year}</span>}
            </div>

            {/* Skills */}
            <div className="form-group">
              <label className="form-label">💡 Current Skills</label>
              <div className="tag-container">
                {form.skills.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                    <button type="button" className="tag-remove" onClick={() => removeSkill(s)}>×</button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Type a skill and press Enter..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                />
              </div>
              <div className="skill-suggestions">
                {skillSuggestions
                  .filter((s) => !form.skills.includes(s))
                  .slice(0, 8)
                  .map((s) => (
                    <button
                      type="button"
                      key={s}
                      className="skill-suggest-btn"
                      onClick={() => addSkill(s)}
                    >
                      + {s}
                    </button>
                  ))}
              </div>
            </div>

            {/* Interests */}
            <div className="form-group">
              <label className="form-label">
                🎯 Interests
                {errors.interests && <span className="form-error" style={{ marginLeft: 8 }}>{errors.interests}</span>}
              </label>
              <div className="check-grid">
                {interestOptions.map((interest) => (
                  <div
                    key={interest}
                    className={`check-option ${form.interests.includes(interest) ? 'selected' : ''}`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div className="form-group">
              <label className="form-label" htmlFor="goal">🚀 Career Goal (optional)</label>
              <textarea
                className="form-textarea"
                id="goal"
                placeholder="e.g., I want to become a full-stack developer and work at a top startup..."
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
              />
            </div>

            {/* Submit */}
            <div className="profile-actions">
              <button type="submit" className="btn btn-primary btn-lg" id="profile-submit">
                Continue to Explore Domains →
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
