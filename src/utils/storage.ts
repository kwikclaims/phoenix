import { User } from '../types/User';
import { Job } from '../types/Job';

const USER_STORAGE_KEY = 'insurance_app_user';
const JOBS_STORAGE_KEY = 'insurance_app_jobs';

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user:', error);
  }
};

export const loadUser = (): User | null => {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load user:', error);
    return null;
  }
};

export const clearUser = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const saveJobs = (jobs: Job[]): void => {
  try {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  } catch (error) {
    console.error('Failed to save jobs:', error);
  }
};

export const loadJobs = (): Job[] => {
  try {
    const stored = localStorage.getItem(JOBS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load jobs:', error);
    return [];
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};