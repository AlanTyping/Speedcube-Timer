import React, { useState, useEffect, createContext, useContext, memo, useRef } from "react";
import { ThemeContext } from "../../contexts/theme";
import Results from "./components/Results";
import Playing from "./components/Playing";

let array = [];
let results;

export const Orange = createContext();
export const Blue = createContext();

export function Timer() {
  const [{ isDark }] = useContext(ThemeContext);

  const [st, setSt] = useState({ s: 0 }); //set spacebar time

  const [isRunning, setIsRunning] = useState(false);

  const [isOrange, setIsOrange] = useState(false);
  const [isBlue, setIsBlue] = useState(false);

  const [stIsRunning, setStIsRunning] = useState(false);

  const [initialitated, setInitialitated] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const [block, setBlock] = useState(false);

  const [stInterval, setStInterval] = useState();
  const [inspection, setInspection] = useState(false);
  let inspectionTime = 15;

  const [time, setTime] = useState(0);
  const [timeObject, setTimeObject] = useState({ m: 0, s: 0, ms: 0, mms: 0 });

  const startTimeRef = useRef(0);
  const frameRef = useRef(null);

  let stSeconds = st.s;
  const space = " ";

  const changeTimeFormat = (time) => {
    let ms = Math.floor((time / 10) % 100);
    let s = Math.floor((time / 1000) % 60);
    let m = Math.floor((time / 1000 / 60) % 60);
    return { m: 0, s: 0, ms: 0 }
  };

  const stopTimer = () => {
    cancelAnimationFrame(frameRef.current);
  };

  const updateChronometer = () => {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTimeRef.current;
    setTime(elapsedTime.toFixed());
    frameRef.current = requestAnimationFrame(updateChronometer);
  };


  const handleRestart = () => {
    setShowResults(false);
    setTime(0);
    array = [];
  };

  const startTimer = () => {
    setIsRunning(true);
    startTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(updateChronometer);
  };

  const inspectionOn = () => {
    setInterval(() => {
      inspectionTime--
    }, 1000)
  }
  // push array

  const numberToObject = (time) => {

    const timeToString = time.toString();
    const data = timeToString.length > 1 ? timeToString.slice(0, -1).split("").map((e) => Math.trunc(e)) : timeToString

    if (data.length === 1) return { m: 0, s: 0, ms: 0, mms: parseInt(`${data[0] === undefined ? 0 : data[0]}`) };
    if (data.length === 2) return { m: 0, s: 0, ms: data[0], mms: data[1] };
    if (data.length === 3) return { m: 0, s: data[0], ms: data[1], mms: data[2] };
    if (data.length === 4) return { m: 0, s: parseInt(`${data[0]}${data[1]}`), ms: data[2], mms: data[3] };
    if (data.length === 5) return { m: data[0], s: parseInt(`${data[1]}${data[2]}`), ms: data[3], mms: data[4] };
    if (data.length === 6) return { m: parseInt(`${data[0]}${data[1]}`), s: parseInt(`${data[2]}${data[3]}`), ms: data[4], mms: data[5] };
  };

  function deleteBiggerAndSmaller(array) {
    let min = Math.min(...array);
    let max = Math.max(...array);

    let minIndex = array.indexOf(min);
    let maxIndex = array.indexOf(max);

    array.splice(minIndex, 1);
    array.splice(maxIndex < minIndex ? maxIndex : maxIndex - 1, 1);

    return array;
  }


  const avrg = (array) => {
    const map = [];
    array.map((obj) => map.push(parseInt(`${obj.m}${obj.s}${obj.ms}${obj.mms}`)));

    let filter = deleteBiggerAndSmaller(map);

    const number = Math.trunc(filter.reduce((a, b) => (b += a)) / filter.length);


    const data = number.toString().split("").map((e) => Math.trunc(e));

    if (data.length === 1) return { m: 0, s: 0, ms: 0, mms: data[0] };
    if (data.length === 2) return { m: 0, s: 0, ms: data[0], mms: data[1] };
    if (data.length === 3) return { m: 0, s: data[0], ms: data[1], mms: data[2] };
    if (data.length === 4) return { m: 0, s: parseInt(`${data[0]}${data[1]}`), ms: data[2], mms: data[3] };
    if (data.length === 5) return { m: data[0], s: parseInt(`${data[1]}${data[2]}`), ms: data[3], mms: data[4] };
    if (data.length === 6) return { m: parseInt(`${data[0]}${data[1]}`), s: parseInt(`${data[2]}${data[3]}`), ms: data[4], mms: data[5] };
  };

  useEffect(() => {
    if (isRunning) {
      setBlock(true);
      setInitialitated(true);
      startTimer();
    }
    if (!isRunning && initialitated) {
      stopTimer();
      if (array.length >= 5) {
        setShowResults(true);
        results = avrg(array);
      }
    }
  }, [isRunning, array]);

  const changeSpaceTime = () => {
    stSeconds++;
    return setSt({ s: stSeconds });
  };

  useEffect(() => {
    if (stIsRunning) {
      setIsOrange(true);
      setStInterval(
        setInterval(() => {
          changeSpaceTime();
          if (stSeconds >= 1) {
            setIsOrange(false);
            setIsBlue(true);
            setTime(0);
          }
        }, 500)
      );
    } else if (!stIsRunning) {
      setIsOrange(false);
      setIsBlue(false);
      clearInterval(stInterval);
      if (stSeconds >= 1) {
        setTime(0);
        setIsRunning(true);
      }
      stSeconds = 0;
      setSt({ s: stSeconds });
    }
    return () => clearInterval(stInterval);
  }, [stIsRunning]);

  const handleKeyUp = (event) => {
    setBlock(false);
    if (event.key === space && stIsRunning) {
      setStIsRunning(false);
    }
  };

  const handleKeyDown = (event) => {
    if (isRunning) {
      setIsRunning(false);
      array.push(numberToObject(time));
      formatTime(time);
    }
    if (event.key === space && block === false && !inspection) {
      setStIsRunning(true);
    }
  };

  useEffect(() => {
    if (showResults === false) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
      };
    }
  }, [showResults, isRunning, time, block, stIsRunning, inspection]);

  return (
    <Orange.Provider value={isOrange}>
      <Blue.Provider value={isBlue}>
        <div className="container">
          <div className={`${isOrange ? "red" : ""} ${isBlue ? "blueLight" : ""} ${isDark ? "bar" : "bar3"}`} />
          {showResults ? (<Results array={array} handleRestart={handleRestart} results={results} isDark={isDark} />)
            : (
              <div className='time'>
                <div className='time-div'>
                  <h1>SPEEDCUBE TIMER</h1>
                </div>
                <div className='time-div-1'>
                  <p className={`${isOrange ? 'redd' : ''} ${isBlue ? 'blue' : ''}`}>
                    {displayTime(time)}
                  </p>
                </div>
                <Playing array={array} />
              </div>
            )}
          <div className={`${isOrange ? "red" : ""} ${isBlue ? "blueLight" : ""} ${isDark ? "bar2" : "bar4"}`} />
        </div>
      </Blue.Provider>
    </Orange.Provider>
  );
}

export const MemoizedComponent = memo(Timer);

function formatTime(time) {
  if (time === 0) return "0.00";

  let SS = Math.floor((time / 10) % 100);
  let ss = Math.floor((time / 1000) % 60);
  let mm = Math.floor((time / 1000 / 60) % 60);

  //return {mm: mm, ss: ss, SS: SS};
}

function displayTime(time) {
  if (time === 0) return "0.00";

  let SS = Math.floor((time / 10) % 100);
  let ss = Math.floor((time / 1000) % 60);
  let mm = Math.floor((time / 1000 / 60) % 60);

  return `${mm > 0 ? `${mm}:` : ""}${ss}.${SS < 10 ? `0${SS}` : SS}`;
}
