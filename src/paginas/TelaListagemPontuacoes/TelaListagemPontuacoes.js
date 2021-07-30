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
    const mascaras = ['(99) 9999-9999',  '(99) 99999-9999'];
  
    const [carregando, setCarregando] = useState(true);
    const [showModalPontuacao, setShowModalPontuacao] = useState(false);
    const [listaPontuacaoExibicao, setListaPontuacaoExibicao] = useState([]);
    const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
    const [dadosEdicao, setDadosEdicao] = useState({});
    const [qtdeRegistrosTabela, setQtdeRegistrosTabela] = useState(0);
    const [valorBuscaTelefone, setValorBuscaTelefone] = useState("");
    const [data, setData] = useState();
    const [configPaginado, setConfigPaginado] = useState({
        quantidePorPagina: 100,
        paginaAtual: 0,
      });

      useEffect(() => {
        listarPontuacoes();
      }, [configPaginado.paginaAtual]);
    
      useEffect(() => {
        if (data) {
          montaListaPontuacoes(data.pontuacoes, data);
        };
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
              if (dados.data.pontuacoes.length == 0) {
                showToast("aviso", "Não há registros a serem listados");
                setCarregando(false);
              }
            } else {
              showToast("erro", dados.message);
              setCarregando(false);
            };
          });
      };

      const montaListaPontuacoes = (list) => {
        setListaPontuacaoExibicao(
          list.map((item) => {
            return (
              <Linha>
                <Coluna tamanho="400">{mask(item.telefone, mascaras)}</Coluna>
                <Coluna tamanho="400">{pontuacoesUtils.retornarPropriedades(item).length}</Coluna>
                <Coluna><Botao estilo="btn-laranja w-100-pc" clique={() => abrirModalPontuacap(item)}>Selecionar</Botao></Coluna>
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
                totalRegistros={qtdeRegistrosTabela}
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

      const buscarPontuacoesPorTelefone = () => {
        pontuacoesUtils.buscarPontuacoesPorTelefone(configPaginado.quantidePorPagina, valorBuscaTelefone).then(dados => {
          setData(dados.data)
          setQtdeRegistrosTabela(dados.data.totalRegistros)
        })
      } 
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
                                    acaoAcionar = {() => buscarPontuacoesPorTelefone()}
                                    valor={(valorEntrada) => 
                                      setValorBuscaTelefone(valorEntrada.valor)
                                      }
                                />
                            </div>
                            <div className="col-3">
                                <Botao
                                  estilo={"w-100-pc btn-azul"}
                                  clique={() => buscarPontuacoesPorTelefone()}
                                  >
                                    Buscar
                                </Botao>
                            </div>
                        </section>
                    </div>
                </div>
                <section className="sessao-conteudo-tela-listagem-pontuacoes">
                <div>
                    <Tabela tamanho="370" titulo={
                    <Linha titulo={true}>
                        <Coluna tamanho="400">Telefone</Coluna>
                        <Coluna tamanho="400">Quantidade de Pontações</Coluna>
                        <Coluna>Ações</Coluna>
                    </Linha>
                    }>
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
