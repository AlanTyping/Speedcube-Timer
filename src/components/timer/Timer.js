import React, { useState, useEffect, createContext, useContext } from 'react';
import Display from './display';
import { ThemeContext } from '../../contexts/theme';

let array = [];
let results;

export const Orange = createContext();
export const Blue = createContext();

export function Timer() {

    const [{theme}] = useContext(ThemeContext);

    const [time, setTime] = useState({ mms: 0, ms: 0, s: 0, m: 0 });
    const [st, setSt] = useState({ s: 0 }); //set spacebar time

    const [isRunning, setIsRunning] = useState(false);

    const [isOrange, setIsOrange] = useState(false);
    const [isBlue, setIsBlue] = useState(false);

    const [stIsRunning, setStIsRunning] = useState(false);

    const [initialitated, setInitialitated] = useState(false);

    const [showResults, setShowResults] = useState(false);

    const [intervalo, setIntervalo] = useState();
    const [stInterval, setStInterval] = useState();

    let Mmiliseconds = time.mms;
    let miliseconds = time.ms;
    let seconds = time.s;
    let minutes = time.m;

    let stSeconds = st.s;

    const handleKeyDown = (event) => {
        if (event.key === ' ' && !isRunning) {
            setStIsRunning(true);
        }
        if (event.key === 'r') {
            setIsRunning(false);
        } else {
            setIsRunning(false);
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === ' ') {
            setStIsRunning(false)
        }
    }

    const changeSpaceTime = () => {
        stSeconds++;
        return setSt({ s: stSeconds });
    }

    const handleRestart = () => {
        setShowResults(false);
        setTime({ mms: 0, ms: 0, s: 0, m: 0 });
        array = [];
    }

    const increase = () => {

        Mmiliseconds++

        if (Mmiliseconds === 10) {
            miliseconds++
            Mmiliseconds = 0
        }
        if (miliseconds === 10) {
            seconds++
            miliseconds = 0
        }
        if (seconds === 60) {
            minutes++
            seconds = 0
        }

        return setTime({
            mms: Mmiliseconds,
            m: minutes,
            s: seconds,
            ms: miliseconds,
        })
    }

    const avrg = (array) => {
        const map = array.map((obj) => {
            return parseInt(`${obj.m}${obj.s}${obj.ms}${obj.mms}`);
        })
        const filter = map.filter((e) => e < Math.max(...map) && e > Math.min(...map));
        const number = Math.trunc(filter.reduce((a, b) => b += a) / filter.length);
        const data = number.toString().split('').map((e) => Math.trunc(e))

        if (data.length === 1) return { m: 0, s: 0, ms: 0, mms: data[0] }
        if (data.length === 2) return { m: 0, s: 0, ms: data[0], mms: data[1] }
        if (data.length === 3) return { m: 0, s: data[0], ms: data[1], mms: data[2] }
        if (data.length === 4) return { m: 0, s: `${data[0]}${data[1]}`, ms: data[2], mms: data[3] }
        if (data.length === 5) return { m: data[0], s: `${data[1]}${data[2]}`, ms: data[3], mms: data[4] }
        if (data.length === 6) return { m: `${data[0]}${data[1]}`, s: `${data[2]}${data[3]}`, ms: data[4], mms: data[5] }

        console.log(data)
    }

    useEffect(() => {
        if (isRunning) {
            setInitialitated(true);
            setIntervalo(setInterval(() => {
                increase();
            }, 10));
        }
        if (!isRunning && initialitated) {
            clearInterval(intervalo);
            array.push(time);
            if (array.length >= 5) {
                setShowResults(true);
                results = avrg(array);
            }
        }
        return () => clearInterval(intervalo);
    }, [isRunning]);


    useEffect(() => {
        if (stIsRunning) {
            setIsOrange(true);
            setStInterval(setInterval(() => {
                changeSpaceTime();
                if (stSeconds >= 1) {
                    setIsOrange(false)
                    setIsBlue(true);
                }
            }, 1000));
        } else if (!stIsRunning) {
            setIsOrange(false);
            setIsBlue(false);
            clearInterval(stInterval);
            if (stSeconds >= 1) {
                setTime({ mms: 0, ms: 0, s: 0, m: 0 });
                setIsRunning(true)
            }
            stSeconds = 0;
            setSt({ s: stSeconds });
        }
        return () => clearInterval(stInterval);
    }, [stIsRunning]);


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className='container' 
        //  style={{ backgroundImage: theme.backgroundImage}}
         >
            {showResults ?
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
                            <div className='button' onClick={handleRestart}>Restart</div>
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
                : <>
                    <Orange.Provider value={isOrange}>
                        <Blue.Provider value={isBlue}>
                            <Display
                                minutes={time.m}
                                seconds={time.s}
                                miliseconds={time.ms}
                                mmiliseconds={time.mms}
                            />
                        </Blue.Provider>
                    </Orange.Provider>
                    <div className='results-container'>
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
                </>
            }
        </div>
    );
}


















// import React, { useState, useEffect } from 'react';

// export function Timer() {

//     const [miliseconds, setMiliseconds] = useState(0);
//     const [seconds, setSeconds] = useState(0);
//     const [minutes, setMinutes] = useState(0);

//     const [isRunning, setIsRunning] = useState(false);

//     const handleKeyDown = (event) => {
//       if (event.key === 'i') {
//           setIsRunning(true);
//       } else if (event.key === 'r') {
//           setSeconds(0);
//           setMiliseconds(0)
//           setIsRunning(false);
//       } else {
//           setIsRunning(false);
//       }
//   };

//   const iniciar = () => {
//       setMiliseconds((miliseconds) => miliseconds + 1)
//       if (miliseconds >= 99) {
//           setMiliseconds(0);
//           setSeconds((seconds) => seconds + 1)
//          if (seconds >= 60) {
//           setSeconds(0)
//           setMinutes((minutes) => minutes + 1)
//          }
//       }
//   }

//     useEffect(() => {
//         let interval = null;
//         if (isRunning) {
//             interval = setInterval(() => {
//                 iniciar()
//                 console.log(miliseconds)
//             }, 10);
//         } else if (!isRunning && miliseconds !== 0) {
//             clearInterval(interval);
//         }
//         return () => clearInterval(interval);
//     }, [isRunning]);


//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);

//     return (
//         <div>
//             {minutes < 10 ? '0' + minutes : minutes}:
//             {seconds < 10 ? '0' + seconds : seconds}:
//             {miliseconds < 10 ? '0' + miliseconds : miliseconds}
//         </div>
//     );
// }














// const avrg = [1233, 2453, 4532, 2344, 1];

// const filSolves = (avrg) => {
//     return avrg.filter((e) => e < Math.max(...avrg) && e > Math.min(...avrg))
// }

// console.log(filSolves(avrg))





// import React, { useState, useEffect } from 'react';

// export function Timer() {
//     const [seconds, setSeconds] = useState(0);
//     const [isRunning, setIsRunning] = useState(false);

//     useEffect(() => {
//         let interval = null;
//         if (isRunning) {
//             interval = setInterval(() => {
//                 setSeconds((seconds) => seconds + 1);
//             }, 1000);
//         } else if (!isRunning && seconds !== 0) {
//             clearInterval(interval);
//         }
//         return () => clearInterval(interval);
//     }, [isRunning, seconds]);

//     const handleKeyDown = (event) => {
//         if (event.key === 'i') {
//             setIsRunning(true);
//         } else if (event.key === 'r') {
//             setSeconds(0);
//             setIsRunning(false);
//         } else {
//             setIsRunning(false);
//         }
//     };

//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);

//     return (
//         <div>
//             <div>{seconds} seconds</div>
//         </div>
//     );
// }



// import React, { useState, useEffect } from 'react';
// import Display from './another/display'

// export function Timer() {

//     const [tiempo, setTiempo] = useState({
//         stateHours: 0,
//         stateMinutes: 0,
//         stateSeconds: 0,
//         stateMiliseconds: 0,
//     })

//     let miliseconds = tiempo.stateMiliseconds
//     let seconds = tiempo.stateSeconds
//     let minutes = tiempo.stateMinutes
//     let hours = tiempo.stateHours

//     const [isRunning, setIsRunning] = useState(false);

//     const incrementar = () => {
//         if (miliseconds === 99) {
//             seconds++
//             miliseconds = 0
//         }
//         if (seconds === 60) {
//             minutes++
//             seconds = 0
//         }
//         if (minutes === 60) {
//             hours++
//             minutes = 0
//         }
//         miliseconds++

//         return setTiempo({
//             stateHoras: hours,
//             stateminutes: minutes,
//             stateseconds: seconds,
//             statemiliseconds: miliseconds,
//         })
//     }

//     useEffect(() => {
//         let interval = null;
//         if (isRunning) {
//             interval = setInterval(() => {
//                 incrementar()
//             }, 10);
//         } else if (!isRunning && seconds !== 0) {
//             clearInterval(interval);
//         }
//         return () => clearInterval(interval);
//     }, [isRunning, seconds, miliseconds, minutes, hours]);


//     const handleKeyDown = (event) => {
//         if (event.key === 'i') {
//             setIsRunning(true);
//         } else if (event.key === 'r') {
//             seconds = 0;
//             miliseconds = 0;
//             minutes = 0;
//             hours = 0;
//             setIsRunning(false);
//         } else {
//             setIsRunning(false);
//         }
//     };

//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, [handleKeyDown]);

//     return (
//         <div>
//             <Display
//                 horas={tiempo.stateHours}
//                 minutes={tiempo.stateMinutes}
//                 seconds={tiempo.stateSeconds}
//                 mseconds={tiempo.stateMiliseconds}
//             />
//         </div>
//     );
// }















// import React, { useState, useEffect } from "react";

// export function Timer() {
//   const [time, setTime] = useState("00:00:00");
//   const [seconds, setSeconds] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [hours, setHours] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   useEffect(() => {
//     let timer;
//     if (isRunning) {
//       timer = setInterval(() => {
//         setSeconds(seconds => seconds + 1);
//         if (seconds >= 60) {
//           setSeconds(0);
//           setMinutes(minutes => minutes + 1);
//           if (minutes >= 60) {
//             setMinutes(0);
//             setHours(hours => hours + 1);
//           }
//         }
//       }, 10);
//     } else if (!isRunning && seconds !== 0) {
//       clearInterval(timer);
//     }
//     return () => clearInterval(timer);
//   }, [isRunning, seconds]);

//   useEffect(() => {
//     setTime(
//       `${hours < 10 ? "0" + hours : hours}:${
//         minutes < 10 ? "0" + minutes : minutes
//       }:${seconds < 10 ? "0" + seconds : seconds}`
//     );
//   }, [seconds, minutes, hours]);

//   function handleKeyDown(event) {
//     if (event.code === "Space") {
//       setIsRunning(!isRunning);
//     } else if (event.code === "Enter") {
//       setSeconds(0);
//       setMinutes(0);
//       setHours(0);
//     }
//   }

//   return <div id="time">{time}</div>;
// }












































