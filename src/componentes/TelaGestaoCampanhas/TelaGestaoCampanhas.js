/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

import EntradaDados from "../EntradaDados/EntradaDados";
import Botao from "../Botao/Botao";
import Tabela from "../Tabela/Tabela";
import Linha from "../Linha/Linha";
import Coluna from "../Coluna/Coluna";
import Paginacao from "../Paginacao/Paginacao";
import Carregando from "../Carregando/Carregando";
import ModalConfirmacao from "../ModalConfirmacao/ModalConfirmacao";

import * as campanhaUtils from "../../utils/Campanha";
import * as geralUtils from "../../utils/Geral";

import "./TelaGestaoCampanhas.css";

function TelaGestaoCampanhas() {

    const [listaCampanhasExibicao, setListaCampanhaExibicao] = useState([]);
    const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
    const [idLimpar, setIdLimpar] = useState(0);
    const [valorBuscaCampanha, setValorBuscaCampanha] = useState("");
    const [configPaginado, setConfigPaginado] = useState({
        quantidePorPagina: 10,
        paginaAtual: 1
    })


    useEffect(() => {
        // campanhaUtils.buscarCampanhaPaginado(configPaginado.quantidePorPagina, configPaginado.paginaAtual).then((dados) => {
        //     montaListaCampanhas(dados.data);
        // });
    }, [configPaginado.paginaAtual]);

    const montaListaCampanhas = (listaCampanhas) => {
        setListaCampanhaExibicao(listaCampanhas.map(item => {
            return (
                <Linha>
                    <Coluna tamanho="120">{item.id}</Coluna>
                    <Coluna tamanho="300">{item.nome + " " + item.sobrenome}</Coluna>
                    <Coluna tamanho="100">{item.status}</Coluna>
                    <Coluna tamanho="200">{geralUtils.formatarData(item.importado_em)}</Coluna>   
                    <Coluna>
                        <Botao estilo={"w-100-pc btn-verde"} clique={()=> ""}>
                            Arquivo de Retorno
                        </Botao>
                        </Coluna>
                        <Coluna>
                        <Botao estilo={"w-100-pc btn-vermelho"} clique={()=> setIdLimpar(item.id, setShowModalConfirmacao(true))}>
                            Limpar
                        </Botao>
                    </Coluna>
                </Linha>
            )
        }));

        if(listaCampanhas.totalRegistros <= configPaginado.quantidePorPagina){
            setPaginacaoExibicao(<></>)
        }else{
            setPaginacaoExibicao(
                <Paginacao 
                quantidadePagina={configPaginado.quantidePorPagina} 
                totalRegistros={listaCampanhas.totalRegistros} 
                paginaAtual={(paginaSelecionada) => setConfigPaginado({...configPaginado, paginaAtual: paginaSelecionada})}
                setCarregando={(bool) => setCarregando(bool)}
                />)
        }

        setCarregando(false);
    }

    return (
        <>
          <div id="container-tela-gestao-campanhas">
            <header id="cabecalho-tela-gestao-campanhas" className="p-10-px">
                <h2>Gestão de campanhas</h2>
            </header>
            <main id="conteudo-tela-gestao-campanhas" className="p-10-px">
                <div className="d-flex flex-wrap">
                    <div className="col-4" />
                    <div className="flex-grow-1">
                        <section className="sessao-conteudo-tela-gestao-campanhas row">
                            <div className="col-5">
                                <EntradaDados 
                                tipo="text" 
                                id="buscar-campanha" 
                                nome="buscar-campanha" 
                                descricao="Digite o nome da campanha" 
                                valor={(valorEntrada)=> setValorBuscaCampanha(valorEntrada.valor)}/>
                            </div>
                            <div className="col">
                                <Botao estilo={"w-100-pc btn-azul"} clique={()=> montaListaCampanhas(campanhaUtils.buscarCampanhaPorNome(valorBuscaCampanha))}>
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
                <section className="sessao-conteudo-tela-gestao-campanhas">
                    <div>
                        <Tabela tamanho="450">
                            <Linha titulo={true}>
                                <Coluna tamanho="100">ID</Coluna>
                                <Coluna tamanho="350">Campanha</Coluna>
                                <Coluna tamanho="150">Status</Coluna>
                                <Coluna tamanho="200">Data de Importação</Coluna>
                                <Coluna>Ações</Coluna>
                            </Linha>
                            {!carregando && listaCampanhasExibicao}
                            {carregando && <Carregando />}
                        </Tabela>
                    </div>
                    {paginacaoExibicao}
                </section>
            </main>
        </div>
        <ModalConfirmacao 
        show={showModalConfirmacao}
        fecharModal={()=>setShowModalConfirmacao(false)}
        tituloModalConfirmacao="Essa ação é irreversivel"
        acaoConfirmada={()=> ""} 
        />
        </>
    )
}

export default TelaGestaoCampanhas
