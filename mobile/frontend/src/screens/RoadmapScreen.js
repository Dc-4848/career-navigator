import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import api from '../api/api';

export default function RoadmapScreen() {
  const { profile, selectedDomain, roadmap, setRoadmap, updateStructuredRoadmapProgress } = useMobileApp();

  const [activeTab, setActiveTab] = useState('Active'); // 'Active', 'Explore', 'AI'
  const [catalog, setCatalog] = useState([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [catalogError, setCatalogError] = useState(null);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedRoadmapId, setSelectedRoadmapId] = useState('fullstack');
  const [roadmapDetail, setRoadmapDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [generatingAI, setGeneratingAI] = useState(false);

  useEffect(() => {
    loadCatalog();
  }, []);

  useEffect(() => {
    loadRoadmapDetail(selectedRoadmapId);
  }, [selectedRoadmapId]);

  const loadCatalog = async () => {
    try {
      setLoadingCatalog(true);
      setCatalogError(null);
      const res = await api.get('/roadmaps/catalog');
      if (Array.isArray(res.data)) {
        setCatalog(res.data);
        setCatalogError(null);
      }
    } catch (e) {
      const isNet = e.diagnostic?.isNetworkError || e.message?.includes('Network Error');
      const isTime = e.diagnostic?.isTimeout || e.message?.includes('timeout');
      const msg = isTime
        ? 'Connection timed out while loading roadmaps catalog.'
        : isNet
        ? 'Unable to connect to server. Check Wi-Fi connection.'
        : 'Failed to load roadmaps catalog.';
      setCatalogError(msg);
      if (__DEV__) console.warn('Error loading roadmaps catalog:', e.message);
    } finally {
      setLoadingCatalog(false);
    }
  };

  const loadRoadmapDetail = async (id) => {
    try {
      setLoadingDetail(true);
      setDetailError(null);
      const res = await api.get(`/roadmaps/${id}`);
      if (res.data) {
        setRoadmapDetail(res.data);
        setDetailError(null);
      }
    } catch (e) {
      const isNet = e.diagnostic?.isNetworkError || e.message?.includes('Network Error');
      const isTime = e.diagnostic?.isTimeout || e.message?.includes('timeout');
      const msg = isTime
        ? 'Connection timed out loading roadmap. Server may be busy.'
        : isNet
        ? 'Unable to reach backend server. Check Wi-Fi and host.'
        : 'Failed to load roadmap detail.';
      setDetailError(msg);
      if (__DEV__) console.warn('Error loading roadmap detail:', e.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleToggleStage = async (stageNum) => {
    if (!roadmapDetail) return;
    const completed = roadmapDetail.progress?.completedStages || [];
    const isCompleted = completed.includes(stageNum);
    const updatedStages = isCompleted ? completed.filter(s => s !== stageNum) : [...completed, stageNum];

    // Optimistic UI update
    setRoadmapDetail(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        completedStages: updatedStages,
        progressPercent: Math.round((updatedStages.length / prev.stages.length) * 100),
      }
    }));

    await updateStructuredRoadmapProgress(roadmapDetail.id, { stageNumber: stageNum });
    loadCatalog();
  };

  const handleToggleTopic = async (topic) => {
    if (!roadmapDetail) return;
    const topics = roadmapDetail.progress?.completedTopics || [];
    const isCompleted = topics.includes(topic);
    const updated = isCompleted ? topics.filter(t => t !== topic) : [...topics, topic];

    setRoadmapDetail(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        completedTopics: updated,
      }
    }));

    await updateStructuredRoadmapProgress(roadmapDetail.id, { topic });
  };

  const handleGenerateAI = async () => {
    try {
      setGeneratingAI(true);
      const domainName = typeof selectedDomain === 'string' ? selectedDomain : (selectedDomain?.name || 'Full Stack Web Development');
      const res = await api.post('/ai/generate-roadmap', {
        degree: profile.degree || 'B.Tech CS',
        year: profile.year || '3rd Year',
        skills: profile.skills || ['JavaScript', 'React'],
        interests: profile.interests || ['Web Apps'],
        goal: profile.goal || 'Full Stack Engineer',
        selectedDomain: domainName,
      });

      if (res.data?.weeks) {
        setRoadmap(res.data);
        setActiveTab('Active');
      }
    } catch (err) {
      console.warn('AI Roadmap error:', err.message);
    } finally {
      setGeneratingAI(false);
    }
  };

  const filteredCatalog = catalog.filter(r => {
    const q = catalogSearch.toLowerCase();
    return !q || r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.requiredSkills.some(s => s.toLowerCase().includes(q));
  });

  const progressPercent = roadmapDetail?.progress?.progressPercent || 0;
  const completedStages = roadmapDetail?.progress?.completedStages || [];
  const completedTopics = roadmapDetail?.progress?.completedTopics || [];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Learning Roadmaps" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

        {/* Tab Row */}
        <View style={styles.navTabRow}>
          <TouchableOpacity
            style={[styles.navTabBtn, activeTab === 'Active' && styles.activeNavTabBtn]}
            onPress={() => setActiveTab('Active')}
          >
            <Text style={[styles.navTabText, activeTab === 'Active' && styles.activeNavTabText]}>🗺️ Active Track</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navTabBtn, activeTab === 'Explore' && styles.activeNavTabBtn]}
            onPress={() => setActiveTab('Explore')}
          >
            <Text style={[styles.navTabText, activeTab === 'Explore' && styles.activeNavTabText]}>
              🔍 Catalog ({catalog.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navTabBtn, activeTab === 'AI' && styles.activeNavTabBtn]}
            onPress={() => setActiveTab('AI')}
          >
            <Text style={[styles.navTabText, activeTab === 'AI' && styles.activeNavTabText]}>🤖 AI Generator</Text>
          </TouchableOpacity>
        </View>

        {/* ========================================= */}
        {/* TAB 1: ACTIVE INTERACTIVE ROADMAP TRACKER */}
        {/* ========================================= */}
        {activeTab === 'Active' && (
          <>
            {/* Cached Notice Banner if error occurred with existing data */}
            {detailError && roadmapDetail ? (
              <View style={styles.errorNoticeBanner}>
                <Text style={styles.errorNoticeText}>⚠️ {detailError}</Text>
                <TouchableOpacity onPress={() => loadRoadmapDetail(selectedRoadmapId)} style={styles.retryMiniBtn}>
                  <Text style={styles.retryMiniBtnText}>Retry ↺</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {loadingDetail ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="small" color={colors.accentTeal} />
                <Text style={styles.loadingText}>Loading roadmap curriculum...</Text>
              </View>
            ) : null}

            {/* Error state when no roadmap could be loaded */}
            {!loadingDetail && detailError && !roadmapDetail ? (
              <GlassCard style={styles.errorCard}>
                <Text style={styles.errorIcon}>📡</Text>
                <Text style={styles.errorTitle}>Roadmap Unavailable</Text>
                <Text style={styles.errorMessage}>{detailError}</Text>
                <TouchableOpacity style={styles.retryBtn} onPress={() => loadRoadmapDetail(selectedRoadmapId)}>
                  <Text style={styles.retryBtnText}>🔄 Retry Loading Roadmap</Text>
                </TouchableOpacity>
              </GlassCard>
            ) : null}

            {roadmapDetail ? (
              <>
                {/* Roadmap Header Card */}
                <GlassCard highlight style={styles.headerCard}>
                  <View style={styles.titleRow}>
                    <Text style={styles.roadmapIcon}>{roadmapDetail.icon || '🌐'}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.roadmapCategory}>{roadmapDetail.category.toUpperCase()}</Text>
                      <Text style={styles.roadmapTitle}>{roadmapDetail.title}</Text>
                    </View>
                  </View>

                  <Text style={styles.roadmapDesc}>{roadmapDetail.description}</Text>

                  {/* Progress Bar */}
                  <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressLabel}>Overall Completion Progress</Text>
                      <Text style={styles.progressPercentText}>{progressPercent}%</Text>
                    </View>
                    <View style={styles.progressBarTrack}>
                      <View style={[styles.progressBarFill, { width: `${Math.max(4, progressPercent)}%` }]} />
                    </View>
                    <Text style={styles.stagesCompletedMeta}>
                      {completedStages.length} of {roadmapDetail.stages?.length || 0} Stages Mastered
                    </Text>
                  </View>
                </GlassCard>

                {/* Stages List */}
                <Text style={styles.sectionHeading}>Structured Learning Stages</Text>

                {roadmapDetail.stages?.map((stage) => {
                  const isStageDone = completedStages.includes(stage.stageNumber);

                  return (
                    <GlassCard key={stage.stageNumber} style={[styles.stageCard, isStageDone && styles.stageCardCompleted]}>
                      <View style={styles.stageHeaderRow}>
                        <View style={[styles.stageNumBadge, isStageDone && styles.stageNumDone]}>
                          <Text style={styles.stageNumText}>{isStageDone ? '✓' : stage.stageNumber}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.stageDuration}>{stage.duration}</Text>
                          <Text style={[styles.stageTitle, isStageDone && styles.textStrikethrough]}>{stage.title}</Text>
                        </View>
                        <TouchableOpacity
                          style={[styles.stageCheckBtn, isStageDone && styles.stageCheckBtnActive]}
                          onPress={() => handleToggleStage(stage.stageNumber)}
                        >
                          <Text style={styles.stageCheckBtnText}>{isStageDone ? 'Done ✓' : 'Mark Done'}</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Topics Checklist */}
                      <Text style={styles.subSectionTitle}>Core Topics:</Text>
                      <View style={styles.topicsList}>
                        {stage.topics.map((t, idx) => {
                          const isTopicDone = completedTopics.includes(t);
                          return (
                            <TouchableOpacity
                              key={idx}
                              style={styles.topicRow}
                              onPress={() => handleToggleTopic(t)}
                            >
                              <Text style={styles.checkboxIcon}>{isTopicDone ? '☑️' : '◻️'}</Text>
                              <Text style={[styles.topicText, isTopicDone && styles.topicDoneText]}>{t}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      {/* Practical Assignment */}
                      {stage.assignment ? (
                        <View style={styles.assignmentBox}>
                          <Text style={styles.assignmentTitle}>📝 Practical Assignment:</Text>
                          <Text style={styles.assignmentDesc}>{stage.assignment}</Text>
                        </View>
                      ) : null}

                      {/* Mini Project */}
                      {stage.miniProject ? (
                        <View style={styles.miniProjectBox}>
                          <Text style={styles.miniProjectTitle}>🚀 Mini Project:</Text>
                          <Text style={styles.miniProjectDesc}>{stage.miniProject}</Text>
                        </View>
                      ) : null}

                      {/* Recommended Resources */}
                      {stage.resources?.length > 0 ? (
                        <View style={styles.stageResourcesBox}>
                          <Text style={styles.resourcesTitle}>Recommended Study Links:</Text>
                          {stage.resources.map((res, rIdx) => (
                            <TouchableOpacity
                              key={rIdx}
                              style={styles.resourceLinkRow}
                              onPress={() => Linking.openURL(res.url)}
                            >
                              <Text style={styles.resourceLinkText}>🔗 {res.title}</Text>
                              <Text style={styles.resourceTypeTag}>{res.type}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      ) : null}
                    </GlassCard>
                  );
                })}

                {/* Final Capstone Project */}
                {roadmapDetail.finalProject ? (
                  <GlassCard highlight style={styles.finalProjectCard}>
                    <Text style={styles.capstoneBadge}>🏆 CAPSTONE FINAL PROJECT</Text>
                    <Text style={styles.capstoneTitle}>{roadmapDetail.finalProject.title}</Text>
                    <Text style={styles.capstoneDesc}>{roadmapDetail.finalProject.description}</Text>
                  </GlassCard>
                ) : null}
              </>
            ) : null}
          </>
        )}

        {/* ========================================= */}
        {/* TAB 2: EXPLORE CATALOG */}
        {/* ========================================= */}
        {activeTab === 'Explore' && (
          <>
            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by role (Java, React, DevOps, AI, Python)..."
                placeholderTextColor={colors.textMuted}
                value={catalogSearch}
                onChangeText={setCatalogSearch}
              />
            </View>

            {loadingCatalog ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="small" color={colors.accentTeal} />
                <Text style={styles.loadingText}>Fetching roadmaps catalog...</Text>
              </View>
            ) : null}

            {!loadingCatalog && catalogError && catalog.length === 0 ? (
              <GlassCard style={styles.errorCard}>
                <Text style={styles.errorIcon}>📡</Text>
                <Text style={styles.errorTitle}>Catalog Unavailable</Text>
                <Text style={styles.errorMessage}>{catalogError}</Text>
                <TouchableOpacity style={styles.retryBtn} onPress={loadCatalog}>
                  <Text style={styles.retryBtnText}>🔄 Retry Loading Catalog</Text>
                </TouchableOpacity>
              </GlassCard>
            ) : null}

            {filteredCatalog.map(item => {
              const isSelected = selectedRoadmapId === item.id;

              return (
                <GlassCard key={item.id} highlight={isSelected} style={styles.catalogCard}>
                  <View style={styles.catalogTopRow}>
                    <Text style={styles.catalogIcon}>{item.icon || '🗺️'}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.catalogCategory}>{item.category.toUpperCase()}</Text>
                      <Text style={styles.catalogTitle}>{item.title}</Text>
                    </View>
                    <View style={styles.diffBadge}>
                      <Text style={styles.diffBadgeText}>{item.difficulty}</Text>
                    </View>
                  </View>

                  <Text style={styles.catalogDesc}>{item.description}</Text>

                  {/* Skills Pills */}
                  <View style={styles.skillsPillRow}>
                    {item.requiredSkills.slice(0, 5).map((skill, sIdx) => (
                      <View key={sIdx} style={styles.skillPill}>
                        <Text style={styles.skillPillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Progress info if started */}
                  {item.isStarted ? (
                    <View style={styles.startedProgressRow}>
                      <Text style={styles.startedProgressText}>
                        📈 Progress: {item.progressPercent}% ({item.completedStagesCount}/{item.totalStages} stages)
                      </Text>
                    </View>
                  ) : null}

                  <Button
                    title={isSelected ? 'Active Track ✓' : 'Select & Start Roadmap'}
                    type={isSelected ? 'violet' : 'primary'}
                    onPress={() => {
                      setSelectedRoadmapId(item.id);
                      setActiveTab('Active');
                    }}
                    style={{ marginTop: 8 }}
                  />
                </GlassCard>
              );
            })}
          </>
        )}

        {/* ========================================= */}
        {/* TAB 3: LOCAL AI ROADMAP GENERATOR */}
        {/* ========================================= */}
        {activeTab === 'AI' && (
          <GlassCard style={styles.aiCard}>
            <Text style={styles.aiBadge}>🤖 LOCAL AI QWEN3 GENERATOR</Text>
            <Text style={styles.aiTitle}>Generate Custom AI Roadmap</Text>
            <Text style={styles.aiSubtitle}>
              Tailored specifically to your current year ({profile.year || '3rd Year'}), existing skills ({profile.skills?.length || 0} skills), and career goal ({profile.goal || 'Full Stack Engineer'}).
            </Text>

            <Button
              title="Generate 12-Week AI Roadmap"
              type="violet"
              loading={generatingAI}
              onPress={handleGenerateAI}
              style={{ marginTop: 16 }}
            />
          </GlassCard>
        )}

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
  navTabRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: colors.radiusMd,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    marginBottom: 6,
  },
  navTabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: colors.radiusSm,
  },
  activeNavTabBtn: {
    backgroundColor: colors.accentViolet,
  },
  navTabText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  activeNavTabText: {
    color: '#FFFFFF',
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  headerCard: {
    gap: 12,
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roadmapIcon: {
    fontSize: 32,
  },
  roadmapCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accentTeal,
    letterSpacing: 1,
  },
  roadmapTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  roadmapDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  progressContainer: {
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: colors.radiusSm,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
  },
  progressPercentText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.accentTeal,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accentTeal,
    borderRadius: 4,
  },
  stagesCompletedMeta: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 6,
  },
  stageCard: {
    gap: 10,
    padding: 14,
  },
  stageCardCompleted: {
    borderColor: colors.accentEmerald,
    opacity: 0.9,
  },
  stageHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stageNumBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  stageNumDone: {
    backgroundColor: colors.accentEmerald,
    borderColor: colors.accentEmerald,
  },
  stageNumText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '800',
  },
  stageDuration: {
    fontSize: 10,
    color: colors.accentTeal,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  stageTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  textStrikethrough: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  stageCheckBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  stageCheckBtnActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: colors.accentEmerald,
  },
  stageCheckBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  subSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    marginTop: 2,
  },
  topicsList: {
    gap: 6,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxIcon: {
    fontSize: 13,
  },
  topicText: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
  },
  topicDoneText: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  assignmentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.accentViolet,
  },
  assignmentTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accentViolet,
  },
  assignmentDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  miniProjectBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.accentTeal,
  },
  miniProjectTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accentTeal,
  },
  miniProjectDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  stageResourcesBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 6,
    padding: 10,
    gap: 4,
  },
  resourcesTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
  },
  resourceLinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  resourceLinkText: {
    fontSize: 11,
    color: colors.accentTeal,
    fontWeight: '600',
    flex: 1,
  },
  resourceTypeTag: {
    fontSize: 9,
    color: colors.textMuted,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  finalProjectCard: {
    gap: 8,
    padding: 16,
    borderColor: colors.accentTeal,
  },
  capstoneBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accentTeal,
    letterSpacing: 1,
  },
  capstoneTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  capstoneDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  searchBox: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusMd,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 4,
  },
  searchInput: {
    color: colors.textPrimary,
    fontSize: 13,
  },
  catalogCard: {
    gap: 10,
    padding: 14,
  },
  catalogTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  catalogIcon: {
    fontSize: 26,
  },
  catalogCategory: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.accentTeal,
    letterSpacing: 1,
  },
  catalogTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  diffBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  diffBadgeText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  catalogDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  skillsPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  skillPillText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  startedProgressRow: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderRadius: 6,
    padding: 6,
  },
  startedProgressText: {
    fontSize: 11,
    color: colors.accentTeal,
    fontWeight: '700',
  },
  aiCard: {
    padding: 20,
    gap: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  aiBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accentViolet,
    letterSpacing: 1,
  },
  aiTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  aiSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
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
