/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import EntradaDados from "../EntradaDados/EntradaDados";
import Botao from "../Botao/Botao";
import Tabela from "../Tabela/Tabela";
import Linha from "../Linha/Linha";
import Coluna from "../Coluna/Coluna";
import Paginacao from "../Paginacao/Paginacao";
import Carregando from "../Carregando/Carregando";
import ModalConfirmacao from "../ModalConfirmacao/ModalConfirmacao";
import BotaoVoltarMenu from "../BotaoVoltarMenu/BotaoVoltarMenu";

import { showToast } from "../ToastControle/ToastControle";
import * as campanhaUtils from "../../utils/Campanha";
import * as geralUtils from "../../utils/Geral";

import "./TelaGestaoCampanhas.css";

function TelaGestaoCampanhas() {
  const [listaCampanhasExibicao, setListaCampanhaExibicao] = useState([]);
  const [qtdeRegistrosTabela, setQtdeRegistrosTabela] = useState(0);
  const [list, setList] = useState([]);
  const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [idLimpar, setIdLimpar] = useState(0);
  const [valorBuscaCampanha, setValorBuscaCampanha] = useState("");
  const [configPaginado, setConfigPaginado] = useState({
    quantidadePagina: 10,
    paginaAtual: 0,
  });

  useEffect(() => {
    listarCampanhas();
  }, [configPaginado.paginaAtual]);

  useEffect(() => {
    if (list.length > 0) {
      montaListaCampanhas(list);
    }
    setCarregando(false);
  }, [list]);

  const listarCampanhas = () => {
    campanhaUtils
      .buscarCampanhaPaginado(
        configPaginado.quantidadePagina,
        configPaginado.paginaAtual
      )
      .then((dados) => {
        if (dados) {
          if (dados.success) {
            setQtdeRegistrosTabela(
              dados.data.primeiro_registro.Total_Registros
            );
            setList(dados.data.campanhas);
            if (dados.data.campanhas.length == 0) {
              showToast("aviso", "Não há registros a serem listados");
            }
          } else {
            showToast("erro", dados.message);
          }
        }
      });
  };

  const montaListaCampanhas = (dados) => {
    setListaCampanhaExibicao(
      dados.map((item) => {
        return (
          <Linha>
            <Coluna tamanho="80">{item.CampaignID}</Coluna>
            <Coluna tamanho="300">{item.CampaignName}</Coluna>
            <Coluna tamanho="100">{item.Status}</Coluna>
            <Coluna tamanho="200">
              {geralUtils.formatarData(item.ImportDate)}
            </Coluna>
            <Coluna>
              <Botao estilo={"w-100-pc btn-verde"} clique={() => ""}>
                Arquivo de Retorno
              </Botao>
            </Coluna>
            <Coluna>
              <Botao
                estilo={"w-100-pc btn-vermelho"}
                clique={() =>
                  setIdLimpar(item.id, setShowModalConfirmacao(true))
                }
              >
                Limpar
              </Botao>
            </Coluna>
          </Linha>
        );
      })
    );

    if (qtdeRegistrosTabela <= configPaginado.quantidadePagina) {
      setPaginacaoExibicao(<></>);
    } else {
      setPaginacaoExibicao(
        <Paginacao
          quantidadePagina={configPaginado.quantidadePagina}
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
  };

  return (
    <>
      <div id="container-tela-gestao-campanhas">
        <header id="cabecalho-tela-gestao-campanhas" className="p-10-px">
          <BotaoVoltarMenu />
          <h2 className="ml-2">Gestão de campanhas</h2>
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
                    valor={(valorEntrada) =>
                      setValorBuscaCampanha(valorEntrada.valor)
                    }
                  />
                </div>
                <div className="col">
                  <Botao
                    estilo={"w-100-pc btn-azul"}
                    clique={() =>
                      campanhaUtils
                        .buscarCampanhaPorNomePaginado(
                          valorBuscaCampanha,
                          configPaginado.quantidadePagina
                        )
                        .then(dados => setList(dados))
                    }
                  >
                    Buscar
                  </Botao>
                </div>
                <div className="col">
                  <Botao estilo={"w-100-pc btn-laranja"} clique={() => ""}>
                    CSV <i className="fa fa-arrow-down" />
                  </Botao>
                </div>
              </section>
            </div>
          </div>
          <section className="sessao-conteudo-tela-gestao-campanhas">
            <div>
              <Tabela tamanho="370">
                <Linha titulo={true}>
                  <Coluna tamanho="80">ID</Coluna>
                  <Coluna tamanho="300">Campanha</Coluna>
                  <Coluna tamanho="100">Status</Coluna>
                  <Coluna tamanho="200">Data de Importação</Coluna>
                  <Coluna>Ações</Coluna>
                </Linha>
                {carregando && <Carregando />}
                {!carregando && listaCampanhasExibicao}
              </Tabela>
            </div>
            {paginacaoExibicao}
          </section>
        </main>
      </div>
      <ModalConfirmacao
        show={showModalConfirmacao}
        fecharModal={() => setShowModalConfirmacao(false)}
        tituloModalConfirmacao="Essa ação é irreversivel"
        acaoConfirmada={() => ""}
      />
    </>
  );
}

export default TelaGestaoCampanhas;
