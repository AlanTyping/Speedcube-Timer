import React, { useState, useEffect, createContext, useContext } from 'react';
import Display from './display';
import { ThemeContext } from '../../contexts/theme';
import Results from './components/Results';
import Playing from './components/Playing';

let array = [];
let results;

export const Orange = createContext();
export const Blue = createContext();

export function Timer() {

  const [{ isDark }] = useContext(ThemeContext);

  const [time, setTime] = useState({ mms: 0, ms: 0, s: 0, m: 0 });
  const [st, setSt] = useState({ s: 0 }); //set spacebar time

  const [isRunning, setIsRunning] = useState(false);

  const [isOrange, setIsOrange] = useState(false);
  const [isBlue, setIsBlue] = useState(false);

  const [stIsRunning, setStIsRunning] = useState(false);

  const [initialitated, setInitialitated] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const [block, setBlock] = useState(false);

  const [intervalo, setIntervalo] = useState();
  const [stInterval, setStInterval] = useState();

  let Mmiliseconds = time.mms;
  let miliseconds = time.ms;
  let seconds = time.s;
  let minutes = time.m;

  let stSeconds = st.s;
  const space = ' ';




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
  }

  useEffect(() => {
    if (isRunning) {
      setBlock(true);
      setInitialitated(true);
      setIntervalo(setInterval(() => {
        increase();
      }, 10));
    }
    if (!isRunning && initialitated) {
      clearInterval(intervalo);
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
        if (stSeconds >= 50) {
          setIsOrange(false)
          setIsBlue(true);
        }
      }, 10));
    } else if (!stIsRunning) {
      setIsOrange(false);
      setIsBlue(false);
      clearInterval(stInterval);
      if (stSeconds >= 50) {
        setTime({ mms: 0, ms: 0, s: 0, m: 0 });
        setIsRunning(true)
      }
      stSeconds = 0;
      setSt({ s: stSeconds });
    }
    return () => clearInterval(stInterval);
  }, [stIsRunning]);

  const handleKeyUp = (event) => {
    setBlock(false);
    if (event.key === space) {
      setStIsRunning(false)
    }
  }

  const handleKeyDown = (event) => {
    if (isRunning) {
      setIsRunning(false)
      array.push(time);
    }
    if (event.key === space && block === false) {
      setStIsRunning(true);
    }
  };

  useEffect(() => {
    if (showResults === false) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
      };
    }
  }, [showResults, isRunning, time, block]);

  return (
    <Orange.Provider value={isOrange}>
      <Blue.Provider value={isBlue}>
        <div className='container'
        //  style={{ backgroundImage: theme.backgroundImage}}
        >
          <div className=
          {`${isOrange ? 'red' : ''} ${isBlue ? 'green' : ''} ${isDark ? 'bar' : 'bar3'}`} />
          {showResults ?
            <Results array={array} handleRestart={handleRestart} results={results} isDark={isDark} /> :
            <Playing array={array}>
              <Display
                minutes={time.m}
                seconds={time.s}
                miliseconds={time.ms}
                mmiliseconds={time.mms}
              /></Playing>
          }
          <div className={`${isOrange ? 'red' : ''} ${isBlue ? 'green' : ''} ${isDark ? 'bar2' : 'bar4'}`} />
        </div>
      </Blue.Provider>
    </Orange.Provider >
  );
}


































