import { noteNumberToName } from '../lib/music/notes';
import type { FretboardCell } from '../lib/music/fretboard';
import type { LayerSettings } from '../store/appStore';

export type HighlightSet = {
  scaleNotes: number[];
  chordTones: number[];
  guideTones: number[];
  targetNotes: number[];
  degreeMap: Map<number, string>;
};

type FretboardGridProps = {
  cells: FretboardCell[];
  layers: LayerSettings;
  highlights: HighlightSet;
  zoom: number;
  onCellClick?: (cell: FretboardCell) => void;
};

const hasNote = (list: number[], note: number) => list.includes(note);

export default function FretboardGrid({
  cells,
  layers,
  highlights,
  zoom,
  onCellClick,
}: FretboardGridProps) {
  return (
    <div className="fretboard" style={{ transform: `scale(${zoom})` }}>
      {cells.map((cell) => {
        const isScale = hasNote(highlights.scaleNotes, cell.noteNumber);
        const isChord = hasNote(highlights.chordTones, cell.noteNumber);
        const isGuide = hasNote(highlights.guideTones, cell.noteNumber);
        const isTarget = hasNote(highlights.targetNotes, cell.noteNumber);
        return (
          <button
            key={`${cell.stringIndex}-${cell.fret}`}
            className={
              `fretboard__cell` +
              `${isScale ? ' fretboard__cell--scale' : ''}` +
              `${isChord ? ' fretboard__cell--chord' : ''}` +
              `${isGuide ? ' fretboard__cell--guide' : ''}` +
              `${isTarget ? ' fretboard__cell--target' : ''}`
            }
            onClick={() => onCellClick?.(cell)}
            type="button"
          >
            <div className="fretboard__note">
              {layers.showNoteNames && noteNumberToName(cell.noteNumber)}
            </div>
            <div className="fretboard__degree">
              {layers.showDegrees && highlights.degreeMap.get(cell.noteNumber)}
            </div>
            <div className="fretboard__meta">
              {cell.stringName}
              {cell.fret}
            </div>
          </button>
        );
      })}
    </div>
  );
}
