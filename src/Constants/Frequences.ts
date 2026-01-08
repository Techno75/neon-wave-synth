export type frenquence = {
  key: string,
  noteName: string,
  frequency: number,
  isBlack: boolean
} 

export const frenquences : frenquence[] = [
  { key: 'a', noteName: 'C3',  frequency: 261.63, isBlack: false },
  { key: 'w', noteName: 'C#3', frequency: 277.18, isBlack: true  },
  { key: 's', noteName: 'D3',  frequency: 293.66, isBlack: false },
  { key: 'e', noteName: 'D#3', frequency: 311.13, isBlack: true  },
  { key: 'd', noteName: 'E3',  frequency: 329.63, isBlack: false },
  { key: 'f', noteName: 'F3',  frequency: 349.23, isBlack: false },
  { key: 't', noteName: 'F#3', frequency: 369.99, isBlack: true  },
  { key: 'g', noteName: 'G3',  frequency: 392.00, isBlack: false },
  { key: 'y', noteName: 'G#3', frequency: 415.30, isBlack: true  },
  { key: 'h', noteName: 'A3',  frequency: 440.00, isBlack: false },
  { key: 'u', noteName: 'A#3', frequency: 466.16, isBlack: true  },
  { key: 'j', noteName: 'B3',  frequency: 493.88, isBlack: false },
  { key: 'k', noteName: 'C4',  frequency: 523.25, isBlack: false },
];