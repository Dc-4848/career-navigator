import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import api from '../api/api';

const SAMPLE_INTERNSHIPS = [
  { _id: '1', title: 'Frontend React Developer Intern', company: 'TechInnovate Solutions', location: 'Remote (India)', matchScore: 92, level: 'Intermediate', link: 'https://linkedin.com/jobs', skills: ['JavaScript', 'React', 'HTML/CSS', 'Git'] },
  { _id: '2', title: 'Full Stack Node.js Intern', company: 'CloudNexus Tech', location: 'Bengaluru, KA', matchScore: 85, level: 'Beginner', link: 'https://internshala.com', skills: ['Node.js', 'Express', 'MongoDB', 'JavaScript'] },
  { _id: '3', title: 'AI & Data Science Trainee', company: 'DataBrain AI Labs', location: 'Hyderabad, TS', matchScore: 78, level: 'Intermediate', link: 'https://unstop.com', skills: ['Python', 'SQL', 'Pandas', 'Scikit-learn'] },
  { _id: '4', title: 'Mobile React Native Intern', company: 'AppCraft Software', location: 'Remote', matchScore: 88, level: 'Intermediate', link: 'https://linkedin.com/jobs', skills: ['React Native', 'JavaScript', 'TypeScript', 'Expo'] },
  { _id: '5', title: 'Cybersecurity Associate Intern', company: 'SecureShield Corp', location: 'Pune, MH', matchScore: 70, level: 'Advanced', link: 'https://unstop.com', skills: ['Linux', 'Networking', 'OWASP', 'Python'] },
];

export default function JobsScreen() {
  const { savedInternships, bookmarkInternship } = useMobileApp();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredJobs = SAMPLE_INTERNSHIPS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                          job.company.toLowerCase().includes(search.toLowerCase()) ||
                          job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));

    const isSaved = savedInternships.some(s => s._id === job._id || s.title === job.title);

    if (activeFilter === 'Saved') return isSaved && matchesSearch;
    if (activeFilter !== 'All') return job.level === activeFilter && matchesSearch;
    return matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Internships & Opportunities" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search roles, companies, skills..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            testID="job-search"
            accessibilityLabel="job-search"
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabsScroll}>
          {['All', 'Beginner', 'Intermediate', 'Advanced', 'Saved'].map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.filterTab, isActive && styles.activeFilterTab]}
                onPress={() => setActiveFilter(tab)}
                testID="job-filter"
                accessibilityLabel="job-filter"
              >
                <Text style={[styles.filterTabText, isActive && styles.activeFilterTabText]}>
                  {tab === 'Saved' ? `🔖 Saved (${savedInternships.length})` : tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isSaved = savedInternships.some(s => s._id === job._id || s.title === job.title);
            return (
              <GlassCard key={job._id} style={styles.jobCard}>
                <View style={styles.jobHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.jobCompany}>{job.company} • {job.location}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.bookmarkBtn, isSaved && styles.bookmarkBtnSaved]}
                    onPress={() => bookmarkInternship(job)}
                  >
                    <Text style={styles.bookmarkText}>{isSaved ? '🔖 Saved' : '🔖 Save'}</Text>
                  </TouchableOpacity>
                </View>

                {/* Match Score Bar */}
                <View style={styles.matchBarRow}>
                  <Text style={styles.matchLabel}>Match Score: <Text style={styles.matchValue}>{job.matchScore}%</Text></Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${job.matchScore}%` }]} />
                  </View>
                </View>

                {/* Skill Chips */}
                <View style={styles.skillsRow}>
                  {job.skills.map((sk, idx) => (
                    <View key={idx} style={styles.skillChip}>
                      <Text style={styles.skillChipText}>{sk}</Text>
                    </View>
                  ))}
                </View>

                <Button
                  title="Apply Now ↗"
                  onPress={() => Linking.openURL(job.link)}
                  style={{ marginTop: 8 }}
                />
              </GlassCard>
            );
          })
        ) : (
          <GlassCard style={{ alignItems: 'center', padding: 24 }}>
            <Text style={{ fontSize: 24, marginBottom: 8 }}>💼</Text>
            <Text style={{ color: colors.textPrimary, fontWeight: '700', fontSize: 16 }}>No internships found</Text>
            <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>Try clearing your search query or filter tab</Text>
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
  searchBox: {
    marginBottom: 4,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusMd,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: 14,
  },
  filterTabsScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: colors.radiusFull,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: colors.glassBorder,
    borderWidth: 1,
  },
  activeFilterTab: {
    borderColor: colors.accentTeal,
    backgroundColor: colors.accentTealDim,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  activeFilterTabText: {
    color: colors.accentTeal,
  },
  jobCard: {
    gap: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  jobCompany: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  bookmarkBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: colors.radiusFull,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  bookmarkBtnSaved: {
    borderColor: colors.accentTeal,
    backgroundColor: colors.accentTealDim,
  },
  bookmarkText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accentTeal,
  },
  matchBarRow: {
    gap: 4,
  },
  matchLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  matchValue: {
    color: colors.accentTeal,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accentTeal,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: colors.radiusSm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  skillChipText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
});
