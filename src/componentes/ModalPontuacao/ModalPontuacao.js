/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { mask } from "remask";

import Tabela from "../../componentes/Tabela/Tabela";
import Linha from "../../componentes/Linha/Linha";
import Coluna from "../../componentes/Coluna/Coluna";
import ModalControle from '../ModalControle/ModalControle';

import * as pontuacaoUtils from "../../utils/Pontuacoes";

import "./ModalPontuacao.css";

function ModalPontuacao(props) {

    const mascaras = ['(99) 9999-9999',  '(99) 99999-9999'];

    const [pontuacoesExibicao, setPontuacoesExibicao] = useState([]);
    const [listaPropriedades, setListaPropriedades] = useState([]);
    const [ordenacaoLista, setOrdenacaoLista] = useState({
        tipoOrdenacao: "",
        ordem: true, //true - asc : false - desc
        contador: 1
    });

    useEffect(() => {
        if(props.show){
            const list = pontuacaoUtils.retornarPropriedades(props.dados);
            setListaPropriedades(list);
            renderizarLista(list);
        }else{
            setPontuacoesExibicao([]);
        }
    }, [props.show]);

    useEffect(() => {
        const list = pontuacaoUtils.ordernarLista(listaPropriedades, ordenacaoLista);
        renderizarLista(list);
     }, [ordenacaoLista]);

     const renderizarLista = (list) => {
        setPontuacoesExibicao(list.map(item => {
            return (
                <Linha>
                    <Coluna tamanho="350" estilo="cortar-texto">{item.propriedade}</Coluna>
                    <Coluna>{item.valor}</Coluna>
                </Linha>
            );
        }));
     }

    const alterarOrdernacaoLista = (tipoOrdenacao) => {

        let ordem, contador;
        const elAnterior = document.getElementById("icon-" + ordenacaoLista.tipoOrdenacao.toLowerCase().replace("_", "-"));
        const elAtual = document.getElementById("icon-" + tipoOrdenacao.toLowerCase().replace("_", "-"));

        if(tipoOrdenacao == ordenacaoLista.tipoOrdenacao){
            ordem = !ordenacaoLista.ordem;
            contador = ordenacaoLista.contador + 1;
        }else{
            ordem = true;
            contador = 1;
        }
        
        if(contador == 3){
            tipoOrdenacao = "";
            ordem = true;
            contador = 1;
        }

        if(elAnterior){
            elAnterior.classList.remove("fa-caret-up");
            elAnterior.classList.remove("fa-caret-down");
        };
        
        if(tipoOrdenacao != ""){
            const tipoIcon = !ordem ? "up" : "down"
            elAtual.classList.add("fa-caret-" + tipoIcon);
        }
        
        setOrdenacaoLista({
            tipoOrdenacao: tipoOrdenacao,
            ordem: ordem,
            contador: contador
        });
    };

    return (
        <ModalControle 
            {...props}
            tituloModal={"Pontuação"}
            tamanhoModal="md"
            conteudoCorpo={
                <>
                    <div className="row">
                        <div className="col-12 centralizar">
                            <h5>
                                Telefone: {mask(props.dados.telefone || 0, mascaras)}
                            </h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Tabela tamanho="150">
                                <Linha titulo={true}>
                                    <Coluna tamanho="350" id="propriedade" ordernar={() => alterarOrdernacaoLista("propriedade")}>Pontuação</Coluna>
                                    <Coluna id="valor" ordernar={() => alterarOrdernacaoLista("valor")}>Valor</Coluna>
                                </Linha>
                                {pontuacoesExibicao}
                            </Tabela>
                        </div>
                    </div>
                </>
            }
        />
    )
}

export default ModalPontuacao;