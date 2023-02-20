import React from 'react';
import Display from '../display';

export default function Playing({ children, array }) {
    return (
        <>
            {children}
            <div className='results-container'>
                {array.map((objeto, key) => {
                    return (
                        <div className='results' key={key}>
                            <span>{key + 1}/5 </span>
                            {objeto.m < 10 ? "0" + objeto.m : objeto.m}:
                            {objeto.s < 10 ? "0" + objeto.s : objeto.s}:
                            {objeto.ms}
                            {objeto.mms}
                        </div>
                    )
                })}
            </div>
        </>
    )
}
