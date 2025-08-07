// Utility functions for safe cookie operations in client-side components

// Function to validate if a string is a valid MongoDB ObjectId format
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const getUserIdFromCookie = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
    if (userCookie) {
      const userId = userCookie.split('=')[1]?.trim();
      if (userId && isValidObjectId(userId)) {
        return userId;
      }
      console.warn('Invalid user ID format in cookie:', userId);
    }
    return '';
  } catch (error) {
    console.error('Error getting user ID from cookie:', error);
    return '';
  }
};

export const getTokenFromCookie = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1]?.trim();
      return token || '';
    }
    return '';
  } catch (error) {
    console.error('Error getting token from cookie:', error);
    return '';
  }
};

export const isUserLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return document.cookie.includes('token');
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

export const setCookie = (name: string, value: string, days?: number): void => {
  if (typeof window === 'undefined') return;
  try {
    // Ensure the value is clean and trimmed
    const cleanValue = String(value).trim();
    
    // For user IDs, validate they're proper ObjectIds
    if (name === 'user' && !isValidObjectId(cleanValue)) {
      console.error('Attempting to set invalid user ID:', cleanValue);
      return;
    }
    
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = `${name}=${cleanValue}${expires}; path=/`;
    console.log(`Cookie set: ${name}=${cleanValue}`);
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
};

export const deleteCookie = (name: string): void => {
  if (typeof window === 'undefined') return;
  try {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } catch (error) {
    console.error('Error deleting cookie:', error);
  }
};

// Debug function to inspect cookie contents
export const debugCookies = (): void => {
  if (typeof window === 'undefined') return;
  console.log('All cookies:', document.cookie);
  console.log('User ID:', getUserIdFromCookie());
  console.log('Token:', getTokenFromCookie());
  console.log('Is logged in:', isUserLoggedIn());
};

// Function to clear all authentication data
export const clearAuthData = (): void => {
  deleteCookie('user');
  deleteCookie('token');
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};

// Function to validate and fix authentication data
export const validateAuthData = (): boolean => {
  const userId = getUserIdFromCookie();
  const token = getTokenFromCookie();
  
  if (!userId || !token) {
    console.warn('Missing authentication data');
    clearAuthData();
    return false;
  }
  
  if (!isValidObjectId(userId)) {
    console.error('Invalid user ID format, clearing auth data');
    clearAuthData();
    return false;
  }
  
  return true;
};
