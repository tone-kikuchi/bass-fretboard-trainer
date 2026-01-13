import { noteNumberToName } from '../lib/music/notes';
import type { FretboardCell } from '../lib/music/fretboard';
import type { LayerSettings } from '../store/appStore';

export type HighlightSet = {
  scaleNotes: number[];
  chordTones: number[];
  guideTones: number[];
  targetNotes: number[];
  rootNotes: number[];
  degreeMap: Map<number, string>;
  intervalMap: Map<number, string>;
};

type FretboardGridProps = {
  cells: FretboardCell[];
  layers: LayerSettings;
  highlights: HighlightSet;
  zoom: number;
  onCellClick?: (cell: FretboardCell) => void;
};

const hasNote = (list: number[], note: number) => list.includes(note);
const INLAY_FRETS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21, 24]);
const DOUBLE_INLAY_FRETS = new Set([12, 24]);

export default function FretboardGrid({
  cells,
  layers,
  highlights,
  zoom,
  onCellClick,
}: FretboardGridProps) {
  const maxFret = cells.reduce((max, cell) => Math.max(max, cell.fret), 0);
  const frets = Array.from({ length: maxFret + 1 }, (_, index) => index);
  const stringsMap = new Map<
    number,
    { name: string; cellsByFret: Map<number, FretboardCell> }
  >();

  cells.forEach((cell) => {
    const entry = stringsMap.get(cell.stringIndex);
    if (!entry) {
      stringsMap.set(cell.stringIndex, {
        name: cell.stringName,
        cellsByFret: new Map([[cell.fret, cell]]),
      });
      return;
    }
    entry.cellsByFret.set(cell.fret, cell);
  });

  const strings = Array.from(stringsMap.entries())
    .sort(([a], [b]) => b - a)
    .map(([, data]) => data);

  return (
    <div className="fretboard__wrapper">
      <div className="fretboard" style={{ transform: `scale(${zoom})` }}>
        <div className="fretboard__numbers">
          <div className="fretboard__corner">Fret</div>
          {frets.map((fret) => (
            <div key={`fret-${fret}`} className="fretboard__number">
              {fret}
            </div>
          ))}
        </div>
        <div className="fretboard__rows">
          {strings.map((stringData) => (
            <div key={stringData.name} className="fretboard__row">
              <div className="fretboard__string-label">{stringData.name}</div>
              {frets.map((fret) => {
                const cell = stringData.cellsByFret.get(fret);
                if (!cell) {
                  return <div key={`${stringData.name}-${fret}`} className="fretboard__cell" />;
                }
                const isScale = hasNote(highlights.scaleNotes, cell.noteNumber);
                const isChord = hasNote(highlights.chordTones, cell.noteNumber);
                const isGuide = hasNote(highlights.guideTones, cell.noteNumber);
                const isTarget = hasNote(highlights.targetNotes, cell.noteNumber);
                const isRoot = hasNote(highlights.rootNotes, cell.noteNumber);
                const isInlay = INLAY_FRETS.has(cell.fret);
                const isDoubleInlay = DOUBLE_INLAY_FRETS.has(cell.fret);
                return (
                  <button
                    key={`${cell.stringIndex}-${cell.fret}`}
                    className={
                      `fretboard__cell` +
                      `${isScale ? ' fretboard__cell--scale' : ''}` +
                      `${isChord ? ' fretboard__cell--chord' : ''}` +
                      `${isGuide ? ' fretboard__cell--guide' : ''}` +
                      `${isTarget ? ' fretboard__cell--target' : ''}` +
                      `${isRoot ? ' fretboard__cell--root' : ''}` +
                      `${isInlay ? ' fretboard__cell--inlay' : ''}` +
                      `${isDoubleInlay ? ' fretboard__cell--double' : ''}`
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
                    <div className="fretboard__interval">
                      {layers.showIntervals && highlights.intervalMap.get(cell.noteNumber)}
                    </div>
                    {layers.showRoot && isRoot && <div className="fretboard__root">ROOT</div>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
