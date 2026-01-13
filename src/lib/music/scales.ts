export type ScaleDefinition = {
  id: string;
  name: string;
  intervals: number[];
};

export const SCALE_DEFINITIONS: ScaleDefinition[] = [
  { id: 'major', name: 'Major', intervals: [0, 2, 4, 5, 7, 9, 11] },
  { id: 'natural-minor', name: 'Natural Minor', intervals: [0, 2, 3, 5, 7, 8, 10] },
  { id: 'major-pentatonic', name: 'Major Pentatonic', intervals: [0, 2, 4, 7, 9] },
  { id: 'minor-pentatonic', name: 'Minor Pentatonic', intervals: [0, 3, 5, 7, 10] },
];

export const getScaleDefinition = (id: string) =>
  SCALE_DEFINITIONS.find((scale) => scale.id === id) ?? SCALE_DEFINITIONS[0];
