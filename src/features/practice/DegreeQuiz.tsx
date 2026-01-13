import { useMemo, useState } from 'react';
import { buildFretboard } from '../../lib/music/fretboard';
import { degreeLabel, noteNumberToName } from '../../lib/music/notes';
import { getScaleDefinition } from '../../lib/music/scales';
import { useAppStore } from '../../store/appStore';
import { useStatsStore } from '../../store/statsStore';
import FretboardGrid from '../../components/FretboardGrid';

const MODE_ID = 'degree-quiz';

const emptyHighlights = {
  scaleNotes: [],
  chordTones: [],
  guideTones: [],
  targetNotes: [],
  degreeMap: new Map<number, string>(),
};

export default function DegreeQuiz() {
  const cells = useMemo(() => buildFretboard(24), []);
  const { keyRoot, scaleId, layers, zoom } = useAppStore();
  const recordResult = useStatsStore((state) => state.recordResult);
  const scale = getScaleDefinition(scaleId);
  const [degreeIndex, setDegreeIndex] = useState(() => Math.floor(Math.random() * scale.intervals.length));
  const [feedback, setFeedback] = useState('');

  const targetNote = (keyRoot + scale.intervals[degreeIndex]) % 12;

  const handleClick = (cell: (typeof cells)[number]) => {
    const isCorrect = cell.noteNumber === targetNote;
    setFeedback(isCorrect ? '正解！' : `違います。${noteNumberToName(cell.noteNumber)}`);
    recordResult(MODE_ID, isCorrect);
    setDegreeIndex(Math.floor(Math.random() * scale.intervals.length));
  };

  return (
    <div className="practice">
      <div className="practice__header">
        <h3>度数当てクイズ</h3>
        <p>指定した度数の音をタップしてください。</p>
        <div className="practice__target">
          {noteNumberToName(keyRoot)} {scale.name} の {degreeLabel(degreeIndex)} 度
        </div>
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
