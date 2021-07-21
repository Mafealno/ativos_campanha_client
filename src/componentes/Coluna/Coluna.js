/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import "./Coluna.css";

function Coluna(props) {

    const [tamanho, setTamanho] = useState({});

    useEffect(() => {
        if(props.tamanho){
            setTamanho({
                width: props.tamanho + "px",
                maxWidth: props.tamanho + "px"
            })
        }else{
            setTamanho({
                flexGrow: 1
            })
        }
    }, [])

    return (
        <div className={"container-coluna cortar-texto " + props.estilo || ""} style={tamanho}>
            <p className={props.ordernar ? "cursor cortar-texto w-100-pc" : "cortar-texto w-100-pc"} onClick={props.ordernar}>
                {props.children}
                <i id={"icon-" + props.id} className="icon-ordenacao fa"/>
            </p>
        </div>
    )
}

export default Coluna
