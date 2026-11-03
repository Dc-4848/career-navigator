import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const TECH_DOMAINS = [
  { id: 'webdev', name: 'Web Development', icon: '🌐', tagline: 'Build modern responsive web applications & backend APIs', skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'MongoDB'] },
  { id: 'aiml', name: 'AI & Machine Learning', icon: '🤖', tagline: 'Build intelligent models, neural networks & LLM integrations', skills: ['Python', 'PyTorch', 'Scikit-learn', 'SQL', 'NLP'] },
  { id: 'mobile', name: 'Mobile App Development', icon: '📱', tagline: 'Create native iOS & Android applications with React Native', skills: ['React Native', 'TypeScript', 'Expo', 'Mobile UI', 'REST APIs'] },
  { id: 'cyber', name: 'Cybersecurity Analyst', icon: '🛡️', tagline: 'Protect networks, audit security vulnerabilities & defend systems', skills: ['Networking', 'Linux', 'Ethical Hacking', 'OWASP', 'Python'] },
  { id: 'datasci', name: 'Data Science & Analytics', icon: '📊', tagline: 'Extract insights from complex data, build predictive pipelines', skills: ['Python', 'Pandas', 'SQL', 'Tableau', 'Statistics'] },
  { id: 'cloud', name: 'Cloud & DevOps', icon: '☁️', tagline: 'Automate deployments, manage AWS infrastructure & Kubernetes', skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'] },
];

export default function DomainsScreen({ navigation }) {
  const { selectedDomain, saveDomainSelection } = useMobileApp();
  const [selectedId, setSelectedId] = useState(
    typeof selectedDomain === 'string' ? selectedDomain : (selectedDomain?.id || 'webdev')
  );
  const [savingId, setSavingId] = useState(null);

  const handleSelect = async (domain) => {
    try {
      setSelectedId(domain.id);
      setSavingId(domain.id);
      await saveDomainSelection(domain);
      // Navigate to RoadmapTab nested inside MainTabs
      navigation.navigate('MainTabs', { screen: 'RoadmapTab' });
    } catch (e) {
      console.warn('Select domain error:', e);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tech Domains" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.bannerBox}>
          <Text style={styles.badgeText}>🧭 STEP 2</Text>
          <Text style={styles.bannerTitle}>Explore Tech Domains</Text>
          <Text style={styles.bannerSubtitle}>Select your primary specialization to build your AI roadmap</Text>
        </View>

        {TECH_DOMAINS.map((domain) => {
          const isSelected = selectedId === domain.id;
          return (
            <GlassCard key={domain.id} highlight={isSelected} style={styles.domainCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.domainIcon}>{domain.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.domainName}>{domain.name}</Text>
                  <Text style={styles.domainTagline}>{domain.tagline}</Text>
                </View>
              </View>

              <Text style={styles.skillsLabel}>Required Skills:</Text>
              <View style={styles.skillsRow}>
                {domain.skills.map((skill, idx) => (
                  <View key={idx} style={styles.skillPill}>
                    <Text style={styles.skillPillText}>{skill}</Text>
                  </View>
                ))}
              </View>

              <Button
                title={isSelected ? 'Selected Domain ✓' : `Select ${domain.name}`}
                type={isSelected ? 'violet' : 'secondary'}
                onPress={() => handleSelect(domain)}
                loading={savingId === domain.id}
                testID="domain-select"
                accessibilityLabel="domain-select"
                style={{ marginTop: 10 }}
              />
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
    marginBottom: 8,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accentViolet,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  domainCard: {
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  domainIcon: {
    fontSize: 28,
  },
  domainName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  domainTagline: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  skillsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 4,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  skillPillText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
});
