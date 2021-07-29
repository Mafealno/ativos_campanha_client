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

  const cadastrarLimites = () => {
    const limites = [
      "abandonado ura", 
      "agente rejeitou", 
      "callback secretaria", 
      "chamada cancelada perda conexao gerenciador", 
      "chamada desconectada operadora",
      "cliente abandonado ura",
    "cliente abandonou",
    "discadora abandonou",
    "erro discagem",
    "falha rede",
    "falha reservar agente cb",
    "fax",
    "fora servico",
    "interceptacao operador",
    "maquina khomp",
    "mensagem nao suportada pelo roteador",
    "mudanca campanha",
    "mudo",
    "mudo khomp",
    "numero blacklist",
    "numero errado",
    "numero invalido",
    "numero nao discado",
    "ocupado",
    "pessoa errada",
    "respondido cpc",
    "retorno chamada",
    "secretaria eletronica",
    "sem resposta",
    "sem sinal",
    "sem tom chamada"];
    limites.forEach(item => {
    setTimeout(()=> {
    const obj = {
      nome: item.replace(" ", "_"),
    descricao : item,
    valor: 10
    }
    
    limiteUtils.cadastrarLimites(obj).then((data) => {
    showToast("sucesso", item)
    })
    }, 1000)
    
    })
    }
  
  return (
    <>
      <div id="container-tela-gerenciamento-limites">
        <header id="cabecalho-tela-gerenciamento-limites" className="p-10-px">
          <BotaoVoltarMenu />
          <h2 className="ml-2">Gerenciamento de Limites</h2>
          <Botao clique={() => cadastrarLimites()}>Teste</Botao>
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
