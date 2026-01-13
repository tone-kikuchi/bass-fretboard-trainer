import { useCallback, useEffect, useRef, useState } from 'react';
import type { ScaleDefinition } from '../lib/music/scales';
import { noteNumberToName } from '../lib/music/notes';

type ScalePlaybackProps = {
  keyRoot: number;
  scale: ScaleDefinition;
};

const NOTE_DURATION = 0.45;
const ROOT_MIDI_BASE = 48;
const MAX_GAIN = 0.22;

const midiToFrequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

export default function ScalePlayback({ keyRoot, scale }: ScalePlaybackProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const stopPlayback = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playScale = useCallback(async () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;
    await audioContext.resume();

    const rootMidi = ROOT_MIDI_BASE + keyRoot;
    const intervals = [...scale.intervals, 12];
    const startTime = audioContext.currentTime + 0.05;

    intervals.forEach((interval, index) => {
      const noteTime = startTime + index * NOTE_DURATION;
      const releaseTime = noteTime + NOTE_DURATION * 0.8;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(midiToFrequency(rootMidi + interval), noteTime);

      gainNode.gain.setValueAtTime(0.0001, noteTime);
      gainNode.gain.exponentialRampToValueAtTime(MAX_GAIN, noteTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, releaseTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(noteTime);
      oscillator.stop(releaseTime + 0.05);
    });

    setIsPlaying(true);
    timeoutRef.current = window.setTimeout(() => {
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlaying(false);
    }, (intervals.length * NOTE_DURATION + 0.2) * 1000);
  }, [isPlaying, keyRoot, scale.intervals, stopPlayback]);

  useEffect(() => () => stopPlayback(), [stopPlayback]);

  return (
    <div className="scale-playback__controls">
      <button type="button" className="scale-playback__button" onClick={playScale}>
        {isPlaying ? '停止' : 'スケール再生'}
      </button>
      <span className="scale-playback__label">
        {noteNumberToName(keyRoot)} {scale.name}
      </span>
    </div>
  );
}
