/**
 * Camera Service
 * Handles camera permissions and operations
 */

import { PermissionsAndroid, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { CameraPermission, QRScanOptions } from '../types';

class CameraService {
  private flashEnabled: boolean = false;
  private currentZoom: number = 1;

  /**
   * Request camera permission
   */
  async requestCameraPermission(): Promise<CameraPermission> {
    try {
      if (Platform.OS === 'android') {
        return await this.requestAndroidPermission();
      } else {
        return await this.requestIOSPermission();
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return {
        granted: false,
        denied: true,
        blocked: false,
        unavailable: false,
      };
    }
  }

  /**
   * Request camera permission on Android
   */
  private async requestAndroidPermission(): Promise<CameraPermission> {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Your Scanner needs camera access to scan QR codes',
          buttonPositive: 'Allow',
          buttonNegative: 'Cancel',
        }
      );

      return {
        granted: result === PermissionsAndroid.RESULTS.GRANTED,
        denied: result === PermissionsAndroid.RESULTS.DENIED,
        blocked: false,
        unavailable: false,
      };
    } catch (error) {
      console.error('Error requesting Android camera permission:', error);
      return {
        granted: false,
        denied: true,
        blocked: false,
        unavailable: false,
      };
    }
  }

  /**
   * Request camera permission on iOS
   */
  private async requestIOSPermission(): Promise<CameraPermission> {
    try {
      const result = await request(PERMISSIONS.IOS.CAMERA);

      return {
        granted: result === RESULTS.GRANTED,
        denied: result === RESULTS.DENIED,
        blocked: result === RESULTS.BLOCKED,
        unavailable: result === RESULTS.UNAVAILABLE,
      };
    } catch (error) {
      console.error('Error requesting iOS camera permission:', error);
      return {
        granted: false,
        denied: true,
        blocked: false,
        unavailable: false,
      };
    }
  }

  /**
   * Request storage permission
   */
  async requestStoragePermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false;
    }
  }

  /**
   * Toggle flashlight
   */
  toggleFlashlight(): boolean {
    this.flashEnabled = !this.flashEnabled;
    return this.flashEnabled;
  }

  /**
   * Set zoom level
   */
  setZoom(level: number): boolean {
    if (level >= 1 && level <= 3) {
      this.currentZoom = level;
      return true;
    }
    return false;
  }

  /**
   * Get current zoom level
   */
  getZoom(): number {
    return this.currentZoom;
  }

  /**
   * Check if flashlight is enabled
   */
  isFlashlightEnabled(): boolean {
    return this.flashEnabled;
  }

  /**
   * Reset camera settings
   */
  resetSettings(): void {
    this.flashEnabled = false;
    this.currentZoom = 1;
  }
}

export const cameraService = new CameraService();
