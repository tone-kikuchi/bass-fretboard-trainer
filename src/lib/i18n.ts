export type Language = 'ja' | 'en';

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  ja: '日本語',
};

export const TEXT = {
  en: {
    app: {
      title: 'Bass Fretboard Trainer',
      subtitle: 'Fretboard + target tone drills for improvisation',
      nav: {
        fretboard: 'Fretboard',
        practice: 'Practice',
        progression: 'Progression',
        stats: 'Stats',
        help: 'Help',
      },
      pages: {
        fretboard: 'Fretboard',
        practice: 'Practice',
        progression: 'Progression',
        stats: 'Stats',
        help: 'Help',
      },
      zoom: 'Zoom',
      legend: {
        key: 'Key',
        scale: 'Scale',
        tuning: 'Tuning',
      },
      scaleInfo: {
        notes: 'Scale notes',
        fretboard: 'Fretboard layout (0-12 fret)',
      },
      help: {
        title: 'Help',
        minimalRules: 'Minimal rules',
        usage: 'How to use',
        features: 'Feature guide',
        usageItems: [
          'Fretboard: Select key/scale/chord and explore the fretboard.',
          'Practice: Land on targets with four practice modes.',
          'Progression: Visualize guide tones within progressions.',
          'Stats: Track accuracy and see weak spots.',
        ],
        featureItems: [
          'Strings: Switch between 4 or 5 strings.',
          'Key: Choose the reference key (root note).',
          'Scale: Select the scale for the chosen key.',
          'Chord: Choose the chord for chord/guide tone display.',
          'Progression: Select a preset to display guide tones per bar.',
          'Zoom: Adjust the fretboard zoom.',
          'Notes: Show note names at each position.',
          'Root: Highlight the key root.',
          'Degrees: Show scale degrees (1–7).',
          'Intervals: Show intervals from the root (1, b2, 2...).',
          'Scale: Highlight scale tones.',
          'Chord tones: Highlight chord tones.',
          'Guide tones: Emphasize 3rd/7th with outlines.',
        ],
        mottos: [
          'Scales are ingredients. Landing is chord tones.',
          'When in doubt, find the 3rd and 7th (guide tones).',
          'Landing on the next chord’s 3rd sounds convincing.',
        ],
      },
    },
    selector: {
      language: 'Language',
      strings: 'Strings',
      stringOption: {
        four: '4 Strings',
        five: '5 Strings',
      },
      tuning: 'Tuning',
      key: 'Key',
      scale: 'Scale',
      chord: 'Chord',
      progression: 'Progression',
    },
    layers: {
      showNoteNames: 'Notes',
      showRoot: 'Root',
      showDegrees: 'Degrees',
      showIntervals: 'Intervals',
      showScale: 'Scale',
      showChord: 'Chord tones',
      showGuide: 'Guide tones',
    },
    transport: {
      play: 'Play',
      stop: 'Stop',
      tempo: 'Tempo',
      bar: 'Bar',
    },
    stats: {
      title: 'Practice log',
      reset: 'Reset',
      empty: 'No stats yet. Start practicing.',
      modes: {
        'note-quiz': 'Note quiz',
        'degree-quiz': 'Degree quiz',
        'chord-landing': 'Chord-tone landing',
        'guide-tone': 'Guide-tone trainer',
      },
    },
    practice: {
      modes: {
        note: 'Note quiz',
        degree: 'Degree quiz',
        landing: 'Chord-tone landing',
        guide: 'Guide tones',
      },
      noteQuiz: {
        title: 'Note quiz',
        description: 'Tap the target note on the fretboard.',
        correct: 'Correct!',
        incorrect: (noteName: string) => `Incorrect. You pressed ${noteName}.`,
      },
      degreeQuiz: {
        title: 'Degree quiz',
        description: 'Tap the note for the requested degree.',
        target: (root: string, scale: string, degree: string) => `${root} ${scale} - Degree ${degree}`,
        correct: 'Correct!',
        incorrect: (noteName: string) => `Wrong: ${noteName}`,
      },
      chordLanding: {
        title: 'Chord-tone landing',
        description: 'Practice landing on chord tones, especially the 3rd/7th.',
        target: 'Target: guide tones',
        guide: 'Landed on a guide tone!',
        chord: 'Landed on a chord tone!',
        out: (noteName: string) => `Out: ${noteName}`,
      },
      guideTone: {
        title: 'Guide-tone trainer',
        description: 'Connect to the next chord’s 3rd/7th with minimal movement.',
        target: (current: string, next: string) => `Current: ${current} → Next: ${next}`,
        correct: 'Landed on the next guide tone!',
        incorrect: (noteName: string) => `Wrong: ${noteName}`,
      },
    },
  },
  ja: {
    app: {
      title: 'Bass Fretboard Trainer',
      subtitle: 'アドリブに効く指板とターゲット練習',
      nav: {
        fretboard: '指板',
        practice: '練習',
        progression: '進行',
        stats: '統計',
        help: 'ヘルプ',
      },
      pages: {
        fretboard: '指板',
        practice: '練習',
        progression: '進行',
        stats: '統計',
        help: 'ヘルプ',
      },
      zoom: 'ズーム',
      legend: {
        key: 'キー',
        scale: 'スケール',
        tuning: 'チューニング',
      },
      scaleInfo: {
        notes: '音列',
        fretboard: '指板上の並び (0-12フレット)',
      },
      help: {
        title: 'Help',
        minimalRules: '最小ルール',
        usage: '使い方',
        features: '機能ガイド',
        usageItems: [
          'Fretboard: キー/スケール/コードを選んで指板を確認。',
          'Practice: 4つの練習モードでターゲットに着地。',
          'Progression: 進行の中でガイドトーンを視覚化。',
          'Stats: 正答率で苦手ポイントを可視化。',
        ],
        featureItems: [
          'Strings: 弦の本数を4弦/5弦で切り替えます。',
          'Key: 表示の基準となるキー（ルート音）を選択します。',
          'Scale: キーに対するスケールを選択します。',
          'Chord: コードトーン/ガイドトーンの対象となるコードを選択します。',
          'Progression: 進行プリセットを選び、バーごとのガイドトーンを表示します。',
          'Zoom: 指板の拡大率を調整します。',
          '音名: 各ポジションの音名を表示します。',
          'ルート: キーのルート音を強調表示します。',
          '度数: スケール内の度数（1〜7）を表示します。',
          'ルート度数: ルートからの距離（1, b2, 2...）を表示します。',
          'スケール: 選択中のスケール音を色で表示します。',
          'コードトーン: 選択中コードの構成音を色で表示します。',
          'ガイドトーン: 3rd/7th を枠で強調表示します。',
        ],
        mottos: [
          'スケールは素材。着地はコードトーン。',
          '迷ったら 3rd と 7th（ガイドトーン）を見ろ。',
          '次のコードの 3rd に着地すると“それっぽく”なる。',
        ],
      },
    },
    selector: {
      language: '言語',
      strings: '弦',
      stringOption: {
        four: '4弦',
        five: '5弦',
      },
      tuning: 'チューニング',
      key: 'キー',
      scale: 'スケール',
      chord: 'コード',
      progression: '進行',
    },
    layers: {
      showNoteNames: '音名',
      showRoot: 'ルート',
      showDegrees: '度数',
      showIntervals: 'ルート度数',
      showScale: 'スケール',
      showChord: 'コードトーン',
      showGuide: 'ガイドトーン',
    },
    transport: {
      play: '再生',
      stop: '停止',
      tempo: 'テンポ',
      bar: '小節',
    },
    stats: {
      title: '練習ログ',
      reset: 'リセット',
      empty: 'まだ記録がありません。練習を始めましょう。',
      modes: {
        'note-quiz': 'ノート当てクイズ',
        'degree-quiz': '度数当てクイズ',
        'chord-landing': 'コードトーン着地',
        'guide-tone': 'ガイドトーン練習',
      },
    },
    practice: {
      modes: {
        note: 'ノート当て',
        degree: '度数当て',
        landing: 'コードトーン着地',
        guide: 'ガイドトーン',
      },
      noteQuiz: {
        title: 'ノート当てクイズ',
        description: '次の音を指板からタップしてください。',
        correct: '正解！',
        incorrect: (noteName: string) => `違います。あなたが押したのは ${noteName}`,
      },
      degreeQuiz: {
        title: '度数当てクイズ',
        description: '指定した度数の音をタップしてください。',
        target: (root: string, scale: string, degree: string) => `${root} ${scale} の ${degree} 度`,
        correct: '正解！',
        incorrect: (noteName: string) => `違います。${noteName}`,
      },
      chordLanding: {
        title: 'コードトーン着地',
        description: 'コードトーン、特に 3rd/7th に着地する練習です。',
        target: 'ターゲット: ガイドトーン',
        guide: 'ガイドトーンに着地！',
        chord: 'コードトーンに着地！',
        out: (noteName: string) => `アウト：${noteName}`,
      },
      guideTone: {
        title: 'ガイドトーン練習',
        description: '次のコードの 3rd/7th に最短でつなげましょう。',
        target: (current: string, next: string) => `現在: ${current} → 次: ${next}`,
        correct: '次コードのガイドトーンに着地！',
        incorrect: (noteName: string) => `違います：${noteName}`,
      },
    },
  },
};

const SCALE_LABELS: Record<Language, Record<string, string>> = {
  en: {
    major: 'Major',
    dorian: 'Dorian',
    phrygian: 'Phrygian',
    lydian: 'Lydian',
    mixolydian: 'Mixolydian',
    locrian: 'Locrian',
    'natural-minor': 'Natural Minor',
    'harmonic-minor': 'Harmonic Minor',
    'melodic-minor': 'Melodic Minor',
    'major-pentatonic': 'Major Pentatonic',
    'minor-pentatonic': 'Minor Pentatonic',
  },
  ja: {
    major: 'メジャースケール',
    dorian: 'ドリアンスケール',
    phrygian: 'フリジアンスケール',
    lydian: 'リディアンスケール',
    mixolydian: 'ミクソリディアンスケール',
    locrian: 'ロクリアンスケール',
    'natural-minor': 'ナチュラルマイナースケール',
    'harmonic-minor': 'ハーモニックマイナースケール',
    'melodic-minor': 'メロディックマイナースケール',
    'major-pentatonic': 'メジャーペンタトニックスケール',
    'minor-pentatonic': 'マイナーペンタトニックスケール',
  },
};

const PROGRESSION_LABELS: Record<Language, Record<string, string>> = {
  en: {
    'ii-v-i': 'ii–V–I (Major)',
    'i-iv-v': 'i–iv–V (Minor)',
    'i-vi-ii-v': 'I–vi–ii–V (Cycle)',
    blues: '12-Bar Blues (I–IV–V)',
  },
  ja: {
    'ii-v-i': 'ii–V–I（メジャー）',
    'i-iv-v': 'i–iv–V（マイナー）',
    'i-vi-ii-v': 'I–vi–ii–V（循環）',
    blues: '12小節ブルース（I–IV–V）',
  },
};

const TUNING_LABELS: Record<Language, Record<string, string>> = {
  en: {
    standard: 'Standard',
    'down-half': 'Down half-step',
    'down-whole': 'Down whole-step',
    'down-whole-half': 'Down 1.5 steps',
    'down-two': 'Down two steps',
    'down-two-half': 'Down 2.5 steps',
    'drop-half': 'Drop (half-step down)',
    'drop-whole': 'Drop (whole-step down)',
    'drop-whole-half': 'Drop (1.5 steps down)',
    'drop-two': 'Drop (two steps down)',
    'drop-two-half': 'Drop (2.5 steps down)',
  },
  ja: {
    standard: '標準',
    'down-half': '半音下げ',
    'down-whole': '一音下げ',
    'down-whole-half': '一音半下げ',
    'down-two': '二音下げ',
    'down-two-half': '二音半下げ',
    'drop-half': 'ドロップ (半音下げ)',
    'drop-whole': 'ドロップ (一音下げ)',
    'drop-whole-half': 'ドロップ (一音半下げ)',
    'drop-two': 'ドロップ (二音下げ)',
    'drop-two-half': 'ドロップ (二音半下げ)',
  },
};

export const getScaleLabel = (scaleId: string, language: Language) =>
  SCALE_LABELS[language][scaleId] ?? SCALE_LABELS.en[scaleId] ?? scaleId;

export const getProgressionLabel = (presetId: string, language: Language) =>
  PROGRESSION_LABELS[language][presetId] ?? PROGRESSION_LABELS.en[presetId] ?? presetId;

export const getTuningLabel = (presetId: string, language: Language, fallback: string) =>
  TUNING_LABELS[language][presetId] ?? TUNING_LABELS.en[presetId] ?? fallback;
