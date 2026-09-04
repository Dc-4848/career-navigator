import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const SUGGESTED_SKILLS = [
  'JavaScript', 'React', 'Node.js', 'Python', 'SQL',
  'TypeScript', 'HTML/CSS', 'Git', 'MongoDB', 'Docker'
];

export default function ProfileScreen({ navigation }) {
  const { profile, saveProfileData } = useMobileApp();

  const [degree, setDegree] = useState(profile.degree || '');
  const [year, setYear] = useState(profile.year || '');
  const [skills, setSkills] = useState(profile.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [interests, setInterests] = useState(profile.interests || []);
  const [goal, setGoal] = useState(profile.goal || '');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (profile) {
      setDegree(profile.degree || '');
      setYear(profile.year || '');
      setSkills(profile.skills || []);
      setInterests(profile.interests || []);
      setGoal(profile.goal || '');
    }
  }, [profile]);

  const addSkill = (skillToAdd) => {
    const val = skillToAdd.trim();
    if (val && !skills.some(s => s.toLowerCase() === val.toLowerCase())) {
      setSkills([...skills, val]);
      setNewSkill('');
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccessMsg('');
      await saveProfileData({
        degree,
        year,
        skills,
        interests,
        goal,
      });
      setSuccessMsg('Profile saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Student Profile" showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        {successMsg ? (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>✓ {successMsg}</Text>
          </View>
        ) : null}

        <GlassCard style={styles.card}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Degree / Program</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. B.Tech Computer Science"
              placeholderTextColor={colors.textMuted}
              value={degree}
              onChangeText={setDegree}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Academic Year</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 3rd Year"
              placeholderTextColor={colors.textMuted}
              value={year}
              onChangeText={setYear}
            />
          </View>
        </GlassCard>

        <GlassCard style={styles.card}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          
          {/* Active Skills Chips */}
          <View style={styles.chipsContainer}>
            {skills.map((skill, idx) => (
              <View key={idx} style={styles.skillChip}>
                <Text style={styles.skillChipText}>{skill}</Text>
                <TouchableOpacity onPress={() => removeSkill(idx)}>
                  <Text style={styles.removeText}> ✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Add Skill Input */}
          <View style={styles.addSkillRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Add skill (e.g. React Native)..."
              placeholderTextColor={colors.textMuted}
              value={newSkill}
              onChangeText={setNewSkill}
              onSubmitEditing={() => addSkill(newSkill)}
            />
            <TouchableOpacity style={styles.addBtn} onPress={() => addSkill(newSkill)}>
              <Text style={styles.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {/* Suggested Skills */}
          <Text style={styles.subHint}>Suggested Popular Skills:</Text>
          <View style={styles.chipsContainer}>
            {SUGGESTED_SKILLS.filter(s => !skills.includes(s)).map((suggested, idx) => (
              <TouchableOpacity key={idx} style={styles.suggestChip} onPress={() => addSkill(suggested)}>
                <Text style={styles.suggestText}>+ {suggested}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        <GlassCard style={styles.card}>
          <Text style={styles.sectionTitle}>Career Goal</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Target Role / Dream Goal</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Full-Stack Software Engineer"
              placeholderTextColor={colors.textMuted}
              value={goal}
              onChangeText={setGoal}
            />
          </View>

          <Button
            title="Save Profile Changes"
            onPress={handleSave}
            loading={saving}
            testID="profile-save"
            accessibilityLabel="profile-save"
            style={{ marginTop: 12 }}
          />
        </GlassCard>
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
  successBanner: {
    backgroundColor: colors.accentTealDim,
    borderColor: colors.accentTeal,
    borderWidth: 1,
    borderRadius: colors.radiusSm,
    padding: 12,
  },
  successText: {
    color: colors.accentTeal,
    fontWeight: '700',
    fontSize: 13,
  },
  card: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusMd,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: 14,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentTealDim,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: colors.radiusFull,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skillChipText: {
    color: colors.accentTeal,
    fontSize: 12,
    fontWeight: '700',
  },
  removeText: {
    color: colors.accentRose,
    fontSize: 12,
    fontWeight: '800',
  },
  addSkillRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  addBtn: {
    backgroundColor: colors.accentTeal,
    borderRadius: colors.radiusMd,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addBtnText: {
    color: colors.bgPrimary,
    fontWeight: '700',
    fontSize: 13,
  },
  subHint: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
  },
  suggestChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: colors.radiusFull,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  suggestText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
});
