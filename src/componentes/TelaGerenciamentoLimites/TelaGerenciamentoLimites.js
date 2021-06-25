/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Botao from "../Botao/Botao";
import Carregando from "../Carregando/Carregando";
import Tabela from "../Tabela/Tabela";
import Linha from "../Linha/Linha";
import Coluna from "../Coluna/Coluna";
import BotaoVoltarMenu from "../BotaoVoltarMenu/BotaoVoltarMenu";
import ModalLimite from "../ModalLimite/ModalLimite";

import * as limiteUtils from "../../utils/Limites";
import { showToast } from "../ToastControle/ToastControle";

import "./TelaGerenciamentoLimites.css";

function TelaGerenciamentoLimites(props) {
  const [carregando, setCarregando] = useState(true);
  const [list, setList] = useState([]);
  const [listaLimitesExibicao, setListaLimitesExibicao] = useState([]);
  const [showModalLimite, setShowModalLimite] = useState(false);

  useEffect(() => {
    listarLimites();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      montarListaLimites(list);
    }
    setCarregando(false);
  }, [list]);

  const listarLimites = () => {
    limiteUtils.listarLimites().then((dados) => {
      if (dados.success) {
        setList(dados.data.limites);
        if (dados.data.limites.length == 0) {
          showToast("aviso", "Não há registros a serem listados");
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
            <Coluna tamanho="200">{item.call_result}</Coluna>
            <Coluna tamanho="400">{item.descricao}</Coluna>
            <Coluna tamanho="200">{item.limite}</Coluna>
            <Coluna>
              <Botao
                estilo={"w-100-pc btn-amarelo"}
                clique={() => "abrirModalUsuario(item)"}
              >
                Editar
              </Botao>
            </Coluna>
          </Linha>
        );
      })
    );
  };

  return (
    <>
      <div id="container-tela-gerenciamento-limites">
        <header id="cabecalho-tela-gerenciamento-limites" className="p-10-px">
          <BotaoVoltarMenu />
          <h2 className="ml-2">Gerenciamento de Limites</h2>
          <Botao
            estilo={"w-100-px btn-amarelo"}
            clique={() => setShowModalLimite(true)}
          >
            Teste
          </Botao>
        </header>
        <main id="conteudo-tela-gerenciamento-limites" className="p-10-px">
          <section className="sessao-conteudo-tela-gerenciamento-limites">
            <div>
              <Tabela tamanho="500">
                <Linha titulo={true}>
                  <Coluna tamanho="200">Resultado da chamada</Coluna>
                  <Coluna tamanho="400">Descrição do resultado</Coluna>
                  <Coluna tamanho="200">Limite</Coluna>
                  <Coluna>Ações</Coluna>
                </Linha>
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
        dados=""
      />
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TelaGerenciamentoLimites);
