

export enum Shape {
    SINE = "sine",
    SQUARE =  "square",
    TRIANGLE = "triangle",
    SAWTOOTH = "sawtooth" 
}

export const playOn = (frequency : number, 
        audioCtx: React.RefObject<AudioContext | null>,
        shape:Shape,
        gain:number,
        attackTime: number,
        decayTime: number,
        decayGain: number,
        sustainGain: number,) => {
    const ctx = audioCtx.current;
    if (!ctx) return null;

    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = shape;
    osc.frequency.setValueAtTime(frequency, now);

    // --- ENVELOPPE : ATTACK & DECAY ---
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(gain, now + attackTime);
    // On descend vers le niveau de Sustain
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0001, sustainGain), now + attackTime + decayTime);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();

    // On retourne les nœuds pour pouvoir les arrêter dans PlayOff
    return { osc, gainNode };
};
    