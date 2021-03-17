import React from 'react'


function Botao(props) {
    return (
        <button type="button" className={"btn " + props.estilo} onClick={() => props.clique}>
            {props.children}
        </button>
    )
}


export default Botao