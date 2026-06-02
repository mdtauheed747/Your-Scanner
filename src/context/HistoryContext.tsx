/**
 * History Context
 * Manages scan and QR generation history state
 */

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { QRResult, GeneratedQR } from '../types';
import { storageService } from '../services/storageService';

interface HistoryContextType {
  scanHistory: QRResult[];
  generatedQRs: GeneratedQR[];
  addScan: (scan: QRResult) => Promise<void>;
  removeScan: (id: string) => Promise<void>;
  clearScans: () => Promise<void>;
  addQR: (qr: GeneratedQR) => Promise<void>;
  removeQR: (id: string) => Promise<void>;
  clearQRs: () => Promise<void>;
  isLoading: boolean;
}

export const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

interface HistoryProviderProps {
  children: ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
  const [scanHistory, setScanHistory] = useState<QRResult[]>([]);
  const [generatedQRs, setGeneratedQRs] = useState<GeneratedQR[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const [scans, qrs] = await Promise.all([
          storageService.getScanHistory(),
          storageService.getGeneratedQRHistory(),
        ]);
        setScanHistory(scans);
        setGeneratedQRs(qrs);
      } catch (error) {
        console.error('Error loading history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadHistory();
  }, []);

  const addScan = useCallback(async (scan: QRResult) => {
    await storageService.saveScanResult(scan);
    setScanHistory((prev) => [scan, ...prev]);
  }, []);

  const removeScan = useCallback(async (id: string) => {
    await storageService.deleteScanResult(id);
    setScanHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearScans = useCallback(async () => {
    await storageService.clearScanHistory();
    setScanHistory([]);
  }, []);

  const addQR = useCallback(async (qr: GeneratedQR) => {
    await storageService.saveGeneratedQR(qr);
    setGeneratedQRs((prev) => [qr, ...prev]);
  }, []);

  const removeQR = useCallback(async (id: string) => {
    await storageService.deleteGeneratedQR(id);
    setGeneratedQRs((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearQRs = useCallback(async () => {
    await storageService.clearGeneratedQRHistory();
    setGeneratedQRs([]);
  }, []);

  const value: HistoryContextType = {
    scanHistory,
    generatedQRs,
    addScan,
    removeScan,
    clearScans,
    addQR,
    removeQR,
    clearQRs,
    isLoading,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

export const useHistory = () => {
  const context = React.useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within HistoryProvider');
  }
  return context;
};
