export type frenquence = {
  key: string,
  noteName: string,
  frequency: number,
  isBlack: boolean
} 

export const frenquences : frenquence[] = [
  // Octave 3 (Plus grave)
  { key: 'a', noteName: 'C3', frequency: 130.81, isBlack: false },
  { key: 'z', noteName: 'C#3', frequency: 138.59, isBlack: true },
  { key: 'e', noteName: 'D3', frequency: 146.83, isBlack: false },
  { key: 'r', noteName: 'D#3', frequency: 155.56, isBlack: true },
  { key: 't', noteName: 'E3', frequency: 164.81, isBlack: false },
  { key: 'y', noteName: 'F3', frequency: 174.61, isBlack: false },
  { key: 'u', noteName: 'F#3', frequency: 185.00, isBlack: true },
  { key: 'i', noteName: 'G3', frequency: 196.00, isBlack: false },
  { key: 'o', noteName: 'G#3', frequency: 207.65, isBlack: true },
  { key: 'p', noteName: 'A3', frequency: 220.00, isBlack: false },
  { key: 'q', noteName: 'A#3', frequency: 233.08, isBlack: true },
  { key: 's', noteName: 'B3', frequency: 246.94, isBlack: false },

  // Octave 4 (Celle que tu avais commencée)
  { key: 'd', noteName: 'C4', frequency: 261.63, isBlack: false },
  { key: 'f', noteName: 'C#4', frequency: 277.18, isBlack: true },
  { key: 'g', noteName: 'D4', frequency: 293.66, isBlack: false },
  { key: 'h', noteName: 'D#4', frequency: 311.13, isBlack: true },
  { key: 'j', noteName: 'E4', frequency: 329.63, isBlack: false },
  { key: 'k', noteName: 'F4', frequency: 349.23, isBlack: false },
  { key: 'l', noteName: 'F#4', frequency: 369.99, isBlack: true },
  { key: 'm', noteName: 'G4', frequency: 392.00, isBlack: false },
  { key: 'w', noteName: 'G#4', frequency: 415.30, isBlack: true },
  { key: 'x', noteName: 'A4', frequency: 440.00, isBlack: false },
  { key: 'c', noteName: 'A#4', frequency: 466.16, isBlack: true },
  { key: 'v', noteName: 'B4', frequency: 493.88, isBlack: false },

  // Octave 5 (Plus aiguë)
  { key: 'b', noteName: 'C5', frequency: 523.25, isBlack: false }
];