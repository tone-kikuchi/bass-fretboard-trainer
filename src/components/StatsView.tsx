import { TEXT, type Language } from '../lib/i18n';
import type { ModeStats } from '../store/statsStore';

export type StatsViewProps = {
  language: Language;
  stats: Record<string, ModeStats>;
  onReset: () => void;
};

export default function StatsView({ language, stats, onReset }: StatsViewProps) {
  const statsText = TEXT[language].stats;
  const entries = Object.entries(stats);

  return (
    <div className="stats">
      <div className="stats__header">
        <h3>{statsText.title}</h3>
        <button type="button" onClick={onReset}>
          {statsText.reset}
        </button>
      </div>
      {entries.length === 0 ? (
        <p>{statsText.empty}</p>
      ) : (
        <ul>
          {entries.map(([mode, value]) => (
            <li key={mode}>
              <strong>{statsText.modes[mode] ?? mode}</strong>: {value.correct} / {value.attempts}
              ({value.attempts ? Math.round((value.correct / value.attempts) * 100) : 0}%)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
