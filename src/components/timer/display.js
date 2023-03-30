import React, { useContext } from 'react'
import { Orange } from './Timer';
import { Blue } from './Timer';

function Display(time) {
    const isOrange = useContext(Orange);
    const isBlue = useContext(Blue);
    const goodTime = time.toString().slice(0, -1);
    return (
        <div className='time'>
            <div className='time-div'>
                <h1>SPEEDCUBE TIMER</h1>
            </div>
            <div className='time-div-1'>
                <p className={`${isOrange ? 'redd' : ''} ${isBlue ? 'greenn' : ''}`}>
                    {goodTime.length === 0 ? '0.00':
                     goodTime.length === 1 ? '0.0' + goodTime:
                     goodTime.length === 2 ? '0.' + goodTime:
                     goodTime.length === 3 ? `${goodTime[0]}.${goodTime[1]}${goodTime[2]}`:
                     goodTime.length === 4 ? `${goodTime[0]}${goodTime[1]}.${goodTime[2]}${goodTime[3]}`:
                     goodTime.length === 5 ? `${goodTime[0]}:${goodTime[1]}${goodTime[2]}.${goodTime[3]}${goodTime[4]}`:
                     goodTime.length === 6 ? `${goodTime[0]}${goodTime[1]}:${goodTime[2]}${goodTime[3]}:${goodTime[4]}${goodTime[5]}`: ' '}
                </p>
            </div>
        </div>
    )
}

export default Display