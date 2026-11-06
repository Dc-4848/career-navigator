import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  Bookmark,
  Code2,
  Cpu,
  Cloud,
  BookOpen,
  BarChart3,
  Palette,
  Headset,
  Briefcase,
  Landmark,
  PenLine,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { ROADMAPS_DATA, ROADMAP_CATEGORIES } from '../data/all-roadmaps';
import './RoadmapsList.css';

// Helper to safely load localStorage
function getInitialBookmarks() {
  try {
    const saved = localStorage.getItem('careercaffe_bookmarked_roadmaps');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function getInitialProgress() {
  try {
    const saved = localStorage.getItem('careercaffe_roadmap_progress');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

// Map categories to appropriate icons
function getCategoryIcon(category, size = 20) {
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

export default function RoadmapsList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState(getInitialBookmarks);
  const [progressState] = useState(getInitialProgress);

  // Toggle bookmark
  const toggleBookmark = (slug, e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedSlugs(prev => {
      const updated = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem('careercaffe_bookmarked_roadmaps', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Filter roadmaps
  const filteredRoadmaps = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ROADMAPS_DATA.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Bookmark filter
      if (showOnlyBookmarked && !bookmarkedSlugs.includes(item.slug)) {
        return false;
      }

      // Search query
      if (q) {
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.description.toLowerCase().includes(q);
        const catMatch = item.category.toLowerCase().includes(q);
        const rolesMatch = (item.roles || []).some(r => r.toLowerCase().includes(q));
        if (!titleMatch && !descMatch && !catMatch && !rolesMatch) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery, showOnlyBookmarked, bookmarkedSlugs]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setShowOnlyBookmarked(false);
  };

  return (
    <div className="roadmaps-page">
      {/* Hero Section matching CareerCaffe */}
      <div className="roadmaps-hero">
        <h1 className="roadmaps-title">Roadmaps</h1>
        <p className="roadmaps-subtitle">
          98 tracks. Each one is a short, ordered list of stages with the resources for that stage and a project to prove it.
        </p>
      </div>

      {/* Controls: Search & Category Pills */}
      <div className="roadmaps-controls">
        <div className="roadmaps-search-wrap">
          <Search className="roadmaps-search-icon" size={18} />
          <input
            type="text"
            className="roadmaps-search-input"
            placeholder="Search roadmaps, e.g. react, data, design"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search roadmaps"
          />
          {searchQuery && (
            <button
              className="roadmaps-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="roadmaps-categories" role="group" aria-label="Roadmap categories">
          {ROADMAP_CATEGORIES.map(cat => {
            const isActive = selectedCategory === (cat.id === 'all' ? 'all' : cat.name);
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id === 'all' ? 'all' : cat.name)}
                aria-pressed={isActive}
              >
                <span>{cat.name}</span>
                <span className="category-count">{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Meta & Bookmarks filter */}
        <div className="roadmaps-filter-meta">
          <span>
            Showing {filteredRoadmaps.length} of {ROADMAPS_DATA.length} roadmaps
          </span>
          <button
            type="button"
            className={`bookmark-filter-btn ${showOnlyBookmarked ? 'active' : ''}`}
            onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
          >
            <Bookmark size={14} fill={showOnlyBookmarked ? '#f59e0b' : 'none'} />
            <span>Bookmarked ({bookmarkedSlugs.length})</span>
          </button>
        </div>
      </div>

      {/* Roadmaps Grid */}
      {filteredRoadmaps.length > 0 ? (
        <div className="roadmaps-grid">
          {filteredRoadmaps.map(item => {
            const isBookmarked = bookmarkedSlugs.includes(item.slug);
            const completedStages = progressState[item.slug] || [];
            const totalStages = item.stages ? item.stages.length : 8;
            const completedCount = completedStages.length;
            const progressPercent = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0;

            let statusText = `Not started · ${totalStages} stages`;
            let ctaText = 'Start';
            if (progressPercent === 100) {
              statusText = `Completed · ${totalStages} stages`;
              ctaText = 'Review';
            } else if (progressPercent > 0) {
              statusText = `${progressPercent}% completed · ${completedCount}/${totalStages} stages`;
              ctaText = 'Continue';
            }

            return (
              <article key={item.slug} className="roadmap-card">
                <div className="card-top">
                  <div className="card-icon-wrap" aria-hidden="true">
                    {getCategoryIcon(item.category, 22)}
                  </div>
                  <button
                    type="button"
                    className={`card-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                    onClick={e => toggleBookmark(item.slug, e)}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Save bookmark'}
                  >
                    <Bookmark size={18} fill={isBookmarked ? '#f59e0b' : 'none'} stroke={isBookmarked ? '#f59e0b' : 'currentColor'} />
                  </button>
                </div>

                <h3 className="card-title">
                  <Link to={`/roadmaps/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>

                <p className="card-desc">
                  {item.description}
                </p>

                {/* Progress bar */}
                <div
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  className="card-progress-bar"
                >
                  <div
                    className="card-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="card-footer">
                  <span className="card-status">{statusText}</span>
                  <span className="card-cta">
                    {ctaText} <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="roadmaps-empty">
          <Sparkles size={36} color="#38bdf8" style={{ marginBottom: '1rem' }} />
          <h3>No roadmaps found</h3>
          <p>We couldn't find any tracks matching your search or category filter.</p>
          <button className="roadmaps-reset-btn" onClick={handleResetFilters}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
