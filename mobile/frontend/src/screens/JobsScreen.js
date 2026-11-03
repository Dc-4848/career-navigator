import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, Modal, Alert, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import api from '../api/api';

const WORKPLACE_TYPES = ['All', 'Remote', 'Hybrid', 'On-site'];
const JOB_TYPES = ['All', 'Internship', 'Fresher Job', 'Entry-Level Job', 'Off-Campus'];
const APP_STATUSES = ['Saved', 'Applied', 'Assessment', 'Interview', 'Offered', 'Rejected'];

export default function JobsScreen() {
  const {
    opportunities,
    setOpportunities,
    savedOpportunities,
    toggleSaveOpportunity,
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
  } = useMobileApp();

  const [activeTab, setActiveTab] = useState('Opportunities'); // 'Opportunities' vs 'Tracker'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [workplace, setWorkplace] = useState('All');
  const [jobType, setJobType] = useState('All');

  // Application tracker filter
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal for new/editing application
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalCompany, setModalCompany] = useState('');
  const [modalStatus, setModalStatus] = useState('Applied');
  const [modalNotes, setModalNotes] = useState('');
  const [modalDeadline, setModalDeadline] = useState('');
  const [savingApp, setSavingApp] = useState(false);

  useEffect(() => {
    loadOpportunities();
  }, [workplace, jobType]);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (workplace !== 'All') params.workplace = workplace;
      if (jobType !== 'All') params.type = jobType;

      const res = await api.get('/opportunities', { params });
      if (Array.isArray(res.data)) {
        setOpportunities(res.data);
        setError(null);
      }
    } catch (e) {
      const isNet = e.diagnostic?.isNetworkError || e.message?.includes('Network Error');
      const isTime = e.diagnostic?.isTimeout || e.message?.includes('timeout');
      const msg = isTime
        ? 'Connection timed out. Server may be spinning up or busy.'
        : isNet
        ? 'Unable to connect to server. Check Wi-Fi and backend connection.'
        : 'Failed to load opportunities. Please try again.';
      setError(msg);
      if (__DEV__) console.warn('Error loading opportunities:', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenLink = (url) => {
    if (!url) return;
    Linking.openURL(url).catch(e => console.warn('Link error:', e.message));
  };

  const handleQuickTrack = (opp) => {
    setModalTitle(opp.title);
    setModalCompany(opp.company);
    setModalDeadline(opp.deadline || '');
    setModalStatus('Applied');
    setModalNotes(`Tracked from Career Navigator. Location: ${opp.location || 'Remote'}`);
    setModalVisible(true);
  };

  const handleSaveModalApplication = async () => {
    if (!modalTitle.trim() || !modalCompany.trim()) {
      Alert.alert('Required', 'Please enter both Job Title and Company Name');
      return;
    }
    try {
      setSavingApp(true);
      await addApplication({
        title: modalTitle.trim(),
        company: modalCompany.trim(),
        status: modalStatus,
        notes: modalNotes.trim(),
        deadline: modalDeadline.trim(),
      });
      setModalVisible(false);
      setModalTitle('');
      setModalCompany('');
      setModalNotes('');
      setModalDeadline('');
      setActiveTab('Tracker');
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to save application');
    } finally {
      setSavingApp(false);
    }
  };

  const cycleStatus = async (app) => {
    const currentIndex = APP_STATUSES.indexOf(app.status);
    const nextIndex = (currentIndex + 1) % APP_STATUSES.length;
    const nextStatus = APP_STATUSES[nextIndex];
    await updateApplication(app._id, { status: nextStatus });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Offered': return { bg: 'rgba(16, 185, 129, 0.2)', border: colors.accentEmerald, text: colors.accentEmerald };
      case 'Interview': return { bg: 'rgba(6, 182, 212, 0.2)', border: colors.accentTeal, text: colors.accentTeal };
      case 'Assessment': return { bg: 'rgba(234, 179, 8, 0.2)', border: colors.accentAmber, text: colors.accentAmber };
      case 'Applied': return { bg: 'rgba(99, 102, 241, 0.2)', border: colors.accentViolet, text: colors.accentViolet };
      case 'Rejected': return { bg: 'rgba(239, 68, 68, 0.2)', border: '#EF4444', text: '#EF4444' };
      default: return { bg: 'rgba(255, 255, 255, 0.08)', border: colors.glassBorder, text: colors.textSecondary };
    }
  };

  // Filtered opportunities
  const filteredOpps = useMemo(() => {
    return opportunities.filter(opp => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        opp.title.toLowerCase().includes(q) ||
        opp.company.toLowerCase().includes(q) ||
        opp.skills.some(s => s.toLowerCase().includes(q)) ||
        opp.location.toLowerCase().includes(q);

      const matchesWorkplace = workplace === 'All' || opp.workplaceType === workplace;
      const matchesType = jobType === 'All' || opp.jobType === jobType;

      return matchesSearch && matchesWorkplace && matchesType;
    });
  }, [opportunities, search, workplace, jobType]);

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      if (statusFilter === 'All') return true;
      return app.status === statusFilter;
    });
  }, [applications, statusFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Opportunities & Applications" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

        {/* Top Tab Navigator */}
        <View style={styles.tabNavRow}>
          <TouchableOpacity
            style={[styles.tabNavBtn, activeTab === 'Opportunities' && styles.activeTabNavBtn]}
            onPress={() => setActiveTab('Opportunities')}
          >
            <Text style={[styles.tabNavText, activeTab === 'Opportunities' && styles.activeTabNavText]}>
              💼 Discover ({opportunities.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabNavBtn, activeTab === 'Tracker' && styles.activeTabNavBtn]}
            onPress={() => setActiveTab('Tracker')}
          >
            <Text style={[styles.tabNavText, activeTab === 'Tracker' && styles.activeTabNavText]}>
              📋 App Tracker ({applications.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* ========================================= */}
        {/* TAB 1: OPPORTUNITY DISCOVERY */}
        {/* ========================================= */}
        {activeTab === 'Opportunities' && (
          <>
            {/* Search Bar */}
            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search job role, company, skill (React, Python)..."
                placeholderTextColor={colors.textMuted}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* Workplace Filter Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
              {WORKPLACE_TYPES.map(w => (
                <TouchableOpacity
                  key={w}
                  style={[styles.chip, workplace === w && styles.activeChip]}
                  onPress={() => setWorkplace(w)}
                >
                  <Text style={[styles.chipText, workplace === w && styles.activeChipText]}>{w}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Job Type Filter Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
              {JOB_TYPES.map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.chip, jobType === t && styles.activeChipViolet]}
                  onPress={() => setJobType(t)}
                >
                  <Text style={[styles.chipText, jobType === t && styles.activeChipTextViolet]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Cached Notice Banner if error occurred with existing data */}
            {error && filteredOpps.length > 0 ? (
              <View style={styles.errorNoticeBanner}>
                <Text style={styles.errorNoticeText}>⚠️ {error}</Text>
                <TouchableOpacity onPress={loadOpportunities} style={styles.retryMiniBtn}>
                  <Text style={styles.retryMiniBtnText}>Retry ↺</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {loading ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="small" color={colors.accentTeal} />
                <Text style={styles.loadingText}>Fetching opportunities...</Text>
              </View>
            ) : null}

            {/* Error state when no data could be loaded */}
            {!loading && error && filteredOpps.length === 0 ? (
              <GlassCard style={styles.errorCard}>
                <Text style={styles.errorIcon}>📡</Text>
                <Text style={styles.errorTitle}>Unable to Load Opportunities</Text>
                <Text style={styles.errorMessage}>{error}</Text>
                <TouchableOpacity style={styles.retryBtn} onPress={loadOpportunities}>
                  <Text style={styles.retryBtnText}>🔄 Retry Loading</Text>
                </TouchableOpacity>
              </GlassCard>
            ) : null}

            {/* Empty state when filters return 0 results */}
            {!loading && !error && filteredOpps.length === 0 ? (
              <GlassCard style={styles.emptyCard}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyTitle}>No Opportunities Match Filters</Text>
                <Text style={styles.emptyMessage}>Try clearing or broadening your search keywords and workplace filters.</Text>
                <TouchableOpacity
                  style={styles.clearFilterBtn}
                  onPress={() => {
                    setSearch('');
                    setWorkplace('All');
                    setJobType('All');
                  }}
                >
                  <Text style={styles.clearFilterBtnText}>Reset Filters</Text>
                </TouchableOpacity>
              </GlassCard>
            ) : null}

            {filteredOpps.map(opp => {
              const isSaved = opp.isSaved || savedOpportunities.some(s => s._id === opp._id);

              return (
                <GlassCard key={opp._id || opp.title} style={styles.oppCard}>
                  <View style={styles.oppHeader}>
                    <Text style={styles.oppLogo}>{opp.logo || '🏢'}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.oppCompany}>{opp.company.toUpperCase()}</Text>
                      <Text style={styles.oppTitle}>{opp.title}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.bookmarkBtn}
                      onPress={() => toggleSaveOpportunity(opp._id)}
                    >
                      <Text style={styles.bookmarkIcon}>{isSaved ? '🔖' : '🏷️'}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Location & Stipend Meta */}
                  <View style={styles.metaRow}>
                    <Text style={styles.metaPill}>📍 {opp.location}</Text>
                    <Text style={styles.metaPill}>💼 {opp.jobType}</Text>
                    <Text style={styles.metaPill}>💰 {opp.stipendOrSalary}</Text>
                  </View>

                  <Text style={styles.oppDesc}>{opp.description}</Text>

                  {/* Required Skills */}
                  <View style={styles.skillsRow}>
                    {opp.skills.map((skill, sIdx) => (
                      <View key={sIdx} style={styles.skillBadge}>
                        <Text style={styles.skillBadgeText}>{skill}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.deadlineText}>⏳ Deadline: {opp.deadline}</Text>

                  {/* Card Action Buttons */}
                  <View style={styles.cardActionsRow}>
                    <TouchableOpacity
                      style={styles.applyBtn}
                      onPress={() => handleOpenLink(opp.applyUrl)}
                    >
                      <Text style={styles.applyBtnText}>Apply Now ↗</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.trackBtn}
                      onPress={() => handleQuickTrack(opp)}
                    >
                      <Text style={styles.trackBtnText}>+ Track App</Text>
                    </TouchableOpacity>
                  </View>
                </GlassCard>
              );
            })}
          </>
        )}

        {/* ========================================= */}
        {/* TAB 2: APPLICATION TRACKER */}
        {/* ========================================= */}
        {activeTab === 'Tracker' && (
          <>
            {/* Add Custom Application Header */}
            <View style={styles.trackerHeaderBox}>
              <View>
                <Text style={styles.trackerTitle}>Application Tracker</Text>
                <Text style={styles.trackerSubtitle}>Track interview rounds, assessments, and deadlines</Text>
              </View>
              <TouchableOpacity
                style={styles.addAppBtn}
                onPress={() => {
                  setModalTitle('');
                  setModalCompany('');
                  setModalNotes('');
                  setModalDeadline('');
                  setModalStatus('Applied');
                  setModalVisible(true);
                }}
              >
                <Text style={styles.addAppBtnText}>+ Add Job</Text>
              </TouchableOpacity>
            </View>

            {/* Status Filter Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
              {['All', ...APP_STATUSES].map(status => (
                <TouchableOpacity
                  key={status}
                  style={[styles.chip, statusFilter === status && styles.activeChip]}
                  onPress={() => setStatusFilter(status)}
                >
                  <Text style={[styles.chipText, statusFilter === status && styles.activeChipText]}>{status}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {filteredApps.length === 0 ? (
              <GlassCard style={styles.emptyCard}>
                <Text style={styles.emptyIcon}>📋</Text>
                <Text style={styles.emptyTitle}>No applications tracked yet</Text>
                <Text style={styles.emptySubtitle}>
                  Tap "+ Add Job" above or discover opportunities to track your job search journey!
                </Text>
              </GlassCard>
            ) : null}

            {filteredApps.map(app => {
              const statusCfg = getStatusStyle(app.status);

              return (
                <GlassCard key={app._id} style={styles.appCard}>
                  <View style={styles.appCardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.appCardCompany}>{app.company.toUpperCase()}</Text>
                      <Text style={styles.appCardTitle}>{app.title}</Text>
                    </View>

                    {/* Clickable Status Badge (Cycles Status) */}
                    <TouchableOpacity
                      style={[styles.statusBadge, { backgroundColor: statusCfg.bg, borderColor: statusCfg.border }]}
                      onPress={() => cycleStatus(app)}
                    >
                      <Text style={[styles.statusBadgeText, { color: statusCfg.text }]}>
                        {app.status} ▾
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {app.notes ? (
                    <Text style={styles.appNotes}>📝 {app.notes}</Text>
                  ) : null}

                  {app.deadline ? (
                    <Text style={styles.appDeadline}>⏳ Next Deadline: {app.deadline}</Text>
                  ) : null}

                  <View style={styles.appFooterRow}>
                    <Text style={styles.appliedDateText}>
                      Tracked: {new Date(app.appliedDate || app.createdAt).toLocaleDateString()}
                    </Text>
                    <TouchableOpacity
                      onPress={() => deleteApplication(app._id)}
                      style={styles.deleteBtn}
                    >
                      <Text style={styles.deleteBtnText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </GlassCard>
              );
            })}
          </>
        )}

      </ScrollView>

      {/* Track Application Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalHeading}>Track Application</Text>
            
            <Text style={styles.inputLabel}>Job Title *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Frontend Engineer Intern"
              placeholderTextColor={colors.textMuted}
              value={modalTitle}
              onChangeText={setModalTitle}
            />

            <Text style={styles.inputLabel}>Company Name *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Google, Startup X"
              placeholderTextColor={colors.textMuted}
              value={modalCompany}
              onChangeText={setModalCompany}
            />

            <Text style={styles.inputLabel}>Status</Text>
            <View style={styles.statusSelectRow}>
              {APP_STATUSES.map(s => (
                <TouchableOpacity
                  key={s}
                  style={[styles.statusOption, modalStatus === s && styles.statusOptionActive]}
                  onPress={() => setModalStatus(s)}
                >
                  <Text style={[styles.statusOptionText, modalStatus === s && styles.statusOptionTextActive]}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Next Step / Deadline</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Assessment due Friday"
              placeholderTextColor={colors.textMuted}
              value={modalDeadline}
              onChangeText={setModalDeadline}
            />

            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              style={[styles.modalInput, { height: 60 }]}
              placeholder="e.g. Applied via referral, round 1 technical interview"
              placeholderTextColor={colors.textMuted}
              value={modalNotes}
              onChangeText={setModalNotes}
              multiline
            />

            <View style={styles.modalBtnRow}>
              <Button
                title="Cancel"
                type="secondary"
                onPress={() => setModalVisible(false)}
                style={{ flex: 1 }}
              />
              <Button
                title="Save Application"
                type="primary"
                loading={savingApp}
                onPress={handleSaveModalApplication}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>

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
  tabNavRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: colors.radiusMd,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    marginBottom: 4,
  },
  tabNavBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: colors.radiusSm,
  },
  activeTabNavBtn: {
    backgroundColor: colors.accentViolet,
  },
  tabNavText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  activeTabNavText: {
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
    gap: 6,
    paddingVertical: 2,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeChip: {
    backgroundColor: colors.accentTeal,
    borderColor: colors.accentTeal,
  },
  activeChipViolet: {
    backgroundColor: colors.accentViolet,
    borderColor: colors.accentViolet,
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
  activeChipTextViolet: {
    color: '#FFFFFF',
    fontWeight: '800',
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
  oppCard: {
    gap: 10,
    padding: 14,
  },
  oppHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  oppLogo: {
    fontSize: 26,
  },
  oppCompany: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accentTeal,
    letterSpacing: 1,
  },
  oppTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  bookmarkBtn: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 18,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  metaPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
  },
  oppDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  skillBadgeText: {
    color: colors.accentViolet,
    fontSize: 10,
    fontWeight: '700',
  },
  deadlineText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1,
    borderColor: colors.accentTeal,
    borderRadius: colors.radiusSm,
    paddingVertical: 8,
    alignItems: 'center',
  },
  applyBtnText: {
    color: colors.accentTeal,
    fontSize: 12,
    fontWeight: '800',
  },
  trackBtn: {
    flex: 1,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: colors.accentViolet,
    borderRadius: colors.radiusSm,
    paddingVertical: 8,
    alignItems: 'center',
  },
  trackBtnText: {
    color: colors.accentViolet,
    fontSize: 12,
    fontWeight: '800',
  },
  trackerHeaderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  trackerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  trackerSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  addAppBtn: {
    backgroundColor: colors.accentTeal,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addAppBtnText: {
    color: '#030610',
    fontSize: 11,
    fontWeight: '800',
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
  appCard: {
    gap: 8,
    padding: 14,
  },
  appCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appCardCompany: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accentTeal,
    letterSpacing: 1,
  },
  appCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  appNotes: {
    fontSize: 12,
    color: colors.textSecondary,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: 8,
    borderRadius: 6,
  },
  appDeadline: {
    fontSize: 11,
    color: colors.accentAmber,
    fontWeight: '700',
  },
  appFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
    paddingTop: 6,
  },
  appliedDateText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  deleteBtn: {
    padding: 4,
  },
  deleteBtnText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 16,
  },
  modalBox: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusMd,
    padding: 18,
    gap: 10,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 2,
  },
  modalInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    padding: 8,
    color: colors.textPrimary,
    fontSize: 13,
  },
  statusSelectRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  statusOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusOptionActive: {
    backgroundColor: colors.accentViolet,
    borderColor: colors.accentViolet,
  },
  statusOptionText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
  statusOptionTextActive: {
    color: '#FFFFFF',
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
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
  emptyCard: {
    alignItems: 'center',
    padding: 24,
    marginVertical: 16,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptyMessage: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  clearFilterBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: colors.radiusSm,
  },
  clearFilterBtnText: {
    color: colors.accentTeal,
    fontSize: 12,
    fontWeight: '700',
  },
});
