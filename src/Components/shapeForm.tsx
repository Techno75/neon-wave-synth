import React, { Dispatch, SetStateAction} from 'react';
import { Shape } from '../Functions/Playnote';


interface Props {
    setShape :  Dispatch<SetStateAction<Shape>>,
    shape : Shape,
}

function ShapeForm(props : Props) {

  return (
    <div className='shapeForm'>
        <h1>Shape</h1>
        <form>
            <div>
                <input type="radio" id="SINE" name="waveForm" value={Shape.SINE} onClick={() => props.setShape(Shape.SINE)} />
                <label htmlFor='SINE'>SINE</label>
            </div>
            <div>
                <input type="radio" id="SAWTOOTH" name="waveForm" value={Shape.SAWTOOTH} onClick={() => props.setShape(Shape.SAWTOOTH)} />
                <label htmlFor='SAWTOOTH'>SAWTOOTH</label>
            </div>
            <div>
                <input type="radio" id="SQUARE" name="waveForm" value={Shape.SQUARE} onClick={() => props.setShape(Shape.SQUARE)} />
                <label htmlFor='SQUARE'>SQUARE</label>
            </div>
            <div>
                <input type="radio" id="TRIANGLE" name="waveForm" value={Shape.TRIANGLE} onClick={() => props.setShape(Shape.TRIANGLE)} />
                <label htmlFor='TRIANGLE'>TRIANGLE</label>
            </div>
        </form>
    </div>
  );
}

export default ShapeForm;
