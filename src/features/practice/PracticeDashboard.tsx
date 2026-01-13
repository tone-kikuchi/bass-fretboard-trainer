import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import NoteQuiz from './NoteQuiz';
import DegreeQuiz from './DegreeQuiz';
import ChordToneLanding from './ChordToneLanding';
import GuideToneTrainer from './GuideToneTrainer';
import { TEXT, type Language } from '../../lib/i18n';
import FretboardSettings from '../fretboard/FretboardSettings';

type PracticeDashboardProps = {
  language: Language;
};

export default function PracticeDashboard({ language }: PracticeDashboardProps) {
  const modeLabels = TEXT[language].practice.modes;
  const modes = [
    { id: 'note', label: modeLabels.note },
    { id: 'degree', label: modeLabels.degree },
    { id: 'landing', label: modeLabels.landing },
    { id: 'guide', label: modeLabels.guide },
  ];
  const [mode, setMode] = useState('note');
  const {
    keyRoot,
    scaleId,
    chordId,
    progressionId,
    stringCount,
    tuningId,
    isLandscape,
    setKeyRoot,
    setScaleId,
    setChordId,
    setProgressionId,
    setStringCount,
    setTuningId,
    setLandscape,
  } = useAppStore();
  const showSettings = mode !== 'note';

  return (
    <div className="practice-dashboard">
      <div className="view-toggles">
        <label className="toggle">
          <input
            type="checkbox"
            checked={isLandscape}
            onChange={(event) => setLandscape(event.target.checked)}
          />
          横向き表示
        </label>
      </div>
      <div className="practice-dashboard__modes">
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            className={mode === item.id ? 'active' : ''}
            onClick={() => setMode(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="practice-dashboard__content">
        {showSettings ? (
          <FretboardSettings
            language={language}
            keyRoot={keyRoot}
            scaleId={scaleId}
            chordId={chordId}
            progressionId={progressionId}
            stringCount={stringCount}
            tuningId={tuningId}
            onKeyChange={setKeyRoot}
            onScaleChange={setScaleId}
            onChordChange={setChordId}
            onProgressionChange={setProgressionId}
            onStringCountChange={setStringCount}
            onTuningChange={setTuningId}
          />
        ) : null}
        {mode === 'note' && <NoteQuiz />}
        {mode === 'degree' && <DegreeQuiz />}
        {mode === 'landing' && <ChordToneLanding />}
        {mode === 'guide' && <GuideToneTrainer />}
      </div>
    </div>
  );
}
