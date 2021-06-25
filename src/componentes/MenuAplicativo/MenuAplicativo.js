/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ModalAlterarSenha from "../ModalAlterarSenha/ModalAlterarSenha";
import ModalConfirmacao from "../ModalConfirmacao/ModalConfirmacao";

import * as menuAplicativoActions from "../../stores/actions/MenuAplicativo";
import * as loginUtils from "../../utils/Login";

import "./MenuAplicativo.css";

function MenuAplicativo(props) {
  const [usuario, setUsuario] = useState({});
  const [showModalAlterarSenha, setShowModalAlterarSenha] = useState(false);
  const [showModalConfirmacao, setShowModalConfirmacao] = useState(false);

  const historico = useHistory();

  useEffect(() => {
    if (props.showJanelaSuspensa) {
      window.addEventListener("click", listenerClick, true);
    }
  }, [props.showJanelaSuspensa]);

  useEffect(() => {
    const usuarioLogado = loginUtils.buscarUsuarioLogado();
    if (usuarioLogado && usuarioLogado.id) {
      setUsuario(usuarioLogado);
    }else{
      historico.push("/login");
    }
  }, [localStorage.getItem("usuarioLogado")]);

  const listenerClick = () => {
    window.removeEventListener("click", listenerClick);
    props.setShowJanelaSuspensa(false);
  };

  return (
    <>
      <div id="container-menu-aplicativo">
        <Link to="/dashboard/menu">
          <div className="nome-empresa">Ativos S.A.</div>
        </Link>
        <div className="opcoes-menu">
          <span onClick={() => props.setShowJanelaSuspensa(true)}>
            {usuario.nome || "Usuário"}
            <i className="dropdown-toggle ml-3"></i>
          </span>
        </div>
        <div
          id="janela-suspensa"
          className={props.showJanelaSuspensa ? "mostrar" : "esconder"}
        >
          <Link to="/dashboard/menu">
            <div>
              <i className="fa fa-list mr-3"></i>Dashboard
            </div>
          </Link>
          <div onClick={() => setShowModalAlterarSenha(true)}>
            <i className="fa fa-gears mr-3"></i>Alterar minha senha
          </div>
          <footer onClick={() => setShowModalConfirmacao(true)}>
            <i className="fa fa-sign-out mr-3"></i>Sair
          </footer>
        </div>
      </div>
      <ModalAlterarSenha
        show={showModalAlterarSenha}
        fecharModal={() => setShowModalAlterarSenha(false)}
      />
      <ModalConfirmacao
        show={showModalConfirmacao}
        fecharModal={() => setShowModalConfirmacao(false)}
        tituloModalConfirmacao="Deseja deslogar-se?"
        acaoConfirmada={() => loginUtils.deslogar()}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  showJanelaSuspensa: state.MenuAplicativo.showJanelaSuspensa,
});

const mapDispatchToProps = (dispatch) => ({
  setShowJanelaSuspensa: (showJanelaSuspensa) =>
    dispatch(menuAplicativoActions.setShowJanelaSuspensa(showJanelaSuspensa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuAplicativo);
