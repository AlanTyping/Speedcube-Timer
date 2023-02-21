import React from 'react'

export default function Results({ results, array, handleRestart, isDark}) {
    return (
        <div className='avrg'>
            <div className='result'>
                <div className='result-adjust'>
                    <h2>Average</h2>
                    <div className='avrg-result'>
                        {results.m < 10 ? "0" + results.m : results.m}:
                        {results.s < 10 ? "0" + results.s : results.s}:
                        {results.ms}
                        {results.mms}
                    </div>
                </div>
            </div>
            <div className='down-display'>
                <div className='button-container'>
                    <div className={`button ${isDark ? 'dark' : 'light'}`} onClick={handleRestart}>Restart</div>
                </div>
                <div className='results-container-finish'>
                    <h5>Solves</h5>
                    {array.map((objeto, key) => {
                        return (
                            <div className='results' key={key}>
                                <span>{key + 1}. </span>
                                {objeto.m < 10 ? "0" + objeto.m : objeto.m}:
                                {objeto.s < 10 ? "0" + objeto.s : objeto.s}:
                                {objeto.ms}
                                {objeto.mms}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
