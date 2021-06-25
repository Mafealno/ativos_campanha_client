import React, { useState, useEffect } from 'react'

import ModalControle from "../ModalControle/ModalControle";
import EntradaDados from "../EntradaDados/EntradaDados";
import Botao from "../Botao/Botao";

import * as validacaoDadosUtils from "../../utils/ValidacaoDados";

function ModalLimite(props) {

    const modeloValidacao = validacaoDadosUtils.dadosCampo;

    const [usuarioLogado, setUsuarioLogado] = useState({});
    const [dados, setDados] = useState({
        resultadoChamada: { ...modeloValidacao, requerido: true, valorPadrao: "" },
        descricaoResultado: { ...modeloValidacao, requerido: true, valorPadrao: "" },
        limite: { ...modeloValidacao, requerido: true, valorPadrao: 0 },
    })
    return (
        <ModalControle 
            {...props}
            tituloModal={"Editar Limite"}
            tamanhoModal="sm"
            conteudoCorpo={
                <>
                    <div className="row">
                        <div className="col">
                            <EntradaDados 
                            tipo="text" 
                            id="resultadoChamada" 
                            nome="resultadoChamada" 
                            apenasLeitura={true}
                            descricao="Resultado da chamada"
                            acaoAcionar={()=> ""}
                            valorInicial={dados.resultadoChamada.valor}
                            valor={(valorEntrada)=> setDados({...dados, resultadoChamada : { ...dados.resultadoChamada, valor: valorEntrada.valor}})}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <EntradaDados 
                            tipo="text" 
                            id="descricaoResultado" 
                            nome="descricaoResultado"
                            apenasLeitura={true}
                            descricao="Descrição do Resultado"
                            acaoAcionar={()=> ""}
                            valorInicial={dados.descricaoResultado.valor}
                            valor={(valorEntrada)=> setDados({...dados, descricaoResultado: { ...dados.descricaoResultado, valor: valorEntrada.valor}})}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <EntradaDados 
                            tipo="number" 
                            id="limite" 
                            nome="limite" 
                            descricao="Limite"
                            acaoAcionar={()=> ""}
                            valorInicial={dados.limite.valor}
                            valor={(valorEntrada)=> setDados({...dados, limite : { ...dados.limite, valor: valorEntrada.valor}})}
                            />
                        </div>
                    </div>
                </>
            }
            conteudoRodape={
                <>
                    <Botao estilo={"w-100-px btn-amarelo"} clique={()=> ""}>Editar</Botao>
                </>
            }
        />
    )
}

export default ModalLimite;