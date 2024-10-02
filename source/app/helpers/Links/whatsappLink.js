import { Linking, Alert } from 'react-native';

export const openWhatsApp = async (phoneNumber, message = '') => {
    const isValidPhoneNumber = (phoneNumber) => {
      const phoneRegex = /^\d+$/; // Allow only digits
      return phoneRegex.test(phoneNumber) && phoneNumber.length >= 10;
    };
  
    if (!isValidPhoneNumber(phoneNumber)) {
      return { success: false, message: 'The phone number is not valid' };
    }
  
    let url = `whatsapp://send?phone=${phoneNumber}`;
  
    if (message) {
      const encodedMessage = encodeURIComponent(message);
      url += `&text=${encodedMessage}`;
    }
  
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        return { success: false, message: 'WhatsApp is not installed on your device' };
      }
      await Linking.openURL(url);
      return { success: true, message: 'WhatsApp opened successfully' };
    } catch (err) {
      console.error('Error opening WhatsApp', err);
      return { success: false, message: 'There was an error opening WhatsApp' };
    }
  };
  
