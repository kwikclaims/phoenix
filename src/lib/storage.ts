export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Updates storage functionality
const UPDATES_KEY = "updates:v1";

export type UpdateItem = {
  id: string;         // unique
  description: string;
  createdAt: number;  // epoch ms
};

export function loadUpdates(): UpdateItem[] {
  try {
    const raw = localStorage.getItem(UPDATES_KEY);
    return raw ? (JSON.parse(raw) as UpdateItem[]) : [];
  } catch {
    return [];
  }
}

export function saveUpdates(items: UpdateItem[]) {
  localStorage.setItem(UPDATES_KEY, JSON.stringify(items));
}

// Follow-ups storage functionality
const FOLLOW_UPS_KEY = "follow-ups:v1";

export type FollowUpItem = {
  id: string;         // unique
  description: string;
  createdAt: number;  // epoch ms
};

export function loadFollowUps(): FollowUpItem[] {
  try {
    const raw = localStorage.getItem(FOLLOW_UPS_KEY);
    return raw ? (JSON.parse(raw) as FollowUpItem[]) : [];
  } catch {
    return [];
  }
}

export function saveFollowUps(items: FollowUpItem[]) {
  localStorage.setItem(FOLLOW_UPS_KEY, JSON.stringify(items));
}