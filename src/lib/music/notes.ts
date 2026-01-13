export const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

export const normalizeNoteNumber = (noteNumber: number) =>
  ((noteNumber % 12) + 12) % 12;

export const noteNumberToName = (noteNumber: number): NoteName => {
  const normalized = normalizeNoteNumber(noteNumber);
  return NOTE_NAMES[normalized];
};

export const noteNameToNumber = (noteName: string): number => {
  const index = NOTE_NAMES.indexOf(noteName as NoteName);
  if (index === -1) {
    throw new Error(`Unknown note name: ${noteName}`);
  }
  return index;
};

export const degreeLabel = (degreeIndex: number) => {
  const labels = ['1', '2', '3', '4', '5', '6', '7'];
  return labels[degreeIndex] ?? '';
};

const INTERVAL_LABELS = [
  '1',
  'b2',
  '2',
  'b3',
  '3',
  '4',
  'b5',
  '5',
  'b6',
  '6',
  'b7',
  '7',
];

export const intervalLabelFromRoot = (noteNumber: number, root: number) => {
  const diff = normalizeNoteNumber(noteNumber - root);
  return INTERVAL_LABELS[diff] ?? '';
};
