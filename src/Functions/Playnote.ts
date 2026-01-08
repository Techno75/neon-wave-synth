

export enum Shape {
    SINE = "sine",
    SQUARE =  "square",
    TRIANGLE = "triangle",
    SAWTOOTH = "sawtooth" 
}

export const playnote = (frequency : number, 
        audioCtx: React.RefObject<AudioContext | null>,
        shape:Shape,
        gain:number,
        attackTime: number,
        decayTime: number,
        decayGain: number,
        sustainTime: number,
        sustainGain: number,
        releaseTime: number,
    ) => {
    const ctx = audioCtx.current;
   
    if(!ctx) return null;

    if(ctx.state === 'suspended') ctx.resume();
    const now = ctx?.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = shape;
    osc.frequency.setValueAtTime(frequency, now);
    gainNode.gain.setValueAtTime(0, now);
    // Attack Time
    gainNode.gain.exponentialRampToValueAtTime(gain || 0.1, now + attackTime);
    // Decay Time
    const safeDecayGain = Math.min(1.0, Math.max(0.0001, gain + decayGain));
    gainNode.gain.exponentialRampToValueAtTime(safeDecayGain, now + attackTime + decayTime);
    // Sustain Time
    const safeSustainGain = Math.min(1.0, Math.max(0.001, gain + sustainGain));
    gainNode.gain.exponentialRampToValueAtTime(safeSustainGain, now + attackTime + decayTime + sustainTime);
    // Release Time
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + attackTime + decayTime + sustainTime + releaseTime);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(now + attackTime + decayTime + sustainTime + releaseTime);
}