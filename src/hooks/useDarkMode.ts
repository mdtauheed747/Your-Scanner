/**
 * Custom hook for dark mode
 */

import { useState, useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { storageService } from '../services/storageService';
import { LIGHT_THEME, DARK_THEME } from '../styles/colors';
import { STORAGE_KEYS } from '../utils/constants';

export const useDarkMode = (initialDarkMode?: boolean) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode ?? systemColorScheme === 'dark');
  const [isLoading, setIsLoading] = useState(true);

  // Load dark mode preference from storage
  useEffect(() => {
    const loadDarkModePreference = async () => {
      try {
        const saved = await storageService.getItem<boolean>(STORAGE_KEYS.THEME);
        if (saved !== null) {
          setIsDarkMode(saved);
        } else {
          setIsDarkMode(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading dark mode preference:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDarkModePreference();
  }, [systemColorScheme]);

  const toggleDarkMode = useCallback(
    async (value?: boolean) => {
      const newValue = value !== undefined ? value : !isDarkMode;
      setIsDarkMode(newValue);
      try {
        await storageService.setItem(STORAGE_KEYS.THEME, newValue);
      } catch (error) {
        console.error('Error saving dark mode preference:', error);
      }
    },
    [isDarkMode]
  );

  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  return {
    isDarkMode,
    toggleDarkMode,
    theme,
    isLoading,
  };
};
