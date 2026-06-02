/**
 * Settings Screen
 * App settings and preferences
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useStorage } from '../hooks/useStorage';
import { useDarkMode } from '../hooks/useDarkMode';
import { SPACING, RADIUS } from '../styles/spacing';
import { APP_NAME, APP_VERSION } from '../utils/constants';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings } = useStorage();
  const { isDarkMode, toggleDarkMode, theme } = useDarkMode();

  const handleToggleDarkMode = async () => {
    toggleDarkMode(!isDarkMode);
  };

  const handleToggleHistory = async () => {
    if (settings) {
      await updateSettings({
        ...settings,
        enableHistory: !settings.enableHistory,
      });
    }
  };

  const handleToggleNotifications = async () => {
    if (settings) {
      await updateSettings({
        ...settings,
        enableNotifications: !settings.enableNotifications,
      });
    }
  };

  const handleToggleAutoOpen = async () => {
    if (settings) {
      await updateSettings({
        ...settings,
        autoOpenLinks: !settings.autoOpenLinks,
      });
    }
  };

  const handleAbout = () => {
    Alert.alert(APP_NAME, `Version ${APP_VERSION}\n\nA fast QR code scanner & generator`, [
      { text: 'OK' },
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      paddingVertical: SPACING.lg,
    },
    section: {
      marginBottom: SPACING.xl,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.textSecondary,
      paddingHorizontal: SPACING.lg,
      marginBottom: SPACING.md,
      textTransform: 'uppercase',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.surface,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    settingDescription: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: SPACING.xs,
    },
    buttonItem: {
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.lg,
      backgroundColor: theme.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.primary,
    },
    versionContainer: {
      alignItems: 'center',
      paddingVertical: SPACING.xl,
      marginTop: SPACING.xl,
    },
    versionText: {
      fontSize: 12,
      color: theme.textSecondary,
    },
  });

  if (!settings) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Display Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Enable dark theme</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleToggleDarkMode}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={isDarkMode ? theme.primary : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Privacy & Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Data</Text>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Enable History</Text>
              <Text style={styles.settingDescription}>Save scan and QR history</Text>
            </View>
            <Switch
              value={settings.enableHistory}
              onValueChange={handleToggleHistory}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={settings.enableHistory ? theme.primary : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Enable Notifications</Text>
              <Text style={styles.settingDescription}>Get app notifications</Text>
            </View>
            <Switch
              value={settings.enableNotifications}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={settings.enableNotifications ? theme.primary : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Behavior */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Behavior</Text>
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Auto-Open Links</Text>
              <Text style={styles.settingDescription}>Automatically open URLs</Text>
            </View>
            <Switch
              value={settings.autoOpenLinks}
              onValueChange={handleToggleAutoOpen}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={settings.autoOpenLinks ? theme.primary : '#f4f3f4'}
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.buttonItem} onPress={handleAbout}>
            <Text style={styles.buttonText}>About {APP_NAME}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>{APP_NAME} v{APP_VERSION}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
