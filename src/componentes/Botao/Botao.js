import React from "react";
import "./Botao.css";

function Botao(props) {
    return (
        <button type="button" className={"botao " + props.estilo} onClick={props.clique}>
            {props.children}
        </button>
    )
}


export default Botao