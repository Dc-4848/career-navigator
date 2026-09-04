import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';

export default function HomeScreen({ navigation }) {
  const { user, profile, selectedDomain, savedInternships } = useMobileApp();

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

  const domainName = typeof selectedDomain === 'string' ? selectedDomain : (selectedDomain?.name || 'Web Development');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Dashboard" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Welcome Greeting */}
        <GlassCard highlight style={styles.welcomeCard}>
          <Text style={styles.badgeText}>🚀 Student Dashboard</Text>
          <Text style={styles.welcomeTitle}>
            Welcome back, <Text style={styles.tealText}>{user?.name || 'Explorer'}</Text>!
          </Text>
          <Text style={styles.welcomeSubtitle}>Your career readiness & personalized AI roadmap</Text>
          
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => navigation.navigate('ProfileModal')}
          >
            <Text style={styles.editProfileText}>Edit Student Profile →</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Top Metrics Row */}
        <View style={styles.metricsRow}>
          {/* Profile Completion */}
          <GlassCard style={styles.metricCard}>
            <Text style={styles.metricHeader}>📋 Profile Completion</Text>
            <Text style={styles.metricBigNum}>{completionPercentage}%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${completionPercentage}%` }]} />
            </View>
            <Text style={styles.metricSub}>{completedCount} of 6 milestones set</Text>
          </GlassCard>

          {/* Recommended Domain */}
          <GlassCard style={styles.metricCard}>
            <Text style={styles.metricHeader}>🧭 Target Domain</Text>
            <Text style={styles.domainNameText}>{domainName}</Text>
            <Text style={styles.metricSub}>Active career path</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DomainsModal')}>
              <Text style={styles.linkText}>Change Domain →</Text>
            </TouchableOpacity>
          </GlassCard>

          {/* Saved Opportunities */}
          <GlassCard style={styles.metricCard}>
            <Text style={styles.metricHeader}>💼 Saved Items</Text>
            <View style={styles.savedRow}>
              <View style={styles.savedCol}>
                <Text style={styles.savedNum}>{savedInternships.length}</Text>
                <Text style={styles.savedSub}>Jobs</Text>
              </View>
              <View style={styles.dividerVertical} />
              <View style={styles.savedCol}>
                <Text style={styles.savedNum}>{userSkills.length}</Text>
                <Text style={styles.savedSub}>Skills</Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* Quick Actions Grid */}
        <Text style={styles.sectionHeading}>⚡ Quick Actions</Text>
        
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('ProfileModal')}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionTitle}>Update Profile</Text>
            <Text style={styles.actionDesc}>Degree, skills & goals</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('DomainsModal')}>
            <Text style={styles.actionIcon}>🎯</Text>
            <Text style={styles.actionTitle}>Find My Domain</Text>
            <Text style={styles.actionDesc}>Explore tech paths</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('RoadmapTab')}>
            <Text style={styles.actionIcon}>🗺️</Text>
            <Text style={styles.actionTitle}>View Roadmap</Text>
            <Text style={styles.actionDesc}>12-week step plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('SkillsTab')}>
            <Text style={styles.actionIcon}>⚡</Text>
            <Text style={styles.actionTitle}>Skill Gap</Text>
            <Text style={styles.actionDesc}>BGE-M3 Analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('JobsTab')}>
            <Text style={styles.actionIcon}>💼</Text>
            <Text style={styles.actionTitle}>Internships</Text>
            <Text style={styles.actionDesc}>Explore openings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('HackathonsModal')}>
            <Text style={styles.actionIcon}>🏆</Text>
            <Text style={styles.actionTitle}>Hackathons</Text>
            <Text style={styles.actionDesc}>Upcoming events</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionCard, styles.actionHighlight]} onPress={() => navigation.navigate('ResumeTab')}>
            <Text style={styles.actionIcon}>📄</Text>
            <Text style={styles.actionTitle}>Resume Analyzer</Text>
            <Text style={styles.actionDesc}>Local ATS Scoring</Text>
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
    gap: 16,
  },
  welcomeCard: {
    gap: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accentTeal,
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
    fontSize: 13,
    color: colors.textSecondary,
  },
  editProfileBtn: {
    marginTop: 8,
  },
  editProfileText: {
    color: colors.accentTeal,
    fontSize: 13,
    fontWeight: '700',
  },
  metricsRow: {
    gap: 10,
  },
  metricCard: {
    gap: 6,
  },
  metricHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  metricBigNum: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.accentTeal,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accentTeal,
    borderRadius: 3,
  },
  metricSub: {
    fontSize: 11,
    color: colors.textMuted,
  },
  domainNameText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.accentViolet,
  },
  linkText: {
    color: colors.accentTeal,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  savedCol: {
    alignItems: 'center',
  },
  savedNum: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  savedSub: {
    fontSize: 11,
    color: colors.textMuted,
  },
  dividerVertical: {
    width: 1,
    height: 30,
    backgroundColor: colors.glassBorder,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 6,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusMd,
    padding: 14,
    gap: 4,
  },
  actionHighlight: {
    borderColor: colors.accentViolet,
    backgroundColor: 'rgba(124, 106, 255, 0.04)',
    width: '100%',
  },
  actionIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionDesc: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
