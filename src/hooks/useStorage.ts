/**
 * Custom hook for storage operations
 */

import { useState, useCallback, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { QRResult, GeneratedQR, AppSettings } from '../types';

export const useStorage = () => {
  const [scanHistory, setScanHistory] = useState<QRResult[]>([]);
  const [qrHistory, setQRHistory] = useState<GeneratedQR[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [scans, qrs, sett] = await Promise.all([
          storageService.getScanHistory(),
          storageService.getGeneratedQRHistory(),
          storageService.getSettings(),
        ]);
        setScanHistory(scans);
        setQRHistory(qrs);
        setSettings(sett);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const addScanResult = useCallback(
    async (scan: QRResult) => {
      try {
        await storageService.saveScanResult(scan);
        setScanHistory((prev) => [scan, ...prev]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save scan');
      }
    },
    []
  );

  const removeScanResult = useCallback(
    async (id: string) => {
      try {
        await storageService.deleteScanResult(id);
        setScanHistory((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete scan');
      }
    },
    []
  );

  const clearScanHistory = useCallback(async () => {
    try {
      await storageService.clearScanHistory();
      setScanHistory([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear history');
    }
  }, []);

  const addGeneratedQR = useCallback(
    async (qr: GeneratedQR) => {
      try {
        await storageService.saveGeneratedQR(qr);
        setQRHistory((prev) => [qr, ...prev]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save QR');
      }
    },
    []
  );

  const removeGeneratedQR = useCallback(
    async (id: string) => {
      try {
        await storageService.deleteGeneratedQR(id);
        setQRHistory((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete QR');
      }
    },
    []
  );

  const updateSettings = useCallback(
    async (newSettings: Partial<AppSettings>) => {
      try {
        const updated = { ...settings, ...newSettings } as AppSettings;
        await storageService.saveSettings(updated);
        setSettings(updated);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update settings');
      }
    },
    [settings]
  );

  return {
    scanHistory,
    qrHistory,
    settings,
    isLoading,
    error,
    addScanResult,
    removeScanResult,
    clearScanHistory,
    addGeneratedQR,
    removeGeneratedQR,
    updateSettings,
  };
};
