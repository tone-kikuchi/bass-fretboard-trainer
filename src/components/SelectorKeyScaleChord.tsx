import { NOTE_NAMES } from '../lib/music/notes';
import { SCALE_DEFINITIONS } from '../lib/music/scales';
import { CHORD_DEFINITIONS } from '../lib/music/chords';
import { PROGRESSION_PRESETS } from '../lib/music/harmony';
import { TUNING_PRESETS, type TuningPresetId } from '../lib/music/tuning';
import {
  LANGUAGE_LABELS,
  type Language,
  TEXT,
  getProgressionLabel,
  getScaleLabel,
  getTuningLabel,
} from '../lib/i18n';

export type SelectorProps = {
  language: Language;
  keyRoot: number;
  scaleId: string;
  chordId: string;
  progressionId: string;
  stringCount: 4 | 5;
  tuningId: TuningPresetId;
  onKeyChange: (value: number) => void;
  onScaleChange: (value: string) => void;
  onChordChange: (value: string) => void;
  onProgressionChange: (value: string) => void;
  onStringCountChange: (value: 4 | 5) => void;
  onTuningChange: (value: TuningPresetId) => void;
  onLanguageChange: (value: Language) => void;
};

export default function SelectorKeyScaleChord({
  language,
  keyRoot,
  scaleId,
  chordId,
  progressionId,
  stringCount,
  tuningId,
  onKeyChange,
  onScaleChange,
  onChordChange,
  onProgressionChange,
  onStringCountChange,
  onTuningChange,
  onLanguageChange,
}: SelectorProps) {
  const selectorText = TEXT[language].selector;

  return (
    <div className="selector">
      <label>
        {selectorText.language}
        <select value={language} onChange={(event) => onLanguageChange(event.target.value as Language)}>
          {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label>
        {selectorText.strings}
        <select
          value={stringCount}
          onChange={(event) => onStringCountChange(Number(event.target.value) as 4 | 5)}
        >
          <option value={4}>{selectorText.stringOption.four}</option>
          <option value={5}>{selectorText.stringOption.five}</option>
        </select>
      </label>
      <label>
        {selectorText.tuning}
        <select
          value={tuningId}
          onChange={(event) => onTuningChange(event.target.value as TuningPresetId)}
        >
          {TUNING_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {getTuningLabel(preset.id, language, preset.name)}
            </option>
          ))}
        </select>
      </label>
      <label>
        {selectorText.key}
        <select value={keyRoot} onChange={(event) => onKeyChange(Number(event.target.value))}>
          {NOTE_NAMES.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        {selectorText.scale}
        <select value={scaleId} onChange={(event) => onScaleChange(event.target.value)}>
          {SCALE_DEFINITIONS.map((scale) => (
            <option key={scale.id} value={scale.id}>
              {getScaleLabel(scale.id, language)}
            </option>
          ))}
        </select>
      </label>
      <label>
        {selectorText.chord}
        <select value={chordId} onChange={(event) => onChordChange(event.target.value)}>
          {CHORD_DEFINITIONS.map((chord) => (
            <option key={chord.id} value={chord.id}>
              {chord.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        {selectorText.progression}
        <select
          value={progressionId}
          onChange={(event) => onProgressionChange(event.target.value)}
        >
          {PROGRESSION_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {getProgressionLabel(preset.id, language)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
