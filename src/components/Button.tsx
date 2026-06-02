/**
 * Button Component
 * Reusable button with multiple variants
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, LIGHT_THEME } from '../styles/colors';
import { SPACING, RADIUS, SHADOWS } from '../styles/spacing';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RADIUS.md,
      ...(size === 'small' && { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md }),
      ...(size === 'medium' && { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg }),
      ...(size === 'large' && { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl }),
      ...(variant === 'primary' && {
        backgroundColor: COLORS.primary,
        ...SHADOWS.md,
      }),
      ...(variant === 'secondary' && {
        backgroundColor: COLORS.secondary,
        ...SHADOWS.md,
      }),
      ...(variant === 'outline' && {
        borderWidth: 2,
        borderColor: COLORS.primary,
      }),
      ...(variant === 'ghost' && {
        backgroundColor: 'transparent',
      }),
      ...(disabled && {
        opacity: 0.5,
      }),
    },
    text: {
      marginLeft: icon ? SPACING.sm : 0,
      fontWeight: '600',
      color: variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.lightText,
      ...(size === 'small' && { fontSize: 12 }),
      ...(size === 'medium' && { fontSize: 14 }),
      ...(size === 'large' && { fontSize: 16 }),
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {icon && icon}
      <Text style={[styles.text, textStyle]}>{loading ? 'Loading...' : title}</Text>
    </TouchableOpacity>
  );
};
