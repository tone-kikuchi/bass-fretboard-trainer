import { useMemo, useState } from 'react';
import { buildFretboard } from '../../lib/music/fretboard';
import { buildTuning } from '../../lib/music/tuning';
import { intervalLabelFromRoot, noteNumberToName } from '../../lib/music/notes';
import { buildProgression, getGuideTones, PROGRESSION_PRESETS } from '../../lib/music/harmony';
import FretboardGrid from '../../components/FretboardGrid';
import { useAppStore } from '../../store/appStore';
import { useStatsStore } from '../../store/statsStore';
import { TEXT } from '../../lib/i18n';

const MODE_ID = 'guide-tone';

export default function GuideToneTrainer() {
  const { language, keyRoot, progressionId, layers, zoom, stringCount, tuningId } = useAppStore();
  const cells = useMemo(
    () => buildFretboard(24, buildTuning(stringCount, tuningId)),
    [stringCount, tuningId],
  );
  const recordResult = useStatsStore((state) => state.recordResult);
  const preset = PROGRESSION_PRESETS.find((item) => item.id === progressionId) ?? PROGRESSION_PRESETS[0];
  const progression = buildProgression(keyRoot, preset);
  const [barIndex, setBarIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const practiceText = TEXT[language].practice.guideTone;
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

  const current = progression[barIndex % progression.length];
  const next = progression[(barIndex + 1) % progression.length];
  const guideTones = getGuideTones(next.root, next.quality);

  const handleClick = (cell: (typeof cells)[number]) => {
    const isCorrect = guideTones.includes(cell.noteNumber);
    setFeedback(
      isCorrect
        ? practiceText.correct
        : practiceText.incorrect(noteNumberToName(cell.noteNumber)),
    );
    recordResult(MODE_ID, isCorrect);
    setBarIndex((index) => (index + 1) % progression.length);
  };

  const highlights = {
    scaleNotes: [],
    chordTones: [],
    guideTones,
    targetNotes: guideTones,
    rootNotes: layers.showRoot ? [keyRoot] : [],
    degreeMap: new Map<number, string>(),
    intervalMap: layers.showIntervals ? intervalMap : new Map<number, string>(),
  };

  return (
    <div className="practice">
      <div className="practice__header">
        <h3>{practiceText.title}</h3>
        <p>{practiceText.description}</p>
        <div className="practice__target">
          {practiceText.target(current.chordName, next.chordName)}
        </div>
        <p className="practice__feedback">{feedback}</p>
      </div>
      <FretboardGrid
        cells={cells}
        layers={layers}
        highlights={highlights}
        zoom={zoom}
        onCellClick={handleClick}
      />
    </div>
  );
}
