import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';

export default function HomeScreen({ navigation }) {
  const {
    user,
    profile,
    selectedDomain,
    dashboardStats,
    recommendations,
    roadmapsCatalog,
    bookmarkedResources,
    applications,
  } = useMobileApp();

  const userSkills = profile.skills || [];

  // Calculate profile completion checklist
  const checklist = [
    { label: 'Degree / Program', completed: !!profile.degree },
    { label: 'Current Year', completed: !!profile.year },
    { label: 'Skills Added', completed: userSkills.length > 0 },
    { label: 'Interests Selected', completed: Array.isArray(profile.interests) && profile.interests.length > 0 },
    { label: 'Career Goal', completed: !!profile.goal },
    { label: 'Target Domain', completed: !!selectedDomain },
  ];
  const completedCount = checklist.filter(i => i.completed).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);

  const domainName = typeof selectedDomain === 'string' ? selectedDomain : (selectedDomain?.name || 'Full Stack Web Development');
  const activeRoadmaps = dashboardStats?.learning?.activeRoadmaps || [];
  const primaryRoadmap = activeRoadmaps[0] || (roadmapsCatalog && roadmapsCatalog[0]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Student Dashboard" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Welcome Greeting */}
        <GlassCard highlight style={styles.welcomeCard}>
          <View style={styles.badgeRow}>
            <Text style={styles.badgeText}>🚀 CAREER NAVIGATOR</Text>
            <View style={styles.statusDotRow}>
              <View style={styles.liveDot} />
              <Text style={styles.liveStatusText}>ATLAS CONNECTED</Text>
            </View>
          </View>
          <Text style={styles.welcomeTitle}>
            Welcome back, <Text style={styles.tealText}>{user?.name || 'Explorer'}</Text>!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            {profile.goal ? `Targeting: ${profile.goal}` : 'Discover your high-growth tech career path'}
          </Text>
          
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => navigation.navigate('ProfileModal')}
          >
            <Text style={styles.editProfileText}>Edit Student Profile →</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Actionable Next Step Alert Banner */}
        {dashboardStats?.nextStep ? (
          <GlassCard style={styles.nextStepBanner}>
            <View style={styles.nextStepIconBox}>
              <Text style={{ fontSize: 18 }}>💡</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nextStepLabel}>RECOMMENDED NEXT STEP</Text>
              <Text style={styles.nextStepText}>{dashboardStats.nextStep}</Text>
            </View>
          </GlassCard>
        ) : null}

        {/* Top 4 Metrics Grid */}
        <View style={styles.statsGrid}>
          <GlassCard style={styles.statBox}>
            <Text style={styles.statIcon}>🗺️</Text>
            <Text style={styles.statNumber}>{dashboardStats?.learning?.totalCompletedStages || 0}</Text>
            <Text style={styles.statLabel}>Stages Mastered</Text>
          </GlassCard>
          <GlassCard style={styles.statBox}>
            <Text style={styles.statIcon}>📚</Text>
            <Text style={styles.statNumber}>{bookmarkedResources?.length || 0}</Text>
            <Text style={styles.statLabel}>Saved Resources</Text>
          </GlassCard>
          <GlassCard style={styles.statBox}>
            <Text style={styles.statIcon}>📋</Text>
            <Text style={styles.statNumber}>{applications?.length || 0}</Text>
            <Text style={styles.statLabel}>Jobs Tracked</Text>
          </GlassCard>
          <GlassCard style={styles.statBox}>
            <Text style={styles.statIcon}>⚡</Text>
            <Text style={styles.statNumber}>{userSkills.length}</Text>
            <Text style={styles.statLabel}>Profile Skills</Text>
          </GlassCard>
        </View>

        {/* Active Learning Roadmap Card */}
        {primaryRoadmap ? (
          <GlassCard highlight style={styles.activeRoadmapCard}>
            <View style={styles.roadmapCardHeader}>
              <Text style={styles.activeTag}>CURRENT ACTIVE ROADMAP</Text>
              <Text style={styles.roadmapPercent}>{primaryRoadmap.percent || primaryRoadmap.progressPercent || 0}%</Text>
            </View>
            <Text style={styles.activeRoadmapTitle}>{primaryRoadmap.title}</Text>

            {/* Progress Bar */}
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.max(6, primaryRoadmap.percent || primaryRoadmap.progressPercent || 0)}%` },
                ]}
              />
            </View>

            <View style={styles.roadmapFooter}>
              <Text style={styles.stageIndicatorText}>
                Stage {primaryRoadmap.activeStage || 1} of {primaryRoadmap.totalStages || 6}
              </Text>
              <TouchableOpacity
                style={styles.continueRoadmapBtn}
                onPress={() => navigation.navigate('RoadmapTab')}
              >
                <Text style={styles.continueRoadmapText}>Continue Learning →</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        ) : null}

        {/* Personalized Career Recommendations (CareerCaffe-Inspired) */}
        {recommendations?.recommendedRoadmaps?.length > 0 ? (
          <View style={styles.recommendationsSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>🎯 Personalized Recommendations</Text>
              <Text style={styles.sectionSub}>Based on your profile skills & goal</Text>
            </View>

            {recommendations.recommendedRoadmaps.slice(0, 2).map((rec, rIdx) => (
              <GlassCard key={rIdx} style={styles.recCard}>
                <View style={styles.recHeaderRow}>
                  <Text style={styles.recIcon}>{rec.icon || '🧭'}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recTitle}>{rec.title}</Text>
                    <Text style={styles.recMatchScore}>Match: {rec.matchScore}%</Text>
                  </View>
                </View>
                <Text style={styles.recReason}>💡 {rec.recommendationReason}</Text>
                <TouchableOpacity
                  style={styles.recActionBtn}
                  onPress={() => navigation.navigate('RoadmapTab')}
                >
                  <Text style={styles.recActionBtnText}>Explore Roadmap →</Text>
                </TouchableOpacity>
              </GlassCard>
            ))}
          </View>
        ) : null}

        {/* Quick Navigation Hub */}
        <Text style={styles.sectionTitle}>Career Accelerator Hub</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('CommunityTab')}
          >
            <Ionicons name="chatbubbles-outline" size={24} color={colors.accentTeal} style={{ marginBottom: 6 }} />
            <Text style={styles.actionTitle}>Community</Text>
            <Text style={styles.actionSub}>Polls & Updates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('RoadmapTab')}
          >
            <Ionicons name="map-outline" size={24} color={colors.accentTeal} style={{ marginBottom: 6 }} />
            <Text style={styles.actionTitle}>Roadmaps</Text>
            <Text style={styles.actionSub}>12+ Categories</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('ResourcesTab')}
          >
            <Ionicons name="library-outline" size={24} color={colors.accentTeal} style={{ marginBottom: 6 }} />
            <Text style={styles.actionTitle}>Resources</Text>
            <Text style={styles.actionSub}>Verified Library</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('JobsTab')}
          >
            <Ionicons name="briefcase-outline" size={24} color={colors.accentTeal} style={{ marginBottom: 6 }} />
            <Text style={styles.actionTitle}>Opportunities</Text>
            <Text style={styles.actionSub}>Jobs & Tracker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('ResumeTab')}
          >
            <Ionicons name="document-text-outline" size={24} color={colors.accentTeal} style={{ marginBottom: 6 }} />
            <Text style={styles.actionTitle}>Resume ATS</Text>
            <Text style={styles.actionSub}>Instant Score</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('DomainsModal')}
          >
            <Ionicons name="globe-outline" size={24} color={colors.accentTeal} style={{ marginBottom: 6 }} />
            <Text style={styles.actionTitle}>Tech Domains</Text>
            <Text style={styles.actionSub}>Specializations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('HackathonsModal')}
          >
            <Ionicons name="trophy-outline" size={24} color={colors.accentTeal} style={{ marginBottom: 6 }} />
            <Text style={styles.actionTitle}>Hackathons</Text>
            <Text style={styles.actionSub}>Build & Win</Text>
          </TouchableOpacity>
        </View>

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
    gap: 14,
  },
  welcomeCard: {
    gap: 10,
    padding: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accentViolet,
    letterSpacing: 1,
  },
  statusDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentEmerald,
  },
  liveStatusText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.accentEmerald,
    letterSpacing: 0.5,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  tealText: {
    color: colors.accentTeal,
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  editProfileBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 4,
  },
  editProfileText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  nextStepBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderColor: colors.accentViolet,
  },
  nextStepIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextStepLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.accentViolet,
    letterSpacing: 1,
  },
  nextStepText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
    marginTop: 2,
    lineHeight: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '700',
    textAlign: 'center',
  },
  activeRoadmapCard: {
    gap: 10,
    padding: 16,
    borderColor: colors.accentTeal,
  },
  roadmapCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeTag: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.accentTeal,
    letterSpacing: 1,
  },
  roadmapPercent: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.accentTeal,
  },
  activeRoadmapTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accentTeal,
    borderRadius: 3,
  },
  roadmapFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  stageIndicatorText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  continueRoadmapBtn: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderWidth: 1,
    borderColor: colors.accentTeal,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  continueRoadmapText: {
    color: colors.accentTeal,
    fontSize: 11,
    fontWeight: '800',
  },
  recommendationsSection: {
    gap: 10,
  },
  sectionHeaderRow: {
    gap: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sectionSub: {
    fontSize: 11,
    color: colors.textMuted,
  },
  recCard: {
    gap: 8,
    padding: 14,
  },
  recHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recIcon: {
    fontSize: 24,
  },
  recTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  recMatchScore: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accentEmerald,
  },
  recReason: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  recActionBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    borderWidth: 1,
    borderColor: colors.accentViolet,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 2,
  },
  recActionBtnText: {
    color: colors.accentViolet,
    fontSize: 11,
    fontWeight: '800',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusMd,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 22,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  actionSub: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '600',
  },
});
