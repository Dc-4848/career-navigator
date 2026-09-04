import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function GlassCard({ children, style, highlight }) {
  return (
    <View style={[styles.card, highlight && styles.highlightCard, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: colors.radiusLg,
    padding: 16,
    marginVertical: 6,
  },
  highlightCard: {
    borderColor: colors.cardBorder,
    backgroundColor: 'rgba(0, 245, 196, 0.03)',
  },
});
