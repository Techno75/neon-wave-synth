import React from 'react';

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider = ({ label, min, max, step, value, onChange }: SliderProps) => {
  return (
    <div className='envFader'>
      <div className='envLabel'>
        <label>{label}: {value}</label>
      </div>
      <div className='faderWrapper'>
        <input 
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      </div>
    </div>
  );
};

export default Slider;