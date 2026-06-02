/**
 * App Context
 * Global app state management
 */

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { AppSettings, AppState } from '../types';
import { LIGHT_THEME } from '../styles/colors';

interface AppContextType {
  appState: AppState;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setDarkMode: (isDark: boolean) => void;
  showNotification: (message: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>({
    user: null,
    isLoading: false,
    isDarkMode: false,
    theme: LIGHT_THEME,
  });

  const updateSettings = useCallback((settings: Partial<AppSettings>) => {
    // Settings update logic
  }, []);

  const setDarkMode = useCallback((isDark: boolean) => {
    setAppState((prev) => ({
      ...prev,
      isDarkMode: isDark,
    }));
  }, []);

  const showNotification = useCallback((message: string) => {
    console.log('Notification:', message);
  }, []);

  const value: AppContextType = {
    appState,
    updateSettings,
    setDarkMode,
    showNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
