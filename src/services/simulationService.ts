/**
 * Simulation service to generate mock data for the VitaNova Nexus platform
 * This service provides realistic data for demonstration purposes
 */

import { v4 as uuidv4 } from 'uuid';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface BiometricData {
  timestamp: number;
  heartRate: number;
  stressLevel: number;
  movementIntensity: number;
  voiceStressIndicator: number;
}

export interface Inmate {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  heartRate: number;
  stressLevel: number;
  movementIntensity: number;
  voiceStressIndicator: number;
  location: string;
  biometricHistory: BiometricData[];
}

// Indian names for inmates
const indianFirstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 
  'Reyansh', 'Ayaan', 'Atharva', 'Krishna', 'Ishaan',
  'Shivani', 'Aanya', 'Aadhya', 'Aaradhya', 'Ananya', 
  'Pari', 'Anika', 'Navya', 'Diya', 'Riya'
];

const indianLastNames = [
  'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta',
  'Joshi', 'Rao', 'Reddy', 'Nair', 'Chauhan',
  'Mukherjee', 'Agarwal', 'Verma', 'Mehta', 'Iyer'
];

// Indian correctional facility locations
const locations = [
  'Block A', 'Block B', 'Block C', 'Block D',
  'Dining Hall', 'Workshop', 'Library', 'Medical Wing',
  'Recreation Area', 'Education Center', 'Vocational Training',
  'Counseling Room', 'Prayer Hall', 'Visitor Area'
];

/**
 * Generates a random inmate name using Indian names
 * @returns A randomly generated Indian name
 */
const generateName = (): string => {
  const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
  const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
  return `${firstName} ${lastName}`;
};

/**
 * Generates a random risk level based on weighted probabilities
 * @returns A risk level (LOW, MEDIUM, or HIGH)
 */
const generateRiskLevel = (): RiskLevel => {
  const rand = Math.random();
  if (rand < 0.4) return 'LOW';
  if (rand < 0.7) return 'MEDIUM';
  return 'HIGH';
};

/**
 * Generates historical biometric data for an inmate
 * @param count Number of data points to generate
 * @returns Array of biometric data points
 */
const generateBiometricHistory = (count: number): BiometricData[] => {
  const now = Date.now();
  const history: BiometricData[] = [];
  
  for (let i = 0; i < count; i++) {
    // Generate data points at 15-minute intervals going back in time
    const timestamp = now - (count - i) * 15 * 60 * 1000;
    
    history.push({
      timestamp,
      heartRate: Math.floor(Math.random() * 50) + 60, // 60-110 BPM
      stressLevel: Math.floor(Math.random() * 80) + 10, // 10-90%
      movementIntensity: Math.floor(Math.random() * 70) + 10, // 10-80%
      voiceStressIndicator: Math.floor(Math.random() * 60) + 20, // 20-80%
    });
  }
  
  return history;
};

/**
 * Generates a specified number of inmates with random data
 * @param count Number of inmates to generate
 * @returns Array of inmate objects
 */
export const generateInmates = (count: number): Inmate[] => {
  const inmates: Inmate[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = `INM-${1000 + i}`;
    const riskLevel = generateRiskLevel();
    const biometricHistory = generateBiometricHistory(96); // 24 hours of data at 15-min intervals
    
    // Generate current values based on risk level
    let heartRate, stressLevel, movementIntensity, voiceStressIndicator;
    
    if (riskLevel === 'HIGH') {
      heartRate = Math.floor(Math.random() * 30) + 90; // 90-120 BPM
      stressLevel = Math.floor(Math.random() * 30) + 70; // 70-100%
      movementIntensity = Math.floor(Math.random() * 40) + 60; // 60-100%
      voiceStressIndicator = Math.floor(Math.random() * 30) + 70; // 70-100%
    } else if (riskLevel === 'MEDIUM') {
      heartRate = Math.floor(Math.random() * 20) + 75; // 75-95 BPM
      stressLevel = Math.floor(Math.random() * 20) + 50; // 50-70%
      movementIntensity = Math.floor(Math.random() * 30) + 40; // 40-70%
      voiceStressIndicator = Math.floor(Math.random() * 20) + 50; // 50-70%
    } else {
      heartRate = Math.floor(Math.random() * 25) + 60; // 60-85 BPM
      stressLevel = Math.floor(Math.random() * 30) + 20; // 20-50%
      movementIntensity = Math.floor(Math.random() * 30) + 20; // 20-50%
      voiceStressIndicator = Math.floor(Math.random() * 30) + 20; // 20-50%
    }
    
    inmates.push({
      id,
      name: generateName(),
      riskLevel,
      heartRate,
      stressLevel,
      movementIntensity,
      voiceStressIndicator,
      location: locations[Math.floor(Math.random() * locations.length)],
      biometricHistory,
    });
  }
  
  return inmates;
};

/**
 * Updates an inmate's data to simulate real-time changes
 * @param inmate The inmate object to update
 * @returns Updated inmate object
 */
export const updateInmateData = (inmate: Inmate): Inmate => {
  // Create a copy of the inmate object
  const updatedInmate = { ...inmate };
  
  // Update biometric data based on risk level
  if (inmate.riskLevel === 'HIGH') {
    // High risk inmates have more volatile changes
    updatedInmate.heartRate = Math.max(60, Math.min(130, inmate.heartRate + (Math.random() * 10 - 5)));
    updatedInmate.stressLevel = Math.max(50, Math.min(100, inmate.stressLevel + (Math.random() * 14 - 7)));
    updatedInmate.movementIntensity = Math.max(30, Math.min(100, inmate.movementIntensity + (Math.random() * 16 - 8)));
    updatedInmate.voiceStressIndicator = Math.max(40, Math.min(100, inmate.voiceStressIndicator + (Math.random() * 12 - 6)));
    
    // Small chance to change location
    if (Math.random() < 0.1) {
      updatedInmate.location = locations[Math.floor(Math.random() * locations.length)];
    }
    
    // Small chance to change risk level
    if (Math.random() < 0.05) {
      updatedInmate.riskLevel = 'MEDIUM';
    }
  } else if (inmate.riskLevel === 'MEDIUM') {
    // Medium risk inmates have moderate changes
    updatedInmate.heartRate = Math.max(60, Math.min(110, inmate.heartRate + (Math.random() * 8 - 4)));
    updatedInmate.stressLevel = Math.max(30, Math.min(80, inmate.stressLevel + (Math.random() * 10 - 5)));
    updatedInmate.movementIntensity = Math.max(20, Math.min(80, inmate.movementIntensity + (Math.random() * 12 - 6)));
    updatedInmate.voiceStressIndicator = Math.max(30, Math.min(80, inmate.voiceStressIndicator + (Math.random() * 10 - 5)));
    
    // Small chance to change location
    if (Math.random() < 0.08) {
      updatedInmate.location = locations[Math.floor(Math.random() * locations.length)];
    }
    
    // Small chance to change risk level
    if (Math.random() < 0.03) {
      updatedInmate.riskLevel = Math.random() < 0.7 ? 'LOW' : 'HIGH';
    }
  } else {
    // Low risk inmates have subtle changes
    updatedInmate.heartRate = Math.max(55, Math.min(90, inmate.heartRate + (Math.random() * 6 - 3)));
    updatedInmate.stressLevel = Math.max(10, Math.min(60, inmate.stressLevel + (Math.random() * 8 - 4)));
    updatedInmate.movementIntensity = Math.max(10, Math.min(60, inmate.movementIntensity + (Math.random() * 10 - 5)));
    updatedInmate.voiceStressIndicator = Math.max(10, Math.min(60, inmate.voiceStressIndicator + (Math.random() * 8 - 4)));
    
    // Small chance to change location
    if (Math.random() < 0.05) {
      updatedInmate.location = locations[Math.floor(Math.random() * locations.length)];
    }
    
    // Small chance to change risk level
    if (Math.random() < 0.02) {
      updatedInmate.riskLevel = 'MEDIUM';
    }
  }
  
  // Add the current data to the history
  const newDataPoint: BiometricData = {
    timestamp: Date.now(),
    heartRate: updatedInmate.heartRate,
    stressLevel: updatedInmate.stressLevel,
    movementIntensity: updatedInmate.movementIntensity,
    voiceStressIndicator: updatedInmate.voiceStressIndicator,
  };
  
  // Keep only the last 96 data points (24 hours at 15-min intervals)
  updatedInmate.biometricHistory = [...inmate.biometricHistory.slice(-95), newDataPoint];
  
  return updatedInmate;
};

// Generate historical biometric data for charts
export const generateHistoricalData = (hours: number = 24): BiometricData[] => {
  const data: BiometricData[] = [];
  const now = Date.now();
  
  for (let i = 0; i < hours; i++) {
    data.push({
      timestamp: now - (hours - i) * 3600000,
      heartRate: 70 + Math.floor(Math.random() * 30),
      stressLevel: 30 + Math.floor(Math.random() * 60),
      movementIntensity: Math.floor(Math.random() * 100),
      voiceStressIndicator: Math.floor(Math.random() * 100)
    });
  }
  
  return data;
};

// Get risk level color
export const getRiskLevelColor = (level: 'HIGH' | 'MEDIUM' | 'LOW'): string => {
  switch (level) {
    case 'HIGH':
      return '#d32f2f'; // Red
    case 'MEDIUM':
      return '#f57c00'; // Orange/Yellow
    case 'LOW':
      return '#388e3c'; // Green
    default:
      return '#757575'; // Grey
  }
};

// Get risk level class
export const getRiskLevelClass = (level: 'HIGH' | 'MEDIUM' | 'LOW'): string => {
  switch (level) {
    case 'HIGH':
      return 'risk-high';
    case 'MEDIUM':
      return 'risk-medium';
    case 'LOW':
      return 'risk-low';
    default:
      return '';
  }
}; 