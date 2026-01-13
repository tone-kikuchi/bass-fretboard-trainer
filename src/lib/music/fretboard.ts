import { normalizeNoteNumber } from './notes';
import { STANDARD_TUNING, type StringTuning } from './tuning';

export type FretboardCell = {
  stringIndex: number;
  stringName: string;
  fret: number;
  noteNumber: number;
  octave: number;
};

export const buildFretboard = (
  fretCount = 24,
  tuning: StringTuning[] = STANDARD_TUNING,
): FretboardCell[] => {
  const cells: FretboardCell[] = [];
  tuning.forEach((string, stringIndex) => {
    for (let fret = 0; fret <= fretCount; fret += 1) {
      const absolute = string.note + fret;
      const noteNumber = normalizeNoteNumber(absolute);
      const octave = string.octave + Math.floor(absolute / 12);
      cells.push({
        stringIndex,
        stringName: string.name,
        fret,
        noteNumber,
        octave,
      });
    }
  });
  return cells;
};
