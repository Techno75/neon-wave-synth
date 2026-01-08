import React, { useEffect, useRef, useState} from 'react';
import './App.css';
import { frenquences } from './Constants/Frequences';
import Touche from './Components/touches';
import { Shape } from './Functions/Playnote';
import ShapeForm from './Components/shapeForm';
import Slider from './Components/Slider';
import { Envelope } from './Components/envelope';

function App() {

  const audioCtx = useRef<AudioContext | null>(null);
  const [usedShape, setShape] = useState<Shape>(Shape.SINE);
  const [usedGain, setGain] = useState<number>(0.5);
  const [usedAttackTime, setAttackTime] = useState<number>(0.1);
  const [usedDecayTime, setDecayTime] = useState<number>(0.1);
  const [usedDecayGain, setDecayGain] = useState<number>(0);
  const [usedSustainTime, setSustainTime] = useState<number>(0.1);
  const [usedSustainGain, setSustainGain] = useState<number>(0);
  const [usedReleaseTime, setReleaseTime] = useState<number>(0.1);


  useEffect(()=> {
    if(!audioCtx.current){
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }  
  }, [])

  return (
    <div className="synthesizer">
        <div className='toolbox'>
          <ShapeForm 
            setShape={setShape}
            shape={usedShape}
          />
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
          <Envelope
            usedAttackTime={usedAttackTime}
            setAttackTime={setAttackTime}
            usedDecayTime={usedDecayTime}
            setDecayTime={setDecayTime}
            usedDecayGain={usedDecayGain}
            setDecayGain={setDecayGain}
            usedSustainTime={usedSustainTime}
            setSustainTime={setSustainTime}
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
                sustainTime={usedSustainTime}
                sustainGain={usedSustainGain}
                releaseTime={usedReleaseTime}
              />)
              
            })
          }
        </div>
    </div>
  );
}

export default App;
