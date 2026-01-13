import { create } from 'zustand';

export type ModeStats = {
  attempts: number;
  correct: number;
};

export type StatsState = {
  modeStats: Record<string, ModeStats>;
  recordResult: (mode: string, isCorrect: boolean) => void;
  reset: () => void;
};

const STORAGE_KEY = 'bass-trainer-stats';

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const loadStats = (): Record<string, ModeStats> => {
  const storage = getStorage();
  if (!storage) {
    return {};
  }
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return {};
  }
  try {
    return JSON.parse(raw) as Record<string, ModeStats>;
  } catch {
    return {};
  }
};

const saveStats = (stats: Record<string, ModeStats>) => {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage write errors (e.g. private mode or disabled storage).
  }
};

export const useStatsStore = create<StatsState>((set, get) => ({
  modeStats: loadStats(),
  recordResult: (mode, isCorrect) => {
    const stats = { ...get().modeStats };
    const current = stats[mode] ?? { attempts: 0, correct: 0 };
    const updated = {
      attempts: current.attempts + 1,
      correct: current.correct + (isCorrect ? 1 : 0),
    };
    stats[mode] = updated;
    saveStats(stats);
    set({ modeStats: stats });
  },
  reset: () => {
    saveStats({});
    set({ modeStats: {} });
  },
}));
