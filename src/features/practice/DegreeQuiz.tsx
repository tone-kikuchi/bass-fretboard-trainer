import { useMemo, useState } from 'react';
import { buildFretboard } from '../../lib/music/fretboard';
import { buildTuning } from '../../lib/music/tuning';
import { degreeLabel, intervalLabelFromRoot, noteNumberToName } from '../../lib/music/notes';
import { getScaleDefinition } from '../../lib/music/scales';
import { TEXT, getScaleLabel } from '../../lib/i18n';
import { useAppStore } from '../../store/appStore';
import { useStatsStore } from '../../store/statsStore';
import FretboardGrid from '../../components/FretboardGrid';

const MODE_ID = 'degree-quiz';

export default function DegreeQuiz() {
  const { keyRoot, scaleId, layers, zoom, stringCount, tuningId, isLandscape } = useAppStore();
  const { language, keyRoot, scaleId, layers, zoom, stringCount, tuningId } = useAppStore();
  const cells = useMemo(
    () => buildFretboard(24, buildTuning(stringCount, tuningId)),
    [stringCount, tuningId],
  );
  const recordResult = useStatsStore((state) => state.recordResult);
  const scale = getScaleDefinition(scaleId);
  const [degreeIndex, setDegreeIndex] = useState(() => Math.floor(Math.random() * scale.intervals.length));
  const [feedback, setFeedback] = useState('');
  const practiceText = TEXT[language].practice.degreeQuiz;
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

  const targetNote = (keyRoot + scale.intervals[degreeIndex]) % 12;

  const handleClick = (cell: (typeof cells)[number]) => {
    const isCorrect = cell.noteNumber === targetNote;
    setFeedback(
      isCorrect ? practiceText.correct : practiceText.incorrect(noteNumberToName(cell.noteNumber)),
    );
    recordResult(MODE_ID, isCorrect);
    setDegreeIndex(Math.floor(Math.random() * scale.intervals.length));
  };

  return (
    <div className="practice">
      <div className="practice__header">
        <h3>{practiceText.title}</h3>
        <p>{practiceText.description}</p>
        <div className="practice__target">
          {practiceText.target(
            noteNumberToName(keyRoot),
            getScaleLabel(scale.id, language),
            degreeLabel(degreeIndex),
          )}
        </div>
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
        isLandscape={isLandscape}
        onCellClick={handleClick}
      />
    </div>
  );
}
