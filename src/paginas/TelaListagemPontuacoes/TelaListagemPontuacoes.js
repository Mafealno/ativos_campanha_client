/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { mask } from 'remask';

import EntradaDados from '../../componentes/EntradaDados/EntradaDados';
import Botao from "../../componentes/Botao/Botao";
import Carregando from "../../componentes/Carregando/Carregando";
import Tabela from "../../componentes/Tabela/Tabela";
import Linha from "../../componentes/Linha/Linha";
import Coluna from "../../componentes/Coluna/Coluna";
import BotaoVoltarMenu from "../../componentes/BotaoVoltarMenu/BotaoVoltarMenu";
import Paginacao from '../../componentes/Paginacao/Paginacao';
import { showToast } from "../../componentes/ToastControle/ToastControle";
import ModalPontuacao from '../../componentes/ModalPontuacao/ModalPontuacao';

import * as pontuacoesUtils from "../../utils/Pontuacoes";

import "./TelaListagemPontuacoes.css";

function TelaListagemPontuacoes() {

    const [listaPontuacaoExibicao, setListaPontuacaoExibicao] = useState([]);
    const [valorBuscaTelefone, setValorBuscaTelefone] = useState("");
    const [data, setData] = useState();
    const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
    const [qtdeRegistrosTabela, setQtdeRegistrosTabela] = useState(0);
    const [dadosEdicao, setDadosEdicao] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [showModalPontuacao, setShowModalPontuacao] = useState(false);
    const [configPaginado, setConfigPaginado] = useState({
        quantidePorPagina: 100,
        paginaAtual: 0,
      });

    const mascaras = ['(99) 9999-9999',  '(99) 99999-9999'];

      useEffect(() => {
        listarPontuacoes();
      }, [configPaginado.paginaAtual]);
    
      useEffect(() => {
        if (data) {
          montaListaPontuacoes(data.pontuacoes, data);
        }
      }, [data, qtdeRegistrosTabela]);

      const listarPontuacoes = () => {
        pontuacoesUtils
          .buscarPontuacoesPaginado(
            configPaginado.quantidePorPagina,
            configPaginado.paginaAtual
          )
          .then((dados) => {
            if (dados.success) {
              setQtdeRegistrosTabela(dados.data.totalRegistros);
              setData(dados.data);
              if (dados.data == 0) {
                showToast("aviso", "Não há registros a serem listados");
                setCarregando(false);
              }
            } else {
              showToast("erro", dados.message);
              setCarregando(false);
            }
          });
      };

      const montaListaPontuacoes = (list, dados) => {
        setListaPontuacaoExibicao(
          list.map((item) => {
            return (
              <Linha>
                <Coluna tamanho="400">{mask(item.telefone, mascaras)}</Coluna>
                <Coluna tamanho="400">{pontuacoesUtils.retornarPropriedades(item).length}</Coluna>
                <Coluna><Botao estilo="btn-azul w-100-pc" clique={() => abrirModalPontuacap(item)}>Selecionar</Botao></Coluna>
              </Linha>
            );
          })
        );

        if (qtdeRegistrosTabela <= configPaginado.quantidePorPagina) {
            setPaginacaoExibicao(<></>);
          } else {
            setPaginacaoExibicao(
              <Paginacao
                quantidadePagina={configPaginado.quantidePorPagina}
                totalRegistros={dados.totalRegistros}
                paginaAtual={(paginaSelecionada) =>
                  setConfigPaginado({
                    ...configPaginado,
                    paginaAtual: paginaSelecionada,
                  })
                }
                setCarregando={(bool) => setCarregando(bool)}
              />
            );
          }
          setCarregando(false);
      };

      const abrirModalPontuacap = (dadosEdicao) => {
        if (dadosEdicao) {
          setDadosEdicao(dadosEdicao);
        }
        setShowModalPontuacao(true);
      };

    return (
      <>
        <div id="container-tela-listagem-pontuacoes">
            <header id="cabecalho-tela-listagem-pontuacoes">
                <BotaoVoltarMenu />
                <h2 className="ml-2">Lista de Pontuações</h2>
            </header>            
            <main id="conteudo-tela-listagem-pontuacoes">
            <div className="d-flex flex-wrap">
                <div className="col-4" />
                    <div className="flex-grow-1">
                        <section className="sessao-conteudo-tela-listagem-pontuacoes row">
                            <div className="col-4" />
                            <div className="col-5">
                                <EntradaDados
                                    tipo="text"
                                    id="buscar-telefone"
                                    nome="buscar-telefone"
                                    descricao="Digite o número de telefone"
                                    valor={(valorEntrada) => setValorBuscaTelefone(valorEntrada.valor)
                                }
                                />
                            </div>
                            <div className="col-3">
                                <Botao
                                  estilo={"w-100-pc btn-azul"}
                                  clique={() => ""
                                      // montaListaPontuacoes(
                                      //   pontuacoesUtils
                                      //     .buscarPontuacaoPorNumeroTelefone(
                                      //       valorBuscaCampanha,
                                      //       configPaginado.quantidadePagina
                                      //     )
                                      //     .then(dados => setList(dados))
                                      // )
                                  }
                                  >
                                    Buscar
                                </Botao>
                            </div>
                        </section>
                    </div>
                </div>
                <section className="sessao-conteudo-tela-listagem-pontuacoes">
                <div>
                    <Tabela tamanho="370">
                    <Linha titulo={true}>
                        <Coluna tamanho="400">Telefone</Coluna>
                        <Coluna tamanho="400">Quantidade de Pontações</Coluna>
                        <Coluna>Ações</Coluna>
                    </Linha>
                    {!carregando && listaPontuacaoExibicao}
                    {carregando && <Carregando />}
                    </Tabela>
                </div>
                {paginacaoExibicao}
                </section>
            </main>
        </div>
        <ModalPontuacao 
           show={showModalPontuacao}
           fecharModal={() => setShowModalPontuacao(false)}
           dados={dadosEdicao}
        />
      </>
    )
}

export default TelaListagemPontuacoes;
