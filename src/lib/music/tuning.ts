import { normalizeNoteNumber, noteNameToNumber, noteNumberToName } from './notes';

export type StringTuning = {
  name: string;
  note: number;
  octave: number;
};

export type TuningPresetId =
  | 'standard'
  | 'down-half'
  | 'down-whole'
  | 'down-whole-half'
  | 'down-two'
  | 'down-two-half'
  | 'drop-half'
  | 'drop-whole'
  | 'drop-whole-half'
  | 'drop-two'
  | 'drop-two-half';

export const STANDARD_TUNING_5_STRING: StringTuning[] = [
  { name: 'B', note: noteNameToNumber('B'), octave: 1 },
  { name: 'E', note: noteNameToNumber('E'), octave: 2 },
  { name: 'A', note: noteNameToNumber('A'), octave: 2 },
  { name: 'D', note: noteNameToNumber('D'), octave: 3 },
  { name: 'G', note: noteNameToNumber('G'), octave: 3 },
];

export const STANDARD_TUNING_4_STRING: StringTuning[] = STANDARD_TUNING_5_STRING.slice(1);

const DOWN_TUNING_OPTIONS = [
  { id: 'standard', label: '標準', offset: 0 },
  { id: 'down-half', label: '半音下げ', offset: 1 },
  { id: 'down-whole', label: '一音下げ', offset: 2 },
  { id: 'down-whole-half', label: '一音半下げ', offset: 3 },
  { id: 'down-two', label: '二音下げ', offset: 4 },
  { id: 'down-two-half', label: '二音半下げ', offset: 5 },
] as const;

const DROP_TUNING_OPTIONS = [
  { id: 'drop-half', label: 'ドロップ (半音下げ)', offset: 1 },
  { id: 'drop-whole', label: 'ドロップ (一音下げ)', offset: 2 },
  { id: 'drop-whole-half', label: 'ドロップ (一音半下げ)', offset: 3 },
  { id: 'drop-two', label: 'ドロップ (二音下げ)', offset: 4 },
  { id: 'drop-two-half', label: 'ドロップ (二音半下げ)', offset: 5 },
] as const;

export const TUNING_PRESETS = [
  ...DOWN_TUNING_OPTIONS.map((option) => ({
    id: option.id,
    name: option.label,
    offset: option.offset,
    isDrop: false,
  })),
  ...DROP_TUNING_OPTIONS.map((option) => ({
    id: option.id,
    name: option.label,
    offset: option.offset,
    isDrop: true,
  })),
];

const transposeString = (string: StringTuning, semitoneShift: number): StringTuning => {
  const absolute = string.octave * 12 + string.note + semitoneShift;
  const note = normalizeNoteNumber(absolute);
  const octave = Math.floor(absolute / 12);
  return {
    name: noteNumberToName(note),
    note,
    octave,
  };
};

export const buildTuning = (stringCount: 4 | 5, presetId: TuningPresetId): StringTuning[] => {
  const baseTuning = stringCount === 5 ? STANDARD_TUNING_5_STRING : STANDARD_TUNING_4_STRING;
  const preset =
    TUNING_PRESETS.find((option) => option.id === presetId) ?? TUNING_PRESETS[0];
  const downShifted = baseTuning.map((string) => transposeString(string, -preset.offset));
  if (!preset.isDrop) {
    return downShifted;
  }
  return downShifted.map((string, index) =>
    index === 0 ? transposeString(string, -2) : string,
  );
};
