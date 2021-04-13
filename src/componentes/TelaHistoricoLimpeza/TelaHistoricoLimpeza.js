/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import EntradaDados from "../EntradaDados/EntradaDados";
import Botao from "../Botao/Botao";
import Tabela from "../Tabela/Tabela";
import Linha from "../Linha/Linha";
import Coluna from "../Coluna/Coluna";
import Paginacao from "../Paginacao/Paginacao";
import Carregando from "../Carregando/Carregando";

import * as limpezaUtils from "../../utils/Limpeza";
import * as geralUtils from "../../utils/Geral";

import "./TelaHistoricoLimpeza.css";

function TelaHistoricoLimpeza() {
    
    const [listaLimpezaExibicao, setListaLimpezaExibicao] = useState([]);
    const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [valorBuscaCampanha, setValorBuscaCampanha] = useState("");
    const [configPaginado, setConfigPaginado] = useState({
        quantidePorPagina: 10,
        paginaAtual: 1
    })

    useEffect(() => {
        limpezaUtils.buscarLimpezaPaginado(configPaginado.quantidePorPagina, configPaginado.paginaAtual).then((dados) => {
            montaListaLimpeza(dados);
        });
    }, [configPaginado.paginaAtual]);

    const montaListaLimpeza = (listaLimpeza) => {
        if(listaLimpeza.length < 1){
            setListaLimpezaExibicao([]);
            setPaginacaoExibicao(<></>)
            setCarregando(false);
            return;
        }
        setListaLimpezaExibicao(listaLimpeza.map(item => {
            return (
                <Linha>
                    <Coluna tamanho="400">{item.usuario.nome || item.usuario._id}</Coluna>
                    <Coluna>{item.campanha + " " + item.sobrenome}</Coluna>
                    <Coluna>{geralUtils.formatarData(item.feito_em)}</Coluna>   
                </Linha>
            )
        }));

        if(listaLimpeza.totalRegistros <= configPaginado.quantidePorPagina){
            setPaginacaoExibicao(<></>)
        }else{
            setPaginacaoExibicao(
                <Paginacao 
                quantidadePagina={configPaginado.quantidePorPagina} 
                totalRegistros={listaLimpeza.totalRegistros} 
                paginaAtual={(paginaSelecionada) => setConfigPaginado({...configPaginado, paginaAtual: paginaSelecionada})}
                setCarregando={(bool) => setCarregando(bool)}
                />)
        }
        setCarregando(false);
    }

    return (
        <div id="container-tela-historico-limpeza">
            <header id="cabecalho-tela-historico-limpeza" className="p-10-px">
                <h2>Histórico - Limpeza</h2>
            </header>
            <main id="conteudo-tela-historico-limpeza" className="p-10-px">
                <div className="d-flex flex-wrap">
                    <div className="col-4" />
                    <div className="flex-grow-1">
                        <section className="sessao-conteudo-tela-historico-limpeza row">
                            <div className="col-5">
                                <EntradaDados 
                                tipo="text" 
                                id="buscar-campanha" 
                                nome="buscar-campanha" 
                                descricao="Digite o nome da campanha" 
                                valor={(valorEntrada)=> setValorBuscaCampanha(valorEntrada.valor)}/>
                            </div>
                            <div className="col">
                                <Botao estilo={"w-100-pc btn-azul"} clique={()=> montaListaLimpeza(limpezaUtils.buscarLimpezaPorNomeCampanha(valorBuscaCampanha))}>
                                    Buscar
                                </Botao>
                            </div>
                            <div className="col">
                                <Botao estilo={"w-100-pc btn-laranja"} clique={()=> ""}>
                                    CSV <i className="fa fa-arrow-down"/>
                                </Botao>
                            </div>
                        </section>
                    </div>
                </div>
                <section className="sessao-conteudo-tela-historico-limpeza">
                    <div>
                        <Tabela tamanho="450">
                            <Linha titulo={true}>
                                <Coluna tamanho="400">Usuário</Coluna>
                                <Coluna>Campanha</Coluna>
                                <Coluna>Feito em</Coluna>
                            </Linha>
                            {!carregando && listaLimpezaExibicao}
                            {carregando && <Carregando />}
                        </Tabela>
                    </div>
                    {paginacaoExibicao}
                </section>
            </main>
        </div>
    )
}

export default TelaHistoricoLimpeza;
