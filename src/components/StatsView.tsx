import type { ModeStats } from '../store/statsStore';

export type StatsViewProps = {
  stats: Record<string, ModeStats>;
  onReset: () => void;
};

const modeLabel: Record<string, string> = {
  'note-quiz': 'ノート当てクイズ',
  'degree-quiz': '度数当てクイズ',
  'chord-landing': 'コードトーン着地',
  'guide-tone': 'ガイドトーン練習',
};

export default function StatsView({ stats, onReset }: StatsViewProps) {
  const entries = Object.entries(stats);
  return (
    <div className="stats">
      <div className="stats__header">
        <h3>練習ログ</h3>
        <button type="button" onClick={onReset}>
          リセット
        </button>
      </div>
      {entries.length === 0 ? (
        <p>まだ記録がありません。練習を始めましょう。</p>
      ) : (
        <ul>
          {entries.map(([mode, value]) => (
            <li key={mode}>
              <strong>{modeLabel[mode] ?? mode}</strong>: {value.correct} / {value.attempts}
              ({value.attempts ? Math.round((value.correct / value.attempts) * 100) : 0}%)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
