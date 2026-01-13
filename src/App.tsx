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
import { degreeLabel, intervalLabelFromRoot, noteNumberToName } from './lib/music/notes';
import { getScaleDefinition } from './lib/music/scales';
import { getChordTones, getGuideTones, buildProgression, PROGRESSION_PRESETS } from './lib/music/harmony';
import { useAppStore } from './store/appStore';
import { useStatsStore } from './store/statsStore';
import { TEXT, getScaleLabel, getTuningLabel } from './lib/i18n';

export default function App() {
  const {
    language,
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
    setLanguage,
  } = useAppStore();
  const appText = TEXT[language].app;
  const tuning = useMemo(() => buildTuning(stringCount, tuningId), [stringCount, tuningId]);
  const cells = useMemo(() => buildFretboard(24, tuning), [tuning]);
  const tuningPreset =
    TUNING_PRESETS.find((preset) => preset.id === tuningId) ?? TUNING_PRESETS[0];
  const tuningLabel = getTuningLabel(tuningPreset.id, language, tuningPreset.name);
  const stats = useStatsStore((state) => state.modeStats);
  const resetStats = useStatsStore((state) => state.reset);
  const scale = getScaleDefinition(scaleId);
  const scaleLabel = getScaleLabel(scale.id, language);
  const scaleNotes = scale.intervals.map((interval) => (keyRoot + interval) % 12);
  const scaleNoteNames = scale.intervals.map((interval) => noteNumberToName(keyRoot + interval));
  const stringScaleNotes = useMemo(() => {
    const scaleNoteSet = new Set(scaleNotes);
    return tuning.map((string) => {
      const notes = Array.from({ length: 13 }, (_, fret) => {
        const noteNumber = (string.note + fret) % 12;
        if (!scaleNoteSet.has(noteNumber)) {
          return null;
        }
        return { fret, noteName: noteNumberToName(noteNumber) };
      }).filter((note): note is { fret: number; noteName: string } => Boolean(note));
      return { stringName: string.name, notes };
    });
  }, [scaleNotes, tuning]);
  const chordTones = getChordTones(keyRoot, chordId);
  const guideTones = getGuideTones(keyRoot, chordId);
  const degreeMap = new Map(scaleNotes.map((note, index) => [note, degreeLabel(index)]));
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

  const highlights = {
    scaleNotes: layers.showScale ? scaleNotes : [],
    chordTones: layers.showChord ? chordTones : [],
    guideTones: layers.showGuide ? guideTones : [],
    targetNotes: [],
    rootNotes: layers.showRoot ? [keyRoot] : [],
    degreeMap: layers.showDegrees ? degreeMap : new Map<number, string>(),
    intervalMap: layers.showIntervals ? intervalMap : new Map<number, string>(),
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
    rootNotes: layers.showRoot ? [keyRoot] : [],
    degreeMap: layers.showDegrees ? degreeMap : new Map<number, string>(),
    intervalMap: layers.showIntervals ? intervalMap : new Map<number, string>(),
  };

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>{appText.title}</h1>
          <p className="app__subtitle">{appText.subtitle}</p>
        </div>
        <nav>
          <NavLink to="/" end>
            {appText.nav.fretboard}
          </NavLink>
          <NavLink to="/practice">{appText.nav.practice}</NavLink>
          <NavLink to="/progression">{appText.nav.progression}</NavLink>
          <NavLink to="/stats">{appText.nav.stats}</NavLink>
          <NavLink to="/help">{appText.nav.help}</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="page">
                <h2>{appText.pages.fretboard}</h2>
                <SelectorKeyScaleChord
                  language={language}
                  keyRoot={keyRoot}
                  scaleId={scaleId}
                  chordId={chordId}
                  progressionId={progressionId}
                  stringCount={stringCount}
                  tuningId={tuningId}
                  onLanguageChange={setLanguage}
                  onKeyChange={setKeyRoot}
                  onScaleChange={setScaleId}
                  onChordChange={setChordId}
                  onProgressionChange={setProgressionId}
                  onStringCountChange={setStringCount}
                  onTuningChange={setTuningId}
                />
                <LayerToggles language={language} layers={layers} onToggle={setLayer} />
                <div className="zoom">
                  <label>
                    {appText.zoom}
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
                  <span>
                    {appText.legend.key}: {noteNumberToName(keyRoot)}
                  </span>
                  <span>
                    {appText.legend.scale}: {scaleLabel}
                  </span>
                  <span>
                    {appText.legend.tuning}: {tuningLabel}
                  </span>
                </div>
                <div className="scale-info">
                  <div>
                    <h3>
                      {noteNumberToName(keyRoot)} {scaleLabel} {appText.scaleInfo.notes}
                    </h3>
                    <div className="scale-info__notes">
                      {scaleNoteNames.map((note, index) => (
                        <span key={`${note}-${index}`} className="scale-info__note">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3>{appText.scaleInfo.fretboard}</h3>
                    <div className="scale-info__strings">
                      {stringScaleNotes.map((string) => (
                        <div key={string.stringName} className="scale-info__string">
                          <span className="scale-info__string-name">{string.stringName}</span>
                          <div className="scale-info__string-notes">
                            {string.notes.map((note) => (
                              <span
                                key={`${string.stringName}-${note.fret}`}
                                className="scale-info__fret-note"
                              >
                                {note.fret}:{note.noteName}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            }
          />
          <Route
            path="/practice"
            element={
              <section className="page">
                <h2>{appText.pages.practice}</h2>
                <PracticeDashboard language={language} />
              </section>
            }
          />
          <Route
            path="/progression"
            element={
              <section className="page">
                <h2>{appText.pages.progression}</h2>
                <SelectorKeyScaleChord
                  language={language}
                  keyRoot={keyRoot}
                  scaleId={scaleId}
                  chordId={chordId}
                  progressionId={progressionId}
                  stringCount={stringCount}
                  tuningId={tuningId}
                  onLanguageChange={setLanguage}
                  onKeyChange={setKeyRoot}
                  onScaleChange={setScaleId}
                  onChordChange={setChordId}
                  onProgressionChange={setProgressionId}
                  onStringCountChange={setStringCount}
                  onTuningChange={setTuningId}
                />
                <LayerToggles language={language} layers={layers} onToggle={setLayer} />
                <Transport
                  language={language}
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
                <h2>{appText.pages.stats}</h2>
                <StatsView language={language} stats={stats} onReset={resetStats} />
              </section>
            }
          />
          <Route
            path="/help"
            element={
              <section className="page">
                <h2>{appText.pages.help}</h2>
                <div className="help">
                  <h3>{appText.help.minimalRules}</h3>
                  <ul>
                    {appText.help.mottos.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <h3>{appText.help.usage}</h3>
                  <ul>
                    {appText.help.usageItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3>{appText.help.features}</h3>
                  <ul>
                    {appText.help.featureItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
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
