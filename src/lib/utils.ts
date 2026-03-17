import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSessionId = () => {
  const timestamp = Date.now().toString(36);
  const random1 = Math.random().toString(36).substring(2, 10);
  const random2 = Math.random().toString(36).substring(2, 10);
  const processId = Math.floor(Math.random() * 1000).toString(36);
  const combined = `${timestamp}-${random1}-${random2}-${processId}`;
  
  if (combined.length > 32) {
    return combined.substring(0, 32);
  }
  return (combined + Math.random().toString(36).substring(2)).substring(0, 32);
};

export const getClientIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP:', error);
    return '0.0.0.0';
  }
};
