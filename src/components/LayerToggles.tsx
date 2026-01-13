import type { LayerSettings } from '../store/appStore';

const LABELS: Record<keyof LayerSettings, string> = {
  showNoteNames: '音名',
  showRoot: 'ルート',
  showDegrees: '度数',
  showIntervals: 'ルート度数',
  showScale: 'スケール',
  showChord: 'コードトーン',
  showGuide: 'ガイドトーン',
};

type LayerTogglesProps = {
  layers: LayerSettings;
  onToggle: (layer: keyof LayerSettings, value: boolean) => void;
};

export default function LayerToggles({ layers, onToggle }: LayerTogglesProps) {
  return (
    <div className="layer-toggles">
      {Object.entries(layers).map(([key, value]) => (
        <label key={key} className="toggle">
          <input
            type="checkbox"
            checked={value}
            onChange={(event) =>
              onToggle(key as keyof LayerSettings, event.target.checked)
            }
          />
          {LABELS[key as keyof LayerSettings]}
        </label>
      ))}
    </div>
  );
}
