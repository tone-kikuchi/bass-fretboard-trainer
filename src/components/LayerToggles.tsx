import { TEXT, type Language } from '../lib/i18n';
import type { LayerSettings } from '../store/appStore';

type LayerTogglesProps = {
  language: Language;
  layers: LayerSettings;
  onToggle: (layer: keyof LayerSettings, value: boolean) => void;
};

export default function LayerToggles({ language, layers, onToggle }: LayerTogglesProps) {
  const labels = TEXT[language].layers;

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
          {labels[key as keyof LayerSettings]}
        </label>
      ))}
    </div>
  );
}
