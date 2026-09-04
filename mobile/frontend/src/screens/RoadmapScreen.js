import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import api from '../api/api';

export default function RoadmapScreen() {
  const { profile, selectedDomain, roadmap, setRoadmap, saveRoadmapProgress } = useMobileApp();

  const [activeWeek, setActiveWeek] = useState(1);
  const [completedWeeks, setCompletedWeeks] = useState(roadmap?.completedWeeks || []);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (roadmap?.completedWeeks) {
      setCompletedWeeks(roadmap.completedWeeks);
    }
  }, [roadmap]);

  const domainName = typeof selectedDomain === 'string' ? selectedDomain : (selectedDomain?.name || 'Web Development');

  const weeksList = roadmap?.weeks || Array.from({ length: 12 }, (_, i) => ({
    weekNumber: i + 1,
    title: `Week ${i + 1}: ${domainName} Core Concepts`,
    description: `Master fundamental concepts, practical syntax, and hands-on exercises for Week ${i + 1}.`,
    topics: ['Fundamentals & Setup', 'Core Syntax', 'Practical Project', 'Code Optimization'],
    resource: { name: 'Official Documentation & Guides', url: 'https://developer.mozilla.org' }
  }));

  const handleToggleComplete = async (weekNum) => {
    let next;
    if (completedWeeks.includes(weekNum)) {
      next = completedWeeks.filter(w => w !== weekNum);
    } else {
      next = [...completedWeeks, weekNum];
    }
    setCompletedWeeks(next);
    await saveRoadmapProgress(next);
  };

  const handleGenerateAI = async () => {
    try {
      setGenerating(true);
      const res = await api.post('/ai/generate-roadmap', {
        degree: profile.degree || 'B.Tech',
        year: profile.year || '3rd Year',
        skills: profile.skills || ['JavaScript'],
        interests: profile.interests || ['Web Apps'],
        goal: profile.goal || 'Full Stack Engineer',
        selectedDomain: domainName,
      });

      if (res.data?.weeks) {
        setRoadmap(res.data);
      }
    } catch (err) {
      console.warn('AI Roadmap error:', err.message);
    } finally {
      setGenerating(false);
    }
  };

  const currentWeekData = weeksList.find(w => (w.weekNumber || w.week) === activeWeek) || weeksList[0];
  const progressPercent = Math.round((completedWeeks.length / 12) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="12-Week Roadmap" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Progress Header */}
        <GlassCard highlight style={styles.progressCard}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.badgeText}>🗺️ MASTER CURRICULUM</Text>
              <Text style={styles.domainTitle}>{domainName} Plan</Text>
            </View>
            <Text style={styles.percentText}>{progressPercent}%</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>

          <View style={styles.subRow}>
            <Text style={styles.subText}>{completedWeeks.length} of 12 Weeks Completed</Text>
            <TouchableOpacity onPress={handleGenerateAI} disabled={generating}>
              <Text style={styles.aiGenText}>
                {generating ? 'Generating...' : '✨ Regenerate with AI'}
              </Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Week Selector Chips */}
        <Text style={styles.sectionHeading}>Select Week:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weekChipsScroll}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((wNum) => {
            const isDone = completedWeeks.includes(wNum);
            const isActive = activeWeek === wNum;
            return (
              <TouchableOpacity
                key={wNum}
                style={[
                  styles.weekChip,
                  isActive && styles.activeWeekChip,
                  isDone && styles.doneWeekChip
                ]}
                onPress={() => setActiveWeek(wNum)}
              >
                <Text style={[styles.weekChipText, isActive && styles.activeWeekChipText]}>
                  {isDone ? '✓ ' : ''}W{wNum}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Current Active Week Card */}
        {currentWeekData ? (
          <GlassCard style={styles.weekCard}>
            <View style={styles.weekCardHeader}>
              <Text style={styles.weekNumTitle}>Week {activeWeek}</Text>
              <TouchableOpacity
                style={[
                  styles.completeToggleBtn,
                  completedWeeks.includes(activeWeek) && styles.completeToggleBtnDone
                ]}
                onPress={() => handleToggleComplete(activeWeek)}
                testID="progress-task"
                accessibilityLabel="progress-task"
              >
                <Text style={[
                  styles.completeToggleText,
                  completedWeeks.includes(activeWeek) && styles.completeToggleTextDone
                ]}>
                  {completedWeeks.includes(activeWeek) ? '✓ Completed' : 'Mark Complete'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.weekTitle}>{currentWeekData.title}</Text>
            <Text style={styles.weekDesc}>{currentWeekData.description || currentWeekData.objective}</Text>

            <Text style={styles.topicHeading}>⚡ Core Topics & Tasks:</Text>
            <View style={styles.topicsList}>
              {(currentWeekData.topics || ['Concept Deep Dive', 'Building Demo Feature', 'Code Review']).map((top, idx) => (
                <View key={idx} style={styles.topicRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.topicText}>{typeof top === 'string' ? top : top.title || top.name}</Text>
                </View>
              ))}
            </View>

            {/* Verified Learning Resource */}
            {currentWeekData.resource ? (
              <View style={styles.resourceBox}>
                <Text style={styles.resourceLabel}>📚 Verified Learning Resource:</Text>
                <TouchableOpacity onPress={() => Linking.openURL(currentWeekData.resource.url || 'https://developer.mozilla.org')}>
                  <Text style={styles.resourceUrl}>
                    {currentWeekData.resource.name || 'Official Documentation'} ↗
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </GlassCard>
        ) : null}

        <Button
          title="✨ Generate Personalized AI Roadmap"
          type="violet"
          onPress={handleGenerateAI}
          loading={generating}
          testID="roadmap-generate"
          accessibilityLabel="roadmap-generate"
          style={{ marginTop: 12 }}
        />
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
  progressCard: {
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accentTeal,
  },
  domainTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  percentText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.accentTeal,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accentTeal,
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  aiGenText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accentViolet,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  weekChipsScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  weekChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: colors.radiusFull,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: colors.glassBorder,
    borderWidth: 1,
  },
  activeWeekChip: {
    borderColor: colors.accentTeal,
    backgroundColor: colors.accentTealDim,
  },
  doneWeekChip: {
    borderColor: colors.accentViolet,
  },
  weekChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  activeWeekChipText: {
    color: colors.accentTeal,
  },
  weekCard: {
    gap: 10,
  },
  weekCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekNumTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.accentViolet,
  },
  completeToggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: colors.radiusFull,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  completeToggleBtnDone: {
    borderColor: colors.accentTeal,
    backgroundColor: colors.accentTealDim,
  },
  completeToggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  completeToggleTextDone: {
    color: colors.accentTeal,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  weekDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  topicHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 4,
  },
  topicsList: {
    gap: 6,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulletDot: {
    color: colors.accentTeal,
    fontSize: 16,
  },
  topicText: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  resourceBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: 'rgba(0, 245, 196, 0.03)',
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: colors.radiusSm,
    gap: 2,
  },
  resourceLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  resourceUrl: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accentTeal,
  },
});
