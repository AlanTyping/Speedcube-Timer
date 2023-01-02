import React, { useState, useEffect } from "react"
import Display from './display';

export function Cronometro(){  

    const [tiempo, setTiempo] = useState({
        stateHoras: 0,
        stateMinutos: 0,
        stateSegundos: 0,
        stateMSegundos: 0,
    })

    const [intervalo, setIntervalo] = useState()
    const [state, setState] = useState(0);

    let msegundos = tiempo.stateMSegundos
    let segundos = tiempo.stateSegundos
    let minutos = tiempo.stateMinutos
    let horas = tiempo.stateHoras

    const incrementar = () => {
        if (msegundos === 99) {
            segundos ++
            msegundos = 0
        }
        if (segundos === 60) {
            minutos ++
            segundos = 0
        }
        if (minutos === 60) {
            horas ++
            minutos = 0
        }
        msegundos++

        return setTiempo({
            stateHoras: horas,
            stateMinutos: minutos,
            stateSegundos: segundos,
            stateMSegundos: msegundos,
        })
    }

    const reiniciar = () => {
        setTiempo({
            stateHoras: 0,
            stateMinutos: 0,
            stateSegundos: 0,
            stateMSegundos: 0,
        })

        horas = minutos = segundos = msegundos = 0

        clearInterval(intervalo)
    }
    
    const handleRestart = () => {
        setState(4);
        reiniciar();
        document.removeEventListener('keyup', handleRestart) 
    }

    const handleStart = () => {
        setState(1);
        setIntervalo(setInterval(() => {
            incrementar();
        }, 10))                                 
    }

    const handleStop = () => {
        setState(2);
        clearInterval(intervalo);
    }

    useEffect(() => {
        if (state === 0) {
            document.addEventListener('keyup', () => {
                handleStart();
            })
        }
        if (state === 1) {
            document.addEventListener('keydown', () => {
                handleStop();
            })
        }
        document.removeEventListener('keyup', handleStart);
        document.removeEventListener('keydown', handleStop);

    }, [handleStart, handleStop, state]);
    
    return (
        <section className = 'cronometro'>
            <h1>Cronometro</h1>
            <Display 
                horas = {tiempo.stateHoras}
                minutos = {tiempo.stateMinutos}
                segundos = {tiempo.stateSegundos}
                msegundos = {tiempo.stateMSegundos}
            />
        </section>
    )
}










