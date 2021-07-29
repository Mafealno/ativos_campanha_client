/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import * as validacaoDadosUtils from "../../utils/ValidacaoDados";

import "./EntradaDados.css";

function EntradaDados(props) {

    const [valorEntrada, setValorEntrada] = useState({
        nome: props.nome,
        valor: "",
    });

    useEffect(() => {
        props.valor(valorEntrada);
    }, [valorEntrada]);

    useEffect(() => {
        if(props.valorInicial){
            setValorEntrada({...valorEntrada, valor: props.valorInicial});
        };
    }, [props.valorInicial]);

    const pressionarEnter = (evento, acaoAcionar) => {
        if (evento.key === "Enter") {
            if(acaoAcionar){
                acaoAcionar();
            };
        };
      };
    return (
        <>
            <input 
            type={props.tipo} 
            id={"campo-" + props.id}
            name={props.nome}
            className={"estilo-padrao " + props.estilo || ""}
            placeholder={props.descricao}
            value={valorEntrada.valor}
            autoComplete={props.autoCompletar}
            disabled={props.apenasLeitura || false}
            onChange={(evento)=> setValorEntrada({...valorEntrada, valor: evento.target.value})}
            onKeyDown={(evento)=> pressionarEnter(evento, props.acaoAcionar)}
            onFocus={() => validacaoDadosUtils.removerErroCampo(props.id)}
            /> 
            <span className="invalid-feedback" id={"erro-" + props.id}>teste</span>
        </>
    );
};

export default EntradaDados;
