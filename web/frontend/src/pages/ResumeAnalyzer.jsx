import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  UploadCloud,
  Check,
  AlertCircle,
  X,
  CheckCircle2,
  Target,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAppState } from '../store/AppContext';
import domains from '../data/domains';
import './ResumeAnalyzer.css';

// Keyword dictionary for client-side deterministic analysis
const SKILL_KEYWORDS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'html', 'css',
  'react', 'next.js', 'vue', 'angular', 'node.js', 'express', 'django', 'flask',
  'sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'firebase', 'aws', 'azure',
  'gcp', 'docker', 'kubernetes', 'git', 'linux', 'ci/cd', 'rest api', 'graphql',
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'pandas', 'numpy',
  'scikit-learn', 'data analysis', 'power bi', 'tableau', 'cybersecurity',
  'penetration testing', 'networking', 'figma', 'ui/ux', 'agile', 'scrum',
  'flutter', 'react native', 'solidity', 'blockchain', 'tailwind', 'bootstrap'
];

const ACTION_VERBS = [
  'developed', 'built', 'created', 'designed', 'implemented', 'optimized',
  'engineered', 'led', 'architected', 'spearheaded', 'automated', 'deployed',
  'enhanced', 'integrated', 'reduced', 'improved', 'increased', 'managed'
];

export default function ResumeAnalyzer() {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  function handleFileChange(selectedFile) {
    setError('');
    if (!selectedFile) return;

    // Validate size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File is too large. Please upload a resume under 5MB.');
      return;
    }

    const validExtensions = ['.pdf', '.txt', '.doc', '.docx'];
    const fileName = selectedFile.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      setError('Please upload a valid PDF, DOCX, or TXT file.');
      return;
    }

    setFile(selectedFile);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }

  // Deterministic safe text analysis
  async function analyzeResume() {
    if (!file) {
      setError('Please select a resume file first.');
      return;
    }

    setAnalyzing(true);
    setError('');

    try {
      let rawText = '';

      // Read text from file
      if (file.name.endsWith('.txt')) {
        rawText = await file.text();
      } else {
        // Read raw buffer and extract ASCII printable character sequences
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        let extracted = '';
        for (let i = 0; i < uint8Array.length; i++) {
          const byte = uint8Array[i];
          if ((byte >= 32 && byte <= 126) || byte === 10 || byte === 13) {
            extracted += String.fromCharCode(byte);
          }
        }
        rawText = extracted;
      }

      const lowerText = rawText.toLowerCase();

      // 1. Detected Skills
      const detectedSkills = SKILL_KEYWORDS.filter(skill => {
        const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(lowerText);
      });

      // Capitalize detected skills for clean UI display
      const formattedSkills = detectedSkills.map(s =>
        s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      );

      // 2. Section Checks
      const hasEducation = /education|degree|b\.tech|bachelor|master|university|college|gpa|cgpa/i.test(lowerText);
      const hasProjects = /project|built|developed|application|repository|github/i.test(lowerText);
      const hasExperience = /experience|work|intern|employment|company|role/i.test(lowerText);
      const hasCertifications = /certification|certified|course|coursera|udemy|license/i.test(lowerText);
      const hasContact = /email|phone|linkedin|github|portfolio|@/i.test(lowerText);

      // 3. Action Verbs & Metrics Check
      const detectedVerbs = ACTION_VERBS.filter(verb => lowerText.includes(verb));
      const hasQuantifiableMetrics = /\d+%\s*|\$\d+|\d+\s*users|\d+\s*ms|\d+\s*x/i.test(lowerText);

      // 4. Calculate ATS Resume Score (0 - 100)
      let score = 30; // base score for uploading
      if (formattedSkills.length >= 8) score += 25;
      else if (formattedSkills.length >= 4) score += 15;
      else if (formattedSkills.length > 0) score += 8;

      if (hasEducation) score += 10;
      if (hasProjects) score += 12;
      if (hasExperience) score += 10;
      if (hasCertifications) score += 5;
      if (hasContact) score += 4;
      if (detectedVerbs.length >= 4) score += 4;

      score = Math.min(score, 96); // Cap deterministic max at 96

      // 5. Strengths
      const strengths = [];
      if (formattedSkills.length >= 5) strengths.push(`Strong technical skillset detected (${formattedSkills.length} key skills).`);
      if (hasProjects) strengths.push('Clear projects / application development section detected.');
      if (hasEducation) strengths.push('Education background and academic credentials present.');
      if (detectedVerbs.length >= 3) strengths.push('Good usage of proactive action verbs (e.g. built, engineered).');
      if (hasQuantifiableMetrics) strengths.push('Included impact-driven metrics or numerical achievements.');

      // 6. Improvement Suggestions
      const suggestions = [];
      if (formattedSkills.length < 5) suggestions.push('Add more specific technical tools, frameworks, and databases.');
      if (!hasCertifications) suggestions.push('Include relevant online certifications (AWS, Meta, Coursera, Google).');
      if (!hasQuantifiableMetrics) suggestions.push('Quantify your results (e.g. "Improved loading speed by 35%").');
      if (!hasExperience) suggestions.push('Add an Internship, Open-Source, or Freelance section.');

      // 7. Recommended Domains based on detected skills
      const domainRankings = domains.map(domain => {
        const matching = domain.skills.filter(reqSkill =>
          detectedSkills.some(ds => ds.toLowerCase() === reqSkill.toLowerCase())
        );
        const matchPct = Math.round((matching.length / domain.skills.length) * 100);
        return { domain, matchPct, matchingSkills: matching };
      }).sort((a, b) => b.matchPct - a.matchPct);

      // Simulated analysis delay for smooth UX
      setTimeout(() => {
        setAnalysisResult({
          fileName: file.name,
          fileSize: (file.size / 1024).toFixed(1) + ' KB',
          score,
          skills: formattedSkills,
          strengths,
          suggestions,
          recommendedDomains: domainRankings.slice(0, 3),
          hasEducation,
          hasProjects,
          hasExperience,
          hasCertifications
        });
        setAnalyzing(false);
      }, 1200);

    } catch (err) {
      console.error('Resume Parse Error:', err);
      setError('Unable to analyze resume. Please try uploading a plain text or PDF format.');
      setAnalyzing(false);
    }
  }

  // Import detected skills into user profile
  function handleImportSkills() {
    if (!analysisResult?.skills?.length) return;
    const existing = state.profile?.skills || [];
    const combined = [...new Set([...existing, ...analysisResult.skills])];
    dispatch({ type: 'SET_PROFILE', payload: { skills: combined } });
    navigate('/profile');
  }

  return (
    <div className="page page-enter">
      <section className="resume-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <FileText size={13} /> ATS Scanner
            </span>
            <h2 style={{ marginTop: '16px' }}>
              Resume <span className="gradient-text">Analyzer</span>
            </h2>
            <p>Upload your resume to check ATS keyword readiness, score strengths, and discover ideal tech roles.</p>
          </div>

          {/* Upload Area */}
          <div className="glass-card resume-upload-card">
            <div
              className={`dropzone ${dragActive ? 'active' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('resume-file-input').click()}
            >
              <input
                id="resume-file-input"
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={(e) => handleFileChange(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <div className="dropzone-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                <UploadCloud size={36} color="var(--accent-primary)" />
              </div>
              <h3>{file ? file.name : 'Click or Drag & Drop your Resume'}</h3>
              <p className="dropzone-hint">Supports PDF, DOCX, TXT (Max 5MB)</p>
              {file && (
                <span className="badge badge-teal" style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Check size={12} /> {(file.size / 1024).toFixed(1)} KB Ready to scan
                </span>
              )}
            </div>

            {error && (
              <div className="resume-error-msg" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div className="upload-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={analyzeResume}
                disabled={!file || analyzing}
              >
                {analyzing ? 'Scanning & Scoring...' : 'Analyze Resume Now'}
              </button>
            </div>
          </div>

          {/* Processing Spinner */}
          {analyzing && (
            <div className="analyzing-box glass-card">
              <div className="loading-spinner"></div>
              <h3>Extracting resume sections & keywords...</h3>
              <p>Evaluating ATS compatibility, skill depth, and domain matches.</p>
            </div>
          )}

          {/* Results Display */}
          {analysisResult && !analyzing && (
            <div className="resume-results-container fade-in-up">
              {/* Score & Overview */}
              <div className="glass-card results-overview-card">
                <div className="score-badge-circle">
                  <div className="score-number gradient-text">{analysisResult.score}</div>
                  <span className="score-label">ATS Score / 100</span>
                </div>
                <div className="overview-summary">
                  <h3>
                    Resume Health:{' '}
                    <span className={analysisResult.score >= 75 ? 'text-teal' : analysisResult.score >= 50 ? 'text-cyan' : 'text-rose'}>
                      {analysisResult.score >= 75 ? 'Excellent' : analysisResult.score >= 50 ? 'Competitive' : 'Needs Optimization'}
                    </span>
                  </h3>
                  <p>
                    Scanned <strong>{analysisResult.fileName}</strong> ({analysisResult.fileSize}). Found{' '}
                    <strong>{analysisResult.skills.length} technical skills</strong> across core categories.
                  </p>
                  <div className="section-pills">
                    <span className={`badge ${analysisResult.hasEducation ? 'badge-teal' : 'badge-rose'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {analysisResult.hasEducation ? <Check size={12} /> : <X size={12} />} Education
                    </span>
                    <span className={`badge ${analysisResult.hasProjects ? 'badge-teal' : 'badge-rose'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {analysisResult.hasProjects ? <Check size={12} /> : <X size={12} />} Projects
                    </span>
                    <span className={`badge ${analysisResult.hasExperience ? 'badge-teal' : 'badge-rose'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {analysisResult.hasExperience ? <Check size={12} /> : <X size={12} />} Experience
                    </span>
                    <span className={`badge ${analysisResult.hasCertifications ? 'badge-teal' : 'badge-rose'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {analysisResult.hasCertifications ? <Check size={12} /> : <X size={12} />} Certifications
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills & Recommended Domains */}
              <div className="results-grid">
                {/* Detected Skills */}
                <div className="glass-card result-subcard">
                  <div className="card-heading">
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle2 size={15} color="var(--accent-primary)" /> Detected Skills ({analysisResult.skills.length})
                    </h4>
                    {analysisResult.skills.length > 0 && (
                      <button className="btn btn-secondary btn-sm" onClick={handleImportSkills}>
                        + Add to Profile
                      </button>
                    )}
                  </div>
                  {analysisResult.skills.length > 0 ? (
                    <div className="detected-skills-chips">
                      {analysisResult.skills.map((skill, i) => (
                        <span className="tag" key={i}>{skill}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-hint">No common technical keywords identified. Try adding explicit skills.</p>
                  )}
                </div>

                {/* Recommended Career Roles */}
                <div className="glass-card result-subcard">
                  <div className="card-heading">
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Target size={15} color="var(--accent-cyan)" /> Recommended Career Domains
                    </h4>
                  </div>
                  <div className="recommended-domains-list">
                    {analysisResult.recommendedDomains.map((rec, i) => (
                      <div className="domain-rec-row" key={i}>
                        <div className="domain-rec-info">
                          <span className="rec-icon" style={{ display: 'flex', alignItems: 'center' }}>
                            <Layers size={18} color="var(--accent-primary)" />
                          </span>
                          <div>
                            <strong>{rec.domain.name}</strong>
                            <p className="rec-sub">{rec.matchingSkills.length} matching skills</p>
                          </div>
                        </div>
                        <span className="badge badge-teal">{rec.matchPct}% Match</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="results-grid">
                {/* Strengths */}
                <div className="glass-card result-subcard">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={15} color="var(--accent-teal)" /> Strengths Identified
                  </h4>
                  <ul className="feedback-list">
                    {analysisResult.strengths.map((st, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Check size={13} color="var(--accent-teal)" /> {st}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="glass-card result-subcard">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Sparkles size={15} color="var(--accent-cyan)" /> Actionable Improvements
                  </h4>
                  <ul className="feedback-list">
                    {analysisResult.suggestions.map((sg, i) => (
                      <li key={i}><span className="bullet-rose">•</span> {sg}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
