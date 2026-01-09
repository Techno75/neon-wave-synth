import React, { useEffect, useRef, useState} from 'react';
import './App.css';
import { frenquences } from './Constants/Frequences';
import Touche from './Components/touches';
import { Shape } from './Functions/Playnote';
import ShapeForm from './Components/shapeForm';
import Slider from './Components/Slider';
import { Envelope } from './Components/envelope';
import { playOn } from './Functions/PlayOn';
import { playOff } from './Functions/PlayOff';

function App() {

  const audioCtx = useRef<AudioContext | null>(null);
  const [usedShape, setShape] = useState<Shape>(Shape.SINE);
  const [usedGain, setGain] = useState<number>(0.5);
  const [usedAttackTime, setAttackTime] = useState<number>(0.1);
  const [usedDecayTime, setDecayTime] = useState<number>(0.1);
  const [usedDecayGain, setDecayGain] = useState<number>(0);
  const [usedSustainGain, setSustainGain] = useState<number>(0);
  const [usedReleaseTime, setReleaseTime] = useState<number>(0.1);
  const [activeNodes, setActiveNodes] = useState<Record<string, {osc: OscillatorNode, gainNode: GainNode} | null >>({});
  const analyser = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(()=> {
    if(!audioCtx.current){
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const node = ctx.createAnalyser();
    node.fftSize = 2048; // Précision de l'onde
    analyser.current = node;
    // On connecte l'analyser à la sortie finale
    node.connect(ctx.destination);
    audioCtx.current = ctx;
    }  
  }, [])

const paramsRef = useRef({ usedShape, usedGain, usedAttackTime, usedDecayTime, usedDecayGain, usedSustainGain, usedReleaseTime });
useEffect(() => {
    paramsRef.current = { usedShape, usedGain, usedAttackTime, usedDecayTime, usedDecayGain, usedSustainGain, usedReleaseTime };
}, [usedShape, usedGain, usedAttackTime, usedDecayTime, usedDecayGain, usedSustainGain, usedReleaseTime]);

useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        const note = frenquences.find(f => f.key === key);

        if (note && !e.repeat) {
            // On lance la note avec les valeurs actuelles des Refs
            const nodes = playOn(
                note.frequency,
                audioCtx,
                paramsRef.current.usedShape,
                paramsRef.current.usedGain,
                paramsRef.current.usedAttackTime,
                paramsRef.current.usedDecayTime,
                paramsRef.current.usedDecayGain,
                paramsRef.current.usedSustainGain,
                analyser
            );

            // On ajoute cette note à l'objet sans écraser les autres
            setActiveNodes(prev => ({ ...prev, [key]: nodes }));
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        
        // On utilise le setter fonctionnel pour être sûr d'avoir l'état le plus frais
        setActiveNodes(prev => {
            const nodesToStop = prev[key];
            if (nodesToStop) {
                playOff(audioCtx, nodesToStop, paramsRef.current.usedReleaseTime);
                const newState = { ...prev };
                delete newState[key]; // On retire juste la touche relâchée
                return newState;
            }
            return prev;
        });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
}, []);

useEffect(() => {
    if (!canvasRef.current || !analyser.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
        requestAnimationFrame(draw);
        analyser.current!.getByteTimeDomainData(dataArray);

        // Fond noir/neon
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessin de l'onde
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00ff41'; // Ton vert neon !
        ctx.beginPath();

        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            x += sliceWidth;
        }
        ctx.stroke();
    };

    draw();
}, []);

  return (
    <div className="synthesizer">
        <div className='toolbox'>
          <div className='gainContainer'>
            <h1>Gain</h1>
            <Slider
              label='Gain'
              onChange={setGain}
              value={usedGain}
              max={1}
              min={0}
              step={0.01}
            />
          </div>
          <canvas 
            ref={canvasRef} 
            width="600" 
            height="200" 
            style={{ border: '1px solid #00ff41', borderRadius: '8px' }}
/>
          <ShapeForm 
            setShape={setShape}
            shape={usedShape}
          />
          <Envelope
            usedAttackTime={usedAttackTime}
            setAttackTime={setAttackTime}
            usedDecayTime={usedDecayTime}
            setDecayTime={setDecayTime}
            usedDecayGain={usedDecayGain}
            setDecayGain={setDecayGain}
            usedSustainGain={usedSustainGain}
            setSustainGain={setSustainGain}
            usedReleaseTime={usedReleaseTime}
            setReleaseTime={setReleaseTime}
          />
        </div>
        <div className='keyboard'>
          {
            frenquences.map((freq, index) => {
              return( <Touche 
                key={`touche-${index}`}
                index={index}
                data={freq}
                audioCtx={audioCtx}
                shape={usedShape}
                gain={usedGain}
                attackTime={usedAttackTime}
                decayTime={usedDecayTime}
                decayGain={usedDecayGain}
                sustainGain={usedSustainGain}
                releaseTime={usedReleaseTime}
                analyser={analyser}
              />)
              
            })
          }
        </div>
    </div>
  );
}

export default App;
