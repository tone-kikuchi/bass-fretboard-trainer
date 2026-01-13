import { useMemo, useState } from 'react';
import { buildFretboard } from '../../lib/music/fretboard';
import { intervalLabelFromRoot, noteNumberToName } from '../../lib/music/notes';
import FretboardGrid from '../../components/FretboardGrid';
import { useAppStore } from '../../store/appStore';
import { useStatsStore } from '../../store/statsStore';

const MODE_ID = 'note-quiz';

export default function NoteQuiz() {
  const cells = useMemo(() => buildFretboard(24), []);
  const { layers, zoom, keyRoot } = useAppStore();
  const recordResult = useStatsStore((state) => state.recordResult);
  const [targetNote, setTargetNote] = useState(() => Math.floor(Math.random() * 12));
  const [feedback, setFeedback] = useState<string>('');
  const intervalMap = useMemo(
    () =>
      new Map(
        Array.from({ length: 12 }, (_, note) => [
          note,
          intervalLabelFromRoot(note, keyRoot),
        ]),
      ),
    [keyRoot],
  );

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
        highlights={{
          scaleNotes: [],
          chordTones: [],
          guideTones: [],
          targetNotes: [],
          rootNotes: layers.showRoot ? [keyRoot] : [],
          degreeMap: new Map<number, string>(),
          intervalMap: layers.showIntervals ? intervalMap : new Map<number, string>(),
        }}
        zoom={zoom}
        onCellClick={handleClick}
      />
    </div>
  );
}
