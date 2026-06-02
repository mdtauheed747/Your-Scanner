/**
 * Home Screen
 * Main landing screen with quick actions
 */

import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDarkMode } from '../hooks/useDarkMode';
import { SPACING, RADIUS } from '../styles/spacing';

interface HomeScreenProps {
  navigation?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useDarkMode();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.xl,
    },
    header: {
      marginBottom: SPACING.xl,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.text,
      marginBottom: SPACING.sm,
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    actionsContainer: {
      marginBottom: SPACING.xl,
    },
    actionButton: {
      backgroundColor: theme.surface,
      borderRadius: RADIUS.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionIcon: {
      fontSize: 32,
      marginRight: SPACING.md,
    },
    actionContent: {
      flex: 1,
    },
    actionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: SPACING.xs,
    },
    actionDescription: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    statsContainer: {
      backgroundColor: theme.surface,
      borderRadius: RADIUS.lg,
      padding: SPACING.lg,
      marginBottom: SPACING.xl,
    },
    statsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: SPACING.md,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.primary,
      marginBottom: SPACING.xs,
    },
    statLabel: {
      fontSize: 12,
      color: theme.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Scanner</Text>
          <Text style={styles.subtitle}>Fast QR Code Scanner & Generator</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation?.navigate('Scanner')}
          >
            <Text style={styles.actionIcon}>📱</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Scan QR Code</Text>
              <Text style={styles.actionDescription}>Scan QR codes using your camera</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation?.navigate('Generator')}
          >
            <Text style={styles.actionIcon}>✨</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Generate QR</Text>
              <Text style={styles.actionDescription}>Create custom QR codes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation?.navigate('History')}
          >
            <Text style={styles.actionIcon}>📋</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>View History</Text>
              <Text style={styles.actionDescription}>Access your scan history</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Today's Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Scanned</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Generated</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Shared</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
