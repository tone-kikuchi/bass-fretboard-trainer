import { useState } from 'react';
import NoteQuiz from './NoteQuiz';
import DegreeQuiz from './DegreeQuiz';
import ChordToneLanding from './ChordToneLanding';
import GuideToneTrainer from './GuideToneTrainer';

const MODES = [
  { id: 'note', label: 'ノート当て' },
  { id: 'degree', label: '度数当て' },
  { id: 'landing', label: 'コードトーン着地' },
  { id: 'guide', label: 'ガイドトーン' },
];

export default function PracticeDashboard() {
  const [mode, setMode] = useState('note');

  return (
    <div className="practice-dashboard">
      <div className="practice-dashboard__modes">
        {MODES.map((item) => (
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
        {mode === 'note' && <NoteQuiz />}
        {mode === 'degree' && <DegreeQuiz />}
        {mode === 'landing' && <ChordToneLanding />}
        {mode === 'guide' && <GuideToneTrainer />}
      </div>
    </div>
  );
}
