/**
 * History Screen
 * Display scan and QR generation history
 */

import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useHistory } from '../context/HistoryContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { SPACING, RADIUS } from '../styles/spacing';
import { formatRelativeTime } from '../utils/formatters';

type HistoryTab = 'scans' | 'generated';

export const HistoryScreen: React.FC = () => {
  const { scanHistory, generatedQRs, removeScan, removeQR, clearScans, clearQRs } = useHistory();
  const { theme } = useDarkMode();
  const [activeTab, setActiveTab] = useState<HistoryTab>('scans');

  const handleDelete = (id: string, type: HistoryTab) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => {
          if (type === 'scans') {
            removeScan(id);
          } else {
            removeQR(id);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const handleClear = (type: HistoryTab) => {
    Alert.alert('Clear All', 'This cannot be undone', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Clear',
        onPress: () => {
          if (type === 'scans') {
            clearScans();
          } else {
            clearQRs();
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.surface,
      padding: SPACING.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerText: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.text,
      marginBottom: SPACING.md,
    },
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    tab: {
      flex: 1,
      paddingVertical: SPACING.md,
      alignItems: 'center',
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: theme.primary,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    activeTabText: {
      color: theme.primary,
    },
    content: {
      flex: 1,
      padding: SPACING.lg,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    itemContainer: {
      backgroundColor: theme.surface,
      borderRadius: RADIUS.md,
      padding: SPACING.md,
      marginBottom: SPACING.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemInfo: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
      marginBottom: SPACING.xs,
    },
    itemTime: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    deleteButton: {
      padding: SPACING.md,
      marginLeft: SPACING.md,
    },
    deleteText: {
      color: '#FF3B30',
      fontWeight: '600',
      fontSize: 14,
    },
    clearButton: {
      alignSelf: 'center',
      marginTop: SPACING.xl,
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.lg,
      backgroundColor: '#FF3B30',
      borderRadius: RADIUS.md,
    },
    clearButtonText: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 14,
    },
  });

  const data = activeTab === 'scans' ? scanHistory : generatedQRs;
  const hasData = data.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>History</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'scans' && styles.activeTab]}
            onPress={() => setActiveTab('scans')}
          >
            <Text style={[styles.tabText, activeTab === 'scans' && styles.activeTabText]}>
              Scanned ({scanHistory.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'generated' && styles.activeTab]}
            onPress={() => setActiveTab('generated')}
          >
            <Text style={[styles.tabText, activeTab === 'generated' && styles.activeTabText]}>
              Generated ({generatedQRs.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {!hasData ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No history yet</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {activeTab === 'scans'
                        ? (item as any).displayText
                        : (item as any).data?.url || 'Generated QR'}
                    </Text>
                    <Text style={styles.itemTime}>
                      {formatRelativeTime((item as any).timestamp)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id, activeTab)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              scrollEnabled={true}
            />
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => handleClear(activeTab)}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
