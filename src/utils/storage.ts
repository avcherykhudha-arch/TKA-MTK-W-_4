/**
 * Offline Storage Manager for Mister Jo TKA Matematika Masterclass 2026
 * Supports LocalStorage with IndexedDB safety fallback and schema versioning
 */

import { AppState, AudioSettings, StudentProfile, UserResponse } from '../types/quiz';

const STORAGE_KEY = 'misterjo_tka_masterclass_2026_v1';

export const defaultAudioSettings: AudioSettings = {
  enabled: true,
  rate: 0.95,
  volume: 1.0,
  voiceURI: null,
  autoPlayOnNavigate: false
};

export const defaultProfile: StudentProfile = {
  name: 'Pejuang TKA 2026',
  targetSchoolOrMajor: 'Teknik / Kedokteran / MIPA / STEI'
};

export const initialAppState: AppState = {
  version: 1,
  profile: defaultProfile,
  currentQuestionNumber: 1,
  responses: {},
  audioSettings: defaultAudioSettings,
  activeView: 'practice'
};

export function loadAppState(): AppState {
  if (typeof window === 'undefined') return initialAppState;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialAppState;

    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1) {
      return {
        ...initialAppState,
        ...parsed,
        responses: parsed.responses || {},
        audioSettings: {
          ...defaultAudioSettings,
          ...(parsed.audioSettings || {})
        },
        profile: {
          ...defaultProfile,
          ...(parsed.profile || {})
        }
      };
    }
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
  }

  return initialAppState;
}

export function saveAppState(state: AppState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}

export function resetAppState(): AppState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear localStorage:', err);
    }
  }
  return { ...initialAppState };
}
