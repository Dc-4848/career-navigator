import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import api from '../api/api';

const TARGET_ROLES = [
  { title: 'Full Stack Engineer', skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'System Design', 'Git'] },
  { title: 'Frontend Developer', skills: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript', 'Next.js', 'Tailwind', 'Git'] },
  { title: 'AI / Machine Learning Engineer', skills: ['Python', 'PyTorch', 'Scikit-learn', 'SQL', 'Deep Learning', 'NLP', 'Git'] },
  { title: 'Data Scientist', skills: ['Python', 'Pandas', 'SQL', 'Tableau', 'Statistics', 'Machine Learning', 'Git'] },
  { title: 'Mobile Developer', skills: ['React Native', 'TypeScript', 'Expo', 'Mobile UI', 'REST APIs', 'Redux', 'Git'] },
  { title: 'Cybersecurity Analyst', skills: ['Networking', 'Linux', 'Ethical Hacking', 'OWASP Top 10', 'Python', 'SIEM'] },
];

export default function SkillsScreen() {
  const { profile } = useMobileApp();
  const userSkills = profile.skills || ['JavaScript', 'React'];

  const [selectedRole, setSelectedRole] = useState(TARGET_ROLES[0]);
  const [matchScore, setMatchScore] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [careerPaths, setCareerPaths] = useState([]);
  const [loadingGap, setLoadingGap] = useState(false);
  const [loadingPaths, setLoadingPaths] = useState(false);

  useEffect(() => {
    analyzeSkillGap(selectedRole);
    fetchCareerPaths();
  }, [selectedRole, profile.skills]);

  const analyzeSkillGap = async (role) => {
    try {
      setLoadingGap(true);
      const res = await api.post('/ai/skill-gap', {
        userSkills,
        targetRoleSkills: role.skills,
        roleTitle: role.title,
      });

      if (typeof res.data?.matchScore === 'number') {
        setMatchScore(res.data.matchScore);
        setExplanation(res.data.explanation || '');
      }
    } catch (err) {
      console.warn('Skill gap error:', err.message);
      // Fallback match calculation
      const matched = role.skills.filter(s => userSkills.some(u => u.toLowerCase() === s.toLowerCase()));
      const calc = Math.round((matched.length / role.skills.length) * 100);
      setMatchScore(calc);
    } finally {
      setLoadingGap(false);
    }
  };

  const fetchCareerPaths = async () => {
    try {
      setLoadingPaths(true);
      const res = await api.post('/ai/career-paths', {
        currentSkills: userSkills,
        degree: profile.degree || 'B.Tech',
        interests: profile.interests || ['Software Engineering'],
        goal: profile.goal || 'Senior Developer',
      });

      if (Array.isArray(res.data?.paths)) {
        setCareerPaths(res.data.paths);
      }
    } catch (err) {
      console.warn('Career paths error:', err.message);
    } finally {
      setLoadingPaths(false);
    }
  };

  const matchedSkills = selectedRole.skills.filter(s => userSkills.some(u => u.toLowerCase() === s.toLowerCase()));
  const missingSkills = selectedRole.skills.filter(s => !userSkills.some(u => u.toLowerCase() === s.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Skill Gap & Career Paths" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Role Selector Header */}
        <Text style={styles.sectionHeading}>Select Target Career Role:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.roleChipsScroll}>
          {TARGET_ROLES.map((role, idx) => {
            const isSelected = selectedRole.title === role.title;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.roleChip, isSelected && styles.activeRoleChip]}
                onPress={() => setSelectedRole(role)}
              >
                <Text style={[styles.roleChipText, isSelected && styles.activeRoleChipText]}>
                  {role.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* BGE-M3 Match Score Card */}
        <GlassCard highlight style={styles.scoreCard}>
          <Text style={styles.badgeText}>⚡ BGE-M3 VECTOR EMBEDDING MATCH</Text>
          <View style={styles.scoreGaugeRow}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNum}>{matchScore}%</Text>
              <Text style={styles.scoreSub}>Match Score</Text>
            </View>
            <View style={styles.scoreSummary}>
              <Text style={styles.roleTitleText}>{selectedRole.title}</Text>
              <Text style={styles.scoreBreakdown}>
                {matchedSkills.length} of {selectedRole.skills.length} Required Skills Matched
              </Text>
            </View>
          </View>

          {explanation ? (
            <View style={styles.explanationBox}>
              <Text style={styles.explanationText}>💡 {explanation}</Text>
            </View>
          ) : null}
        </GlassCard>

        {/* Matched vs Missing Skills Breakdown */}
        <View style={styles.breakdownRow}>
          {/* Matched */}
          <GlassCard style={[styles.halfCard, { borderColor: 'rgba(0, 245, 196, 0.3)' }]}>
            <Text style={styles.cardHeaderTeal}>✓ Matched ({matchedSkills.length})</Text>
            <View style={styles.skillsPillList}>
              {matchedSkills.length > 0 ? (
                matchedSkills.map((s, idx) => (
                  <View key={idx} style={styles.matchedPill}>
                    <Text style={styles.matchedPillText}>{s}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No skills matched yet</Text>
              )}
            </View>
          </GlassCard>

          {/* Missing */}
          <GlassCard style={[styles.halfCard, { borderColor: 'rgba(255, 107, 107, 0.3)' }]}>
            <Text style={styles.cardHeaderRose}>⚠️ Missing ({missingSkills.length})</Text>
            <View style={styles.skillsPillList}>
              {missingSkills.length > 0 ? (
                missingSkills.map((s, idx) => (
                  <View key={idx} style={styles.missingPill}>
                    <Text style={styles.missingPillText}>{s}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>100% Skills Matched!</Text>
              )}
            </View>
          </GlassCard>
        </View>

        {/* AI Alternate Career Paths */}
        <Text style={styles.sectionHeading}>🚀 AI Career Progression Paths:</Text>
        {careerPaths.length > 0 ? (
          careerPaths.map((path, idx) => (
            <GlassCard key={idx} style={styles.pathCard}>
              <View style={styles.pathHeader}>
                <Text style={styles.pathRole}>{path.role || path.title}</Text>
                <Text style={styles.aiBadge}>AI GENERATED</Text>
              </View>
              <Text style={styles.pathDesc}>{path.description || path.overview}</Text>
              
              <Text style={styles.pathReqLabel}>Key Skills to Acquire:</Text>
              <View style={styles.skillsPillList}>
                {(path.requiredSkills || path.skills || []).map((sk, j) => (
                  <View key={j} style={styles.pathPill}>
                    <Text style={styles.pathPillText}>{sk}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          ))
        ) : (
          <GlassCard style={{ alignItems: 'center', padding: 20 }}>
            {loadingPaths ? (
              <ActivityIndicator color={colors.accentViolet} size="small" />
            ) : (
              <Text style={{ color: colors.textMuted, fontSize: 13 }}>Generating AI career paths...</Text>
            )}
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
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  roleChipsScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  roleChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: colors.radiusFull,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: colors.glassBorder,
    borderWidth: 1,
  },
  activeRoleChip: {
    borderColor: colors.accentTeal,
    backgroundColor: colors.accentTealDim,
  },
  roleChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  activeRoleChipText: {
    color: colors.accentTeal,
  },
  scoreCard: {
    gap: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accentTeal,
  },
  scoreGaugeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.accentTeal,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 245, 196, 0.05)',
  },
  scoreNum: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.accentTeal,
  },
  scoreSub: {
    fontSize: 9,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  scoreSummary: {
    flex: 1,
    gap: 4,
  },
  roleTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  scoreBreakdown: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  explanationBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: 10,
    borderRadius: colors.radiusSm,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  explanationText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
  },
  breakdownRow: {
    gap: 10,
  },
  halfCard: {
    gap: 8,
  },
  cardHeaderTeal: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.accentTeal,
  },
  cardHeaderRose: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.accentRose,
  },
  skillsPillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  matchedPill: {
    backgroundColor: colors.accentTealDim,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: colors.radiusFull,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  matchedPillText: {
    color: colors.accentTeal,
    fontSize: 11,
    fontWeight: '700',
  },
  missingPill: {
    backgroundColor: colors.accentRoseDim,
    borderColor: colors.accentRose,
    borderWidth: 1,
    borderRadius: colors.radiusFull,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  missingPillText: {
    color: colors.accentRose,
    fontSize: 11,
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  pathCard: {
    gap: 8,
  },
  pathHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pathRole: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.accentViolet,
  },
  aiBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.accentViolet,
    backgroundColor: colors.accentVioletDim,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pathDesc: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  pathReqLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
  },
  pathPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pathPillText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
});
