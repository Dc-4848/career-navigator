import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

export default function Button({ title, onPress, type = 'primary', loading, disabled, testID, accessibilityLabel, style }) {
  const isPrimary = type === 'primary';
  const isViolet = type === 'violet';

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        isPrimary && styles.btnPrimary,
        isViolet && styles.btnViolet,
        !isPrimary && !isViolet && styles.btnSecondary,
        (disabled || loading) && styles.btnDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityLabel={accessibilityLabel || testID || title}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.bgPrimary : colors.accentTeal} size="small" />
      ) : (
        <Text style={[styles.btnText, isPrimary && styles.btnTextPrimary, !isPrimary && !isViolet && styles.btnTextSecondary]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: colors.radiusFull,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnPrimary: {
    backgroundColor: colors.accentTeal,
  },
  btnViolet: {
    backgroundColor: colors.accentViolet,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  btnTextPrimary: {
    color: colors.bgPrimary,
  },
  btnTextSecondary: {
    color: colors.textPrimary,
  },
});
