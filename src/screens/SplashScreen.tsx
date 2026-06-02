/**
 * Splash Screen
 * App initialization and branding
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { useDarkMode } from '../hooks/useDarkMode';
import { APP_NAME } from '../utils/constants';
import { SPACING } from '../styles/spacing';

interface SplashScreenProps {
  navigation?: any;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { theme } = useDarkMode();

  useEffect(() => {
    // Simulate initialization
    const initializeApp = async () => {
      try {
        // Add initialization logic here
        // - Load settings
        // - Check permissions
        // - Setup services
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Navigate to main app
        navigation?.replace('Main');
      } catch (error) {
        console.error('Initialization error:', error);
        navigation?.replace('Main');
      }
    };

    initializeApp();
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      fontSize: 64,
      marginBottom: SPACING.xl,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.text,
      marginBottom: SPACING.md,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: SPACING.xl,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>📱</Text>
      <Text style={styles.title}>{APP_NAME}</Text>
      <Text style={styles.subtitle}>QR Code Scanner & Generator</Text>
      <ActivityIndicator size="large" color={theme.primary} />
    </SafeAreaView>
  );
};

export default SplashScreen;
