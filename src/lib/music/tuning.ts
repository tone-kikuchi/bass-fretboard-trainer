import { noteNameToNumber } from './notes';

export type StringTuning = {
  name: string;
  note: number;
  octave: number;
};

export const STANDARD_TUNING_5_STRING: StringTuning[] = [
  { name: 'B', note: noteNameToNumber('B'), octave: 1 },
  { name: 'E', note: noteNameToNumber('E'), octave: 2 },
  { name: 'A', note: noteNameToNumber('A'), octave: 2 },
  { name: 'D', note: noteNameToNumber('D'), octave: 3 },
  { name: 'G', note: noteNameToNumber('G'), octave: 3 },
];

export const STANDARD_TUNING_4_STRING: StringTuning[] = STANDARD_TUNING_5_STRING.slice(1);
