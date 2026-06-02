/**
 * Custom hook for camera operations
 */

import { useState, useCallback, useEffect } from 'react';
import { cameraService } from '../services/cameraService';
import { CameraPermission } from '../types';

export const useCamera = () => {
  const [permission, setPermission] = useState<CameraPermission>({
    granted: false,
    denied: false,
    blocked: false,
    unavailable: false,
  });
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Request camera permission on mount
  useEffect(() => {
    const requestPermission = async () => {
      setIsLoading(true);
      const perm = await cameraService.requestCameraPermission();
      setPermission(perm);
      setIsLoading(false);
    };
    requestPermission();
  }, []);

  const toggleFlash = useCallback(() => {
    const enabled = cameraService.toggleFlashlight();
    setFlashEnabled(enabled);
  }, []);

  const updateZoom = useCallback((newZoom: number) => {
    const success = cameraService.setZoom(newZoom);
    if (success) {
      setZoom(newZoom);
    }
    return success;
  }, []);

  const resetCamera = useCallback(() => {
    cameraService.resetSettings();
    setFlashEnabled(false);
    setZoom(1);
  }, []);

  return {
    permission,
    flashEnabled,
    zoom,
    isLoading,
    toggleFlash,
    updateZoom,
    resetCamera,
    hasPermission: permission.granted,
  };
};
