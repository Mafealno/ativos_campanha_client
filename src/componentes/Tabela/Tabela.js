import React, {useState, useEffect} from "react";
import "./Tabela.css";

function Tabela(props) {

    const [tamanho, setTamanho] = useState({});

    useEffect(() => {
        if(props.tamanho){
            setTamanho({
                height: props.tamanho + "px",
            })
        }else{
            setTamanho({
                height: "100%"
            })
        }
    }, [])

    return (
        <div className="container-tabela w-100-pc" style={tamanho}>
            {props.children}
        </div>
    )
}

export default Tabela