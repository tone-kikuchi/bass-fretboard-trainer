import { useMemo, useState } from 'react';
import { buildFretboard } from '../../lib/music/fretboard';
import { buildTuning } from '../../lib/music/tuning';
import { intervalLabelFromRoot, noteNumberToName } from '../../lib/music/notes';
import { getChordTones, getGuideTones } from '../../lib/music/harmony';
import FretboardGrid from '../../components/FretboardGrid';
import { useAppStore } from '../../store/appStore';
import { useStatsStore } from '../../store/statsStore';
import { TEXT } from '../../lib/i18n';

const MODE_ID = 'chord-landing';

export default function ChordToneLanding() {
  const { keyRoot, chordId, layers, zoom, stringCount, tuningId, isLandscape } = useAppStore();
  const { language, keyRoot, chordId, layers, zoom, stringCount, tuningId } = useAppStore();
  const cells = useMemo(
    () => buildFretboard(24, buildTuning(stringCount, tuningId)),
    [stringCount, tuningId],
  );
  const recordResult = useStatsStore((state) => state.recordResult);
  const chordTones = getChordTones(keyRoot, chordId);
  const guideTones = getGuideTones(keyRoot, chordId);
  const [feedback, setFeedback] = useState('');
  const practiceText = TEXT[language].practice.chordLanding;
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
    const isTarget = guideTones.includes(cell.noteNumber);
    const isChord = chordTones.includes(cell.noteNumber);
    const isCorrect = isTarget || isChord;

    setFeedback(
      isTarget
        ? practiceText.guide
        : isChord
          ? practiceText.chord
          : practiceText.out(noteNumberToName(cell.noteNumber)),
    );
    recordResult(MODE_ID, isCorrect);
  };

  const highlights = {
    scaleNotes: [],
    chordTones,
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
        <div className="practice__target">{practiceText.target}</div>
        <p className="practice__feedback">{feedback}</p>
      </div>
      <FretboardGrid
        cells={cells}
        layers={layers}
        highlights={highlights}
        zoom={zoom}
        isLandscape={isLandscape}
        onCellClick={handleClick}
      />
    </div>
  );
}
