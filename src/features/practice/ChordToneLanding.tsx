import { useMemo, useState } from 'react';
import { buildFretboard } from '../../lib/music/fretboard';
import { buildTuning } from '../../lib/music/tuning';
import { noteNumberToName } from '../../lib/music/notes';
import { getChordTones, getGuideTones } from '../../lib/music/harmony';
import FretboardGrid from '../../components/FretboardGrid';
import { useAppStore } from '../../store/appStore';
import { useStatsStore } from '../../store/statsStore';

const MODE_ID = 'chord-landing';

export default function ChordToneLanding() {
  const { keyRoot, chordId, layers, zoom, stringCount, tuningId } = useAppStore();
  const cells = useMemo(
    () => buildFretboard(24, buildTuning(stringCount, tuningId)),
    [stringCount, tuningId],
  );
  const recordResult = useStatsStore((state) => state.recordResult);
  const chordTones = getChordTones(keyRoot, chordId);
  const guideTones = getGuideTones(keyRoot, chordId);
  const [feedback, setFeedback] = useState('');

  const handleClick = (cell: (typeof cells)[number]) => {
    const isTarget = guideTones.includes(cell.noteNumber);
    const isChord = chordTones.includes(cell.noteNumber);
    const isCorrect = isTarget || isChord;

    setFeedback(
      isTarget
        ? 'ガイドトーンに着地！'
        : isChord
          ? 'コードトーンに着地！'
          : `アウト：${noteNumberToName(cell.noteNumber)}`,
    );
    recordResult(MODE_ID, isCorrect);
  };

  const highlights = {
    scaleNotes: [],
    chordTones,
    guideTones,
    targetNotes: guideTones,
    degreeMap: new Map<number, string>(),
  };

  return (
    <div className="practice">
      <div className="practice__header">
        <h3>コードトーン着地</h3>
        <p>コードトーン、特に 3rd/7th に着地する練習です。</p>
        <div className="practice__target">ターゲット: ガイドトーン</div>
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
