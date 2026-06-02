/**
 * Generator Screen
 * Create custom QR codes
 */

import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { useHistory } from '../context/HistoryContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { qrService } from '../services/qrService';
import { shareService } from '../services/shareService';
import { SPACING, RADIUS } from '../styles/spacing';
import { GeneratorType } from '../types';

type QRInputType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'contact' | 'payment';

export const GeneratorScreen: React.FC = () => {
  const { addQR } = useHistory();
  const { theme } = useDarkMode();

  const [inputType, setInputType] = useState<QRInputType>('url');
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrImage, setQRImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      Alert.alert('Error', 'Please enter some data');
      return;
    }

    setIsGenerating(true);
    try {
      const data = {
        url: inputType === 'url' ? input : undefined,
        text: inputType === 'text' ? input : undefined,
        email: inputType === 'email' ? input : undefined,
        phone: inputType === 'phone' ? input : undefined,
      };

      const qr = await qrService.generateQRCode(data);
      // In production, generate actual QR image here using qrcode library
      // For now, set a placeholder
      const generatedQR = {
        ...qr,
        imageUri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
      };

      await addQR(generatedQR);
      setQRImage(generatedQR.imageUri);
      Alert.alert('Success', 'QR code generated!');
    } catch (error) {
      Alert.alert('Error', 'Failed to generate QR code');
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!qrImage) {
      Alert.alert('Error', 'Generate a QR code first');
      return;
    }

    try {
      await shareService.shareQRImage(qrImage, 'QR Code');
    } catch (error) {
      Alert.alert('Error', 'Failed to share');
    }
  };

  const handleCopy = async () => {
    if (!input) return;

    try {
      await shareService.copyToClipboard(input);
      Alert.alert('Success', 'Copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      padding: SPACING.lg,
    },
    typeSelector: {
      flexDirection: 'row',
      marginBottom: SPACING.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    typeButton: {
      flex: 1,
      paddingVertical: SPACING.md,
      alignItems: 'center',
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
    },
    typeButtonActive: {
      borderBottomColor: theme.primary,
    },
    typeButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    typeButtonTextActive: {
      color: theme.primary,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
      marginBottom: SPACING.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: RADIUS.md,
      padding: SPACING.md,
      fontSize: 14,
      color: theme.text,
      backgroundColor: theme.surface,
      minHeight: 100,
      marginBottom: SPACING.lg,
    },
    generateButton: {
      backgroundColor: theme.primary,
      paddingVertical: SPACING.md,
      borderRadius: RADIUS.md,
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    generateButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    qrContainer: {
      backgroundColor: theme.surface,
      borderRadius: RADIUS.lg,
      padding: SPACING.lg,
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    qrImage: {
      width: 200,
      height: 200,
      marginBottom: SPACING.md,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: SPACING.md,
    },
    actionButton: {
      flex: 1,
      paddingVertical: SPACING.md,
      borderRadius: RADIUS.md,
      alignItems: 'center',
      backgroundColor: theme.border,
    },
    actionButtonPrimary: {
      backgroundColor: theme.primary,
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    actionButtonTextPrimary: {
      color: '#FFF',
    },
  });

  const placeholderText = {
    url: 'Enter URL (e.g., https://example.com)',
    text: 'Enter text',
    email: 'Enter email address',
    phone: 'Enter phone number',
    wifi: 'Network name',
    contact: 'Contact info',
    payment: 'Payment details',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: theme.text, marginBottom: SPACING.lg }}>
          Generate QR Code
        </Text>

        {/* Type Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: SPACING.lg }}
        >
          <View style={styles.typeSelector}>
            {(['url', 'text', 'email', 'phone'] as QRInputType[]).map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.typeButton, inputType === type && styles.typeButtonActive]}
                onPress={() => {
                  setInputType(type);
                  setInput('');
                  setQRImage(null);
                }}
              >
                <Text
                  style={[styles.typeButtonText, inputType === type && styles.typeButtonTextActive]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Input */}
        <Text style={styles.inputLabel}>Data</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholderText[inputType]}
          placeholderTextColor={theme.textSecondary}
          value={input}
          onChangeText={setInput}
          multiline
          editable={!isGenerating}
        />

        {/* Generate Button */}
        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.generateButtonText}>Generate QR Code</Text>
          )}
        </TouchableOpacity>

        {/* QR Result */}
        {qrImage && (
          <View style={styles.qrContainer}>
            <Image source={{ uri: qrImage }} style={styles.qrImage} />
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]} onPress={handleShare}>
                <Text style={[styles.actionButtonText, styles.actionButtonTextPrimary]}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
                <Text style={styles.actionButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GeneratorScreen;
