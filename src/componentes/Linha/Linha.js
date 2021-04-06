import React from "react";
import "./Linha.css";

function Linha(props) {
    
    if(props.titulo) {
        return (
            <header className={"container-linha linha-tituto"}>
                {props.children}
            </header>
        )
    }else{
        return (
            <div className={"container-linha"}>
                {props.children}
            </div>
        )
    }  
}

export default Linha
