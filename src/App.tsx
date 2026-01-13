import { NavLink, Route, Routes } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import FretboardGrid from './components/FretboardGrid';
import LayerToggles from './components/LayerToggles';
import SelectorKeyScaleChord from './components/SelectorKeyScaleChord';
import Transport from './components/Transport';
import StatsView from './components/StatsView';
import PracticeDashboard from './features/practice/PracticeDashboard';
import { buildFretboard } from './lib/music/fretboard';
import { buildTuning, TUNING_PRESETS } from './lib/music/tuning';
import { degreeLabel, noteNumberToName } from './lib/music/notes';
import { getScaleDefinition } from './lib/music/scales';
import { getChordTones, getGuideTones, buildProgression, PROGRESSION_PRESETS } from './lib/music/harmony';
import { useAppStore } from './store/appStore';
import { useStatsStore } from './store/statsStore';

const motto = [
  'スケールは素材。着地はコードトーン。',
  '迷ったら 3rd と 7th（ガイドトーン）を見ろ。',
  '次のコードの 3rd に着地すると“それっぽく”なる。',
];

export default function App() {
  const {
    keyRoot,
    scaleId,
    chordId,
    progressionId,
    stringCount,
    tuningId,
    zoom,
    layers,
    setKeyRoot,
    setScaleId,
    setChordId,
    setProgressionId,
    setStringCount,
    setTuningId,
    setZoom,
    setLayer,
  } = useAppStore();
  const tuning = useMemo(() => buildTuning(stringCount, tuningId), [stringCount, tuningId]);
  const cells = useMemo(() => buildFretboard(24, tuning), [tuning]);
  const tuningLabel =
    TUNING_PRESETS.find((preset) => preset.id === tuningId)?.name ?? TUNING_PRESETS[0].name;
  const stats = useStatsStore((state) => state.modeStats);
  const resetStats = useStatsStore((state) => state.reset);
  const scale = getScaleDefinition(scaleId);
  const scaleNotes = scale.intervals.map((interval) => (keyRoot + interval) % 12);
  const chordTones = getChordTones(keyRoot, chordId);
  const guideTones = getGuideTones(keyRoot, chordId);
  const degreeMap = new Map(scaleNotes.map((note, index) => [note, degreeLabel(index)]));

  const highlights = {
    scaleNotes: layers.showScale ? scaleNotes : [],
    chordTones: layers.showChord ? chordTones : [],
    guideTones: layers.showGuide ? guideTones : [],
    targetNotes: [],
    degreeMap: layers.showDegrees ? degreeMap : new Map<number, string>(),
  };

  const preset = PROGRESSION_PRESETS.find((item) => item.id === progressionId) ?? PROGRESSION_PRESETS[0];
  const progression = buildProgression(keyRoot, preset);
  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBar, setCurrentBar] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const barDuration = (60 / tempo) * 4 * 1000;
    const intervalId = window.setInterval(() => {
      setCurrentBar((bar) => (bar + 1) % progression.length);
    }, barDuration);
    return () => window.clearInterval(intervalId);
  }, [isPlaying, tempo, progression.length]);

  const nextBar = (currentBar + 1) % progression.length;
  const targetGuide = getGuideTones(progression[nextBar].root, progression[nextBar].quality);

  const progressionHighlights = {
    scaleNotes: layers.showScale ? scaleNotes : [],
    chordTones: layers.showChord ? getChordTones(progression[currentBar].root, progression[currentBar].quality) : [],
    guideTones: layers.showGuide ? getGuideTones(progression[currentBar].root, progression[currentBar].quality) : [],
    targetNotes: targetGuide,
    degreeMap: layers.showDegrees ? degreeMap : new Map<number, string>(),
  };

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>Bass Fretboard Trainer</h1>
          <p className="app__subtitle">アドリブに効く指板とターゲット練習</p>
        </div>
        <nav>
          <NavLink to="/" end>
            Fretboard
          </NavLink>
          <NavLink to="/practice">Practice</NavLink>
          <NavLink to="/progression">Progression</NavLink>
          <NavLink to="/stats">Stats</NavLink>
          <NavLink to="/help">Help</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="page">
                <h2>Fretboard</h2>
                <SelectorKeyScaleChord
                  keyRoot={keyRoot}
                  scaleId={scaleId}
                  chordId={chordId}
                  progressionId={progressionId}
                  stringCount={stringCount}
                  tuningId={tuningId}
                  onKeyChange={setKeyRoot}
                  onScaleChange={setScaleId}
                  onChordChange={setChordId}
                  onProgressionChange={setProgressionId}
                  onStringCountChange={setStringCount}
                  onTuningChange={setTuningId}
                />
                <LayerToggles layers={layers} onToggle={setLayer} />
                <div className="zoom">
                  <label>
                    Zoom
                    <input
                      type="range"
                      min={0.8}
                      max={1.4}
                      step={0.05}
                      value={zoom}
                      onChange={(event) => setZoom(Number(event.target.value))}
                    />
                    <span>{Math.round(zoom * 100)}%</span>
                  </label>
                </div>
                <FretboardGrid cells={cells} layers={layers} highlights={highlights} zoom={zoom} />
                <div className="legend">
                  <span>Key: {noteNumberToName(keyRoot)}</span>
                  <span>Scale: {scale.name}</span>
                  <span>Tuning: {tuningLabel}</span>
                </div>
              </section>
            }
          />
          <Route
            path="/practice"
            element={
              <section className="page">
                <h2>Practice</h2>
                <PracticeDashboard />
              </section>
            }
          />
          <Route
            path="/progression"
            element={
              <section className="page">
                <h2>Progression</h2>
                <SelectorKeyScaleChord
                  keyRoot={keyRoot}
                  scaleId={scaleId}
                  chordId={chordId}
                  progressionId={progressionId}
                  stringCount={stringCount}
                  tuningId={tuningId}
                  onKeyChange={setKeyRoot}
                  onScaleChange={setScaleId}
                  onChordChange={setChordId}
                  onProgressionChange={setProgressionId}
                  onStringCountChange={setStringCount}
                  onTuningChange={setTuningId}
                />
                <LayerToggles layers={layers} onToggle={setLayer} />
                <Transport
                  tempo={tempo}
                  isPlaying={isPlaying}
                  currentBar={currentBar}
                  preset={preset}
                  onTempoChange={setTempo}
                  onToggle={() => setIsPlaying((value) => !value)}
                />
                <div className="progression">
                  {progression.map((step, index) => (
                    <div
                      key={`${step.degree}-${index}`}
                      className={index === currentBar ? 'progression__step active' : 'progression__step'}
                    >
                      <div>{step.degree}</div>
                      <strong>{step.chordName}</strong>
                    </div>
                  ))}
                </div>
                <FretboardGrid
                  cells={cells}
                  layers={layers}
                  highlights={progressionHighlights}
                  zoom={zoom}
                />
              </section>
            }
          />
          <Route
            path="/stats"
            element={
              <section className="page">
                <h2>Stats</h2>
                <StatsView stats={stats} onReset={resetStats} />
              </section>
            }
          />
          <Route
            path="/help"
            element={
              <section className="page">
                <h2>Help</h2>
                <div className="help">
                  <h3>最小ルール</h3>
                  <ul>
                    {motto.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <h3>使い方</h3>
                  <ul>
                    <li>Fretboard: キー/スケール/コードを選んで指板を確認。</li>
                    <li>Practice: 4つの練習モードでターゲットに着地。</li>
                    <li>Progression: 進行の中でガイドトーンを視覚化。</li>
                    <li>Stats: 正答率で苦手ポイントを可視化。</li>
                  </ul>
                </div>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
