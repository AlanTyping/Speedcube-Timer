import React, { useContext } from 'react'
import { Orange } from './Timer';
import { Blue } from './Timer';

function Display(props) {
    const isOrange = useContext(Orange);
    const isBlue = useContext(Blue);
    return (
        <div className='time'>
            <div className='time-div'>
                <h1>SPEEDCUBE TIMER</h1>
            </div>
            <div className='time-div-1'>
                <p className={`${isOrange ? 'orange' : ''} ${isBlue ? 'blue' : ''}`}>
                    {props.minutes < 10 ? "0" + props.minutes : props.minutes}:
                    {props.seconds < 10 ? "0" + props.seconds : props.seconds}:
                    {props.miliseconds}
                    {props.mmiliseconds}
                </p>
            </div>

        </div>
    )
}

export default Display