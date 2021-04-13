/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React,{ useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Botao from '../Botao/Botao';
import EntradaDados from '../EntradaDados/EntradaDados';

import logoAtivos from "../../img/logo-ativos.png";

import * as loginActions from "../../stores/actions/LoginAction";
import * as loginUtils from "../../utils/Login";
import { showToast } from "../ToastControle/ToastControle";

import "./Logar.css";

function Logar(props) {

  const historico = useHistory();
  const [dados, setDados] = useState({
    usuario: "",
    senha: ""
  })

  useEffect(() => {
    const redirecionar = loginUtils.usuarioLogado(true);
    if(redirecionar){
      historico.push("/dashboard/menu");
    }
  }, [])

  const logar = () => {
    loginUtils.logar(dados.usuario, dados.senha).then((dados)=>{
      if(dados.status != 200){
        showToast("erro", dados.message);
      }else{
        props.SetUsuarioLogado(dados.user_data)
        historico.push("/dashboard/menu");
        showToast("sucesso", dados.message);
      }
    })
  }

    return (
      <>
        <div id="container-logar">
          <header id="logar-titulo">
            <img src={logoAtivos} />
          </header>
          <main id="logar-corpo">
            <section className="container-corpo-logar">
              <div className="row pb-2">
                <div className="col">
                <EntradaDados 
                  tipo="text" 
                  id="usuario" 
                  nome="usuario" 
                  descricao="Usuário"
                  estilo="text-center"
                  acaoAcionar={()=> logar()}
                  valor={(valorEntrada)=> setDados({...dados, usuario : valorEntrada.valor})}/>
                </div>
              </div>
              <div className="row pb-2">
                <div className="col">
                <EntradaDados 
                  tipo="password" 
                  id="senha" 
                  nome="senha" 
                  descricao="Senha"
                  estilo="text-center"
                  acaoAcionar={()=> logar()}
                  valor={(valorEntrada)=> setDados({...dados, senha : valorEntrada.valor})}/>
                </div>
              </div>
              <div className="row pb-4">
                <div className="col">
                  <Botao estilo={"w-100-pc btn-azul"} clique={()=> logar()}>
                    Login
                  </Botao>
                </div>
              </div>
            </section>
            <section id="copyright-ativos">
                © Ativos S.A. 2020
            </section>
          </main>
        </div>
      </>
    )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  SetUsuarioLogado : (usuario) => dispatch(loginActions.SetUsuarioLogado(usuario)), 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logar);