import { create } from 'zustand';

export type LayerSettings = {
  showNoteNames: boolean;
  showDegrees: boolean;
  showScale: boolean;
  showChord: boolean;
  showGuide: boolean;
};

export type AppState = {
  keyRoot: number;
  scaleId: string;
  chordId: string;
  progressionId: string;
  stringCount: 4 | 5;
  zoom: number;
  layers: LayerSettings;
  setKeyRoot: (keyRoot: number) => void;
  setScaleId: (scaleId: string) => void;
  setChordId: (chordId: string) => void;
  setProgressionId: (progressionId: string) => void;
  setStringCount: (stringCount: 4 | 5) => void;
  setZoom: (zoom: number) => void;
  setLayer: (layer: keyof LayerSettings, value: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  keyRoot: 0,
  scaleId: 'major',
  chordId: 'maj7',
  progressionId: 'ii-v-i',
  stringCount: 4,
  zoom: 1,
  layers: {
    showNoteNames: true,
    showDegrees: false,
    showScale: true,
    showChord: true,
    showGuide: true,
  },
  setKeyRoot: (keyRoot) => set({ keyRoot }),
  setScaleId: (scaleId) => set({ scaleId }),
  setChordId: (chordId) => set({ chordId }),
  setProgressionId: (progressionId) => set({ progressionId }),
  setStringCount: (stringCount) => set({ stringCount }),
  setZoom: (zoom) => set({ zoom }),
  setLayer: (layer, value) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layer]: value,
      },
    })),
}));
