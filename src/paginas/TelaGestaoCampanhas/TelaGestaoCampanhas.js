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
import ModalConfirmacao from "../../componentes/ModalConfirmacao/ModalConfirmacao";
import BotaoVoltarMenu from "../../componentes/BotaoVoltarMenu/BotaoVoltarMenu";
import { showToast } from "../../componentes/ToastControle/ToastControle";

import * as campanhaUtils from "../../utils/Campanha";
import * as arquivoRetornoUtils from "../../utils/ArquivoRetorno";
import * as limpezaUtils from "../../utils/Limpeza";
import * as loginUtils from "../../utils/Login";
import * as geralUtils from "../../utils/Geral";


import "./TelaGestaoCampanhas.css";

function TelaGestaoCampanhas() {
  const [carregando, setCarregando] = useState(true);
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [listaCampanhasExibicao, setListaCampanhaExibicao] = useState([]);
  const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
  const [qtdeRegistrosTabela, setQtdeRegistrosTabela] = useState(0);
  const [idLimpar, setIdLimpar] = useState(0);
  const [valorBuscaCampanha, setValorBuscaCampanha] = useState("");
  const [data, setData] = useState();
  const [configPaginado, setConfigPaginado] = useState({
    quantidadePagina: 10,
    paginaAtual: 0,
  });

  useEffect(() => {
    listarCampanhas();
  }, [configPaginado.paginaAtual]);

  useEffect(() => {
    if (data) {
      montaListaCampanhas(data.campanhas, data);
    }
  }, [data, qtdeRegistrosTabela]);

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
            setData(dados.data);
            if (dados.data.campanhas.length == 0) {
              showToast("aviso", "Não há registros a serem listados");
              setCarregando(false);
            }
          } else {
            showToast("erro", dados.message);
          }
        }
      });
  };

  const montaListaCampanhas = (list, dados) => {
    setListaCampanhaExibicao(
      list.map((item) => {
        return (
          <Linha>
            <Coluna tamanho="80">{item.CampaignID}</Coluna>
            <Coluna tamanho="300">{item.CampaignName}</Coluna>
            <Coluna tamanho="100">{item.Status}</Coluna>
            <Coluna tamanho="200">
              {geralUtils.formatarData(item.ImportDate)}
            </Coluna>
            <Coluna>
              <Botao estilo={"w-100-pc btn-verde"} clique={() => gerarArquivoRetorno(item.CampaignID, item.CampaignName)}>
                Arquivo de Retorno
              </Botao>
            </Coluna>
            <Coluna>
              <Botao
                estilo={"w-100-pc btn-vermelho"}
                clique={() =>
                  setIdLimpar(item.CampaignID, setShowModalConfirmacao(true))
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

    setCarregando(false);
  };

  const gerarArquivoRetorno = (idCampanha, campanha) => {
    const usuarioLogado = loginUtils.buscarUsuarioLogado();
    arquivoRetornoUtils.gerarArquivoRetorno(usuarioLogado.id, idCampanha, campanha).then(dados => {
      if(dados.success){
        showToast("sucesso", dados.message);
      }else{
        showToast("erro", dados.message);
      }
    })
  }

  const gerarLimpezaArquivo = () => {
    const usuarioLogado = loginUtils.buscarUsuarioLogado();
    limpezaUtils.gerarLimpezaCampanha(usuarioLogado.id, idLimpar).then(dados => {
      if(dados.success){
        showToast("sucesso", dados.message);
        listarCampanhas();
      }else{
        showToast("erro", dados.message);
      }
    })
  }

  return (
    <>
      <div id="container-tela-gestao-campanhas">
        <header id="cabecalho-tela-gestao-campanhas" className="p-10-px">
          <BotaoVoltarMenu />
          <h2 className="ml-2">Gestão de Campanhas</h2>
        </header>
        <main id="conteudo-tela-gestao-campanhas" className="p-10-px">
          <div className="d-flex flex-wrap">
            <div className="col-4" />
            <div className="flex-grow-1">
              <section className="sessao-conteudo-tela-gestao-campanhas row">
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
                      campanhaUtils
                        .buscarCampanhaPorNomePaginado(
                          valorBuscaCampanha,
                          configPaginado.quantidadePagina
                        )
                        .then(dados => {
                          setData(dados.data);
                          setQtdeRegistrosTabela(dados.data.primeiro_registro.Total_Registros);
                        })
                    }
                  >
                    Buscar
                  </Botao>
                </div>
              </section>
            </div>
          </div>
          <section className="sessao-conteudo-tela-gestao-campanhas">
            <div>
              <Tabela tamanho="370" titulo={
                <Linha titulo={true}>
                  <Coluna tamanho="80">ID</Coluna>
                  <Coluna tamanho="300">Campanha</Coluna>
                  <Coluna tamanho="100">Status</Coluna>
                  <Coluna tamanho="200">Data de Importação</Coluna>
                  <Coluna>Ações</Coluna>
                </Linha>
              }>
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
        acaoConfirmada={() => gerarLimpezaArquivo()}
      />
    </>
  );
}

export default TelaGestaoCampanhas;
