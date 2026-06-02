/**
 * Share Service
 * Handles sharing QR codes and text
 */

import Share from 'react-native-share';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Clipboard from '@react-native-clipboard/clipboard';

class ShareService {
  /**
   * Share QR image
   */
  async shareQRImage(imageUri: string, title: string = 'QR Code'): Promise<void> {
    try {
      await Share.open({
        url: imageUri,
        title,
        message: `Check out my ${title}`,
      });
    } catch (error) {
      if (error instanceof Error && error.message !== 'User did not share') {
        console.error('Error sharing QR image:', error);
        throw error;
      }
    }
  }

  /**
   * Share text content
   */
  async shareText(text: string, title: string = 'Share'): Promise<void> {
    try {
      await Share.open({
        message: text,
        title,
      });
    } catch (error) {
      if (error instanceof Error && error.message !== 'User did not share') {
        console.error('Error sharing text:', error);
        throw error;
      }
    }
  }

  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text: string): Promise<void> {
    try {
      await Clipboard.setString(text);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      throw error;
    }
  }

  /**
   * Get text from clipboard
   */
  async getFromClipboard(): Promise<string> {
    try {
      return await Clipboard.getString();
    } catch (error) {
      console.error('Error getting from clipboard:', error);
      return '';
    }
  }

  /**
   * Save image to camera roll
   */
  async saveImageToCameraRoll(imageUri: string): Promise<string> {
    try {
      const result = await CameraRoll.save(imageUri, { type: 'photo' });
      return result;
    } catch (error) {
      console.error('Error saving to camera roll:', error);
      throw error;
    }
  }

  /**
   * Share via email
   */
  async shareViaEmail(email: string, subject: string = '', body: string = ''): Promise<void> {
    try {
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      await Share.open({
        url: mailtoLink,
      });
    } catch (error) {
      console.error('Error sharing via email:', error);
      throw error;
    }
  }

  /**
   * Share via WhatsApp
   */
  async shareViaWhatsApp(message: string): Promise<void> {
    try {
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
      await Share.open({
        url: whatsappUrl,
      });
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
      throw error;
    }
  }
}

export const shareService = new ShareService();
