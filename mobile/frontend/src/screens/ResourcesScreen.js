import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import api from '../api/api';

const RESOURCE_TYPES = ['All', 'Video', 'Article', 'Documentation', 'Course', 'Book', 'Cheatsheet', 'Practice platform', 'Tool', 'Tutorial'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function ResourcesScreen() {
  const { bookmarkedResources, toggleBookmarkResource } = useMobileApp();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeDiff, setActiveDiff] = useState('All');
  const [freeOnly, setFreeOnly] = useState(false);
  const [activeTab, setActiveTab] = useState('Discover'); // 'Discover' or 'Saved'
  const [bookmarkingId, setBookmarkingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResources();
  }, [activeType, activeDiff, freeOnly]);

  const loadResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (activeType !== 'All') params.type = activeType;
      if (activeDiff !== 'All') params.difficulty = activeDiff;
      if (freeOnly) params.isFree = 'true';

      const res = await api.get('/resources', { params });
      if (Array.isArray(res.data)) {
        setResources(res.data);
        setError(null);
      }
    } catch (e) {
      const isNet = e.diagnostic?.isNetworkError || e.message?.includes('Network Error');
      const isTime = e.diagnostic?.isTimeout || e.message?.includes('timeout');
      const msg = isTime
        ? 'Connection timed out loading resources. Server may be warming up.'
        : isNet
        ? 'Unable to connect to server. Check Wi-Fi connection.'
        : 'Failed to load resources.';
      setError(msg);
      if (__DEV__) console.warn('Error loading resources:', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBookmark = async (resId) => {
    try {
      setBookmarkingId(resId);
      await toggleBookmarkResource(resId);
      // update local state
      setResources(prev => prev.map(r => {
        if (r._id === resId) {
          return { ...r, isBookmarked: !r.isBookmarked };
        }
        return r;
      }));
    } catch (e) {
      console.warn('Bookmark toggle error:', e.message);
    } finally {
      setBookmarkingId(null);
    }
  };

  const handleOpenLink = async (url) => {
    if (!url) return;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(url);
      }
    } catch (e) {
      console.warn('Cannot open url:', e.message);
    }
  };

  // Filter list
  const displayList = useMemo(() => {
    const listToFilter = activeTab === 'Saved' ? bookmarkedResources : resources;
    return listToFilter.filter(r => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.technology.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);

      const matchesType = activeType === 'All' || r.type === activeType;
      const matchesDiff = activeDiff === 'All' || r.difficulty === activeDiff;
      const matchesFree = !freeOnly || r.isFree === true;

      return matchesSearch && matchesType && matchesDiff && matchesFree;
    });
  }, [resources, bookmarkedResources, activeTab, search, activeType, activeDiff, freeOnly]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Learning Resource Library" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

        {/* Hero Tagline */}
        <View style={styles.bannerBox}>
          <Text style={styles.badgeText}>📚 CAREERCAFFE CURATION</Text>
          <Text style={styles.bannerTitle}>Explore Learning Resources</Text>
          <Text style={styles.bannerSubtitle}>Curated verified articles, docs, free courses, cheatsheets & tools</Text>
        </View>

        {/* Tab Selector: Discover vs Saved */}
        <View style={styles.mainTabRow}>
          <TouchableOpacity
            style={[styles.mainTabBtn, activeTab === 'Discover' && styles.activeMainTabBtn]}
            onPress={() => setActiveTab('Discover')}
          >
            <Text style={[styles.mainTabText, activeTab === 'Discover' && styles.activeMainTabText]}>
              🔍 Discover All ({resources.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mainTabBtn, activeTab === 'Saved' && styles.activeMainTabBtn]}
            onPress={() => setActiveTab('Saved')}
          >
            <Text style={[styles.mainTabText, activeTab === 'Saved' && styles.activeMainTabText]}>
              🔖 Saved ({bookmarkedResources.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics, React, Python, Docker, SQL..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Type Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {RESOURCE_TYPES.map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.chip, activeType === type && styles.activeChip]}
              onPress={() => setActiveType(type)}
            >
              <Text style={[styles.chipText, activeType === type && styles.activeChipText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Difficulty & Free Filters */}
        <View style={styles.secondaryFilterRow}>
          <View style={styles.diffGroup}>
            {DIFFICULTIES.map(diff => (
              <TouchableOpacity
                key={diff}
                style={[styles.diffBtn, activeDiff === diff && styles.activeDiffBtn]}
                onPress={() => setActiveDiff(diff)}
              >
                <Text style={[styles.diffBtnText, activeDiff === diff && styles.activeDiffBtnText]}>{diff}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.freeToggle, freeOnly && styles.activeFreeToggle]}
            onPress={() => setFreeOnly(!freeOnly)}
          >
            <Text style={[styles.freeToggleText, freeOnly && styles.activeFreeToggleText]}>
              {freeOnly ? '✓ Free Only' : 'Free Only'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cached Error Banner if error occurred with existing data */}
        {error && displayList.length > 0 ? (
          <View style={styles.errorNoticeBanner}>
            <Text style={styles.errorNoticeText}>⚠️ {error}</Text>
            <TouchableOpacity onPress={loadResources} style={styles.retryMiniBtn}>
              <Text style={styles.retryMiniBtnText}>Retry ↺</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Loading Spinner */}
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color={colors.accentTeal} />
            <Text style={styles.loadingText}>Fetching curated resources...</Text>
          </View>
        ) : null}

        {/* Error State when no data could be fetched */}
        {!loading && error && displayList.length === 0 ? (
          <GlassCard style={styles.errorCard}>
            <Text style={styles.errorIcon}>📡</Text>
            <Text style={styles.errorTitle}>Unable to Load Resources</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={loadResources}>
              <Text style={styles.retryBtnText}>🔄 Retry Loading</Text>
            </TouchableOpacity>
          </GlassCard>
        ) : null}

        {/* Empty State */}
        {!loading && !error && displayList.length === 0 ? (
          <GlassCard style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No matching resources found</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'Saved'
                ? 'You have not bookmarked any resources yet. Switch to Discover to browse!'
                : 'Try clearing filters or searching for different keywords like JavaScript, Python or SQL.'}
            </Text>
          </GlassCard>
        ) : null}

        {/* Resources Cards */}
        {displayList.map(item => {
          const isSaved = item.isBookmarked || bookmarkedResources.some(b => b._id === item._id);

          return (
            <GlassCard key={item._id || item.title} style={styles.resourceCard}>
              <View style={styles.cardTopRow}>
                <View style={styles.badgeRow}>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeBadgeText}>{item.type}</Text>
                  </View>
                  <View style={[styles.diffBadge, item.difficulty === 'Advanced' ? styles.diffAdv : (item.difficulty === 'Intermediate' ? styles.diffInt : styles.diffBeg)]}>
                    <Text style={styles.diffBadgeText}>{item.difficulty}</Text>
                  </View>
                  {item.isFree ? (
                    <View style={styles.freeBadge}>
                      <Text style={styles.freeBadgeText}>FREE</Text>
                    </View>
                  ) : null}
                </View>

                {/* Bookmark Toggle */}
                <TouchableOpacity
                  style={[styles.bookmarkBtn, isSaved && styles.bookmarkBtnActive]}
                  onPress={() => handleToggleBookmark(item._id)}
                  disabled={bookmarkingId === item._id}
                >
                  <Text style={styles.bookmarkBtnText}>{isSaved ? '🔖' : '🏷️'}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>

              {/* Related Roadmap Stage Tag */}
              {item.relatedStage ? (
                <View style={styles.stageTag}>
                  <Text style={styles.stageTagText}>🗺️ {item.relatedStage}</Text>
                </View>
              ) : null}

              {/* Action Buttons */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.openLinkBtn}
                  onPress={() => handleOpenLink(item.url)}
                >
                  <Text style={styles.openLinkText}>Open Resource ↗</Text>
                </TouchableOpacity>
                <Text style={styles.techPill}>{item.technology}</Text>
              </View>
            </GlassCard>
          );
        })}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  bannerBox: {
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accentTeal,
    letterSpacing: 1,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  mainTabRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: colors.radiusMd,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    marginTop: 6,
  },
  mainTabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: colors.radiusSm,
  },
  activeMainTabBtn: {
    backgroundColor: colors.accentViolet,
  },
  mainTabText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  activeMainTabText: {
    color: '#FFFFFF',
  },
  searchBox: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusMd,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    color: colors.textPrimary,
    fontSize: 13,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeChip: {
    backgroundColor: colors.accentTeal,
    borderColor: colors.accentTeal,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#030610',
    fontWeight: '800',
  },
  secondaryFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diffGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  diffBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activeDiffBtn: {
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
    borderColor: colors.accentViolet,
  },
  diffBtnText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  activeDiffBtnText: {
    color: colors.accentViolet,
  },
  freeToggle: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activeFreeToggle: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: colors.accentEmerald,
  },
  freeToggleText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  activeFreeToggleText: {
    color: colors.accentEmerald,
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  resourceCard: {
    gap: 10,
    padding: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  typeBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: colors.accentViolet,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  typeBadgeText: {
    color: colors.accentViolet,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  diffBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  diffBeg: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  diffInt: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  diffAdv: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
  },
  diffBadgeText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
  freeBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  freeBadgeText: {
    color: colors.accentEmerald,
    fontSize: 9,
    fontWeight: '800',
  },
  bookmarkBtn: {
    padding: 4,
  },
  bookmarkBtnActive: {
    transform: [{ scale: 1.1 }],
  },
  bookmarkBtnText: {
    fontSize: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  cardDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  stageTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignSelf: 'flex-start',
  },
  stageTagText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  openLinkBtn: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1,
    borderColor: colors.accentTeal,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  openLinkText: {
    color: colors.accentTeal,
    fontSize: 12,
    fontWeight: '800',
  },
  techPill: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '700',
  },
  errorNoticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    borderRadius: colors.radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  errorNoticeText: {
    color: '#F87171',
    fontSize: 12,
    flex: 1,
    marginRight: 8,
  },
  retryMiniBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  retryMiniBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  errorCard: {
    alignItems: 'center',
    padding: 24,
    marginVertical: 16,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F87171',
    marginBottom: 6,
  },
  errorMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  retryBtn: {
    backgroundColor: colors.accentViolet,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: colors.radiusSm,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
