import { create } from 'zustand';
import type { TuningPresetId } from '../lib/music/tuning';
import type { Language } from '../lib/i18n';

export type LayerSettings = {
  showNoteNames: boolean;
  showRoot: boolean;
  showDegrees: boolean;
  showIntervals: boolean;
  showScale: boolean;
  showChord: boolean;
  showGuide: boolean;
};

const DEFAULT_LAYERS: LayerSettings = {
  showNoteNames: true,
  showRoot: true,
  showDegrees: false,
  showIntervals: false,
  showScale: true,
  showChord: true,
  showGuide: true,
};

const DEFAULT_ZOOM = 1;

export type AppState = {
  language: Language;
  keyRoot: number;
  scaleId: string;
  chordId: string;
  progressionId: string;
  stringCount: 4 | 5;
  tuningId: TuningPresetId;
  zoom: number;
  layers: LayerSettings;
  setLanguage: (language: Language) => void;
  setKeyRoot: (keyRoot: number) => void;
  setScaleId: (scaleId: string) => void;
  setChordId: (chordId: string) => void;
  setProgressionId: (progressionId: string) => void;
  setStringCount: (stringCount: 4 | 5) => void;
  setTuningId: (tuningId: TuningPresetId) => void;
  setZoom: (zoom: number) => void;
  setLayer: (layer: keyof LayerSettings, value: boolean) => void;
  resetDisplay: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  language: 'ja',
  keyRoot: 0,
  scaleId: 'major',
  chordId: 'maj7',
  progressionId: 'ii-v-i',
  stringCount: 4,
  tuningId: 'standard',
  zoom: DEFAULT_ZOOM,
  layers: { ...DEFAULT_LAYERS },
  zoom: 1,
  layers: {
    showNoteNames: true,
    showRoot: true,
    showDegrees: true,
    showIntervals: false,
    showScale: true,
    showChord: true,
    showGuide: true,
  },
  setLanguage: (language) => set({ language }),
  setKeyRoot: (keyRoot) => set({ keyRoot }),
  setScaleId: (scaleId) => set({ scaleId }),
  setChordId: (chordId) => set({ chordId }),
  setProgressionId: (progressionId) => set({ progressionId }),
  setStringCount: (stringCount) => set({ stringCount }),
  setTuningId: (tuningId) => set({ tuningId }),
  setZoom: (zoom) => set({ zoom }),
  setLayer: (layer, value) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layer]: value,
      },
    })),
  resetDisplay: () => set({ zoom: DEFAULT_ZOOM, layers: { ...DEFAULT_LAYERS } }),
}));
