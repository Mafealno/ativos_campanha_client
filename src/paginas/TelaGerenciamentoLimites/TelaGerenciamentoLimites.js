/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Botao from "../../componentes/Botao/Botao";
import Carregando from "../../componentes/Carregando/Carregando";
import Tabela from "../../componentes/Tabela/Tabela";
import Linha from "../../componentes/Linha/Linha";
import Coluna from "../../componentes/Coluna/Coluna";
import BotaoVoltarMenu from "../../componentes/BotaoVoltarMenu/BotaoVoltarMenu";
import ModalLimite from "../../componentes/ModalLimite/ModalLimite";
import { showToast } from "../../componentes/ToastControle/ToastControle";

import * as limiteUtils from "../../utils/Limites";

import "./TelaGerenciamentoLimites.css";

function TelaGerenciamentoLimites(props) {
  const [carregando, setCarregando] = useState(true);
  const [showModalLimite, setShowModalLimite] = useState(false);
  const [dadosEdicao, setDadosEdicao] = useState(false);
  const [list, setList] = useState([]);
  const [listaLimitesExibicao, setListaLimitesExibicao] = useState([]);

  useEffect(() => {
    listarLimites();
  }, [props.contador]);

  useEffect(() => {
    if (list.length > 0) {
      montarListaLimites(list);
    }
  }, [list]);

  const listarLimites = () => {
    limiteUtils.listarLimites().then((dados) => {
      if (dados.success) {
        setList(dados.data);
        if (dados.data.length == 0) {
          showToast("aviso", "Não há registros a serem listados");
          setCarregando(false);
        }
      } else {
        showToast("erro", dados.message);
      }
    });
  };

  const montarListaLimites = (dados) => {
    setListaLimitesExibicao(
      dados.map((item) => {
        return (
          <Linha>
            <Coluna tamanho="600">{item.descricao.charAt(0).toUpperCase() + item.descricao.slice(1)}</Coluna>
            <Coluna tamanho="200">{item.valor}</Coluna>
            <Coluna>
              <Botao
                estilo={"w-100-pc btn-amarelo"}
                clique={() => abrirModalLimite(item)}
              >
                Editar
              </Botao>
            </Coluna>
          </Linha>
        );
      })
    );
    setCarregando(false);
  };

  const abrirModalLimite = (dadosEdicao) => {
    if (dadosEdicao) {
      setDadosEdicao(dadosEdicao);
    }
    setShowModalLimite(true);
  };

  
  return (
    <>
      <div id="container-tela-gerenciamento-limites">
        <header id="cabecalho-tela-gerenciamento-limites" className="p-10-px">
          <BotaoVoltarMenu />
          <h2 className="ml-2">Gerenciamento de Limites</h2>
        </header>
        <main id="conteudo-tela-gerenciamento-limites" className="p-10-px">
          <section className="sessao-conteudo-tela-gerenciamento-limites">
            <div>
              <Tabela tamanho="400" titulo={
                <Linha titulo={true}>
                  <Coluna tamanho="600">Descrição do resultado</Coluna>
                  <Coluna tamanho="200">Limite</Coluna>
                  <Coluna>Ações</Coluna>
                </Linha>
              }>
                {!carregando && listaLimitesExibicao}
                {carregando && <Carregando />}
              </Tabela>
            </div>
          </section>
        </main>
      </div>
      <ModalLimite
        show={showModalLimite}
        fecharModal={() => setShowModalLimite(false)}
        dados={dadosEdicao}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  contador: state.Contador.contador,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TelaGerenciamentoLimites);
