import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { useMobileApp } from '../context/MobileAppContext';

export default function Header({ title, showBack, onBack, rightAction }) {
  const { user, logout } = useMobileApp();
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity style={styles.backBtn} onPress={onBack} accessibilityLabel="Back">
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.logoIcon}>
            <Text style={styles.logoEmoji}>🧭</Text>
          </View>
        )}
        <Text style={styles.titleText}>{title || 'Career Navigator'}</Text>
      </View>

      <View style={styles.rightContainer}>
        {rightAction ? (
          rightAction
        ) : user ? (
          <View style={styles.userSection}>
            <View style={styles.avatarPill}>
              <Text style={styles.avatarText}>{userInitial}</Text>
            </View>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={logout}
              testID="logout-button"
              accessibilityLabel="logout-button"
            >
              <Text style={styles.logoutText}>Exit</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: 'rgba(3, 6, 16, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: colors.radiusSm,
    backgroundColor: colors.accentTealDim,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  logoEmoji: {
    fontSize: 16,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  backBtn: {
    padding: 6,
  },
  backText: {
    fontSize: 22,
    color: colors.accentTeal,
    fontWeight: '600',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accentTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.bgPrimary,
  },
  logoutBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: colors.radiusSm,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  logoutText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
