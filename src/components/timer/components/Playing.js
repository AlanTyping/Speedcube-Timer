import React from 'react';

export default function Playing({ array }) {
    return (
        <>
            <div className='results-container bg-red-300'>
                {array.map((objeto, key) => {
                    return (
                        <div className='results' key={key}>
                            <span>{key + 1}/5 </span>
                            {objeto.m === 0 ? "" : `${objeto.m}:`}
                            {objeto.s === 0 ? "0." : `${objeto.s}.`}
                            {objeto.ms}
                            {objeto.mms}
                        </div>
                        )
                })}
            </div>
        </>
    )
}
