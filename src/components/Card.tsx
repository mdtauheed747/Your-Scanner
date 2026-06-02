/**
 * Card Component
 * Reusable card container with shadow
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../styles/colors';
import { SPACING, RADIUS, SHADOWS } from '../styles/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = SPACING.lg,
  shadow = 'md',
  onPress,
}) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: COLORS.lightBackground,
      borderRadius: RADIUS.lg,
      padding,
      ...(shadow === 'sm' && SHADOWS.sm),
      ...(shadow === 'md' && SHADOWS.md),
      ...(shadow === 'lg' && SHADOWS.lg),
    },
  });

  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};
