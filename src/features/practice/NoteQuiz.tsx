import { useMemo, useState } from 'react';
import { buildFretboard } from '../../lib/music/fretboard';
import { noteNumberToName } from '../../lib/music/notes';
import { buildTuning } from '../../lib/music/tuning';
import FretboardGrid from '../../components/FretboardGrid';
import { useAppStore } from '../../store/appStore';
import { useStatsStore } from '../../store/statsStore';
import { TEXT } from '../../lib/i18n';

const MODE_ID = 'note-quiz';

export default function NoteQuiz() {
  const { layers, zoom, stringCount, tuningId, isLandscape } = useAppStore();
  const { language, layers, zoom, stringCount, tuningId } = useAppStore();
  const cells = useMemo(
    () => buildFretboard(24, buildTuning(stringCount, tuningId)),
    [stringCount, tuningId],
  );
  const recordResult = useStatsStore((state) => state.recordResult);
  const practiceText = TEXT[language].practice.noteQuiz;
  const [targetNote, setTargetNote] = useState(() => Math.floor(Math.random() * 12));
  const [feedback, setFeedback] = useState<string>('');

  const handleClick = (cell: (typeof cells)[number]) => {
    const isCorrect = cell.noteNumber === targetNote;
    setFeedback(
      isCorrect ? practiceText.correct : practiceText.incorrect(noteNumberToName(cell.noteNumber)),
    );
    recordResult(MODE_ID, isCorrect);
    setTargetNote(Math.floor(Math.random() * 12));
  };

  return (
    <div className="practice">
      <div className="practice__header">
        <h3>{practiceText.title}</h3>
        <p>{practiceText.description}</p>
        <div className="practice__target">{noteNumberToName(targetNote)}</div>
        <p className="practice__feedback">{feedback}</p>
      </div>
      <FretboardGrid
        cells={cells}
        layers={{ ...layers, showNoteNames: false }}
        highlights={{
          scaleNotes: [],
          chordTones: [],
          guideTones: [],
          targetNotes: [],
          rootNotes: [],
          degreeMap: new Map<number, string>(),
          intervalMap: new Map<number, string>(),
        }}
        zoom={zoom}
        isLandscape={isLandscape}
        onCellClick={handleClick}
      />
    </div>
  );
}
