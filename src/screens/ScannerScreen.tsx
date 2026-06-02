/**
 * Scanner Screen
 * Real-time QR code scanning with camera
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useCamera } from '../hooks/useCamera';
import { useHistory } from '../context/HistoryContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { qrService } from '../services/qrService';
import { SPACING, RADIUS } from '../styles/spacing';

interface ScanResult {
  data: string;
  type: string;
}

export const ScannerScreen: React.FC = () => {
  const { permission, flashEnabled, zoom, hasPermission, toggleFlash, updateZoom } = useCamera();
  const { addScan } = useHistory();
  const { theme } = useDarkMode();
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<ScanResult | null>(null);

  const handleQRScanned = async (data: string) => {
    if (isScanning || !data.trim()) return;

    setIsScanning(true);
    try {
      // Parse QR data
      const result = qrService.parseQRData(data);

      // Add to history
      await addScan(result);

      // Show result
      setLastScanned({
        data: result.displayText,
        type: result.type,
      });

      // Auto-open links if enabled
      // This would be implemented with the app settings

      // Show alert
      Alert.alert('QR Scanned', result.displayText);
    } catch (error) {
      Alert.alert('Error', 'Failed to process QR code');
      console.error('Scan error:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    cameraContainer: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noCameraPermissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.surface,
    },
    permissionText: {
      fontSize: 16,
      color: theme.text,
      marginBottom: SPACING.lg,
      textAlign: 'center',
      paddingHorizontal: SPACING.lg,
    },
    controls: {
      backgroundColor: theme.surface,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.lg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    controlButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.md,
      marginBottom: SPACING.md,
      backgroundColor: theme.primary,
      borderRadius: RADIUS.md,
    },
    controlButtonIcon: {
      marginRight: SPACING.md,
      fontSize: 20,
    },
    controlButtonText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '600',
    },
    zoomControl: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: SPACING.md,
    },
    zoomButton: {
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      backgroundColor: theme.border,
      borderRadius: RADIUS.sm,
    },
    zoomButtonActive: {
      backgroundColor: theme.primary,
    },
    zoomButtonText: {
      color: theme.text,
      fontSize: 12,
      fontWeight: '600',
    },
    resultContainer: {
      backgroundColor: theme.surface,
      padding: SPACING.lg,
      borderRadius: RADIUS.md,
      marginBottom: SPACING.lg,
    },
    resultLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      marginBottom: SPACING.xs,
    },
    resultText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
  });

  if (!permission.granted && permission.denied) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noCameraPermissionContainer}>
          <Text style={styles.permissionText}>
            Camera permission is required to scan QR codes. Please enable it in settings.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        {isScanning && <ActivityIndicator size="large" color={theme.primary} />}
        <Text style={{ color: '#FFF', marginTop: SPACING.lg }}>Camera Preview</Text>
        {/* Camera component would be implemented here with expo-camera or react-native-camera */}
      </View>

      <View style={styles.controls}>
        {lastScanned && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Last Scan</Text>
            <Text style={styles.resultText}>{lastScanned.data}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
          <Text style={styles.controlButtonIcon}>{flashEnabled ? '🔆' : '🔅'}</Text>
          <Text style={styles.controlButtonText}>
            Flashlight {flashEnabled ? 'On' : 'Off'}
          </Text>
        </TouchableOpacity>

        <View style={styles.zoomControl}>
          {[1, 1.5, 2, 3].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.zoomButton, zoom === level && styles.zoomButtonActive]}
              onPress={() => updateZoom(level)}
            >
              <Text style={styles.zoomButtonText}>{level}x</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScannerScreen;
