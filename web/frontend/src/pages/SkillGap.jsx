import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../store/AppContext';
import domains from '../data/domains';
import './SkillGap.css';

// Precise role-to-skill mappings
const roleSkills = {
  // Web Dev
  'webdev_Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Next.js', 'UI Design Basics', 'Git'],
  'webdev_Backend Developer': ['JavaScript', 'Node.js', 'Git', 'REST APIs', 'Databases', 'Docker', 'System Design'],
  'webdev_Full Stack Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git', 'REST APIs', 'Databases', 'TypeScript', 'Next.js', 'System Design'],
  'webdev_DevOps Engineer': ['Git', 'Docker', 'CI/CD', 'Linux', 'Networking Basics', 'Kubernetes', 'Terraform', 'System Architecture'],
  
  // AI/ML
  'aiml_ML Engineer': ['Python', 'Math/Statistics', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Deep Learning'],
  'aiml_AI Researcher': ['Python', 'Math/Statistics', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision'],
  'aiml_Data Analyst': ['Python', 'Math/Statistics', 'NumPy', 'Pandas', 'Data Visualization', 'SQL', 'Excel', 'Power BI'],
  'aiml_NLP Engineer': ['Python', 'Math/Statistics', 'NumPy', 'Pandas', 'Scikit-learn', 'Deep Learning', 'NLP'],

  // Data Science
  'datascience_Data Scientist': ['Python', 'SQL', 'Statistics', 'Pandas', 'Matplotlib', 'Machine Learning', 'Deep Learning', 'A/B Testing'],
  'datascience_Data Analyst': ['Python', 'SQL', 'Statistics', 'Pandas', 'Matplotlib', 'Power BI', 'Excel'],
  'datascience_Business Analyst': ['Excel', 'SQL', 'Statistics', 'Power BI', 'Data Visualization'],
  'datascience_Data Engineer': ['Python', 'SQL', 'Big Data', 'Databases', 'Linux', 'Git', 'System Design'],

  // Cybersecurity
  'cybersecurity_Security Analyst': ['Networking Basics', 'Linux', 'Python', 'Ethical Hacking', 'OWASP', 'Cryptography', 'SOC Operations'],
  'cybersecurity_Penetration Tester': ['Networking Basics', 'Linux', 'Ethical Hacking', 'OWASP', 'Cryptography', 'Penetration Testing', 'Malware Analysis'],
  'cybersecurity_SOC Analyst': ['Networking Basics', 'Linux', 'SOC Operations', 'Firewalls'],
  'cybersecurity_Security Architect': ['Networking Basics', 'Cryptography', 'Cloud Security', 'System Architecture', 'Penetration Testing'],

  // App Dev
  'appdev_Mobile Developer': ['JavaScript', 'React Native', 'Flutter', 'Dart', 'Firebase', 'REST APIs', 'UI Design Basics'],
  'appdev_React Native Developer': ['JavaScript', 'React Basics', 'React Native', 'Firebase', 'REST APIs', 'UI Design Basics', 'State Management'],
  'appdev_Flutter Developer': ['Dart', 'Flutter', 'Firebase', 'REST APIs', 'UI Design Basics', 'State Management'],
  'appdev_iOS Developer': ['Swift', 'Native (Swift/Kotlin)', 'UI Design Basics', 'App Store Deployment', 'Performance Optimization'],

  // Cloud & DevOps
  'cloud_Cloud Engineer': ['Linux', 'Networking Basics', 'AWS / Azure', 'Docker', 'Python', 'Terraform', 'Cloud Security'],
  'cloud_DevOps Engineer': ['Linux', 'Networking Basics', 'Git', 'AWS / Azure', 'Docker', 'CI/CD Basics', 'Kubernetes', 'Terraform'],
  'cloud_Site Reliability Engineer': ['Linux', 'Networking Basics', 'Git', 'Python', 'Docker', 'Kubernetes', 'Terraform', 'System Architecture', 'Site Reliability'],

  // Game Dev
  'gamedev_Gameplay Programmer': ['C#', 'Game Design Basics', '2D Math', 'Unity Engine', 'Physics Engines', 'Animation Systems'],
  'gamedev_Unity Developer': ['C#', 'Game Design Basics', '2D Math', 'Unity Engine', 'Physics Engines', 'Animation Systems'],
  'gamedev_Technical Artist': ['UI Design Basics', 'Color Theory', 'Typography', '3D Math', 'Unity Engine', 'Animation Systems'],

  // Blockchain
  'blockchain_Smart Contract Dev': ['JavaScript', 'Cryptography Basics', 'Blockchain Concepts', 'Solidity', 'Smart Contracts', 'Ethereum / Hardhat', 'Smart Contract Auditing'],
  'blockchain_Web3 Frontend Dev': ['JavaScript', 'Cryptography Basics', 'React', 'Solidity', 'Web3.js / Ethers.js'],
  'blockchain_Blockchain Architect': ['Cryptography Basics', 'Blockchain Concepts', 'Solidity', 'Smart Contracts', 'DeFi Protocols', 'Smart Contract Auditing'],

  // UI/UX Design
  'uiux_UI Designer': ['Color Theory', 'Typography', 'Figma Basics', 'Wireframing', 'Interactive Prototyping', 'Design Systems'],
  'uiux_UX Researcher': ['User Flows', 'User Research', 'A/B Testing', 'Typography'],
  'uiux_Product Designer': ['Color Theory', 'Typography', 'Figma Basics', 'Wireframing', 'Interactive Prototyping', 'User Flows', 'User Research', 'Design Systems']
};

// Skill difficulty classifications (fallback)
const skillDifficulties = {
  // Beginner
  'HTML': 'Beginner', 'CSS': 'Beginner', 'JavaScript': 'Beginner', 'Python': 'Beginner', 'Math/Statistics': 'Beginner', 
  'NumPy': 'Beginner', 'SQL': 'Beginner', 'Excel': 'Beginner', 'Statistics': 'Beginner', 'Networking Basics': 'Beginner',
  'Linux': 'Beginner', 'UI Design Basics': 'Beginner', 'React Basics': 'Beginner', 'C#': 'Beginner', 'Game Design Basics': 'Beginner',
  '2D Math': 'Beginner', 'Cryptography Basics': 'Beginner', 'Blockchain Concepts': 'Beginner', 'Color Theory': 'Beginner',
  'Typography': 'Beginner', 'Figma Basics': 'Beginner', 'Git': 'Beginner',
  
  // Intermediate
  'React': 'Intermediate', 'Node.js': 'Intermediate', 'REST APIs': 'Intermediate', 'Databases': 'Intermediate',
  'Pandas': 'Intermediate', 'Scikit-learn': 'Intermediate', 'Data Visualization': 'Intermediate', 'Matplotlib': 'Intermediate',
  'Power BI': 'Intermediate', 'Data Cleaning': 'Intermediate', 'Ethical Hacking': 'Intermediate', 'OWASP': 'Intermediate',
  'Cryptography': 'Intermediate', 'React Native': 'Intermediate', 'Flutter': 'Intermediate', 'Firebase': 'Intermediate',
  'AWS / Azure': 'Intermediate', 'Docker': 'Intermediate', 'CI/CD Basics': 'Intermediate', 'Unity Engine': 'Intermediate',
  'Physics Engines': 'Intermediate', 'Animation Systems': 'Intermediate', 'Solidity': 'Intermediate', 'Smart Contracts': 'Intermediate',
  'Ethereum / Hardhat': 'Intermediate', 'Wireframing': 'Intermediate', 'Interactive Prototyping': 'Intermediate', 'User Flows': 'Intermediate',
  
  // Advanced
  'TypeScript': 'Advanced', 'Next.js': 'Advanced', 'CI/CD': 'Advanced', 'System Design': 'Advanced',
  'TensorFlow': 'Advanced', 'PyTorch': 'Advanced', 'Deep Learning': 'Advanced', 'NLP': 'Advanced', 'Computer Vision': 'Advanced',
  'Machine Learning': 'Advanced', 'Big Data': 'Advanced', 'A/B Testing': 'Advanced', 'Penetration Testing': 'Advanced',
  'Malware Analysis': 'Advanced', 'SOC Operations': 'Advanced', 'Cloud Security': 'Advanced', 'Native (Swift/Kotlin)': 'Advanced',
  'State Management': 'Advanced', 'App Store Deployment': 'Advanced', 'Performance Optimization': 'Advanced', 'Kubernetes': 'Advanced',
  'Terraform': 'Advanced', 'System Architecture': 'Advanced', 'Site Reliability': 'Advanced', 'Unreal Engine': 'Advanced',
  'C++': 'Advanced', 'Multiplayer Networking': 'Advanced', 'Graphics Programming': 'Advanced', 'DeFi Protocols': 'Advanced',
  'Web3.js / Ethers.js': 'Advanced', 'Smart Contract Auditing': 'Advanced', 'User Research': 'Advanced', 'Design Systems': 'Advanced',
  'Micro-animations': 'Advanced'
};

export default function SkillGap() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'SET_STEP', payload: 4 });
  }, [dispatch]);

  // Initial state bindings
  const [selectedDomain, setSelectedDomain] = useState(state.selectedDomain || domains[0]);
  const [selectedRole, setSelectedRole] = useState(
    (state.selectedDomain || domains[0]).careers[0]
  );
  const [tempSkills, setTempSkills] = useState(state.profile.skills || []);
  const [skillInput, setSkillInput] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sync selectedRole if selectedDomain changes
  const handleDomainChange = (domainId) => {
    const nextDomain = domains.find(d => d.id === domainId) || domains[0];
    setSelectedDomain(nextDomain);
    setSelectedRole(nextDomain.careers[0]);
  };

  // Add/Remove local skills
  const addSkill = (skill) => {
    const cleanSkill = skill.trim();
    if (cleanSkill && !tempSkills.some(s => s.toLowerCase() === cleanSkill.toLowerCase())) {
      setTempSkills([...tempSkills, cleanSkill]);
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove) => {
    setTempSkills(tempSkills.filter(s => s !== skillToRemove));
  };

  // Resolve target skills for selected role
  const targetKey = `${selectedDomain.id}_${selectedRole.role}`;
  const requiredSkills = roleSkills[targetKey] || selectedDomain.skills || [];

  // Match / Missing calculations
  const matchedSkills = requiredSkills.filter(reqSkill =>
    tempSkills.some(userSkill => userSkill.toLowerCase() === reqSkill.toLowerCase())
  );

  const missingSkills = requiredSkills.filter(reqSkill =>
    !matchedSkills.some(match => match.toLowerCase() === reqSkill.toLowerCase())
  );

  const completionPercentage = requiredSkills.length > 0 
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100) 
    : 0;

  // Recommendations (up to 4 missing target skills)
  const recommendations = missingSkills.slice(0, 4);

  // Group missing skills by difficulty
  const getDifficulty = (skill) => {
    // Check local lookup dictionary first
    if (skillDifficulties[skill]) return skillDifficulties[skill];
    // Check selected domain's categorizations as fallback
    if (selectedDomain.beginnerSkills.includes(skill)) return 'Beginner';
    if (selectedDomain.intermediateSkills.includes(skill)) return 'Intermediate';
    if (selectedDomain.advancedSkills.includes(skill)) return 'Advanced';
    return 'Intermediate';
  };

  const missingBeginner = missingSkills.filter(s => getDifficulty(s) === 'Beginner');
  const missingIntermediate = missingSkills.filter(s => getDifficulty(s) === 'Intermediate');
  const missingAdvanced = missingSkills.filter(s => getDifficulty(s) === 'Advanced');

  // Save changes to profile state
  const handleSaveToProfile = () => {
    dispatch({ type: 'SET_PROFILE', payload: { skills: tempSkills } });
    dispatch({ type: 'SET_DOMAIN', payload: selectedDomain });
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 3000);
  };

  return (
    <div className="skillgap-container">
      {/* Toast Notification */}
      <div className={`toast-notification glass-panel ${showSavedToast ? 'show' : ''}`}>
        <span className="toast-icon">💾</span>
        <span className="toast-message">Skills successfully saved to your profile!</span>
      </div>

      <div className="skillgap-header fade-in-up">
        <h1 className="gradient-text">Skill Gap Analyzer</h1>
        <p className="subtitle">Pick a target role, type in your skills, and see what you need to master next.</p>
      </div>

      {/* Target Selector Grid */}
      <div className="role-selector-panel glass-panel fade-in-up" style={{ animationDelay: '0.05s' }}>
        <div className="selector-group">
          <label htmlFor="domain-select">🎯 Career Domain</label>
          <select 
            id="domain-select" 
            value={selectedDomain.id} 
            onChange={(e) => handleDomainChange(e.target.value)}
            className="styled-select"
          >
            {domains.map(d => (
              <option key={d.id} value={d.id}>{d.icon} {d.name}</option>
            ))}
          </select>
        </div>

        <div className="selector-group">
          <label htmlFor="role-select">💼 Target Role</label>
          <select 
            id="role-select" 
            value={selectedRole.role} 
            onChange={(e) => setSelectedRole(selectedDomain.careers.find(c => c.role === e.target.value) || selectedDomain.careers[0])}
            className="styled-select"
          >
            {selectedDomain.careers.map((c, i) => (
              <option key={i} value={c.role}>{c.role} ({c.salary})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="analysis-dashboard">
        {/* Left Side: Score & Actions */}
        <div className="overview-card glass-panel fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2>Readiness for {selectedRole.role}</h2>
          <div className="score-circle">
            <div className="circle-wrap">
              <div className="circle" style={{
                background: `conic-gradient(var(--${selectedDomain.color}-500) ${completionPercentage}%, var(--surface-light) 0)`
              }}>
                <div className="inner-circle">{completionPercentage}%</div>
              </div>
            </div>
          </div>
          <p className="score-text">
            {completionPercentage < 35 ? "You're at the beginning of this path. Focus on core beginner skills!" :
             completionPercentage < 75 ? "You have a solid base! Learn intermediate details to unlock roles." :
             "Excellent preparation! You are ready to start applying for jobs."}
          </p>

          <div className="action-buttons-group">
            <button className="primary-btn save-btn" onClick={handleSaveToProfile}>
              Save to Profile
            </button>
            <button className="secondary-btn roadmap-btn" onClick={() => navigate('/roadmap')}>
              View Roadmap
            </button>
          </div>
        </div>

        {/* Right Side: Skill Editor & Gap Results */}
        <div className="skills-breakdown fade-in-up" style={{ animationDelay: '0.2s' }}>
          
          {/* Dynamic Skill Input */}
          <div className="skills-section add-skills-card glass-panel">
            <h3><span className="icon">✍️</span> Type Your Skills</h3>
            <p className="section-description">Add new skills to your profile instantly and watch your score adjust.</p>
            
            <div className="tag-input-container">
              <input 
                type="text" 
                placeholder="Type a skill (e.g. Docker, Python, HTML) and press Enter..." 
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                className="skill-textbox"
              />
              <button className="add-tag-btn" onClick={() => addSkill(skillInput)}>Add</button>
            </div>

            {/* Quick Suggestions */}
            {recommendations.length > 0 && (
              <div className="quick-suggestions">
                <span className="suggestion-label">Recommended for {selectedRole.role}:</span>
                <div className="suggestion-tags">
                  {recommendations.map((skill, idx) => (
                    <button 
                      key={idx} 
                      className="suggested-tag"
                      onClick={() => addSkill(skill)}
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Current Skills Tags */}
          <div className="skills-section have-skills glass-panel">
            <h3><span className="icon">✅</span> Your Skills ({tempSkills.length})</h3>
            {tempSkills.length > 0 ? (
              <div className="tags-container">
                {tempSkills.map((skill, idx) => (
                  <span key={idx} className="skill-tag filled" style={{ borderColor: `var(--${selectedDomain.color}-500)`, color: `var(--${selectedDomain.color}-300)` }}>
                    {skill}
                    <button className="delete-tag-btn" onClick={() => removeSkill(skill)}>×</button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="empty-state">No skills listed yet. Type some skills above to see your score rise!</p>
            )}
          </div>

          {/* Skill Gap breakdown */}
          <div className="skills-section need-skills glass-panel">
            <h3><span className="icon">🎯</span> Skills to Learn for {selectedRole.role}</h3>
            {missingSkills.length === 0 ? (
              <div className="completed-all-state">
                <span className="check-all-icon">🏆</span>
                <p>Wow! You have all the recommended skills for a {selectedRole.role} role!</p>
              </div>
            ) : (
              <div className="skills-categories">
                {missingBeginner.length > 0 && (
                  <div className="skill-category">
                    <h4>Beginner Gap</h4>
                    <div className="tags-container">
                      {missingBeginner.map((skill, idx) => (
                        <span key={idx} className="skill-tag outline gap-tag" onClick={() => addSkill(skill)} title="Click to add">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {missingIntermediate.length > 0 && (
                  <div className="skill-category">
                    <h4>Intermediate Gap</h4>
                    <div className="tags-container">
                      {missingIntermediate.map((skill, idx) => (
                        <span key={idx} className="skill-tag outline gap-tag" onClick={() => addSkill(skill)} title="Click to add">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {missingAdvanced.length > 0 && (
                  <div className="skill-category">
                    <h4>Advanced Gap</h4>
                    <div className="tags-container">
                      {missingAdvanced.map((skill, idx) => (
                        <span key={idx} className="skill-tag outline gap-tag" onClick={() => addSkill(skill)} title="Click to add">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="skillgap-footer center-content fade-in-up" style={{ animationDelay: '0.25s' }}>
        <button className="primary-btn explore-btn" onClick={() => navigate('/internships')}>
          Explore {selectedDomain.name} Opportunities
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
