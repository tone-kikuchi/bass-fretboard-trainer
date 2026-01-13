import { getChordDefinition } from './chords';
import { noteNumberToName, normalizeNoteNumber } from './notes';

export type DegreeStep = {
  degree: string;
  quality: string;
};

export type ProgressionPreset = {
  id: string;
  name: string;
  scale: 'major' | 'minor';
  steps: DegreeStep[];
};

const MAJOR_DEGREE_MAP: Record<string, number> = {
  I: 0,
  ii: 2,
  iii: 4,
  IV: 5,
  V: 7,
  vi: 9,
  'vii°': 11,
};

const MINOR_DEGREE_MAP: Record<string, number> = {
  i: 0,
  ii: 2,
  III: 3,
  iv: 5,
  v: 7,
  V: 7,
  VI: 8,
  VII: 10,
};

export const PROGRESSION_PRESETS: ProgressionPreset[] = [
  {
    id: 'ii-v-i',
    name: 'ii–V–I (Major)',
    scale: 'major',
    steps: [
      { degree: 'ii', quality: 'm7' },
      { degree: 'V', quality: '7' },
      { degree: 'I', quality: 'maj7' },
    ],
  },
  {
    id: 'i-iv-v',
    name: 'i–iv–V (Minor)',
    scale: 'minor',
    steps: [
      { degree: 'i', quality: 'm7' },
      { degree: 'iv', quality: 'm7' },
      { degree: 'V', quality: '7' },
    ],
  },
  {
    id: 'i-vi-ii-v',
    name: 'I–vi–ii–V (Cycle)',
    scale: 'major',
    steps: [
      { degree: 'I', quality: 'maj7' },
      { degree: 'vi', quality: 'm7' },
      { degree: 'ii', quality: 'm7' },
      { degree: 'V', quality: '7' },
    ],
  },
  {
    id: 'blues',
    name: '12-Bar Blues (I–IV–V)',
    scale: 'major',
    steps: [
      { degree: 'I', quality: '7' },
      { degree: 'IV', quality: '7' },
      { degree: 'I', quality: '7' },
      { degree: 'I', quality: '7' },
      { degree: 'IV', quality: '7' },
      { degree: 'IV', quality: '7' },
      { degree: 'I', quality: '7' },
      { degree: 'I', quality: '7' },
      { degree: 'V', quality: '7' },
      { degree: 'IV', quality: '7' },
      { degree: 'I', quality: '7' },
      { degree: 'V', quality: '7' },
    ],
  },
];

export const resolveDegree = (degree: string, keyRoot: number, scale: 'major' | 'minor') => {
  const map = scale === 'major' ? MAJOR_DEGREE_MAP : MINOR_DEGREE_MAP;
  const interval = map[degree];
  if (interval === undefined) {
    throw new Error(`Unknown degree: ${degree}`);
  }
  return normalizeNoteNumber(keyRoot + interval);
};

export const buildProgression = (keyRoot: number, preset: ProgressionPreset) =>
  preset.steps.map((step) => {
    const root = resolveDegree(step.degree, keyRoot, preset.scale);
    return {
      ...step,
      root,
      chordName: `${noteNumberToName(root)}${getChordDefinition(step.quality).name}`,
    };
  });

export const getChordTones = (root: number, quality: string) => {
  const definition = getChordDefinition(quality);
  return definition.intervals.map((interval) => normalizeNoteNumber(root + interval));
};

export const getGuideTones = (root: number, quality: string) => {
  const definition = getChordDefinition(quality);
  const [third, , , seventh] = definition.intervals;
  return [normalizeNoteNumber(root + third), normalizeNoteNumber(root + seventh)];
};
