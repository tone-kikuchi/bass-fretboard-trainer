import { useMemo, useState } from 'react';
import { NOTE_NAMES } from '../../lib/music/notes';
import { SCALE_DEFINITIONS } from '../../lib/music/scales';
import { CHORD_DEFINITIONS } from '../../lib/music/chords';
import { PROGRESSION_PRESETS } from '../../lib/music/harmony';
import { TUNING_PRESETS, type TuningPresetId } from '../../lib/music/tuning';
import {
  type Language,
  TEXT,
  getProgressionLabel,
  getScaleLabel,
  getTuningLabel,
} from '../../lib/i18n';

export type FretboardSettingsProps = {
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
};

export default function FretboardSettings({
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
}: FretboardSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorText = TEXT[language].selector;
  const tuningPreset =
    TUNING_PRESETS.find((preset) => preset.id === tuningId) ?? TUNING_PRESETS[0];
  const chordLabel = CHORD_DEFINITIONS.find((chord) => chord.id === chordId)?.name ?? chordId;
  const summary = useMemo(() => {
    const tuningLabel = getTuningLabel(tuningPreset.id, language, tuningPreset.name);
    const scaleLabel = getScaleLabel(scaleId, language);
    const progressionLabel = getProgressionLabel(progressionId, language);
    const keyLabel = NOTE_NAMES[keyRoot] ?? NOTE_NAMES[0];

    return `${stringCount}弦・${tuningLabel} / Key: ${keyLabel} / Scale: ${scaleLabel} / Chord: ${chordLabel} / Prog: ${progressionLabel}`;
  }, [chordLabel, keyRoot, language, progressionId, scaleId, stringCount, tuningPreset]);

  return (
    <section className="settings-accordion">
      <div className="settings-accordion__header">
        <button
          type="button"
          className="settings-accordion__toggle"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          設定
          <span className="settings-accordion__icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
        {!isOpen ? <div className="settings-accordion__summary">{summary}</div> : null}
      </div>
      {isOpen ? (
        <div className="settings-accordion__content">
          <label className="settings-field">
            <span className="settings-field__label">{selectorText.strings}</span>
            <select
              value={stringCount}
              onChange={(event) => onStringCountChange(Number(event.target.value) as 4 | 5)}
            >
              <option value={4}>{selectorText.stringOption.four}</option>
              <option value={5}>{selectorText.stringOption.five}</option>
            </select>
          </label>
          <label className="settings-field">
            <span className="settings-field__label">{selectorText.tuning}</span>
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
          <label className="settings-field">
            <span className="settings-field__label">{selectorText.key}</span>
            <select value={keyRoot} onChange={(event) => onKeyChange(Number(event.target.value))}>
              {NOTE_NAMES.map((name, index) => (
                <option key={name} value={index}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="settings-field">
            <span className="settings-field__label">{selectorText.scale}</span>
            <select value={scaleId} onChange={(event) => onScaleChange(event.target.value)}>
              {SCALE_DEFINITIONS.map((scale) => (
                <option key={scale.id} value={scale.id}>
                  {getScaleLabel(scale.id, language)}
                </option>
              ))}
            </select>
          </label>
          <label className="settings-field">
            <span className="settings-field__label">{selectorText.chord}</span>
            <select value={chordId} onChange={(event) => onChordChange(event.target.value)}>
              {CHORD_DEFINITIONS.map((chord) => (
                <option key={chord.id} value={chord.id}>
                  {chord.name}
                </option>
              ))}
            </select>
          </label>
          <label className="settings-field">
            <span className="settings-field__label">{selectorText.progression}</span>
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
      ) : null}
    </section>
  );
}
