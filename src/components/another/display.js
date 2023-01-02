import React from 'react'

function Display(props) {
    return (
        <div className='container'>
            <p>
                {props.horas < 10 ? "0" + props.horas : props.horas}:
                {props.minutos < 10 ? "0" + props.minutos : props.minutos}:
                {props.segundos < 10 ? "0" + props.segundos : props.segundos}:
                {props.msegundos < 10 ? "0" + props.msegundos : props.msegundos}
            </p>
        </div>
    )
}

export default Display