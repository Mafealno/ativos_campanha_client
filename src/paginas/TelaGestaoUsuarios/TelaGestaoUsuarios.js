/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import EntradaDados from "../../componentes/EntradaDados/EntradaDados";
import Botao from "../../componentes/Botao/Botao";
import Paginacao from "../../componentes/Paginacao/Paginacao";
import Carregando from "../../componentes/Carregando/Carregando";
import Tabela from "../../componentes/Tabela/Tabela";
import Linha from "../../componentes/Linha/Linha";
import Coluna from "../../componentes/Coluna/Coluna";
import ModalUsuario from "../../componentes/ModalUsuario/ModalUsuario";
import ModalConfirmacao from "../../componentes/ModalConfirmacao/ModalConfirmacao";
import BotaoVoltarMenu from "../../componentes/BotaoVoltarMenu/BotaoVoltarMenu";
import { showToast } from "../../componentes/ToastControle/ToastControle";

import * as usuariosUtils from "../../utils/Usuarios";
import * as geralUtils from "../../utils/Geral";
import { buscarUsuarioLogado } from "../../utils/Login";

import "./TelaGestaoUsuarios.css";

function TelaGestaoUsuarios(props) {
  const [carregando, setCarregando] = useState(true);
  const [showModalUsuario, setShowModalUsuario] = useState(false);
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);
  const [listaUsuariosExibicao, setListaUsuariosExibicao] = useState([]);
  const [paginacaoExibicao, setPaginacaoExibicao] = useState([]);
  const [dadosEdicao, setDadosEdicao] = useState({});
  const [qtdeRegistrosTabela, setQtdeRegistrosTabela] = useState(0);
  const [idDeletar, setIdDeletar] = useState(0);
  const [valorBuscaUsuario, setValorBuscaUsuario] = useState("");
  const [data, setData] = useState();
  const [configPaginado, setConfigPaginado] = useState({
    quantidadePagina: 10,
    paginaAtual: 0,
  });

  useEffect(() => {
    listarUsuarios();
  }, [configPaginado.paginaAtual, props.contador]);

  useEffect(() => {
    if (data) {
      montarListaUsuarios(data.usuarios, data);
    }
  }, [data, qtdeRegistrosTabela]);

  useEffect(() => {
    if (!showModalUsuario) {
      setDadosEdicao(undefined);
    }
  }, [showModalUsuario]);

  const abrirModalUsuario = (dadosEdicao) => {
    if (dadosEdicao) {
      setDadosEdicao(dadosEdicao);
    }
    setShowModalUsuario(true);
  };

  const listarUsuarios = () => {
    usuariosUtils
      .buscarUsuariosPaginado(
        configPaginado.quantidadePagina,
        configPaginado.paginaAtual
      )
      .then((dados) => {
        if (dados.success) {
          setQtdeRegistrosTabela(dados.data.totalRegistros);
          setData(dados.data);
          if (dados.data.usuarios.length == 0) {
            showToast("aviso", "Não há registros a serem listados");
            setCarregando(false);
          }
        } else {
          showToast("erro", dados.message);
          setCarregando(false);
        }
      });
  };

  const montarListaUsuarios = (list, dados) => {
    const usuarioLogado = buscarUsuarioLogado();

    setListaUsuariosExibicao(
      list.map((item) => {
        return (
          <Linha>
            <Coluna tamanho="120">{item.usuario}</Coluna>
            <Coluna tamanho="200">{item.nome + " " + item.sobrenome}</Coluna>
            <Coluna tamanho="280">{item.email}</Coluna>
            <Coluna tamanho="100">{item.permissoes}</Coluna>
            <Coluna tamanho="100">
              {geralUtils.formatarData(item.criado_em)}
            </Coluna>
            <Coluna>
              <Botao
                estilo={"w-100-pc btn-amarelo"}
                clique={() => abrirModalUsuario(item)}
              >
                Editar
              </Botao>
            </Coluna>
            {usuarioLogado.id != item._id && (
              <Coluna>
                <Botao
                  estilo={"w-100-pc btn-vermelho"}
                  clique={() =>
                    setIdDeletar(item._id, setShowModalConfirmacao(true))
                  }
                >
                  Excluir
                </Botao>
              </Coluna>
            )}
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

  const deletarUsuario = (id) => {
    usuariosUtils.deletarUsuario(id).then((dados) => {
      if (dados.success) {
        listarUsuarios();
        showToast("sucesso", dados.message);
      } else {
        showToast("erro", dados.message);
      }
    });
  };

  return (
    <>
      <div id="container-tela-gestao-usuarios">
        <header id="cabecalho-tela-gestao-usuarios" className="p-10-px">
          <BotaoVoltarMenu />
          <h2 className="ml-2">Gestão de Usuários</h2>
        </header>
        <main id="conteudo-tela-gestao-usuarios" className="p-10-px">
          <div className="d-flex flex-wrap">
            <div className="col-4" />
            <div className="flex-grow-1">
              <section className="sessao-conteudo-tela-gestao-usuarios row">
                <div className="col"/>
                <div className="col-5">
                  <EntradaDados
                    tipo="text"
                    id="buscar-usuario"
                    nome="buscar-usuario"
                    descricao="Digite o nome do usuário"
                    autoCompletar="off"
                    valor={(valorEntrada) =>
                      setValorBuscaUsuario(valorEntrada.valor)
                    }
                  />
                </div>
                <div className="col">
                  <Botao
                    estilo={"w-100-pc btn-azul"}
                    clique={() =>
                      usuariosUtils
                        .buscarUsuarioPorNomePagina(
                          valorBuscaUsuario,
                          configPaginado.quantidadePagina
                        )
                        .then(dados => {
                          setData(dados.data);
                          setQtdeRegistrosTabela(dados.data.totalRegistros);
                        })
                    }
                  >
                    Buscar
                  </Botao>
                </div>
                <div className="col">
                  <Botao
                    estilo={"w-100-pc btn-verde"}
                    clique={() => abrirModalUsuario()}
                  >
                    Novo
                  </Botao>
                </div>
              </section>
            </div>
          </div>
          <section className="sessao-conteudo-tela-gestao-usuarios">
            <div>
              <Tabela tamanho="370" titulo={
                <Linha titulo={true} >
                  <Coluna tamanho="120">Usuário</Coluna>
                  <Coluna tamanho="200">Nome</Coluna>
                  <Coluna tamanho="280">Email</Coluna>
                  <Coluna tamanho="100">Permissão</Coluna>
                  <Coluna tamanho="100">Criação</Coluna>
                  <Coluna>Ações</Coluna>
                </Linha>
              }>
                {!carregando && listaUsuariosExibicao}
                {carregando && <Carregando />}
              </Tabela>
            </div>
            {paginacaoExibicao}
          </section>
        </main>
      </div>
      <ModalUsuario
        show={showModalUsuario}
        fecharModal={() => setShowModalUsuario(false)}
        dados={dadosEdicao}
      />
      <ModalConfirmacao
        show={showModalConfirmacao}
        fecharModal={() => setShowModalConfirmacao(false)}
        tituloModalConfirmacao="Essa ação é irreversivel"
        acaoConfirmada={() => deletarUsuario(idDeletar)}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  contador: state.Contador.contador,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TelaGestaoUsuarios);
