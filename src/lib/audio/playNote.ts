export type NotePlaybackOptions = {
  duration?: number;
  attack?: number;
  release?: number;
  volume?: number;
  waveform?: OscillatorType;
};

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

const noteNumberToFrequency = (noteNumber: number, octave: number) => {
  const absolute = octave * 12 + noteNumber;
  const midiNote = absolute + 12;
  return 440 * Math.pow(2, (midiNote - 69) / 12);
};

export const playNote = (
  noteNumber: number,
  octave: number,
  {
    duration = 0.6,
    attack = 0.02,
    release = 0.2,
    volume = 0.3,
    waveform = 'triangle',
  }: NotePlaybackOptions = {},
) => {
  if (typeof window === 'undefined') {
    return;
  }
  const context = getAudioContext();
  if (context.state === 'suspended') {
    void context.resume();
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = waveform;
  oscillator.frequency.value = noteNumberToFrequency(noteNumber, octave);

  const now = context.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + attack);
  gainNode.gain.setValueAtTime(volume, now + Math.max(0, duration - release));
  gainNode.gain.linearRampToValueAtTime(0, now + duration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.05);
};
