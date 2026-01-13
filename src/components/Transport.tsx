import type { ProgressionPreset } from '../lib/music/harmony';

export type TransportProps = {
  tempo: number;
  isPlaying: boolean;
  currentBar: number;
  preset: ProgressionPreset;
  onTempoChange: (tempo: number) => void;
  onToggle: () => void;
};

export default function Transport({
  tempo,
  isPlaying,
  currentBar,
  preset,
  onTempoChange,
  onToggle,
}: TransportProps) {
  return (
    <div className="transport">
      <div className="transport__controls">
        <button type="button" onClick={onToggle}>
          {isPlaying ? 'Stop' : 'Play'}
        </button>
        <label>
          Tempo
          <input
            type="range"
            min={40}
            max={200}
            value={tempo}
            onChange={(event) => onTempoChange(Number(event.target.value))}
          />
          <span>{tempo} BPM</span>
        </label>
      </div>
      <div className="transport__status">
        <span>Bar {currentBar + 1}</span>
        <span>{preset.steps[currentBar % preset.steps.length].degree}</span>
      </div>
    </div>
  );
}
