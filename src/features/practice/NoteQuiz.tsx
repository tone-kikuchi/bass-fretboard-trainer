import { useMemo, useState } from 'react';
import { buildFretboard } from '../../lib/music/fretboard';
import { buildTuning } from '../../lib/music/tuning';
import { noteNumberToName } from '../../lib/music/notes';
import FretboardGrid from '../../components/FretboardGrid';
import { useAppStore } from '../../store/appStore';
import { useStatsStore } from '../../store/statsStore';

const MODE_ID = 'note-quiz';

const emptyHighlights = {
  scaleNotes: [],
  chordTones: [],
  guideTones: [],
  targetNotes: [],
  degreeMap: new Map<number, string>(),
};

export default function NoteQuiz() {
  const { layers, zoom, stringCount, tuningId } = useAppStore();
  const cells = useMemo(
    () => buildFretboard(24, buildTuning(stringCount, tuningId)),
    [stringCount, tuningId],
  );
  const recordResult = useStatsStore((state) => state.recordResult);
  const [targetNote, setTargetNote] = useState(() => Math.floor(Math.random() * 12));
  const [feedback, setFeedback] = useState<string>('');

  const handleClick = (cell: (typeof cells)[number]) => {
    const isCorrect = cell.noteNumber === targetNote;
    setFeedback(isCorrect ? '正解！' : `違います。${noteNumberToName(cell.noteNumber)}`);
    recordResult(MODE_ID, isCorrect);
    setTargetNote(Math.floor(Math.random() * 12));
  };

  return (
    <div className="practice">
      <div className="practice__header">
        <h3>ノート当てクイズ</h3>
        <p>次の音を指板からタップしてください。</p>
        <div className="practice__target">{noteNumberToName(targetNote)}</div>
        <p className="practice__feedback">{feedback}</p>
      </div>
      <FretboardGrid
        cells={cells}
        layers={layers}
        highlights={emptyHighlights}
        zoom={zoom}
        onCellClick={handleClick}
      />
    </div>
  );
}
