
export const playOff = (audioCtx: React.RefObject<AudioContext | null>, nodes: {osc: OscillatorNode, gainNode: GainNode}, releaseTime: number) => {
    const ctx = audioCtx.current;
    if (!ctx || !nodes) return;

    const now = ctx.currentTime;
    
    // --- ENVELOPPE : RELEASE ---
    nodes.gainNode.gain.cancelScheduledValues(now);
    nodes.gainNode.gain.setValueAtTime(nodes.gainNode.gain.value, now);
    nodes.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + releaseTime);

    nodes.osc.stop(now + releaseTime);
};