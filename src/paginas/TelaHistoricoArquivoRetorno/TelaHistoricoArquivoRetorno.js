/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import EntradaDados from "../../componentes/EntradaDados/EntradaDados";
import Botao from "../../componentes/Botao/Botao";
import Paginacao from "../../componentes/Paginacao/Paginacao";
import Carregando from "../../componentes/Carregando/Carregando";
import Tabela from "../../componentes/Tabela/Tabela";
import Linha from "../../componentes/Linha/Linha";
import Coluna from "../../componentes/Coluna/Coluna";
import BotaoVoltarMenu from "../../componentes/BotaoVoltarMenu/BotaoVoltarMenu";
import { showToast } from "../../componentes/ToastControle/ToastControle";


import * as arquivoRetornoUtils from "../../utils/ArquivoRetorno";
import * as geralUtils from "../../utils/Geral";

import "./TelaHistoricoArquivoRetorno.css";

function TelaHistoricoArquivoRetorno() {
    const [carregando, setCarregando] = useState(true);
    const [listaArquivoRetornoExibicao, setListaArquivoRetornoExibicao] = useState([]);
    const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
    const [qtdeRegistrosTabela, setQtdeRegistrosTabela] = useState(0);
    const [valorBuscaCampanha, setValorBuscaCampanha] = useState("");
    const [data, setData] = useState();
    const [configPaginado, setConfigPaginado] = useState({
      quantidadePorPagina: 10,
      paginaAtual: 0,
  });

  useEffect(() => {
    listarArquivoRetorno();
  }, [configPaginado.paginaAtual]);

  useEffect(() => {
    if (data) {
      montaListaArquivoRetorno(data.historicos, data);
    }
  }, [data, qtdeRegistrosTabela]);

  const listarArquivoRetorno = () => {
    arquivoRetornoUtils
      .buscarHistoricoArquivoRetornoPaginado(
        configPaginado.quantidadePorPagina,
        configPaginado.paginaAtual
      )
      .then((dados) => {
        if (dados.success) {
          setQtdeRegistrosTabela(dados.data.totalRegistros);
          setData(dados.data);
          if (dados.data.historicos.length == 0) {
            showToast("aviso", "Não há registros a serem listados");
            setCarregando(false);
          }
        } else {
          showToast("erro", dados.message);
          setCarregando(false);
        }
      });
  };

  const montaListaArquivoRetorno = (list, dados) => {
    
    setListaArquivoRetornoExibicao(
      list.map((item) => {
          return (
            <Linha>
              <Coluna tamanho="400">
                {item.usuario ? item.usuario.nome + " " + item.usuario.sobrenome : item.id_usuario}
              </Coluna>
              <Coluna tamanho="300">{item.campanha}</Coluna>
              <Coluna>{geralUtils.formatarDataHora(item.feito_em)}</Coluna>
            </Linha>
          );
      })
    );

    if (qtdeRegistrosTabela <= configPaginado.quantidadePorPagina) {
      setPaginacaoExibicao(<></>);
    } else {
      setPaginacaoExibicao(
        <Paginacao
          quantidadePagina={configPaginado.quantidadePorPagina}
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

  return (
    <div id="container-tela-historico-arquivo-retorno">
      <header id="cabecalho-tela-historico-arquivo-retorno" className="p-10-px">
        <BotaoVoltarMenu />
        <h2 className="ml-2">Histórico - Arquivo de Retorno</h2>
      </header>
      <main id="conteudo-tela-historico-arquivo-retorno" className="p-10-px">
        <div className="d-flex flex-wrap">
          <div className="col-4" />
          <div className="flex-grow-1">
            <section className="sessao-conteudo-tela-historico-arquivo-retorno row">
              <div className="col"/>
              <div className="col-5">
                <EntradaDados
                  tipo="text"
                  id="buscar-campanha"
                  nome="buscar-campanha"
                  descricao="Digite o nome da campanha"
                  valor={(valorEntrada) =>
                    setValorBuscaCampanha(valorEntrada.valor)
                  }
                />
              </div>
              <div className="col">
                <Botao
                  estilo={"w-100-pc btn-azul"}
                  clique={() =>
                      arquivoRetornoUtils.buscarHistoricoArquivoRetornoPorNomeCampanha(
                          valorBuscaCampanha,
                          configPaginado.quantidadePorPagina
                        )
                        .then((dados) => {
                          setData(dados.data);
                          setQtdeRegistrosTabela(dados.data.totalRegistros)
                        })
                  }
                >
                  Buscar
                </Botao>
              </div>
            </section>
          </div>
        </div>
        <section className="sessao-conteudo-tela-historico-arquivo-retorno">
          <div>
            <Tabela tamanho="370" titulo={
              <Linha titulo={true}>
                <Coluna tamanho="400">Usuário</Coluna>
                <Coluna tamanho="300">Campanha</Coluna>
                <Coluna>Feito em</Coluna>
              </Linha> 
              }>
              {!carregando && listaArquivoRetornoExibicao}
              {carregando && <Carregando />}
            </Tabela>
          </div>
          {paginacaoExibicao}
        </section>
      </main>
    </div>
  );
}

export default TelaHistoricoArquivoRetorno;
