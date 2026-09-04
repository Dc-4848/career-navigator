import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { colors } from '../theme/colors';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const SAMPLE_HACKATHONS = [
  { id: '1', title: 'Smart India Hackathon 2026', organizer: 'Government of India', theme: 'AI, HealthTech, Smart Cities', prize: '₹1,00,000+', deadline: 'Oct 15, 2026', link: 'https://sih.gov.in' },
  { id: '2', title: 'Devpost AI Innovation Challenge', organizer: 'Devpost & Partners', theme: 'Open-Source Local AI Apps', prize: '$10,000', deadline: 'Sep 30, 2026', link: 'https://devpost.com' },
  { id: '3', title: 'Unstop National Tech Challenge', organizer: 'Unstop Campus', theme: 'Full Stack & Cloud Apps', prize: 'PPO & Cash Prizes', deadline: 'Oct 05, 2026', link: 'https://unstop.com' },
  { id: '4', title: 'MLH Global Hack Week', organizer: 'Major League Hacking', theme: 'Beginner Friendly Hackathon', prize: 'Swag & Mentorship', deadline: 'Nov 12, 2026', link: 'https://mlh.io' },
];

export default function HackathonsScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filtered = SAMPLE_HACKATHONS.filter(h =>
    h.title.toLowerCase().includes(search.toLowerCase()) ||
    h.theme.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Hackathon Explorer" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search hackathons, themes..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {filtered.map((hack) => (
          <GlassCard key={hack.id} style={styles.hackCard}>
            <View style={styles.badgeRow}>
              <Text style={styles.badgeRose}>🏆 COMPETITIVE EVENT</Text>
              <Text style={styles.deadlineText}>Deadline: {hack.deadline}</Text>
            </View>

            <Text style={styles.hackTitle}>{hack.title}</Text>
            <Text style={styles.hackOrganizer}>Organized by {hack.organizer}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Theme: <Text style={styles.infoValue}>{hack.theme}</Text></Text>
              <Text style={styles.infoLabel}>Prize Pool: <Text style={styles.prizeValue}>{hack.prize}</Text></Text>
            </View>

            <Button
              title="Register on Event Page ↗"
              type="violet"
              onPress={() => Linking.openURL(hack.link)}
              style={{ marginTop: 6 }}
            />
          </GlassCard>
        ))}
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
  hackCard: {
    gap: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeRose: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accentRose,
  },
  deadlineText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  hackTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  hackOrganizer: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  infoRow: {
    gap: 2,
    marginTop: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  infoValue: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  prizeValue: {
    color: colors.accentTeal,
    fontWeight: '800',
  },
});
