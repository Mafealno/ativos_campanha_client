/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'

import * as validacaoDadosUtils from "../../utils/ValidacaoDados";

import "./EntradaSelecao.css";

function EntradaSelecao(props) {

    const [valorEntrada, setValorEntrada] = useState({
        nome: props.name,
        valor: "",
    });

    useEffect(() => {
        props.valor(valorEntrada);
    }, [valorEntrada]);

    useEffect(() => {
        if(props.valorInicial){
            setValorEntrada({...valorEntrada, valor: props.valorInicial});
        }
    }, [props.valorInicial]);

    return (
        <>
            <select
            className={"estilo-padrao " + props.estilo}
            name={props.nome}
            id={"campo-" + props.id}
            value={valorEntrada.valor}
            onChange={(evento) => setValorEntrada({...valorEntrada, valor: evento.target.value})}
            onFocus={() => validacaoDadosUtils.removerErroCampo(props.id)}
            >
                {props.children}
            </select>
            <span className="invalid-feedback" id={"erro-" + props.id}>teste</span>
        </>
    )
}

export default EntradaSelecao
