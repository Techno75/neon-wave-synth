import React, { useEffect, useRef, useState} from 'react';
import Slider from '../Components/Slider';

interface Props {
    usedAttackTime: number;
    setAttackTime: React.Dispatch<React.SetStateAction<number>>
    usedDecayTime: number;
    setDecayTime: React.Dispatch<React.SetStateAction<number>>
    usedDecayGain: number;
    setDecayGain: React.Dispatch<React.SetStateAction<number>>
    usedSustainTime: number;
    setSustainTime: React.Dispatch<React.SetStateAction<number>>
    usedSustainGain:number;
    setSustainGain: React.Dispatch<React.SetStateAction<number>>
    usedReleaseTime: number;
    setReleaseTime: React.Dispatch<React.SetStateAction<number>>
}

export function Envelope(props : Props) {
  return (
    <div className="envelope">
        <div>
            <h1>Envelope</h1>
        </div>
        <div className="envContainer">
        <Slider
            label='Attack Time'
            onChange={props.setAttackTime}
            value={props.usedAttackTime}
            max={5}
            min={0}
            step={0.01}
        />
        <Slider
            label='Decay Time'
            onChange={props.setDecayTime}
            value={props.usedDecayTime}
            max={5}
            min={0}
            step={0.01}
        />
        <Slider
            label='Decay Gain'
            onChange={props.setDecayGain}
            value={props.usedDecayGain}
            max={1}
            min={-1}
            step={0.01}
        />
        <Slider
            label='Sustain Time'
            onChange={props.setSustainTime}
            value={props.usedSustainTime}
            max={5}
            min={0.001}
            step={0.01}
        />
        <Slider
            label='Sustain Gain'
            onChange={props.setSustainGain}
            value={props.usedSustainGain}
            max={1}
            min={-1}
            step={0.01}
        />
        <Slider
            label='Release Time'
            onChange={props.setReleaseTime}
            value={props.usedReleaseTime}
            max={5}
            min={0.001}
            step={0.01}
        />
        </div>
    </div>
  );
}

