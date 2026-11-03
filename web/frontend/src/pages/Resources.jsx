import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Search, Bookmark, BookmarkCheck, Check, ExternalLink, Layers } from 'lucide-react';
import api from '../api';
import './Resources.css';

const RESOURCE_TYPES = ['All', 'Video', 'Article', 'Documentation', 'Course', 'Book', 'Cheatsheet', 'Practice platform', 'Tool', 'Tutorial'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeDiff, setActiveDiff] = useState('All');
  const [freeOnly, setFreeOnly] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'saved'
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  useEffect(() => {
    loadResources();
  }, [activeType, activeDiff, freeOnly]);

  const loadResources = async () => {
    try {
      setLoading(true);
      const params = {};
      if (activeType !== 'All') params.type = activeType;
      if (activeDiff !== 'All') params.difficulty = activeDiff;
      if (freeOnly) params.isFree = 'true';

      const res = await api.get('/resources', { params });
      if (Array.isArray(res.data)) {
        setResources(res.data);
        const bookmarked = new Set(res.data.filter(r => r.isBookmarked).map(r => r._id));
        setBookmarkedIds(bookmarked);
      }
    } catch (err) {
      console.error('Error loading resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBookmark = async (resourceId) => {
    try {
      const res = await api.post(`/resources/${resourceId}/bookmark`);
      const isNowBookmarked = res.data?.isBookmarked;

      setBookmarkedIds(prev => {
        const next = new Set(prev);
        if (isNowBookmarked) next.add(resourceId);
        else next.delete(resourceId);
        return next;
      });

      setResources(prev => prev.map(r => r._id === resourceId ? { ...r, isBookmarked: isNowBookmarked } : r));
    } catch (err) {
      console.error('Bookmark error:', err);
    }
  };

  const filteredResources = useMemo(() => {
    return resources.filter(item => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.technology.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      const matchesType = activeType === 'All' || item.type === activeType;
      const matchesDiff = activeDiff === 'All' || item.difficulty === activeDiff;
      const matchesFree = !freeOnly || item.isFree === true;
      const matchesSaved = activeTab === 'all' || bookmarkedIds.has(item._id);

      return matchesSearch && matchesType && matchesDiff && matchesFree && matchesSaved;
    });
  }, [resources, search, activeType, activeDiff, freeOnly, activeTab, bookmarkedIds]);

  return (
    <div className="resources-container">
      {/* Header Banner */}
      <div className="resources-header">
        <span className="resources-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <BookOpen size={13} /> Curated Learning Library
        </span>
        <h1 className="resources-title">Technical Learning Resources</h1>
        <p className="resources-subtitle">
          Curated and verified developer documentation, video series, cheatsheets, interactive sandboxes, and industry practice platforms.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="resources-controls">
        <div className="resources-search-row">
          <input
            type="text"
            className="resources-search-input"
            placeholder="Search topics (e.g. React, SQL, Docker, Algorithms, System Design)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tab Selector: Discover vs Saved */}
        <div className="resources-tabs">
          <button
            className={`resources-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Search size={14} /> Discover All ({resources.length})
          </button>
          <button
            className={`resources-tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <BookmarkCheck size={14} /> Bookmarked ({bookmarkedIds.size})
          </button>
        </div>

        {/* Resource Type Filter Chips */}
        <div className="resources-tabs">
          {RESOURCE_TYPES.map(type => (
            <button
              key={type}
              className={`resources-tab-btn ${activeType === type ? 'active' : ''}`}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Difficulty & Free Filters */}
        <div className="resources-subfilters">
          <div className="resources-diff-group">
            {DIFFICULTIES.map(diff => (
              <button
                key={diff}
                className={`resources-diff-btn ${activeDiff === diff ? 'active' : ''}`}
                onClick={() => setActiveDiff(diff)}
              >
                {diff}
              </button>
            ))}
          </div>

          <button
            className={`resources-free-toggle ${freeOnly ? 'active' : ''}`}
            onClick={() => setFreeOnly(!freeOnly)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            {freeOnly ? (
              <>
                <Check size={13} /> Free Resources Only
              </>
            ) : (
              'Filter Free Only'
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#38bdf8' }}>
          Loading verified learning resources...
        </div>
      ) : null}

      {/* Empty State */}
      {!loading && filteredResources.length === 0 ? (
        <div className="resources-empty">
          <div className="resources-empty-icon" style={{ display: 'flex', justifyContent: 'center' }}>
            <Search size={32} color="var(--text-secondary)" />
          </div>
          <h3>No resources match your filters</h3>
          <p>
            {activeTab === 'saved'
              ? 'You have not bookmarked any resources yet. Switch to "Discover All" to browse.'
              : 'Try searching for different keywords or clearing active filters.'}
          </p>
        </div>
      ) : null}

      {/* Resource Cards Grid */}
      <div className="resources-grid">
        {filteredResources.map(resource => {
          const isSaved = bookmarkedIds.has(resource._id);
          const diffClass = (resource.difficulty || 'beginner').toLowerCase();

          return (
            <div key={resource._id || resource.title} className="resource-card">
              <div className="resource-card-top">
                <div className="resource-badges">
                  <span className="resource-type-tag">{resource.type}</span>
                  <span className={`resource-diff-tag ${diffClass}`}>{resource.difficulty}</span>
                  {resource.isFree && <span className="resource-free-tag">FREE</span>}
                </div>

                <button
                  className="resource-bookmark-btn"
                  onClick={() => handleToggleBookmark(resource._id)}
                  title={isSaved ? 'Remove Bookmark' : 'Save Resource'}
                  aria-label={isSaved ? 'Remove Bookmark' : 'Save Resource'}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {isSaved ? <BookmarkCheck size={16} color="var(--accent-cyan)" /> : <Bookmark size={16} />}
                </button>
              </div>

              <h2 className="resource-card-title">{resource.title}</h2>
              <p className="resource-card-desc">{resource.description}</p>

              {resource.relatedStage && (
                <div className="resource-stage-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Layers size={12} /> {resource.relatedStage}
                </div>
              )}

              <div className="resource-card-actions">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-open-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  Open Resource <ExternalLink size={13} />
                </a>
                <span className="resource-tech-label">{resource.technology}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
