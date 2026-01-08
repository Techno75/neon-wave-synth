import React, { useState } from 'react';
import { frenquence } from '../Constants/Frequences';
import { playnote, Shape } from '../Functions/Playnote';
import { toucheNoirPosition } from '../Functions/ToucheNoirPosition';
import { playOn } from '../Functions/PlayOn';
import { playOff } from '../Functions/PlayOff';


interface Props {
    data : frenquence;
    index: number;
    audioCtx : React.RefObject<AudioContext | null>;
    shape: Shape;
    gain: number;
    attackTime: number;
    decayTime: number;
    decayGain: number;
    sustainTime: number;
    sustainGain:number;
    releaseTime: number;
}

function Touche(props : Props) {

  const [activeNodes, setActiveNodes] = useState<{osc: OscillatorNode, gainNode: GainNode} | null>(null);

  return (
    <div
    className={props.data.isBlack ? "touche black" : "touche white"}
    style={props.data.isBlack ?  {left: toucheNoirPosition(props.index)} : {}}
    onMouseLeave={() =>{
      if (activeNodes) {
        playOff(props.audioCtx, activeNodes, props.releaseTime)
        setActiveNodes(null);
      }
      }}
    onMouseUp={() =>{
      if (activeNodes) {
        playOff(props.audioCtx, activeNodes, props.releaseTime)
        setActiveNodes(null);
      }
      }}  
    onMouseDown={()=> {
      const nodes = playOn(
      props.data.frequency,
      props.audioCtx,
      props.shape,
      props.gain,
      props.attackTime,
      props.decayTime,
      props.decayGain,
      props.sustainGain,
      );
      setActiveNodes(nodes);
    }}
      
      >
      <h5>{props.data.noteName}</h5>
    </div>
  );

}

export default Touche;
