import { NOTE_NAMES } from '../lib/music/notes';
import { SCALE_DEFINITIONS } from '../lib/music/scales';
import { CHORD_DEFINITIONS } from '../lib/music/chords';
import { PROGRESSION_PRESETS } from '../lib/music/harmony';

export type SelectorProps = {
  keyRoot: number;
  scaleId: string;
  chordId: string;
  progressionId: string;
  stringCount: 4 | 5;
  onKeyChange: (value: number) => void;
  onScaleChange: (value: string) => void;
  onChordChange: (value: string) => void;
  onProgressionChange: (value: string) => void;
  onStringCountChange: (value: 4 | 5) => void;
};

export default function SelectorKeyScaleChord({
  keyRoot,
  scaleId,
  chordId,
  progressionId,
  stringCount,
  onKeyChange,
  onScaleChange,
  onChordChange,
  onProgressionChange,
  onStringCountChange,
}: SelectorProps) {
  return (
    <div className="selector">
      <label>
        Strings
        <select
          value={stringCount}
          onChange={(event) => onStringCountChange(Number(event.target.value) as 4 | 5)}
        >
          <option value={4}>4 Strings</option>
          <option value={5}>5 Strings</option>
        </select>
      </label>
      <label>
        Key
        <select value={keyRoot} onChange={(event) => onKeyChange(Number(event.target.value))}>
          {NOTE_NAMES.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Scale
        <select value={scaleId} onChange={(event) => onScaleChange(event.target.value)}>
          {SCALE_DEFINITIONS.map((scale) => (
            <option key={scale.id} value={scale.id}>
              {scale.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Chord
        <select value={chordId} onChange={(event) => onChordChange(event.target.value)}>
          {CHORD_DEFINITIONS.map((chord) => (
            <option key={chord.id} value={chord.id}>
              {chord.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Progression
        <select
          value={progressionId}
          onChange={(event) => onProgressionChange(event.target.value)}
        >
          {PROGRESSION_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
