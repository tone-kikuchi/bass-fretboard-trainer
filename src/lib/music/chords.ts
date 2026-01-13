export type ChordDefinition = {
  id: string;
  name: string;
  intervals: number[];
};

export const CHORD_DEFINITIONS: ChordDefinition[] = [
  { id: 'maj7', name: 'Maj7', intervals: [0, 4, 7, 11] },
  { id: 'm7', name: 'm7', intervals: [0, 3, 7, 10] },
  { id: '7', name: '7', intervals: [0, 4, 7, 10] },
  { id: 'm7b5', name: 'm7♭5', intervals: [0, 3, 6, 10] },
];

export const getChordDefinition = (id: string) =>
  CHORD_DEFINITIONS.find((chord) => chord.id === id) ?? CHORD_DEFINITIONS[0];
