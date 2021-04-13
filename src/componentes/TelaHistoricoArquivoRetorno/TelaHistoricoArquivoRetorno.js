/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import EntradaDados from "../EntradaDados/EntradaDados";
import Botao from "../Botao/Botao";
import Tabela from "../Tabela/Tabela";
import Linha from "../Linha/Linha";
import Coluna from "../Coluna/Coluna";
import Paginacao from "../Paginacao/Paginacao";
import Carregando from "../Carregando/Carregando";

import * as arquivoRetornoUtils from "../../utils/ArquivoRetorno";
import * as geralUtils from "../../utils/Geral";

import "./TelaHistoricoArquivoRetorno.css";

function TelaHistoricoArquivoRetorno() {

    const [listaArquivoRetornoExibicao, setListaArquivoRetornoExibicao] = useState([]);
    const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [valorBuscaCampanha, setValorBuscaCampanha] = useState("");
    const [configPaginado, setConfigPaginado] = useState({
        quantidePorPagina: 10,
        paginaAtual: 1
    })


    useEffect(() => {
        arquivoRetornoUtils.buscarArquivoRetornoPaginado(configPaginado.quantidePorPagina, configPaginado.paginaAtual).then((dados) => {
            montaListaArquivoRetorno(dados);
        });
    }, [configPaginado.paginaAtual]);

    const montaListaArquivoRetorno = (listaArquivoRetorno) => {
        if(listaArquivoRetorno.length < 1){
            setListaArquivoRetornoExibicao([]);
            setPaginacaoExibicao(<></>)
            setCarregando(false);
            return;
        }
        setListaArquivoRetornoExibicao(listaArquivoRetorno.map(item => {
            return (
                <Linha>
                    <Coluna tamanho="400">{item.usuario.nome || item.usuario._id}</Coluna>
                    <Coluna>{item.campanha + " " + item.sobrenome}</Coluna>
                    <Coluna>{geralUtils.formatarData(item.feito_em)}</Coluna>   
                </Linha>
            )
        }));

        if(listaArquivoRetorno.totalRegistros <= configPaginado.quantidePorPagina){
            setPaginacaoExibicao(<></>)
        }else{
            setPaginacaoExibicao(
                <Paginacao 
                quantidadePagina={configPaginado.quantidePorPagina} 
                totalRegistros={listaArquivoRetorno.totalRegistros} 
                paginaAtual={(paginaSelecionada) => setConfigPaginado({...configPaginado, paginaAtual: paginaSelecionada})}
                setCarregando={(bool) => setCarregando(bool)}
                />)
        }
        setCarregando(false);
    }

    return (
        <div id="container-tela-historico-arquivo-retorno">
            <header id="cabecalho-tela-historico-arquivo-retorno" className="p-10-px">
                <h2>Histórico - Arquivo de Retorno</h2>
            </header>
            <main id="conteudo-tela-historico-arquivo-retorno" className="p-10-px">
                <div className="d-flex flex-wrap">
                    <div className="col-4" />
                    <div className="flex-grow-1">
                        <section className="sessao-conteudo-tela-historico-arquivo-retorno row">
                            <div className="col-5">
                                <EntradaDados 
                                tipo="text" 
                                id="buscar-campanha" 
                                nome="buscar-campanha" 
                                descricao="Digite o nome da campanha" 
                                valor={(valorEntrada)=> setValorBuscaCampanha(valorEntrada.valor)}/>
                            </div>
                            <div className="col">
                                <Botao estilo={"w-100-pc btn-azul"} clique={()=> montaListaArquivoRetorno(arquivoRetornoUtils.buscarArquivoRetornoPorNomeCampanha(valorBuscaCampanha))}>
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
                <section className="sessao-conteudo-tela-historico-arquivo-retorno">
                    <div>
                        <Tabela tamanho="450">
                            <Linha titulo={true}>
                                <Coluna tamanho="400">Usuário</Coluna>
                                <Coluna>Campanha</Coluna>
                                <Coluna>Feito em</Coluna>
                            </Linha>
                            {!carregando && listaArquivoRetornoExibicao}
                            {carregando && <Carregando />}
                        </Tabela>
                    </div>
                    {paginacaoExibicao}
                </section>
            </main>
        </div>
    )
}

export default TelaHistoricoArquivoRetorno
