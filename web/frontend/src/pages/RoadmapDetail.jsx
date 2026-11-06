import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Clock,
  BookOpen,
  Flag,
  Hammer,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code2,
  Cpu,
  Cloud,
  BarChart3,
  Palette,
  Headset,
  Briefcase,
  Landmark,
  PenLine,
  Layers
} from 'lucide-react';
import { getRoadmapBySlug, ROADMAPS_DATA } from '../data/all-roadmaps';
import './RoadmapDetail.css';

function getCategoryIcon(category, size = 26) {
  switch (category) {
    case 'Engineering':
      return <Code2 size={size} />;
    case 'Computer Science':
      return <Cpu size={size} />;
    case 'Cloud & DevOps':
      return <Cloud size={size} />;
    case 'Languages':
      return <BookOpen size={size} />;
    case 'Data':
      return <BarChart3 size={size} />;
    case 'Design':
      return <Palette size={size} />;
    case 'Support':
      return <Headset size={size} />;
    case 'Business':
      return <Briefcase size={size} />;
    case 'Finance':
      return <Landmark size={size} />;
    case 'Non-technical':
      return <PenLine size={size} />;
    default:
      return <Layers size={size} />;
  }
}

function checkIsBookmarked(slug) {
  try {
    const saved = localStorage.getItem('careercaffe_bookmarked_roadmaps');
    return saved ? JSON.parse(saved).includes(slug) : false;
  } catch {
    return false;
  }
}

function getSavedProgress(slug) {
  try {
    const saved = localStorage.getItem('careercaffe_roadmap_progress');
    return saved ? (JSON.parse(saved)[slug] || []) : [];
  } catch {
    return [];
  }
}

export default function RoadmapDetail() {
  const { slug } = useParams();
  const roadmap = getRoadmapBySlug(slug);

  const [isBookmarked, setIsBookmarked] = useState(() => checkIsBookmarked(slug));
  const [completedStages, setCompletedStages] = useState(() => getSavedProgress(slug));
  const [copied, setCopied] = useState(false);
  const [expandedCurriculums, setExpandedCurriculums] = useState({});

  // When slug changes, sync bookmark & progress state
  const currentSlug = roadmap ? roadmap.slug : '';
  const [lastSlug, setLastSlug] = useState(currentSlug);
  if (currentSlug !== lastSlug) {
    setLastSlug(currentSlug);
    setIsBookmarked(checkIsBookmarked(currentSlug));
    setCompletedStages(getSavedProgress(currentSlug));
  }

  // Toggle bookmark
  const toggleBookmark = () => {
    if (!roadmap) return;
    try {
      const saved = localStorage.getItem('careercaffe_bookmarked_roadmaps');
      const list = saved ? JSON.parse(saved) : [];
      let updated;
      if (list.includes(roadmap.slug)) {
        updated = list.filter(s => s !== roadmap.slug);
        setIsBookmarked(false);
      } else {
        updated = [...list, roadmap.slug];
        setIsBookmarked(true);
      }
      localStorage.setItem('careercaffe_bookmarked_roadmaps', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle stage completion
  const toggleStage = (stageNum) => {
    if (!roadmap) return;
    const isDone = completedStages.includes(stageNum);
    const updated = isDone
      ? completedStages.filter(s => s !== stageNum)
      : [...completedStages, stageNum];
    
    setCompletedStages(updated);
    try {
      const saved = localStorage.getItem('careercaffe_roadmap_progress');
      const progressMap = saved ? JSON.parse(saved) : {};
      progressMap[roadmap.slug] = updated;
      localStorage.setItem('careercaffe_roadmap_progress', JSON.stringify(progressMap));
    } catch (e) {
      console.error(e);
    }
  };

  // Share link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Toggle curriculum accordion
  const toggleCurriculum = (stageNum) => {
    setExpandedCurriculums(prev => ({
      ...prev,
      [stageNum]: !prev[stageNum]
    }));
  };

  // Determine related roadmaps to show
  const relatedItems = useMemo(() => {
    if (!roadmap) return [];
    if (roadmap.related && roadmap.related.length > 0) {
      return roadmap.related.map(r => {
        const full = getRoadmapBySlug(r.slug);
        return full || {
          slug: r.slug,
          title: r.title,
          description: 'Comprehensive guided track for career mastery.',
          stages: [{}]
        };
      });
    }
    // Fallback: 4 other roadmaps from the same category
    return ROADMAPS_DATA
      .filter(r => r.category === roadmap.category && r.slug !== roadmap.slug)
      .slice(0, 4);
  }, [roadmap]);

  // If roadmap not found
  if (!roadmap) {
    return (
      <div className="roadmap-detail-page roadmap-not-found">
        <h2>Roadmap Not Found</h2>
        <p>The roadmap "{slug}" could not be found or has moved.</p>
        <Link to="/roadmaps" className="back-to-roadmaps-btn">
          Explore all 98 roadmaps
        </Link>
      </div>
    );
  }

  const stages = roadmap.stages || [];
  const totalStages = stages.length;
  const completedCount = completedStages.length;
  const progressPercent = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;

  return (
    <div className="roadmap-detail-page">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="roadmap-breadcrumb">
        <Link to="/roadmaps" className="breadcrumb-link">
          Roadmaps
        </Link>
        <ChevronRight size={14} className="breadcrumb-separator" />
        <span className="breadcrumb-current">{roadmap.title}</span>
      </nav>

      {/* Header section matching CareerCaffe */}
      <header className="detail-header-wrap">
        <div className="detail-icon-box" aria-hidden="true">
          {getCategoryIcon(roadmap.category, 28)}
        </div>
        <div className="detail-header-text">
          <h1 className="detail-h1">{roadmap.title} roadmap</h1>
          <p className="detail-subtitle">{roadmap.subtitle}</p>
        </div>
      </header>

      {/* Description & Roles */}
      <p className="detail-desc">{roadmap.description}</p>
      {roadmap.roles && roadmap.roles.length > 0 && (
        <p className="detail-roles">
          Leads to roles such as <span className="detail-roles-list">{roadmap.roles.join(', ')}</span>.
        </p>
      )}

      {/* Action Buttons: Share & Bookmark */}
      <div className="detail-actions-bar">
        <button
          type="button"
          className="action-btn"
          onClick={handleShare}
          aria-label="Share roadmap"
        >
          {copied ? <Check size={16} color="#38bdf8" /> : <Share2 size={16} />}
          <span>{copied ? 'Link copied!' : 'Share'}</span>
        </button>

        <button
          type="button"
          className={`action-btn ${isBookmarked ? 'active' : ''}`}
          onClick={toggleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark roadmap'}
        >
          <Bookmark size={16} fill={isBookmarked ? '#f59e0b' : 'none'} color={isBookmarked ? '#f59e0b' : 'currentColor'} />
          <span>{isBookmarked ? 'Bookmarked' : 'Save bookmark'}</span>
        </button>
      </div>

      {/* Progress Tracker Card */}
      <div className="detail-progress-card">
        <div className="detail-progress-header">
          <span className="detail-progress-title">
            <CheckCircle2 size={18} color="#38bdf8" />
            Your Progress: {completedCount} of {totalStages} stages completed
          </span>
          <span className="detail-progress-percent">{progressPercent}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin="0"
          aria-valuemax="100"
          className="detail-progress-track"
        >
          <div className="detail-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Callout Banner matching CareerCaffe */}
      <div className="detail-signup-banner">
        <p className="banner-text">
          Create a free account to open the lessons and videos, tick off stages, save this roadmap and track your progress.
        </p>
        <div className="banner-btns">
          <Link to={`/login?next=/roadmaps/${roadmap.slug}`} className="banner-btn-secondary">
            Log in
          </Link>
          <Link to="/signup" className="banner-btn-primary">
            Sign up free
          </Link>
        </div>
      </div>

      {/* The Stages List */}
      <h2 className="stages-section-title">The stages</h2>
      <ol className="stages-list">
        {stages.map((stageItem) => {
          const stageNum = stageItem.stage;
          const isDone = completedStages.includes(stageNum);
          const isExpanded = !!expandedCurriculums[stageNum];

          return (
            <li
              key={stageNum}
              className={`stage-card ${isDone ? 'stage-completed' : ''}`}
            >
              <div className="stage-card-header">
                <span className="stage-number-pill" aria-hidden="true">
                  {isDone ? <Check size={18} /> : stageNum}
                </span>
                <div className="stage-header-content">
                  <h3 className="stage-title">
                    Stage {stageNum}: {stageItem.title}
                  </h3>
                  <p className="stage-desc">{stageItem.description}</p>

                  <div className="stage-meta">
                    <span className="stage-meta-item">
                      <Clock size={14} /> about {stageItem.weeks || 2} weeks
                    </span>
                    <span className="stage-meta-item">
                      <BookOpen size={14} /> {stageItem.lessons || 5} lessons and videos inside
                    </span>
                  </div>

                  {/* Interactive Completion Toggle */}
                  <div
                    className={`stage-check-toggle ${isDone ? 'checked' : ''}`}
                    onClick={() => toggleStage(stageNum)}
                    role="checkbox"
                    aria-checked={isDone}
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleStage(stageNum);
                      }
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>{isDone ? 'Stage completed!' : 'Mark stage as completed'}</span>
                  </div>
                </div>
              </div>

              {/* Outcomes: "You will be able to" */}
              {stageItem.outcomes && stageItem.outcomes.length > 0 && (
                <div className="stage-section-block">
                  <p className="stage-section-title">
                    <Flag size={16} /> You will be able to
                  </p>
                  <ul className="stage-outcomes-list">
                    {stageItem.outcomes.map((outcome, oIdx) => (
                      <li key={oIdx}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project Brief */}
              {stageItem.project && (
                <div className="stage-section-block">
                  <p className="stage-section-title">
                    <Hammer size={16} /> Project
                  </p>
                  <p className="stage-project-text">{stageItem.project}</p>
                </div>
              )}

              {/* Curriculum Lessons Expandable */}
              <div className="stage-curriculum-wrap">
                <button
                  type="button"
                  className="curriculum-toggle-btn"
                  onClick={() => toggleCurriculum(stageNum)}
                >
                  {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  <span>{isExpanded ? 'Hide stage curriculum & resources' : `View ${stageItem.lessons || 5} lessons and resources`}</span>
                </button>

                {isExpanded && (
                  <div className="curriculum-box">
                    <div className="curriculum-item">
                      <span>1. Core fundamentals & syntax concepts</span>
                      <a href="https://careercaffe.in/resources" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                        Lessons <ExternalLink size={12} />
                      </a>
                    </div>
                    <div className="curriculum-item">
                      <span>2. Architecture patterns & best practices</span>
                      <a href="https://careercaffe.in/resources" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                        Video <ExternalLink size={12} />
                      </a>
                    </div>
                    <div className="curriculum-item">
                      <span>3. Hands-on coding lab & milestone checklist</span>
                      <a href="https://careercaffe.in/resources" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                        Lab <ExternalLink size={12} />
                      </a>
                    </div>
                    <div className="curriculum-item">
                      <span>4. Production debugging & testing exercise</span>
                      <a href="https://careercaffe.in/resources" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                        Exercise <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* More Roadmaps to Explore */}
      {relatedItems.length > 0 && (
        <section className="related-roadmaps-section" aria-label="Related roadmaps">
          <h2 className="related-roadmaps-title">More roadmaps to explore</h2>
          <div className="related-roadmaps-grid">
            {relatedItems.map(item => (
              <Link
                key={item.slug}
                to={`/roadmaps/${item.slug}`}
                className="related-roadmap-card"
              >
                <h4 className="related-roadmap-title">{item.title}</h4>
                <p className="related-roadmap-desc">{item.description}</p>
                <span className="related-roadmap-meta">
                  View roadmap <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
